<script setup>
import Layout from "@/layouts/main.vue";
import { ref, inject } from "vue";

const isDarkMode = inject('isDarkMode', ref(false));
const toggleTheme = inject('toggleTheme', () => { });

const settings = ref({
  siteName: "SIAKAD Venturo",
  email: "admin@siakad.venturo.com",
  maintenanceMode: false,
  notifications: {
    email: true,
    browser: true,
    mobile: false
  },
  language: "id",
  timezone: "Asia/Jakarta"
});

const saveSettings = () => {
  alert("Settings saved successfully!");
};
</script>

<template>
  <Layout>
    <div class="settings-container p-6">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Settings</h1>
        <p class="text-gray-600 dark:text-gray-400">Manage your application preferences and configurations</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900 overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Settings Menu</h2>
            </div>
            <nav class="p-2">
              <a href="#general"
                class="flex items-center px-4 py-3 rounded-md text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                General
              </a>
              <a href="#appearance"
                class="flex items-center px-4 py-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Appearance
              </a>
              <a href="#notifications"
                class="flex items-center px-4 py-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notifications
              </a>
              <a href="#security"
                class="flex items-center px-4 py-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Security
              </a>
            </nav>
          </div>
        </div>

        <!-- Main Settings Area -->
        <div class="md:col-span-2">
          <!-- General Settings Panel -->
          <div id="general"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900 overflow-hidden mb-6">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white">General Settings</h2>
              </div>
            </div>

            <div class="p-6 space-y-6">
              <!-- Site Name Setting -->
              <div class="form-control">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Name</label>
                <input type="text" v-model="settings.siteName"
                  class="w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                  placeholder="Enter site name">
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">This name will appear throughout the
                  application</p>
              </div>

              <!-- Email Setting -->
              <div class="form-control">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Email</label>
                <input type="email" v-model="settings.email"
                  class="w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                  placeholder="Enter contact email">
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Used for system notifications and user support
                </p>
              </div>

              <!-- Regional Settings -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                  <select v-model="settings.language"
                    class="w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200">
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div class="form-control">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                  <select v-model="settings.timezone"
                    class="w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200">
                    <option value="Asia/Jakarta">Asia/Jakarta (GMT+7)</option>
                    <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                  </select>
                </div>
              </div>

              <!-- Maintenance Mode Setting -->
              <div class="form-control">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Maintenance Mode</h3>
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Temporarily disable access to the
                      application</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.maintenanceMode" class="sr-only peer">
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Appearance Settings Panel -->
          <div id="appearance"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900 overflow-hidden mb-6">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Appearance</h2>
              </div>
            </div>

            <div class="p-6">
              <!-- Theme Setting -->
              <div class="form-control">
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</h3>
                <div class="flex items-center space-x-4 mt-2">
                  <button @click="toggleTheme()" class="flex flex-col items-center">
                    <div
                      :class="['w-16 h-10 rounded-md border-2 transition-all', isDarkMode ? 'border-blue-500 bg-gray-800' : 'border-gray-300 bg-white']">
                      <div class="m-1 w-5 h-5 rounded-full bg-gray-300"></div>
                    </div>
                    <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">Light</span>
                  </button>

                  <button @click="toggleTheme()" class="flex flex-col items-center">
                    <div
                      :class="['w-16 h-10 rounded-md border-2 transition-all', isDarkMode ? 'border-blue-500 bg-gray-800' : 'border-gray-300 bg-gray-700']">
                      <div class="m-1 ml-auto w-5 h-5 rounded-full bg-white"></div>
                    </div>
                    <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">Dark</span>
                  </button>

                  <button class="flex flex-col items-center">
                    <div
                      class="w-16 h-10 rounded-md border-2 border-gray-300 dark:border-gray-600 bg-gradient-to-r from-white to-gray-700">
                      <div class="m-1 mx-auto w-5 h-5 rounded-full bg-gray-400"></div>
                    </div>
                    <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">System</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Notifications Settings Panel -->
          <div id="notifications"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900 overflow-hidden">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Notifications</h2>
              </div>
            </div>

            <div class="p-6 space-y-4">
              <div class="form-control">
                <div class="flex items-center justify-between py-2">
                  <div>
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Receive system notifications via email</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.notifications.email" class="sr-only peer">
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                  </label>
                </div>

                <div class="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Browser Notifications</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Show notifications in your browser</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.notifications.browser" class="sr-only peer">
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                  </label>
                </div>

                <div class="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Notifications</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Receive push notifications on mobile devices</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.notifications.mobile" class="sr-only peer">
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="mt-6 flex justify-end">
            <button @click="saveSettings"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>