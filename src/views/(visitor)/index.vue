<script setup>
import Navbar from '@/components/layouts/Navbar.vue';
</script>

<template>
  <div class="landing-page">
    <Navbar />

    <!-- Hero Section -->
    <section class="bg-blue-600 dark:bg-blue-950 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class="text-4xl font-bold mb-4">SIAKAD SD</h1>
            <p class="text-xl mb-6">Sistem Informasi Akademik untuk Sekolah Dasar yang Modern dan Efisien</p>
            <button class="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Mulai Sekarang
            </button>
          </div>
          <div class="md:w-1/2">
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="fitur" class="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Fitur Unggulan</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-900 dark:text-gray-300">
          <div class="p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <div class="mb-4">
              <i class="fas fa-user-graduate text-4xl text-blue-600"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">Manajemen Siswa</h3>
            <p>Kelola data siswa dengan mudah dan efisien</p>
          </div>
          <div class="p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <div class="mb-4">
              <i class="fas fa-book text-4xl text-blue-600"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">Akademik</h3>
            <p>Pengaturan nilai, jadwal, dan kurikulum yang terintegrasi</p>
          </div>
          <div class="p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <div class="mb-4">
              <i class="fas fa-chart-line text-4xl text-blue-600"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">Laporan</h3>
            <p>Pantau perkembangan akademik secara real-time</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="tentang" class="bg-gray-100 dark:bg-gray-800 py-16 transition-colors duration-200">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h2 class="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Tentang SIAKAD SD</h2>
            <p class="mb-4 text-gray-700 dark:text-gray-300">
              SIAKAD SD adalah sistem informasi akademik yang dirancang khusus untuk memenuhi kebutuhan
              sekolah dasar dalam mengelola kegiatan akademik secara digital.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              Dengan fitur-fitur modern dan antarmuka yang mudah digunakan, SIAKAD SD membantu
              meningkatkan efisiensi pengelolaan sekolah.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="kontak" class="py-16 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Hubungi Kami</h2>
        <div class="max-w-lg mx-auto">
          <form class="space-y-4">
            <div>
              <input type="text" placeholder="Nama"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600">
            </div>
            <div>
              <input type="email" placeholder="Email"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600">
            </div>
            <div>
              <textarea placeholder="Pesan" rows="4"
                class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"></textarea>
            </div>
            <button class="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-blue-600 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h3 class="text-xl font-bold">SIAKAD SD</h3>
            <p>© 2024 All rights reserved</p>
          </div>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-gray-300 transition-colors">Beranda</a>
            <a href="#fitur" class="hover:text-gray-300 transition-colors">Fitur</a>
            <a href="#tentang" class="hover:text-gray-300 transition-colors">Tentang</a>
            <a href="#kontak" class="hover:text-gray-300 transition-colors">Kontak</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.landing-page {
  scroll-behavior: smooth;
}
</style>