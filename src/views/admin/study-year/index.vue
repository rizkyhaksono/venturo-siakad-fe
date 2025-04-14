<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import { showDeleteConfirmationDialog, showSuccessToast } from "@/helpers/alert.js";
import Layout from "@/layouts/main.vue";
import { useAdminStudyYearStore } from "@/state/pinia";
import FormUser from "@/views/admin/user/form.vue";
import { onMounted, ref } from "vue";

const studyYearStore = useAdminStudyYearStore();
const rows = ref([]);
const userModalRef = ref(null);
const selectedUser = ref(null);
const userModalTitle = ref("");

const getRegistrations = async () => {
  await studyYearStore.getStudyYears();
  rows.value = studyYearStore.studyYears.data.data
};

const searchData = async () => {
  await studyYearStore.changePage(1);
};

const paginate = async (page) => {
  await studyYearStore.changePage(page);
  await getRegistrations();
};

const openClassModal = (mode, id = null) => {
  userModalRef.value.openModal();
  if (mode === "edit" && id) {
    selectedUser.value = rows.value.find((item) => item.id === id);
    userModalTitle.value = "Edit Student";
  } else {
    selectedUser.value = null;
    userModalTitle.value = "Add Student";
  }
};
const formUserRef = ref(null);
const submitUserModal = () => {
  if (formUserRef.value) {
    formUserRef.value.saveUser();  // Panggil fungsi saveUser() di FormUser
  }
};

const closeUserModal = () => {
  userModalRef.value.closeModal();
};

const deleteUser = async (id) => {
  const confirmed = await showDeleteConfirmationDialog();
  if (confirmed) {
    try {
      await studyYearStore.deleteUser(id);
      showSuccessToast("User berhasil dihapus");
      await getRegistrations();
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(() => {
  getRegistrations();
});
</script>

<template>
  <Layout>
    <template #title>Data Study Year</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Study Year
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
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
            <Button @click="openUserModal('add')" variant="solid" color="primary">
              Tambah Study Year
            </Button>
            <!-- Modal Form -->
            <Modal ref="userModalRef">
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
                    Year
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
                    Created At
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
                    {{ row.year }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm font-medium text-current">
                    {{ row.semester }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ new Date(row.created_at).toLocaleDateString() }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openClassModal('edit', row.id)" variant="outline" color="secondary">
                      Edit
                    </Button>
                    <Button @click="deleteUser(row.id)" variant="outline" color="error">
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