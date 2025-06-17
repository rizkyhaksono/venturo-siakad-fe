<script setup>
import { ref, onMounted } from 'vue';
import Layout from "@/layouts/main.vue";
import InputField from "@/components/widgets/Input";
import { useRoute } from 'vue-router';
import {
  useAdminRombelStore
} from '@/state/pinia';

const route = useRoute();
const rombelName = route.params.id;
const rombelStore = useAdminRombelStore();

const filters = ref({
  kelas: '',
  tahunAjaran: '',
  nama: '',
  waliKelas: '',
  semester: ''
});

const rombelData = ref(null);
const students = ref([]);
const loading = ref(true);

const fetchStudents = async () => {
  loading.value = true;
  try {
    await rombelStore.getStudentByRombelName(rombelName);
    rombelData.value = rombelStore.rombel;
    students.value = rombelStore.rombel?.students || [];
    filters.value.nama = rombelData.value?.rombel?.class?.name || '';
    filters.value.kelas = rombelData.value?.rombel?.name || '';
    filters.value.tahunAjaran = rombelData.value?.rombel?.study_year?.year || '';
    filters.value.waliKelas = rombelData.value?.rombel?.teacher?.name || '';
    filters.value.semester = rombelData.value?.rombel?.study_year?.semester || '';
  } catch (error) {
    console.error('Failed to fetch students:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchStudents();
});
</script>

<template>
  <Layout>
    <div class="container px-4 py-6 mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
        <div class="border-b px-6 py-4">
          <h5 class="text-lg font-medium text-gray-800 dark:text-gray-100">Add Nilai Siswa/i</h5>
          <p v-if="rombelData && rombelData.rombel" class="text-sm text-gray-600 mt-1">
            {{ rombelData.rombel.name }} - {{ rombelData.rombel.class ? rombelData.rombel.class.name : '' }}
          </p>
        </div>
        <div class="p-6">
          <!-- Filter Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- First column -->
            <div class="space-y-4">
              <div class="flex flex-col space-y-1">
                <InputField v-model="filters.nama" label="Kelas" type="text" placeholder="Kelas" name="kelas"
                  :value="filters.nama || ''" :disable="true" />
              </div>

              <div class="flex flex-col space-y-1">
                <InputField v-model="filters.tahunAjaran" label="Tahun Ajaran" type="text" placeholder="Tahun Ajaran"
                  name="tahunAjaran" :value="rombelData?.rombel?.study_year?.year || ''" :disable="true" />
              </div>
            </div>

            <!-- Second column -->
            <div class="space-y-4">
              <div class="flex flex-col space-y-1">
                <InputField v-model="filters.kelas" label="Nama" type="text" placeholder="Nama Kelas" name="nama"
                  :value="rombelData?.rombel?.kelas" :disable="true" />
              </div>

              <div class="flex flex-col space-y-1">
                <InputField v-model="filters.waliKelas" label="Wali Kelas" type="text" placeholder="Wali Kelas"
                  name="waliKelas" :value="rombelData?.rombel?.teacher?.name || ''" :disable="true" />
              </div>
            </div>

            <!-- Third column -->
            <div class="space-y-4">
              <div class="flex flex-col space-y-1">
                <InputField v-model="filters.semester" label="Semester" type="text" placeholder="Semester"
                  name="semester" :value="filters.semester" :disable="true" />
              </div>
            </div>
          </div>

          <!-- Student Table -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div class="border-b px-6 py-3 bg-gray-50 dark:bg-gray-700">
              <h6 class="font-medium text-gray-700">Siswa</h6>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 dark:bg-gray-800 ">
                  <tr>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NIS
                    </th>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Lengkap
                    </th>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody v-if="!loading" class="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                  <tr v-for="student in students" :key="student.id" class="hover:bg-gray-50 hover:dark:bg-gray-700">
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {{ student.student_number }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {{ student.name }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="student.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                        {{ student.status }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm">
                      <router-link :to="`/admin/student-assesment/form/grade/${student.id}`"
                        class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        Isi Nilai
                      </router-link>
                    </td>
                  </tr>
                  <tr v-if="students.length === 0">
                    <td colspan="5" class="px-4 py-6 text-center text-sm text-gray-500">
                      No students found in this rombel.
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="5" class="px-4 py-6 text-center">
                      <div class="flex justify-center">
                        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      </div>
                      <p class="mt-2 text-sm text-gray-500">Loading student data...</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>