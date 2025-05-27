<script setup>
import { ref, onMounted } from 'vue';
import Layout from "@/layouts/main.vue";

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
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Add Nilai Siswa/i</h5>
        </div>
        <div class="card-body">
          <!-- Filter Section -->
          <div class="row mb-4">
            <div class="col-md-4">
              <div class="form-group row mb-2">
                <label class="col-sm-4 col-form-label">Kelas :</label>
                <div class="col-sm-8">
                  <select class="form-select" v-model="filters.kelas">
                    <option value="" disabled selected>Pilih Kelas</option>
                    <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id">
                      {{ kelas.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Tahun Ajaran :</label>
                <div class="col-sm-8">
                  <select class="form-select" v-model="filters.tahunAjaran">
                    <option value="" disabled selected>Pilih Tahun Ajaran</option>
                    <option v-for="tahun in tahunAjaranList" :key="tahun.id" :value="tahun.id">
                      {{ tahun.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group row mb-2">
                <label class="col-sm-4 col-form-label">Nama :</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="filters.nama" placeholder="Contoh : A">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Wali Kelas :</label>
                <div class="col-sm-8">
                  <select class="form-select" v-model="filters.waliKelas">
                    <option value="" disabled selected>Pilih Kelas</option>
                    <option v-for="wali in waliKelasList" :key="wali.id" :value="wali.id">
                      {{ wali.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Semester :</label>
                <div class="col-sm-8">
                  <select class="form-select" v-model="filters.semester">
                    <option value="" disabled selected>Pilih Semester</option>
                    <option v-for="semester in semesterList" :key="semester.id" :value="semester.id">
                      {{ semester.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Student Table -->
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h6 class="card-title">Siswa</h6>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th style="width: 40px">#</th>
                          <th>NIS</th>
                          <th>Nama Lengkap</th>
                          <th>Email</th>
                          <th>Photo</th>
                          <th>No. HP</th>
                          <th>Semester</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(student, index) in students" :key="index">
                          <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" :value="student.id"
                                v-model="selectedStudents">
                            </div>
                          </td>
                          <td>{{ student.nis }}</td>
                          <td>{{ student.namaLengkap }}</td>
                          <td>{{ student.email }}</td>
                          <td>
                            <img :src="student.photo" alt="Profile" class="img-thumbnail"
                              style="width: 40px; height: 40px;">
                          </td>
                          <td>{{ student.noHp }}</td>
                          <td>{{ student.semester }}</td>
                          <td>
                            <button class="btn btn-sm btn-primary" @click="addNilai(student)">Isi Nilai</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.card {
  margin-bottom: 20px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.card-header {
  background-color: #f8f9fa;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.table th {
  vertical-align: middle;
  background-color: #f8f9fa;
}

.card-title {
  margin-bottom: 0;
  font-weight: 500;
}
</style>