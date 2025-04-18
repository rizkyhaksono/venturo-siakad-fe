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
  rows.value = homeroomTeacherStore.homeroomTeachers || [];
};

const searchData = async () => {
  await homeroomTeacherStore.changePage(1);
};

const paginate = async (page) => {
  await homeroomTeacherStore.changePage(page);
  await gwtHomeroomTeacher();
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
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Homeroom Teacher
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
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
                <h1 class="text-xl font-bold">{{ modalTitle }}</h1>
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
        <div class="mt-4 w-full overflow-hidden rounded-lg border border-gray-200">
          <table class="w-full">
            <thead class="border-b border-gray-200 bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-900">
              <tr>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium"><small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">User</small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium"><small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                  </small>Action</th>
              </tr>
            </thead>
            <tbody class="group text-sm text-gray-800 dark:text-white">
              <template v-if="homeroomTeacherStore.users && homeroomTeacherStore.users.length > 0">
                <tr class="border-b border-gray-200 last:border-0" v-for="row in homeroomTeacherStore.users"
                  :key="row.id">
                  <td class="p-3">
                    <div class="flex items-center gap-3">
                      <img :src="row.photo || '/src/assets/default_photo.jpg'" :alt="row.name"
                        class="inline-block object-cover object-center data-[shape=square]:rounded-none data-[shape=circular]:rounded-full data-[shape=rounded]:rounded-[current] w-8 h-8 rounded"
                        data-shape="circular" />
                      <div class="flex flex-col">
                        <small class="font-sans antialiased text-sm text-current">
                          {{ row.name }}
                        </small>
                        <small class="font-sans antialiased text-sm text-current opacity-70">
                          {{ row.email }}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="flex gap-2 justify-start">
                      <Button @click="openModal('edit', row.id)" variant="outline" color="secondary">
                        Edit
                      </Button>
                      <Button @click="deleteUser(row.id)" variant="outline" color="error">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="2" class="border-b border-gray-200 last:border-0 ps-2 py-2">
                  No results.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between border-gray-200 py-4"><small
            class="font-sans antialiased text-sm text-current">Page {{ homeroomTeacherStore.totalPage != 0 ?
              homeroomTeacherStore.current
              : homeroomTeacherStore.totalPage }} of {{
              homeroomTeacherStore.totalPage }}</small>
          <div class="flex gap-2"><button
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 text-gray-800 hover:bg-gray-200"
              data-shape="default" data-width="default" :disabled="homeroomTeacherStore.current === 1"
              @click="paginate(homeroomTeacherStore.current - 1)">Previous</button><button
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 text-gray-800 hover:bg-gray-200"
              data-shape="default" data-width="default" :disabled="homeroomTeacherStore.current >=
                Math.ceil(homeroomTeacherStore.totalData / homeroomTeacherStore.perpage)
                " @click="paginate(homeroomTeacherStore.current + 1)">Next</button></div>
        </div>
      </div>

    </div>
  </Layout>
</template>
