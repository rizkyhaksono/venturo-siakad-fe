<script setup>
import { useAdminRegistrationStore } from "@/state/pinia";
import { ref, onMounted } from "vue";
import Layout from "@/layouts/main.vue";
import Modal from "@/components/widgets/Modal.vue";
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import FormUser from "@/views/admin/user/form.vue";
import { showSuccessToast, showDeleteConfirmationDialog } from "@/helpers/alert.js";

const registrationStore = useAdminRegistrationStore();
const rows = ref([]);
const userModalRef = ref(null);
const selectedUser = ref(null);
const userModalTitle = ref("");

const getRegistrations = async () => {
  await registrationStore.getRegistrations();
  rows.value = registrationStore.registrations.data
};

const searchData = async () => {
  await registrationStore.changePage(1);
};

const paginate = async (page) => {
  await registrationStore.changePage(page);
  await getRegistrations();
};

const openClassModal = (mode, id = null) => {
  userModalRef.value.openModal();
  if (mode === "edit" && id) {
    selectedUser.value = rows.value.find((item) => item.id === id);
    userModalTitle.value = "Ubah Kelas";
  } else {
    selectedUser.value = null;
    userModalTitle.value = "Tambah Kelas";
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
      await registrationStore.deleteUser(id);
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
    <template #title>Data Registrasi</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Registrasi
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
              Lihat informasi registrasi
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="registrationStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Tombol trigger modal -->
            <Button @click="openUserModal('add')" variant="solid" color="primary">
              Tambah Teacher
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
                    Name
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Email
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Role
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
                    {{ row.user.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.user.email }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.user.m_user_roles_id }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    <span :class="{
                      'px-2 py-1 rounded-full text-xs font-semibold': true,
                      'bg-green-100 text-green-800': row.status === 'accepted',
                      'bg-yellow-100 text-yellow-800': row.status === 'pending',
                      'bg-red-100 text-red-800': row.status === 'rejected'
                    }">
                      {{ row.status }}
                    </span>
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
            Page {{ registrationStore.teachers?.current_page || 1 }} of {{ registrationStore.teachers?.last_page || 1 }}
          </small>
          <div class="flex gap-2">
            <Button variant="outline" color="secondary" :disabled="!registrationStore.teachers?.prev_page_url"
              @click="paginate(registrationStore.teachers?.current_page - 1)">
              Previous
            </Button>
            <Button variant="outline" color="secondary" :disabled="!registrationStore.teachers?.next_page_url"
              @click="paginate(registrationStore.teachers?.current_page + 1)">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>