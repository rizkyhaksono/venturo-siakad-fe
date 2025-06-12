<script setup>
import Button from "@/components/widgets/Button";
import Layout from "@/layouts/main.vue";
import InputField from "@/components/widgets/Input";
import { onMounted, ref } from "vue";
import { useTeacherStudentAssesment } from "@/state/pinia"

const studentAssesmentStore = useTeacherStudentAssesment();
const rows = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);

const getStudentAssesments = async () => {
  await studentAssesmentStore.getStudentAssesments();
  rows.value = studentAssesmentStore.studentAssesments || [];
};

const searchData = (query) => {
  studentAssesmentStore.searchQuery = query;
  getStudentAssesments();
};

const paginate = (page) => {
  currentPage.value = page;
  getStudentAssesments();
};

onMounted(async () => {
  await getStudentAssesments();
});
</script>

<template>
  <Layout>
    <template #title>Data Penilaian Siswa</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6
              class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-gray-900 dark:text-gray-100">
              Daftar Penilaian Siswa
            </h6>
            <p class="font-sans antialiased text-base text-gray-700 dark:text-gray-300 mt-1">
              Lihat informasi dan kelola data penilaian siswa di sini.
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <InputField v-model="searchQuery" type="text" placeholder="Cari nama siswa atau mata pelajaran..."
                class="w-full" @input="searchData(searchQuery)" :debounce="300" :icon="{
                  name: 'search',
                  class: 'text-gray-500 dark:text-gray-400'
                }" />
            </div>
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
                    Nama Siswa
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Mata Pelajaran
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    UTS
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    UAS
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Tugas
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Aktivitas
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70">
                    Total
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
                    {{ row.student.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ row.subject_schedule?.subject?.name || 'N/A' }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ row.uts_score }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ row.uas_score }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ row.tugas_score }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ row.activity_score }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200">
                    {{ row.total_score }}
                  </small>
                </td>
              </tr>
              <tr v-if="rows.length === 0">
                <td colspan="8" class="p-4 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada data penilaian yang tersedia
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 py-4 mt-4">
          <small class="font-sans antialiased text-sm text-gray-700 dark:text-gray-300">
            Page {{ studentAssesmentStore.current_page || 1 }} of {{ studentAssesmentStore.last_page || 1 }}
          </small>
          <div class="flex gap-2">
            <Button variant="outline" color="secondary" :disabled="!studentAssesmentStore.prev_page_url"
              @click="paginate(studentAssesmentStore.current_page - 1)"
              class="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Previous
            </Button>
            <Button variant="outline" color="secondary" :disabled="!studentAssesmentStore.next_page_url"
              @click="paginate(studentAssesmentStore.current_page + 1)"
              class="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>