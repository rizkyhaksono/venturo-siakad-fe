<script setup>
import { reactive, watch, defineEmits, defineProps, defineExpose } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useAdminUserRoleStore } from "@/state/pinia";
import InputField from "@/components/widgets/Input";
import { showSuccessToast, showErrorToast } from "@/helpers/alert.js";

const userRoleStore = useAdminUserRoleStore();
const emits = defineEmits(["refresh", "close"]);
const props = defineProps({
    user: Object
});

const formModel = reactive({
    name: "",
    access: [],
});

const rules = {
    name: { required },
    access: { required },
};

const v$ = useVuelidate(rules, formModel);

watch(() => props.user, (newUserRole) => {
    if (newUserRole) {
        formModel.name = newUserRole.name;
        formModel.access = newUserRole.access || [];
    } else {
        formModel.name = "";
        formModel.access = [];
    }
}, { immediate: true });

const saveUserRole = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) {
        showErrorToast("Periksa kembali inputan Anda.");
        return;
    }
    try {
        const payload = {
            name: formModel.name,
            access: formModel.access.split(",").map((item) => item.trim()),
        };

        if (props.user?.id) {
            await userRoleStore.updateRole(props.user.id, payload);
            showSuccessToast("User role updated successfully!");
        } else {
            await userRoleStore.postRole(payload);
            showSuccessToast("User role added successfully!");
        }
        emits("refresh");
        emits("close");
    } catch (error) {
        console.error(error);
        showErrorToast("Terjadi kesalahan saat menyimpan user.");
    }
};

defineExpose({
    saveUserRole
});
</script>

<template>
    <div>
        <div class="mb-4">
            <InputField v-model="formModel.name" label="Nama" type="text" placeholder="Masukkan Nama" />
            <div v-if="v$.name.$error" class="text-red-500 text-xs">
                <span v-for="(err, index) in v$.name.$errors" :key="index">{{ err.$message }}</span>
            </div>
        </div>

        <div class="mb-4">
            <InputField v-model="formModel.access" label="Access" type="text" placeholder="Masukkan Access" />
            <div class="text-sm text-gray-500 mt-1">
                Format: test.view, test.update
            </div>
            <div v-if="v$.access.$error" class="text-red-500 text-xs">
                <span v-for="(err, index) in v$.access.$errors" :key="index">{{ err.$message }}</span>
            </div>
        </div>
    </div>
</template>
