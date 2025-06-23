<script setup>
import SelectField from "@/components/widgets/Select";
import DatePicker from "@/components/widgets/DatePicker.vue";
import { showErrorToast, showSuccessToast } from "@/helpers/alert.js";
import {
  useAdminStudentStore,
  useAdminClassStore,
  useAdminClassHistoryStore,
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
  ref,
  onMounted
} from "vue";

const studentStore = useAdminStudentStore();
const classStore = useAdminClassStore();
const classHistoryStore = useAdminClassHistoryStore();
const studyYearStore = useAdminStudyYearStore();
const emits = defineEmits(["refresh", "close"]);

const selectedDate = ref(null);

const props = defineProps({
  classHistory: {
    type: Object,
    default: () => null
  }
});

const statusOptions = computed(() => [
  { label: 'Entered', value: 'entered' },
  { label: 'Promoted', value: 'promoted' },
  { label: 'Transferred', value: 'transferred' }
]);

const formModel = reactive({
  student_id: "",
  class_id: "",
  study_year_id: "",
  previous_status: "",
  new_status: "",
  entry_date: ""
});

const studyYearOptions = computed(() => {
  return studyYearStore?.studyYears.map(item => ({
    label: `${item.year} - Semester ${item.semester}`,
    value: item.id
  })) || [];
});

const studentOptions = computed(() => {
  return studentStore?.students.map(item => ({
    label: `${item.student_number} - ${item.name} - ${item.user.email}`,
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
  student_id: { required },
  class_id: { required },
  study_year_id: { required },
  previous_status: { required },
  new_status: { required },
  entry_date: { required }
};

const v$ = useVuelidate(rules, formModel);

watch(() => props.class, (newValue) => {
  studyYearStore.getStudyYears();
  studentStore.getStudents();
  classStore.getClasses();
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

const saveClassHistory = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    showErrorToast("Periksa kembali inputan Anda.");
    return;
  }
  try {
    if (props.class) {
      await classHistoryStore.updateClassHistory(props.class, formModel);
      if (classHistoryStore.response.status === 200) {
        showSuccessToast("Class updated successfully!");
      } else {
        showErrorToast("Failed to update Class.");
      }
    } else {
      await classHistoryStore.postClassHstory(formModel);
      if (classHistoryStore.response.message === 201) {
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
  saveClassHistory
});

onMounted(async () => {
  await Promise.all([
    studyYearStore.getStudyYears(),
    studentStore.getStudents(),
    classStore.getClasses()
  ]);
});
</script>

<template>
  <div>
    <div class="mb-4">
      <SelectField v-model="formModel.student_id" label="Student" :options="studentOptions" :key="studentOptions.length"
        placeholder="Masukkan Student" />
      <div v-if="v$.student_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.student_id.$errors" :key="index">{{ err.$message }}</span>
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
      <SelectField v-model="formModel.study_year_id" label="Tahun Ajaran" :options="studyYearOptions"
        :key="studyYearOptions.length" placeholder="Pilih Tahun Ajaran" />
      <div v-if="v$.study_year_id.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.study_year_id.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <SelectField v-model="formModel.previous_status" label="Previous Status" :options="statusOptions"
        placeholder="Select Previous Status" />
      <div v-if="v$.previous_status.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.previous_status.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <SelectField v-model="formModel.new_status" label="New Status" :options="statusOptions"
        placeholder="Select New Status" />
      <div v-if="v$.new_status.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.new_status.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

    <div class="mb-4">
      <DatePicker v-model="selectedDate" label="Tanggal Masuk" placeholder="Pilih tanggal masuk"
        :modelValue="formModel.entry_date" @update:modelValue="date => formModel.entry_date = date" />
      <div v-if="v$.entry_date.$error" class="text-red-500 text-xs">
        <span v-for="(err, index) in v$.entry_date.$errors" :key="index">{{ err.$message }}</span>
      </div>
    </div>

  </div>
</template>