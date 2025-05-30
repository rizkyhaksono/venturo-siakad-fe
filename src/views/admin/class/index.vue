<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import { showDeleteConfirmationDialog, showSuccessToast } from "@/helpers/alert.js";
import Layout from "@/layouts/main.vue";
import { useAdminClassStore } from "@/state/pinia";
import FormClass from "@/views/admin/class/form.vue";
import { onMounted, ref } from "vue";

const classStore = useAdminClassStore();
const rows = ref([]);
const modalRef = ref(null);
const selectedClass = ref(null);
const modalTitle = ref("");
const formRef = ref(null);

const currentPage = ref(1);
const lastPage = ref(1);
const total = ref(0);

const getClasses = async () => {
  await classStore.getClasses();
  rows.value = classStore.classes || [];
  currentPage.value = rows.value.meta?.current_page || 1;
  lastPage.value = rows.value.meta?.last_page || 1;
  total.value = rows.value.meta?.total || 0;
};

const searchData = async () => {
  await classStore.changePage(1);
};

const paginate = async (page) => {
  await classStore.changePage(page);
  await getClasses();
};

const openModal = (mode, id = null) => {
  modalRef.value.openModal();
  if (mode === "edit" && id) {
    const foundClass = classStore.classes.data.find((item) => item.id === id);
    selectedClass.value = foundClass;
    modalTitle.value = "Ubah Class";
  } else {
    selectedClass.value = null;
    modalTitle.value = "Tambah Class";
  }
};

const submitModal = () => {
  if (formRef.value) {
    formRef.value.saveClass();
  }
};

const closeModal = () => {
  modalRef.value.closeModal();
};

const deleteClass = async (id) => {
  const confirmed = await showDeleteConfirmationDialog();
  if (confirmed) {
    try {
      await classStore.deleteClass(id);
      showSuccessToast("Class berhasil dihapus");
      await getClasses();
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(() => {
  getClasses();
});
</script>

<template>
  <Layout>
    <template #title>Data Class</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Class
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">lihat informasi untuk semua class
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="classStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Tombol trigger modal -->
            <Button @click="openModal('add')" variant="solid" color="primary">
              Tambah Class
            </Button>
            <!-- Modal Form -->
            <Modal ref="modalRef">
              <template #title>
                <h1 class="text-xl font-bold">{{ modalTitle }}</h1>
              </template>
              <template #body>
                <FormClass ref="formRef" :class="selectedClass" @refresh="getClasses" @close="closeModal" />
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
                    Nama Kelas
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
                    Semester
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
              <tr class="border-b border-gray-200 last:border-0" v-for="row in rows.data" :key="row.id">
                <td class="p-3">
                  <div class="flex items-center gap-3">
                    <small class="font-sans antialiased text-sm font-medium text-current">
                      {{ row.name }}
                    </small>
                  </div>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.study_year.year }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.study_year.semester }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openModal('edit', row.id)" variant="outline" color="secondary">
                      Edit
                    </Button>
                    <Button @click="deleteClass(row.id)" variant="outline" color="error">
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
