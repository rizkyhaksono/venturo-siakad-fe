<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount, provide } from "vue";
import { useRouter } from "vue-router";
import { useColorMode } from "@vueuse/core";
import { useAuthStore } from "@/state/pinia";
import Menu from './navigation.vue';
import {
    mdiAccountCircle,
    mdiWeatherNight,
    mdiWhiteBalanceSunny
} from "@mdi/js";

const mode = useColorMode({
    attribute: 'class',
    modes: {
        light: '',
        dark: 'dark',
    },
});

const isDarkMode = computed(() => mode.value === 'dark');

provide('isDarkMode', isDarkMode);

const toggleTheme = () => {
    mode.value = mode.value === "dark" ? "light" : "dark";
    localStorage.setItem('dark-mode', mode.value === 'dark');
};

provide('toggleTheme', toggleTheme);

onMounted(() => {
    const darkModePreference = localStorage.getItem('dark-mode');
    if (darkModePreference !== null) {
        mode.value = darkModePreference === 'true' ? 'dark' : 'light';
    }
});

watch(mode, (newMode) => {
    localStorage.setItem('vueuse-color-scheme', newMode);
    localStorage.setItem('dark-mode', newMode === 'dark');
});

const chartTheme = computed(() => {
    return isDarkMode.value ? {
        chart: {
            background: '#1F2937',
            foreColor: '#E5E7EB'
        },
        theme: {
            mode: 'dark',
            palette: 'palette1'
        }
    } : {
        chart: {
            background: '#FFFFFF',
            foreColor: '#374151'
        },
        theme: {
            mode: 'light',
            palette: 'palette1'
        }
    };
});

provide('chartTheme', chartTheme);

const router = useRouter();
const authStore = useAuthStore();

const logout = async () => {
    await authStore.logout();
    router.push({ name: "login" });
};

const getRole = localStorage.getItem("venturo_siakad_role");
const getRolePrefix = (role) => {
    if (role === 'Admin') return '/admin';
    if (role === 'Teacher') return '/teacher';
    if (role === 'Student') return '/student';
    return '';
};
const rolePrefix = getRolePrefix(getRole);

const currentTime = ref(new Date());
let clockInterval;

function updateTime() {
    currentTime.value = new Date();
}

onMounted(() => {
    updateTime();
    clockInterval = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
    if (clockInterval) clearInterval(clockInterval);
});

function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
</script>

<template>
    <div
        class="grid min-h-screen w-full grid-rows-[auto_auto_1fr] bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <header
            class="fixed top-0 left-0 w-full z-50 flex h-14 lg:h-[60px] items-center justify-between border-b bg-gray-100 dark:bg-gray-950 px-4 lg:px-6 transition-colors duration-200">
            <router-link :to="`${rolePrefix}/dashboard`" class="flex items-center gap-2 font-semibold">
                <img src="https://natee.my.id/favicon.ico" class="size-8" alt="logo-siakad">
                <span class="text-black dark:text-white">SIAKAD</span>
            </router-link>

            <div class="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">
                {{ formatTime(currentTime) }}
            </div>

            <div class="flex items-center gap-4">
                <button @click="toggleTheme"
                    class="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
                    <svg class="h-5 w-5 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                        <path :d="isDarkMode ? mdiWeatherNight : mdiWhiteBalanceSunny" />
                    </svg>
                </button>

                <div class="dropdown relative">
                    <button data-toggle="dropdown" aria-expanded="false"
                        class="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
                        <svg class="h-5 w-5 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                            <path :d="mdiAccountCircle" />
                        </svg>
                    </button>
                    <div data-role="menu"
                        class="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-1 z-10">
                        <router-link :to="`${rolePrefix}/profile`"
                            class="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            My Account
                        </router-link>
                        <router-link :to="`${rolePrefix}/settings`"
                            class="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            Settings
                        </router-link>
                        <button @click="logout"
                            class="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <Menu class="fixed top-14 left-0 w-full z-40 shadow-md" />

        <main
            class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 pt-[128px] lg:pt-[128px] text-gray-800 dark:text-gray-200 transition-colors duration-200">
            <slot />
        </main>
    </div>
</template>

<style>
.theme-transition,
* {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
}

.dark .shadow-sm {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
}

.dark .shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.dark .shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
}

.dark .text-gray-700 {
    color: #E5E7EB;
}
</style>