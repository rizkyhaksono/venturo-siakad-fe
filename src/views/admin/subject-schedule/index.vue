<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import { showDeleteConfirmationDialog, showSuccessToast } from "@/helpers/alert.js";
import Layout from "@/layouts/main.vue";
import { useAdminSubjectScheduleStore } from "@/state/pinia";
import FormSubjectSchedule from "@/views/admin/subject-schedule/form.vue";
import { onMounted, ref } from "vue";

const subjectScheduleStore = useAdminSubjectScheduleStore();
const rows = ref([]);
const userModalRef = ref(null);
const selectedUser = ref(null);
const userModalTitle = ref("");
const formUserRef = ref(null);

const getClassHistories = async () => {
  await subjectScheduleStore.getSchedules();
  rows.value = subjectScheduleStore.schedules
};

const searchData = async () => {
  await subjectScheduleStore.changePage(1);
  await getClassHistories();
};

const paginate = async (page) => {
  if (page >= 1 && page <= subjectScheduleStore.totalPage) {
    await subjectScheduleStore.changePage(page);
    await getClassHistories();
  }
};

const openClassModal = (mode, id = null) => {
  userModalRef.value.openModal();
  if (mode === "edit" && id) {
    selectedUser.value = rows.value.find((item) => item.id === id);
    userModalTitle.value = "Ubah Subject Schedule";
  } else {
    selectedUser.value = null;
    userModalTitle.value = "Tambah Subject Schedule";
  }
};

const submitUserModal = () => {
  if (formUserRef.value) {
    formUserRef.value.saveSubjectSchedule();
  }
};

const closeUserModal = () => {
  userModalRef.value.closeModal();
};

const deleteSchedule = async (id) => {
  const confirmed = await showDeleteConfirmationDialog();
  if (confirmed) {
    try {
      await subjectScheduleStore.deleteSchedule(id);
      showSuccessToast("User berhasil dihapus");
      await getClassHistories();
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(() => {
  getClassHistories();
});
</script>

<template>
  <Layout>
    <template #title>Data Subject Schedule</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Subject Schedule
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
              Lihat informasi subject schedule
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="subjectScheduleStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Tombol trigger modal -->
            <Button @click="openClassModal('add')" variant="solid" color="primary">
              Tambah Subject Schedule
            </Button>
            <!-- Modal Form -->
            <Modal ref="userModalRef">
              <template #title>
                <h1 class="text-xl font-bold">{{ userModalTitle }}</h1>
              </template>
              <template #body>
                <FormSubjectSchedule ref="formUserRef" :user="selectedUser" @refresh="getClassHistories"
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
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Hari
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Kelas
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Mata Pelajaran
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Guru
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Jam ke
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Waktu
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
                    {{ row.day }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.class.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.subject.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.teacher.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.subject_hour.start_hour }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.subject_hour.start_time }} - {{ row.subject_hour.end_time }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openClassModal('edit', row.id)" variant="outline" color="secondary">
                      Edit
                    </Button>
                    <Button @click="deleteSchedule(row.id)" variant="outline" color="error">
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
            Page {{ subjectScheduleStore.current }} of {{ subjectScheduleStore.totalPage }}
          </small>
          <div class="flex gap-2">
            <Button variant="outline" color="secondary" :disabled="subjectScheduleStore.current <= 1"
              @click="paginate(subjectScheduleStore.current - 1)">
              Previous
            </Button>
            <Button variant="outline" color="secondary"
              :disabled="subjectScheduleStore.current >= subjectScheduleStore.totalPage"
              @click="paginate(subjectScheduleStore.current + 1)">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
