<script setup>
import { useAuthStore } from "@/state/pinia";
import { mdiEye, mdiEyeOff, mdiWeatherNight, mdiWhiteBalanceSunny } from "@mdi/js";
import { useColorMode } from "@vueuse/core";
import { reactive, ref, computed, onMounted } from "vue";
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

const toggleTheme = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
  localStorage.setItem('dark-mode', mode.value === 'dark');
  localStorage.setItem('vueuse-color-scheme', mode.value);
};

const router = useRouter();
const authStore = useAuthStore();

const formModel = reactive({
  name: "",
  email: "",
  password: "",
  phone_number: "",
  wali: "",
  pekerjaan: "",
  birth_date: "",
  address: "",
  gender: "Laki-laki",
});

const errorList = reactive({
  name: null,
  email: null,
  password: null,
  phone_number: null,
  wali: null,
  pekerjaan: null,
  birth_date: null,
  address: null,
  gender: null,
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const register = async () => {
  const user = await authStore.register(formModel);

  if (user.data.status_code !== 200) {
    toast.error("Register Failed", {
      description: "Invalid credentials. Please check your input fields.",
      position: "bottom-right",
      duration: 3000,
      class: "bg-red-600 text-white border-none shadow-lg",
    });
  } else {
    toast.success("Register successful", {
      description: "You have registered successfully!",
      position: "bottom-right",
      duration: 3000,
      class: "bg-green-500 text-white border-none shadow-lg",
    });
    router.push("/login");
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
          <h1
            class="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-200 hover:shadow-lg hover:underline hover:underline-offset-4">
            SIAKAD
          </h1>
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
        Register your account</h2>

      <form @submit.prevent="register">
        <!-- Name field -->
        <div class="mb-4 space-y-1.5">
          <label for="name"
            class="text-sm text-slate-800 dark:text-gray-300 font-bold transition-colors duration-200">Name</label>
          <input id="name" v-model="formModel.name" type="text" placeholder="Masukkan Nama" class="w-full border border-slate-200 dark:border-gray-600 rounded-md py-2 px-2.5 text-sm shadow-sm 
                  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                  hover:border-slate-800 dark:hover:border-gray-500 
                  focus:border-slate-800 dark:focus:border-blue-500 
                  focus:ring focus:ring-slate-800/10 dark:focus:ring-blue-500/20
                  transition-colors duration-200" />
          <div v-if="errorList?.name" class="text-red-500 dark:text-red-400 text-xs transition-colors duration-200">
            <span v-for="(err, index) in errorList.name" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Email field -->
        <div class="mb-4 space-y-1.5">
          <label for="email"
            class="text-sm text-slate-800 dark:text-gray-300 font-bold transition-colors duration-200">Email</label>
          <input id="email" v-model="formModel.email" type="email" placeholder="Masukkan Email" class="w-full border border-slate-200 dark:border-gray-600 rounded-md py-2 px-2.5 text-sm shadow-sm 
                  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                  hover:border-slate-800 dark:hover:border-gray-500 
                  focus:border-slate-800 dark:focus:border-blue-500 
                  focus:ring focus:ring-slate-800/10 dark:focus:ring-blue-500/20
                  transition-colors duration-200" />
          <div v-if="errorList?.email" class="text-red-500 dark:text-red-400 text-xs transition-colors duration-200">
            <span v-for="(err, index) in errorList.email" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Wali field -->
        <div class="mb-4 space-y-1.5">
          <label for="wali"
            class="text-sm text-slate-800 dark:text-gray-300 font-bold transition-colors duration-200">Nama Wali</label>
          <input id="wali" v-model="formModel.wali" type="text" placeholder="Masukkan Nama Wali" class="w-full border border-slate-200 dark:border-gray-600 rounded-md py-2 px-2.5 text-sm shadow-sm 
                  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                  hover:border-slate-800 dark:hover:border-gray-500 
                  focus:border-slate-800 dark:focus:border-blue-500 
                  focus:ring focus:ring-slate-800/10 dark:focus:ring-blue-500/20
                  transition-colors duration-200" />
          <div v-if="errorList?.wali" class="text-red-500 dark:text-red-400 text-xs transition-colors duration-200">
            <span v-for="(err, index) in errorList.wali" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Pekerjaan field -->
        <div class="mb-4 space-y-1.5">
          <label for="pekerjaan"
            class="text-sm text-slate-800 dark:text-gray-300 font-bold transition-colors duration-200">Pekerjaan</label>
          <input id="pekerjaan" v-model="formModel.pekerjaan" type="text" placeholder="Masukkan Pekerjaan" class="w-full border border-slate-200 dark:border-gray-600 rounded-md py-2 px-2.5 text-sm shadow-sm 
                  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                  hover:border-slate-800 dark:hover:border-gray-500 
                  focus:border-slate-800 dark:focus:border-blue-500 
                  focus:ring focus:ring-slate-800/10 dark:focus:ring-blue-500/20
                  transition-colors duration-200" />
          <div v-if="errorList?.pekerjaan"
            class="text-red-500 dark:text-red-400 text-xs transition-colors duration-200">
            <span v-for="(err, index) in errorList.pekerjaan" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Birth Date field -->
        <div class="mb-4 space-y-1.5">
          <label for="birth_date"
            class="text-sm text-slate-800 dark:text-gray-300 font-bold transition-colors duration-200">Tanggal
            Lahir</label>
          <input id="birth_date" v-model="formModel.birth_date" type="date" class="w-full border border-slate-200 dark:border-gray-600 rounded-md py-2 px-2.5 text-sm shadow-sm 
                  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                  hover:border-slate-800 dark:hover:border-gray-500 
                  focus:border-slate-800 dark:focus:border-blue-500 
                  focus:ring focus:ring-slate-800/10 dark:focus:ring-blue-500/20
                  transition-colors duration-200" />
          <div v-if="errorList?.birth_date"
            class="text-red-500 dark:text-red-400 text-xs transition-colors duration-200">
            <span v-for="(err, index) in errorList.birth_date" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Address field -->
        <div class="mb-4 space-y-1.5">
          <label for="address"
            class="text-sm text-slate-800 dark:text-gray-300 font-bold transition-colors duration-200">Alamat</label>
          <textarea id="address" v-model="formModel.address" placeholder="Masukkan Alamat" class="w-full border border-slate-200 dark:border-gray-600 rounded-md py-2 px-2.5 text-sm shadow-sm 
                  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                  hover:border-slate-800 dark:hover:border-gray-500 
                  focus:border-slate-800 dark:focus:border-blue-500 
                  focus:ring focus:ring-slate-800/10 dark:focus:ring-blue-500/20
                  transition-colors duration-200"></textarea>
          <div v-if="errorList?.address" class="text-red-500 dark:text-red-400 text-xs transition-colors duration-200">
            <span v-for="(err, index) in errorList.address" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Gender field -->
        <div class="mb-4 space-y-1.5">
          <label class="text-sm text-slate-800 dark:text-gray-300 font-bold transition-colors duration-200">Jenis
            Kelamin</label>
          <div class="flex gap-4 mt-1">
            <label class="inline-flex items-center">
              <input type="radio" v-model="formModel.gender" value="Laki-laki"
                class="form-radio text-primary focus:border-slate-800 focus:ring focus:ring-slate-800/10 dark:bg-gray-700 dark:border-gray-600" />
              <span
                class="ml-2 text-sm text-gray-800 dark:text-gray-300 transition-colors duration-200">Laki-laki</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="formModel.gender" value="Perempuan"
                class="form-radio text-primary focus:border-slate-800 focus:ring focus:ring-slate-800/10 dark:bg-gray-700 dark:border-gray-600" />
              <span
                class="ml-2 text-sm text-gray-800 dark:text-gray-300 transition-colors duration-200">Perempuan</span>
            </label>
          </div>
          <div v-if="errorList?.gender" class="text-red-500 dark:text-red-400 text-xs transition-colors duration-200">
            <span v-for="(err, index) in errorList.gender" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Phone Number field -->
        <div class="mb-4 space-y-1.5">
          <label for="phone_number"
            class="text-sm text-slate-800 dark:text-gray-300 font-bold transition-colors duration-200">Phone
            Number</label>
          <input id="phone_number" v-model="formModel.phone_number" type="number" placeholder="Masukkan Nomor Telepon"
            class="w-full border border-slate-200 dark:border-gray-600 rounded-md py-2 px-2.5 text-sm shadow-sm 
                  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                  hover:border-slate-800 dark:hover:border-gray-500 
                  focus:border-slate-800 dark:focus:border-blue-500 
                  focus:ring focus:ring-slate-800/10 dark:focus:ring-blue-500/20
                  transition-colors duration-200" />
          <div v-if="errorList?.phone_number"
            class="text-red-500 dark:text-red-400 text-xs transition-colors duration-200">
            <span v-for="(err, index) in errorList.phone_number" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Password field -->
        <div class="mb-4 space-y-1.5">
          <label for="password"
            class="text-sm text-slate-800 dark:text-gray-300 font-bold transition-colors duration-200">Password</label>
          <div class="relative">
            <input id="password" v-model="formModel.password" :type="showPassword ? 'text' : 'password'"
              placeholder="Masukkan Password" class="w-full border border-slate-200 dark:border-gray-600 rounded-md py-2 px-2.5 text-sm shadow-sm 
                    bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                    hover:border-slate-800 dark:hover:border-gray-500 
                    focus:border-slate-800 dark:focus:border-blue-500 
                    focus:ring focus:ring-slate-800/10 dark:focus:ring-blue-500/20
                    transition-colors duration-200" />
            <button type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
              @click="togglePassword">
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path :d="showPassword ? mdiEyeOff : mdiEye" fill="currentColor" />
              </svg>
            </button>
          </div>
          <div v-if="errorList?.password" class="text-red-500 dark:text-red-400 text-xs transition-colors duration-200">
            <span v-for="(err, index) in errorList.password" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <Button type="submit" variant="solid" color="info" class="w-full mt-4 flex justify-center">
          Register
        </Button>

      </form>

      <div class="text-center text-sm mt-4 text-gray-700 dark:text-gray-300 transition-colors duration-200">
        Already have an account?
        <router-link to="/login" class="text-primary dark:text-gray-50 underline underline-offset-2">Login</router-link>
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