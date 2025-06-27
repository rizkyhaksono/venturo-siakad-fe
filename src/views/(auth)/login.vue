<script setup>
import { useAuthStore } from "@/state/pinia";
import { mdiEye, mdiEyeOff, mdiWeatherNight, mdiWhiteBalanceSunny } from "@mdi/js";
import { useColorMode } from "@vueuse/core";
import { computed, reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Toaster, toast } from "vue-sonner";
import Button from "@/components/widgets/Button.vue";

const showPassword = ref(false);
const mode = useColorMode({
    attribute: 'class',
    modes: {
        light: '',
        dark: 'dark',
    },
});

const isDarkMode = computed(() => mode.value === 'dark');

onMounted(() => {
    const darkModePreference = localStorage.getItem('dark-mode');
    if (darkModePreference !== null) {
        mode.value = darkModePreference === 'true' ? 'dark' : 'light';
    } else if (!mode.value) {
        mode.value = "light";
    }
});

const router = useRouter();
const authStore = useAuthStore();
const statusCode = computed(() => authStore.response.status);

const formModel = reactive({
    email: "",
    password: "",
});

const errorList = reactive({
    email: null,
    password: null,
});

const toggleTheme = () => {
    mode.value = mode.value === "dark" ? "light" : "dark";
    localStorage.setItem('dark-mode', mode.value === 'dark');
    localStorage.setItem('vueuse-color-scheme', mode.value);
};

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const handleErrorMessage = (error) => {
    if (typeof error === 'object' && (error.email || error.password)) {
        const messages = [];
        if (error.email) messages.push(...error.email);
        if (error.password) messages.push(...error.password);
        return messages.join('\n');
    }

    if (Array.isArray(error)) {
        return error[0];
    }

    if (typeof error === 'string') {
        return error;
    }

    return "Invalid credentials. Please check your email and password.";
};

const login = async () => {
    const user = await authStore.login(formModel);

    if (statusCode.value !== 200) {
        toast.error("Login Failed", {
            description: handleErrorMessage(authStore.response.error),
            position: "bottom-right",
            duration: 3000,
            class: "bg-red-600 text-white border-none shadow-lg",
        });
    } else {
        toast.success("Welcome Back!", {
            description: "You have successfully logged in.",
            position: "bottom-right",
            duration: 3000,
            class: "bg-green-500 text-white border-none shadow-lg",
        });
        setTimeout(function () {
            if (user.role === "Student") {
                router.push("/student/dashboard");
            }
            if (user.role === "Admin") {
                router.push("/admin/dashboard");
            }
            if (user.role === "Teacher") {
                router.push("/teacher/dashboard");
            }
        }, 1000);
    }
};
</script>

<template>
    <div
        class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-200">
        <div
            class="w-full max-w-md bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900 rounded-lg p-6 transition-colors duration-200">
            <div class="flex items-center justify-between mb-6">
                <router-link to="/">
                    <div class="flex items-center gap-2">
                        <h1
                            class="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-200 hover:shadow-lg hover:underline hover:underline-offset-4">
                            SIAKAD
                        </h1>
                    </div>
                </router-link>
                <button @click="toggleTheme"
                    class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                    <svg class="h-5 w-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path :d="isDarkMode ? mdiWeatherNight : mdiWhiteBalanceSunny" />
                    </svg>
                </button>
            </div>

            <h2
                class="text-lg font-semibold text-center text-gray-700 dark:text-gray-200 mb-4 transition-colors duration-200">
                Welcome back
            </h2>

            <form @submit.prevent="login">
                <div class="mb-4 space-y-1.5">
                    <label
                        class="text-sm text-slate-800 dark:text-gray-300 font-bold transition-colors duration-200">Email</label>
                    <input v-model="formModel.email" type="email" placeholder="Masukkan Email"
                        class="w-full border border-slate-200 dark:border-gray-600 rounded-md py-2 px-2.5 text-sm shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:border-slate-800 dark:hover:border-gray-500 focus:border-slate-800 dark:focus:border-gray-500 focus:ring focus:ring-slate-800/10 dark:focus:ring-gray-500/20transition-colors duration-200" />
                    <div v-if="errorList?.email"
                        class="text-red-500 dark:text-red-400 text-xs transition-colors duration-200">
                        <span v-for="(err, index) in errorList.email" :key="index">
                            {{ err }}
                        </span>
                    </div>
                </div>

                <div class="mb-4 space-y-1.5">
                    <label
                        class="text-sm text-slate-800 dark:text-gray-300 font-bold transition-colors duration-200">Password</label>
                    <div class="relative">
                        <input v-model="formModel.password" :type="showPassword ? 'text' : 'password'"
                            placeholder="Masukkan Password"
                            class="w-full border border-slate-200 dark:border-gray-600 rounded-md py-2 px-2.5 text-sm shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:border-slate-800 dark:hover:border-gray-500 focus:border-slate-800 dark:focus:border-gray-500 focus:ring focus:ring-slate-800/10 dark:focus:ring-gray-500/20 transition-colors duration-200" />
                        <button type="button"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                            @click="togglePassword">
                            <svg class="h-5 w-5" viewBox="0 0 24 24">
                                <path :d="showPassword ? mdiEyeOff : mdiEye" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                    <div v-if="errorList?.password"
                        class="text-red-500 dark:text-red-400 text-xs transition-colors duration-200">
                        <span v-for="(err, index) in errorList.password" :key="index">
                            {{ err }}
                        </span>
                    </div>
                </div>

                <div class="flex items-center justify-between text-sm">
                    <router-link to="/forgot-password"
                        class="text-primary dark:text-gray-200 hover:underline hover:underline-offset-4 transition-colors duration-200">
                        Forgot Password?
                    </router-link>
                </div>

                <Button type="submit" variant="solid" color="info" class="w-full mt-4 flex justify-center">
                    Login
                </Button>
            </form>

            <div class="text-center text-sm mt-4 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                Don't have an account?
                <router-link to="/register" class="text-primary dark:text-gray-50 underline underline-offset-2">
                    Register
                </router-link>
            </div>

            <div class="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 transition-colors duration-200">
                By clicking continue, you agree to our
                <a href="#" class="underline">Terms of Service</a> and
                <a href="#" class="underline">Privacy Policy</a>.
            </div>
        </div>
    </div>

    <Toaster />
</template>