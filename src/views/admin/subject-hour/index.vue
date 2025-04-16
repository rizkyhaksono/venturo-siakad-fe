<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import { showDeleteConfirmationDialog, showSuccessToast } from "@/helpers/alert.js";
import Layout from "@/layouts/main.vue";
import { useAdminSubjectHourStore } from "@/state/pinia";
import FormSubjectHour from "@/views/admin/subject-hour/form.vue";
import { onMounted, ref } from "vue";

const subjectHourStore = useAdminSubjectHourStore();
const rows = ref([]);
const modalRef = ref(null);
const selectedSubjectHour = ref(null);
const modalTitle = ref("");
const formRef = ref(null);

const getSubjectHour = async () => {
  await subjectHourStore.getSubjectHour();
  rows.value = subjectHourStore.subjectHour?.data?.data || [];
};

const searchData = async () => {
  await subjectHourStore.changePage(1);
};

const paginate = async (page) => {
  await subjectHourStore.changePage(page);
  await getSubjectHour();
};

const openModal = (mode, id = null) => {
  modalRef.value.openModal();
  if (mode === "edit" && id) {
    selectedSubjectHour.value = rows.value.find((item) => item.id === id);
    modalTitle.value = "Ubah Subject Hour";
  } else {
    selectedSubjectHour.value = null;
    modalTitle.value = "Tambah Subject Hour";
  }
};

const submitModal = () => {
  if (formRef.value) {
    formRef.value.saveSubjectHour();
  }
};

const closeModal = () => {
  modalRef.value.closeModal();
};

const deleteSubjectHour = async (id) => {
  const confirmed = await showDeleteConfirmationDialog();
  if (confirmed) {
    try {
      await subjectHourStore.deleteSubjectHour(id);
      showSuccessToast("Subject hour berhasil dihapus");
      await getSubjectHour();
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(() => {
  getSubjectHour();
});
</script>

<template>
  <Layout>
    <template #title>Data Subject Hour</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Subject Hour
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
              Lihat informasi subject hour
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="subjectHourStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Tombol trigger modal -->
            <Button @click="openModal('add')" variant="solid" color="primary">
              Tambah Subject Hour
            </Button>
            <!-- Modal Form -->
            <Modal ref="modalRef">
              <template #title>
                <h1 class="text-xl font-bold">{{ modalTitle }}</h1>
              </template>
              <template #body>
                <FormSubjectHour ref="formRef" :subject-hour="selectedSubjectHour" @refresh="getSubjectHour"
                  @close="closeModal" />
              </template>
              <template #footer>
                <div class="flex justify-end gap-2">
                  <Button @click="closeModal" variant="outline" color="secondary">
                    Close
                  </Button>
                  <Button @click="submitModal" variant="solid" color="primary">
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
                    Jam ke
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Jam mulai
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Jam selesai
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
                    {{ row.start_hour }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.start_time }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.end_time }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openModal('edit', row.id)" variant="outline" color="secondary">
                      Edit
                    </Button>
                    <Button @click="deleteSubjectHour(row.id)" variant="outline" color="error">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between border-gray-200 py-4"><small
            class="font-sans antialiased text-sm text-current">Page {{ subjectHourStore.totalPage != 0 ?
              subjectHourStore.current
              : subjectHourStore.totalPage }} of {{
              subjectHourStore.totalPage }}</small>
          <div class="flex gap-2"><button
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 text-gray-800 hover:bg-gray-200"
              data-shape="default" data-width="default" :disabled="subjectHourStore.current === 1"
              @click="paginate(subjectHourStore.current - 1)">Previous</button><button
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 text-gray-800 hover:bg-gray-200"
              data-shape="default" data-width="default" :disabled="subjectHourStore.current >=
                Math.ceil(subjectHourStore.totalData / subjectHourStore.perpage)
                " @click="paginate(subjectHourStore.current + 1)">Next</button></div>
        </div>
      </div>
    </div>
  </Layout>
</template>
