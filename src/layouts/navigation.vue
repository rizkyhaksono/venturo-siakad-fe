<template>
    <div
        class="flex items-center justify-start bg-primary dark:bg-gray-800 px-4 lg:px-6 transition-colors duration-200">
        <nav class="flex gap-6 text-sm font-semibold text-white">
            <template v-for="(menu) in menus" :key="menu.label">
                <router-link v-if="!menu.submenu" :to="menu.to"
                    class="relative flex items-center gap-2 px-3 py-2 rounded-lg transition h-12 lg:h-[48px] hover:bg-opacity-20 hover:bg-white"
                    :class="{ 'font-bold': isActiveMenu(menu) }">
                    <span class="absolute bottom-0 right-0 w-full h-1 border-b-[5px] border-white rounded-t-[10px]"
                        :class="{ 'block': isActiveMenu(menu), 'hidden': !isActiveMenu(menu) }" />
                    <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path :d="menu.icon" />
                    </svg>
                    {{ menu.label }}
                </router-link>

                <div v-else class="relative" ref="dropdownRefs">
                    <button @click="toggleMenu(menu.label)"
                        class="relative flex items-center gap-2 px-3 py-2 rounded-lg transition h-12 lg:h-[48px] hover:bg-opacity-20 hover:bg-white"
                        :class="{ 'font-bold': isActiveMenu(menu) }">
                        <span class="absolute bottom-0 right-0 w-full h-1 border-b-[5px] border-white rounded-t-[10px]"
                            :class="{ 'block': isActiveMenu(menu), 'hidden': !isActiveMenu(menu) }" />
                        <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path :d="menu.icon" />
                        </svg>
                        {{ menu.label }}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-4 w-4 ml-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    <div v-if="openMenu === menu.label"
                        class="absolute left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-1 z-10">
                        <template v-for="sub in menu.submenu" :key="sub.label">
                            <router-link v-if="!sub.submenu" :to="sub.to"
                                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                :class="{ 'bg-gray-100 dark:bg-gray-700': isActiveMenu(sub) }">
                                {{ sub.label }}
                            </router-link>

                            <div v-else class="relative group">
                                <p class="block cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center"
                                    :class="{ 'bg-gray-100 dark:bg-gray-700': isActiveMenu(sub) }">
                                    {{ sub.label }}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="h-4 w-4 ml-2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </p>
                                <div
                                    class="absolute left-full top-0 mt-0 hidden group-hover:block bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-1 w-40">
                                    <router-link v-for="nested in sub.submenu" :key="nested.label" :to="nested.to"
                                        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                        :class="{ 'bg-gray-100 dark:bg-gray-700': isActiveMenu(nested) }">
                                        {{ nested.label }}
                                    </router-link>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </nav>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import {
    mdiHome,
    mdiSchool,
    mdiGoogleClassroom,
    mdiHumanMaleBoard,
    mdiCounter,
    mdiInvoiceTextClock,
    mdiAccountGroup,
    mdiCardAccountDetails,
    mdiHumanMaleBoardPoll,
    mdiCashMultiple,
    mdiCardAccountDetailsOutline,
    mdiFormatListNumbered,
    mdiAbTesting,
} from "@mdi/js";

const route = useRoute();

const openMenu = ref(null);
const dropdownRefs = ref([]);

const toggleMenu = (menuLabel) => {
    openMenu.value = openMenu.value === menuLabel ? null : menuLabel;
};

const isActiveMenu = (menu) => {
    if (menu.to && route.path === menu.to) return true;
    if (menu.submenu) {
        return menu.submenu.some(
            (sub) => sub.to === route.path || (sub.submenu && sub.submenu.some(nested => nested.to === route.path))
        );
    }
    return false;
};

const handleClickOutside = (event) => {
    if (!dropdownRefs.value.some((dropdown) => dropdown?.contains(event.target))) {
        openMenu.value = null;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

const getRole = localStorage.getItem("venturo_siakad_role");
const menus = ref([]);

const getRolePrefix = (role) => {
    if (role === 'Admin') return '/admin';
    if (role === 'Teacher') return '/teacher';
    if (role === 'Student') return '/student';
    return '';
};
const rolePrefix = getRolePrefix(getRole);

const adminMenus = [
    { label: "Dashboard", to: `${rolePrefix}/dashboard`, icon: mdiHome },
    {
        label: "Users",
        icon: mdiAccountGroup,
        submenu: [
            { label: "User", to: `${rolePrefix}/user` },
            { label: "User Role", to: `${rolePrefix}/user_role` },
        ],
    },
    {
        label: "Class",
        icon: mdiSchool,
        submenu: [
            { label: "Class", to: `${rolePrefix}/class` },
            { label: "Class History", to: `${rolePrefix}/class_history` },
        ]
    },
    {
        label: "Rombel",
        icon: mdiCardAccountDetailsOutline,
        to: `${rolePrefix}/rombel`,
    },
    {
        label: "Subject",
        icon: mdiGoogleClassroom,
        submenu: [
            { label: "Subject", to: `${rolePrefix}/subject` },
            { label: "Subject Hour", to: `${rolePrefix}/subject_hour` },
            { label: "Subject Schedule", to: `${rolePrefix}/subject_schedule` },
        ]
    },
    {
        label: "Teacher",
        icon: mdiHumanMaleBoard,
        submenu: [
            { label: "Teacher", to: `${rolePrefix}/teacher` },
            { label: "Homeroom Teacher", to: `${rolePrefix}/homeroom_teacher` }
        ]
    },
    { label: "Registration", to: `${rolePrefix}/registration`, icon: mdiInvoiceTextClock },
    {
        label: "Student",
        icon: mdiCardAccountDetails,
        submenu: [
            { label: "Student", to: `${rolePrefix}/student` },
            { label: "Student Assesment", to: `${rolePrefix}/student-assesment` }
        ]
    },
    { label: "KKM", to: `${rolePrefix}/kkm`, icon: mdiAbTesting },
    { label: "Study Year", to: `${rolePrefix}/study_year`, icon: mdiCounter },
    {
        label: "SPP",
        icon: mdiCashMultiple,
        submenu: [
            { label: "SPP", to: `${rolePrefix}/spp` },
            { label: "SPP History", to: `${rolePrefix}/spp-history` }
        ]
    },
];

const studentMenusAccepted = [
    { label: "Dashboard", to: `${rolePrefix}/dashboard`, icon: mdiHome },
    { label: "Rombel", to: `${rolePrefix}/rombel`, icon: mdiGoogleClassroom },
    { label: "Nilai Siswa", icon: mdiFormatListNumbered, to: `${rolePrefix}/student-assesment` },
    { label: "SPP", icon: mdiCashMultiple, to: `${rolePrefix}/spp` },
];

const studentMenusPending = [
    { label: "Dashboard", to: `${rolePrefix}/dashboard`, icon: mdiHome },
];

const teacherMenus = [
    { label: "Dashboard", to: `${rolePrefix}/dashboard`, icon: mdiHome },
    { label: "Rombel", to: `${rolePrefix}/rombel`, icon: mdiHumanMaleBoardPoll },
    { label: "Subject", to: `${rolePrefix}/subject`, icon: mdiGoogleClassroom },
    { label: "Student Assesment", to: `${rolePrefix}/student-assesment`, icon: mdiCardAccountDetails },
];

setMenusByRole();

function setMenusByRole() {
    if (getRole === 'Admin') {
        menus.value = adminMenus;
    } else if (getRole === 'Student') {
        menus.value = studentMenusPending;
        setTimeout(() => {
            const status = localStorage.getItem("venturo_siakad_status");
            menus.value = status === 'accepted' ? studentMenusAccepted : studentMenusPending;
        }, 1000);
    } else if (getRole === 'Teacher') {
        menus.value = teacherMenus;
    } else {
        menus.value = [];
    }
}
</script>

<style scoped>
.group:hover>div {
    display: block;
}

.fixed-dropdown {
    position: fixed;
    transform: translateY(12px);
    transform: translateX(50px);
    z-index: 9999;
}
</style>