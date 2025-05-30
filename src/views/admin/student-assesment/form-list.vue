<script setup>
import { ref, onMounted } from 'vue';
import Layout from "@/layouts/main.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const rombelId = route.params.id;

// Reactive state
const filters = ref({
  kelas: '',
  tahunAjaran: '',
  nama: '',
  waliKelas: '',
  semester: ''
});

const kelasList = ref([]);
const tahunAjaranList = ref([]);
const semesterList = ref([]);
const waliKelasList = ref([]);
const selectedStudents = ref([]);
const rombelData = ref(null);

const students = ref([
  {
    id: 1,
    nis: 'STU-2025999',
    namaLengkap: 'Rizky Haksono',
    email: 'rizkyhaksono@gmail.com',
    photo: 'https://via.placeholder.com/40',
    noHp: '8932898293',
    semester: '1'
  },
  {
    id: 2,
    nis: 'STU-2025999',
    namaLengkap: 'Rizky Haksono',
    email: 'rizkyhaksono@gmail.com',
    photo: 'https://via.placeholder.com/40',
    noHp: '8932898293',
    semester: '1'
  },
  {
    id: 3,
    nis: 'STU-2025999',
    namaLengkap: 'Rizky Haksono',
    email: 'rizkyhaksono@gmail.com',
    photo: 'https://via.placeholder.com/40',
    noHp: '8932898293',
    semester: '1'
  },
  {
    id: 4,
    nis: 'STU-2025999',
    namaLengkap: 'Rizky Haksono',
    email: 'rizkyhaksono@gmail.com',
    photo: 'https://via.placeholder.com/40',
    noHp: '8932898293',
    semester: '1'
  },
  {
    id: 5,
    nis: 'STU-2025999',
    namaLengkap: 'Rizky Haksono',
    email: 'rizkyhaksono@gmail.com',
    photo: 'https://via.placeholder.com/40',
    noHp: '8932898293',
    semester: '1'
  },
  {
    id: 6,
    nis: 'STU-2025999',
    namaLengkap: 'Rizky Haksono',
    email: 'rizkyhaksono@gmail.com',
    photo: 'https://via.placeholder.com/40',
    noHp: '8932898293',
    semester: '1'
  },
  {
    id: 7,
    nis: 'STU-2025999',
    namaLengkap: 'Rizky Haksono',
    email: 'rizkyhaksono@gmail.com',
    photo: 'https://via.placeholder.com/40',
    noHp: '8932898293',
    semester: '1'
  }
]);

// Methods
const fetchDropdownData = () => {
  // Here you would fetch data for dropdowns from your API
  // For demonstration purposes, just adding example data
  kelasList.value = [
    { id: 1, name: 'Kelas 1A' },
    { id: 2, name: 'Kelas 1B' },
    { id: 3, name: 'Kelas 2A' }
  ];

  tahunAjaranList.value = [
    { id: 1, name: '2024/2025' },
    { id: 2, name: '2023/2024' }
  ];

  semesterList.value = [
    { id: 1, name: 'Semester 1' },
    { id: 2, name: 'Semester 2' }
  ];

  waliKelasList.value = [
    { id: 1, name: 'Budi Santoso' },
    { id: 2, name: 'Sarah Wijaya' }
  ];
};

const fetchStudents = () => {
  // Here you would fetch students based on the filters
  // For now, using the static data
};

const addNilai = (student) => {
  // Navigate to grading page or open modal to fill grades
  console.log('Adding nilai for student:', student);
  // Can use emit if needed
  // emit('add-nilai', student);
};

// Lifecycle hooks
onMounted(() => {
  fetchDropdownData();
});
</script>

<template>
  <Layout>
    <div class="container px-4 py-6 mx-auto">
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="border-b px-6 py-4">
          <h5 class="text-lg font-medium text-gray-800">Add Nilai Siswa/i</h5>
        </div>
        <div class="p-6">
          <!-- Filter Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- First column -->
            <div class="space-y-4">
              <div class="flex flex-col space-y-1">
                <label class="text-sm font-medium text-gray-700">Kelas</label>
                <select
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  v-model="filters.kelas">
                  <option value="" disabled selected>Pilih Kelas</option>
                  <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id">
                    {{ kelas.name }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col space-y-1">
                <label class="text-sm font-medium text-gray-700">Tahun Ajaran</label>
                <select
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  v-model="filters.tahunAjaran">
                  <option value="" disabled selected>Pilih Tahun Ajaran</option>
                  <option v-for="tahun in tahunAjaranList" :key="tahun.id" :value="tahun.id">
                    {{ tahun.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Second column -->
            <div class="space-y-4">
              <div class="flex flex-col space-y-1">
                <label class="text-sm font-medium text-gray-700">Nama</label>
                <input type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  v-model="filters.nama" placeholder="Contoh : A">
              </div>

              <div class="flex flex-col space-y-1">
                <label class="text-sm font-medium text-gray-700">Wali Kelas</label>
                <select
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  v-model="filters.waliKelas">
                  <option value="" disabled selected>Pilih Wali Kelas</option>
                  <option v-for="wali in waliKelasList" :key="wali.id" :value="wali.id">
                    {{ wali.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Third column -->
            <div class="space-y-4">
              <div class="flex flex-col space-y-1">
                <label class="text-sm font-medium text-gray-700">Semester</label>
                <select
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  v-model="filters.semester">
                  <option value="" disabled selected>Pilih Semester</option>
                  <option v-for="semester in semesterList" :key="semester.id" :value="semester.id">
                    {{ semester.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Student Table -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="border-b px-6 py-3 bg-gray-50">
              <h6 class="font-medium text-gray-700">Siswa</h6>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div class="flex items-center">
                        <input type="checkbox"
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                      </div>
                    </th>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NIS
                    </th>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Lengkap
                    </th>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Photo
                    </th>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No. HP
                    </th>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                    <th scope="col"
                      class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(student, index) in students" :key="index" class="hover:bg-gray-50">
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div class="flex items-center">
                        <input type="checkbox" :value="student.id" v-model="selectedStudents"
                          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {{ student.nis }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {{ student.namaLengkap }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {{ student.email }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      <img :src="student.photo" alt="Profile" class="h-10 w-10 rounded-full object-cover">
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {{ student.noHp }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {{ student.semester }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm">
                      <button @click="addNilai(student)"
                        class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Isi Nilai
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>