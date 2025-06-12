<script setup>
import Layout from "@/layouts/main.vue";
import { useRoute } from 'vue-router';
import {
  useTeacherRombelStore,
  useTeacherStudentAssesment
} from "@/state/pinia";
import { onMounted, ref } from "vue";

const route = useRoute();
const id = route.params.id;

const teacherRombelStore = useTeacherRombelStore();
const teacherStudentAssesment = useTeacherStudentAssesment();

const rombel = ref(null);
const studentAssesment = ref(null);

const fetchRombelById = async (id) => {
  rombel.value = await teacherRombelStore.getRombelById(id);
}

const fetchStudentAssesmentByRombelName = async (rombelName) => {
  studentAssesment.value = await teacherStudentAssesment.getStudentAssesmentByRombelName(rombelName);
}

onMounted(async () => {
  if (id) await fetchRombelById(id);
  if (rombel.value) await fetchStudentAssesmentByRombelName(rombel.value.name);
});
</script>

<template>
  <Layout>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Rombel Form</h1>
      <p>This is the form for managing Rombel data.</p>
      <div v-if="id" class="text-gray-600 mb-4">ID: {{ id }}</div>
      <!-- Add your form elements here -->
    </div>
  </Layout>
</template>