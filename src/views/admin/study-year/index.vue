<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import { showDeleteConfirmationDialog, showSuccessToast } from "@/helpers/alert.js";
import Layout from "@/layouts/main.vue";
import { useAdminStudyYearStore } from "@/state/pinia";
import FormStudyYear from "@/views/admin/study-year/form.vue";
import { onMounted, ref } from "vue";

const studyYearStore = useAdminStudyYearStore();
const rows = ref([]);
const studyYearModalRef = ref(null);
const selectedStudyYear = ref(null);
const userModalTitle = ref("");

const getStudyYears = async () => {
  await studyYearStore.getStudyYears();
  rows.value = studyYearStore.studyYears
};

const searchData = async () => {
  await studyYearStore.changePage(1);
};

const paginate = async (page) => {
  await studyYearStore.changePage(page);
  await getStudyYears();
};

const openClassModal = (mode, id = null) => {
  studyYearModalRef.value.openModal();
  if (mode === "edit" && id) {
    selectedStudyYear.value = rows.value.find((item) => item.id === id);
    userModalTitle.value = "Edit Study Year";
  } else {
    selectedStudyYear.value = null;
    userModalTitle.value = "Add Study Year";
  }
};
const formStudyYearRef = ref(null);
const submitUserModal = () => {
  if (formStudyYearRef.value) {
    formStudyYearRef.value.saveStudyYear();
  }
};

const closeStudyYearModal = () => {
  studyYearModalRef.value.closeModal();
};

const deleteStudyYear = async (id) => {
  const confirmed = await showDeleteConfirmationDialog();
  if (confirmed) {
    try {
      await studyYearStore.deleteStudyYear(id);
      showSuccessToast("Study year berhasil dihapus");
      await getStudyYears();
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(() => {
  getStudyYears();
});
</script>

<template>
  <Layout>
    <template #title>Data Study Year</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6
              class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-gray-900 dark:text-gray-100">
              List Study Year
            </h6>
            <p class="font-sans antialiased text-base text-gray-700 dark:text-gray-300 mt-1">
              Lihat informasi study year
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="studyYearStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Tombol trigger modal -->
            <Button @click="openClassModal('add')" variant="solid" color="primary">
              Tambah Study Year
            </Button>
            <!-- Modal Form -->
            <Modal ref="studyYearModalRef">
              <template #title>
                <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ userModalTitle }}</h1>
              </template>
              <template #body>
                <FormStudyYear ref="formStudyYearRef" :user="selectedStudyYear" @refresh="getStudyYears"
                  @close="closeStudyYearModal" />
              </template>
              <template #footer>
                <div class="flex justify-end gap-2">
                  <Button @click="closeStudyYearModal" variant="outline" color="secondary">
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
                    Year
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Semester
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Created At
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
                    {{ row.year }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm font-medium text-gray-800 dark:text-gray-200">
                    {{ row.semester }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ new Date(row.created_at).toLocaleDateString() }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openClassModal('edit', row.id)" variant="outline" color="secondary"
                      class="border-gray-300 dark:border-gray-600 bg-primary dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      Edit
                    </Button>
                    <Button @click="deleteStudyYear(row.id)" variant="outline" color="error"
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
            Page {{ studyYearStore.students?.current_page || 1 }} of {{ studyYearStore.students?.last_page || 1 }}
          </small>
          <div class="flex gap-2">
            <Button variant="outline" color="secondary" :disabled="!studyYearStore.students?.prev_page_url"
              @click="paginate(studyYearStore.students?.current_page - 1)">
              Previous
            </Button>
            <Button variant="outline" color="secondary" :disabled="!studyYearStore.students?.next_page_url"
              @click="paginate(studyYearStore.students?.current_page + 1)">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>