<script setup>
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from '@/components/layouts/Footer.vue';
import { ref, computed } from 'vue';

// Data for roles and their capabilities
const roles = ref([
  {
    id: 'admin',
    title: 'Administrator',
    icon: 'shield-check',
    description: 'Akses penuh untuk mengelola seluruh sistem akademik, termasuk data pengguna, kelas, jadwal, dan laporan.',
    color: 'bg-blue-600 dark:bg-blue-700',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
  },
  {
    id: 'teacher',
    title: 'Guru',
    icon: 'academic-cap',
    description: 'Akses untuk mengelola kelas yang diampu, memasukkan nilai siswa, melihat jadwal mengajar, dan berkomunikasi dengan siswa.',
    color: 'bg-green-600 dark:bg-green-700',
    buttonColor: 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
  },
  {
    id: 'student',
    title: 'Siswa',
    icon: 'user',
    description: 'Akses untuk melihat jadwal pelajaran, nilai, tugas, dan informasi akademik lainnya yang relevan untuk siswa.',
    color: 'bg-amber-600 dark:bg-amber-700',
    buttonColor: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800'
  }
]);

// Features categorized by role
const features = ref({
  admin: [
    {
      title: 'Manajemen Pengguna',
      description: 'Mengelola data guru, siswa, dan staf administrasi termasuk pembuatan akun dan hak akses.',
      icon: 'users',
      routes: ['/admin/user', '/admin/user_role']
    },
    {
      title: 'Manajemen Kelas',
      description: 'Membuat dan mengatur kelas, rombongan belajar, dan histori kelas.',
      icon: 'building-office-2',
      routes: ['/admin/class', '/admin/class_history', '/admin/rombel']
    },
    {
      title: 'Manajemen Mata Pelajaran',
      description: 'Mengatur mata pelajaran, jam pelajaran, dan jadwal pelajaran untuk semua kelas.',
      icon: 'book-open',
      routes: ['/admin/subject', '/admin/subject_hour', '/admin/subject_schedule']
    },
    {
      title: 'Manajemen Guru',
      description: 'Mengelola data guru dan penugasan wali kelas.',
      icon: 'academic-cap',
      routes: ['/admin/teacher', '/admin/homeroom_teacher']
    },
    {
      title: 'Manajemen Siswa',
      description: 'Mengelola data siswa, pendaftaran, dan penilaian.',
      icon: 'user-group',
      routes: ['/admin/student', '/admin/student-assesment', '/admin/registration']
    },
    {
      title: 'Manajemen Tahun Ajaran',
      description: 'Mengatur tahun ajaran dan informasi terkait.',
      icon: 'calendar',
      routes: ['/admin/study_year']
    },
    {
      title: 'Manajemen Keuangan',
      description: 'Mengelola pembayaran SPP dan riwayat pembayaran.',
      icon: 'banknotes',
      routes: ['/admin/spp', '/admin/spp-history']
    },
    {
      title: 'Pengaturan KKM',
      description: 'Mengatur Kriteria Ketuntasan Minimal untuk setiap mata pelajaran.',
      icon: 'cog',
      routes: ['/admin/kkm']
    }
  ],
  teacher: [
    {
      title: 'Dashboard Guru',
      description: 'Informasi ringkas mengenai jadwal mengajar, kelas yang diampu, dan tugas terkini.',
      icon: 'presentation-chart-bar',
      routes: ['/teacher/dashboard']
    },
    {
      title: 'Profil Guru',
      description: 'Melihat dan memperbarui informasi profil pribadi.',
      icon: 'user-circle',
      routes: ['/teacher/profile']
    },
    {
      title: 'Manajemen Kelas',
      description: 'Melihat kelas yang diampu dan siswa dalam kelas tersebut.',
      icon: 'building-office-2',
      routes: ['/teacher/class']
    },
    {
      title: 'Manajemen Siswa',
      description: 'Melihat data siswa yang diajar.',
      icon: 'user-group',
      routes: ['/teacher/student']
    },
    {
      title: 'Mata Pelajaran',
      description: 'Melihat mata pelajaran yang diampu.',
      icon: 'book-open',
      routes: ['/teacher/subject']
    },
    {
      title: 'Penilaian Siswa',
      description: 'Memasukkan dan mengelola nilai siswa untuk mata pelajaran yang diampu.',
      icon: 'clipboard-check',
      routes: ['/teacher/rombel', '/teacher/student-assesment']
    },
    {
      title: 'Pengaturan',
      description: 'Pengaturan akun dan preferensi.',
      icon: 'cog',
      routes: ['/teacher/settings']
    }
  ],
  student: [
    {
      title: 'Dashboard Siswa',
      description: 'Informasi ringkas mengenai jadwal pelajaran, tugas, dan pengumuman terbaru.',
      icon: 'presentation-chart-bar',
      routes: ['/student/dashboard']
    },
    {
      title: 'Profil Siswa',
      description: 'Melihat dan memperbarui informasi profil pribadi.',
      icon: 'user-circle',
      routes: ['/student/profile']
    },
    {
      title: 'Kelas',
      description: 'Melihat informasi tentang kelas yang diikuti.',
      icon: 'building-office-2',
      routes: ['/student/class', '/student/class_history']
    },
    {
      title: 'Jadwal Pelajaran',
      description: 'Melihat jadwal mata pelajaran dan rombongan belajar.',
      icon: 'calendar',
      routes: ['/student/subject_schedule', '/student/rombel']
    },
    {
      title: 'Pembayaran SPP',
      description: 'Melihat informasi dan riwayat pembayaran SPP.',
      icon: 'banknotes',
      routes: ['/student/spp', '/student/spp-history']
    },
    {
      title: 'Nilai Akademik',
      description: 'Melihat nilai dan hasil penilaian untuk semua mata pelajaran.',
      icon: 'clipboard-document-check',
      routes: ['/student/student-assesment']
    },
    {
      title: 'Pengaturan',
      description: 'Pengaturan akun dan preferensi.',
      icon: 'cog',
      routes: ['/student/settings']
    }
  ]
});

// Active role for tab navigation
const activeRole = ref('admin');

// Switch active role
const setActiveRole = (roleId) => {
  activeRole.value = roleId;
};

// Workflow steps
const workflows = ref({
  admin: [
    { step: 1, title: 'Setup Tahun Ajaran', description: 'Admin mengatur tahun ajaran dan semester aktif.' },
    { step: 2, title: 'Konfirmasi Data Guru & Siswa', description: 'Admin memverifikasi dan memperbarui data guru dan siswa.' },
    { step: 3, title: 'Setup Kelas & Rombel', description: 'Admin mengatur kelas dan rombongan belajar untuk tahun ajaran.' },
    { step: 4, title: 'Setup Mata Pelajaran', description: 'Admin mengatur mata pelajaran dan KKM untuk setiap kelas.' },
    { step: 5, title: 'Penugasan Guru', description: 'Admin menugaskan guru untuk mata pelajaran dan wali kelas.' },
    { step: 6, title: 'Pembuatan Jadwal', description: 'Admin membuat jadwal pelajaran untuk setiap kelas.' },
    { step: 7, title: 'Setup Pembayaran SPP', description: 'Admin mengatur nominal SPP dan jadwal pembayaran.' },
  ],
  teacher: [
    { step: 1, title: 'Login ke Sistem', description: 'Guru masuk ke sistem dengan kredensial yang diberikan.' },
    { step: 2, title: 'Verifikasi Jadwal Mengajar', description: 'Guru memeriksa jadwal mengajar dan kelas yang diampu.' },
    { step: 3, title: 'Pengisian Kehadiran', description: 'Guru mengisi absensi siswa untuk setiap pertemuan.' },
    { step: 4, title: 'Pengelolaan Materi', description: 'Guru menyiapkan dan mengunggah materi pembelajaran.' },
    { step: 5, title: 'Pemberian Tugas', description: 'Guru memberikan tugas dan penilaian kepada siswa.' },
    { step: 6, title: 'Input Nilai', description: 'Guru melakukan penilaian dan menginput nilai siswa.' },
    { step: 7, title: 'Laporan Akhir', description: 'Guru membuat laporan akhir perkembangan siswa.' },
  ],
  student: [
    { step: 1, title: 'Login ke Sistem', description: 'Siswa masuk ke sistem dengan kredensial yang diberikan.' },
    { step: 2, title: 'Mengakses Jadwal', description: 'Siswa melihat jadwal pelajaran harian dan mingguan.' },
    { step: 3, title: 'Mengakses Materi', description: 'Siswa mengakses materi pembelajaran yang diberikan guru.' },
    { step: 4, title: 'Pengerjaan Tugas', description: 'Siswa mengerjakan dan mengumpulkan tugas yang diberikan.' },
    { step: 5, title: 'Melihat Penilaian', description: 'Siswa melihat hasil penilaian dari tugas dan ujian.' },
    { step: 6, title: 'Pembayaran SPP', description: 'Siswa/Orangtua melakukan pembayaran SPP sesuai jadwal.' },
    { step: 7, title: 'Melihat Laporan', description: 'Siswa melihat laporan akademik dan perkembangan belajar.' },
  ]
});

// Demo screenshots (placeholder, would be replaced with actual screenshots)
const demoScreens = ref([
  {
    role: 'admin',
    title: 'Dashboard Admin',
    image: 'https://placehold.co/800x600/2563EB/FFFFFF/png?text=Admin+Dashboard&font=montserrat',
    description: 'Tampilan dashboard admin dengan ringkasan data sekolah, statistik, dan akses cepat ke modul utama.'
  },
  {
    role: 'admin',
    title: 'Manajemen Pengguna',
    image: 'https://placehold.co/800x600/2563EB/FFFFFF/png?text=User+Management&font=montserrat',
    description: 'Panel untuk mengelola akun pengguna, termasuk guru, siswa, dan staf administrasi.'
  },
  {
    role: 'teacher',
    title: 'Dashboard Guru',
    image: 'https://placehold.co/800x600/059669/FFFFFF/png?text=Teacher+Dashboard&font=montserrat',
    description: 'Tampilan dashboard guru dengan jadwal mengajar, kelas yang diampu, dan informasi terkini.'
  },
  {
    role: 'teacher',
    title: 'Input Nilai',
    image: 'https://placehold.co/800x600/059669/FFFFFF/png?text=Grade+Management&font=montserrat',
    description: 'Halaman untuk memasukkan nilai siswa untuk tugas, ujian, dan komponen penilaian lainnya.'
  },
  {
    role: 'student',
    title: 'Dashboard Siswa',
    image: 'https://placehold.co/800x600/D97706/FFFFFF/png?text=Student+Dashboard&font=montserrat',
    description: 'Tampilan dashboard siswa dengan jadwal pelajaran, pengumuman, dan tugas terkini.'
  },
  {
    role: 'student',
    title: 'Lihat Nilai',
    image: 'https://placehold.co/800x600/D97706/FFFFFF/png?text=Student+Grades&font=montserrat',
    description: 'Halaman untuk melihat nilai dan pencapaian akademik siswa untuk semua mata pelajaran.'
  },
]);

// Filter demo screenshots based on active role
const filteredDemoScreens = computed(() => {
  return demoScreens.value.filter(screen => screen.role === activeRole.value);
});
</script>

<template>
  <div class="demo-page bg-white dark:bg-gray-900 min-h-screen font-sans">
    <Navbar />

    <!-- Hero Section -->
    <section
      class="bg-gradient-to-r from-purple-600 to-indigo-800 dark:from-purple-900 dark:to-indigo-950 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">SIAKAD Demo</h1>
          <p class="text-xl mb-10 opacity-90">
            Pelajari cara kerja Sistem Informasi Akademik kami dengan demo interaktif untuk Admin, Guru, dan Siswa
          </p>
          <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div v-for="role in roles" :key="role.id" :class="[
                'p-4 rounded-lg cursor-pointer transition-all duration-300 text-center',
                activeRole === role.id
                  ? `${role.color} shadow-lg`
                  : 'bg-white/5 hover:bg-white/15'
              ]" @click="setActiveRole(role.id)">
                <div class="flex flex-col items-center">
                  <div class="bg-white/20 rounded-full p-3 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <!-- Shield icon for admin -->
                      <path v-if="role.icon === 'shield-check'" stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      <!-- Academic cap icon for teacher -->
                      <path v-else-if="role.icon === 'academic-cap'" stroke-linecap="round" stroke-linejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                      <!-- User icon for student -->
                      <path v-else-if="role.icon === 'user'" stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <h3 class="font-semibold text-lg">{{ role.title }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Role Description -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div v-for="role in roles" :key="role.id" v-show="activeRole === role.id">
            <div class="flex items-center mb-6">
              <div :class="`${role.color} rounded-full p-3 mr-4`">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-8 h-8 text-white">
                  <path v-if="role.icon === 'shield-check'" stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  <path v-else-if="role.icon === 'academic-cap'" stroke-linecap="round" stroke-linejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  <path v-else-if="role.icon === 'user'" stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h2 class="text-3xl font-bold text-gray-800 dark:text-white">Role: {{ role.title }}</h2>
            </div>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-10">
              {{ role.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">Fitur untuk
            <span v-if="activeRole === 'admin'" class="text-blue-600 dark:text-blue-400">Administrator</span>
            <span v-else-if="activeRole === 'teacher'" class="text-green-600 dark:text-green-400">Guru</span>
            <span v-else-if="activeRole === 'student'" class="text-amber-600 dark:text-amber-400">Siswa</span>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="feature in features[activeRole]" :key="feature.title"
              class="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div class="flex items-start">
                <div class="bg-gray-100 dark:bg-gray-600 rounded-full p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :class="[
                    'w-6 h-6',
                    activeRole === 'admin' ? 'text-blue-600 dark:text-blue-400' :
                      activeRole === 'teacher' ? 'text-green-600 dark:text-green-400' :
                        'text-amber-600 dark:text-amber-400'
                  ]">
                    <!-- Users -->
                    <path v-if="feature.icon === 'users'" stroke-linecap="round" stroke-linejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    <!-- Building -->
                    <path v-else-if="feature.icon === 'building-office-2'" stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                    <!-- Book -->
                    <path v-else-if="feature.icon === 'book-open'" stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    <!-- Academic Cap -->
                    <path v-else-if="feature.icon === 'academic-cap'" stroke-linecap="round" stroke-linejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    <!-- User Group -->
                    <path v-else-if="feature.icon === 'user-group'" stroke-linecap="round" stroke-linejoin="round"
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.479m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    <!-- Calendar -->
                    <path v-else-if="feature.icon === 'calendar'" stroke-linecap="round" stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    <!-- Banknotes -->
                    <path v-else-if="feature.icon === 'banknotes'" stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9.75m18-10.5V.75a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v.75m11.25 0h-7.5m11.25 0H9m11.25 0H3m12.75 0v3m0 3.75H9m1.5-3.75H3V18h1.5v-8.25h1.5m9-2.25h1.5v12.75H12v-12.75Zm0 0L14.25 12" />
                    <!-- Cog -->
                    <path v-if="feature.icon === 'cog'" stroke-linecap="round" stroke-linejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
                    <path v-if="feature.icon === 'cog'" stroke-linecap="round" stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <!-- Presentation Chart -->
                    <path v-else-if="feature.icon === 'presentation-chart-bar'" stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                    <!-- User Circle -->
                    <path v-else-if="feature.icon === 'user-circle'" stroke-linecap="round" stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <!-- Clipboard Check -->
                    <path v-else-if="feature.icon === 'clipboard-check'" stroke-linecap="round" stroke-linejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                    <!-- Clipboard Document Check -->
                    <path v-else-if="feature.icon === 'clipboard-document-check'" stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{{ feature.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-3">{{ feature.description }}</p>
                  <div v-if="feature.routes && feature.routes.length" class="flex flex-wrap gap-2 mt-2">
                    <span v-for="(route, index) in feature.routes" :key="index"
                      class="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-600 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                      {{ route }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Workflow Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">Alur Kerja
            <span v-if="activeRole === 'admin'" class="text-blue-600 dark:text-blue-400">Administrator</span>
            <span v-else-if="activeRole === 'teacher'" class="text-green-600 dark:text-green-400">Guru</span>
            <span v-else-if="activeRole === 'student'" class="text-amber-600 dark:text-amber-400">Siswa</span>
          </h2>

          <div class="relative">
            <!-- Vertical line for workflow -->
            <div
              class="absolute left-[15px] md:left-1/2 md:transform md:-translate-x-1/2 top-0 h-full w-1 bg-gray-200 dark:bg-gray-700">
            </div>

            <!-- Workflow steps -->
            <div class="space-y-12">
              <div v-for="step in workflows[activeRole]" :key="step.step"
                class="relative flex flex-col md:flex-row md:items-center">
                <!-- Step bullet point -->
                <div :class="[
                  'absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full text-white text-sm z-10',
                  activeRole === 'admin' ? 'bg-blue-600' :
                    activeRole === 'teacher' ? 'bg-green-600' :
                      'bg-amber-600'
                ]">
                  {{ step.step }}
                </div>

                <!-- Step content -->
                <div class="ml-12 md:ml-0 md:w-5/12 md:pr-8 md:text-right md:mr-auto">
                  <div :class="{ 'md:hidden': step.step % 2 === 0 }">
                    <h3 class="font-bold text-lg text-gray-800 dark:text-white">{{ step.title }}</h3>
                    <p class="text-gray-600 dark:text-gray-400">{{ step.description }}</p>
                  </div>
                </div>

                <!-- For right side on desktop -->
                <div class="hidden md:block md:w-5/12 md:pl-8 md:text-left md:ml-auto">
                  <div :class="{ 'md:hidden': step.step % 2 !== 0 }">
                    <h3 class="font-bold text-lg text-gray-800 dark:text-white">{{ step.title }}</h3>
                    <p class="text-gray-600 dark:text-gray-400">{{ step.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Screenshots Section -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">Tampilan SIAKAD untuk
            <span v-if="activeRole === 'admin'" class="text-blue-600 dark:text-blue-400">Administrator</span>
            <span v-else-if="activeRole === 'teacher'" class="text-green-600 dark:text-green-400">Guru</span>
            <span v-else-if="activeRole === 'student'" class="text-amber-600 dark:text-amber-400">Siswa</span>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="screen in filteredDemoScreens" :key="screen.title"
              class="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="aspect-video overflow-hidden">
                <img :src="screen.image" :alt="screen.title"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
              </div>
              <div class="p-6">
                <h3 class="font-bold text-xl mb-2 text-gray-800 dark:text-white">{{ screen.title }}</h3>
                <p class="text-gray-600 dark:text-gray-300">{{ screen.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section
      class="py-16 bg-gradient-to-r from-purple-600 to-indigo-800 dark:from-purple-900 dark:to-indigo-950 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">Siap Mencoba SIAKAD?</h2>
        <p class="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
          Jadwalkan demo lengkap atau daftar untuk uji coba gratis SIAKAD selama 30 hari
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact"
            class="bg-white text-indigo-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            Hubungi Kami
          </a>
          <a href="/login"
            class="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Login Demo
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.demo-page {
  scroll-behavior: smooth;
}

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

/* Timeline adjustments for mobile */
@media (max-width: 768px) {
  .workflow-item-right .workflow-content {
    text-align: left;
    padding-left: 1rem;
  }
}
</style>
