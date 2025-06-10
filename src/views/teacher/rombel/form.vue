<script setup>
import Layout from "@/layouts/main.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

console.log('Rombel ID:', id);
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