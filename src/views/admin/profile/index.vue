<script setup>
import Layout from "@/layouts/main.vue";
import { useAuthStore } from "@/state/pinia";
import { onMounted } from "vue";

const authStore = useAuthStore();

const getProfile = async () => {
  await authStore.saveUserLogin();
  console.log(authStore.userLogin);
}

onMounted(() => {
  getProfile();
})
</script>

<template>
  <Layout>
    <div class="profile-container p-4">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center mb-6">
          <div class="relative">
            <img
              :src="(authStore.userLogin?.photo_url === 'http://localhost/storage/../assets/img/no-image.png' ? '/src/assets/default_photo.jpg' : authStore.userLogin?.photo_url)"
              :alt="authStore.userLogin.name" class="w-24 h-24 rounded-full object-cover border-4 border-gray-200" />
            <button class="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 text-white">
              <i class="fas fa-camera"></i>
            </button>
          </div>
          <div class="ml-6">
            <h1 class="text-2xl font-bold">{{ authStore.userLogin.name }}</h1>
            <p class="text-gray-600">{{ authStore.userLogin.email }}</p>
          </div>
        </div>

        <!-- Profile Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="profile-section">
            <h2 class="text-lg font-semibold mb-4">Personal Information</h2>
            <div class="space-y-4">
              <div class="flex flex-col">
                <label class="text-sm text-gray-600">ID</label>
                <input type="text" class="mt-1 p-2 border rounded-md" :value="authStore.userLogin.id" />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-gray-600">Email</label>
                <input type="email" class="mt-1 p-2 border rounded-md" :value="authStore.userLogin.email" />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-gray-600">Phone</label>
                <input type="tel" class="mt-1 p-2 border rounded-md" :value="authStore.userLogin.phone_number" />
              </div>
            </div>
          </div>

          <div class="profile-section">
            <h2 class="text-lg font-semibold mb-4">Account Settings</h2>
            <div class="space-y-4">
              <div class="flex flex-col">
                <label class="text-sm text-gray-600">Username</label>
                <input type="text" class="mt-1 p-2 border rounded-md" :value="authStore.userLogin.name" />
              </div>
              <div class="flex flex-col">
                <label class="text-sm text-gray-600">User Roles ID</label>
                <input type="text" class="mt-1 p-2 border rounded-md" :value="authStore.userLogin.m_user_roles_id" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>