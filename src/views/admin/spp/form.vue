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
  jenis_biaya: '',
  total: '',
  study_year_id: ''
});
const studyYears = ref([]);
const loading = ref(false);

const getStudyYears = async () => {
  try {
    loading.value = true;
    await studyYearStore.getStudyYears();
    studyYears.value = studyYearStore.studyYears.map(year => ({
      value: year.id,
      label: `${year.semester} - ${year.year}`
    }));
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
      jenis_biaya: props.spp.jenis_biaya || '',
      total: props.spp.total || '',
      study_year_id: props.spp.study_year_id || ''
    };
  } else {
    formData.value = {
      name: '',
      jenis_biaya: '',
      total: '',
      study_year_id: ''
    };
  }
});

const saveSpp = async () => {
  try {
    loading.value = true;
    if (!formData.value.name || !formData.value.total || !formData.value.study_year_id) {
      showErrorToast('Mohon lengkapi semua field');
      loading.value = false;
      return;
    }

    const dataToSubmit = {
      ...formData.value,
      total: Number(formData.value.total)
    };

    if (props.spp) {
      await sppStore.updateSPP(props.spp.id, dataToSubmit);
      showSuccessToast('SPP berhasil diperbarui');
    } else {
      await sppStore.postSPP(dataToSubmit);
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
      <SelectField v-model="formData.jenis_biaya" label="Jenis Biaya" placeholder="Pilih jenis biaya" name="jenis_biaya"
        :options="[
          { value: 'Reguler', label: 'Reguler' },
          { value: 'Mandiri', label: 'Mandiri' },
        ]" required />
    </div>

    <div class="mb-4">
      <InputField v-model="formData.total" label="Total Nominal" placeholder="Masukkan total nominal" name="total"
        type="number" required />
    </div>

    <div class="mb-4">
      <SelectField v-model="formData.study_year_id" label="Tahun Ajaran" placeholder="Pilih tahun ajaran"
        name="study_year_id" :options="studyYears" required />
    </div>
  </div>
</template>