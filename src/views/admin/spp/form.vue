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
  useAdminSPPStore,
  useAdminStudyYearStore,
} from '@/state/pinia';
import { showSuccessToast, showErrorToast } from "@/helpers/alert.js";

const props = defineProps({
  spp: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['refresh', 'close']);

const sppStore = useAdminSPPStore();
const studyYearStore = useAdminStudyYearStore();
const formData = ref({
  name: '',
  nominal: '',
  study_year_id: ''
});
const studyYears = ref([]);
const loading = ref(false);

const getStudyYears = async () => {
  try {
    loading.value = true;
    await studyYearStore.getStudyYears();
    studyYears.value = studyYearStore.studyYears.data;
  } catch (error) {
    console.error('Error fetching study years:', error);
    showErrorToast('Gagal memuat tahun ajaran');
  } finally {
    loading.value = false;
  }
};

watchEffect(() => {
  if (props.spp) {
    formData.value = {
      name: props.spp.name || '',
      nominal: props.spp.nominal || '',
      study_year_id: props.spp.study_year_id || ''
    };
  } else {
    formData.value = {
      name: '',
      nominal: '',
      study_year_id: ''
    };
  }
});

const saveSpp = async () => {
  try {
    loading.value = true;
    if (!formData.value.name || !formData.value.nominal || !formData.value.study_year_id) {
      showErrorToast('Mohon lengkapi semua field');
      loading.value = false;
      return;
    }

    const dataToSubmit = {
      ...formData.value,
      nominal: Number(formData.value.nominal)
    };

    if (props.spp) {
      await sppStore.updateSpp(props.spp.id, dataToSubmit);
      showSuccessToast('SPP berhasil diperbarui');
    } else {
      await sppStore.createSpp(dataToSubmit);
      showSuccessToast('SPP berhasil ditambahkan');
    }

    emit('refresh');
    emit('close');
  } catch (error) {
    console.error('Error saving SPP:', error);
    showErrorToast(error.message || 'Terjadi kesalahan saat menyimpan data');
  } finally {
    loading.value = false;
  }
};

defineExpose({
  saveSpp
});

onMounted(async () => {
  await getStudyYears();
})
</script>

<template>
  <div class="w-full">
    <div class="mb-4">
      <InputField v-model="formData.name" label="Nama SPP" placeholder="Masukkan nama SPP" name="name" required />
    </div>

    <div class="mb-4">
      <InputField v-model="formData.nominal" label="Nominal" placeholder="Masukkan nominal" name="nominal" type="number"
        required />
    </div>

    <div class="mb-4">
      <SelectField v-model="formData.study_year_id" label="Tahun Ajaran" placeholder="Pilih tahun ajaran"
        name="study_year_id" :options="studyYears" required />
    </div>
  </div>
</template>