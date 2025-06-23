<script setup>
import Input from "@/components/widgets/Input.vue";
import { showSuccessToast, showErrorToast } from "@/helpers/alert.js";
import Layout from "@/layouts/main.vue";
import { useTeacherStudentAssesment } from '@/state/pinia';
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id);

const teacherStudentAssesmentStore = useTeacherStudentAssesment();
const loading = ref(true);
const error = ref(false);
const students = ref([]);
const noDataMessage = ref('');

const studentInfo = ref({
  name: '',
  student_number: ''
});

const fetchStudentGrades = async (studentId) => {
  try {
    loading.value = true;
    error.value = false;
    noDataMessage.value = '';
    students.value = [];

    teacherStudentAssesmentStore.$reset();
    await teacherStudentAssesmentStore.getStudentAssesmentById(studentId);

    if (teacherStudentAssesmentStore.studentAssesment &&
      Array.isArray(teacherStudentAssesmentStore.studentAssesment) &&
      teacherStudentAssesmentStore.studentAssesment.length > 0) {
      students.value = teacherStudentAssesmentStore.studentAssesment;

      if (students.value[0]?.student) {
        studentInfo.value = {
          name: students.value[0].student.name || '',
          student_number: students.value[0].student.student_number || ''
        };
      }
    } else if (teacherStudentAssesmentStore.response && teacherStudentAssesmentStore.response.status === 404) {
      error.value = true;
      noDataMessage.value = "No assessments found for this student";
    } else {
      error.value = true;
      noDataMessage.value = "No assessment data available";
    }
  } catch (err) {
    error.value = true;
    noDataMessage.value = err.message || "An error occurred while fetching data";
    console.error(`Error fetching student grades: ${err.message}`);
  } finally {
    loading.value = false;
  }
};

const averageKKM = computed(() => {
  if (!students.value || students.value.length === 0) {
    return 0;
  }

  let totalKKM = 0;
  let validCount = 0;

  students.value.forEach(student => {
    if (student.subject_schedule?.subject?.kkm?.length > 0) {
      const kkmValue = Number(student.subject_schedule.subject.kkm[0].min_score);
      if (!isNaN(kkmValue)) {
        totalKKM += kkmValue;
        validCount++;
      }
    }
  });

  return validCount > 0 ? (totalKKM / validCount).toFixed(2) : 0;
});

const averages = computed(() => {
  if (!students.value || students.value.length === 0) {
    return { uts: "0.00", uas: "0.00", tugas: "0.00", keaktifan: "0.00" };
  }

  const total = students.value.length;
  const utsSum = students.value.reduce((sum, subject) => sum + Number(subject.uts_score || 0), 0);
  const uasSum = students.value.reduce((sum, subject) => sum + Number(subject.uas_score || 0), 0);
  const tugasSum = students.value.reduce((sum, subject) => sum + Number(subject.tugas_score || 0), 0);
  const keaktifanSum = students.value.reduce((sum, subject) => sum + Number(subject.activity_score || 0), 0);

  return {
    uts: (utsSum / total).toFixed(2),
    uas: (uasSum / total).toFixed(2),
    tugas: (tugasSum / total).toFixed(2),
    keaktifan: (keaktifanSum / total).toFixed(2)
  };
});

const finalAverage = computed(() => {
  if (!students.value || students.value.length === 0) return "0.00";

  const sum = students.value.reduce((sum, subject) => {
    return sum + Number(subject.uts_score || 0) + Number(subject.uas_score || 0) +
      Number(subject.tugas_score || 0) + Number(subject.activity_score || 0);
  }, 0);

  return (sum / (students.value.length * 4)).toFixed(2);
});

const passStatus = computed(() => {
  const avgKKM = parseFloat(averageKKM.value);
  const finalScore = parseFloat(finalAverage.value);

  return {
    passed: finalScore >= avgKKM,
    kkmValue: avgKKM,
    scoreDifference: (finalScore - avgKKM).toFixed(2)
  };
});

const isScoreBelowKKM = (score, kkm) => {
  return Number(score) < Number(kkm);
};

const updateSubjectScore = (assessment, field, value) => {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    showErrorToast(`Score must be a number`);
    return assessment[field];
  }
  if (numValue < 0) {
    showErrorToast(`Score cannot be less than 0`);
    return 0;
  }
  if (numValue > 100) {
    showErrorToast(`Score cannot be greater than 100`);
    return 100;
  }

  assessment[field] = numValue;

  assessment.total_score = calculateTotalScore(
    assessment.uts_score,
    assessment.uas_score,
    assessment.tugas_score,
    assessment.activity_score
  );

  return numValue;
};

const calculateTotalScore = (uts, uas, tugas, activity) => {
  uts = parseFloat(uts) || 0;
  uas = parseFloat(uas) || 0;
  tugas = parseFloat(tugas) || 0;
  activity = parseFloat(activity) || 0;

  return ((uts + uas + tugas + activity) / 4).toFixed(2);
};

const saveAllGrades = async () => {
  try {
    loading.value = true;

    for (const assessment of students.value) {
      const payload = {
        student_id: assessment.student_id,
        subject_schedule_id: assessment.subject_schedule.id,
        uts_score: Number(assessment.uts_score),
        uas_score: Number(assessment.uas_score),
        tugas_score: Number(assessment.tugas_score),
        activity_score: Number(assessment.activity_score),
        total_score: Number(assessment.total_score),
        notes: assessment.notes || '',
        study_year_id: assessment.study_year_id || ''
      };

      await teacherStudentAssesmentStore.putStudentAssesment(assessment.id, payload).then(() => {
        showSuccessToast("All grades have been successfully updated!");
      })
    }

  } catch (error) {
    console.error("Error updating grades:", error);
    showErrorToast("Failed to update grades. Please try again.");
  } finally {
    loading.value = false;
  }
};

const cancelEdit = () => {
  window.history.back();
};

watch(() => route.params.id, (newId) => {
  if (newId && newId !== id.value) {
    id.value = newId;
    fetchStudentGrades(newId);
  }
});

onMounted(async () => {
  if (id.value) fetchStudentGrades(id.value);
})
</script>

<template>
  <Layout>
    <div class="px-4 py-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
      <h2 class="text-xl text-center text-gray-700 dark:text-gray-200 font-semibold mb-4">Nilai Siswa/i</h2>
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400">
        </div>
      </div>

      <div v-else-if="error || noDataMessage"
        class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
        <p class="text-red-600 dark:text-red-400">{{ noDataMessage || "Failed to load student assessments" }}</p>
      </div>

      <div v-else>
        <!-- Assessment Table -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-gray-800 dark:text-gray-200">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th scope="row" class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center align-middle"
                  rowspan="2">
                  No
                </th>
                <th id="komponen" scope="col"
                  class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center align-middle" rowspan="2">
                  Subject
                </th>
                <th scope="row" id="kkm"
                  class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center align-middle" rowspan="2">
                  KKM
                </th>
                <th scope="row" id="hasil-nilai"
                  class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center align-middle" colspan="5">
                  Assessment Scores
                </th>
              </tr>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th scope="col" class="border border-gray-300 dark:border-gray-600 px-8 py-2 text-center">UTS</th>
                <th scope="col" class="border border-gray-300 dark:border-gray-600 px-8 py-2 text-center">UAS</th>
                <th scope="col" class="border border-gray-300 dark:border-gray-600 px-8 py-2 text-center">Tugas</th>
                <th scope="col" class="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">Keaktifan</th>
                <th scope="col" class="border border-gray-300 dark:border-gray-600 px-8 py-2 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(assessment, index) in students" :key="assessment.id">
                <tr
                  v-if="index === 0 || students[index - 1].subject_schedule.subject.type !== assessment.subject_schedule.subject.type">
                  <td
                    class="border border-gray-300 dark:border-gray-600 px-2 py-2 bg-blue-50 dark:bg-blue-900/30 font-medium text-gray-800 dark:text-gray-100"
                    colspan="8">
                    {{ assessment.subject_schedule.subject.type || 'General Subjects' }}
                  </td>
                </tr>
                <tr :class="index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'">
                  <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">{{ index + 1 }}</td>
                  <td class="border border-gray-300 dark:border-gray-600 px-2 py-2">{{
                    assessment.subject_schedule.subject.name }}</td>

                  <!-- KKM Value -->
                  <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                    {{ assessment.subject_schedule.subject.kkm?.length ?
                      assessment.subject_schedule.subject.kkm[0].min_score : '0' }}
                  </td>

                  <!-- UTS Score -->
                  <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                    <Input type="number" :model-value="assessment.uts_score"
                      @update:model-value="(val) => updateSubjectScore(assessment, 'uts_score', val)" name="uts" :class="[
                        'w-full text-center text-sm rounded py-1 px-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200',
                        isScoreBelowKKM(assessment.uts_score, assessment.subject_schedule.subject.kkm?.[0]?.min_score) ?
                          'border-2 border-red-500 dark:border-red-700' : ''
                      ]" min="0" max="100" />
                  </td>

                  <!-- UAS Score -->
                  <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                    <Input type="number" :model-value="assessment.uas_score"
                      @update:model-value="(val) => updateSubjectScore(assessment, 'uas_score', val)" name="uas" :class="[
                        'w-full text-center text-sm rounded py-1 px-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200',
                        isScoreBelowKKM(assessment.uas_score, assessment.subject_schedule.subject.kkm?.[0]?.min_score) ?
                          'border-2 border-red-500 dark:border-red-700' : ''
                      ]" min="0" max="100" />
                  </td>

                  <!-- Tugas Score -->
                  <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                    <Input type="number" :model-value="assessment.tugas_score"
                      @update:model-value="(val) => updateSubjectScore(assessment, 'tugas_score', val)" name="tugas"
                      :class="[
                        'w-full text-center text-sm rounded py-1 px-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200',
                        isScoreBelowKKM(assessment.tugas_score, assessment.subject_schedule.subject.kkm?.[0]?.min_score) ?
                          'border-2 border-red-500 dark:border-red-700' : ''
                      ]" min="0" max="100" />
                  </td>

                  <!-- Keaktifan Score -->
                  <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                    <Input type="number" :model-value="assessment.activity_score"
                      @update:model-value="(val) => updateSubjectScore(assessment, 'activity_score', val)"
                      name="keaktifan" :class="[
                        'w-full text-center text-sm rounded py-1 px-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200',
                        isScoreBelowKKM(assessment.activity_score, assessment.subject_schedule.subject.kkm?.[0]?.min_score) ?
                          'border-2 border-red-500 dark:border-red-700' : ''
                      ]" min="0" max="100" />
                  </td>

                  <!-- Total Score -->
                  <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                    <span :class="{
                      'px-2 py-1 rounded font-medium': true,
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300':
                        isScoreBelowKKM(assessment.total_score, assessment.subject_schedule.subject.kkm?.[0]?.min_score),
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300':
                        !isScoreBelowKKM(assessment.total_score, assessment.subject_schedule.subject.kkm?.[0]?.min_score)
                    }">
                      {{ assessment.total_score }}
                    </span>
                  </td>
                </tr>
              </template>
              <tr class="bg-blue-50 dark:bg-blue-900/30">
                <td colspan="3"
                  class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center font-medium text-gray-800 dark:text-gray-100">
                  Rata-rata
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                  {{ averages.uts }}
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                  {{ averages.uas }}
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                  {{ averages.tugas }}
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                  {{ averages.keaktifan }}
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                  <span :class="{
                    'px-2 py-1 rounded font-medium': true,
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300': !passStatus.passed,
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300': passStatus.passed
                  }">
                    {{ finalAverage }}
                  </span>
                </td>
              </tr>
              <tr class="bg-blue-100 dark:bg-blue-900/40">
                <td colspan="2"
                  class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center font-medium text-gray-800 dark:text-gray-100">
                  KKM Rata-rata
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center font-bold">
                  {{ averageKKM }}
                </td>
                <td colspan="4"
                  class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center font-medium text-gray-800 dark:text-gray-100">
                  Status
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">
                  <span :class="{
                    'px-3 py-1 rounded-full text-sm font-medium': true,
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300': !passStatus.passed,
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300': passStatus.passed
                  }">
                    {{ passStatus.passed ? 'LULUS' : 'TIDAK LULUS' }}
                    <span class="ml-1 text-xs">
                      {{ passStatus.passed ? `(+${passStatus.scoreDifference})` : `(${passStatus.scoreDifference})` }}
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end mt-6 gap-3">
          <button
            class="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            @click="cancelEdit" :disabled="loading">
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
            @click="saveAllGrades" :disabled="loading">
            <span v-if="loading"
              class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2">
            </span>
            Save
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>