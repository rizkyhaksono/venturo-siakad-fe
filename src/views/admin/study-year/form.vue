<script setup>
import InputField from "@/components/widgets/Input";
import { showErrorToast, showSuccessToast } from "@/helpers/alert.js";
import { useAdminStudyYearStore } from "@/state/pinia";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { defineEmits, defineExpose, defineProps, reactive, watch } from "vue";

const studyYearStore = useAdminStudyYearStore();
const emits = defineEmits(["refresh", "close"]);
const props = defineProps({
  studyYear: Object
});

const formModel = reactive({
  year: "",
  semester: "",
});

const rules = {
  year: { required },
  semester: { required },
};

const v$ = useVuelidate(rules, formModel);

watch(() => props.studyYear, (newStudyYear) => {
  if (newStudyYear) {
    formModel.year = newStudyYear.year;
    formModel.semester = newStudyYear.semester;
  } else {
    formModel.year = "";
    formModel.semester = "";
  }
}, { immediate: true });

const saveStudyYear = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showErrorToast("Please check your input.");
    return;
  }
  try {
    if (props.studyYear?.id) {
      await studyYearStore.updateStudyYear(props.studyYear.id, formModel);
      showSuccessToast("Study year updated successfully!");
    } else {
      await studyYearStore.postStudyYear(formModel);
      showSuccessToast("Study year added successfully!");
    }
    emits("refresh");
    emits("close");
  } catch (error) {
    console.error(error);
    showErrorToast("An error occurred while saving the study year.");
  }
};

defineExpose({
  saveStudyYear
});
</script>

<template>
  <div>
    <div class="mb-4">
      <InputField v-model="formModel.year" label="Year" type="text" placeholder="Enter year" />
      <div v-if="v$.year.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.year.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <InputField v-model="formModel.semester" label="Semester" type="text" placeholder="Enter semester" />
      <div v-if="v$.semester.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.semester.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>
  </div>
</template>