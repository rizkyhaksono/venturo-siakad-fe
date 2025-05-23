<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  watchEffect,
  defineExpose,
  onMounted
} from 'vue';
import InputField from "@/components/widgets/Input";
import SelectField from "@/components/widgets/Select";
import {
  useAdminStudentAssesment,
  useAdminStudentStore,
  useAdminSubjectScheduleStore
} from '@/state/pinia';
import { showSuccessToast, showErrorToast } from "@/helpers/alert.js";

const props = defineProps({
  assesment: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['refresh', 'close']);

const studentAssesmentStore = useAdminStudentAssesment();
const studentStore = useAdminStudentStore();
const subjectSchedule = useAdminSubjectScheduleStore();

const formData = ref({
  student_id: '',
  class_subject_id: '',
  study_year_id: '',
  uts_score: '',
  uas_score: '',
  tugas_score: '',
  activity_score: '',
  total_score: '',
  notes: ''
});

const students = ref([]);
const classSubjects = ref([]);
const loading = ref(false);

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

const getClassSubjects = async () => {
  try {
    loading.value = true;
    await subjectSchedule.getSchedules();

    // Format class subjects for select field
    classSubjects.value = subjectSchedule.schedules.map(item => ({
      value: item.id,
      label: `${item.subject.name} - ${item.class.name} (${item.teacher.name})`
    })) || [];
  } catch (error) {
    console.error('Error fetching class subjects:', error);
    showErrorToast('Gagal memuat data mata pelajaran');
  } finally {
    loading.value = false;
  }
};

watchEffect(() => {
  if (props.assesment) {
    formData.value = {
      student_id: props.assesment.student_id || '',
      class_subject_id: props.assesment.class_subject_id || '',
      study_year_id: props.assesment.study_year_id || '',
      uts_score: props.assesment.uts_score || '',
      uas_score: props.assesment.uas_score || '',
      tugas_score: props.assesment.tugas_score || '',
      activity_score: props.assesment.activity_score || '',
      total_score: props.assesment.total_score || '',
      notes: props.assesment.notes || ''
    };
  } else {
    formData.value = {
      student_id: '',
      class_subject_id: '',
      study_year_id: '',
      uts_score: '',
      uas_score: '',
      tugas_score: '',
      activity_score: '',
      total_score: '',
      notes: ''
    };
  }
});

const saveAssesment = async () => {
  try {
    loading.value = true;

    // Validation
    if (
      !formData.value.student_id ||
      !formData.value.class_subject_id ||
      !formData.value.study_year_id ||
      !formData.value.uts_score ||
      !formData.value.uas_score ||
      !formData.value.tugas_score ||
      !formData.value.activity_score
    ) {
      showErrorToast('Mohon lengkapi field yang dibutuhkan');
      loading.value = false;
      return;
    }

    // Validate score is between 0-100
    const score = Number(formData.value.score);
    if (isNaN(score) || score < 0 || score > 100) {
      showErrorToast('Nilai harus antara 0-100');
      loading.value = false;
      return;
    }

    const dataToSubmit = {
      ...formData.value,
      score: score
    };

    if (props.assesment) {
      // Update existing assessment
      await studentAssesmentStore.updateStudentAssesment(props.assesment.id, dataToSubmit);
      showSuccessToast('Nilai berhasil diperbarui');
    } else {
      // Create new assessment
      await studentAssesmentStore.createStudentAssesment(dataToSubmit);
      showSuccessToast('Nilai berhasil ditambahkan');
    }

    emit('refresh');
    emit('close');
  } catch (error) {
    console.error('Error saving assessment:', error);
    showErrorToast(error.message || 'Terjadi kesalahan saat menyimpan data');
  } finally {
    loading.value = false;
  }
};

defineExpose({
  saveAssesment
});

onMounted(async () => {
  await getStudents();
  await getClassSubjects();
});
</script>

<template>
  <div class="w-full">
    <div class="mb-4">
      <SelectField v-model="formData.student_id" label="Siswa" placeholder="Pilih siswa" name="student_id"
        :options="students" required />
    </div>

    <div class="mb-4">
      <SelectField v-model="formData.class_subject_id" label="Mata Pelajaran" placeholder="Pilih mata pelajaran"
        name="class_subject_id" :options="classSubjects" required />
    </div>

    <div class="mb-4">
      <InputField v-model="formData.score" label="Nilai" placeholder="Masukkan nilai (0-100)" name="score" type="number"
        min="0" max="100" required />
    </div>

    <div class="mb-4">
      <InputField v-model="formData.notes" label="Catatan" placeholder="Masukkan catatan (opsional)" name="notes"
        type="textarea" />
    </div>
  </div>
</template>