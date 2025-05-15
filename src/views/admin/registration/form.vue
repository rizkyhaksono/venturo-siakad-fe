<script setup>
import SelectField from "@/components/widgets/Select";
import { showErrorToast, showSuccessToast } from "@/helpers/alert.js";
import { useAdminRegistrationStore } from "@/state/pinia";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { defineEmits, defineExpose, defineProps, reactive, watch } from "vue";

const registrationStore = useAdminRegistrationStore();
const emits = defineEmits(["refresh", "close"]);
const props = defineProps({
  user: Object
});

const formModel = reactive({
  status: "",
  assigned_to: "",
});

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" }
];

const assignedToOptions = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" }
];

const rules = {
  status: {
    required,
    validStatus: (value) => statusOptions.map(opt => opt.value).includes(value)
  },
  assigned_to: {
    required,
    validAssignedTo: (value) => assignedToOptions.map(opt => opt.value).includes(value)
  },
};

const v$ = useVuelidate(rules, formModel);

watch(() => props.user, (newUser) => {
  if (newUser) {
    formModel.status = newUser.status;
    formModel.assigned_to = newUser.assigned_to;
  } else {
    formModel.status = "";
    formModel.assigned_to = "";
  }
}, { immediate: true });

const saveRegistration = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showErrorToast("Please check your input.");
    return;
  }
  try {
    await registrationStore.updateStatusRegistration(props.user.id, formModel).then(() => {
      showSuccessToast("Registration status updated successfully.");
    })
    emits("refresh");
    emits("close");
  } catch (error) {
    console.error(error);
    showErrorToast("An error occurred while updating the registration status.");
  }
};

defineExpose({
  saveRegistration
});
</script>

<template>
  <div class="mb-4">
    <SelectField v-model="formModel.status" :options="statusOptions" label="Status" placeholder="Select status"
      :errors="v$.status.$errors.map(err => err.$message)" />
  </div>

  <div class="mb-4">
    <SelectField v-model="formModel.assigned_to" :options="assignedToOptions" label="Assigned To"
      placeholder="Select assigned to" :errors="v$.assigned_to.$errors.map(err => err.$message)" />
  </div>
</template>