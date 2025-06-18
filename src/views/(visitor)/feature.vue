<script setup>
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue";
import { ref } from 'vue';

// Feature data
const features = ref([
  {
    id: 1,
    title: "Manajemen Siswa",
    description: "Mengelola data siswa termasuk biodata, riwayat akademik, dan kehadiran",
    icon: "user-group",
    color: "bg-blue-500 dark:bg-blue-600"
  },
  {
    id: 2,
    title: "Manajemen Guru",
    description: "Mengelola data guru, jadwal mengajar, dan beban kerja",
    icon: "academic-cap",
    color: "bg-green-500 dark:bg-green-600"
  },
  {
    id: 3,
    title: "Penilaian",
    description: "Pencatatan nilai tugas, ujian, dan rapor digital",
    icon: "clipboard-document-check",
    color: "bg-cyan-500 dark:bg-cyan-600"
  },
  {
    id: 4,
    title: "Kehadiran",
    description: "Monitoring kehadiran siswa dan guru",
    icon: "calendar",
    color: "bg-amber-500 dark:bg-amber-600"
  },
  {
    id: 5,
    title: "Jadwal Pelajaran",
    description: "Pengelolaan jadwal pelajaran dan ruang kelas",
    icon: "clock",
    color: "bg-red-500 dark:bg-red-600"
  },
  {
    id: 6,
    title: "Manajemen Kelas",
    description: "Mengelola kelas dan wali kelas",
    icon: "building-office-2",
    color: "bg-purple-500 dark:bg-purple-600"
  }
]);

// Benefit data
const benefits = ref([
  {
    title: "Efisiensi Administrasi",
    description: "Mengurangi beban administratif dengan otomatisasi proses dan pengelolaan data yang lebih terstruktur",
    icon: "chart-bar"
  },
  {
    title: "Data Terpusat",
    description: "Semua data akademik tersimpan dalam satu sistem yang terintegrasi dan mudah diakses",
    icon: "database"
  },
  {
    title: "Akses Mudah",
    description: "Akses informasi kapan saja dan di mana saja melalui perangkat yang terhubung dengan internet",
    icon: "device-phone-mobile"
  },
  {
    title: "Transparansi",
    description: "Orang tua dapat memantau perkembangan akademik anak secara real-time dengan akses khusus",
    icon: "eye"
  }
]);

// Testimonial data
const testimonials = ref([
  {
    content: "SIAKAD sangat membantu administrasi sekolah kami menjadi lebih efisien dan terorganisir. Pengelolaan data siswa dan guru menjadi lebih mudah dan terintegrasi.",
    name: "Budi Santoso",
    role: "Kepala Sekolah SD Maju Bersama",
    color: "border-blue-500 dark:border-blue-400"
  },
  {
    content: "Sebagai guru, saya merasa terbantu dalam menginput nilai dan melihat perkembangan siswa. Pembuatan laporan juga menjadi lebih cepat dan akurat.",
    name: "Siti Rahma",
    role: "Guru Kelas 4 SD Cendekia",
    color: "border-green-500 dark:border-green-400"
  },
  {
    content: "Sebagai orang tua, saya dapat memantau nilai dan kehadiran anak saya dengan mudah melalui aplikasi. Komunikasi dengan guru juga menjadi lebih lancar.",
    name: "Ahmad Ridwan",
    role: "Orang Tua Siswa",
    color: "border-purple-500 dark:border-purple-400"
  }
]);
</script>

<template>
  <div class="feature-page font-sans bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <Navbar />
    <!-- Hero Section -->
    <section class="bg-gray-50 dark:bg-gray-800 py-16 md:py-24 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">SIAKAD Sekolah Dasar</h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Sistem Informasi Akademik modern untuk pengelolaan data dan kegiatan akademik di sekolah dasar yang
              efisien,
              terintegrasi, dan mudah diakses.
            </p>
            <div class="flex flex-wrap gap-4">
              <button
                class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                Pelajari Lebih Lanjut
              </button>
              <button
                class="bg-transparent border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out">
                Lihat Demo
              </button>
            </div>
          </div>
          <div class="md:w-1/2">
            <div
              class="rounded-lg shadow-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-2xl">
              <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                  stroke="currentColor" class="w-20 h-20 text-blue-500 dark:text-blue-400">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
                <div class="ml-6">
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200">SIAKAD</h3>
                  <p class="text-gray-600 dark:text-gray-400">Sistem Akademik Modern</p>
                  <div class="flex items-center mt-3">
                    <span
                      class="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20 dark:ring-green-500/30">
                      Versi 2.5
                    </span>
                    <span
                      class="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20 dark:ring-blue-500/30 ml-2">
                      Cloud
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Fitur Utama</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            SIAKAD menyediakan beragam fitur yang dirancang khusus untuk memenuhi kebutuhan administrasi dan
            pembelajaran di sekolah dasar.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl group">
            <div
              :class="`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white transform group-hover:scale-110 transition-transform duration-300`">
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
            <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Manfaat SIAKAD</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Implementasi SIAKAD memberikan berbagai keuntungan yang signifikan bagi pengelolaan administrasi sekolah dan
            proses pembelajaran.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(benefit, index) in benefits" :key="index"
            class="flex items-start bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <div class="bg-blue-100 dark:bg-blue-900/30 rounded-full p-4 mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 text-blue-600 dark:text-blue-400">
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
              <h4 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{{ benefit.title }}</h4>
              <p class="text-gray-600 dark:text-gray-400">{{ benefit.description }}</p>
            </div>
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
            Berikut adalah pendapat dari para pengguna SIAKAD dari berbagai sekolah di Indonesia.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2 text-blue-600 dark:text-blue-400">500+</div>
            <div class="text-lg text-gray-700 dark:text-gray-300">Sekolah</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2 text-green-600 dark:text-green-400">100k+</div>
            <div class="text-lg text-gray-700 dark:text-gray-300">Siswa</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2 text-purple-600 dark:text-purple-400">34</div>
            <div class="text-lg text-gray-700 dark:text-gray-300">Provinsi</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2 text-amber-600 dark:text-amber-400">10k+</div>
            <div class="text-lg text-gray-700 dark:text-gray-300">Guru</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 md:py-20 bg-blue-600 dark:bg-blue-700 text-white transition-colors duration-300">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Siap Menerapkan SIAKAD di Sekolah Anda?</h2>
        <p class="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
          Jadwalkan konsultasi gratis dengan tim kami untuk melihat bagaimana SIAKAD dapat membantu
          meningkatkan efisiensi administrasi dan kualitas pembelajaran di sekolah Anda.
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
  </div>
  <Footer />
</template>

<style scoped>
/* Transitions for dark mode */
.transition-colors {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.transition-all {
  transition: all 0.3s ease;
}

.transition-transform {
  transition: transform 0.3s ease;
}
</style>