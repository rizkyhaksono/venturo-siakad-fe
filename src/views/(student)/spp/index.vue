<script setup>
import Layout from "@/layouts/main.vue";
import {
  useStudentSPPStore,
  useStudentSPPHistoryStore
} from "@/state/pinia";
import { onMounted, ref } from "vue";
import Button from "@/components/widgets/Button.vue";
import Modal from "@/components/widgets/Modal.vue";
import FormSPP from "@/views/(student)/spp/form.vue";

const sppStore = useStudentSPPStore();
const sppHistoryStore = useStudentSPPHistoryStore();
const sppRows = ref([]);
const sppHistoryRows = ref([]);
const selectedSpp = ref(null);

const modalRef = ref(null);
const formRef = ref(null);
const modalTitle = ref('Pembayaran');

const openPaymentModal = (sppItem) => {
  selectedSpp.value = sppItem;
  modalTitle.value = `Pembayaran: ${sppItem.name}`;
  modalRef.value.openModal();
};

const closeModal = () => {
  modalRef.value.closeModal();
  selectedSpp.value = null;
};

const submitModal = () => {
  if (formRef.value) {
    formRef.value.submitForm();
  }
};

const getSPP = async () => {
  await sppStore.getSPP();
  sppRows.value = sppStore.spp.data;
};

const getSPPHistory = async () => {
  await sppHistoryStore.getSPPHistory();
  sppHistoryRows.value = sppHistoryStore.sppHistory.data;
};

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const checkPaymentStatus = (sppId) => {
  const paymentRecord = sppHistoryRows.value.find(
    history => history.spp_id === sppId && history.payment_status === 'paid'
  );
  return paymentRecord ? 'LUNAS' : 'BELUM LUNAS';
};

const getStatusClass = (status) => {
  return status === 'LUNAS'
    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full font-medium transition-colors duration-200'
    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full font-medium transition-colors duration-200';
};

const showPayButton = (sppId) => {
  return checkPaymentStatus(sppId) !== 'LUNAS';
};

const calculateFinancialSummary = () => {
  const totalBill = sppRows.value.reduce((sum, row) => sum + row.total, 0);

  const paidAmount = sppHistoryRows.value.reduce((sum, history) => {
    if (history.payment_status === 'paid') {
      return sum + history.amount_paid;
    }
    return sum;
  }, 0);

  const unpaidAmount = totalBill - paidAmount;
  const paymentPercentage = totalBill > 0 ? Math.round((paidAmount / totalBill) * 100) : 0;

  return {
    totalBill,
    paidAmount,
    unpaidAmount,
    paymentPercentage
  };
};

const financialSummary = ref({
  totalBill: 0,
  paidAmount: 0,
  unpaidAmount: 0,
  paymentPercentage: 0
});

onMounted(async () => {
  await getSPP();
  await getSPPHistory();
  financialSummary.value = calculateFinancialSummary();
});
</script>

<template>
  <Layout>
    <template #title>Data SPP Siswa/i</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6
              class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-gray-800 dark:text-white transition-colors duration-200">
              List SPP
            </h6>
            <p
              class="font-sans antialiased text-base text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-200">
              Lihat Informasi Sumbangan Pembinaan Pendidikan
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <!-- Status Keuangan Card -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div class="flex items-center mb-4">
              <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-green-600 dark:text-green-400 transition-colors duration-200" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="font-semibold text-lg text-gray-800 dark:text-white transition-colors duration-200">Status
                Keuangan
              </h3>
            </div>

            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-300 transition-colors duration-200">Total Tagihan</span>
                <span class="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-200">{{
                  formatRupiah(financialSummary.totalBill) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-300 transition-colors duration-200">Sudah Dibayar</span>
                <span class="font-medium text-green-600 dark:text-green-400 transition-colors duration-200">{{
                  formatRupiah(financialSummary.paidAmount)
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-300 transition-colors duration-200">Tunggakan</span>
                <span class="font-medium text-red-600 dark:text-red-400 transition-colors duration-200">{{
                  formatRupiah(financialSummary.unpaidAmount)
                }}</span>
              </div>

              <div class="pt-3">
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2 transition-colors duration-200">
                  <div class="bg-green-600 dark:bg-green-500 h-2.5 rounded-full transition-colors duration-200"
                    :style="`width: ${financialSummary.paymentPercentage}%`"></div>
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 text-right transition-colors duration-200">
                  {{ financialSummary.paymentPercentage }}% terbayar
                </div>
              </div>
            </div>
          </div>

          <!-- Riwayat Pembayaran Card -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div class="flex items-center mb-4">
              <div class="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-blue-600 dark:text-blue-400 transition-colors duration-200" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 class="font-semibold text-lg text-gray-800 dark:text-white transition-colors duration-200">Riwayat
                Pembayaran</h3>
            </div>

            <div class="space-y-4 max-h-60 overflow-y-auto">
              <div class="border-b border-gray-200 dark:border-gray-700 pb-3 transition-colors duration-200"
                v-for="payment in sppHistoryRows.slice(0, 3)" :key="payment.id">
                <div class="flex justify-between mb-1">
                  <span class="font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200">{{
                    payment.spp.name }}</span>
                  <span class="text-green-600 dark:text-green-400 transition-colors duration-200">{{
                    formatRupiah(payment.amount_paid) }}</span>
                </div>
                <div
                  class="flex justify-between text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                  <span>{{ new Date(payment.payment_date).toLocaleDateString('id-ID') }}</span>
                  <span>{{ payment.payment_status === 'paid' ? 'Lunas' : 'Proses' }}</span>
                </div>
              </div>
            </div>

            <div class="pt-3 text-center">
              <router-link
                class="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors duration-200"
                :to="'/student/spp-history'">
                Lihat Semua Riwayat
              </router-link>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <!-- Search component can be added here -->
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Modal Form  -->
            <Modal ref="modalRef">
              <template #title>
                <h1 class="text-xl font-bold">{{ modalTitle }}</h1>
              </template>
              <template #body>
                <FormSPP ref="formRef" :spp="selectedSpp" @refresh="getSPPHistory" @close="closeModal" />
              </template>
              <template #footer>
                <div class="flex justify-end gap-2">
                  <Button @click="closeModal" variant="outline" color="secondary">
                    Close
                  </Button>
                  <Button @click="submitModal" variant="solid" color="primary">
                    Submit
                  </Button>
                </div>
              </template>
            </Modal>
          </div>
        </div>
        <div
          class="mt-4 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
          <table class="w-full">
            <thead
              class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200">
              <tr>
                <th class="cursor-pointer px-4 py-3 text-start font-medium transition-colors duration-200">
                  <small
                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                    Name
                  </small>
                </th>
                <th class="cursor-pointer px-4 py-3 text-start font-medium transition-colors duration-200">
                  <small
                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                    Jenis Biaya
                  </small>
                </th>
                <th class="cursor-pointer px-4 py-3 text-start font-medium transition-colors duration-200">
                  <small
                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                    Total
                  </small>
                </th>
                <th class="cursor-pointer px-4 py-3 text-start font-medium transition-colors duration-200">
                  <small
                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                    Tahun Ajaran
                  </small>
                </th>
                <th class="cursor-pointer px-4 py-3 text-start font-medium transition-colors duration-200">
                  <small
                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                    Status
                  </small>
                </th>
                <th class="cursor-pointer px-4 py-3 text-start font-medium transition-colors duration-200">
                  <small
                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                    Actions
                  </small>
                </th>
              </tr>
            </thead>
            <tbody
              class="group text-sm text-gray-800 dark:text-gray-200 divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                v-for="row in sppRows" :key="row.id">
                <td class="p-4 transition-colors duration-200">
                  <small
                    class="font-sans antialiased text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200">
                    {{ row.name }}
                  </small>
                </td>
                <td class="p-4 transition-colors duration-200">
                  <small
                    class="font-sans antialiased text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200">
                    {{ row.jenis_biaya }}
                  </small>
                </td>
                <td class="p-4 transition-colors duration-200">
                  <small
                    class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200 transition-colors duration-200">
                    {{ formatRupiah(row.total) }}
                  </small>
                </td>
                <td class="p-4 transition-colors duration-200">
                  <small
                    class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200 transition-colors duration-200">
                    Semester {{ row.study_year?.semester }} - {{ row.study_year?.year }}
                  </small>
                </td>
                <td class="p-4 transition-colors duration-200">
                  <small :class="getStatusClass(checkPaymentStatus(row.id))">
                    {{ checkPaymentStatus(row.id) }}
                  </small>
                </td>
                <td class="p-4 transition-colors duration-200">
                  <div class="flex gap-2 justify-start">
                    <Button v-if="showPayButton(row.id)" @click="openPaymentModal(row)" variant="outline"
                      color="secondary"
                      class="bg-primary dark:bg-gray-500 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200">
                      Bayar
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination -->
      </div>
    </div>
  </Layout>
</template>