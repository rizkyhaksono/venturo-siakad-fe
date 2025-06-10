<script setup>
import { ref, watch, defineProps, defineEmits, defineExpose, onMounted } from 'vue';
import {
  useStudentSPPHistoryStore,
  useAuthStore
} from "@/state/pinia";
import SelectField from "@/components/widgets/Select.vue";
import DatePicker from '@/components/widgets/DatePicker.vue';
import { showSuccessToast, showErrorToast } from "@/helpers/alert.js";

const props = defineProps({
  spp: {
    type: Object,
    default: () => null
  }
});

const emit = defineEmits(['refresh', 'close']);

const studentSPPHistoryStore = useStudentSPPHistoryStore();
const authStore = useAuthStore();

const form = ref({
  user_id: '',
  spp_id: '',
  payment_date: new Date().toISOString().substr(0, 10),
  payment_status: 'pending',
  payment_method: 'transfer',
});

const paymentMethods = [
  { value: 'transfer', label: 'Transfer Bank' },
  { value: 'cash', label: 'Tunai' },
  { value: 'digital', label: 'Dompet Digital' },
];

const fileInputRef = ref(null);
const fileName = ref('');
const previewImage = ref(null);

watch(() => props.spp, (newVal) => {
  if (newVal) {
    console.log("SPP data received:", newVal);
    form.value.spp_id = newVal.id || '';
    form.value.payment_date = new Date().toISOString().substr(0, 10);
    form.value.payment_method = 'transfer';
    form.value.payment_proof = null;
  }
}, { immediate: true });

const getProfile = async () => {
  await authStore.saveUserLogin();
  form.value.user_id = authStore.userLogin.id;
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.payment_proof = file;
    fileName.value = file.name;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const triggerFileInput = () => {
  fileInputRef.value.click();
};

const submitForm = async () => {
  try {
    if (!form.value.spp_id) {
      showErrorToast('Data SPP tidak valid');
      return;
    }

    // Create form data for file upload
    const formData = new FormData();
    formData.append('spp_id', form.value.spp_id);
    formData.append('payment_date', form.value.payment_date);
    formData.append('payment_method', form.value.payment_method);
    formData.append('payment_status', form.value.payment_status);
    formData.append('user_id', form.value.user_id);

    if (form.value.payment_proof) {
      formData.append('payment_proof', form.value.payment_proof);
    }

    await studentSPPHistoryStore.postSPPHistory(formData)
      .then(() => showSuccessToast('Pembayaran berhasil disimpan'));
    emit('refresh');
    emit('close');
  } catch (error) {
    console.error("Error submitting payment:", error);
    showErrorToast('Gagal menyimpan pembayaran');
  }
};

defineExpose({
  submitForm
});

onMounted(async () => {
  await getProfile();
});
</script>

<template>
  <div>
    <div v-if="spp" class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 class="font-medium text-gray-800 dark:text-white mb-2">Detail Pembayaran</h3>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Nama SPP</p>
          <p class="font-medium text-gray-800 dark:text-white">{{ spp.name }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Jenis Biaya</p>
          <p class="font-medium text-gray-800 dark:text-white">{{ spp.jenis_biaya }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Total</p>
          <p class="font-medium text-gray-800 dark:text-white">{{ new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          }).format(spp.total) }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Tahun Ajaran</p>
          <p class="font-medium text-gray-800 dark:text-white">Semester {{ spp.study_year?.semester }} - {{
            spp.study_year?.year }}</p>
        </div>
      </div>
    </div>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Pembayaran</label>
        <DatePicker v-model="form.payment_date" placeholder="Pilih tanggal pembayaran" />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Metode Pembayaran</label>
        <SelectField v-model="form.payment_method" :options="paymentMethods" placeholder="Pilih Metode Pembayaran" />
      </div>

      <!-- <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bukti Pembayaran</label>
        <div class="mt-1 flex flex-col items-center space-y-2">
          <input ref="fileInputRef" type="file" @change="handleFileUpload" accept="image/*" class="hidden" />
          <button type="button" @click="triggerFileInput"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600">
            Upload Bukti Pembayaran
          </button>
          <p v-if="fileName" class="text-sm text-gray-600 dark:text-gray-400">{{ fileName }}</p>
        </div>
      </div>

      <div v-if="previewImage" class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preview</label>
        <div class="mt-1">
          <img :src="previewImage" class="max-h-48 rounded border border-gray-300 dark:border-gray-600" />
        </div>
      </div> -->
    </form>
  </div>
</template>