<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import { showDeleteConfirmationDialog, showSuccessToast } from "@/helpers/alert.js";
import Layout from "@/layouts/main.vue";
import { useAdminUserRoleStore } from "@/state/pinia";
import FormUserRole from "@/views/(admin)/user-role/form.vue";
import { onMounted, ref } from "vue";

const roleStore = useAdminUserRoleStore();
const rows = ref([]);
const userModalRef = ref(null);
const selectedUserRole = ref(null);
const userModalTitle = ref("");

const getRoles = async () => {
  await roleStore.getRoles();
  rows.value = roleStore.roles || [];
};

const searchData = async () => {
  await roleStore.changePage(1);
};

const paginate = async (page) => {
  await roleStore.changePage(page);
  await getRoles();
};

const openUserRoleModal = (mode, id = null) => {
  userModalRef.value.openModal();
  if (mode === "edit" && id) {
    selectedUserRole.value = rows.value.find((userRole) => userRole.id === id);
    userModalTitle.value = "Ubah User Role";
  } else {
    selectedUserRole.value = null;
    userModalTitle.value = "Tambah User Role";
  }
};
const formUserRoleRef = ref(null);
const submitUserModal = () => {
  if (formUserRoleRef.value) {
    formUserRoleRef.value.saveUserRole();
  }
};

const closeUserModal = () => {
  userModalRef.value.closeModal();
};

const deleteRole = async (id) => {
  const confirmed = await showDeleteConfirmationDialog();
  if (confirmed) {
    try {
      await roleStore.deleteRole(id);
      showSuccessToast("User role berhasil dihapus");
      await getRoles();
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(() => {
  getRoles();
});
</script>

<template>
  <Layout>
    <template #title>User Data</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6
              class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-gray-800 dark:text-white transition-colors duration-200">
              List User Role
            </h6>
            <p
              class="font-sans antialiased text-base text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-200">
              lihat informasi untuk semua user role
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="roleStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData"
                inputClass="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Tombol trigger modal -->
            <Button @click="openUserRoleModal('add')" variant="solid" color="primary"
              class="transition-colors duration-200">
              Tambah User Role
            </Button>
            <!-- Modal Form -->
            <Modal ref="userModalRef">
              <template #title>
                <h1 class="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-200">{{
                  userModalTitle }}</h1>
              </template>
              <template #body>
                <FormUserRole ref="formUserRoleRef" :user="selectedUserRole" @refresh="getRoles"
                  @close="closeUserModal" />
              </template>
              <template #footer>
                <div class="flex justify-end gap-2">
                  <Button @click="closeUserModal" variant="outline" color="secondary"
                    class="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">
                    Close
                  </Button>
                  <Button @click="submitUserModal" variant="solid" color="primary"
                    class="transition-colors duration-200">
                    Submit
                  </Button>
                </div>
              </template>
            </Modal>
          </div>
        </div>
        <div
          class="mt-4 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <table class="w-full">
            <thead
              class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200">
              <tr>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                    Name
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                    Access
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                    Actions
                  </small>
                </th>
              </tr>
            </thead>
            <tbody
              class="group text-sm divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
              <template v-if="roleStore.roles && roleStore.roles.length > 0">
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  v-for="row in roleStore.roles" :key="row.id">
                  <td class="p-3">
                    <div class="flex items-center gap-3">
                      <small
                        class="font-sans antialiased text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200">
                        {{ row.name }}
                      </small>
                    </div>
                  </td>
                  <td class="p-3">
                    <small
                      class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200 transition-colors duration-200">
                      {{ row.access }}
                    </small>
                  </td>
                  <td class="p-3">
                    <div class="flex gap-2 justify-start">
                      <Button @click="openUserRoleModal('edit', row.id)" variant="outline" color="secondary"
                        class="border-gray-300 dark:border-gray-600 bg-primary dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        Edit
                      </Button>
                      <Button @click="deleteRole(row.id)" variant="outline" color="error"
                        class="border-red-300 dark:border-red-700 bg-red-400 dark:bg-red-400 text-white dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="3" class="p-3 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  No results.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 py-4 mt-1 transition-colors duration-200">
          <small class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
            Page {{ roleStore.totalPage != 0 ? roleStore.current : roleStore.totalPage }} of {{ roleStore.totalPage }}
            (Total {{ roleStore.totalData }})
          </small>
          <div class="flex gap-2">
            <button :disabled="roleStore.current === 1" @click="paginate(roleStore.current - 1)"
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              Previous
            </button>
            <button :disabled="roleStore.current >= Math.ceil(roleStore.totalData / roleStore.perpage)"
              @click="paginate(roleStore.current + 1)"
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>