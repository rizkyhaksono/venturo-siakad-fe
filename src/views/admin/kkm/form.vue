<script setup>
import { ref, watch, defineProps, defineEmits, defineExpose } from 'vue';
import InputField from "@/components/widgets/Input.vue";
import SelectField from "@/components/widgets/Select.vue";
import {
  useAdminKKMStore,
  useAdminSubjectStore,
} from "@/state/pinia";
import { showSuccessToast, showErrorToast } from "@/helpers/alert.js";

const props = defineProps({
  kkm: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['refresh', 'close']);

const kkmStore = useAdminKKMStore();
const subjectStore = useAdminSubjectStore();

const form = ref({
  subject_id: '',
  min_score: '',
  description: ''
});

const subjects = ref([]);
const studyYears = ref([]);
const isLoading = ref(false);

const fetchSubjects = async () => {
  try {
    await subjectStore.getSubject();
    subjects.value = subjectStore.subject.data.map(subject => ({
      label: subject.name,
      value: subject.id
    }));
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }
};

watch(() => props.kkm, (newVal) => {
  if (newVal) {
    form.value = {
      subject_id: newVal.subject_id,
      min_score: newVal.min_score,
      description: newVal.description
    };
  } else {
    form.value = {
      subject_id: '',
      min_score: '',
      description: ''
    };
  }
}, { immediate: true });

const submitForm = async () => {
  try {
    isLoading.value = true;
    if (props.kkm) {
      await kkmStore.putKKM(props.kkm.id, form.value);
      showSuccessToast('KKM berhasil diperbarui');
    } else {
      await kkmStore.postKKM(form.value);
      showSuccessToast('KKM berhasil ditambahkan');
    }
    emit('refresh');
    emit('close');
  } catch (error) {
    showErrorToast(error.message || 'Terjadi kesalahan saat menyimpan data');
  } finally {
    isLoading.value = false;
  }
};

defineExpose({
  submitForm
});

fetchSubjects();
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran</label>
      <SelectField v-model="form.subject_id" :options="subjects" placeholder="Pilih mata pelajaran" />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Nilai KKM</label>
      <InputField v-model="form.min_score" type="number" placeholder="Masukkan nilai KKM" />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <InputField v-model="form.description" :options="studyYears" placeholder="Isi deskripsi KKM ini" />
    </div>
  </form>
</template>