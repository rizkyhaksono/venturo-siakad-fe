<script setup>
import Layout from "@/layouts/main.vue";
import { useAdminSPPHistoryStore } from "@/state/pinia";
import { onMounted, ref } from "vue";
import Button from "@/components/widgets/Button.vue";
import InputField from "@/components/widgets/Input.vue";
import SPPHistoryForm from "@/views/admin/spp-history/form.vue"
import Modal from "@/components/widgets/Modal.vue";
import { showSuccessToast, showErrorToast } from "@/helpers/alert.js";

const sppHistoryStore = useAdminSPPHistoryStore();
const rows = ref([]);
const modalTitle = ref("");
const modalRef = ref(null);
const formRef = ref(null);
const selectedSPPHistory = ref(null);

const getSPPHistory = async () => {
  await sppHistoryStore.getSPPHistory();
  rows.value = sppHistoryStore.sppHistory.data;
};

const searchData = async () => {
  await sppHistoryStore.changePage(1);
};

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const openClassModal = async (type, id = null) => {
  modalTitle.value = type === 'add' ? 'Tambah SPP History' : 'Edit SPP History';
  if (type === 'edit' && id) {
    await sppHistoryStore.getSPPHistoryById(id);
    selectedSPPHistory.value = sppHistoryStore.sppHistoryData;
  } else {
    selectedSPPHistory.value = null;
  }
  modalRef.value.openModal();
}

const closeModal = () => {
  modalRef.value.closeModal();
  selectedSPPHistory.value = null;
}

const submitModal = () => {
  if (formRef.value) {
    formRef.value.submitForm();
  }
}

const deleteSPPHistory = async (id) => {
  try {
    await sppHistoryStore.deleteSPPHistory(id);
    await getSPPHistory().then(() => {
      showSuccessToast("SPP History deleted successfully");
    })
  } catch (error) {
    showErrorToast("Failed to delete SPP History", error.message);
  }
};

onMounted(async () => {
  await getSPPHistory();
});

</script>

<template>
  <Layout>
    <template #title>Data SPP History</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6
              class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-gray-900 dark:text-gray-100">
              List SPP History
            </h6>
            <p class="font-sans antialiased text-base text-gray-700 dark:text-gray-300 mt-1">
              Lihat Informasi riwayat Sumbangan Pembinaan Pendidikan
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="sppHistoryStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <Button @click="openClassModal('add')" variant="solid" color="primary">
              Tambah SPP History
            </Button>
            <!-- Modal Form -->
            <Modal ref="modalRef">
              <template #title>
                <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ modalTitle }}</h1>
              </template>
              <template #body>
                <SPPHistoryForm ref="formRef" :sppHistory="selectedSPPHistory" @refresh="getSPPHistory"
                  @close="closeModal" />
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
        <div class="mt-4 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <table class="w-full">
            <thead
              class="border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300">
              <tr>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Nama Siswa
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Tipe Biaya
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Metode Pembayaran
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Status
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Total
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Tanggal Pembayaran
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Actions
                  </small>
                </th>
              </tr>
            </thead>
            <tbody class="group text-sm text-gray-800 dark:text-gray-200">
              <tr
                class="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800"
                v-for="row in rows" :key="row.id">
                <td class="p-3">
                  <small class="font-sans antialiased text-sm font-medium text-gray-800 dark:text-gray-200">
                    {{ row.user.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm font-medium text-gray-800 dark:text-gray-200">
                    {{ row.spp.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm font-medium text-gray-800 dark:text-gray-200">
                    {{ row.payment_method }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm font-medium" :class="{
                    'text-green-600 dark:text-green-400': row.payment_status === 'paid',
                    'text-yellow-600 dark:text-yellow-400': row.payment_status === 'pending',
                    'text-red-600 dark:text-red-400': row.payment_status === 'cancelled'
                  }">
                    {{ row.payment_status }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ formatRupiah(row.spp.total) }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ new Date(row.created_at).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openClassModal('edit', row.id)" variant="outline" color="secondary"
                      class="border-gray-300 dark:border-gray-600 bg-primary dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      Edit
                    </Button>
                    <Button @click="deleteSPPHistory(row.id)" variant="outline" color="error"
                      class="border-red-300 dark:border-red-700 bg-red-400 dark:bg-red-400 text-white dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
              <tr v-if="rows.length === 0">
                <td colspan="7" class="p-4 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada data yang tersedia
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination section with dark mode support -->
        <!-- <div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 py-4 mt-4">
          <small class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300">
            Page {{ sppHistoryStore.sppHistory?.current_page || 1 }} of {{ sppHistoryStore.sppHistory?.last_page || 1 }}
          </small>
          <div class="flex gap-2">
            <Button variant="outline" color="secondary" :disabled="!sppHistoryStore.sppHistory?.prev_page_url"
              @click="paginate(sppHistoryStore.sppHistory?.current_page - 1)">
              Previous
            </Button>
            <Button variant="outline" color="secondary" :disabled="!sppHistoryStore.sppHistory?.next_page_url"
              @click="paginate(sppHistoryStore.sppHistory?.current_page + 1)">
              Next
            </Button>
          </div>
        </div> -->
      </div>
    </div>
  </Layout>
</template>