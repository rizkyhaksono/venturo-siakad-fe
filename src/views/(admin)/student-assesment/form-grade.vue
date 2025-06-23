<script setup>
import { ref, computed, onMounted } from 'vue';
import Layout from "@/layouts/main.vue";
import InputField from "@/components/widgets/Input";
import {
  useAdminStudentAssesment,
  useAdminStudentStore,
  useAdminKKMStore,
  useAdminSubjectScheduleStore,
} from '@/state/pinia';
import { showSuccessToast, showErrorToast } from "@/helpers/alert.js";
import { useRoute } from 'vue-router';

const route = useRoute();
const studentId = route.params.id;

const studentAssesmentStore = useAdminStudentAssesment();
const subjectScheduleStore = useAdminSubjectScheduleStore();
const studentStore = useAdminStudentStore();
const kkmStore = useAdminKKMStore();

const student = ref(null);
const kkm = ref([]);
const subjectSchedule = ref([]);
const loading = ref(false);
const formData = ref({
  student_number: '',
  student_name: '',
});
const subjects = ref([]);

const averages = computed(() => {
  const total = subjects.value.length || 1;
  const utsSum = subjects.value.reduce((sum, subject) => sum + Number(subject.uts || 0), 0);
  const uasSum = subjects.value.reduce((sum, subject) => sum + Number(subject.uas || 0), 0);
  const tugasSum = subjects.value.reduce((sum, subject) => sum + Number(subject.tugas || 0), 0);
  const keaktifanSum = subjects.value.reduce((sum, subject) => sum + Number(subject.keaktifan || 0), 0);

  return {
    uts: (utsSum / total).toFixed(2),
    uas: (uasSum / total).toFixed(2),
    tugas: (tugasSum / total).toFixed(2),
    keaktifan: (keaktifanSum / total).toFixed(2)
  };
});

const finalAverage = computed(() => {
  if (subjects.value.length === 0) return "0.00";

  const sum = subjects.value.reduce((sum, subject) => {
    return sum + Number(subject.uts || 0) + Number(subject.uas || 0) +
      Number(subject.tugas || 0) + Number(subject.keaktifan || 0);
  }, 0);

  return (sum / (subjects.value.length * 4)).toFixed(2);
});

const getStudentById = async (id) => {
  try {
    loading.value = true;
    await studentStore.getStudentById(id);
    student.value = studentStore.student.data;
    if (student.value) {
      formData.value.student_number = student.value.student_number || '';
      formData.value.student_name = student.value.name || '';
    } else {
      showErrorToast('Data siswa tidak ditemukan');
      setTimeout(() => {
        window.location.href = '/admin/student-assesment';
      }, 2000);
    }
  } catch (error) {
    console.error('Error fetching student:', error);
    showErrorToast('Gagal memuat data siswa');
    setTimeout(() => {
      window.location.href = '/admin/student-assesment';
    }, 2000);
  } finally {
    loading.value = false;
  }
}

const getKKM = async () => {
  try {
    loading.value = true;

    kkmStore.perpage = 20;
    await kkmStore.getKKM();
    kkm.value = kkmStore.kkm.data || [];

    await getSubjectSchedule();

    if (kkm.value.length > 0) {
      const subjectMap = {};
      const studentSubjects = new Set();

      if (subjectSchedule.value && subjectSchedule.value.length > 0 && student.value) {
        subjectSchedule.value.forEach(schedule => {
          if (schedule.rombel && schedule.rombel.student_name === student.value.name) {
            studentSubjects.add(schedule.subject.name);
          }
        });
      }

      kkm.value.forEach(item => {
        const subject = item.subject;
        const subjectName = subject.name;

        if (studentSubjects.has(subjectName)) {
          const type = subjectName === "Bahasa Daerah" ? "B. Muatan Lokal" : "A. Mata Pelajaran";

          if (!subjectMap[subject.id]) {
            subjectMap[subject.id] = {
              id: subject.id,
              type: type,
              name: subjectName,
              kkm: item.min_score,
              uts: 0,
              uas: 0,
              tugas: 0,
              keaktifan: 0
            };
          }
        }
      });

      subjects.value = Object.values(subjectMap);
    }
  } catch (error) {
    console.error('Error fetching KKM:', error);
    showErrorToast('Gagal memuat data KKM');
  } finally {
    loading.value = false;
  }
}

const getSubjectSchedule = async () => {
  try {
    loading.value = true;
    await subjectScheduleStore.getSchedules();
    subjectSchedule.value = subjectScheduleStore.schedules || [];
  } catch (error) {
    console.error('Error fetching subject schedule:', error);
    showErrorToast('Gagal memuat jadwal mata pelajaran');
  } finally {
    loading.value = false;
  }
}

const validateInput = (value, fieldName, subjectName) => {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    showErrorToast(`Nilai ${fieldName} untuk ${subjectName} harus berupa angka`);
    return 0;
  }
  if (numValue < 0) {
    showErrorToast(`Nilai ${fieldName} untuk ${subjectName} tidak boleh kurang dari 0`);
    return 0;
  }
  if (numValue > 100) {
    showErrorToast(`Nilai ${fieldName} untuk ${subjectName} tidak boleh lebih dari 100`);
    return 100;
  }
  return numValue;
}

const watchInputs = () => {
  subjects.value.forEach(subject => {
    if (subject.uts === undefined) subject.uts = 0;
    if (subject.uas === undefined) subject.uas = 0;
    if (subject.tugas === undefined) subject.tugas = 0;
    if (subject.keaktifan === undefined) subject.keaktifan = 0;
  });
}

const saveAssessment = async () => {
  try {
    loading.value = true;
    let hasErrors = false;

    subjects.value.forEach(subject => {
      const validUts = validateInput(subject.uts, 'UTS', subject.name);
      const validUas = validateInput(subject.uas, 'UAS', subject.name);
      const validTugas = validateInput(subject.tugas, 'Tugas', subject.name);
      const validKeaktifan = validateInput(subject.keaktifan, 'Keaktifan', subject.name);

      subject.uts = validUts;
      subject.uas = validUas;
      subject.tugas = validTugas;
      subject.keaktifan = validKeaktifan;

      if (subject.uts !== Number(subject.uts) ||
        subject.uas !== Number(subject.uas) ||
        subject.tugas !== Number(subject.tugas) ||
        subject.keaktifan !== Number(subject.keaktifan)) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      return;
    }

    const calculateTotal = (uts, uas, tugas, keaktifan) => {
      return Number(((Number(uts) + Number(uas) + Number(tugas) + Number(keaktifan)) / 4).toFixed(2));
    };

    // Find matching schedule IDs for each subject
    const subjectToScheduleMap = {};

    if (subjectSchedule.value && subjectSchedule.value.length > 0) {
      subjectSchedule.value.forEach(schedule => {
        if (schedule.rombel && student.value && schedule.rombel.student_name === student.value.name) {
          const subjectName = schedule.subject.name;
          // Store the schedule ID for this subject
          if (!subjectToScheduleMap[subjectName]) {
            subjectToScheduleMap[subjectName] = schedule.id;
          }
        }
      });
    }

    const studyYearId = subjectSchedule.value && subjectSchedule.value.length > 0 ?
      subjectSchedule.value[0].class.study_year.id :
      "c4401737-cb7d-488b-9654-900eaae62525"; // Fallback

    const apiPayload = subjects.value.map(subject => {
      const scheduleId = subjectToScheduleMap[subject.name] || subject.id; // Fallback to subject ID

      return {
        student_id: student.value.id,
        subject_id: subject.id,
        subject_schedule_id: scheduleId,
        uts_score: Number(subject.uts),
        uas_score: Number(subject.uas),
        tugas_score: Number(subject.tugas),
        activity_score: Number(subject.keaktifan),
        total_score: calculateTotal(subject.uts, subject.uas, subject.tugas, subject.keaktifan),
        notes: "",
        study_year_id: studyYearId
      };
    });

    console.log('API Payload:', apiPayload);

    // Send assessment data to API
    for (const assessment of apiPayload) {
      await studentAssesmentStore.postStudentAssesment(assessment);
    }

    showSuccessToast('Nilai berhasil disimpan');
  } catch (error) {
    console.error('Error saving assessments:', error);
    showErrorToast(error.message || 'Terjadi kesalahan saat menyimpan data');
  } finally {
    loading.value = false;
  }
};

const cancelAssessment = () => {
  window.history.back();
};

onMounted(async () => {
  if (studentId) {
    await getStudentById(studentId);
  }
  await getKKM();
  await getSubjectSchedule();
  watchInputs();
});
</script>

<template>
  <Layout>
    <div class="px-4 py-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
      <h3 class="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">Add Nilai Siswa/i</h3>

      <div class="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <InputField v-model="formData.student_number" label="Nomor Induk Siswa" placeholder="Nomor Induk Siswa"
              :value="student?.value?.student_number" name="student_number" disabled class="w-full" />
          </div>
          <div>
            <InputField v-model="formData.student_name" label="Nama Lengkap Siswa" placeholder="Nama Lengkap Siswa"
              :value="student?.value?.student_name" name="student_name" disabled class="w-full" />
          </div>
        </div>
      </div>

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
                Komponen
              </th>
              <th scope="row" id="kkm"
                class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center align-middle" rowspan="2">KKM
              </th>
              <th scope="row" id="hasil-nilai"
                class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center align-middle" colspan="4">Nilai
                Hasil
                Belajar</th>
            </tr>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th scope="col" class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">UTS</th>
              <th scope="col" class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">UAS</th>
              <th scope="col" class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">Tugas</th>
              <th scope="col" class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">Keaktifan</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(subject, index) in subjects" :key="subject.id">
              <tr v-if="index === 0 || subjects[index - 1].type !== subject.type">
                <td
                  class="border border-gray-300 dark:border-gray-600 px-2 py-2 bg-blue-50 dark:bg-blue-900/30 font-medium text-gray-800 dark:text-gray-100"
                  colspan="7">{{
                    subject.type }}</td>
              </tr>
              <tr :class="index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'">
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">{{ index + 1 }}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2">{{ subject.name }}</td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center w-20">
                  <InputField type="number" v-model="subject.kkm" name="kkm"
                    classes="w-full text-center text-sm rounded py-1 px-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    min="0" max="100" />
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center w-20">
                  <InputField type="number" v-model="subject.uts" name="uts"
                    @blur="subject.uts = validateInput(subject.uts, 'UTS', subject.name)"
                    classes="w-full text-center text-sm rounded py-1 px-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    min="0" max="100" />
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center w-20">
                  <InputField type="number" v-model="subject.uas" name="uas"
                    @blur="subject.uas = validateInput(subject.uas, 'UAS', subject.name)"
                    classes="w-full text-center text-sm rounded py-1 px-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    min="0" max="100" />
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center w-20">
                  <InputField type="number" v-model="subject.tugas" name="tugas"
                    @blur="subject.tugas = validateInput(subject.tugas, 'Tugas', subject.name)"
                    classes="w-full text-center text-sm rounded py-1 px-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    min="0" max="100" />
                </td>
                <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center w-20">
                  <InputField type="number" v-model="subject.keaktifan" name="keaktifan"
                    @blur="subject.keaktifan = validateInput(subject.keaktifan, 'Keaktifan', subject.name)"
                    classes="w-full text-center text-sm rounded py-1 px-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    min="0" max="100" />
                </td>
              </tr>
            </template>
            <tr class="bg-blue-50 dark:bg-blue-900/30">
              <td colspan="3"
                class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center font-medium text-gray-800 dark:text-gray-100">
                Rata-rata</td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">{{ averages.uts }}</td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">{{ averages.uas }}</td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">{{ averages.tugas }}</td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center">{{ averages.keaktifan }}
              </td>
            </tr>
            <tr class="bg-blue-100 dark:bg-blue-900/40">
              <td colspan="6"
                class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center font-medium text-gray-800 dark:text-gray-100">
                Total</td>
              <td class="border border-gray-300 dark:border-gray-600 px-2 py-2 text-center font-bold">{{ finalAverage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end mt-6 gap-3">
        <button
          class="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
          @click="cancelAssessment" :disabled="loading">
          Batal
        </button>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
          @click="saveAssessment" :disabled="loading">
          <span v-if="loading"
            class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          Simpan
        </button>
      </div>
    </div>
  </Layout>
</template>