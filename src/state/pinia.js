import { createPinia } from "pinia";

import { useAuthStore } from "./pinia/auth";

import { useUserStore } from "./pinia/user";

// admin
import { useAdminUserStore } from "./pinia/admin/user";
import { useAdminUserRoleStore } from "./pinia/admin/user-role";
import { useAdminClassStore } from "./pinia/admin/class";
import { useAdminClassHistoryStore } from "./pinia/admin/class-history";
import { useAdminSubjectStore } from "./pinia/admin/subject";
import { useAdminSubjectHourStore } from "./pinia/admin/subject-hour";
import { useAdminSubjectScheduleStore } from "./pinia/admin/subject-schedule";
import { useAdminHomeroomTeacherStore } from "./pinia/admin/homeroom-teacher";
import { useAdminTeacherStore } from "./pinia/admin/teacher";
import { useAdminRegistrationStore } from "./pinia/admin/registration";
import { useAdminStudentStore } from "./pinia/admin/student";
import { useAdminStudyYearStore } from "./pinia/admin/study-year";
import { useAdminRombelStore } from "./pinia/admin/rombel";
import { useAdminSPPStore } from "./pinia/admin/spp";

// student
import { useStudentClassStore } from "./pinia/student/class";
import { useStudentClassHistoryStore } from "./pinia/student/class-history";
import { useStudentSubjectScheduleStore } from "./pinia/student/subject-schedule";
import { useStudentRombelStore } from "./pinia/student/rombel";
import { useStudentSPPStore } from "./pinia/student/spp";

// teacher
import { useTeacherClassStore } from "./pinia/teacher/class";
import { useTeacherStudentStore } from "./pinia/teacher/student";
import { useTeacherSubjectStore } from "./pinia/teacher/subject";
import { useTeacherRombelStore } from "./pinia/teacher/rombel";
import { useTeacherSubjectScheduleStore } from "./pinia/teacher/subject-schedule";

const pinia = createPinia();
export default pinia;

export {
  // auth
  useAuthStore,
  useUserStore,

  // admin
  useAdminUserStore,
  useAdminUserRoleStore,
  useAdminClassStore,
  useAdminClassHistoryStore,
  useAdminSubjectStore,
  useAdminSubjectHourStore,
  useAdminSubjectScheduleStore,
  useAdminHomeroomTeacherStore,
  useAdminTeacherStore,
  useAdminRegistrationStore,
  useAdminStudentStore,
  useAdminStudyYearStore,
  useAdminRombelStore,
  useAdminSPPStore,

  // student
  useStudentClassStore,
  useStudentClassHistoryStore,
  useStudentSubjectScheduleStore,
  useStudentRombelStore,
  useStudentSPPStore,

  // teacher
  useTeacherClassStore,
  useTeacherStudentStore,
  useTeacherSubjectStore,
  useTeacherRombelStore,
  useTeacherSubjectScheduleStore
};
