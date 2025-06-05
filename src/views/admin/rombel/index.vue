<script setup>
import Button from "@/components/widgets/Button";
import Layout from "@/layouts/main.vue";
import Modal from "@/components/widgets/Modal.vue";
import InputField from "@/components/widgets/Input";
import { onMounted, ref } from "vue";
import { useAdminRombelStore } from "@/state/pinia";
import { showSuccessToast, showDeleteConfirmationDialog } from "@/helpers/alert.js";

const rombelStore = useAdminRombelStore();
const rows = ref([]);
const rombelModalRef = ref(null);
const selectedRombel = ref(null);
const rombelModalTitle = ref("");

const getRombels = async () => {
  await rombelStore.getRombels();
  rows.value = rombelStore.rombels;
};

const openEditRombelModal = (mode, id = null) => {
  rombelModalRef.value.openModal();
  if (mode === "edit" && id) {
    selectedRombel.value = rows.value.find((item) => item.id === id);
    rombelModalTitle.value = "Edit Rombel";
  } else {
    selectedRombel.value = null;
    rombelModalTitle.value = "Add Rombel";
  }
};

const closeRombelModal = () => {
  rombelModalRef.value.closeModal();
};

const deleteRombel = async (id) => {
  const rombelStore = useAdminRombelStore();
  const confirmed = await showDeleteConfirmationDialog("Are you sure you want to delete this data?");
  if (confirmed) {
    await rombelStore.deleteRombel(id);
    await getRombels();
    showSuccessToast('Data deleted successfully!');
  }
}

onMounted(() => {
  getRombels();
})
</script>

<template>
  <Layout>
    <template #title>Data Rombongan Belajar</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Rombe
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
              Lihat informasi rombongan belajar
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField placeholder="Search..." name="search" v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <router-link :to="{ name: 'admin-rombel-create' }">
              <Button variant="solid" color="primary">
                Add Rombel
              </Button>
            </router-link>
          </div>
          <Modal ref="modalRef">
            <template #title>
              <h1 class="text-xl font-bold">{{ modalTitle }}</h1>
            </template>
            <template #body>
              <FormClass ref="formRef" :class="selectedClass" @refresh="getClasses" @close="closeRombelModal" />
            </template>
            <template #footer>
              <div class="flex justify-end gap-2">
                <Button @click="closeRombelModal" variant="outline" color="secondary">
                  Close
                </Button>
                <Button @click="submitModal" variant="solid" color="primary">
                  Submit
                </Button>
              </div>
            </template>
          </Modal>
        </div>
        <div class="mt-4 w-full overflow-hidden rounded-lg border border-gray-200">
          <table class="w-full">
            <thead class="border-b border-gray-200 bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-900">
              <tr>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Kelas
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Rombel
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Tahun Pelajaran
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Murid
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Wali Kelas
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
                    {{ row.class.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.study_year.semester }} - {{ row.study_year.year }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    <div class="flex flex-col gap-1 items-start">
                      <template v-for="(student, index) in row.students" :key="index">
                        <span
                          class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {{ student.name }}
                        </span>
                      </template>
                      <span v-if="!row.students.length" class="text-gray-400">No students</span>
                    </div>
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.teacher.name }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openEditRombelModal(row)" variant="solid" color="primary"
                      class="border-gray-300 dark:border-gray-600 bg-primary dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      Edit
                    </Button>
                    <Button @click="deleteRombel(row.id)" variant="outline" color="danger"
                      class="border-red-300 dark:border-red-700 bg-red-400 dark:bg-red-400 text-white dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
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
            Page {{ rombelStore.current || 1 }} of {{ rombelStore.totalData || 1 }}
          </small>
          <div class="flex gap-2">
            <Button variant="outline" color="secondary" :disabled="!rombelStore.prev_page_url"
              @click="paginate(rombelStore.current_page - 1)">
              Previous
            </Button>
            <Button variant="outline" color="secondary" :disabled="!rombelStore.next_page_url"
              @click="paginate(rombelStore.current_page + 1)">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>