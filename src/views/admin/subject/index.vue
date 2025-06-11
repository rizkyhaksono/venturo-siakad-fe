<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import { showDeleteConfirmationDialog, showSuccessToast } from "@/helpers/alert.js";
import Layout from "@/layouts/main.vue";
import { useAdminSubjectStore } from "@/state/pinia";
import FormSubject from "@/views/admin/subject/form.vue";
import { onMounted, ref } from "vue";

const subjectStore = useAdminSubjectStore();
const rows = ref([]);
const userModalRef = ref(null);
const selectedUser = ref(null);
const userModalTitle = ref("");

const currentPage = ref(1);
const lastPage = ref(1);
const totalData = ref(0);
const perPage = ref(10);

const getSubjects = async () => {
  try {
    await subjectStore.getSubject({
      page: currentPage.value,
      per_page: perPage.value,
      search: subjectStore.searchQuery
    });

    if (subjectStore.subject) {
      rows.value = subjectStore.subject.data;
      currentPage.value = subjectStore.current;
      lastPage.value = Math.ceil(subjectStore.totalData / subjectStore.perpage);
      totalData.value = subjectStore.totalData;
      perPage.value = subjectStore.perpage;
    }
  } catch (error) {
    console.error('Error fetching subjects:', error);
  }
};

const searchData = async () => {
  currentPage.value = 1;
  await getSubjects();
};

const paginate = async (page) => {
  if (page >= 1 && page <= lastPage.value) {
    currentPage.value = page;
    await getSubjects();
  }
};

const openClassModal = (mode, id = null) => {
  userModalRef.value.openModal();
  if (mode === "edit" && id) {
    selectedUser.value = rows.value.find((item) => item.id === id);
    userModalTitle.value = "Edit Subject";
  } else {
    selectedUser.value = null;
    userModalTitle.value = "Add Subject";
  }
};
const formUserRef = ref(null);
const submitUserModal = () => {
  if (formUserRef.value) {
    formUserRef.value.saveSubject();
  }
};

const closeUserModal = () => {
  userModalRef.value.closeModal();
};

const deleteSubject = async (id) => {
  const confirmed = await showDeleteConfirmationDialog();
  if (confirmed) {
    try {
      await subjectStore.deleteSubject(id);
      showSuccessToast("User berhasil dihapus");
      await getSubjects();
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(() => {
  getSubjects();
});
</script>

<template>
  <Layout>
    <template #title>Data Subject</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6
              class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-gray-900 dark:text-gray-100">
              List Subject
            </h6>
            <p class="font-sans antialiased text-base text-gray-700 dark:text-gray-300 mt-1">
              Lihat informasi subject
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="subjectStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Tombol trigger modal -->
            <Button @click="openClassModal('add')" variant="solid" color="primary">
              Tambah Subject
            </Button>
            <!-- Modal Form -->
            <Modal ref="userModalRef">
              <template #title>
                <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ userModalTitle }}</h1>
              </template>
              <template #body>
                <FormSubject ref="formUserRef" :user="selectedUser" @refresh="getSubjects" @close="closeUserModal" />
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
                    Nama Mata Pelajaran
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
                    {{ row.name }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openClassModal('edit', row.id)" variant="outline" color="secondary"
                      class="border-gray-300 dark:border-gray-600 bg-primary dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      Edit
                    </Button>
                    <Button @click="deleteSubject(row.id)" variant="outline" color="error"
                      class="border-red-300 dark:border-red-700 bg-red-400 dark:bg-red-400 text-white dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
              <tr v-if="rows.length === 0">
                <td colspan="2" class="p-4 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada data yang tersedia
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 py-4 mt-4">
          <small class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300">
            Page {{ currentPage }} of {{ lastPage }} (Total: {{ totalData }} items)
          </small>
          <div class="flex gap-2">
            <Button variant="outline" color="secondary" :disabled="currentPage === 1" @click="paginate(currentPage - 1)"
              class="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Previous
            </Button>
            <Button variant="outline" color="secondary" :disabled="currentPage >= lastPage"
              @click="paginate(currentPage + 1)"
              class="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>