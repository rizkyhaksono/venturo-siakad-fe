<script setup>
import { useAuthStore } from "@/state/pinia";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { useColorMode } from "@vueuse/core";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Toaster, toast } from "vue-sonner";

const showPassword = ref(false);
const mode = useColorMode({
  emitAuto: false,
  modes: {
    light: "light",
    dark: "dark",
  },
});

if (!mode.value) {
  mode.value = "light";
}
const router = useRouter();
const authStore = useAuthStore();

const formModel = reactive({
  name: "",
  email: "",
  password: "",
  phone_number: "", // Updated from phone to phone_number to match API
  wali: "",
  pekerjaan: "",
  birth_date: "",
  address: "",
  gender: "Laki-laki", // Default value
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
      description: "You have registered.",
      position: "bottom-right",
      duration: 3000,
      class: "bg-green-500 text-white border-none shadow-lg",
    });
    router.push("/login");
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 p-6">
    <div class="w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <div class="flex items-center gap-2 justify-center mb-6">
        <h1 class="text-xl font-bold text-gray-800">Venturo.</h1>
      </div>
      <h2 class="text-lg font-semibold text-center text-gray-700 mb-4">Register your account</h2>
      <form @submit.prevent="register">
        <!-- Name field -->
        <div class="mb-4 space-y-1.5">
          <label for="name" class="text-sm text-slate-800 font-bold">Name</label>
          <input id="name" v-model="formModel.name" type="text" placeholder="Masukkan Nama"
            class="w-full border border-slate-200 rounded-md py-2 px-2.5 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10" />
          <div v-if="errorList?.name" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.name" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Email field -->
        <div class="mb-4 space-y-1.5">
          <label for="email" class="text-sm text-slate-800 font-bold">Email</label>
          <input id="email" v-model="formModel.email" type="email" placeholder="Masukkan Email"
            class="w-full border border-slate-200 rounded-md py-2 px-2.5 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10" />
          <div v-if="errorList?.email" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.email" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Wali field -->
        <div class="mb-4 space-y-1.5">
          <label for="wali" class="text-sm text-slate-800 font-bold">Nama Wali</label>
          <input id="wali" v-model="formModel.wali" type="text" placeholder="Masukkan Nama Wali"
            class="w-full border border-slate-200 rounded-md py-2 px-2.5 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10" />
          <div v-if="errorList?.wali" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.wali" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Pekerjaan field -->
        <div class="mb-4 space-y-1.5">
          <label for="pekerjaan" class="text-sm text-slate-800 font-bold">Pekerjaan</label>
          <input id="pekerjaan" v-model="formModel.pekerjaan" type="text" placeholder="Masukkan Pekerjaan"
            class="w-full border border-slate-200 rounded-md py-2 px-2.5 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10" />
          <div v-if="errorList?.pekerjaan" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.pekerjaan" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Birth Date field -->
        <div class="mb-4 space-y-1.5">
          <label for="birth_date" class="text-sm text-slate-800 font-bold">Tanggal Lahir</label>
          <input id="birth_date" v-model="formModel.birth_date" type="date"
            class="w-full border border-slate-200 rounded-md py-2 px-2.5 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10" />
          <div v-if="errorList?.birth_date" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.birth_date" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Address field -->
        <div class="mb-4 space-y-1.5">
          <label for="address" class="text-sm text-slate-800 font-bold">Alamat</label>
          <textarea id="address" v-model="formModel.address" placeholder="Masukkan Alamat"
            class="w-full border border-slate-200 rounded-md py-2 px-2.5 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10"></textarea>
          <div v-if="errorList?.address" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.address" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Gender field -->
        <div class="mb-4 space-y-1.5">
          <label class="text-sm text-slate-800 font-bold">Jenis Kelamin</label>
          <div class="flex gap-4 mt-1">
            <label class="inline-flex items-center">
              <input type="radio" v-model="formModel.gender" value="Laki-laki"
                class="form-radio text-primary focus:border-slate-800 focus:ring focus:ring-slate-800/10" />
              <span class="ml-2 text-sm">Laki-laki</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="formModel.gender" value="Perempuan"
                class="form-radio text-primary focus:border-slate-800 focus:ring focus:ring-slate-800/10" />
              <span class="ml-2 text-sm">Perempuan</span>
            </label>
          </div>
          <div v-if="errorList?.gender" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.gender" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Phone Number field -->
        <div class="mb-4 space-y-1.5">
          <label for="phone_number" class="text-sm text-slate-800 font-bold">Phone Number</label>
          <input id="phone_number" v-model="formModel.phone_number" type="number" placeholder="Masukkan Nomor Telepon"
            class="w-full border border-slate-200 rounded-md py-2 px-2.5 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10" />
          <div v-if="errorList?.phone_number" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.phone_number" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <!-- Password field -->
        <div class="mb-4 space-y-1.5">
          <label for="password" class="text-sm text-slate-800 font-bold">Password</label>
          <div class="relative">
            <input id="password" v-model="formModel.password" :type="showPassword ? 'text' : 'password'"
              placeholder="Masukkan Password"
              class="w-full border border-slate-200 rounded-md py-2 px-2.5 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10" />
            <button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              @click="togglePassword">
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path :d="showPassword ? mdiEyeOff : mdiEye" fill="currentColor" />
              </svg>
            </button>
          </div>
          <div v-if="errorList?.password" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.password" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

        <button type="submit" class="w-full bg-primary text-white font-bold py-2 rounded-md mt-4">
          Register
        </button>
      </form>

      <div class="text-center text-sm mt-4">
        Already have an account?
        <router-link to="/login" class="text-primary hover:underline">Login</router-link>
      </div>

      <div class="text-center text-xs text-gray-500 mt-6">
        By clicking continue, you agree to our
        <a href="#" class="underline">Terms of Service</a> and
        <a href="#" class="underline">Privacy Policy</a>.
      </div>
    </div>
  </div>

  <Toaster />
</template>