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

const getClassHistories = async () => {
  await subjectStore.getSubject();
  rows.value = subjectStore.subject?.data || [];
};

const searchData = async () => {
  await subjectStore.changePage(1);
};

const paginate = async (page) => {
  await subjectStore.changePage(page);
  await getClassHistories();
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
    <template #title>Data Subject</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Subject
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
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
                <h1 class="text-xl font-bold">{{ userModalTitle }}</h1>
              </template>
              <template #body>
                <FormSubject ref="formUserRef" :user="selectedUser" @refresh="getClassHistories"
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
                    Nama Mata Pelajaran
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
                    Guru Pengajar
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Tahun Ajaran
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
                    {{ row.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.class_id }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.teacher_id }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.study_year_id }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openClassModal('edit', row.id)" variant="outline" color="secondary">
                      Edit
                    </Button>
                    <Button @click="deleteSubject(row.id)" variant="outline" color="error">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between border-gray-200 py-4"><small
            class="font-sans antialiased text-sm text-current">Page {{ subjectStore.totalPage != 0 ?
              subjectStore.current
              : subjectStore.totalPage }} of {{
              subjectStore.totalPage }}</small>
          <div class="flex gap-2"><button
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 text-gray-800 hover:bg-gray-200"
              data-shape="default" data-width="default" :disabled="subjectStore.current === 1"
              @click="paginate(subjectStore.current - 1)">Previous</button><button
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 text-gray-800 hover:bg-gray-200"
              data-shape="default" data-width="default" :disabled="subjectStore.current >=
                Math.ceil(subjectStore.totalData / subjectStore.perpage)
                " @click="paginate(subjectStore.current + 1)">Next</button></div>
        </div>
      </div>
    </div>
  </Layout>
</template>
