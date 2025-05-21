<script setup>
import Layout from "@/layouts/main.vue";
import { useStudentSPPStore } from "@/state/pinia";
import { onMounted, ref } from "vue";
import Button from "@/components/widgets/Button.vue";

const sppStore = useStudentSPPStore();
const rows = ref([]);

const getSPP = async () => {
  await sppStore.getSPP();
  rows.value = sppStore.spp.data;
};

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

onMounted(async () => {
  await getSPP();
});
</script>

<template>
  <Layout>
    <template #title>Data SPP Siswa/i</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List SPP
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
              Lihat Informasi Sumbangan Pembinaan Pendidikan
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <!-- Status Keuangan Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center mb-4">
              <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="font-semibold text-lg">Status Keuangan</h3>
            </div>

            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-300">Total Tagihan</span>
                <span class="font-medium">Rp 5.000.000</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-300">Sudah Dibayar</span>
                <span class="font-medium text-green-600 dark:text-green-400">Rp 3.500.000</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-300">Tunggakan</span>
                <span class="font-medium text-red-600 dark:text-red-400">Rp 1.500.000</span>
              </div>

              <div class="pt-3">
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                  <div class="bg-green-600 dark:bg-green-500 h-2.5 rounded-full" style="width: 70%"></div>
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 text-right">
                  70% terbayar
                </div>
              </div>
            </div>
          </div>

          <!-- Riwayat Pembayaran Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center mb-4">
              <div class="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 class="font-semibold text-lg">Riwayat Pembayaran</h3>
            </div>

            <div class="space-y-4 max-h-60 overflow-y-auto">
              <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
                <div class="flex justify-between mb-1">
                  <span class="font-medium">Pembayaran SPP</span>
                  <span class="text-green-600 dark:text-green-400">Rp 1.000.000</span>
                </div>
                <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>15 Mei 2025</span>
                  <span>Lunas</span>
                </div>
              </div>

              <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
                <div class="flex justify-between mb-1">
                  <span class="font-medium">Pembayaran SPP</span>
                  <span class="text-green-600 dark:text-green-400">Rp 1.500.000</span>
                </div>
                <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>10 April 2025</span>
                  <span>Lunas</span>
                </div>
              </div>

              <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
                <div class="flex justify-between mb-1">
                  <span class="font-medium">Pembayaran SPP</span>
                  <span class="text-green-600 dark:text-green-400">Rp 1.000.000</span>
                </div>
                <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>15 Maret 2025</span>
                  <span>Lunas</span>
                </div>
              </div>
            </div>

            <div class="pt-3 text-center">
              <button class="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Lihat Semua Riwayat
              </button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <!-- <InputField v-model="studentStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" /> -->
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Modal Form -->
            <!-- <Modal ref="userModalRef">
              <template #title>
                <h1 class="text-xl font-bold">{{ userModalTitle }}</h1>
              </template>
              <template #body>
                <FormUser ref="formUserRef" :user="selectedUser" @refresh="getRegistrations" @close="closeUserModal" />
              </template>
              <template #footer>
                <div class="flex justify-end gap-2">
                  <Button @click="closeUserModal" variant="outline" color="secondary">
                    Close
                  </Button>
                  <Button @click="submitUserModal" variant="solid" color="primary">
                    Submit
                  </Button>
                </div>
              </template>
            </Modal> -->
          </div>
        </div>
        <div class="mt-4 w-full overflow-hidden rounded-lg border border-gray-200">
          <table class="w-full">
            <thead class="border-b border-gray-200 bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-900">
              <tr>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Name
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Jenis Biaya
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Total
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Tahun Ajaran
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Status
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Actions
                  </small>
                </th>
              </tr>
            </thead>
            <tbody class="group text-sm text-gray-800 dark:text-white">
              <tr class="border-b border-gray-200 last:border-0" v-for="row in rows" :key="row.id">
                <td class="p-3">
                  <small class="font-sans antialiased text-sm font-medium text-current">
                    {{ row.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm font-medium text-current">
                    {{ row.jenis_biaya }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ formatRupiah(row.total) }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    Semester {{ row.study_year?.semester }} - {{ row.study_year?.year }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    BL (Belum Lunas)
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openClassModal('edit', row.id)" variant="outline" color="secondary">
                      Bayar
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="flex items-center justify-between border-gray-200 py-4">
          <small class="font-sans antialiased text-sm text-current">
            Page {{ studentStore.students?.current_page || 1 }} of {{ studentStore.students?.last_page || 1 }}
          </small>
          <div class="flex gap-2">
            <Button variant="outline" color="secondary" :disabled="!studentStore.students?.prev_page_url"
              @click="paginate(studentStore.students?.current_page - 1)">
              Previous
            </Button>
            <Button variant="outline" color="secondary" :disabled="!studentStore.students?.next_page_url"
              @click="paginate(studentStore.students?.current_page + 1)">
              Next
            </Button>
          </div>
        </div> -->
      </div>
    </div>
  </Layout>
</template>