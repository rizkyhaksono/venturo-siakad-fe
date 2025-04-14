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
  phone: "",
});

const errorList = reactive({
  email: null,
  password: null,
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const register = async () => {
  const user = await authStore.register(formModel);

  if (user.data.status_code !== 200) {
    toast.error("Register Failed", {
      description: "Invalid credentials. Please check your email and password.",
      position: "bottom-right",
      duration: 3000,
      class: "bg-red-600 text-white border-none shadow-lg",
    });
  } else {
    toast.success("Register successfull", {
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

        <div class="mb-4 space-y-1.5">
          <label for="phone" class="text-sm text-slate-800 font-bold">Phone Number</label>
          <input id="phone" v-model="formModel.phone" type="text" placeholder="Masukkan Nomor Telepon"
            class="w-full border border-slate-200 rounded-md py-2 px-2.5 text-sm shadow-sm hover:border-slate-800 focus:border-slate-800 focus:ring focus:ring-slate-800/10" />
          <div v-if="errorList?.phone" class="text-red-500 text-xs">
            <span v-for="(err, index) in errorList.phone" :key="index">
              {{ err }}
            </span>
          </div>
        </div>

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