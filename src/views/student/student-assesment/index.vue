<script setup>
import Layout from "@/layouts/main.vue";
import { useStudentAssesmentStore } from "@/state/pinia";
import { onMounted, ref } from "vue";
import Button from "@/components/widgets/Button.vue";

const studentStore = useStudentAssesmentStore();
const assessments = ref([]);
const pagination = ref({});
const loading = ref(false);

const getStudentAssesments = async (page = 1) => {
  loading.value = true;
  try {
    await studentStore.getAssesments(page);
    assessments.value = studentStore.assesments.data;
  } catch (error) {
    console.error("Error fetching student assessments:", error);
  } finally {
    loading.value = false;
  }
};

const paginate = (page) => {
  getStudentAssesments(page);
};

const formatScore = (score) => {
  return parseFloat(score).toFixed(2);
};

onMounted(async () => {
  await getStudentAssesments();
});
</script>

<template>
  <Layout>
    <template #title>Data Nilai Siswa/i</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Nilai
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
              Lihat informasi nilai siswa berdasarkan mata pelajaran
            </p>
          </div>
        </div>

        <div class="flex flex-col items-center justify-between gap-4 md:flex-row mb-4">
          <div class="flex gap-2" data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <!-- Search component can be added here -->
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Action buttons could be added here -->
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="loading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span class="ml-2">Loading...</span>
        </div>

        <!-- Data table -->
        <div v-else class="mt-4 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div v-if="assessments.length === 0" class="py-8 text-center text-gray-500">
            Tidak ada data nilai yang tersedia
          </div>

          <table v-else class="w-full">
            <thead class="border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
              <tr>
                <th class="px-4 py-3 text-start font-medium">
                  <div class="flex items-center gap-2">
                    <span>No</span>
                  </div>
                </th>
                <th class="px-4 py-3 text-start font-medium">
                  <div class="flex items-center gap-2">
                    <span>Mata Pelajaran</span>
                  </div>
                </th>
                <th class="px-4 py-3 text-start font-medium">
                  <div class="flex items-center gap-2">
                    <span>UTS</span>
                  </div>
                </th>
                <th class="px-4 py-3 text-start font-medium">
                  <div class="flex items-center gap-2">
                    <span>UAS</span>
                  </div>
                </th>
                <th class="px-4 py-3 text-start font-medium">
                  <div class="flex items-center gap-2">
                    <span>Tugas</span>
                  </div>
                </th>
                <th class="px-4 py-3 text-start font-medium">
                  <div class="flex items-center gap-2">
                    <span>Aktivitas</span>
                  </div>
                </th>
                <th class="px-4 py-3 text-start font-medium">
                  <div class="flex items-center gap-2">
                    <span>Total</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(assessment, index) in assessments" :key="assessment.id"
                class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-3 text-sm text-gray-800">
                  {{ index + 1 }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-800 font-medium">
                  {{ assessment.subject_schedule.subject.name }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-800">
                  <div class="flex items-center">
                    <span :class="parseFloat(assessment.uts_score) >= 70 ? 'text-green-600' : 'text-red-600'">
                      {{ formatScore(assessment.uts_score) }}
                    </span>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-800">
                  <div class="flex items-center">
                    <span :class="parseFloat(assessment.uas_score) >= 70 ? 'text-green-600' : 'text-red-600'">
                      {{ formatScore(assessment.uas_score) }}
                    </span>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-800">
                  <div class="flex items-center">
                    <span :class="parseFloat(assessment.tugas_score) >= 70 ? 'text-green-600' : 'text-red-600'">
                      {{ formatScore(assessment.tugas_score) }}
                    </span>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-800">
                  <div class="flex items-center">
                    <span :class="parseFloat(assessment.activity_score) >= 70 ? 'text-green-600' : 'text-red-600'">
                      {{ formatScore(assessment.activity_score) }}
                    </span>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm font-semibold">
                  <div
                    :class="parseFloat(assessment.total_score) >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                    class="inline-block px-2 py-1 rounded-md">
                    {{ formatScore(assessment.total_score) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.total > 0"
          class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-lg">
          <div class="flex flex-1 justify-between sm:hidden">
            <Button :disabled="!pagination.prev_page_url" @click="paginate(pagination.current_page - 1)"
              variant="outline" color="secondary"
              class="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset">
              Previous
            </Button>
            <Button :disabled="!pagination.next_page_url" @click="paginate(pagination.current_page + 1)"
              variant="outline" color="secondary"
              class="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset">
              Next
            </Button>
          </div>
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ ((pagination.current_page - 1) * 10) + 1 }}</span>
                to
                <span class="font-medium">{{ Math.min(pagination.current_page * 10, pagination.total) }}</span>
                of
                <span class="font-medium">{{ pagination.total }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <Button :disabled="!pagination.prev_page_url" @click="paginate(pagination.current_page - 1)"
                  variant="outline" color="secondary"
                  class="relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset">
                  <span class="sr-only">Previous</span>
                  &larr;
                </Button>
                <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold">
                  Page {{ pagination.current_page }} of {{ pagination.last_page }}
                </span>
                <Button :disabled="!pagination.next_page_url" @click="paginate(pagination.current_page + 1)"
                  variant="outline" color="secondary"
                  class="relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset">
                  <span class="sr-only">Next</span>
                  &rarr;
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>