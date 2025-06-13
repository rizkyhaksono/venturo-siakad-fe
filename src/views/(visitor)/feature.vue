<script setup>
import Navbar from "@/components/layouts/Navbar.vue";
import { ref } from 'vue';

// Feature data
const features = ref([
  {
    id: 1,
    title: "Manajemen Siswa",
    description: "Mengelola data siswa termasuk biodata, riwayat akademik, dan kehadiran",
    icon: "user-group",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Manajemen Guru",
    description: "Mengelola data guru, jadwal mengajar, dan beban kerja",
    icon: "academic-cap",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Penilaian",
    description: "Pencatatan nilai tugas, ujian, dan rapor digital",
    icon: "clipboard-document-check",
    color: "bg-cyan-500"
  },
  {
    id: 4,
    title: "Kehadiran",
    description: "Monitoring kehadiran siswa dan guru",
    icon: "calendar",
    color: "bg-amber-500"
  },
  {
    id: 5,
    title: "Jadwal Pelajaran",
    description: "Pengelolaan jadwal pelajaran dan ruang kelas",
    icon: "clock",
    color: "bg-red-500"
  },
  {
    id: 6,
    title: "Manajemen Kelas",
    description: "Mengelola kelas dan wali kelas",
    icon: "building-office-2",
    color: "bg-purple-500"
  }
]);

// Benefit data
const benefits = ref([
  {
    title: "Efisiensi Administrasi",
    description: "Mengurangi beban administratif dengan otomatisasi",
    icon: "chart-bar"
  },
  {
    title: "Data Terpusat",
    description: "Semua data akademik tersimpan dalam satu sistem",
    icon: "database"
  },
  {
    title: "Akses Mudah",
    description: "Akses informasi kapan saja dan di mana saja",
    icon: "device-phone-mobile"
  },
  {
    title: "Transparansi",
    description: "Orang tua dapat memantau perkembangan anak",
    icon: "eye"
  }
]);
</script>

<template>
  <Navbar />
  <div class="feature-page font-sans">
    <!-- Hero Section -->
    <section class="bg-gray-50 dark:bg-gray-700 py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">SIAKAD Sekolah Dasar</h1>
            <p class="text-lg text-gray-600 dark:text-white mb-8">
              Sistem Informasi Akademik untuk pengelolaan data dan kegiatan akademik di sekolah dasar</p>
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              Pelajari Lebih Lanjut
            </button>
          </div>
          <div class="md:w-1/2">
            <!-- Using an inline SVG as a placeholder instead of importing an image -->
            <div
              class="rounded-lg shadow-xl bg-white dark:bg-gray-700 p-6 h-64 md:h-80 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                stroke="currentColor" class="w-24 h-24 text-blue-500">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
              </svg>
              <div class="ml-4">
                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-300">SIAKAD</h3>
                <p class="text-gray-600 dark:text-gray-400">Sistem Akademik Modern</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 md:py-24 bg-white dark:bg-gray-700">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Fitur Utama</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.id"
            class="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
            <div :class="`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white`">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-8 h-8">
                <path v-if="feature.icon === 'user-group'" stroke-linecap="round" stroke-linejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.479m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                <path v-else-if="feature.icon === 'academic-cap'" stroke-linecap="round" stroke-linejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                <path v-else-if="feature.icon === 'clipboard-document-check'" stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                <path v-else-if="feature.icon === 'calendar'" stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                <path v-else-if="feature.icon === 'clock'" stroke-linecap="round" stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <path v-else-if="feature.icon === 'building-office-2'" stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 md:py-24 bg-gray-50 dark:bg-gray-700">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-300">Manfaat SIAKAD
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(benefit, index) in benefits" :key="index" class="flex items-start">
            <div class="bg-blue-100 rounded-full p-4 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 text-blue-600">
                <path v-if="benefit.icon === 'chart-bar'" stroke-linecap="round" stroke-linejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                <path v-else-if="benefit.icon === 'database'" stroke-linecap="round" stroke-linejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                <path v-else-if="benefit.icon === 'device-phone-mobile'" stroke-linecap="round" stroke-linejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                <path v-else-if="benefit.icon === 'eye'" stroke-linecap="round" stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path v-if="benefit.icon === 'eye'" stroke-linecap="round" stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
            <div>
              <h4 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{{ benefit.title }}</h4>
              <p class="text-gray-600 dark:text-gray-400">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 md:py-24 bg-white dark:bg-gray-700">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Testimoni Pengguna
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <p class="text-gray-600 dark:text-gray-300 italic mb-6">
              "SIAKAD sangat membantu administrasi sekolah kami menjadi lebih efisien dan terorganisir."</p>
            <div>
              <h5 class="font-semibold text-gray-800 dark:text-gray-300">Budi Santoso</h5>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Kepala Sekolah SD Maju Bersama</p>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <p class="text-gray-600 dark:text-gray-300 italic mb-6">"Sebagai guru, saya merasa terbantu dalam menginput
              nilai dan melihat perkembangan siswa."</p>
            <div>
              <h5 class="font-semibold text-gray-800 dark:text-gray-300">Siti Rahma</h5>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Guru Kelas 4 SD Cendekia</p>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <p class="text-gray-600 dark:text-gray-300 italic mb-6">"Sebagai orang tua, saya dapat memantau nilai dan
              kehadiran anak saya
              dengan mudah melalui aplikasi."</p>
            <div>
              <h5 class="font-semibold text-gray-800 dark:text-gray-300">Ahmad Ridwan</h5>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Orang Tua Siswa</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 md:py-20 bg-blue-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Siap Menerapkan SIAKAD di Sekolah Anda?</h2>
        <p class="text-xl opacity-90 mb-8">Hubungi kami untuk informasi lebih lanjut dan demo sistem</p>
        <button
          class="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          Hubungi Kami
        </button>
      </div>
    </section>
  </div>
</template>