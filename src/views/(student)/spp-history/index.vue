<script setup>
import Layout from "@/layouts/main.vue";
import { useStudentSPPHistoryStore } from "@/state/pinia";
import { onMounted, ref } from "vue";
import Button from "@/components/widgets/Button.vue";
import InputField from "@/components/widgets/Input";

const sppHistoryStore = useStudentSPPHistoryStore();
const rows = ref([]);

const getSPPHistory = async () => {
  await sppHistoryStore.getSPPHistory();
  rows.value = sppHistoryStore.sppHistory.data;
};

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const getStatusClass = (status) => {
  return status === 'paid'
    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full font-medium'
    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full font-medium';
};

const formatPaymentStatus = (status) => {
  return status === 'paid' ? 'Lunas' : 'Proses';
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const paginate = async (page) => {
  await sppHistoryStore.changePage(page);
  rows.value = sppHistoryStore.sppHistory.data;
};

onMounted(async () => {
  await getSPPHistory();
});
</script>

<template>
  <Layout>
    <template #title>Riwayat Pembayaran SPP</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              Riwayat Pembayaran
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
              Lihat histori pembayaran biaya pendidikan
            </p>
          </div>
        </div>

        <!-- Payment Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <!-- Total Payments Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center mb-2">
              <div class="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Total Pembayaran</p>
                <p class="font-bold text-lg">{{ rows.length || 0 }}</p>
              </div>
            </div>
          </div>

          <!-- Latest Payment Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center mb-2">
              <div class="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Pembayaran Terakhir</p>
                <p class="font-bold text-lg">{{ rows.length ? formatDate(rows[0].payment_date) : '-' }}</p>
              </div>
            </div>
          </div>

          <!-- Total Amount Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center mb-2">
              <div class="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Total Dibayarkan</p>
                <p class="font-bold text-lg">
                  {{formatRupiah(rows.reduce((sum, row) => sum + row.amount_paid, 0))}}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div class="relative w-full md:w-64">
            <InputField v-model="sppHistoryStore.search" placeholder="Search..." name="search"
              v-debounce:500="getSPPHistory" />
          </div>
        </div>

        <!-- Table -->
        <div
          class="mt-4 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <table class="w-full">
            <thead
              class="border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
              <tr>
                <th class="px-4 py-3 text-left">ID Pembayaran</th>
                <th class="px-4 py-3 text-left">Jenis Biaya</th>
                <th class="px-4 py-3 text-left">Tanggal Pembayaran</th>
                <th class="px-4 py-3 text-left">Jumlah</th>
                <th class="px-4 py-3 text-left">Metode Pembayaran</th>
                <th class="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-if="rows.length === 0">
                <td colspan="6" class="px-4 py-5 text-center text-gray-500 dark:text-gray-400">
                  Belum ada riwayat pembayaran
                </td>
              </tr>
              <tr v-for="row in rows" :key="row.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-4 py-3 text-sm">
                  <!-- Generate a nice ID format showing the last 6 characters -->
                  <span class="font-mono text-gray-700 dark:text-gray-300">#{{ row.id.slice(-6).toUpperCase() }}</span>
                </td>
                <td class="px-4 py-3 text-sm font-medium">
                  {{ row.spp?.name || 'N/A' }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ formatDate(row.payment_date) }}
                </td>
                <td class="px-4 py-3 text-sm font-medium">
                  {{ formatRupiah(row.amount_paid) }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ row.payment_method }}
                </td>
                <td class="px-4 py-3 text-sm">
                  <span :class="getStatusClass(row.payment_status)">
                    {{ formatPaymentStatus(row.payment_status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 rounded-b-lg">
          <div class="flex-1 flex justify-between sm:hidden">
            <Button variant="outline" color="secondary" :disabled="sppHistoryStore.current === 1"
              @click="paginate(sppHistoryStore.current - 1)">
              Previous
            </Button>
            <Button variant="outline" color="secondary"
              :disabled="sppHistoryStore.current === sppHistoryStore.totalPage"
              @click="paginate(sppHistoryStore.current + 1)">
              Next
            </Button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Showing
                <span class="font-medium">{{ sppHistoryStore.sppHistory?.from || 0 }}</span>
                to
                <span class="font-medium">{{ sppHistoryStore.sppHistory?.to || 0 }}</span>
                of
                <span class="font-medium">{{ sppHistoryStore.totalData }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button variant="outline" color="secondary"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :disabled="sppHistoryStore.current === 1" @click="paginate(sppHistoryStore.current - 1)">
                  Previous
                </Button>
                <Button variant="outline" color="secondary"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :disabled="sppHistoryStore.current === sppHistoryStore.totalPage"
                  @click="paginate(sppHistoryStore.current + 1)">
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>