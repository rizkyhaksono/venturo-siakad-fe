<script setup>
import Navbar from "@/components/layouts/Navbar.vue";
import Footer from "@/components/layouts/Footer.vue";
import { ref } from 'vue';

// Contact information
const contactInfo = ref([
  {
    title: 'Email',
    value: 'info@siakad.edu',
    icon: 'envelope',
    link: 'mailto:info@siakad.edu'
  },
  {
    title: 'Telepon',
    value: '+62 21 5551234',
    icon: 'phone',
    link: 'tel:+6221555123'
  },
  {
    title: 'Alamat',
    value: 'Jl. Pendidikan No. 123, Jakarta Pusat',
    icon: 'map-pin',
    link: 'https://maps.google.com/?q=Jakarta+Pusat'
  }
]);

// FAQ data
const faqs = ref([
  {
    question: 'Bagaimana cara menggunakan SIAKAD?',
    answer: 'SIAKAD dapat diakses melalui web browser dengan menggunakan akun yang telah diberikan oleh pihak sekolah. Setiap pengguna memiliki hak akses yang berbeda tergantung perannya (admin, guru, siswa, atau orang tua).'
  },
  {
    question: 'Apakah SIAKAD tersedia dalam bentuk aplikasi mobile?',
    answer: 'Ya, SIAKAD tersedia dalam bentuk aplikasi mobile untuk Android dan iOS. Aplikasi dapat diunduh melalui Google Play Store dan Apple App Store.'
  },
  {
    question: 'Biaya berlangganan SIAKAD?',
    answer: 'Biaya berlangganan SIAKAD bervariasi tergantung jumlah siswa dan fitur yang diinginkan. Silahkan hubungi tim sales kami untuk mendapatkan penawaran yang sesuai dengan kebutuhan sekolah Anda.'
  },
  {
    question: 'Bagaimana keamanan data di SIAKAD?',
    answer: 'SIAKAD menggunakan teknologi enkripsi terbaru dan mematuhi standar keamanan data. Semua informasi disimpan di server yang aman dengan backup secara berkala.'
  },
  {
    question: 'Apakah ada pelatihan untuk pengguna SIAKAD?',
    answer: 'Ya, kami menyediakan pelatihan dan pendampingan bagi admin sekolah, guru, dan staf yang akan menggunakan SIAKAD. Pelatihan dapat dilakukan secara online maupun tatap muka.'
  }
]);

// Form data
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

// Form state
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const errorMessage = ref('');

// Handle form submission
const submitForm = () => {
  // Validation
  if (!form.value.name || !form.value.email || !form.value.message) {
    errorMessage.value = 'Silahkan lengkapi semua field yang wajib diisi';
    return;
  }

  isSubmitting.value = true;

  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false;
    isSubmitted.value = true;
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
    errorMessage.value = '';
  }, 1500);
};

// Select FAQ answer
const selectedFaq = ref(null);
const toggleFaq = (index) => {
  selectedFaq.value = selectedFaq.value === index ? null : index;
};
</script>

<template>
  <div class="contact-page bg-white dark:bg-gray-900 min-h-screen font-sans">
    <Navbar />

    <!-- Hero Section -->
    <section class="bg-blue-600 dark:bg-blue-800 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
        <p class="text-xl max-w-3xl mx-auto">
          Ada pertanyaan tentang SIAKAD? Jangan ragu untuk menghubungi tim kami.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-12">
          <!-- Contact Info -->
          <div class="lg:w-1/3">
            <h2 class="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Informasi Kontak</h2>
            <div class="space-y-6">
              <div v-for="(info, index) in contactInfo" :key="index" class="flex items-start">
                <div class="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mr-4">
                  <!-- Envelope Icon -->
                  <svg v-if="info.icon === 'envelope'" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-6 h-6 text-blue-600 dark:text-blue-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <!-- Phone Icon -->
                  <svg v-if="info.icon === 'phone'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-600 dark:text-blue-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <!-- Map Pin Icon -->
                  <svg v-if="info.icon === 'map-pin'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-600 dark:text-blue-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium mb-1 text-gray-800 dark:text-white">{{ info.title }}</h3>
                  <a :href="info.link" class="text-blue-600 dark:text-blue-400 hover:underline">{{ info.value }}</a>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="mt-10">
              <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Ikuti Kami</h3>
              <div class="flex space-x-4">
                <a href="#"
                  class="bg-blue-100 dark:bg-blue-900 p-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition">
                  <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#"
                  class="bg-blue-100 dark:bg-blue-900 p-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition">
                  <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#"
                  class="bg-blue-100 dark:bg-blue-900 p-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition">
                  <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                      d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#"
                  class="bg-blue-100 dark:bg-blue-900 p-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition">
                  <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Kirim Pesan</h2>
            <div v-if="isSubmitted"
              class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-4 rounded-lg mb-6">
              <p class="font-medium">Pesan Anda berhasil terkirim!</p>
              <p>Tim kami akan segera menghubungi Anda.</p>
            </div>
            <form v-else @submit.prevent="submitForm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap
                    <span class="text-red-500">*</span></label>
                  <input type="text" id="name" v-model="form.name"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required>
                </div>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email <span
                      class="text-red-500">*</span></label>
                  <input type="email" id="email" v-model="form.email"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="phone" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Nomor
                    Telepon</label>
                  <input type="tel" id="phone" v-model="form.phone"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                </div>
                <div>
                  <label for="subject"
                    class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Subjek</label>
                  <input type="text" id="subject" v-model="form.subject"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                </div>
              </div>
              <div class="mb-6">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Pesan <span
                    class="text-red-500">*</span></label>
                <textarea id="message" v-model="form.message" rows="5"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required></textarea>
              </div>

              <div v-if="errorMessage" class="mb-6 text-red-500 text-sm">
                {{ errorMessage }}
              </div>

              <button type="submit"
                class="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 flex justify-center items-center"
                :disabled="isSubmitting">
                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                {{ isSubmitting ? 'Mengirim...' : 'Kirim Pesan' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white">Lokasi Kami</h2>
        <div class="aspect-w-16 aspect-h-9 max-w-4xl mx-auto">
          <div class="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
            <!-- Placeholder for Google Maps -->
            <div class="w-full h-full flex items-center justify-center">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-16 h-16 mx-auto text-gray-500 dark:text-gray-400">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                </svg>
                <p class="mt-4 text-gray-600 dark:text-gray-300">Peta interaktif akan ditampilkan di sini</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">(Untuk implementasi aktual, diperlukan API Google
                  Maps)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Pertanyaan Umum</h2>
        <div class="max-w-3xl mx-auto">
          <div v-for="(faq, index) in faqs" :key="index" class="mb-4">
            <button @click="toggleFaq(index)"
              class="flex justify-between items-center w-full text-left p-5 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none">
              <h3 class="font-medium text-gray-900 dark:text-white">{{ faq.question }}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                :class="['w-5 h-5 transition-transform', selectedFaq === index ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400']">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div v-if="selectedFaq === index"
              class="p-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
              <p class="text-gray-600 dark:text-gray-300">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 bg-blue-600 dark:bg-blue-700 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">Butuh Konsultasi?</h2>
        <p class="text-xl max-w-2xl mx-auto mb-8 opacity-90">
          Tim ahli kami siap membantu sekolah Anda mengimplementasikan SIAKAD yang sesuai dengan kebutuhan
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a href="tel:+6221555123"
            class="py-3 px-6 bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-lg transition duration-300 inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            Telepon Sekarang
          </a>
          <a href="#"
            class="py-3 px-6 bg-transparent border border-white text-white hover:bg-white/10 font-medium rounded-lg transition duration-300 inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            Jadwalkan Demo
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
/* Add transitions for accordion */
.transition-transform {
  transition: transform 0.3s ease;
}
</style>