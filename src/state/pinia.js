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

const pinia = createPinia();
export default pinia;

export {
  useAuthStore,
  useUserStore,
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
};
