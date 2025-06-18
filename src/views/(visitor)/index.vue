<script setup>
import Navbar from '@/components/layouts/Navbar.vue';
import Footer from '@/components/layouts/Footer.vue';
import { ref } from 'vue';

// Featured modules data
const featuredModules = ref([
  {
    title: 'Manajemen Siswa',
    description: 'Kelola data siswa dengan mudah termasuk data pribadi, akademik, dan kehadiran',
    icon: 'user-group',
    color: 'bg-blue-500 dark:bg-blue-600'
  },
  {
    title: 'Akademik',
    description: 'Sistem penilaian, jadwal pelajaran, dan kurikulum yang terintegrasi secara digital',
    icon: 'academic-cap',
    color: 'bg-green-500 dark:bg-green-600'
  },
  {
    title: 'Laporan dan Analitik',
    description: 'Pantau perkembangan akademik dengan laporan real-time dan visualisasi data',
    icon: 'chart-bar',
    color: 'bg-purple-500 dark:bg-purple-600'
  }
]);

// Quick access links
const quickLinks = ref([
  {
    title: 'Login Sistem',
    description: 'Akses ke dashboard sesuai peran Anda',
    icon: 'lock-closed',
    link: '/login'
  },
  {
    title: 'Panduan Pengguna',
    description: 'Lihat tutorial penggunaan sistem',
    icon: 'book-open',
    link: '#'
  },
  {
    title: 'FAQ',
    description: 'Pertanyaan yang sering diajukan',
    icon: 'question-mark-circle',
    link: '/contact'
  }
]);

// Testimonial data
const testimonials = ref([
  {
    content: "SIAKAD sangat membantu administrasi sekolah kami menjadi lebih efisien dan terorganisir. Pengelolaan data siswa dan guru menjadi lebih mudah.",
    name: "Budi Santoso",
    role: "Kepala Sekolah SD Maju Bersama",
    color: "border-blue-500 dark:border-blue-400"
  },
  {
    content: "Sebagai guru, saya terbantu dalam menginput nilai dan melihat perkembangan siswa. Pembuatan laporan juga menjadi lebih cepat dan akurat.",
    name: "Siti Rahma",
    role: "Guru Kelas 4 SD Cendekia",
    color: "border-green-500 dark:border-green-400"
  }
]);

// Stats data
const stats = ref([
  { value: '500+', label: 'Sekolah' },
  { value: '100K+', label: 'Siswa' },
  { value: '10K+', label: 'Guru' },
  { value: '34', label: 'Provinsi' }
]);
</script>

<template>
  <div class="landing-page font-sans bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <Navbar />

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Sistem Informasi Akademik untuk Sekolah Dasar
            </h1>
            <p class="text-xl mb-8 opacity-90 leading-relaxed max-w-lg">
              Solusi digital terpadu untuk pengelolaan administrasi sekolah, pembelajaran, dan komunikasi dengan orang
              tua
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="/feature"
                class="bg-white text-blue-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
                Lihat Fitur
              </a>
              <a href="/contact"
                class="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition duration-300 ease-in-out inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
                Hubungi Kami
              </a>
            </div>
          </div>
          <div class="md:w-1/2 relative">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-white/20">
              <div class="rounded-lg overflow-hidden mb-4">
                <img src="https://placehold.co/600x400/2563EB/FFFFFF/png?text=SIAKAD+SD&font=montserrat"
                  alt="SIAKAD Preview" class="w-full object-cover rounded-lg shadow-inner">
              </div>
              <div class="flex justify-between">
                <div class="flex items-center space-x-1">
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  <span class="text-sm">Online</span>
                </div>
                <div class="bg-white/20 rounded-full px-3 py-1 text-sm">
                  Versi 2.5
                </div>
              </div>
            </div>
            <div class="absolute -bottom-4 -right-4 h-24 w-24 bg-yellow-500/20 rounded-full blur-xl"></div>
            <div class="absolute -top-4 -left-4 h-32 w-32 bg-blue-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Preview Section -->
    <section class="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Fitur Unggulan</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            SIAKAD menyediakan berbagai modul terintegrasi untuk memudahkan pengelolaan administrasi dan kegiatan
            akademik
            di sekolah dasar.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in featuredModules" :key="feature.title"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div
              :class="`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white transform hover:scale-110 transition-transform duration-300`">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-8 h-8">
                <path v-if="feature.icon === 'user-group'" stroke-linecap="round" stroke-linejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.479m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                <path v-else-if="feature.icon === 'academic-cap'" stroke-linecap="round" stroke-linejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                <path v-else-if="feature.icon === 'chart-bar'" stroke-linecap="round" stroke-linejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
            <a href="/feature" class="inline-flex items-center mt-4 text-blue-600 dark:text-blue-400 hover:underline">
              Selengkapnya
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4 ml-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </div>
        </div>

        <div class="text-center mt-12">
          <a href="/feature"
            class="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition duration-300">
            Lihat Semua Fitur
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-blue-600 dark:bg-blue-700 text-white transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label" class="p-4">
            <div class="text-4xl md:text-5xl font-bold mb-2">{{ stat.value }}</div>
            <div class="text-lg opacity-80">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Access Section -->
    <section class="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Akses Cepat</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Akses berbagai layanan dan informasi SIAKAD sesuai kebutuhan Anda
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="link in quickLinks" :key="link.title"
            class="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div class="flex items-center mb-4">
              <div class="bg-blue-100 dark:bg-blue-800 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 text-blue-600 dark:text-blue-300">
                  <path v-if="link.icon === 'lock-closed'" stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  <path v-else-if="link.icon === 'book-open'" stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  <path v-else-if="link.icon === 'question-mark-circle'" stroke-linecap="round" stroke-linejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ link.title }}</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ link.description }}</p>
            <a :href="link.link" class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              Akses
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4 ml-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Testimoni Pengguna</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Pengalaman para pengguna yang telah mengimplementasikan SIAKAD di institusi mereka
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(testimonial, index) in testimonials" :key="index"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 hover:shadow-xl transition-shadow duration-300"
            :class="testimonial.color">
            <div class="relative">
              <svg
                class="absolute top-0 left-0 transform -translate-x-4 -translate-y-6 w-10 h-10 text-gray-200 dark:text-gray-700"
                fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path
                  d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p class="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10 pl-4">
                "{{ testimonial.content }}"
              </p>
            </div>
            <div class="flex items-center">
              <div
                class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold">
                {{ testimonial.name.charAt(0) }}
              </div>
              <div class="ml-4">
                <h5 class="font-semibold text-gray-800 dark:text-gray-200">{{ testimonial.name }}</h5>
                <p class="text-gray-500 dark:text-gray-400 text-sm">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <a href="/feature#testimonials"
            class="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
            Lihat lebih banyak testimoni
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-4 h-4 ml-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- About Preview Section -->
    <section class="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <div class="lg:w-1/2">
            <div class="relative">
              <div class="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full z-0"></div>
              <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-green-100 dark:bg-green-900 rounded-full z-0">
              </div>
              <div
                class="relative z-10 rounded-lg overflow-hidden shadow-xl h-80 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <!-- School illustration -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                  stroke="currentColor" class="w-32 h-32 text-blue-500 dark:text-blue-400">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="lg:w-1/2">
            <h2 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Tentang SIAKAD</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
              SIAKAD adalah sistem informasi akademik yang dirancang khusus untuk memenuhi kebutuhan pengelolaan
              data dan kegiatan akademik di sekolah dasar secara digital dan terintegrasi.
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Dikembangkan dengan fokus pada kebutuhan spesifik sekolah dasar di Indonesia, SIAKAD hadir untuk
              mentransformasi proses administratif menjadi lebih efisien, transparan, dan modern.
            </p>
            <a href="/about"
              class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center">
              Pelajari Lebih Lanjut
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5 ml-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 md:py-20 bg-blue-600 dark:bg-blue-700 text-white transition-colors duration-300">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Siap Memulai dengan SIAKAD?</h2>
        <p class="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
          Hubungi kami untuk konsultasi atau demo gratis dan lihat bagaimana SIAKAD dapat membantu sekolah Anda
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact"
            class="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            Hubungi Kami
          </a>
          <a href="#"
            class="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Lihat Demo
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
/* Transitions for dark mode */
.transition-colors {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.transition-transform {
  transition: transform 0.3s ease;
}

.landing-page {
  scroll-behavior: smooth;
}
</style>