<script setup>
import { useAuthStore } from "@/state/pinia";
import { computed, reactive, onMounted, ref } from "vue";
import { mdiWeatherNight, mdiWhiteBalanceSunny, mdiEye, mdiEyeOff } from "@mdi/js";
import { useRouter } from "vue-router";
import { useColorMode } from "@vueuse/core";
import { Toaster, toast } from "vue-sonner";

const router = useRouter();
const authStore = useAuthStore();
const statusCode = computed(() => authStore.response.status);
const isLoading = ref(false);

const formModel = reactive({
  token: "",
  email: "",
  password: "",
});

const errorList = reactive({
  token: null,
  email: null,
  password: null,
  password_confirmation: null,
});

const showPassword = ref(false);

const reset = async () => {
  if (isLoading.value) return;

  Object.keys(errorList).forEach(key => {
    errorList[key] = null;
  });

  if (!formModel.token) {
    errorList.token = ["Reset token is required"];
    toast.error("Invalid Request", {
      description: "Reset token is missing. Please use the link from your email.",
      position: "bottom-right",
      duration: 3000,
      class: "bg-red-600 text-white border-none shadow-lg",
    });
    return;
  }

  if (!formModel.email) {
    errorList.email = ["Email is required"];
    return;
  }

  if (!formModel.password) {
    errorList.password = ["New password is required"];
    return;
  }

  if (formModel.password.length < 8) {
    errorList.password = ["Password must be at least 8 characters long"];
    return;
  }

  isLoading.value = true;

  try {
    await authStore.resetPassword({
      token: formModel.token,
      email: formModel.email,
      password: formModel.password,
    });

    if (statusCode.value === 200) {
      toast.success("Password Reset Successful", {
        description: "Your password has been reset successfully. You can now login with your new password.",
        position: "bottom-right",
        duration: 5000,
        class: "bg-green-500 text-white border-none shadow-lg",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  } catch (error) {
    toast.error("Something went wrong", {
      description: error.response?.data?.message ?? "An unexpected error occurred. Please try again later.",
      position: "bottom-right",
      duration: 3000,
      class: "bg-red-600 text-white border-none shadow-lg",
    });
  } finally {
    isLoading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
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

const isDarkMode = computed(() => mode.value === "dark");
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

      <h2 class="text-lg font-semibold text-center text-gray-700 dark:text-gray-200 mb-4">Reset Password</h2>
      <p class="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
        Enter your new password to complete the reset process.
      </p>

      <form @submit.prevent="reset">
        <!-- Token -->
        <div class="mb-4 space-y-1.5">
          <label class="text-sm text-slate-800 dark:text-gray-400 font-bold">Token</label>
          <input v-model="formModel.token" type='token' placeholder="Enter your token (from your email)"
            class="w-full bg-white dark:bg-gray-800 border border-slate-200 rounded-md py-2 px-2.5 pr-10 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10 dark:focus:ring-slate-800/20 dark:border-gray-600 dark:text-gray-300"
            required minlength="8" />
          <div v-if="errorList?.token" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.token" :key="index" class="block">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Email -->
        <div class="mb-4 space-y-1.5">
          <label class="text-sm text-slate-800 dark:text-gray-400 font-bold">Email</label>
          <div class="relative">
            <input v-model="formModel.email" type='email' placeholder="Enter your email"
              class="w-full bg-white dark:bg-gray-800 border border-slate-200 rounded-md py-2 px-2.5 pr-10 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10 dark:focus:ring-slate-800/20 dark:border-gray-600 dark:text-gray-300"
              required minlength="8" />
          </div>
          <div v-if="errorList?.email" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.email" :key="index" class="block">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- New Password -->
        <div class="mb-4 space-y-1.5">
          <label class="text-sm text-slate-800 dark:text-gray-400 font-bold">New Password</label>
          <div class="relative">
            <input v-model="formModel.password" :type="showPassword.password ? 'text' : 'password'"
              placeholder="Enter new password (min. 8 characters)"
              class="w-full bg-white dark:bg-gray-800 border border-slate-200 rounded-md py-2 px-2.5 pr-10 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10 dark:focus:ring-slate-800/20 dark:border-gray-600 dark:text-gray-300"
              required minlength="8" />
            <button type="button" @click="togglePasswordVisibility('password')"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path :d="showPassword.password ? mdiEyeOff : mdiEye" />
              </svg>
            </button>
          </div>
          <div v-if="errorList?.password" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.password" :key="index" class="block">
              {{ err }}
            </span>
          </div>
        </div>

        <button type="submit" :disabled="isLoading || !formModel.token || !formModel.email"
          class="w-full bg-info hover:bg-primary/90 disabled:bg-gray-900/70 disabled:text-gray-200/40 dark:disabled:bg-gray-900/30 dark:disabled:text-gray-400/30 disabled:cursor-not-allowed text-white font-bold py-2 rounded-md transition-colors duration-200 text-sm">
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            Resetting Password...
          </span>
          <span v-else>Reset Password</span>
        </button>
      </form>

      <div class="text-center text-sm mt-4 space-y-2">
        <router-link to="/login" class="text-primary dark:text-gray-200 hover:underline block">
          Back to Login
        </router-link>
        <router-link to="/forgot-password" class="text-gray-500 dark:text-gray-400 hover:underline block">
          Request New Reset Link
        </router-link>
      </div>
    </div>
  </div>

  <Toaster />
</template>