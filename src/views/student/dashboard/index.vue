<script setup>
import ApexChart from "@/components/widgets/Apexchart";
import Layout from "@/layouts/main.vue";
import { onMounted, ref, computed } from "vue";

import {
  useStudentClassStore,
  useStudentSubjectScheduleStore,
  useAuthStore
} from "@/state/pinia";


const classes = ref([]);
const classesStore = useStudentClassStore();

const subjectSchedule = ref([]);
const subjectScheduleStore = useStudentSubjectScheduleStore();

const meStore = useAuthStore();
const history = ref([]);
const loadingStatus = ref(true);
const studentStatus = ref({
  isAssociated: true,
  errorMessage: null
});

const getMe = async () => {
  await meStore.saveUserLogin();
  if (meStore.userLogin?.registration?.status === 'pending') {
    studentStatus.value.isAssociated = false;
    studentStatus.value.errorMessage = "Your registration is pending approval";
    return false;
  } else if (meStore.userLogin?.registration?.status === 'rejected') {
    studentStatus.value.isAssociated = false;
    studentStatus.value.errorMessage = "Your registration has been rejected";
    return false;
  }
  return true;
}

const getClasses = async () => {
  if (!studentStatus.value.isAssociated) return;
  try {
    await classesStore.getClasses();
    classes.value = classesStore.classes.data || [];
  } catch (error) {
    if (error.response?.status === 403) {
      studentStatus.value.isAssociated = false;
      studentStatus.value.errorMessage = error.response?.data?.errors?.message ||
        "Your registration has not been accepted yet";
    }
  }
}

const getSubjectSchedule = async () => {
  if (!studentStatus.value.isAssociated) return;
  try {
    await subjectScheduleStore.getSchedules();
    subjectSchedule.value = subjectScheduleStore.schedules || [];
  } catch (error) {
    console.error("Error fetching schedules:", error);
  }
}

const classCategories = computed(() => {
  return classes.value.length > 0
    ? [...new Set(classes.value.map(item => item.name))]
    : ['No Classes'];
});

const classSeries = computed(() => {
  return classes.value.length > 0
    ? classCategories.value.map(className =>
      className === 'No Classes' ? 1 : classes.value.filter(item => item.name === className).length
    )
    : [1];
});

const weekdaySchedule = computed(() => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  if (!subjectSchedule.value || subjectSchedule.value.length === 0) {
    return {
      categories: days,
      data: [0, 0, 0, 0, 0]
    };
  }

  return {
    categories: days,
    data: days.map(day =>
      subjectSchedule.value.filter(schedule => schedule.day === day).length
    )
  };
});

onMounted(async () => {
  loadingStatus.value = true;
  await getMe();
  if (studentStatus.value.isAssociated) {
    await getClasses();
    if (studentStatus.value.isAssociated) {
      await getSubjectSchedule();
    }
  }
  loadingStatus.value = false;
});
</script>

<template>
  <Layout>
    <!-- Enhanced Header for all users -->
    <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-lg shadow-lg mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">
        Welcome Back {{ meStore.userLogin?.name || 'Student' }}!
      </h1>
      <p class="text-blue-100">
        {{ studentStatus.isAssociated
          ? 'Your academic journey at a glance. Track your classes, schedules, and progress.'
          : 'Welcome to our learning management system.'
        }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loadingStatus" class="flex justify-center items-center p-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Not Associated / Registration Not Accepted Message -->
    <div v-else-if="!studentStatus.isAssociated" class="bg-white p-8 rounded-lg shadow-md text-center">
      <!-- Show different styled alert based on status -->
      <div v-if="meStore.userLogin?.registration?.status === 'rejected'"
        class="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              {{ studentStatus.errorMessage || "Your registration has been rejected" }}
            </p>
          </div>
        </div>
      </div>

      <div v-else class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              {{ studentStatus.errorMessage || "Your registration is pending approval" }}
            </p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-4"
        :class="{ 'text-red-600': meStore.userLogin?.registration?.status === 'rejected', 'text-yellow-600': meStore.userLogin?.registration?.status === 'pending' }">
        Registration Status: {{ meStore.userLogin?.registration?.status || 'Pending' }}
      </h2>

      <!-- Different message content based on status -->
      <template v-if="meStore.userLogin?.registration?.status === 'rejected'">
        <p class="text-gray-600 mb-6">
          Maaf, registrasi mu ditolak oleh administrator. Ini bisa karena berbagai alasan seperti data yang tidak
          lengkap
          atau ketidaksesuaian dengan persyaratan pendaftaran kami.
        </p>

        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 class="font-medium text-lg mb-2">Apa yang dapat dilakukan sekarang?</h3>
          <ul class="list-disc list-inside text-left space-y-2 text-gray-600">
            <li>Hubungi administrator sekolah untuk informasi lebih lanjut tentang alasan penolakan</li>
            <li>Periksa semua dokumen dan informasi yang kamu berikan saat pendaftaran</li>
            <li>Tanyakan apakah kamu dapat mendaftar ulang dengan informasi yang dikoreksi</li>
            <li>Atau cari tahu tentang jalur pendaftaran alternatif yang mungkin tersedia</li>
          </ul>
        </div>

        <div class="mt-6 flex justify-center">
          <button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Hubungi Administrator
          </button>
        </div>
      </template>

      <template v-else>
        <p class="text-gray-600 mb-6">
          Registrasi mu belum diterima. Silakan tunggu hingga admin memproses registrasi mu.
          Jika ada pertanyaan, hubungi admin sekolah.
        </p>

        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 class="font-medium text-lg mb-2">Apa yang terjadi selanjutnya?</h3>
          <ul class="list-disc list-inside text-left space-y-2 text-gray-600">
            <li>Pendaftaranmu akan ditinjau oleh administrator kami</li>
            <li>Setelah disetujui, kamu akan mendapatkan akses ke semua fitur siswa</li>
            <li>Kamu akan dapat melihat kelas, jadwal, dan materi pembelajaran</li>
            <li>Kamu akan menerima notifikasi ketika pendaftaranmu disetujui</li>
          </ul>
        </div>
      </template>
    </div>

    <!-- Dashboard Content for Associated Students -->
    <template v-else>
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
                <p class="text-2xl font-bold text-gray-800">{{ classes.length || 0 }}</p>
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
                <p class="text-2xl font-bold text-gray-800">{{ subjectSchedule.length || 0 }}</p>
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
          <div v-if="classes.length === 0" class="text-center py-10 text-gray-500">
            No class data available
          </div>
          <ApexChart v-else type="donut" :categories="classCategories" :series="classSeries"
            :colors="['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444']" :tooltipFormatter="(value, opts) => {
              const className = opts.w.globals.labels[opts.dataPointIndex];
              return className === 'No Classes'
                ? 'No class data available'
                : `${className}: ${value} students`;
            }" />
        </div>

        <!-- Class History Chart -->
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Academic Progress</h3>
          <div v-if="history.length === 0" class="text-center py-10 text-gray-500">
            No history data available
          </div>
          <ApexChart v-else type="line" :categories="history.length > 0
            ? [...new Set(history.map(item => `${item.study_year.year} Sem ${item.study_year.semester}`))]
            : ['No Data']" :series="[{
              name: 'Students',
              data: history.length > 0
                ? [...new Set(history.map(item => `${item.study_year.year} Sem ${item.study_year.semester}`))].map(period =>
                  history.filter(item =>
                    `${item.study_year.year} Sem ${item.study_year.semester}` === period &&
                    item.new_status === 'entered'
                  ).length
                )
                : [0]
            }]" :yAxisFormatter="val => `${val} Students`"
            :tooltipFormatter="(val, label) => `${label}: ${val} Students`" />
        </div>

        <!-- Weekly Schedule Chart -->
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 md:col-span-2">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Weekly Schedule</h3>
          <div v-if="subjectSchedule.length === 0" class="text-center py-10 text-gray-500">
            No schedule data available
          </div>
          <ApexChart v-else type="column" :categories="weekdaySchedule.categories" :series="[{
            name: 'Subjects',
            data: weekdaySchedule.data
          }]" :colors="['#3B82F6']" :yAxisFormatter="val => `${val} Subjects`" :tooltipFormatter="(val, opts) => {
            const day = opts.w.globals.labels[opts.dataPointIndex];
            if (subjectSchedule.length === 0) return 'No schedule data available';

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
    </template>
  </Layout>
</template>