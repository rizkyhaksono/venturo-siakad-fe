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
};
