<script setup>
import Button from "@/components/widgets/Button";
import Layout from "@/layouts/main.vue";
import InputField from "@/components/widgets/Input";
import { onMounted, ref } from "vue";
import { useAdminRombelStore } from "@/state/pinia";

const rombelStore = useAdminRombelStore();
const rows = ref([]);

const getRombels = async () => {
  await rombelStore.getRombels();
  rows.value = rombelStore.rombels;
};

onMounted(() => {
  getRombels();
})
</script>

<template>
  <Layout>
    <template #title>Data Student Assesment</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Student Assesment
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
              Lihat informasi dan kelola data student assesment di sini.
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
                    {{ row.teacher.name }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <router-link :to="`/admin/student-assesment/form/${row.id}`"
                      class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-gray-600/80 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                      <span class="flex items-center gap-2">
                        Isi Nilai Siswa
                      </span>
                    </router-link>
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