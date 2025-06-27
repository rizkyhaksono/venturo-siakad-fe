<script setup>
import Button from "@/components/widgets/Button.vue";
import { useAuthStore } from "@/state/pinia";
import { mdiWeatherNight, mdiWhiteBalanceSunny } from "@mdi/js";
import { useColorMode } from "@vueuse/core";
import { computed, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { Toaster, toast } from "vue-sonner";

const router = useRouter();
const authStore = useAuthStore();

const formModel = reactive({
    email: "",
});

const errorList = reactive({
    email: null,
});

const forgetPassword = async () => {
    await authStore.forgetPassword(formModel);
    if (authStore.response.status === 422) {
        errorList.email = ["Email not found"];
        toast.error("Forgot Password Failed", {
            description: "The email you entered is not registered.",
            position: "bottom-right",
            duration: 3000,
            class: "bg-red-600 text-white border-none shadow-lg",
        });
    } else if (authStore.response.status !== 200) {
        toast.error("Forgot Password Failed", {
            description: "Please check your email and try again later.",
            position: "bottom-right",
            duration: 3000,
            class: "bg-red-600 text-white border-none shadow-lg",
        });
    } else {
        toast.success("Forgot Password Success", {
            description: "Check your email to reset your password.",
            position: "bottom-right",
            duration: 3000,
            class: "bg-green-500 text-white border-none shadow-lg",
        });
        router.push("/reset-password");
    }
};

const mode = useColorMode({
    attribute: 'class',
    modes: {
        light: '',
        dark: 'dark',
    },
});

onMounted(() => {
    const darkModePreference = localStorage.getItem('dark-mode');
    if (darkModePreference !== null) {
        mode.value = darkModePreference === 'true' ? 'dark' : 'light';
    } else if (!mode.value) {
        mode.value = "light";
    }
});

const toggleTheme = () => {
    mode.value = mode.value === "dark" ? "light" : "dark";
    localStorage.setItem('dark-mode', mode.value === 'dark');
    localStorage.setItem('vueuse-color-scheme', mode.value);
};

const isDarkMode = computed(() => mode.value === 'dark');
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
        <div class="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div class="flex items-center gap-2 justify-between mb-6">
                <h1 class="text-xl font-bold text-gray-800 dark:text-white">
                    SIAKAD
                </h1>

                <button @click="toggleTheme"
                    class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                    <svg class="h-5 w-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path :d="isDarkMode ? mdiWeatherNight : mdiWhiteBalanceSunny" />
                    </svg>
                </button>
            </div>

            <h2 class="text-lg font-semibold text-center text-gray-700 dark:text-gray-200 mb-4">Forgot Password</h2>
            <p class="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
                Enter your email to reset your password.
            </p>

            <form @submit.prevent="forgetPassword">
                <div class="mb-4 space-y-1.5">
                    <label class="text-sm text-slate-800 dark:text-gray-400 font-bold">Email</label>
                    <input v-model="formModel.email" type="email" placeholder="Masukkan Email"
                        class="w-full bg-white dark:bg-gray-800 border border-slate-200 rounded-md py-2 px-2.5 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10 dark:focus:ring-slate-800/20 dark:border-gray-600 dark:text-gray-300"
                        required />
                    <div v-if="errorList?.email" class="text-red-500 text-xs">
                        <span v-for="(err, index) in errorList.email" :key="index">
                            {{ err }}
                        </span>
                    </div>
                </div>
                <Button type="submit" color="info" variant="solid" class="w-full flex justify-center items-center">
                    Reset Password
                </Button>
            </form>

            <div class="text-center text-sm mt-4">
                <router-link to="/login" class="text-primary dark:text-gray-200 hover:underline">
                    Back to Login
                </router-link>
            </div>
        </div>
    </div>

    <Toaster />
</template>
