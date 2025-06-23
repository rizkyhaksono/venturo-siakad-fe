<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import Layout from "@/layouts/main.vue";
import { useAdminRegistrationStore } from "@/state/pinia";
import FormRegistration from "@/views/(admin)/registration/form.vue";
import { onMounted, ref } from "vue";

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

const openClassModal = (id = null) => {
  userModalRef.value.openModal();
  selectedUser.value = rows.value.find((item) => item.id === id);
  userModalTitle.value = `Update Registration Status: ${selectedUser.value.user.name}`;
};
const formRegistrationRef = ref(null);
const submitRegistrationModal = () => {
  if (formRegistrationRef.value) {
    formRegistrationRef.value.saveRegistration();
  }
};

const closeUserModal = () => {
  userModalRef.value.closeModal();
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
            <h6
              class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-gray-900 dark:text-gray-100">
              List Registrasi
            </h6>
            <p class="font-sans antialiased text-base text-gray-700 dark:text-gray-300 mt-1">
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
            <!-- Modal Form -->
            <Modal ref="userModalRef">
              <template #title>
                <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ userModalTitle }}</h1>
              </template>
              <template #body>
                <FormRegistration ref="formRegistrationRef" :user="selectedUser" @refresh="getRegistrations"
                  @close="closeUserModal" />
              </template>
              <template #footer>
                <div class="flex justify-end gap-2">
                  <Button @click="closeUserModal" variant="outline" color="secondary">
                    Close
                  </Button>
                  <Button @click="submitRegistrationModal" variant="solid" color="primary">
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
                    Name
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Email
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Gender
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Status
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
                    {{ row.user.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ row.user.email }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    <span :class="{
                      'px-2 py-1 rounded-full text-xs font-semibold transition-colors duration-200': true,
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400': row.user.gender === 'Laki-laki',
                      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400': row.user.gender === 'Perempuan'
                    }">
                      {{ row.user.gender }}
                    </span>
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    <span :class="{
                      'px-2 py-1 rounded-full text-xs font-semibold transition-colors duration-200': true,
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': row.status === 'accepted',
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': row.status === 'pending',
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': row.status === 'rejected'
                    }">
                      {{ row.status }}
                    </span>
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openClassModal(row.id)" variant="outline" color="secondary"
                      class="border-gray-300 dark:border-gray-600 bg-primary dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      Update Status
                    </Button>
                  </div>
                </td>
              </tr>
              <tr v-if="rows.length === 0">
                <td colspan="5" class="p-4 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada data yang tersedia
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 py-4 mt-4">
          <small class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300">
            Page {{ registrationStore.registrations?.current_page || 1 }} of {{
              registrationStore.registrations?.last_page
              || 1 }}
          </small>
          <div class="flex gap-2">
            <Button variant="outline" color="secondary" :disabled="!registrationStore.registrations?.prev_page_url"
              @click="paginate(registrationStore.registrations?.current_page - 1)"
              class="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
              Previous
            </Button>
            <Button variant="outline" color="secondary" :disabled="!registrationStore.registrations?.next_page_url"
              @click="paginate(registrationStore.registrations?.current_page + 1)"
              class="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>