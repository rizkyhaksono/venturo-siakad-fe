<script setup>
import Layout from "@/layouts/main.vue";
import Button from "@/components/widgets/Button.vue";
import InputField from "@/components/widgets/Input";
import SelectField from "@/components/widgets/Select";
import { showErrorToast, showSuccessToast } from "@/helpers/alert.js";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { onMounted, ref, reactive, watch } from 'vue'
import { useRouter } from "vue-router";
import {
  useAdminStudentStore,
  useAdminSubjectScheduleStore,
  useAdminSubjectStore,
  useAdminClassStore,
  useAdminStudyYearStore,
  useAdminTeacherStore,
  useAdminRombelStore,
  useAdminSubjectHourStore
} from "@/state/pinia";

const router = useRouter();
const days = ref(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'])
const activeTab = ref('jadwal')
const selectedStudents = ref([])
const students = ref([])
const classes = ref([])
const studyYears = ref([])
const schedule = ref({})
const subjects = ref([])
const teachers = ref([])
const subjectHours = ref([])

const formModel = reactive({
  kelas: '',
  nama: '',
  tahunAjaran: '',
  waliKelas: '',
  mataPelajaranJadwal: {},
  student: {}
});

const rules = {
  kelas: { required },
  nama: { required },
  tahunAjaran: { required },
  waliKelas: { required },
  mataPelajaranJadwal: {
    required,
    $each: {
      required
    }
  },
  student: {
    required,
    $each: {
      required
    }
  }
};

const v$ = useVuelidate(rules, formModel, { $autoDirty: true });

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const toggleAllStudents = (event) => {
  if (event.target.checked) {
    selectedStudents.value = students.value.map(student => student.id)
  } else {
    selectedStudents.value = []
  }
}

const isAllSelected = () => {
  return students.value.length > 0 && selectedStudents.value.length === students.value.length
}

const save = async () => {
  try {
    if (selectedStudents.value.length === 0) {
      showErrorToast('Please select at least one student');
      return;
    }

    const dayTranslations = {
      'Senin': 'Monday',
      'Selasa': 'Tuesday',
      'Rabu': 'Wednesday',
      'Kamis': 'Thursday',
      'Jumat': 'Friday',
      'Sabtu': 'Saturday',
      'Minggu': 'Sunday'
    };

    const subjectScheduleStore = useAdminSubjectScheduleStore();
    const rombelStore = useAdminRombelStore();

    // Submit rombel data
    for (const studentId of selectedStudents.value) {
      await rombelStore.postRombel({
        kelas: formModel.kelas,
        nama: formModel.nama,
        tahunAjaran: formModel.tahunAjaran,
        waliKelas: formModel.waliKelas,
        mataPelajaranJadwal: schedule.value[studentId],
        student: studentId
      });
    }

    // Create sequential schedule submissions with delay
    for (const [key, value] of Object.entries(schedule.value)) {
      if (value && key.includes('-')) {
        const [hour, indonesianDay] = key.split('-');
        const subjectHour = subjectHours.value.find(sh => sh.hour === parseInt(hour));

        if (subjectHour) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
          await subjectScheduleStore.postSchedule({
            class_id: formModel.kelas,
            subject_id: value,
            teacher_id: formModel.waliKelas,
            subject_hour_id: subjectHour.value,
            day: dayTranslations[indonesianDay],
          });
        }
      }
    }

    showSuccessToast('Data saved successfully!');
    await router.replace({ name: 'admin-rombel' });
  } catch (error) {
    showErrorToast('Error saving data: ' + error.message);
  }
}

const getClasses = async () => {
  const classStore = useAdminClassStore()
  await classStore.getClasses()
  classes.value = (classStore.classes.data || []).map(classItem => ({
    value: classItem.id,
    label: `${classItem.name}`
  }));
}

const getStudyYears = async () => {
  const studyYearStore = useAdminStudyYearStore()
  await studyYearStore.getStudyYears()
  studyYears.value = (studyYearStore.studyYears || []).map(year => ({
    value: year.id,
    label: `${year.semester} - ${year.year}`,
    raw: year
  }));
}

const getStudents = async () => {
  const studentStore = useAdminStudentStore()
  await studentStore.getStudents()
  students.value = studentStore.students
}

const getSubjects = async () => {
  const subjectStore = useAdminSubjectStore()
  await subjectStore.getSubject()
  subjects.value = (subjectStore.subject.data || []).map(subject => ({
    value: subject.id,
    label: subject.name,
    raw: subject
  }));
}

const getSubjectHours = async () => {
  const subjectHourStore = useAdminSubjectHourStore()
  await subjectHourStore.getSubjectHour()
  subjectHours.value = subjectHourStore.subjectHour.data.map(hour => ({
    value: hour.id,
    label: `${hour.start_time.substring(0, 5)} - ${hour.end_time.substring(0, 5)}`,
    hour: hour.start_hour,
    raw: hour
  }));
}

const getTeachers = async () => {
  const teacherStore = useAdminTeacherStore()
  await teacherStore.getTeachers()
  teachers.value = (teacherStore.teachers || []).map(teacher => ({
    value: teacher.id,
    label: `${teacher.employee_number} - ${teacher.name}`,
    raw: teacher
  }));
}

watch(() => formModel.kelas, (newValue) => {
  if (newValue) {
    classes.value.find(c => c.value === newValue);
  }
});

onMounted(async () => {
  await getClasses()
  await getStudyYears()
  await getStudents()
  await getTeachers()
  await getSubjects()
  await getSubjectHours()
})
</script>

<template>
  <Layout>
    <div class="w-full mx-auto rounded-lg bg-gray-100 dark:bg-gray-900 p-4 text-sm text-gray-600">
      <h2 class="text-xl font-bold mb-4">Add Rombongan Belajar</h2>
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="flex items-center">
          <label for="kelas" class="w-32">Kelas:</label>
          <SelectField id="kelas" v-model="formModel.kelas" :options="classes" option-label="label" option-value="value"
            placeholder="Pilih Kelas" class="w-full" :errors="v$.kelas.$errors?.map(err => err.$message)" />
        </div>

        <div class="flex items-center">
          <label for="nama" class="w-24">Nama:</label>
          <InputField v-model="formModel.nama" type="text" placeholder="Masukkan Nama Kelas" class="w-full" />
        </div>

        <div class="flex items-center">
          <label for="semester" class="w-32">Semester:</label>
          <SelectField id="semester" v-model="formModel.tahunAjaran" :options="studyYears" option-label="label"
            option-value="value" placeholder="Pilih Semester" class="w-full"
            :errors="v$.tahunAjaran.$errors?.map(err => err.$message)" />
        </div>

        <div class="flex items-center">
          <label for="waliKelas" class="w-32">Wali Kelas:</label>
          <SelectField id="waliKelas" v-model="formModel.waliKelas" :options="teachers" option-label="label"
            option-value="value" placeholder="Pilih Wali Kelas" class="w-full"
            :errors="v$.waliKelas.$errors?.map(err => err.$message)" />
        </div>
      </div>

      <div class="border rounded">
        <div class="flex border-b">
          <button @click="setActiveTab('jadwal')" :class="[
            'px-4 py-2 font-medium text-sm',
            activeTab === 'jadwal'
              ? 'border-b-2 border-gray-600 text-gray-600 font-black'
              : 'text-gray-500 hover:text-gray-700'
          ]">
            Jadwal
          </button>
          <button @click="setActiveTab('siswa')" :class="[
            'px-4 py-2 font-medium text-sm',
            activeTab === 'siswa'
              ? 'border-b-2 border-gray-600 text-gray-600 font-black'
              : 'text-gray-500 hover:text-gray-700'
          ]">
            Siswa
          </button>
        </div>

        <div v-if="activeTab === 'jadwal'" class="animate-fade-in">
          <table class="w-full">
            <thead class="border-b border-gray-200 bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-900">
              <tr>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  Jam Ke-
                </th>
                <th v-for="day in days" :key="day" class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  {{ day }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="hour in 8" :key="hour">
                <td class="border p-2 text-center">{{ hour }}</td>
                <td v-for="day in days" :key="day" class="border">
                  <SelectField v-model="schedule[`${hour}-${day}`]" :options="subjects" option-label="label"
                    option-value="value" placeholder="Pilih Mata Pelajaran" class="w-full" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Siswa Tab -->
        <div v-if="activeTab === 'siswa'" class="animate-fade-in">
          <table class="w-full">
            <thead class="border-b border-gray-200 bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-900">
              <tr>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <input type="checkbox" class="w-4 h-4" :checked="isAllSelected()" @change="toggleAllStudents">
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  NIS
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  Nama Siswa
                </th>
                <th class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in students" :key="index" class="border-b">
                <td class="cursor-pointer px-2.5 py-2 text-start font-medium">
                  <input type="checkbox" class="w-4 h-4" v-model="selectedStudents" :value="student.id">
                </td>
                <td class="px-2.5 py-2">{{ student?.student_number || '-' }}</td>
                <td class="px-2.5 py-2">{{ student?.name || '-' }}</td>
                <td class="px-2.5 py-2">{{ student?.user.email || '-' }}</td>
              </tr>
              <tr v-if="!students.length">
                <td colspan="4" class="text-center p-4 text-sm font-medium text-gray-600 dark:bg-gray-900">
                  No students added yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <router-link :to="{ name: 'admin-rombel' }">
          <Button variant="outline" color="secondary" @click="cancel">Batal</Button>
        </router-link>
        <Button variant="solid" @click="save">Simpan</Button>
      </div>
    </div>
  </Layout>
</template>