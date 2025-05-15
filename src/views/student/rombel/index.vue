<script setup>
import Layout from "@/layouts/main.vue";
</script>

<template>
  <Layout>
    <div class="rombel-container p-3">
      <div class="card shadow-sm">
        <div class="card-body">
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div v-else-if="rombelData" class="rombel-info">
            <div class="row mb-4 bg-light rounded p-3">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="text-muted small">Kelas</label>
                  <h5 class="mb-0">{{ rombelData.kelas }}</h5>
                </div>
                <div>
                  <label class="text-muted small">Tahun Ajaran</label>
                  <h5 class="mb-0">{{ rombelData.tahun_ajaran }}</h5>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="text-muted small">Wali Kelas</label>
                  <h5 class="mb-0">{{ rombelData.wali_kelas }}</h5>
                </div>
                <div>
                  <label class="text-muted small">Jumlah Siswa</label>
                  <h5 class="mb-0">{{ rombelData.jumlah_siswa }} Siswa</h5>
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-hover">
                <thead class="table-light">
                  <tr>
                    <th class="text-center" width="70">No</th>
                    <th>Mata Pelajaran</th>
                    <th>Guru Pengajar</th>
                    <th>Jadwal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(mapel, index) in rombelData.mata_pelajaran" :key="index">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ mapel.nama }}</td>
                    <td>{{ mapel.guru }}</td>
                    <td>{{ mapel.jadwal }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-else class="alert alert-info d-flex align-items-center" role="alert">
            <i class="bi bi-info-circle me-2"></i>
            <span>Anda belum terdaftar dalam rombel</span>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>