<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import {
  showDeleteConfirmationDialog,
  showSuccessToast
} from "@/helpers/alert.js";
import Layout from "@/layouts/main.vue";
import { useAdminHomeroomTeacherStore } from "@/state/pinia";
import FormHomeroomTeacher from "@/views/admin/homeroom-teacher/form.vue";
import { onMounted, ref } from "vue";

const homeroomTeacherStore = useAdminHomeroomTeacherStore();
const rows = ref([]);
const modalRef = ref(null);
const selectedHomeroomTeacher = ref(null);
const modalTitle = ref("");
const formRef = ref(null);

const gwtHomeroomTeacher = async () => {
  await homeroomTeacherStore.getHomeroomTeacher();
  rows.value = homeroomTeacherStore.homeroomTeachers.data || [];
};

const searchData = async () => {
  await homeroomTeacherStore.changePage(1);
  await gwtHomeroomTeacher();
};

const paginate = async (page) => {
  if (page >= 1 && page <= homeroomTeacherStore.totalPage) {
    await homeroomTeacherStore.changePage(page);
    await gwtHomeroomTeacher();
  }
};

const openModal = (mode, id = null) => {
  modalRef.value.openModal();
  if (mode === "edit" && id) {
    selectedHomeroomTeacher.value = rows.value.find((user) => user.id === id);
    modalTitle.value = "Ubah Homeroom Teacher";
  } else {
    selectedHomeroomTeacher.value = null;
    modalTitle.value = "Tambah Homeroom Teacher";
  }
};

const submitUserModal = () => {
  if (formRef.value) {
    formRef.value.saveHomeroomTeacher();
  }
};

const closeUserModal = () => {
  modalRef.value.closeModal();
};

const deleteUser = async (id) => {
  const confirmed = await showDeleteConfirmationDialog();
  if (confirmed) {
    try {
      await homeroomTeacherStore.deleteUser(id);
      showSuccessToast("User berhasil dihapus");
      await gwtHomeroomTeacher();
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(() => {
  gwtHomeroomTeacher();
});
</script>

<template>
  <Layout>
    <template #title>User Homeroom Teacher</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6
              class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-gray-900 dark:text-gray-100">
              List Homeroom Teacher
            </h6>
            <p class="font-sans antialiased text-base text-gray-700 dark:text-gray-300 mt-1">
              Daftar Homeroom Teacher yang terdaftar
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="homeroomTeacherStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Tombol trigger modal -->
            <Button @click="openModal('add')" variant="solid" color="primary">
              Tambah Homeroom Teacher
            </Button>
            <!-- Modal Form -->
            <Modal ref="modalRef">
              <template #title>
                <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ modalTitle }}</h1>
              </template>
              <template #body>
                <FormHomeroomTeacher ref="formRef" :user="selectedHomeroomTeacher" @refresh="gwtHomeroomTeacher"
                  @close="closeUserModal" />
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
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium"><small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Name</small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium"><small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Teacher Number</small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium"><small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Subject</small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium"><small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Class</small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium"><small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Semester</small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium"><small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Year</small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium"><small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                  </small>Action</th>
              </tr>
            </thead>
            <tbody class="group text-sm text-gray-800 dark:text-gray-200">
              <tr
                class="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800"
                v-for="row in rows" :key="row.id">
                <td class="p-3">
                  <div class="flex items-center gap-3">
                    <img :src="row.photo || '/default_photo.jpg'" :alt="row.name"
                      class="inline-block object-cover object-center data-[shape=square]:rounded-none data-[shape=circular]:rounded-full data-[shape=rounded]:rounded-[current] w-8 h-8 rounded"
                      data-shape="circular" />
                    <div class="flex flex-col">
                      <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                        {{ row.teacher.name }}
                      </small>
                    </div>
                  </div>
                </td>
                <td class="p-3">
                  <div class="flex flex-col">
                    <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                      {{ row.teacher.employee_number }}
                    </small>
                  </div>
                </td>
                <td class="p-3">
                  <div class="flex flex-col">
                    <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                      {{ row.teacher.subject }}
                    </small>
                  </div>
                </td>
                <td class="p-3">
                  <div class="flex flex-col">
                    <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                      {{ row.class.name }}
                    </small>
                  </div>
                </td>
                <td class="p-3">
                  <div class="flex flex-col">
                    <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                      {{ row.study_year.semester }}
                    </small>
                  </div>
                </td>
                <td class="p-3">
                  <div class="flex flex-col">
                    <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                      {{ row.study_year.year }}
                    </small>
                  </div>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openModal('edit', row.id)" variant="outline" color="secondary"
                      class="border-gray-300 dark:border-gray-600 bg-primary dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      Edit
                    </Button>
                    <Button @click="deleteUser(row.id)" variant="outline" color="error"
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
        <div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 py-4 mt-4">
          <small class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300">
            Page {{ homeroomTeacherStore.current }} of {{ homeroomTeacherStore.totalPage }}
          </small>
          <div class="flex gap-2">
            <Button variant="outline" color="secondary" :disabled="homeroomTeacherStore.current <= 1"
              @click="paginate(homeroomTeacherStore.current - 1)"
              class="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Previous
            </Button>
            <Button variant="outline" color="secondary"
              :disabled="homeroomTeacherStore.current >= homeroomTeacherStore.totalPage"
              @click="paginate(homeroomTeacherStore.current + 1)"
              class="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>