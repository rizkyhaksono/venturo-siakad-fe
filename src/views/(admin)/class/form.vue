<script setup>
import InputField from "@/components/widgets/Input";
import SelectField from "@/components/widgets/Select";
import { showErrorToast, showSuccessToast } from "@/helpers/alert.js";
import {
  useAdminClassStore,
  useAdminStudyYearStore
} from "@/state/pinia";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { defineEmits, defineExpose, defineProps, reactive, watch, computed } from "vue";

const classStore = useAdminClassStore();
const studyYearStore = useAdminStudyYearStore();
const emits = defineEmits(["refresh", "close"]);

const props = defineProps({
  class: {
    type: Object,
    default: () => null
  }
});

const formModel = reactive({
  name: "",
  study_year_id: "",
});

const studyYearOptions = computed(() => {
  return studyYearStore?.studyYears?.map(item => ({
    label: `${item.year} - Semester ${item.semester}`,
    value: item.id
  })) || [];
});

const rules = {
  name: { required },
  study_year_id: { required },
};

const v$ = useVuelidate(rules, formModel);

watch(() => props.class, (newValue) => {
  studyYearStore.getStudyYears();
  if (newValue) {
    formModel.name = newValue.name || "";
    formModel.study_year_id = newValue.study_year_id || "";
  } else {
    formModel.name = "";
    formModel.study_year_id = "";
  }
}, { immediate: true });

const saveClass = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showErrorToast("Periksa kembali inputan Anda.");
    return;
  }
  try {
    if (props.class) {
      await classStore.updateClass(props.class, formModel);
      if (classStore.response.status === 200) {
        showSuccessToast("Class updated successfully!");
      } else {
        showErrorToast("Failed to update Class.");
      }
    } else {
      await classStore.postClass(formModel);
      if (classStore.response.status === 201) {
        showSuccessToast("Class added successfully!");
      } else {
        showErrorToast("Failed to add Class.");
      }
    }
    emits("refresh");
    emits("close");
  } catch (error) {
    console.error(error);
    showErrorToast("Terjadi kesalahan saat menyimpan class.");
  }
};

defineExpose({
  saveClass
});
</script>

<template>
  <div>
    <div class="mb-4">
      <InputField v-model="formModel.name" label="Nama Kelas" type="text" placeholder="Masukkan Nama Class" />
      <div v-if="v$.name.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.name.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <SelectField v-model="formModel.study_year_id" label="Tahun Ajaran" :options="studyYearOptions"
        :key="studyYearOptions.length" placeholder="Pilih Tahun Ajaran" />
      <div v-if="v$.study_year_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.study_year_id.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>
  </div>
</template>