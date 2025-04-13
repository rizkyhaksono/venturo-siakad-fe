<script setup>
import Layout from "@/layouts/main.vue";
</script>

<template>
  <Layout>
    <div class="profile-container p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center mb-6">
        <div class="relative">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            class="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
          />
          <button class="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 text-white">
            <i class="fas fa-camera"></i>
          </button>
        </div>
        <div class="ml-6">
          <h1 class="text-2xl font-bold">Rizky Haksono</h1>
          <p class="text-gray-600">Administrator</p>
        </div>
      </div>

      <!-- Profile Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="profile-section">
          <h2 class="text-lg font-semibold mb-4">Personal Information</h2>
          <div class="space-y-4">
            <div class="flex flex-col">
              <label class="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                class="mt-1 p-2 border rounded-md"
              />
            </div>
            <div class="flex flex-col">
              <label class="text-sm text-gray-600">Email</label>
              <input
                type="email"
                class="mt-1 p-2 border rounded-md"
              />
            </div>
            <div class="flex flex-col">
              <label class="text-sm text-gray-600">Phone</label>
              <input
                type="tel"
                class="mt-1 p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h2 class="text-lg font-semibold mb-4">Account Settings</h2>
          <div class="space-y-4">
            <div class="flex flex-col">
              <label class="text-sm text-gray-600">Username</label>
              <input
                type="text"
                class="mt-1 p-2 border rounded-md"
              />
            </div>
            <div class="flex flex-col">
              <label class="text-sm text-gray-600">Password</label>
              <input
                type="password"
                class="mt-1 p-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
  </Layout>
</template>