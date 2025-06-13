<script setup>
import Layout from "@/layouts/main.vue";
import { useTeacherStudentAssesment } from '@/state/pinia';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id);

const teacherStudentAssesmentStore = useTeacherStudentAssesment();
const loading = ref(true);
const error = ref(false);
const students = ref([]);
const noDataMessage = ref('');

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
}

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
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Student Assessments</h1>

      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400">
        </div>
      </div>

      <div v-else-if="error || noDataMessage"
        class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
        <p class="text-red-600 dark:text-red-400">{{ noDataMessage || "Failed to load student assessments" }}</p>
      </div>

      <div v-else-if="students && students.length > 0">
        <div class="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-100 dark:border-gray-700">
          <h2 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Student Information</h2>
          <p class="dark:text-gray-300"><span class="font-medium">Semester:</span> {{ students[0].study_year.semester }}
          </p>
          <p class="dark:text-gray-300"><span class="font-medium">Year:</span> {{ students[0].study_year.year }}</p>
        </div>

        <div class="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700">
          <table class="min-w-full bg-white dark:bg-gray-800">
            <thead class="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th
                  class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">
                  Subject</th>
                <th
                  class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-center text-gray-700 dark:text-gray-300">
                  UTS</th>
                <th
                  class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-center text-gray-700 dark:text-gray-300">
                  UAS</th>
                <th
                  class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-center text-gray-700 dark:text-gray-300">
                  Tugas</th>
                <th
                  class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-center text-gray-700 dark:text-gray-300">
                  Activity</th>
                <th
                  class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-center text-gray-700 dark:text-gray-300">
                  Total Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(assessment, index) in students" :key="assessment.id"
                :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'">
                <td class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">{{
                  assessment.subject_schedule.subject.name }}</td>
                <td
                  class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-center text-gray-800 dark:text-gray-200">
                  {{ assessment.uts_score }}</td>
                <td
                  class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-center text-gray-800 dark:text-gray-200">
                  {{ assessment.uas_score }}</td>
                <td
                  class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-center text-gray-800 dark:text-gray-200">
                  {{ assessment.tugas_score }}</td>
                <td
                  class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-center text-gray-800 dark:text-gray-200">
                  {{ assessment.activity_score }}</td>
                <td class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-center font-medium">
                  <span
                    :class="assessment.total_score >= 70 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                    {{ assessment.total_score }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else
        class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-md">
        <p class="text-yellow-600 dark:text-yellow-400">No assessment data available.</p>
      </div>
    </div>
  </Layout>
</template>