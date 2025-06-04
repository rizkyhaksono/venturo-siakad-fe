<script setup>
import ApexChart from "@/components/widgets/Apexchart";
import Layout from "@/layouts/main.vue";
import { onMounted, ref, computed, inject } from "vue";

import {
    useAdminUserRoleStore,
    useAdminUserStore,
    useAdminRegistrationStore,
    useAdminClassHistoryStore,
    useAdminSubjectScheduleStore,
    useAdminStudentStore,
    useAdminRombelStore,
} from "@/state/pinia";

const chartTheme = inject('chartTheme', computed(() => ({})));

const userCounts = ref({
    Admin: 0,
    Teacher: 0,
    Student: 0,
});
const users = ref([]);
const userStore = useAdminUserStore();

const roles = ref([]);
const roleStore = useAdminUserRoleStore();

const registration = ref([]);
const registrationStore = useAdminRegistrationStore();

const classHistory = ref([]);
const classHistoryStore = useAdminClassHistoryStore();

const subjectSchedule = ref([]);
const subjectScheduleStore = useAdminSubjectScheduleStore();

const students = ref([]);
const studentStore = useAdminStudentStore();

const rombels = ref([]);
const rombelStore = useAdminRombelStore();

const getUsers = async () => {
    await roleStore.getRoles();
    const roleData = roleStore.roles;

    const adminRoleId = roleData.find(role => role.name === 'Admin')?.id;
    const teacherRoleId = roleData.find(role => role.name === 'Teacher')?.id;
    const studentRoleId = roleData.find(role => role.name === 'Student')?.id;

    await userStore.getUsers(1000);
    const userData = userStore.users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.m_user_roles_id,
    }));
    users.value = userData;

    userCounts.value = {
        Admin: userData.filter(user => user.role === adminRoleId).length,
        Teacher: userData.filter(user => user.role === teacherRoleId).length,
        Student: userData.filter(user => user.role === studentRoleId).length
    };
};

const getRoles = async () => {
    await roleStore.getRoles();
    roles.value = roleStore.roles.map(role => ({
        id: role.id,
        name: role.name,
        access: role.access.split(',').map(item => item.trim())
    }));
};

const getRegistration = async () => {
    await registrationStore.getRegistrations();
    registration.value = registrationStore.registrations.data
}

const getClassHistory = async () => {
    await classHistoryStore.getClassHistory();
    classHistory.value = classHistoryStore.classHistory.data.data
}

const getSubjectSchedule = async () => {
    await subjectScheduleStore.getSchedules();
    subjectSchedule.value = subjectScheduleStore.schedules
}

const getStudents = async () => {
    await studentStore.getStudents();
    students.value = studentStore.students
}

const getRombels = async () => {
    await rombelStore.getRombels();
    rombels.value = rombelStore.rombels;
}

onMounted(async () => {
    await getUsers();
    await getRoles();
    await getRegistration();
    await getClassHistory();
    await getSubjectSchedule();
    await getStudents();
    await getRombels();
});

</script>

<template>
    <Layout>
        <div
            class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6 flex justify-between items-center transition-colors duration-200">
            <div>
                <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
                <p class="text-gray-600 dark:text-gray-400">Welcome to your administrative control panel</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-200">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 dark:text-gray-300">Total Users</p>
                        <p class="text-xl font-semibold text-gray-700 dark:text-gray-100">
                            {{ userCounts.Admin + userCounts.Student + userCounts.Teacher }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-200">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 dark:text-gray-300">Total Students</p>
                        <p class="text-xl font-semibold text-gray-700 dark:text-gray-100">
                            {{ userCounts.Student }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-200">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-500 dark:text-yellow-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 dark:text-gray-300">Total Teachers</p>
                        <p class="text-xl font-semibold text-gray-700 dark:text-gray-100">
                            {{ userCounts.Teacher }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-200">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-500 dark:text-purple-300">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-gray-500 dark:text-gray-300">Total Rombels</p>
                        <p class="text-xl font-semibold text-gray-700 dark:text-gray-100">
                            {{ rombels.length }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-200">
                <ApexChart type="donut" title="Total Roles" :categories="['Admin', 'Student', 'Teacher']"
                    :series="[userCounts.Admin || 0, userCounts.Student || 0, userCounts.Teacher || 0,]"
                    :colors="['#FF6384', '#36A2EB', '#FFCE56']" :chartOptions="chartTheme" />
            </div>

            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-200">
                <ApexChart type="area" title="Registration User"
                    :categories="registration.map(reg => new Date(reg.created_at).toLocaleDateString('id-ID', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }))"
                    :series="[{
                        name: 'New Registrations',
                        data: registration.map(reg => 1)
                    }]" :colors="['#00C49F']" :chartOptions="chartTheme" />
            </div>

            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-200">
                <ApexChart type="line" title="Rombels"
                    :categories="rombels.map(rombel => `${rombel.study_year.year} Semester ${rombel.study_year.semester}`)"
                    :series="[{
                        name: 'Students per Rombel',
                        data: rombels.map(rombel => rombel.students.length)
                    }]" :yAxisFormatter="val => `${val} Students`"
                    :tooltipFormatter="(val, label) => `${label}: ${val} Students`" :chartOptions="chartTheme" />
            </div>

            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-200">
                <ApexChart type="column" title="Subject Schedule"
                    :categories="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']" :series="[{
                        name: 'Total Subjects',
                        data: [
                            subjectSchedule.filter(schedule => schedule.day === 'Monday').length,
                            subjectSchedule.filter(schedule => schedule.day === 'Tuesday').length,
                            subjectSchedule.filter(schedule => schedule.day === 'Wednesday').length,
                            subjectSchedule.filter(schedule => schedule.day === 'Thursday').length,
                            subjectSchedule.filter(schedule => schedule.day === 'Friday').length
                        ]
                    }]" :yAxisFormatter="val => `${val} Subjects`" :tooltipFormatter="(val, { w, dataPointIndex }) => {
                        const day = w.config.xaxis.categories[dataPointIndex];
                        const subjects = subjectSchedule
                            .filter(schedule => schedule.day === day)
                            .map(schedule => `${schedule.subject.name} (${schedule.subject_hour.start_time}-${schedule.subject_hour.end_time})`)
                            .join('<br>');
                        return `${day}<br>${subjects || 'No subjects'}`;
                    }" :chartOptions="chartTheme" />
            </div>
        </div>
    </Layout>
</template>