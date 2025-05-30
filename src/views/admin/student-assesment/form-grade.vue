<script setup>
import { ref, computed, onMounted } from 'vue';
import Layout from "@/layouts/main.vue";
import InputField from "@/components/widgets/Input";
import SelectField from "@/components/widgets/Select";
import {
  useAdminStudentAssesment,
  useAdminStudentStore,
  useAdminSubjectStore,
  useAdminStudyYearStore
} from '@/state/pinia';
import { showSuccessToast, showErrorToast } from "@/helpers/alert.js";

// Store instances
const studentAssesmentStore = useAdminStudentAssesment();
const studentStore = useAdminStudentStore();
const subjectStore = useAdminSubjectStore();
const studyYearStore = useAdminStudyYearStore();

// Student data form
const formData = ref({
  student_id: '',
  student_name: 'Ricky Hadianto',
  student_nis: 'STU-202500',
  study_year_id: '',
  academic_year: '2',
  class: 'A',
});

// Options for select fields
const students = ref([]);
const studyYears = ref([]);
const loading = ref(false);

// Assessment data structure
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

// Calculate averages
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

// Calculate final average
const finalAverage = computed(() => {
  const sum = subjects.value.reduce((sum, subject) => {
    return sum + subject.uts + subject.uas + subject.tugas + subject.keaktifan;
  }, 0);

  return (sum / (subjects.value.length * 4)).toFixed(5);
});

// Data fetching functions
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

// Handle save action
const saveAssessment = async () => {
  try {
    loading.value = true;

    // Validation
    for (const subject of subjects.value) {
      if (subject.uts < 0 || subject.uts > 100 ||
        subject.uas < 0 || subject.uas > 100 ||
        subject.tugas < 0 || subject.tugas > 100 ||
        subject.keaktifan < 0 || subject.keaktifan > 100) {
        showErrorToast('Nilai harus antara 0 dan 100');
        return;
      }
    }

    // Format data for submission
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

// Handle cancel action
const cancelAssessment = () => {
  // Navigate back or clear form
  window.history.back();
};

onMounted(async () => {
  await getStudents();
  await getStudyYears();
});
</script>

<template>
  <Layout>
    <div class="student-assessment-form p-4">
      <h3 class="text-center mb-4">Add Nilai Siswa/i</h3>

      <div class="student-info mb-4">
        <div class="row mb-2">
          <div class="col-md-6">
            <SelectField v-model="formData.student_id" label="Nama Siswa" placeholder="Pilih siswa" name="student_id"
              :options="students" required />
          </div>
          <div class="col-md-6">
            <SelectField v-model="formData.study_year_id" label="Tahun Pelajaran" placeholder="Pilih tahun ajaran"
              name="study_year_id" :options="studyYears" required />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <InputField v-model="formData.student_nis" label="NIS" placeholder="Nomor Induk Siswa" name="student_nis"
              disabled />
          </div>
          <div class="col-md-6">
            <InputField v-model="formData.class" label="Kelas" placeholder="Kelas" name="class" disabled />
          </div>
        </div>
      </div>

      <div class="assessment-table">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="text-center" rowspan="2">No</th>
              <th class="text-center" rowspan="2">Komponen</th>
              <th class="text-center" rowspan="2">KKM</th>
              <th class="text-center" colspan="4">Nilai Hasil Belajar</th>
            </tr>
            <tr>
              <th class="text-center">UTS</th>
              <th class="text-center">UAS</th>
              <th class="text-center">Tugas</th>
              <th class="text-center">Keaktifan</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(subject, index) in subjects" :key="subject.id">
              <tr v-if="index === 0 || subjects[index - 1].type !== subject.type">
                <td colspan="7">{{ subject.type }}</td>
              </tr>
              <tr>
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ subject.name }}</td>
                <td class="text-center">
                  <InputField type="number" v-model="subject.kkm" name="kkm"
                    classes="form-control form-control-sm text-center" min="0" max="100" />
                </td>
                <td class="text-center">
                  <InputField type="number" v-model="subject.uts" name="uts"
                    classes="form-control form-control-sm text-center" min="0" max="100" />
                </td>
                <td class="text-center">
                  <InputField type="number" v-model="subject.uas" name="uas"
                    classes="form-control form-control-sm text-center" min="0" max="100" />
                </td>
                <td class="text-center">
                  <InputField type="number" v-model="subject.tugas" name="tugas"
                    classes="form-control form-control-sm text-center" min="0" max="100" />
                </td>
                <td class="text-center">
                  <InputField type="number" v-model="subject.keaktifan" name="keaktifan"
                    classes="form-control form-control-sm text-center" min="0" max="100" />
                </td>
              </tr>
            </template>
            <tr>
              <td colspan="3" class="text-center">Rata-rata</td>
              <td class="text-center">{{ averages.uts }}</td>
              <td class="text-center">{{ averages.uas }}</td>
              <td class="text-center">{{ averages.tugas }}</td>
              <td class="text-center">{{ averages.keaktifan }}</td>
            </tr>
            <tr>
              <td colspan="6" class="text-center">Total</td>
              <td class="text-center">{{ finalAverage }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex justify-content-end mt-3">
        <button class="btn btn-secondary me-2" @click="cancelAssessment" :disabled="loading">Batal</button>
        <button class="btn btn-primary" @click="saveAssessment" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Simpan
        </button>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.student-assessment-form {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table {
  font-size: 14px;
}

.table th,
.table td {
  vertical-align: middle;
}

h3 {
  font-weight: 600;
}

:deep(.form-control-sm) {
  width: 60px !important;
  text-align: center !important;
  padding: 0.25rem 0.5rem !important;
}

:deep(.form-label) {
  font-weight: 500;
}
</style>