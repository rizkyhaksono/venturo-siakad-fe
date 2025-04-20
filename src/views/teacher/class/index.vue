<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import Layout from "@/layouts/main.vue";
import { useTeacherClassStore } from "@/state/pinia";
import FormClass from "@/views/admin/class/form.vue";
import { onMounted, ref } from "vue";

const classStore = useTeacherClassStore();
const rows = ref([]);
const modalRef = ref(null);
const selectedClass = ref(null);
const modalTitle = ref("");
const formRef = ref(null);

const getClasses = async () => {
  await classStore.getClasses();
  rows.value = classStore.classes.data.data || [];
};

const searchData = async () => {
  await classStore.changePage(1);
};

const paginate = async (page) => {
  await classStore.changePage(page);
  await getClasses();
};

const submitModal = () => {
  if (formRef.value) {
    formRef.value.saveClass();
  }
};

const closeModal = () => {
  modalRef.value.closeModal();
};

onMounted(() => {
  getClasses();
});
</script>

<template>
  <Layout>
    <template #title>Data Class</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Class
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">lihat informasi untuk semua class
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="classStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" />
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Modal Form -->
            <Modal ref="modalRef">
              <template #title>
                <h1 class="text-xl font-bold">{{ modalTitle }}</h1>
              </template>
              <template #body>
                <FormClass ref="formRef" :class="selectedClass" @refresh="getClasses" @close="closeModal" />
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
                    Nama Kelas
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
                    Updated At
                  </small>
                </th>
              </tr>
            </thead>
            <tbody class="group text-sm text-gray-800 dark:text-white">
              <tr class="border-b border-gray-200 last:border-0" v-for="row in classStore?.classes?.data?.data"
                :key="row.id">
                <td class="p-3">
                  <div class="flex items-center gap-3">
                    <small class="font-sans antialiased text-sm font-medium text-current">
                      {{ row.name }}
                    </small>
                  </div>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.study_year.year }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ row.study_year.semester }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
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
                  <small class="font-sans antialiased text-sm text-current">
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
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between border-gray-200 py-4"><small
            class="font-sans antialiased text-sm text-current">Page {{ classStore.totalPage != 0 ?
              classStore.current
              : classStore.totalPage }} of {{
              classStore.totalPage }}</small>
          <div class="flex gap-2"><button
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 text-gray-800 hover:bg-gray-200"
              data-shape="default" data-width="default" :disabled="classStore.current === 1"
              @click="paginate(classStore.current - 1)">Previous</button><button
              class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-transparent border-gray-200 text-gray-800 hover:bg-gray-200"
              data-shape="default" data-width="default" :disabled="classStore.current >=
                Math.ceil(classStore.totalData / classStore.perpage)
                " @click="paginate(classStore.current + 1)">Next</button></div>
        </div>
      </div>

    </div>
  </Layout>
</template>
