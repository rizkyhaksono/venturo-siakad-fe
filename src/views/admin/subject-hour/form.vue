<script setup>
import InputField from "@/components/widgets/Input";
import { showErrorToast, showSuccessToast } from "@/helpers/alert.js";
import { useAdminSubjectHourStore } from "@/state/pinia";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { defineEmits, defineExpose, defineProps, reactive, watch } from "vue";

const subjectHourStore = useAdminSubjectHourStore();
const emits = defineEmits(["refresh", "close"]);

const props = defineProps({
  subjectHour: {
    type: Object,
    default: () => null
  }
});

const formModel = reactive({
  start_hour: "",
  start_time: "",
  end_time: ""
});

const rules = {
  start_hour: { required },
  start_time: { required },
  end_time: { required },
};

const v$ = useVuelidate(rules, formModel);

watch(() => props.subjectHour, (newValue) => {
  if (newValue) {
    formModel.id = newValue.id;
    formModel.start_hour = newValue.start_hour;
    formModel.start_time = newValue.start_time;
    formModel.end_time = newValue.end_time;
  } else {
    formModel.id = null;
    formModel.start_hour = "";
    formModel.start_time = "";
    formModel.end_time = "";
  }
}, { immediate: true });

const saveSubjectHour = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showErrorToast("Periksa kembali inputan Anda.");
    return;
  }
  try {
    if (formModel.id) {
      await subjectHourStore.updateSubjectHour(formModel.id, formModel);
      if (subjectHourStore.response.status === 200) {
        showSuccessToast("Subject hour updated successfully!");
      } else {
        showErrorToast("Failed to update subject hour.");
      }
    } else {
      await subjectHourStore.postSubjectHour(formModel);
      showSuccessToast("Subject hour added successfully!");
    }
    emits("refresh");
    emits("close");
  } catch (error) {
    console.error(error);
    showErrorToast("Terjadi kesalahan saat menyimpan user.");
  }
};

defineExpose({
  saveSubjectHour
});
</script>

<template>
  <div>
    <div class="mb-4">
      <InputField v-model="formModel.start_hour" label="Jam ke" type="text" placeholder="Masukkan Jam ke" />
      <div v-if="v$.start_hour.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.start_hour.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <InputField v-model="formModel.start_time" label="Jam Mulai" type="time" placeholder="Masukkan Jam Mulai" />
      <div v-if="v$.start_time.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.start_time.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <InputField v-model="formModel.end_time" label="Jam Selesai" type="time" placeholder="Masukkan Jam Selesai" />
      <div v-if="v$.end_time.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.end_time.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>
  </div>
</template>