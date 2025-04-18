<script setup>
import SelectField from "@/components/widgets/Select";
import { showErrorToast, showSuccessToast } from "@/helpers/alert.js";
import {
  useAdminHomeroomTeacherStore,
  useAdminTeacherStore,
  useAdminClassStore,
  useAdminStudyYearStore,
} from "@/state/pinia";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import {
  defineEmits,
  defineExpose,
  defineProps,
  reactive,
  watch,
  computed,
  onMounted
} from "vue";

const homeroomTeacherStore = useAdminHomeroomTeacherStore();
const classStore = useAdminClassStore();
const teacherStore = useAdminTeacherStore();
const studyYearStore = useAdminStudyYearStore();
const emits = defineEmits(["refresh", "close"]);

const props = defineProps({
  classHistory: {
    type: Object,
    default: () => null
  }
});

const semesterOption = computed(() => [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
]);

const formModel = reactive({
  teacher_id: "",
  class_id: "",
  study_year_id: "",
  semester: ""
});

const classOptions = computed(() => {
  return classStore?.classes?.data?.map(item => ({
    label: item.name,
    value: item.id
  })) || [];
});

const teacherOptions = computed(() => {
  return teacherStore?.teachers?.data?.data?.map(item => ({
    label: `${item.name} - ${item.user.email}`,
    value: item.id
  })) || [];
});

const studyYearOptions = computed(() => {
  return studyYearStore?.studyYears?.data?.data?.map(item => ({
    label: `${item.year} - Semester ${item.semester}`,
    value: item.id
  })) || [];
});

const rules = {
  teacher_id: { required },
  class_id: { required },
  study_year_id: { required },
  semester: { required }
};

const v$ = useVuelidate(rules, formModel);

watch(() => props.class, (newValue) => {
  classStore.getClasses();
  teacherStore.getTeachers();
  studyYearStore.getStudyYears();
  if (newValue) {
    formModel.class_id = newValue.class.id;
    formModel.teacher_id = newValue.teacher.id;
    formModel.study_year_id = newValue.study_year.id;
    formModel.semester = newValue.semester;
  } else {
    formModel.class_id = "";
    formModel.teacher_id = "";
    formModel.study_year_id = "";
    formModel.semester = "";
  }
}, { immediate: true });

const saveHomeroomTeacher = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showErrorToast("Periksa kembali inputan Anda.");
    return;
  }
  try {
    if (props.homeroomTeacher) {
      await homeroomTeacherStore.updateHomeroomTeacher(props.homeroomTeacher, formModel);
      if (homeroomTeacherStore.response.status === 200) {
        showSuccessToast("Schedule updated successfully!");
      } else {
        showErrorToast("Failed to update schedule.");
      }
    } else {
      await homeroomTeacherStore.postHomeroomTeacher(formModel);
      if (homeroomTeacherStore.response.status === 200) {
        showSuccessToast("Schedule added successfully!");
      } else {
        showErrorToast("Failed to add schedule.");
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
  saveHomeroomTeacher
});

onMounted(async () => {
  await classStore.getClasses();
  await teacherStore.getTeachers();
  await studyYearStore.getStudyYears();
});
</script>

<template>
  <div>
    <div class="mb-4">
      <SelectField v-model="formModel.teacher_id" label="Teacher" :options="teacherOptions" :key="teacherOptions.length"
        placeholder="Masukkan Teacher" />
      <div v-if="v$.teacher_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.teacher_id.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <SelectField v-model="formModel.class_id" label="Class" :options="classOptions" :key="classOptions.length"
        placeholder="Masukkan Class" />
      <div v-if="v$.class_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.class_id.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <SelectField v-model="formModel.study_year_id" label="Study Year" :options="studyYearOptions"
        :key="studyYearOptions.length" placeholder="Masukkan Study Year" />
      <div v-if="v$.study_year_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.study_year_id.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <SelectField v-model="formModel.semester" label="Semester" :options="semesterOption"
        placeholder="Select Semester" />
      <div v-if="v$.semester.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.semester.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

  </div>
</template>