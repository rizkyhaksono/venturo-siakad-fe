<script setup>
import Layout from "@/layouts/main.vue";
import { useAdminSPPStore } from "@/state/pinia";
import { onMounted, ref } from "vue";
import Button from "@/components/widgets/Button.vue";
import InputField from "@/components/widgets/Input.vue";
import Modal from "@/components/widgets/Modal.vue";
import FormSpp from "@/views/admin/spp/form.vue";
import { showDeleteConfirmationDialog, showSuccessToast } from "@/helpers/alert.js";

const sppStore = useAdminSPPStore();
const rows = ref([]);
const modalRef = ref(null);
const selectedSpp = ref(null);
const modalTitle = ref("");
const formRef = ref(null);

const currentPage = ref(1);
const lastPage = ref(1);
const total = ref(0);

const getSPP = async () => {
  await sppStore.getSPP();
  rows.value = sppStore.spp.data;
  currentPage.value = rows.value.meta?.current_page || 1;
  lastPage.value = rows.value.meta?.last_page || 1;
  total.value = rows.value.meta?.total || 0;
};

const searchData = async () => {
  await sppStore.changePage(1);
};

const paginate = async (page) => {
  await sppStore.changePage(page);
  await getSPP();
};

const openModal = (mode, id = null) => {
  modalRef.value.openModal();
  if (mode === "edit" && id) {
    const foundSpp = sppStore.spp.data.find((item) => item.id === id);
    selectedSpp.value = foundSpp;
    modalTitle.value = "Ubah SPP";
  } else {
    selectedSpp.value = null;
    modalTitle.value = "Tambah SPP";
  }
};

const submitModal = () => {
  if (formRef.value) {
    formRef.value.saveSpp();
  }
};

const closeModal = () => {
  modalRef.value.closeModal();
};

const deleteSpp = async (id) => {
  const confirmed = await showDeleteConfirmationDialog();
  if (confirmed) {
    try {
      await sppStore.deleteSPP(id);
      showSuccessToast("SPP berhasil dihapus");
      await getSPP();
    } catch (error) {
      console.error(error);
    }
  }
};

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

onMounted(async () => {
  getSPP();
});
</script>

<template>
  <Layout>
    <template #title>Data SPP</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List SPP
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">lihat informasi untuk semua SPP
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="sppStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Tombol trigger modal -->
            <Button @click="openModal('add')" variant="solid" color="primary">
              Tambah SPP
            </Button>
            <!-- Modal Form -->
            <Modal ref="modalRef">
              <template #title>
                <h1 class="text-xl font-bold">{{ modalTitle }}</h1>
              </template>
              <template #body>
                <FormSpp ref="formRef" :spp="selectedSpp" @refresh="getSpps" @close="closeModal" />
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
        <div class="mt-4 w-full overflow-hidden rounded-lg border border-gray-200">
          <table class="w-full">
            <thead class="border-b border-gray-200 bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-900">
              <tr>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Nama SPP
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Nominal
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
                    Actions
                  </small>
                </th>
              </tr>
            </thead>
            <tbody class="group text-sm text-gray-800 dark:text-white">
              <tr class="border-b border-gray-200 last:border-0" v-for="row in rows" :key="row.id">
                <td class="p-3">
                  <div class="flex items-center gap-3">
                    <small class="font-sans antialiased text-sm font-medium text-current">
                      {{ row.name }}
                    </small>
                  </div>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ formatRupiah(row.total) }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.study_year?.year }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openModal('edit', row.id)" variant="outline" color="secondary">
                      Edit
                    </Button>
                    <Button @click="deleteSpp(row.id)" variant="outline" color="error">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between border-gray-200 py-4">
          <small class="font-sans antialiased text-sm text-current">
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