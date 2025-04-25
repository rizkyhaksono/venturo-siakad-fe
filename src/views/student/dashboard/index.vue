<script setup>
import ApexChart from "@/components/widgets/Apexchart";
import Layout from "@/layouts/main.vue";
import { onMounted, ref } from "vue";

import {
  useStudentClassHistoryStore,
  useStudentClassStore,
  useStudentSubjectScheduleStore,
  useAuthStore
} from "@/state/pinia";

const history = ref([]);
const historyStore = useStudentClassHistoryStore();

const classes = ref([]);
const classesStore = useStudentClassStore();

const subjectSchedule = ref([]);
const subjectScheduleStore = useStudentSubjectScheduleStore();

const meStore = useAuthStore();

const getHistory = async () => {
  await historyStore.getClassHistory();
  history.value = historyStore.classHistory.data;
};

const getClasses = async () => {
  await classesStore.getClasses();
  classes.value = classesStore.classes.data;
}

const getSubjectSchedule = async () => {
  await subjectScheduleStore.getSchedules();
  subjectSchedule.value = subjectScheduleStore.schedules;
}

const getMe = async () => {
  await meStore.saveUserLogin();
}

onMounted(async () => {
  await getHistory();
  await getClasses();
  await getSubjectSchedule();
  await getMe();
});

</script>

<template>
  <Layout>
    <!-- Enhanced Header -->
    <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-lg shadow-lg mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">
        Welcome Back {{ meStore.userLogin.name }}!
      </h1>
      <p class="text-blue-100">
        Your academic journey at a glance. Track your classes, schedules, and progress.
      </p>
    </div>

    <!-- Statistics Cards with Enhanced Design -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Total Classes Card -->
      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div class="p-6">
          <div class="flex items-center">
            <div class="p-4 rounded-full bg-blue-100 text-blue-600">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-6">
              <p class="text-gray-600 text-sm uppercase tracking-wider">Active Classes</p>
              <p class="text-2xl font-bold text-gray-800">{{ classes.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Class History Card -->
      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div class="p-6">
          <div class="flex items-center">
            <div class="p-4 rounded-full bg-green-100 text-green-600">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="ml-6">
              <p class="text-gray-600 text-sm uppercase tracking-wider">Class History</p>
              <p class="text-2xl font-bold text-gray-800">{{ history.length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Schedule Card -->
      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div class="p-6">
          <div class="flex items-center">
            <div class="p-4 rounded-full bg-purple-100 text-purple-600">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-6">
              <p class="text-gray-600 text-sm uppercase tracking-wider">Active Schedules</p>
              <p class="text-2xl font-bold text-gray-800">{{ subjectSchedule.length }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Grid with Enhanced Design -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Class Distribution Chart -->
      <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Class Distribution</h3>
        <ApexChart type="donut" :categories="[...new Set(classes.map(item => item.name))]" :series="[...new Set(classes.map(item => item.name))].map(className =>
          classes.filter(item => item.name === className).length
        )" :colors="['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444']" :tooltipFormatter="(value, opts) => {
          const className = opts.w.globals.labels[opts.dataPointIndex];
          return `${className}: ${value} students`;
        }" />
      </div>

      <!-- Class History Chart -->
      <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Academic Progress</h3>
        <ApexChart type="line" :categories="[...new Set(history.map(item =>
          `${item.study_year.year} Sem ${item.study_year.semester}`
        ))]" :series="[{
          name: 'Students',
          data: [...new Set(history.map(item =>
            `${item.study_year.year} Sem ${item.study_year.semester}`
          ))].map(period =>
            history.filter(item =>
              `${item.study_year.year} Sem ${item.study_year.semester}` === period &&
              item.new_status === 'entered'
            ).length
          )
        }]" :yAxisFormatter="val => `${val} Students`"
          :tooltipFormatter="(val, label) => `${label}: ${val} Students`" />
      </div>

      <!-- Weekly Schedule Chart -->
      <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 md:col-span-2">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Weekly Schedule</h3>
        <ApexChart type="column" :categories="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']" :series="[{
          name: 'Subjects',
          data: [
            subjectSchedule.filter(schedule => schedule.day === 'Monday').length,
            subjectSchedule.filter(schedule => schedule.day === 'Tuesday').length,
            subjectSchedule.filter(schedule => schedule.day === 'Wednesday').length,
            subjectSchedule.filter(schedule => schedule.day === 'Thursday').length,
            subjectSchedule.filter(schedule => schedule.day === 'Friday').length
          ]
        }]" :colors="['#3B82F6']" :yAxisFormatter="val => `${val} Subjects`" :tooltipFormatter="(val, opts) => {
          const day = opts.w.globals.labels[opts.dataPointIndex];
          const subjects = subjectSchedule
            .filter(schedule => schedule.day === day)
            .map(schedule =>
              `• ${schedule.subject.name} (${schedule.subject_hour.start_time.slice(0, 5)}-${schedule.subject_hour.end_time.slice(0, 5)})`
            )
            .join('<br>');
          return `<strong>${day}</strong><br>${subjects || 'No classes scheduled'}`;
        }" />
      </div>
    </div>
  </Layout>
</template>