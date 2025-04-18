<script setup>
import SelectField from "@/components/widgets/Select";
import { showErrorToast, showSuccessToast } from "@/helpers/alert.js";
import {
  useAdminClassStore,
  useAdminSubjectStore,
  useAdminTeacherStore,
  useAdminSubjectHourStore,
  useAdminSubjectScheduleStore
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
  ref,
  onMounted
} from "vue";

const classStore = useAdminClassStore();
const subjectStore = useAdminSubjectStore();
const teacherStore = useAdminTeacherStore();
const subjectHourStore = useAdminSubjectHourStore();
const subjectScheduleStore = useAdminSubjectScheduleStore();
const emits = defineEmits(["refresh", "close"]);

const selectedDate = ref(null);

const props = defineProps({
  classHistory: {
    type: Object,
    default: () => null
  }
});

const statusOptions = computed(() => [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
]);

const formModel = reactive({
  class_id: "",
  subject_id: "",
  teacher_id: "",
  subject_hour_id: "",
  day: "",
});

const classOptions = computed(() => {
  return classStore?.classes?.data?.map(item => ({
    label: item.name,
    value: item.id
  })) || [];
});

const subjectOptions = computed(() => {
  return subjectStore?.subject?.data?.data?.map(item => ({
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

const subjectHourOptions = computed(() => {
  return subjectHourStore?.subjectHour?.data?.data?.map(item => ({
    label: `${item.start_hour} | ${item.start_time} - ${item.end_time}`,
    value: item.id
  })) || [];
});

const rules = {
  class_id: { required },
  subject_id: { required },
  teacher_id: { required },
  subject_hour_id: { required },
  day: { required },
};

const v$ = useVuelidate(rules, formModel);

watch(() => props.class, (newValue) => {
  classStore.getClasses();
  subjectStore.getSubject();
  teacherStore.getTeachers();
  subjectHourStore.getSubjectHour();
  if (newValue) {
    formModel.id = newValue.id;
    formModel.student_id = newValue.student.id;
    formModel.class_id = newValue.class.id;
    formModel.study_year_id = newValue.study_year.id;
    formModel.previous_status = newValue.previous_status;
    formModel.new_status = newValue.new_status;
    formModel.entry_date = newValue.entry_date;
    selectedDate.value = newValue.entry_date;
  } else {
    Object.keys(formModel).forEach(key => formModel[key] = "");
    selectedDate.value = null;
  }
}, { immediate: true });

watch(selectedDate, (newValue) => {
  formModel.entry_date = newValue;
});

const saveSubjectSchedule = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showErrorToast("Periksa kembali inputan Anda.");
    return;
  }
  try {
    if (props.class) {
      await subjectScheduleStore.postSchedule(props.class, formModel);
      if (subjectScheduleStore.response.status === 200) {
        showSuccessToast("Schedule updated successfully!");
      } else {
        showErrorToast("Failed to update schedule.");
      }
    } else {
      await subjectScheduleStore.postSchedule(formModel);
      if (subjectScheduleStore.response.status === 200) {
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
  saveSubjectSchedule
});

onMounted(async () => {
  await classStore.getClasses();
  await subjectStore.getSubject();
  await teacherStore.getTeachers();
  await subjectHourStore.getSubjectHour();
});
</script>

<template>
  <div>
    <div class="mb-4">
      <SelectField v-model="formModel.class_id" label="Class" :options="classOptions" :key="classOptions.length"
        placeholder="Masukkan Class" />
      <div v-if="v$.class_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.class_id.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <SelectField v-model="formModel.subject_id" label="Subject" :options="subjectOptions" :key="subjectOptions.length"
        placeholder="Masukkan Subject" />
      <div v-if="v$.subject_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.subject_id.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <SelectField v-model="formModel.teacher_id" label="Teacher" :options="teacherOptions" :key="teacherOptions.length"
        placeholder="Masukkan Teacher" />
      <div v-if="v$.teacher_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.teacher_id.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <SelectField v-model="formModel.subject_hour_id" label="Subject Hour" :options="subjectHourOptions"
        :key="subjectHourOptions.length" placeholder="Masukkan Subject Hour" />
      <div v-if="v$.subject_hour_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.subject_hour_id.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <SelectField v-model="formModel.day" label="Day" :options="statusOptions" placeholder="Select Day" />
      <div v-if="v$.day.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.day.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

  </div>
</template>