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
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="flex items-center mb-6">
          <div class="relative">
            <img
              :src="(authStore.userLogin?.photo_url?.includes('localhost') ? '/default_photo.jpg' : authStore.userLogin?.photo_url || '/default_photo.jpg')"
              :alt="authStore.userLogin.name"
              class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700" />
            <button
              class="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-full p-2 text-white">
              <i class="fas fa-camera"></i>
            </button>
          </div>
          <div class="ml-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ authStore.userLogin.name }}</h1>
            <p class="text-gray-600 dark:text-gray-300">{{ authStore.userLogin.email }}</p>
          </div>
        </div>

        <!-- Profile Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="profile-section">
            <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Personal Information</h2>
            <div class="space-y-4">
              <div class="flex flex-col">
                <label class="text-sm text-gray-600 dark:text-gray-400">ID</label>
                <input type="text"
                  class="mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  :value="authStore.userLogin.id" />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-gray-600 dark:text-gray-400">Email</label>
                <input type="email"
                  class="mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  :value="authStore.userLogin.email" />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-gray-600 dark:text-gray-400">Phone</label>
                <input type="tel"
                  class="mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  :value="authStore.userLogin.phone_number" />
              </div>
            </div>
          </div>

          <div class="profile-section">
            <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Account Settings</h2>
            <div class="space-y-4">
              <div class="flex flex-col">
                <label class="text-sm text-gray-600 dark:text-gray-400">Username</label>
                <input type="text"
                  class="mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  :value="authStore.userLogin.name" />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-gray-600 dark:text-gray-400">User Roles ID</label>
                <input type="text"
                  class="mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                  :value="authStore.userLogin.m_user_roles_id" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>