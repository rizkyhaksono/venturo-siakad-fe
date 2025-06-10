<script setup>
import { ref, watch, defineProps, defineEmits, defineExpose, onMounted } from 'vue';
import {
  useAdminSPPStore,
  useAdminSPPHistoryStore,
  useAdminUserStore
} from '@/state/pinia';
import SelectField from "@/components/widgets/Select.vue";
import DatePicker from '@/components/widgets/DatePicker.vue';
import { showSuccessToast, showErrorToast } from "@/helpers/alert.js";

const sppStore = useAdminSPPStore();
const sppHistoryStore = useAdminSPPHistoryStore();
const userStore = useAdminUserStore();

const props = defineProps({
  sppHistory: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['refresh', 'close']);

const form = ref({
  user_id: '',
  spp_id: '',
  payment_date: new Date().toISOString().substr(0, 10),
  payment_status: 'pending',
  payment_method: 'transfer',
});

const userOptions = ref([]);
const sppOptions = ref([]);

const fetchUsers = async () => {
  try {
    await userStore.getUsers();
    userOptions.value = userStore.users.map(user => ({
      value: user.id,
      label: `${user.name} (${user.email})`
    }));
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

const fetchSPP = async () => {
  try {
    await sppStore.getSPP();
    sppOptions.value = sppStore.spp.data.map(spp => ({
      value: spp.id,
      label: `${spp.name} - ${spp.jenis_biaya} - ${spp.total}`
    }));
  } catch (error) {
    console.error("Failed to fetch SPP:", error);
  }
};

const paymentMethods = [
  { value: 'transfer', label: 'Transfer Bank' },
  { value: 'cash', label: 'Tunai' },
  { value: 'digital', label: 'Dompet Digital' },
];

const paymentStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'cancelled', label: 'Cancelled' },
];

watch(() => props.sppHistory, (newVal) => {
  if (newVal) {
    const sppData = newVal.data || newVal;
    form.value = {
      id: sppData.id,
      user_id: sppData.user_id,
      spp_id: sppData.spp_id,
      payment_status: sppData.payment_status || 'pending',
      payment_method: sppData.payment_method || 'transfer',
      payment_date: sppData.payment_date ? sppData.payment_date.substring(0, 10) : new Date().toISOString().substring(0, 10)
    };

    if (sppData.payment_date) {
      form.value.payment_date = new Date(sppData.payment_date).toISOString().substr(0, 10);
    }
  }
}, { immediate: true });

const submitForm = async () => {
  try {
    if (!form.value.user_id && props.sppHistory?.data?.user_id) {
      form.value.user_id = props.sppHistory.data.user_id;
    } else if (!form.value.user_id && props.sppHistory?.user_id) {
      form.value.user_id = props.sppHistory.user_id;
    }

    if (!form.value.spp_id && props.sppHistory?.data?.spp_id) {
      form.value.spp_id = props.sppHistory.data.spp_id;
    } else if (!form.value.spp_id && props.sppHistory?.spp_id) {
      form.value.spp_id = props.sppHistory.spp_id;
    }

    const id = form.value.id;
    const requestData = {
      user_id: form.value.user_id,
      spp_id: form.value.spp_id,
      payment_date: form.value.payment_date,
      payment_status: form.value.payment_status,
      payment_method: form.value.payment_method
    };

    console.log("ID for update:", id, "Request data:", requestData);

    if (id) {
      await sppHistoryStore.updateSPPHistory(id, requestData).then(() => {
        showSuccessToast("SPP History updated successfully");
      });
    } else {
      await sppHistoryStore.postSPPHistory(requestData).then(() => {
        showSuccessToast("SPP History created successfully");
      });
    }

    emit('refresh');
    emit('close');
  } catch (error) {
    showErrorToast("Failed to save SPP History");
    console.error(error);
  }
};

defineExpose({
  submitForm
});

onMounted(async () => {
  await fetchUsers();
  await fetchSPP();
});
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <!-- User field -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User</label>
      <SelectField v-model="form.user_id" :options="userOptions" placeholder="Pilih User" />
    </div>

    <!-- SPP History field -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SPP</label>
      <SelectField v-model="form.spp_id" :options="sppOptions" placeholder="Pilih SPP" />
    </div>

    <!-- Payment Date field -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Pembayaran</label>
      <DatePicker v-model="form.payment_date" placeholder="Pilih tanggal pembayaran" />
    </div>

    <!-- Payment Method field -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Metode Pembayaran</label>
      <SelectField v-model="form.payment_method" :options="paymentMethods" placeholder="Pilih Metode Pembayaran" />
    </div>

    <!-- Payment Status field -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status Pembayaran</label>
      <SelectField v-model="form.payment_status" :options="paymentStatuses" placeholder="Pilih Status Pembayaran" />
    </div>
  </form>
</template>