<script setup>
import Layout from "@/layouts/main.vue";
import Button from "@/components/widgets/Button.vue";
import InputField from "@/components/widgets/Input.vue";
import { useAdminKKMStore } from "@/state/pinia";
import Modal from "@/components/widgets/Modal.vue";
import { onMounted, ref } from "vue";
import { showDeleteConfirmationDialog, showSuccessToast } from "@/helpers/alert.js";
import FormKKM from '@/views/(admin)/kkm/form.vue';

const kkmStore = useAdminKKMStore();
const rows = ref([]);
const modalRef = ref(null);
const selectedKKM = ref(null);
const modalTitle = ref("");
const formRef = ref(null);
const currentPage = ref(1);
const lastPage = ref(1);
const total = ref(0);

const getKKM = async () => {
  await kkmStore.getKKM();
  rows.value = kkmStore.kkm.data;
  currentPage.value = kkmStore.kkm.current_page;
  lastPage.value = kkmStore.kkm.last_page;
  total.value = kkmStore.kkm.total;
}

const searchData = async () => {
  await getKKM();
}

const openModal = async (type, id = null) => {
  modalTitle.value = type === 'add' ? 'Tambah KKM' : 'Edit KKM';
  if (type === 'edit' && id) {
    await kkmStore.getKKMById(id);
    selectedKKM.value = kkmStore.kkmData;
  } else {
    selectedKKM.value = null;
  }
  modalRef.value.openModal();
}

const closeModal = () => {
  modalRef.value.closeModal();
  selectedKKM.value = null;
}

const submitModal = () => {
  if (formRef.value) {
    formRef.value.submitForm();
  }
}

const deleteKKM = async (id) => {
  const confirmed = await showDeleteConfirmationDialog("Apakah Anda yakin ingin menghapus KKM ini?");
  if (confirmed) {
    try {
      await kkmStore.deleteKKM(id);
      showSuccessToast("KKM berhasil dihapus");
      await getKKM();
    } catch (error) {
      console.error("Error deleting KKM:", error);
    }
  }
}

const paginate = async (page) => {
  kkmStore.current = page;
  await getKKM();
}

onMounted(async () => {
  await getKKM();
})
</script>

<template>
  <Layout>
    <template #title>Data KKM</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6
              class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-gray-900 dark:text-gray-100">
              List KKM
            </h6>
            <p class="font-sans antialiased text-base text-gray-700 dark:text-gray-300 mt-1">
              Lihat informasi untuk semua kriteria kelulusan minimal siswa
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="kkmStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Tombol trigger modal -->
            <Button @click="openModal('add')" variant="solid" color="primary">
              Tambah KKM
            </Button>
            <!-- Modal Form -->
            <Modal ref="modalRef">
              <template #title>
                <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ modalTitle }}</h1>
              </template>
              <template #body>
                <FormKKM ref="formRef" :kkm="selectedKKM" @refresh="getKKM" @close="closeModal" />
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
                    Mata Pelajaran
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Nilai KKM
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Deskripsi
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
                  <div class="flex items-center gap-3">
                    <small class="font-sans antialiased text-sm font-medium text-gray-800 dark:text-gray-200">
                      {{ row.subject?.name }}
                    </small>
                  </div>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ row.min_score }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ row.description ?? "-" }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openModal('edit', row.id)" variant="outline" color="secondary"
                      class="border-gray-300 dark:border-gray-600 bg-primary dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      Edit
                    </Button>
                    <Button @click="deleteKKM(row.id)" variant="outline" color="error"
                      class="border-red-300 dark:border-red-700 bg-red-400 dark:bg-red-400 text-white dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
              <tr v-if="rows.length === 0">
                <td colspan="4" class="p-4 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada data yang tersedia
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 py-4 mt-4">
          <small class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300">
            Page {{ currentPage }} of {{ lastPage }} (Total: {{ total }} items)
          </small>
          <div class="flex gap-2">
            <Button @click="paginate(currentPage - 1)" variant="outline" color="secondary"
              :disabled="currentPage === 1">
              Previous
            </Button>
            <Button @click="paginate(currentPage + 1)" variant="outline" color="secondary"
              :disabled="currentPage >= lastPage">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>