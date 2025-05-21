<script setup>
import Layout from "@/layouts/main.vue";
</script>

<template>
  <Layout>
    <template #title>Data Nilai Siswa/i</template>
    <div class="w-full mx-auto p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
      <div class="w-full">
        <div class="mb-8 flex items-center justify-between gap-8">
          <div>
            <h6 class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-current">
              List Nilai
            </h6>
            <p class="font-sans antialiased text-base text-current mt-1">
              Lihat Informasi nilai berdasarkan mata pelajaran
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
            data-orientation="horizontal">
            <div class="relative w-full md:w-72">
              <!-- <InputField v-model="studentStore.searchQuery" placeholder="Search..." name="search"
                v-debounce:500="searchData" /> -->
            </div>
          </div>
          <div class="w-full md:w-72 flex justify-end">
            <!-- Modal Form -->
            <!-- <Modal ref="userModalRef">
              <template #title>
                <h1 class="text-xl font-bold">{{ userModalTitle }}</h1>
              </template>
              <template #body>
                <FormUser ref="formUserRef" :user="selectedUser" @refresh="getRegistrations" @close="closeUserModal" />
              </template>
              <template #footer>
                <div class="flex justify-end gap-2">
                  <Button @click="closeUserModal" variant="outline" color="secondary">
                    Close
                  </Button>
                  <Button @click="submitUserModal" variant="solid" color="primary">
                    Submit
                  </Button>
                </div>
              </template>
            </Modal> -->
          </div>
        </div>
        <div class="mt-4 w-full overflow-hidden rounded-lg border border-gray-200">
          <table class="w-full">
            <thead class="border-b border-gray-200 bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-900">
              <tr>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Name
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Jenis Biaya
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Total
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Tahun Ajaran
                  </small>
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <small
                    class="font-sans antialiased text-sm text-current flex items-center justify-between gap-2 opacity-70">
                    Actions
                  </small>
                </th>
              </tr>
            </thead>
            <tbody class="group text-sm text-gray-800 dark:text-white">
              <tr class="border-b border-gray-200 last:border-0" v-for="row in rows" :key="row.id">
                <td class="p-3">
                  <small class="font-sans antialiased text-sm font-medium text-current">
                    {{ row.name }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm font-medium text-current">
                    {{ row.jenis_biaya }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    {{ formatRupiah(row.total) }}
                  </small>
                </td>
                <td class="p-3">
                  <small class="font-sans antialiased text-sm text-current">
                    Semester {{ row.study_year?.semester }} - {{ row.study_year?.year }}
                  </small>
                </td>
                <td class="p-3">
                  <div class="flex gap-2 justify-start">
                    <Button @click="openClassModal('edit', row.id)" variant="outline" color="secondary">
                      Edit
                    </Button>
                    <Button @click="deleteUser(row.id)" variant="outline" color="error">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="flex items-center justify-between border-gray-200 py-4">
          <small class="font-sans antialiased text-sm text-current">
            Page {{ studentStore.students?.current_page || 1 }} of {{ studentStore.students?.last_page || 1 }}
          </small>
          <div class="flex gap-2">
            <Button variant="outline" color="secondary" :disabled="!studentStore.students?.prev_page_url"
              @click="paginate(studentStore.students?.current_page - 1)">
              Previous
            </Button>
            <Button variant="outline" color="secondary" :disabled="!studentStore.students?.next_page_url"
              @click="paginate(studentStore.students?.current_page + 1)">
              Next
            </Button>
          </div>
        </div> -->
      </div>
    </div>
  </Layout>
</template>