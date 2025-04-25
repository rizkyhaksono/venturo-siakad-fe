<script setup>
import ApexChart from "@/components/widgets/Apexchart";
import Layout from "@/layouts/main.vue";
import { onMounted } from "vue";

import {
  useAuthStore,
  useTeacherClassStore,
  useTeacherStudentStore,
  useTeacherSubjectStore
} from "@/state/pinia";

const meStore = useAuthStore();
const classStore = useTeacherClassStore();
const studentStore = useTeacherStudentStore();
const subjectStore = useTeacherSubjectStore();

const getMe = async () => {
  await meStore.saveUserLogin();
}

const getClass = async () => {
  await classStore.getClasses();
}

const getStudent = async () => {
  await studentStore.getStudents();
}

const getSubject = async () => {
  await subjectStore.getSubjects();
}

onMounted(async () => {
  await getMe();
  await getClass();
  await getStudent();
  await getSubject();
});

</script>

<template>
  <Layout>
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
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-blue-500 transition-all">
        <div class="flex items-center">
          <div class="p-4 rounded-full bg-blue-50 text-blue-600">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div class="ml-6">
            <p class="text-sm font-medium text-gray-500">Total Class</p>
            <p class="text-2xl font-bold text-gray-800">
              {{ classStore?.classes?.meta?.total }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-green-500 transition-all">
        <div class="flex items-center">
          <div class="p-4 rounded-full bg-green-50 text-green-600">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="ml-6">
            <p class="text-sm font-medium text-gray-500">Total Subject</p>
            <p class="text-2xl font-bold text-gray-800">
              {{ subjectStore?.subjects.meta?.total }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-purple-500 transition-all">
        <div class="flex items-center">
          <div class="p-4 rounded-full bg-purple-50 text-purple-600">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="ml-6">
            <p class="text-sm font-medium text-gray-500">Total Students</p>
            <p class="text-2xl font-bold text-gray-800">
              {{ studentStore?.students?.length }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Class Distribution</h3>
        <ApexChart type="donut"
          :categories="[subjectStore?.subjects?.data?.[0]?.study_year?.year + ' Semester ' + subjectStore?.subjects?.data?.[0]?.study_year?.semester]"
          :series="[subjectStore?.subjects?.meta?.total || 0]" :colors="['#4F46E5']" :options="{
            tooltip: {
              y: {
                formatter: function (value) {
                  return value + ' Subject' + (value !== 1 ? 's' : '');
                }
              }
            }
          }" />
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Weekly Schedule</h3>
        <ApexChart type="column" :categories="subjectStore?.subjects?.data?.map(subject => subject.name) || []" :series="[{
          name: 'Subjects',
          data: subjectStore?.subjects?.data?.map(() => 1) || []
        }]" :colors="['#4F46E5']" :options="{
          chart: {
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            }
          },
          dataLabels: {
            enabled: false
          },
          tooltip: {
            y: {
              formatter: function (value) {
                return value + ' Subject';
              }
            }
          },
          xaxis: {
            labels: {
              rotate: -45,
              trim: true,
              maxHeight: 120
            }
          }
        }" />
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 md:col-span-2">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Student Progress</h3>
        <ApexChart type="line"
          :categories="studentStore?.students?.map(student => student.classHistory.entry_date) || []" :series="[{
            name: 'Students',
            data: studentStore?.students?.map((_, index) => index + 1) || []
          }]" :colors="['#4F46E5']" :options="{
            chart: {
              toolbar: {
                show: false
              }
            },
            stroke: {
              curve: 'smooth',
              width: 3
            },
            markers: {
              size: 5
            },
            xaxis: {
              labels: {
                rotate: -45,
                trim: true
              },
              title: {
                text: 'Entry Date'
              }
            },
            yaxis: {
              title: {
                text: 'Number of Students'
              },
              labels: {
                formatter: (value) => `${value} Students`
              }
            },
            tooltip: {
              y: {
                formatter: (value) => `${value} Students`
              }
            }
          }" />
      </div>
    </div>
  </Layout>
</template>