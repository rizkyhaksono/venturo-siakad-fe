<script setup>
import Layout from "@/layouts/main.vue";
import { onMounted, ref } from "vue";

import {
  useAuthStore,
  useTeacherRombelStore,
} from "@/state/pinia";

const meStore = useAuthStore();
const rombelStore = useTeacherRombelStore();

const loading = ref(true);
const currentRombel = ref(null);
const rombelStudents = ref([]);

const getMe = async () => {
  await meStore.saveUserLogin();
}

const getRombels = async () => {
  await rombelStore.getRombels();
  console.log('Rombels:', rombelStore.rombels);

  if (rombelStore.rombels && rombelStore.rombels.length > 0) {
    const rombels = {};
    rombelStore.rombels.forEach(rombel => {
      if (!rombels[rombel.name]) {
        rombels[rombel.name] = {
          name: rombel.name,
          class: rombel.class,
          study_year: rombel.study_year,
          teacher: rombel.teacher,
          students: []
        };
      }
      if (rombel.student) {
        rombels[rombel.name].students.push(rombel.student);
      }
    });

    const rombelNames = Object.keys(rombels);
    if (rombelNames.length > 0) {
      currentRombel.value = rombels[rombelNames[0]];
      rombelStudents.value = rombels[rombelNames[0]].students;
    }
  }
}

onMounted(async () => {
  loading.value = true;
  await getMe();
  await getRombels();
  loading.value = false;
});

</script>

<template>
  <Layout>
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center p-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400 transition-colors duration-200">
      </div>
    </div>

    <div v-else>
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-lg shadow-lg mb-8">
        <div class="flex items-center justify-between">
          <div>
            <div class="space-y-3">
              <h1 class="text-xl font-bold text-white mb-2 animate-fade-in">
                Welcome, {{ meStore.userLogin.name }}!
              </h1>
              <p class="text-lg text-blue-100 opacity-90">
                Your Teaching Dashboard
                <span class="inline-block ml-2">
                  <svg class="w-6 h-6 inline animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">
          <div class="flex items-center">
            <div
              class="p-4 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-colors duration-200">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="ml-6">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">Total Class
              </p>
              <p class="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-200">
                {{ currentRombel ? 1 : 0 }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300">
          <div class="flex items-center">
            <div
              class="p-4 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 transition-colors duration-200">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="ml-6">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">Total
                Subject</p>
              <p class="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-200">1</p>
            </div>
          </div>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300">
          <div class="flex items-center">
            <div
              class="p-4 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 transition-colors duration-200">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-6">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">Total
                Students</p>
              <p class="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-200">
                {{ rombelStudents.length }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Rombel Information Card -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200">
            Your Rombel
          </h3>
          <span v-if="currentRombel"
            class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium transition-colors duration-200">
            {{ currentRombel.name }}
          </span>
        </div>

        <div v-if="!currentRombel"
          class="py-8 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
          No rombel data available
        </div>

        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-colors duration-200">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">Class</p>
              <p class="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200">
                {{ currentRombel.class?.name }}
              </p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-colors duration-200">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">Academic
                Year</p>
              <p class="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200">
                {{ currentRombel.study_year?.year }} (Semester {{ currentRombel.study_year?.semester }})
              </p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg transition-colors duration-200">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200">Total
                Students</p>
              <p class="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200">
                {{ rombelStudents.length }}
              </p>
            </div>
          </div>

          <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-200">Rombel
            Students</h4>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
              <thead class="bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
                <tr>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-colors duration-200">
                    Student ID
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-colors duration-200">
                    Name
                  </th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-colors duration-200">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
                <tr v-for="student in rombelStudents" :key="student.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                    {{ student.student_number }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div
                        class="flex-shrink-0 h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 transition-colors duration-200">
                        {{ student.name?.charAt(0)?.toUpperCase() || 'S' }}
                      </div>
                      <div class="ml-4">
                        <div
                          class="text-sm font-medium text-gray-900 dark:text-gray-200 transition-colors duration-200">
                          {{ student.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 transition-colors duration-200">
                      {{ student.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Teaching Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Teaching Status Card -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200">Teaching
              Status</h3>
            <span
              class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium transition-colors duration-200">Active</span>
          </div>

          <div class="space-y-4">
            <div
              class="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4 transition-colors duration-200">
              <div class="flex items-center">
                <div
                  class="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span class="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-200">Current
                  Term</span>
              </div>
              <span class="text-gray-800 dark:text-gray-200 transition-colors duration-200">
                {{ subjectStore?.subjects?.data?.[0]?.study_year?.semester || '-' }} / {{
                  subjectStore?.subjects?.data?.[0]?.study_year?.year || '-' }}
              </span>
            </div>

            <div
              class="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4 transition-colors duration-200">
              <div class="flex items-center">
                <div
                  class="p-2 rounded-md bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-3 transition-colors duration-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span class="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-200">Teaching
                  Subjects</span>
              </div>
              <span class="text-gray-800 dark:text-gray-200 transition-colors duration-200">{{
                subjectStore?.subjects?.meta?.total || 0 }}</span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div
                  class="p-2 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3 transition-colors duration-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span class="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-200">Class
                  Advisor</span>
              </div>
              <span class="text-gray-800 dark:text-gray-200 transition-colors duration-200">{{
                classStore?.classes?.data?.filter(c => c.teacher?.id === meStore.userLogin?.id)?.length || 0}}</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions Card -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-200">Quick
            Actions</h3>

          <div class="grid grid-cols-2 gap-4">
            <router-link to="/teacher/rombel"
              class="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200">
              <div
                class="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span class="text-sm font-medium text-blue-700 dark:text-blue-300 transition-colors duration-200">Manage
                Classes</span>
            </router-link>

            <router-link to="/teacher/subject"
              class="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200">
              <div
                class="p-2 rounded-md bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-3 transition-colors duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span class="text-sm font-medium text-green-700 dark:text-green-300 transition-colors duration-200">View
                Subjects</span>
            </router-link>

            <router-link to="/teacher/rombel"
              class="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors duration-200">
              <div
                class="p-2 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mr-3 transition-colors duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span class="text-sm font-medium text-amber-700 dark:text-amber-300 transition-colors duration-200">Manage
                Assessments</span>
            </router-link>

            <router-link to="/teacher/rombel"
              class="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200">
              <div
                class="p-2 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3 transition-colors duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span class="text-sm font-medium text-purple-700 dark:text-purple-300 transition-colors duration-200">View
                Students</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>