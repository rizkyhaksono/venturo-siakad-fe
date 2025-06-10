<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import Layout from "@/layouts/main.vue";
import { useTeacherSubjectStore } from "@/state/pinia";
import FormSubject from "@/views/admin/subject-schedule/form.vue";
import { onMounted, ref } from "vue";

const subjectStore = useTeacherSubjectStore();
const rows = ref([]);
const userModalRef = ref(null);
const selectedUser = ref(null);
const userModalTitle = ref("");
const formUserRef = ref(null);

const getClassHistories = async () => {
  await subjectStore.getSubjects();
  rows.value = subjectStore.subjects.data
};

const searchData = async () => {
  await subjectStore.changePage(1);
};

const paginate = async (page) => {
  await subjectStore.changePage(page);
  await getClassHistories();
};

const submitUserModal = () => {
  if (formUserRef.value) {
    formUserRef.value.saveSubjectSchedule();
  }
};

const closeUserModal = () => {
  userModalRef.value.closeModal();
};

onMounted(() => {
  getClassHistories();
});
</script>

<template>
  <Layout>
    <template #title>Data Subject</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6
              class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-gray-800 dark:text-white transition-colors duration-200">
              List Subject
            </h6>
            <p
              class="font-sans antialiased text-base text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-200">
              Lihat informasi subject
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="subjectStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData"
                inputClass="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Modal Form -->
            <Modal ref="userModalRef">
              <template #title>
                <h1 class="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-200">{{
                  userModalTitle }}</h1>
              </template>
              <template #body>
                <FormSubject ref="formUserRef" :user="selectedUser" @refresh="getClassHistories"
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
                    Nama
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                    Created At
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                    Updated At
                  </small>
                </th>
              </tr>
            </thead>
            <tbody
              class="group text-sm divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200" v-for="row in rows"
                :key="row.id">
                <td class="p-3">
                  <small
                    class="font-sans antialiased text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200">
                    {{ row.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    {{ new Date(row.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) }}
                  </small>
                </td>
                <td class="p-3">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    {{ new Date(row?.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) }}
                  </small>
                </td>
              </tr>
              <tr v-if="rows.length === 0">
                <td colspan="3" class="p-4 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  No subjects found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 py-4 transition-colors duration-200">
          <small class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">
            Page {{ subjectStore.totalPage != 0 ? subjectStore.current : subjectStore.totalPage }} of {{
              subjectStore.totalPage }}
          </small>
          <div class="flex gap-2">
            <button
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              :disabled="subjectStore.current === 1" @click="paginate(subjectStore.current - 1)">
              Previous
            </button>
            <button
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              :disabled="subjectStore.current >= Math.ceil(subjectStore.totalData / subjectStore.perpage)"
              @click="paginate(subjectStore.current + 1)">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>