<script setup>
import Layout from "@/layouts/main.vue";
import { useRoute } from 'vue-router';
import { useTeacherRombelStore } from "@/state/pinia";
import { onMounted, ref } from "vue";
import { showErrorToast } from "@/helpers/alert";

const route = useRoute();
const id = route.params.id;

const teacherRombelStore = useTeacherRombelStore();

const rombel = ref(null);
const loading = ref(true);
const error = ref(false);

const fetchRombelByName = async (name) => {
  try {
    loading.value = true;
    await teacherRombelStore.getStudentByRombelName(name);
    rombel.value = teacherRombelStore.rombels.data;
    if (!rombel.value) {
      error.value = true;
      showErrorToast(`Rombel dengan nama "${name}" tidak ditemukan`);
    } else {
      error.value = false;
    }
  } catch (err) {
    error.value = true;
    showErrorToast(`Error fetching rombel: ${err.message}`);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  if (id) await fetchRombelByName(id);
});
</script>

<template>
  <Layout>
    <div class="w-full mx-auto rounded-lg bg-gray-100 dark:bg-gray-900 p-4 text-sm text-gray-600">
      <h2 class="text-xl font-bold mb-4 text-gray-600 dark:text-white">Detail Rombongan Belajar: {{ id }}</h2>

      <div v-if="loading" class="flex justify-center items-center py-10">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">
        <h3 class="font-medium">Data Tidak Ditemukan</h3>
        <p>Rombongan Belajar dengan nama "{{ id }}" tidak dapat ditemukan.</p>
      </div>

      <div v-else-if="rombel" class="mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Informasi Rombel</h3>
            <div class="space-y-2">
              <div class="flex">
                <span class="w-32 text-gray-500 dark:text-gray-400">Nama Rombel:</span>
                <span class="font-medium text-gray-700 dark:text-gray-400">{{ rombel.rombel.name }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-gray-500 dark:text-gray-400">Kelas:</span>
                <span class="font-medium text-gray-700 dark:text-gray-400">{{ rombel.rombel.class.name }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-gray-500 dark:text-gray-400">Tahun Ajaran:</span>
                <span class="font-medium text-gray-700 dark:text-gray-400">{{ rombel.rombel.study_year.year }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-gray-500 dark:text-gray-400">Semester:</span>
                <span class="font-medium text-gray-700 dark:text-gray-400">{{ rombel.rombel.study_year.semester
                }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Wali Kelas</h3>
            <div class="space-y-2">
              <div class="flex">
                <span class="w-32 text-gray-500 dark:text-gray-400">Nama:</span>
                <span class="font-medium text-gray-700 dark:text-gray-400">{{ rombel.rombel.teacher.name }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-gray-500 dark:text-gray-400">NIP:</span>
                <span class="font-medium text-gray-700 dark:text-gray-400">{{ rombel.rombel.teacher.employee_number
                }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-gray-500 dark:text-gray-400">Mata Pelajaran:</span>
                <span class="font-medium text-gray-700 dark:text-gray-400">{{ rombel.rombel.teacher.subject }}</span>
                <span class="font-medium text-gray-700 dark:text-gray-400">{{ console.log(rombel) }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-gray-500 dark:text-gray-400">Jumlah Siswa:</span>
                <span class="font-medium text-gray-700 dark:text-gray-400">{{ rombel.students.length }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-4">Daftar Siswa</h3>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    No
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    NIS
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Nama
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                <tr v-for="(student, index) in rombel.students" :key="student.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-200">
                    {{ index + 1 }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-200">
                    {{ student.student_number }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-200 font-medium">
                    {{ student.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-200">
                    <span :class="{
                      'px-2 py-1 text-xs rounded-full': true,
                      'bg-green-100 text-green-800': student.status === 'accepted',
                      'bg-yellow-100 text-yellow-800': student.status === 'pending',
                      'bg-red-100 text-red-800': student.status === 'rejected'
                    }">
                      {{ student.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <router-link :to="`/teacher/rombel/${rombel.rombel.name}/student/${student.id}`"
                      class="bg-cyan-800 dark:bg-cyan-300 px-3 py-1 rounded-full text-white dark:text-gray-800 font-medium hover:bg-cyan-600 hover:dark:bg-cyan-400 mr-2">
                      Isi Nilai
                    </router-link>
                  </td>
                </tr>
                <tr v-if="rombel.students.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                    Tidak ada siswa dalam rombel ini
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>