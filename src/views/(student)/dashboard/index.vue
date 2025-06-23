<script setup>
import ApexChart from "@/components/widgets/Apexchart";
import Layout from "@/layouts/main.vue";
import {
  useAuthStore,
  useStudentSubjectScheduleStore,
  useStudentRombelStore,
  useStudentAssesmentStore,
  useStudentSPPHistoryStore,
} from "@/state/pinia";
import { computed, onMounted, ref } from "vue";

const subjectSchedule = ref([]);
const subjectScheduleStore = useStudentSubjectScheduleStore();

const rombelStore = useStudentRombelStore();
const rombels = ref([]);

const assessmentStore = useStudentAssesmentStore();
const assessments = ref([]);

const sppHistoryStore = useStudentSPPHistoryStore();
const sppHistory = ref([]);

const meStore = useAuthStore();
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

const getSubjectSchedule = async () => {
  if (!studentStatus.value.isAssociated) return;
  try {
    await subjectScheduleStore.getSchedules();
    subjectSchedule.value = subjectScheduleStore.schedules || [];
  } catch (error) {
    console.error("Error fetching schedules:", error);
  }
}

const getRombels = async () => {
  if (!studentStatus.value.isAssociated) return;
  try {
    await rombelStore.getRombels();
    rombels.value = rombelStore.rombels || [];
  } catch (error) {
    console.error("Error fetching rombels:", error);
  }
}

const getAssessments = async () => {
  if (!studentStatus.value.isAssociated) return;
  try {
    await assessmentStore.getAssesments();
    assessments.value = assessmentStore.assesments.data || [];
  } catch (error) {
    console.error("Error fetching assessments:", error);
  }
}

const getSPPHistory = async () => {
  if (!studentStatus.value.isAssociated) return;
  try {
    await sppHistoryStore.getSPPHistory();
    sppHistory.value = sppHistoryStore.sppHistory.data || [];
  } catch (error) {
    console.error("Error fetching SPP history:", error);
  }
}

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

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

// Calculate average assessment scores
const averageScores = computed(() => {
  if (!assessments.value || assessments.value.length === 0) {
    return { uts: 0, uas: 0, tugas: 0, activity: 0, total: 0 };
  }

  const sum = assessments.value.reduce((acc, assessment) => {
    return {
      uts: acc.uts + parseFloat(assessment.uts_score || 0),
      uas: acc.uas + parseFloat(assessment.uas_score || 0),
      tugas: acc.tugas + parseFloat(assessment.tugas_score || 0),
      activity: acc.activity + parseFloat(assessment.activity_score || 0),
      total: acc.total + parseFloat(assessment.total_score || 0)
    };
  }, { uts: 0, uas: 0, tugas: 0, activity: 0, total: 0 });

  const count = assessments.value.length;

  return {
    uts: (sum.uts / count).toFixed(2),
    uas: (sum.uas / count).toFixed(2),
    tugas: (sum.tugas / count).toFixed(2),
    activity: (sum.activity / count).toFixed(2),
    total: (sum.total / count).toFixed(2)
  };
});

// Calculate SPP payment stats
const sppStats = computed(() => {
  if (!sppHistory.value || sppHistory.value.length === 0) {
    return { paid: 0, unpaid: 0, total: 0, percentage: 0 };
  }

  const paid = sppHistory.value.filter(item => item.payment_status === 'paid').length;
  const total = sppHistory.value.length;

  return {
    paid,
    unpaid: total - paid,
    total,
    percentage: total > 0 ? Math.round((paid / total) * 100) : 0
  };
});

onMounted(async () => {
  loadingStatus.value = true;
  await getMe();
  if (studentStatus.value.isAssociated) {
    await Promise.all([
      getSubjectSchedule(),
      getRombels(),
      getAssessments(),
      getSPPHistory()
    ]);
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
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400 transition-colors duration-200">
      </div>
    </div>

    <!-- Not Associated / Registration Not Accepted Message -->
    <div v-else-if="!studentStatus.isAssociated"
      class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center transition-colors duration-200">
      <!-- Show different styled alert based on status -->
      <div v-if="meStore.userLogin?.registration?.status === 'rejected'"
        class="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 dark:border-red-500 p-4 mb-6 transition-colors duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-400 dark:text-red-300 transition-colors duration-200" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700 dark:text-red-300 transition-colors duration-200">
              {{ studentStatus.errorMessage || "Your registration has been rejected" }}
            </p>
          </div>
        </div>
      </div>

      <div v-else
        class="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 mb-6 transition-colors duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-yellow-400 dark:text-yellow-300 transition-colors duration-200" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700 dark:text-yellow-300 transition-colors duration-200">
              {{ studentStatus.errorMessage || "Your registration is pending approval" }}
            </p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-4 dark:text-white transition-colors duration-200" :class="{
        'text-red-600 dark:text-red-400': meStore.userLogin?.registration?.status === 'rejected',
        'text-yellow-600 dark:text-yellow-400': meStore.userLogin?.registration?.status === 'pending'
      }">
        Registration Status: {{ meStore.userLogin?.registration?.status || 'Pending' }}
      </h2>

      <!-- Different message content based on status -->
      <template v-if="meStore.userLogin?.registration?.status === 'rejected'">
        <p class="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
          Maaf, registrasi mu ditolak oleh administrator. Ini bisa karena berbagai alasan seperti data yang tidak
          lengkap atau ketidaksesuaian dengan persyaratan pendaftaran kami.
        </p>

        <div
          class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200">
          <h3 class="font-medium text-lg mb-2 dark:text-gray-200 transition-colors duration-200">Apa yang dapat
            dilakukan sekarang?</h3>
          <ul
            class="list-disc list-inside text-left space-y-2 text-gray-600 dark:text-gray-300 transition-colors duration-200">
            <li>Hubungi administrator sekolah untuk informasi lebih lanjut tentang alasan penolakan</li>
            <li>Periksa semua dokumen dan informasi yang kamu berikan saat pendaftaran</li>
            <li>Tanyakan apakah kamu dapat mendaftar ulang dengan informasi yang dikoreksi</li>
            <li>Atau cari tahu tentang jalur pendaftaran alternatif yang mungkin tersedia</li>
          </ul>
        </div>

        <div class="mt-6 flex justify-center">
          <button
            class="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200">
            Hubungi Administrator
          </button>
        </div>
      </template>

      <template v-else>
        <p class="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
          Registrasi mu belum diterima. Silakan tunggu hingga admin memproses registrasi mu.
          Jika ada pertanyaan, hubungi admin sekolah.
        </p>

        <div
          class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200">
          <h3 class="font-medium text-lg mb-2 dark:text-gray-200 transition-colors duration-200">Apa yang terjadi
            selanjutnya?</h3>
          <ul
            class="list-disc list-inside text-left space-y-2 text-gray-600 dark:text-gray-300 transition-colors duration-200">
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
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
        <!-- Schedule Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div class="p-6">
            <div class="flex items-center">
              <div
                class="p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 transition-colors duration-200">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-6">
                <p
                  class="text-gray-500 dark:text-gray-300 text-sm uppercase tracking-wider transition-colors duration-200">
                  Active Schedules</p>
                <p class="text-2xl font-bold text-gray-700 dark:text-gray-100 transition-colors duration-200">{{
                  subjectSchedule.length || 0 }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Rombel Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div class="p-6">
            <div class="flex items-center">
              <div
                class="p-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 transition-colors duration-200">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div class="ml-6">
                <p
                  class="text-gray-500 dark:text-gray-300 text-sm uppercase tracking-wider transition-colors duration-200">
                  Class Groups</p>
                <p class="text-2xl font-bold text-gray-700 dark:text-gray-100 transition-colors duration-200">{{
                  rombels.length || 0 }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SPP Payment Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div class="p-6">
            <div class="flex items-center">
              <div
                class="p-4 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 transition-colors duration-200">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="ml-6">
                <p
                  class="text-gray-500 dark:text-gray-300 text-sm uppercase tracking-wider transition-colors duration-200">
                  SPP Payments</p>
                <p class="text-2xl font-bold text-gray-700 dark:text-gray-100 transition-colors duration-200">
                  {{ sppStats.percentage }}% <span class="text-sm text-gray-500 dark:text-gray-400">Paid</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rombel, Assessment, and SPP Information Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Class Group (Rombel) Information -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200">Class
              Group</h3>
            <router-link to="/student/rombel"
              class="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200">View
              Details</router-link>
          </div>

          <div v-if="rombels.length === 0"
            class="py-8 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
            No class group information available
          </div>

          <div v-else class="space-y-4">
            <div v-for="rombel in rombels.slice(0, 1)" :key="rombel.id"
              class="border-b border-gray-100 dark:border-gray-700 pb-4 transition-colors duration-200">
              <div class="flex items-start">
                <div
                  class="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4 transition-colors duration-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292V4.354zM15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-md font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200">{{
                    rombel.class.name }}</h4>
                  <p class="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">Wali Kelas: {{
                    rombel.teacher.name }}</p>
                  <p class="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
                    Tahun Ajaran: {{ rombel.study_year.year }} (Semester {{ rombel.study_year.semester }})
                  </p>
                </div>
              </div>
            </div>

            <div v-if="rombels.length > 1" class="text-center">
              <span class="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">+ {{ rombels.length
                - 1 }} more class group(s)</span>
            </div>
          </div>
        </div>

        <!-- Student Assessment Information -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200">Latest
              Assessment</h3>
            <router-link to="/student/student-assesment"
              class="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200">View
              All</router-link>
          </div>

          <div v-if="assessments.length === 0"
            class="py-8 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
            No assessment data available
          </div>

          <div v-else class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center transition-colors duration-200">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-200">UTS Average
                </div>
                <div :class="{
                  'text-xl font-bold': true,
                  'text-green-600 dark:text-green-400': parseFloat(averageScores.uts) >= 70,
                  'text-red-600 dark:text-red-400': parseFloat(averageScores.uts) < 70,
                  'transition-colors duration-200': true
                }">{{ averageScores.uts }}</div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center transition-colors duration-200">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-200">UAS Average
                </div>
                <div :class="{
                  'text-xl font-bold': true,
                  'text-green-600 dark:text-green-400': parseFloat(averageScores.uas) >= 70,
                  'text-red-600 dark:text-red-400': parseFloat(averageScores.uas) < 70,
                  'transition-colors duration-200': true
                }">{{ averageScores.uas }}</div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center transition-colors duration-200">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-200">Tugas Average
                </div>
                <div :class="{
                  'text-xl font-bold': true,
                  'text-green-600 dark:text-green-400': parseFloat(averageScores.tugas) >= 70,
                  'text-red-600 dark:text-red-400': parseFloat(averageScores.tugas) < 70,
                  'transition-colors duration-200': true
                }">{{ averageScores.tugas }}</div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center transition-colors duration-200">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-200">Activity
                  Average</div>
                <div :class="{
                  'text-xl font-bold': true,
                  'text-green-600 dark:text-green-400': parseFloat(averageScores.activity) >= 70,
                  'text-red-600 dark:text-red-400': parseFloat(averageScores.activity) < 70,
                  'transition-colors duration-200': true
                }">{{ averageScores.activity }}</div>
              </div>
            </div>

            <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-200">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200">
                  Overall Average
                </span>
                <span :class="{
                  'text-xl font-bold': true,
                  'text-green-600 dark:text-green-400': parseFloat(averageScores.total) >= 70,
                  'text-red-600 dark:text-red-400': parseFloat(averageScores.total) < 70,
                  'transition-colors duration-200': true
                }">{{ averageScores.total }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- SPP History Information -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200">SPP
              Payments</h3>
            <router-link to="/student/spp"
              class="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200">View
              All</router-link>
          </div>

          <div v-if="sppHistory.length === 0"
            class="py-8 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
            No payment history available
          </div>

          <div v-else>
            <div class="mb-4">
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 transition-colors duration-200">
                <div class="bg-green-500 dark:bg-green-600 h-2.5 rounded-full transition-colors duration-200"
                  :style="`width: ${sppStats.percentage}%`"></div>
              </div>
              <div
                class="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                <span>{{ sppStats.paid }} Paid</span>
                <span>{{ sppStats.percentage }}%</span>
                <span>{{ sppStats.unpaid }} Unpaid</span>
              </div>
            </div>

            <div class="space-y-2 mt-4">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">Recent
                Payments</h4>
              <div v-for="(payment) in sppHistory.slice(0, 3)" :key="payment.id"
                class="py-2 border-b last:border-0 border-gray-100 dark:border-gray-700 transition-colors duration-200">
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <div :class="{
                      'w-2 h-2 rounded-full mr-2': true,
                      'bg-green-500 dark:bg-green-400': payment.payment_status === 'paid',
                      'bg-yellow-500 dark:bg-yellow-400': payment.payment_status !== 'paid',
                      'transition-colors duration-200': true
                    }"></div>
                    <span class="text-sm text-gray-800 dark:text-gray-200 transition-colors duration-200">{{
                      payment.spp.name }}</span>
                  </div>
                  <span class="text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200">
                    {{ formatRupiah(payment.amount_paid) }}
                  </span>
                </div>
                <div class="flex justify-between mt-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                    {{ new Date(payment.payment_date).toLocaleDateString('id-ID') }}
                  </span>
                  <span :class="{
                    'text-xs': true,
                    'text-green-600 dark:text-green-400': payment.payment_status === 'paid',
                    'text-yellow-600 dark:text-yellow-400': payment.payment_status !== 'paid',
                    'transition-colors duration-200': true
                  }">{{ payment.payment_status === 'paid' ? 'Paid' : 'Processing' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Grid with Enhanced Design -->
      <div class="grid grid-cols-1 gap-8 mb-8">
        <!-- Weekly Schedule Chart -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-200">Weekly
            Schedule</h3>
          <div v-if="subjectSchedule.length === 0"
            class="text-center py-10 text-gray-700 dark:text-gray-300 transition-colors duration-200">
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