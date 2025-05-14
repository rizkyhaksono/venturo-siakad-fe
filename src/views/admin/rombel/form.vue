<script setup>
import Layout from "@/layouts/main.vue";
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  useAdminStudentStore,
  useAdminSubjectScheduleStore,
  useAdminClassStore,
  useAdminStudyYearStore,
} from "@/state/pinia";

const router = useRouter()
const days = ref(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'])
const activeTab = ref('jadwal')
const form = ref({
  kelas: '',
  nama: '',
  semester: '',
  tahunAjaran: '',
  waliKelas: ''
})
const schedule = ref({})
const students = ref([])
const classes = ref([])

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const save = () => {
  console.log('Form data:', form.value)
  console.log('Schedule:', schedule.value)
}

const getClasses = async () => {
  const classStore = useAdminClassStore()
  await classStore.getClasses()
  classes.value = classStore.classes
}

const getStudyYears = async () => {
  const studyYearStore = useAdminStudyYearStore()
  await studyYearStore.getStudyYears()
  return studyYearStore.studyYears
}

const getStudents = async () => {
  const studentStore = useAdminStudentStore()
  await studentStore.getStudents()
  students.value = studentStore.students
}

const getSubjects = async () => {
  const subjectScheduleStore = useAdminSubjectScheduleStore()
  await subjectScheduleStore.getSubjects()
  return subjectScheduleStore.subjects
}

onMounted(async () => {
  await getClasses()
  await getStudyYears()
  await getStudents()
  await getSubjects()
})
</script>

<template>
  <Layout>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900 p-4">
      <h2 class="text-xl font-bold mb-4">Add Rombongan Belajar</h2>

      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="flex items-center">
          <label class="w-32">Kelas:</label>
          <select v-model="form.kelas" class="border rounded px-2 py-1 w-full">
            <option value="">Pilih Kelas</option>
            <option v-for="kelas in getClasses()" :key="kelas.id" :value="kelas.id">
              {{ kelas.name }}
            </option>
          </select>
        </div>

        <div class="flex items-center">
          <label class="w-32">Nama:</label>
          <input type="text" v-model="form.nama" placeholder="Contoh: A" class="border rounded px-2 py-1 w-full">
        </div>

        <div class="flex items-center">
          <label class="w-32">Semester:</label>
          <select v-model="form.semester" class="border rounded px-2 py-1 w-full">
            <option value="">Pilih Semester</option>
            <!-- Add options here -->
          </select>
        </div>

        <div class="flex items-center">
          <label class="w-32">Tahun Ajaran:</label>
          <select v-model="form.tahunAjaran" class="border rounded px-2 py-1 w-full">
            <option value="">Pilih Tahun Ajaran</option>
            <!-- Add options here -->
          </select>
        </div>

        <div class="flex items-center">
          <label class="w-32">Wali Kelas:</label>
          <select v-model="form.waliKelas" class="border rounded px-2 py-1 w-full">
            <option value="">Pilih Kelas</option>
            <!-- Add options here -->
          </select>
        </div>
      </div>

      <div class="border rounded">
        <div class="flex border-b">
          <button @click="setActiveTab('jadwal')" :class="[
            'px-4 py-2 font-medium text-sm',
            activeTab === 'jadwal'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          ]">
            Jadwal
          </button>
          <button @click="setActiveTab('siswa')" :class="[
            'px-4 py-2 font-medium text-sm',
            activeTab === 'siswa'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          ]">
            Siswa
          </button>
        </div>

        <div v-if="activeTab === 'jadwal'" class="animate-fade-in">
          <table class="w-full">
            <thead class="border-b border-gray-200 bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-900">
              <tr>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  Jam Ke-
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  {{ day }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="hour in 8" :key="hour">
                <td class="border p-2 text-center">{{ hour }}</td>
                <td v-for="day in days" :key="day" class="border p-2">
                  <select v-model="schedule[`${hour}-${day}`]" class="w-full">
                    <option value="">Pilih Mata Pelajaran</option>
                    <!-- Add options here -->
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Siswa Tab -->
        <div v-if="activeTab === 'siswa'" class="animate-fade-in">
          <table class="w-full">
            <thead class="border-b border-gray-200 bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-900">
              <tr>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <input type="checkbox" class="w-4 h-4">
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  NIS
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  Nama Siswa
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  Jenis Kelamin
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in students" :key="index" class="border-b">
                <td class="p-2">{{ student?.nis || '-' }}</td>
                <td class="p-2">{{ student?.name || '-' }}</td>
                <td class="p-2">{{ student?.gender || '-' }}</td>
                <td class="p-2">
                  <button class="text-red-600 hover:text-red-800">
                    Remove
                  </button>
                </td>
              </tr>
              <tr v-if="!students.length">
                <td colspan="4" class="text-center p-4 text-sm font-medium text-gray-600 dark:bg-gray-900">
                  No students added yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <router-link :to="{ name: 'rombe' }">
          <button class="px-4 py-2 border rounded" @click="cancel">Batal</button>
        </router-link>
        <button class="px-4 py-2 bg-blue-600 text-white rounded" @click="save">Simpan</button>
      </div>
    </div>
  </Layout>
</template>