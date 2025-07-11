<script setup>
import Layout from "@/layouts/main.vue";
import { showErrorToast } from "@/helpers/alert";
import {
  useTeacherRombelStore,
  useTeacherSubjectScheduleStore,
} from "@/state/pinia";
import { onMounted, ref, computed } from "vue";

const rombelStore = useTeacherRombelStore();
const scheduleStore = useTeacherSubjectScheduleStore();

const loading = ref(true);
const rombels = ref([]);
const subjectSchedule = ref([]);

const groupedRombels = computed(() => {
  const grouped = {};

  rombels.value.forEach(rombel => {
    const key = `${rombel.class_id}-${rombel.name}`;

    if (!grouped[key]) {
      grouped[key] = {
        id: rombel.id,
        name: rombel.name,
        class: rombel.class,
        study_year: rombel.study_year,
        teacher: rombel.teacher,
        students: []
      };
    }

    grouped[key].students.push(rombel.student);
  });

  return Object.values(grouped);
});

const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return days[new Date().getDay()];
};

const currentDay = ref(getCurrentDay());

const schedulesByDay = computed(() => {
  const grouped = {};
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  days.forEach(day => {
    grouped[day] = subjectSchedule.value.filter(schedule => schedule.day === day)
      .sort((a, b) => a.subject_hour.start_hour - b.subject_hour.start_hour);
  });

  return grouped;
});

const getRombels = async () => {
  try {
    loading.value = true;
    await rombelStore.getRombels();
    rombels.value = rombelStore.rombels;
  } catch (error) {
    console.error('Error fetching rombels:', error);
    showErrorToast("Failed to fetch rombels data");
  } finally {
    loading.value = false;
  }
}

const getSubjectSchedule = async () => {
  try {
    loading.value = true;
    scheduleStore.perpage = 100;
    await scheduleStore.getSchedules();
    subjectSchedule.value = scheduleStore.schedules;
  } catch (error) {
    console.error('Error fetching rombels:', error);
    showErrorToast("Failed to fetch subject schedule data");
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await getRombels();
  await getSubjectSchedule();
})
</script>

<template>
  <Layout>
    <div class="p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div class="mb-5">
        <h1 class="text-xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-200">My Rombels</h1>

        <div v-if="loading" class="flex justify-center my-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-4 border-gray-500 dark:border-gray-400 border-t-transparent transition-colors duration-200">
          </div>
        </div>

        <div v-else-if="rombels.length === 0"
          class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center transition-colors duration-200">
          <p class="text-gray-600 dark:text-gray-300 transition-colors duration-200">No rombels assigned to you yet.</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="rombel in groupedRombels" :key="rombel.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
            <div class="bg-secondary dark:bg-blue-800 text-white p-4 transition-colors duration-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-md">{{ rombel.class.name }} - Rombel {{ rombel.name }}</h3>
                  <p class="text-white-200 dark:text-blue-100 mt-1 transition-colors duration-200">
                    {{ rombel.study_year.semester === '1' ? 'Ganjil' : 'Genap' }} {{ rombel.study_year.year }}
                  </p>
                </div>
                <router-link :to="`/teacher/rombel/${rombel.name}`"
                  class="text-white hover:underline transition-colors duration-200">
                  View Details
                </router-link>
              </div>
            </div>

            <div class="p-4">
              <div class="mb-3 text-lg text-gray-800 dark:text-gray-200 transition-colors duration-200">
                <span class="font-semibold">Class Teacher:</span>
                <span class="ml-2">{{ rombel.teacher.name }} ({{ rombel.teacher.employee_number }})</span>
              </div>

              <div class="mb-3 text-gray-800 dark:text-gray-200 transition-colors duration-200">
                <span class="font-semibold text-lg">Total Students:</span>
                <span class="ml-2">{{ rombel.students.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h1 class="text-xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-200">My Teaching
          Schedule</h1>

        <div v-if="loading" class="flex justify-center my-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-4 border-gray-500 dark:border-gray-400 border-t-transparent transition-colors duration-200">
          </div>
        </div>

        <div v-else-if="subjectSchedule.length === 0"
          class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center transition-colors duration-200">
          <p class="text-gray-600 dark:text-gray-300 transition-colors duration-200">No teaching schedules assigned yet.
          </p>
        </div>

        <div v-else class="overflow-x-auto">
          <div v-for="(schedules, day) in schedulesByDay" :key="day" class="mb-5">
            <div class="text-md font-semibold mb-2 p-2 rounded-t-lg transition-colors duration-200"
              :class="currentDay === day ? 'bg-secondary dark:bg-blue-800 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'">
              {{ day }} {{ currentDay === day ? '(Today)' : '' }}
            </div>

            <table
              class="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-lg transition-colors duration-200">
              <thead>
                <tr class="bg-gray-100 dark:bg-gray-700 text-md transition-colors duration-200">
                  <th
                    class="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    Time</th>
                  <th
                    class="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    Subject</th>
                  <th
                    class="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    Class</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-for="schedule in schedules" :key="schedule.id" :class="[
                  currentDay === day ? 'bg-green-50 dark:bg-green-900/20' : '',
                  'hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200'
                ]">
                  <td
                    class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200">
                    {{ schedule.subject_hour.start_time.substring(0, 5) }} - {{
                      schedule.subject_hour.end_time.substring(0, 5) }}
                  </td>
                  <td
                    class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200">
                    {{ schedule.subject.name }}</td>
                  <td
                    class="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200">
                    {{ schedule.class.name }}</td>
                </tr>
                <tr v-if="schedules.length === 0">
                  <td colspan="3"
                    class="py-4 px-4 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">No
                    classes scheduled for this day</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>