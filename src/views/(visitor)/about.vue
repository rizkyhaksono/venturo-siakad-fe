<script setup>
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue";
import { ref } from 'vue';

// Team members data
const teamMembers = ref([
  {
    name: 'Dr. Budi Santoso',
    role: 'Kepala Pengembangan',
    image: 'https://media.istockphoto.com/id/1391004406/photo/portrait-of-a-successful-asian-teacher-a-man-in-a-shirt-looking-at-the-camera-and-smiling-in.jpg?s=612x612&w=0&k=20&c=C3VNV594qFe0o-9S3IsuwIfx3lCcxyiEL74SJhFqPUE=',
    bio: 'Berpengalaman 15 tahun dalam pengembangan sistem informasi pendidikan.'
  },
  {
    name: 'Ani Wijaya, M.Pd.',
    role: 'Pengembang Kurikulum',
    image: 'https://www.shutterstock.com/image-photo/portrait-young-asian-woman-teacher-600nw-2463959185.jpg',
    bio: 'Mantan guru dengan pengalaman 10 tahun dalam kurikulum sekolah dasar.'
  },
  {
    name: 'Rudi Hermawan',
    role: 'Lead Developer',
    image: 'https://media.istockphoto.com/id/1540766473/photo/young-adult-male-design-professional-smiles-for-camera.jpg?s=612x612&w=0&k=20&c=BbwgfMOtFOIJn1Km-ASix_EBbF9SHW5h0FtWbna5nFk=',
    bio: 'Fullstack developer dengan spesialisasi aplikasi pendidikan.'
  },
  {
    name: 'Siti Rahma',
    role: 'UI/UX Designer',
    image: 'https://www.workitdaily.com/media-library/image.jpg?id=19296355&width=980&quality=85',
    bio: 'Fokus pada pengalaman pengguna untuk aplikasi edukasi yang intuitif.'
  }
]);

// Milestones data
const milestones = ref([
  {
    year: '2018',
    title: 'Awal Pengembangan',
    description: 'Dimulainya proyek SIAKAD untuk memenuhi kebutuhan sekolah dasar digital.'
  },
  {
    year: '2019',
    title: 'Versi Beta',
    description: 'Peluncuran versi beta di 5 sekolah dasar percontohan di Indonesia.'
  },
  {
    year: '2020',
    title: 'Implementasi Penuh',
    description: 'Implementasi di 50+ sekolah dasar dengan sistem yang sudah lengkap.'
  },
  {
    year: '2022',
    title: 'Penambahan Fitur',
    description: 'Integrasi dengan sistem pembelajaran jarak jauh dan mobile app.'
  },
  {
    year: '2023',
    title: 'Ekspansi Nasional',
    description: 'Digunakan oleh lebih dari 500 sekolah dasar di seluruh Indonesia.'
  }
]);

// Stats data
const stats = ref([
  { label: 'Sekolah Pengguna', value: '500+' },
  { label: 'Siswa Terdata', value: '100,000+' },
  { label: 'Guru Terintegrasi', value: '10,000+' },
  { label: 'Provinsi', value: '34' }
]);

// Partners data
const partners = ref([
  'Kementerian Pendidikan dan Kebudayaan',
  'Dinas Pendidikan Provinsi',
  'Asosiasi Guru Indonesia',
  'EdTech Indonesia',
  'UNESCO Indonesia',
  'UNICEF'
]);
</script>

<template>
  <div class="about-page bg-white dark:bg-gray-900 min-h-screen font-sans">
    <Navbar />

    <!-- Hero Section -->
    <section class="bg-blue-600 dark:bg-blue-800 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Tentang SIAKAD</h1>
        <p class="text-xl max-w-3xl mx-auto">
          Sistem Informasi Akademik untuk Sekolah Dasar yang memudahkan pengelolaan data dan kegiatan akademik
        </p>
      </div>
    </section>

    <!-- Our Mission Section -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <div class="relative">
              <div class="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full z-0"></div>
              <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-green-100 dark:bg-green-900 rounded-full z-0">
              </div>
              <div
                class="relative z-10 rounded-lg overflow-hidden shadow-xl h-80 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <!-- School illustration or image -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                  stroke="currentColor" class="w-32 h-32 text-blue-500 dark:text-blue-400">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="md:w-1/2 md:pl-12">
            <h2 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Misi Kami</h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
              SIAKAD dikembangkan dengan misi untuk mentransformasi proses administrasi dan pembelajaran di sekolah
              dasar melalui teknologi yang inklusif dan mudah digunakan.
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Kami berkomitmen untuk menciptakan sistem yang membantu sekolah dasar mengoptimalkan proses pendidikan,
              mempermudah guru dalam mengelola pembelajaran, dan melibatkan orang tua dalam perkembangan pendidikan
              anak.
            </p>
            <div class="flex items-center">
              <div class="w-12 h-1 bg-blue-600 dark:bg-blue-500 mr-3"></div>
              <span class="text-gray-800 dark:text-gray-200 font-medium">#PendidikanDigital</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-blue-600 dark:bg-blue-700 text-white transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="index" class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2">{{ stat.value }}</div>
            <div class="text-lg opacity-80">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline/Milestone Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white">Perjalanan Kami</h2>
        <div class="relative">
          <!-- Vertical line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>

          <div class="space-y-16">
            <div v-for="(milestone, index) in milestones" :key="index"
              :class="['relative z-10 flex items-center', index % 2 === 0 ? 'flex-row' : 'flex-row-reverse']">
              <!-- Timeline bullet point -->
              <div
                class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-gray-800">
              </div>

              <!-- Content box - alternates sides -->
              <div :class="['w-5/12', index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8']">
                <div class="inline-block bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <div class="text-blue-600 dark:text-blue-400 font-bold text-xl mb-1">{{ milestone.year }}</div>
                  <h3 class="font-semibold text-xl mb-2 text-gray-800 dark:text-white">{{ milestone.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-300">{{ milestone.description }}</p>
                </div>
              </div>

              <!-- Empty space for the other side -->
              <div class="w-5/12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Tim Kami</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="member in teamMembers" :key="member.name"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
            <img :src="member.image" :alt="member.name" class="w-full h-64 object-cover object-center">
            <div class="p-6">
              <h3 class="font-semibold text-xl mb-1 text-gray-800 dark:text-white">{{ member.name }}</h3>
              <div class="text-blue-600 dark:text-blue-400 mb-3">{{ member.role }}</div>
              <p class="text-gray-600 dark:text-gray-400">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-12 text-gray-800 dark:text-white">Mitra Kami</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="(partner, index) in partners" :key="index"
            class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow flex items-center justify-center h-32">
            <span class="font-medium text-gray-800 dark:text-gray-200">{{ partner }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Hubungi Kami</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-8">
            Ingin tahu lebih lanjut tentang SIAKAD atau berencana mengimplementasikannya di sekolah Anda?
            Tim kami siap membantu Anda.
          </p>
          <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <a href="mailto:info@siakad.edu"
              class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Email Kami
            </a>
            <a href="tel:+6221555123"
              class="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              Telepon
            </a>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>