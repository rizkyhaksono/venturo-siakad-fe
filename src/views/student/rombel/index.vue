<script setup>
import { showErrorToast } from "@/helpers/alert";
import Layout from "@/layouts/main.vue";
import { useStudentRombelStore } from "@/state/pinia";
import { onMounted, ref } from "vue";

const rombelStore = useStudentRombelStore();
const loading = ref(true);
const rombels = ref([]);
const rombelId = ref(null);
const rombelSchedule = ref([]);

const days = ref(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
const activeDay = ref('Monday');

const setActiveDay = (day) => {
  activeDay.value = day;
};

const getRombels = async () => {
  try {
    loading.value = true;
    await rombelStore.getRombels();
    rombels.value = rombelStore.rombels;
    if (rombelStore.rombels.length > 0) {
      rombelId.value = rombelStore.rombels[0]?.id;
      await getRombelById(rombelId.value);
    }
  } catch (error) {
    showErrorToast("Failed to fetch rombels data");
  } finally {
    loading.value = false;
  }
};

const getRombelById = async (id) => {
  try {
    loading.value = true;
    await rombelStore.getRombelById(id);
    const { rombel, schedule } = rombelStore.rombel;
    rombelSchedule.value = { rombel, schedule };
  } catch (error) {
    showErrorToast("Failed to fetch rombel data");
  } finally {
    loading.value = false;
  }
}

const getScheduleForDay = (day) => {
  const schedule = rombelSchedule.value?.schedule?.[day];
  return schedule || [];
};

onMounted(() => {
  getRombels();
});
</script>

<template>
  <Layout>
    <div class="p-3">
      <div class="mb-4 bg-white rounded-lg shadow-sm">
        <div class="px-4 py-3 bg-secondary text-white rounded-t-lg">
          <h5 class="text-lg font-semibold">Informasi Kelas</h5>
        </div>
        <div class="p-4">
          <div v-if="loading" class="flex justify-center py-5">
            <div class="animate-spin rounded-full h-8 w-8 border-4 border-gray-500 border-t-transparent"></div>
          </div>

          <div v-else>
            <div v-for="rombel in rombels" :key="rombel.id" class="mb-4">
              <p class="text-gray-700 text-sm mb-2">
                <strong>Nama Kelas:</strong> {{ rombel.class.name }}
              </p>
              <p class="text-gray-700 text-sm mb-2">
                <strong>Wali Kelas:</strong> {{ rombel.teacher.name }}
              </p>
              <p class="text-gray-700 text-sm mb-2">
                <strong>Tahun Ajar:</strong> {{ rombel.study_year.year }} - Semester {{ rombel.study_year.semester }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm">
        <div class="px-4 py-3 bg-secondary text-white rounded-t-lg flex justify-between items-center">
          <h5 class="text-lg font-semibold">Jadwal Pelajaran</h5>
        </div>
        <div class="p-4">
          <div v-if="loading" class="flex justify-center py-5">
            <div class="animate-spin rounded-full h-8 w-8 border-4 border-gray-500 border-t-transparent"></div>
          </div>

          <div v-else>
            <div class="border-b border-gray-200 mb-4">
              <nav class="flex space-x-4" aria-label="Tabs">
                <button v-for="day in days" :key="day" @click="setActiveDay(day)" :class="[
                  'px-3 py-2 text-sm font-medium border-b-2 hover:text-gray-600 hover:border-gray-600',
                  activeDay === day
                    ? 'text-gray-600 border-gray-600'
                    : 'text-gray-500 border-transparent'
                ]">
                  {{ day }}
                </button>
              </nav>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Jam
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mata Pelajaran
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pengajar
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <template v-if="getScheduleForDay(activeDay).length">
                    <tr v-for="schedule in getScheduleForDay(activeDay)" :key="schedule.id" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ schedule.time.start_time.substring(0, 5) }} - {{ schedule.time.end_time.substring(0, 5) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ schedule.subject }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ schedule.teacher }}
                      </td>
                    </tr>
                  </template>
                  <tr v-else>
                    <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500">
                      Tidak ada jadwal untuk hari ini
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