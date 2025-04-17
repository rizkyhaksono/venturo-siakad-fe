<script setup>
import InputField from "@/components/widgets/Input";
import SelectField from "@/components/widgets/Select";
import { showErrorToast, showSuccessToast } from "@/helpers/alert.js";
import {
  useAdminSubjectStore,
  useAdminClassStore,
  useAdminStudyYearStore,
  useAdminTeacherStore,
} from "@/state/pinia";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { defineEmits, defineExpose, defineProps, reactive, watch, computed, onMounted } from "vue";

const subjectStore = useAdminSubjectStore();
const classStore = useAdminClassStore();
const studyYearStore = useAdminStudyYearStore();
const teacherStore = useAdminTeacherStore();
const emits = defineEmits(["refresh", "close"]);

const props = defineProps({
  subject: {
    type: Object,
    default: () => null
  }
});

const formModel = reactive({
  name: "",
  study_year_id: "",
  class_id: "",
  teacher_id: "",
});

const studyYearOptions = computed(() => {
  return studyYearStore?.studyYears?.data?.data?.map(item => ({
    label: `${item.year} - Semester ${item.semester}`,
    value: item.id
  })) || [];
});

const teacherOptions = computed(() => {
  return teacherStore?.teachers?.data?.data?.map(item => ({
    label: item.name,
    value: item.id
  })) || [];
});

const classOptions = computed(() => {
  return classStore?.classes?.data?.map(item => ({
    label: item.name,
    value: item.id
  })) || [];
});

const rules = {
  name: { required },
  study_year_id: { required },
  class_id: { required },
  teacher_id: { required },
};

const v$ = useVuelidate(rules, formModel);

watch(() => props.class, (newValue) => {
  studyYearStore.getStudyYears();
  teacherStore.getTeachers();
  classStore.getClasses();
  if (newValue) {
    formModel.name = newValue.name || "";
    formModel.study_year_id = newValue.study_year_id || "";
    formModel.class_id = newValue.class_id || "";
    formModel.teacher_id = newValue.teacher_id || "";
  } else {
    formModel.name = "";
    formModel.study_year_id = "";
    formModel.class_id = "";
    formModel.teacher_id = "";
  }
}, { immediate: true });

const saveSubject = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showErrorToast("Periksa kembali inputan Anda.");
    return;
  }
  try {
    if (props.class) {
      await subjectStore.updateSubject(props.class, formModel);
      if (classStore.response.status === 200) {
        showSuccessToast("Subject updated successfully!");
      } else {
        showErrorToast("Failed to update subject.");
      }
    } else {
      await subjectStore.postSubject(formModel);
      if (classStore.response.status === 204) {
        showSuccessToast("Subject added successfully!");
      } else {
        showErrorToast("Failed to add subject.");
      }
    }
    emits("refresh");
    emits("close");
  } catch (error) {
    console.error(error);
    showErrorToast("Terjadi kesalahan saat menyimpan subject.");
  }
};

defineExpose({
  saveSubject
});

onMounted(async () => {
  await studyYearStore.getStudyYears();
  await teacherStore.getTeachers();
  await classStore.getClasses();
})
</script>

<template>
  <div>
    <div class="mb-4">
      <InputField v-model="formModel.name" label="Nama Subject" type="text" placeholder="Masukkan Nama Subject" />
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

    <div class="mb-4">
      <SelectField v-model="formModel.class_id" label="Class" :options="classOptions" :key="classOptions.length"
        placeholder="Pilih Class" />
      <div v-if="v$.class_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.class_id.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <SelectField v-model="formModel.teacher_id" label="Teacher" :options="teacherOptions" :key="teacherOptions.length"
        placeholder="Pilih Teacber" />
      <div v-if="v$.teacher_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.teacher_id.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>
  </div>
</template>