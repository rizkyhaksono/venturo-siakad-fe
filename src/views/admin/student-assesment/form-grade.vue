<script setup>
import { ref, computed, onMounted } from 'vue';
import Layout from "@/layouts/main.vue";
import InputField from "@/components/widgets/Input";
import SelectField from "@/components/widgets/Select";
import {
  useAdminStudentAssesment,
  useAdminStudentStore,
  useAdminStudyYearStore
} from '@/state/pinia';
import { showSuccessToast, showErrorToast } from "@/helpers/alert.js";
import { useRoute } from 'vue-router';

const route = useRoute();
const studentId = route.params.id;

console.log('Student ID::', studentId);

const studentAssesmentStore = useAdminStudentAssesment();
const studentStore = useAdminStudentStore();
const studyYearStore = useAdminStudyYearStore();

const formData = ref({
  student_id: '',
  student_name: 'Ricky Hadianto',
  student_nis: 'STU-202500',
  study_year_id: '',
  academic_year: '2',
  class: 'A',
});

const students = ref([]);
const studyYears = ref([]);
const loading = ref(false);

const subjects = ref([
  {
    id: 1,
    type: 'A. Mata Pelajaran',
    name: 'Pendidikan Agama',
    kkm: 80,
    uts: 81,
    uas: 98,
    tugas: 81,
    keaktifan: 81
  },
  {
    id: 2,
    type: 'A. Mata Pelajaran',
    name: 'Matematika',
    kkm: 78,
    uts: 81,
    uas: 98,
    tugas: 81,
    keaktifan: 81
  },
  {
    id: 3,
    type: 'A. Mata Pelajaran',
    name: 'Bahasa Indonesia',
    kkm: 80,
    uts: 89,
    uas: 98,
    tugas: 81,
    keaktifan: 81
  },
  {
    id: 4,
    type: 'A. Mata Pelajaran',
    name: 'PKN',
    kkm: 78,
    uts: 81,
    uas: 98,
    tugas: 81,
    keaktifan: 81
  },
  {
    id: 5,
    type: 'A. Mata Pelajaran',
    name: 'IPA',
    kkm: 76,
    uts: 90,
    uas: 98,
    tugas: 81,
    keaktifan: 81
  },
  {
    id: 6,
    type: 'A. Mata Pelajaran',
    name: 'IPS',
    kkm: 78,
    uts: 81,
    uas: 98,
    tugas: 81,
    keaktifan: 81
  },
  {
    id: 7,
    type: 'A. Mata Pelajaran',
    name: 'PJOK',
    kkm: 81,
    uts: 81,
    uas: 98,
    tugas: 81,
    keaktifan: 81
  },
  {
    id: 8,
    type: 'B. Muatan Lokal',
    name: 'Bahasa Jawa',
    kkm: 80,
    uts: 81,
    uas: 98,
    tugas: 81,
    keaktifan: 81
  },
]);

const averages = computed(() => {
  const total = subjects.value.length;

  const utsSum = subjects.value.reduce((sum, subject) => sum + subject.uts, 0);
  const uasSum = subjects.value.reduce((sum, subject) => sum + subject.uas, 0);
  const tugasSum = subjects.value.reduce((sum, subject) => sum + subject.tugas, 0);
  const keaktifanSum = subjects.value.reduce((sum, subject) => sum + subject.keaktifan, 0);

  return {
    uts: (utsSum / total).toFixed(3),
    uas: (uasSum / total).toFixed(3),
    tugas: (tugasSum / total).toFixed(3),
    keaktifan: (keaktifanSum / total).toFixed(3)
  };
});

const finalAverage = computed(() => {
  const sum = subjects.value.reduce((sum, subject) => {
    return sum + subject.uts + subject.uas + subject.tugas + subject.keaktifan;
  }, 0);

  return (sum / (subjects.value.length * 4)).toFixed(5);
});

const getStudents = async () => {
  try {
    loading.value = true;
    await studentStore.getStudents();

    students.value = studentStore.students.map(student => ({
      value: student.id,
      label: `${student.name} (${student.student_number})`
    })) || [];
  } catch (error) {
    console.error('Error fetching students:', error);
    showErrorToast('Gagal memuat data siswa');
  } finally {
    loading.value = false;
  }
};

const getStudentById = async (id) => {
  try {
    loading.value = true;
    await studentStore.getStudentById(id);
    console.log('Fetched student:', studentStore.student);
  } catch (error) {
    console.error('Error fetching student:', error);
    showErrorToast('Gagal memuat data siswa');
  } finally {
    loading.value = false;
  }
}

const getStudyYears = async () => {
  try {
    loading.value = true;
    await studyYearStore.getStudyYears();

    studyYears.value = studyYearStore.studyYears.map(year => ({
      value: year.id,
      label: `${year.semester} - ${year.year}`
    })) || [];
  } catch (error) {
    console.error('Error fetching study years:', error);
    showErrorToast('Gagal memuat data tahun ajaran');
  } finally {
    loading.value = false;
  }
};

const saveAssessment = async () => {
  try {
    loading.value = true;

    for (const subject of subjects.value) {
      if (subject.uts < 0 || subject.uts > 100 ||
        subject.uas < 0 || subject.uas > 100 ||
        subject.tugas < 0 || subject.tugas > 100 ||
        subject.keaktifan < 0 || subject.keaktifan > 100) {
        showErrorToast('Nilai harus antara 0 dan 100');
        return;
      }
    }

    const assessmentData = subjects.value.map(subject => ({
      subject_id: subject.id,
      student_id: formData.value.student_id,
      study_year_id: formData.value.study_year_id,
      uts_score: subject.uts,
      uas_score: subject.uas,
      tugas_score: subject.tugas,
      activity_score: subject.keaktifan,
      total_score: (subject.uts + subject.uas + subject.tugas + subject.keaktifan) / 4
    }));

    // Save data via API
    // await studentAssesmentStore.postBulkStudentAssesment(assessmentData);

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
  await getStudents();
  await getStudyYears();
  if (studentId) {
    await getStudentById(studentId);
  }
});
</script>

<template>
  <Layout>
    <div class="px-4 py-6 bg-white shadow-sm rounded-lg">
      <h3 class="text-2xl font-semibold text-center text-gray-800 mb-6">Add Nilai Siswa/i</h3>

      <div class="mb-6 bg-gray-50 p-4 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <SelectField v-model="formData.student_id" label="Nama Siswa" placeholder="Pilih siswa" name="student_id"
              :options="students" required class="w-full" />
          </div>
          <div>
            <SelectField v-model="formData.study_year_id" label="Tahun Pelajaran" placeholder="Pilih tahun ajaran"
              name="study_year_id" :options="studyYears" required class="w-full" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputField v-model="formData.student_nis" label="NIS" placeholder="Nomor Induk Siswa" name="student_nis"
              disabled class="w-full" />
          </div>
          <div>
            <InputField v-model="formData.class" label="Kelas" placeholder="Kelas" name="class" disabled
              class="w-full" />
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th scope="row" class="border border-gray-300 px-2 py-2 text-center align-middle" rowspan="2">
                No
              </th>
              <th id="komponen" scope="col" class="border border-gray-300 px-2 py-2 text-center align-middle"
                rowspan="2">Komponen
              </th>
              <th scope="row" id="kkm" class="border border-gray-300 px-2 py-2 text-center align-middle" rowspan="2">KKM
              </th>
              <th scope="row" id="hasil-nilai" class="border border-gray-300 px-2 py-2 text-center align-middle"
                colspan="4">Nilai Hasil
                Belajar</th>
            </tr>
            <tr class="bg-gray-100">
              <th scope="col" class="border border-gray-300 px-2 py-2 text-center">UTS</th>
              <th scope="col" class="border border-gray-300 px-2 py-2 text-center">UAS</th>
              <th scope="col" class="border border-gray-300 px-2 py-2 text-center">Tugas</th>
              <th scope="col" class="border border-gray-300 px-2 py-2 text-center">Keaktifan</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(subject, index) in subjects" :key="subject.id">
              <tr v-if="index === 0 || subjects[index - 1].type !== subject.type">
                <td class="border border-gray-300 px-2 py-2 bg-blue-50 font-medium" colspan="7">{{ subject.type }}</td>
              </tr>
              <tr :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'">
                <td class="border border-gray-300 px-2 py-2 text-center">{{ index + 1 }}</td>
                <td class="border border-gray-300 px-2 py-2">{{ subject.name }}</td>
                <td class="border border-gray-300 px-2 py-2 text-center w-20">
                  <InputField type="number" v-model="subject.kkm" name="kkm"
                    classes="w-full text-center text-sm rounded py-1 px-2" min="0" max="100" />
                </td>
                <td class="border border-gray-300 px-2 py-2 text-center w-20">
                  <InputField type="number" v-model="subject.uts" name="uts"
                    classes="w-full text-center text-sm rounded py-1 px-2" min="0" max="100" />
                </td>
                <td class="border border-gray-300 px-2 py-2 text-center w-20">
                  <InputField type="number" v-model="subject.uas" name="uas"
                    classes="w-full text-center text-sm rounded py-1 px-2" min="0" max="100" />
                </td>
                <td class="border border-gray-300 px-2 py-2 text-center w-20">
                  <InputField type="number" v-model="subject.tugas" name="tugas"
                    classes="w-full text-center text-sm rounded py-1 px-2" min="0" max="100" />
                </td>
                <td class="border border-gray-300 px-2 py-2 text-center w-20">
                  <InputField type="number" v-model="subject.keaktifan" name="keaktifan"
                    classes="w-full text-center text-sm rounded py-1 px-2" min="0" max="100" />
                </td>
              </tr>
            </template>
            <tr class="bg-blue-50">
              <td colspan="3" class="border border-gray-300 px-2 py-2 text-center font-medium">Rata-rata</td>
              <td class="border border-gray-300 px-2 py-2 text-center">{{ averages.uts }}</td>
              <td class="border border-gray-300 px-2 py-2 text-center">{{ averages.uas }}</td>
              <td class="border border-gray-300 px-2 py-2 text-center">{{ averages.tugas }}</td>
              <td class="border border-gray-300 px-2 py-2 text-center">{{ averages.keaktifan }}</td>
            </tr>
            <tr class="bg-blue-100">
              <td colspan="6" class="border border-gray-300 px-2 py-2 text-center font-medium">Total</td>
              <td class="border border-gray-300 px-2 py-2 text-center font-bold">{{ finalAverage }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end mt-6 gap-3">
        <button
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
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