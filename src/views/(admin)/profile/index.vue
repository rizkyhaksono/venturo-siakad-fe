<script setup>
import Layout from "@/layouts/main.vue";
import { useAuthStore } from "@/state/pinia";
import { onMounted } from "vue";

const authStore = useAuthStore();

const getProfile = async () => {
  await authStore.saveUserLogin();
}

onMounted(() => {
  getProfile();
})
</script>

<template>
  <Layout>
    <div class="profile-container p-4">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 p-6 transition-colors duration-200">
        <div class="flex flex-col md:flex-row items-center mb-6">
          <div class="relative">
            <img
              :src="(authStore.userLogin?.photo_url?.includes('localhost') ? '/default_photo.jpg' : authStore.userLogin?.photo_url || '/default_photo.jpg')"
              :alt="authStore.userLogin.name"
              class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700" />
            <button
              class="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 rounded-full p-2 text-white transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <div class="ml-0 md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
              {{ authStore.userLogin.name }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400 transition-colors duration-200">
              {{ authStore.userLogin.email }}
            </p>
          </div>
        </div>

        <!-- Profile Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="profile-section">
            <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 transition-colors duration-200">
              Personal Information
            </h2>
            <div class="space-y-4">
              <div class="flex flex-col">
                <label class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">ID</label>
                <input type="text"
                  class="mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                  :value="authStore.userLogin.id" readonly />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">Email</label>
                <input type="email"
                  class="mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                  :value="authStore.userLogin.email" />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">Phone</label>
                <input type="tel"
                  class="mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                  :value="authStore.userLogin.phone_number" />
              </div>
            </div>
          </div>

          <div class="profile-section">
            <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 transition-colors duration-200">
              Account Settings
            </h2>
            <div class="space-y-4">
              <div class="flex flex-col">
                <label class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">Username</label>
                <input type="text"
                  class="mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                  :value="authStore.userLogin.name" />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">User Role</label>
                <input type="text"
                  class="mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                  :value="authStore.userLogin.m_user_roles_id" readonly />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>