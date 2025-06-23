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
  useAdminSubjectStore,
  useAdminStudyYearStore,
  useAdminSubjectScheduleStore,
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
const subjectStore = useAdminSubjectStore();
const studyYearStore = useAdminStudyYearStore();
const subjectScheduleStore = useAdminSubjectScheduleStore();

const formData = ref({
  student_id: '',
  subject_id: '',
  study_year_id: '',
  uts_score: '',
  uas_score: '',
  tugas_score: '',
  activity_score: '',
  total_score: '',
  notes: ''
});

const students = ref([]);
const subjects = ref([]);
const subjectSchedules = ref([]);
const studyYears = ref([]);
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

const getSubjects = async () => {
  try {
    loading.value = true;
    await subjectStore.getSubject();

    subjects.value = subjectStore.subject.data.map(subject => ({
      value: subject.id,
      label: subject.name
    })) || [];
  } catch (error) {
    console.error('Error fetching class subjects:', error);
    showErrorToast('Gagal memuat data mata pelajaran');
  } finally {
    loading.value = false;
  }
};

const getSubjectSchedules = async () => {
  try {
    loading.value = true;
    await subjectScheduleStore.getSchedules();

    console.log('Subject schedules:', subjectScheduleStore.schedules);

    // subjectSchedules.value = subjectScheduleStore.schedules.map(schedule => ({
    //   value: schedule.id,
    //   label: `${schedule.subject.name} - ${schedule.class.name} (${schedule.study_year.semester} - ${schedule.study_year.year})`
    // })) || [];

  } catch (error) {
    console.error('Error fetching subject schedules:', error);
    showErrorToast('Gagal memuat data jadwal pelajaran');
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

watchEffect(() => {
  if (props.assesment) {
    formData.value = {
      student_id: props.assesment.student_id || '',
      subject_id: props.assesment.subject_id || '',
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
      subject_id: '',
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
    console.log('Saving assessment with data:', formData.value);

    if (!formData.value.student_id ||
      !formData.value.subject_id ||
      !formData.value.study_year_id ||
      formData.value.uts_score === '' ||
      formData.value.uas_score === '' ||
      formData.value.tugas_score === '' ||
      formData.value.activity_score === ''
    ) {
      showErrorToast('Semua field wajib diisi');
      loading.value = false;
      return;
    }

    const scores = [
      formData.value.uts_score,
      formData.value.uas_score,
      formData.value.tugas_score,
      formData.value.activity_score
    ];
    for (const score of scores) {
      if (score < 0 || score > 100) {
        showErrorToast('Nilai harus antara 0 dan 100');
        loading.value = false;
        return;
      }
    }

    const dataToSubmit = {
      ...formData.value,
      uts_score: parseFloat(formData.value.uts_score),
      uas_score: parseFloat(formData.value.uas_score),
      tugas_score: parseFloat(formData.value.tugas_score),
      activity_score: parseFloat(formData.value.activity_score),
      total_score: formData.value.total_score ? parseFloat(formData.value.total_score) : 0,
    };

    if (props.assesment) {
      dataToSubmit.id = props.assesment.id;
      await studentAssesmentStore.putStudentAssesment(dataToSubmit);
      showSuccessToast('Nilai berhasil diperbarui');
    } else {
      await studentAssesmentStore.postStudentAssesment(dataToSubmit);
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
  await getSubjects();
  await getSubjectSchedules();
  await getStudyYears();
});
</script>

<template>
  <div class="w-full">
    <div class="mb-4">
      <SelectField v-model="formData.student_id" label="Siswa" placeholder="Pilih siswa" name="student_id"
        :options="students" required />
    </div>

    <div class="mb-4">
      <SelectField v-model="formData.subject_id" label="Mata Pelajaran" placeholder="Pilih mata pelajaran"
        name="subject_id" :options="subjects" required />
    </div>

    <div class="mb-4">
      <SelectField v-model="formData.study_year_id" label="Tahun Ajaran" placeholder="Pilih tahun ajaran"
        name="study_year_id" :options="studyYears" required />
    </div>

    <div class="mb-4">
      <InputField v-model="formData.uts_score" label="Nilai UTS" placeholder="Masukkan UTS Score (0-100)"
        name="uts_score" type="number" min="0" max="100" required />
    </div>

    <div class="mb-4">
      <InputField v-model="formData.uas_score" label="Nilai UAS" placeholder="Masukkan UAS Score (0-100)"
        name="uas_score" type="number" min="0" max="100" required />
    </div>

    <div class="mb-4">
      <InputField v-model="formData.tugas_score" label="Nilai Tugas" placeholder="Masukkan Tugas Score (0-100)"
        name="tugas_score" type="number" min="0" max="100" required />
    </div>

    <div class="mb-4">
      <InputField v-model="formData.activity_score" label="Nilai Aktivitas"
        placeholder="Masukkan Aktivitas Score (0-100)" name="activity_score" type="number" min="0" max="100" required />
    </div>

    <div class="mb-4">
      <InputField v-model="formData.total_score" label="Nilai Total (Optional)"
        placeholder="Masukkan Total Score (0-100)" name="total_score" type="number" min="0" max="100" />
    </div>

    <div class="mb-4">
      <InputField v-model="formData.notes" label="Catatan" placeholder="Masukkan catatan (opsional)" name="notes"
        type="textarea" />
    </div>
  </div>
</template>