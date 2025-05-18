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

const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    <div class="p-4">
      <div class="mb-5">
        <h1 class="text-xl font-bold mb-4">My Rombels</h1>

        <div v-if="loading" class="flex justify-center my-8">
          <output class="spinner-border text-primary" aria-busy="true">
            <span class="visually-hidden">Loading...</span>
          </output>
        </div>

        <div v-else-if="rombels.length === 0" class="bg-gray-100 rounded-lg p-6 text-center">
          <p class="text-gray-600">No rombels assigned to you yet.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="rombel in rombels" :key="rombel.id"
            class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div class="bg-secondary text-white p-4">
              <h3 class="font-bold text-md">{{ rombel.class.name }} - Rombel {{ rombel.name }}</h3>
              <p class="text-white-200 mt-1">{{ rombel.study_year.semester === '1' ? 'Ganjil' : 'Genap' }} {{
                rombel.study_year.year }}</p>
            </div>

            <div class="p-4">
              <div class="mb-3 text-lg">
                <span class="font-semibold">Class Teacher:</span>
                <span class="ml-2">{{ rombel.teacher.name }} ({{ rombel.teacher.employee_number }})</span>
              </div>

              <div class="mb-3 text-lg">
                <span class="font-semibold">Student:</span>
                <span class="ml-2">{{ rombel.student.name }} ({{ rombel.student.student_number }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h1 class="text-xl font-bold mb-4">My Teaching Schedule</h1>

        <div v-if="loading" class="flex justify-center my-8">
          <output class="spinner-border text-primary" aria-busy="true">
            <span class="visually-hidden">Loading...</span>
          </output>
        </div>

        <div v-else-if="subjectSchedule.length === 0" class="bg-gray-100 rounded-lg p-6 text-center">
          <p class="text-gray-600">No teaching schedules assigned yet.</p>
        </div>

        <div v-else class="overflow-x-auto">
          <div v-for="(schedules, day) in schedulesByDay" :key="day" class="mb-5">
            <div class="text-md font-semibold mb-2 p-2 rounded-t-lg"
              :class="currentDay === day ? 'bg-secondary text-white' : 'bg-gray-200'">
              {{ day }} {{ currentDay === day ? '(Today)' : '' }}
            </div>

            <table class="min-w-full bg-white border border-gray-200 rounded-b-lg">
              <thead>
                <tr class="bg-gray-100 text-md">
                  <th class="py-3 px-4 text-left border-b">Time</th>
                  <th class="py-3 px-4 text-left border-b">Subject</th>
                  <th class="py-3 px-4 text-left border-b">Class</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-for="schedule in schedules" :key="schedule.id" :class="currentDay === day ? 'bg-green-50' : ''"
                  class="hover:bg-gray-50">
                  <td class="py-3 px-4 border-b">
                    {{ schedule.subject_hour.start_time.substring(0, 5) }} - {{
                      schedule.subject_hour.end_time.substring(0, 5) }}
                  </td>
                  <td class="py-3 px-4 border-b font-medium">{{ schedule.subject.name }}</td>
                  <td class="py-3 px-4 border-b">{{ schedule.class.name }}</td>
                </tr>
                <tr v-if="schedules.length === 0">
                  <td colspan="3" class="py-4 px-4 text-center text-gray-500">No classes scheduled for this day</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>