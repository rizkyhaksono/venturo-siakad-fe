<script setup>
import Layout from "@/layouts/main.vue";
</script>

<template>
  <Layout>
    <div class="settings-page">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Settings</h4>
      </div>
      <div class="card-body">
        <div class="settings-section">
          <h5>General Settings</h5>
          <div class="form-group mb-3">
            <label>Site Name</label>
            <input 
              type="text" 
              class="form-control"
              placeholder="Enter site name"
            >
          </div>
          
          <div class="form-group mb-3">
            <label>Email Contact</label>
            <input 
              type="email" 
              class="form-control"
              placeholder="Enter contact email"
            >
          </div>

          <div class="form-group mb-3">
            <label>Maintenance Mode</label>
            <div class="form-check">
              <input 
                type="checkbox" 
                class="form-check-input"
              >
              <label class="form-check-label">Enable maintenance mode</label>
            </div>
          </div>
        </div>

        <button  class="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  </div>
  </Layout>
</template>