<script setup>
import { ref, onMounted, computed } from 'vue';
import { useColorMode } from '@vueuse/core';
import {
  mdiWeatherNight,
  mdiWhiteBalanceSunny
} from "@mdi/js";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const mode = useColorMode({
  attribute: 'class',
  modes: {
    light: '',
    dark: 'dark',
  },
});

const isDarkMode = computed(() => mode.value === 'dark');

const toggleTheme = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
  localStorage.setItem('dark-mode', mode.value === 'dark');
};

onMounted(() => {
  const darkModePreference = localStorage.getItem('dark-mode');
  if (darkModePreference !== null) {
    mode.value = darkModePreference === 'true' ? 'dark' : 'light';
  }
});

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  const navMenu = document.getElementById('mobile-menu');
  const navButton = document.getElementById('mobile-menu-button');
  
  if (isMenuOpen.value && navMenu && !navMenu.contains(event.target) && !navButton.contains(event.target)) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
});
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200 fixed top-0 left-0 w-full z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Left side - Logo and navigation links -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link to="/" class="flex items-center">
              <img src="https://natee.my.id/favicon.ico" class="size-8" alt="SIAKAD">
              <span class="ml-2 text-xl font-bold text-gray-800 dark:text-white">SIAKAD SD</span>
            </router-link>
          </div>
          
          <!-- Desktop navigation menu -->
          <div class="hidden md:block ml-10">
            <div class="flex items-center space-x-6">
              <router-link to="/" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-2 py-1 text-sm font-medium">Beranda</router-link>
              <router-link to="/feature" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-2 py-1 text-sm font-medium">Fitur</router-link>
              <router-link to="/about" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-2 py-1 text-sm font-medium">Tentang</router-link>
              <router-link to="/contact" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-2 py-1 text-sm font-medium">Kontak</router-link>
            </div>
          </div>
        </div>
        
        <!-- Right side - Login button and dark mode toggle -->
        <div class="flex items-center space-x-3">
          <!-- Dark mode toggle -->
          <button @click="toggleTheme" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            <svg class="h-5 w-5 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
              <path :d="isDarkMode ? mdiWeatherNight : mdiWhiteBalanceSunny" />
            </svg>
          </button>
          
          <!-- Login button -->
          <router-link to="/login" class="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Login
          </router-link>
          
          <!-- Mobile menu button -->
          <button id="mobile-menu-button" @click="toggleMenu" class="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" v-show="isMenuOpen" class="md:hidden bg-white dark:bg-gray-800 transition-all duration-200">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link to="/" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium">Beranda</router-link>
        <router-link to="/feature" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium">Fitur</router-link>
        <router-link to="/about" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium">Tentang</router-link>
        <router-link to="/contact" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium">Kontak</router-link>
        <router-link to="/login" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium">Login</router-link>
      </div>
    </div>
  </nav>
  
  <!-- Spacer to prevent content from being hidden under fixed navbar -->
  <div class="h-16"></div>
</template>