<script setup>
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/Input";
import Modal from "@/components/widgets/Modal.vue";
import { showDeleteConfirmationDialog, showSuccessToast } from "@/helpers/alert.js";
import Layout from "@/layouts/main.vue";
import { useAdminUserStore } from "@/state/pinia";
import FormUser from "@/views/admin/user/form.vue";
import { onMounted, ref } from "vue";

const userStore = useAdminUserStore();
const rows = ref([]);
const userModalRef = ref(null);
const selectedUser = ref(null);
const userModalTitle = ref("");

const getUsers = async () => {
    await userStore.getUsers();
    rows.value = userStore.users || [];
};

const searchData = async () => {
    await userStore.changePage(1);
};

const paginate = async (page) => {
    await userStore.changePage(page);
    await getUsers();
};

const openUserModal = (mode, id = null) => {
    userModalRef.value.openModal();
    if (mode === "edit" && id) {
        selectedUser.value = rows.value.find((user) => user.id === id);
        userModalTitle.value = "Ubah User";
    } else {
        selectedUser.value = null;
        userModalTitle.value = "Tambah User";
    }
};
const formUserRef = ref(null);
const submitUserModal = () => {
    if (formUserRef.value) {
        formUserRef.value.saveUser();
    }
};

const closeUserModal = () => {
    userModalRef.value.closeModal();
};

const deleteUser = async (id) => {
    const confirmed = await showDeleteConfirmationDialog();
    if (confirmed) {
        try {
            await userStore.deleteUser(id);
            showSuccessToast("User berhasil dihapus");
            await getUsers();
        } catch (error) {
            console.error(error);
        }
    }
};

onMounted(() => {
    getUsers();
});
</script>

<template>
    <Layout>
        <template #title>User Data </template>
        <div
            class="w-full mx-auto p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900 transition-colors duration-200">
            <div class="w-full">
                <div class="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <h6
                            class="font-sans antialiased font-bold text-base md:text-lg lg:text-xl text-gray-800 dark:text-gray-100 transition-colors duration-200">
                            List User
                        </h6>
                        <p
                            class="font-sans antialiased text-base text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-200">
                            lihat informasi untuk semua user
                        </p>
                    </div>
                </div>
                <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div class="flex data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row gap-2"
                        data-orientation="horizontal">
                        <div class="relative w-full md:w-72">
                            <InputField v-model="userStore.searchQuery" placeholder="Search..." name="search"
                                v-debounce:500="searchData"
                                inputClass="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200" />
                        </div>
                    </div>
                    <div class="w-full md:w-72 flex justify-end">
                        <!-- Tombol trigger modal -->
                        <Button @click="openUserModal('add')" variant="solid" color="primary">
                            Tambah User
                        </Button>
                        <!-- Modal Form -->
                        <Modal ref="userModalRef">
                            <template #title>
                                <h1
                                    class="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
                                    {{ userModalTitle }}</h1>
                            </template>
                            <template #body>
                                <FormUser ref="formUserRef" :user="selectedUser" @refresh="getUsers"
                                    @close="closeUserModal" />
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
                        </Modal>
                    </div>
                </div>
                <div
                    class="mt-4 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                    <table class="w-full">
                        <thead
                            class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200">
                            <tr>
                                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                                    <small
                                        class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                                        User
                                    </small>
                                </th>
                                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                                    <small
                                        class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                                        Wali
                                    </small>
                                </th>
                                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                                    <small
                                        class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                                        Pekerjaan Wali
                                    </small>
                                </th>
                                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                                    <small
                                        class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                                        Tanggal Lahir
                                    </small>
                                </th>
                                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                                    <small
                                        class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                                        Alamat
                                    </small>
                                </th>
                                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                                    <small
                                        class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                                        Gender
                                    </small>
                                </th>
                                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                                    <small
                                        class="font-sans antialiased text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between gap-2 opacity-70 transition-colors duration-200">
                                        Action
                                    </small>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="group text-sm text-gray-800 dark:text-gray-200 transition-colors duration-200">
                            <template v-if="userStore.users && userStore.users.length > 0">
                                <tr class="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                    v-for="row in userStore.users" :key="row.id">
                                    <td class="p-3">
                                        <div class="flex items-center gap-3">
                                            <img :src="row.photo || '/default_photo.jpg'" :alt="row.name"
                                                class="inline-block object-cover object-center data-[shape=square]:rounded-none data-[shape=circular]:rounded-full data-[shape=rounded]:rounded-[current] w-8 h-8 rounded border border-gray-200 dark:border-gray-600"
                                                data-shape="circular" />
                                            <div class="flex flex-col">
                                                <small
                                                    class="font-sans antialiased text-sm text-gray-800 dark:text-gray-200 transition-colors duration-200">
                                                    {{ row.name }}
                                                </small>
                                                <small
                                                    class="font-sans antialiased text-sm text-gray-600 dark:text-gray-400 opacity-70 transition-colors duration-200">
                                                    {{ row.email }}
                                                </small>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-3">
                                        {{ row.wali }}
                                    </td>
                                    <td class="p-3">
                                        {{ row.pekerjaan }}
                                    </td>
                                    <td class="p-3">
                                        {{ row.birth_date }}
                                    </td>
                                    <td class="p-3">
                                        {{ row.address }}
                                    </td>
                                    <td class="p-3">
                                        {{ row.gender }}
                                    </td>
                                    <td class="p-3">
                                        <div class="flex gap-2 justify-start">
                                            <Button @click="openUserModal('edit', row.id)" variant="outline"
                                                color="secondary"
                                                class="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                                Edit
                                            </Button>
                                            <Button @click="deleteUser(row.id)" variant="outline" color="error"
                                                class="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                            <tr v-else>
                                <td colspan="7"
                                    class="border-b border-gray-200 dark:border-gray-700 last:border-0 ps-2 py-2 text-center text-gray-600 dark:text-gray-400 transition-colors duration-200">
                                    No results.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 py-4 mt-2 transition-colors duration-200">
                    <small
                        class="font-sans antialiased text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                        Page {{ userStore.totalPage != 0 ? userStore.current : userStore.totalPage }} of {{
                            userStore.totalPage
                        }}
                        (Total {{ userStore.totalData }})
                    </small>
                    <div class="flex gap-2">
                        <button
                            class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-200 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                            :disabled="userStore.current === 1" @click="paginate(userStore.current - 1)">
                            Previous
                        </button>
                        <button
                            class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-200 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm rounded-md py-1.5 px-3 shadow-sm hover:shadow bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                            :disabled="userStore.current >= Math.ceil(userStore.totalData / userStore.perpage)"
                            @click="paginate(userStore.current + 1)">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>