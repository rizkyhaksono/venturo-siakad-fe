import { useAuthStore } from "@/state/pinia";
export default [
    {
        path: "/",
        name: "home",
        beforeEnter(to, from, next) {
            const auth = useAuthStore();
            if (auth.getToken) {
                switch (auth.role) {
                    case "admin":
                        next({ name: "admin-dashboard" });
                        break;
                    case "student":
                        next({ name: "student-dashboard" });
                        break;
                    case "teacher":
                        next({ name: "teacher-dashboard" });
                        break;
                    default:
                        next({ name: "landing-page" });
                }
            } else {
                next({ name: "landing-page" });
            }
        }
    },
    // admin routes
    {
        path: "/admin/dashboard",
        name: "admin-dashboard",
        meta: { title: "Dashboard", authRequired: true },
        component: () => import("../views/admin/dashboard"),
    },
    {
        path: "/admin/profile",
        name: "profile",
        meta: { title: "Profile", authRequired: true },
        component: () => import("../views/admin/profile"),
    },
    {
        path: "/admin/settings",
        name: "settings",
        meta: { title: "Settings", authRequired: true },
        component: () => import("../views/admin/settings"),
    },
    {
        path: "/admin/user",
        name: "user",
        meta: { title: "User", authRequired: true },
        component: () => import("../views/admin/user"),
    },
    {
        path: "/admin/user_role",
        name: "user-role",
        meta: { title: "User Role", authRequired: true },
        component: () => import("../views/admin/user-role"),
    },
    {
        path: "/admin/class",
        name: "class",
        meta: { title: "Class", authRequired: true },
        component: () => import("../views/admin/class"),
    },
    {
        path: "/admin/rombel",
        name: "admin-rombel",
        meta: { title: "Rombel", authRequired: true },
        component: () => import("../views/admin/rombel"),
    },
    {
        path: "/admin/rombel/create",
        name: "admin-rombel-create",
        meta: { title: "Rombel Create", authRequired: true },
        component: () => import("../views/admin/rombel/form.vue"),
    },
    {
        path: "/admin/class_history",
        name: "class-history",
        meta: { title: "Class History", authRequired: true },
        component: () => import("../views/admin/class-history"),
    },
    {
        path: "/admin/subject",
        name: "subject",
        meta: { title: "Subject", authRequired: true },
        component: () => import("../views/admin/subject"),
    },
    {
        path: "/admin/subject_hour",
        name: "subject-hour",
        meta: { title: "Subject Hour", authRequired: true },
        component: () => import("../views/admin/subject-hour"),
    },
    {
        path: "/admin/subject_schedule",
        name: "subject-schedule",
        meta: { title: "Subject Schedule", authRequired: true },
        component: () => import("../views/admin/subject-schedule"),
    },
    {
        path: "/admin/teacher",
        name: "teacher",
        meta: { title: "Teacher", authRequired: true },
        component: () => import("../views/admin/teacher"),
    },
    {
        path: "/admin/homeroom_teacher",
        name: "homeroom-teacher",
        meta: { title: "Homeroom Teacher", authRequired: true },
        component: () => import("../views/admin/homeroom-teacher"),
    },
    {
        path: "/admin/registration",
        name: "Registration",
        meta: { title: "Registration", authRequired: true },
        component: () => import("../views/admin/registration"),
    },
    {
        path: "/admin/student",
        name: "Student",
        meta: { title: "Student", authRequired: true },
        component: () => import("../views/admin/student"),
    },
    {
        path: "/admin/student-assesment",
        name: "Student Assesment",
        meta: { title: "Student Assesment", authRequired: true },
        component: () => import("../views/admin/student-assesment"),
    },
    {
        path: "/admin/student-assesment/form/:id",
        name: "Student Assesment Form List",
        meta: { title: "Student Assesment", authRequired: true },
        component: () => import("../views/admin/student-assesment/form-list.vue"),
    },
    {
        path: "/admin/student-assesment/form/grade/:id",
        name: "Student Assesment Form Grade",
        meta: { title: "Student Assesment", authRequired: true },
        component: () => import("../views/admin/student-assesment/form-grade.vue"),
    },
    {
        path: "/admin/study_year",
        name: "Study Year",
        meta: { title: "Study Year", authRequired: true },
        component: () => import("../views/admin/study-year"),
    },
    {
        path: "/admin/spp",
        name: "SPP",
        meta: { title: "SPP", authRequired: true },
        component: () => import("../views/admin/spp"),
    },
    {
        path: "/admin/spp-history",
        name: "SPP History",
        meta: { title: "SPP History", authRequired: true },
        component: () => import("../views/admin/spp-history"),
    },
    {
        path: "/admin/kkm",
        name: "KKM",
        meta: { title: "KKM", authRequired: true },
        component: () => import("../views/admin/kkm"),
    },
    // student routes
    {
        path: "/student/dashboard",
        name: "student-dashboard",
        meta: { title: "Dashboard", authRequired: true },
        component: () => import("../views/student/dashboard"),
    },
    {
        path: "/student/profile",
        name: "student-profile",
        meta: { title: "Profile", authRequired: true },
        component: () => import("../views/student/profile"),
    },
    {
        path: "/student/class",
        name: "student-class",
        meta: { title: "Class", authRequired: true },
        component: () => import("../views/student/class"),
    },
    {
        path: "/student/class_history",
        name: "student-class-history",
        meta: { title: "Class History", authRequired: true },
        component: () => import("../views/student/class-history"),
    },
    {
        path: "/student/subject_schedule",
        name: "student-subject-schedule",
        meta: { title: "Subject Schedule", authRequired: true },
        component: () => import("../views/student/subject-schedule"),
    },
    {
        path: "/student/rombel",
        name: "student-rombel",
        meta: { title: "Rombel", authRequired: true },
        component: () => import("../views/student/rombel"),
    },
    {
        path: "/student/spp",
        name: "student-spp",
        meta: { title: "SPP", authRequired: true },
        component: () => import("../views/student/spp"),
    },
    {
        path: "/student/spp/form",
        name: "student-spp-form",
        meta: { title: "SPP Form", authRequired: true },
        component: () => import("../views/student/spp/form.vue"),
    },
    {
        path: "/student/spp-history",
        name: "student-spp-history",
        meta: { title: "SPP History", authRequired: true },
        component: () => import("../views/student/spp-history"),
    },
    {
        path: "/student/student-assesment",
        name: "student-assesment",
        meta: { title: "Student Assesment", authRequired: true },
        component: () => import("../views/student/student-assesment"),
    },
    {
        path: "/student/settings",
        name: "Settings",
        meta: { title: "Settings", authRequired: true },
        component: () => import("../views/student/settings"),
    },
    // teacher routes
    {
        path: "/teacher/dashboard",
        name: "teacher-dashboard",
        meta: { title: "Dashboard", authRequired: true },
        component: () => import("../views/teacher/dashboard"),
    },
    {
        path: "/teacher/profile",
        name: "teacher-profile",
        meta: { title: "Profile", authRequired: true },
        component: () => import("../views/teacher/profile"),
    },
    {
        path: "/teacher/class",
        name: "teacher-class",
        meta: { title: "Class", authRequired: true },
        component: () => import("../views/teacher/class"),
    },
    {
        path: "/teacher/student",
        name: "teacher-student",
        meta: { title: "Student", authRequired: true },
        component: () => import("../views/teacher/student"),
    },
    {
        path: "/teacher/subject",
        name: "teacher-subject",
        meta: { title: "Subject", authRequired: true },
        component: () => import("../views/teacher/subject"),
    },
    {
        path: "/teacher/rombel",
        name: "teacher-rombel",
        meta: { title: "Rombel", authRequired: true },
        component: () => import("../views/teacher/rombel"),
    },
    {
        path: "/teacher/rombel/:id",
        name: "teacher-rombel-form",
        meta: { title: "Rombel Form", authRequired: true },
        component: () => import("../views/teacher/rombel/form.vue"),
    },
    {
        path: "/teacher/student-assesment",
        name: "teacher-student-assesment",
        meta: { title: "Student Assesment", authRequired: true },
        component: () => import("../views/teacher/student-assesment"),
    },
    {
        path: "/teacher/settings",
        name: "settings",
        meta: { title: "settings", authRequired: true },
        component: () => import("../views/teacher/settings"),
    },
    // auth routes
    {
        path: "/login",
        name: "login",
        component: () => import("../views/auth/login"),
        meta: {
            title: "Login",
            beforeResolve(routeTo, routeFrom, next) {
                const auth = useAuthStore();
                if (auth.getToken) {
                    next({ name: "default" });
                } else {
                    next();
                }
            },
        },
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/auth/register"),
        meta: {
            title: "Register",
            beforeResolve(routeTo, routeFrom, next) {
                const auth = useAuthStore();
                if (auth.getToken) {
                    next({ name: "default" });
                } else {
                    next();
                }
            },
        },
    },
    {
        path: "/forgot-password",
        name: "Forgot password",
        component: () => import("../views/auth/forgot-password"),
        meta: {
            title: "Forgot password",
            beforeResolve(routeTo, routeFrom, next) {
                const auth = useAuthStore();
                if (auth.getToken) {
                    next({ name: "default" });
                } else {
                    next();
                }
            },
        },
    },
    {
        path: "/404",
        name: "NotFound",
        component: () => import("../views/utility/404.vue"),
        meta: {
            title: "404 Not Found",
        },
    },
    {
        path: "/:catchAll(.*)",
        redirect: { name: "NotFound" },
    },
    // visitor routes
    {
        path: "/",
        name: "landing-page",
        component: () => import("../views/(visitor)/index.vue"),
        meta: {
            title: "Landing Page",
            beforeResolve(routeTo, routeFrom, next) {
                const auth = useAuthStore();
                if (auth.getToken) {
                    next({ name: "default" });
                } else {
                    next();
                }
            },
        },
    },
    {
        path: "/feature",
        name: "feature-page",
        component: () => import("../views/(visitor)/feature.vue"),
        meta: {
            title: "Feature Page",
            beforeResolve(routeTo, routeFrom, next) {
                const auth = useAuthStore();
                if (auth.getToken) {
                    next({ name: "default" });
                } else {
                    next();
                }
            },
        },
    },
    {
        path: "/about",
        name: "about-page",
        component: () => import("../views/(visitor)/about.vue"),
        meta: {
            title: "About Page",
            beforeResolve(routeTo, routeFrom, next) {
                const auth = useAuthStore();
                if (auth.getToken) {
                    next({ name: "default" });
                } else {
                    next();
                }
            },
        },
    },
    {
        path: "/contact",
        name: "contact-page",
        component: () => import("../views/(visitor)/contact.vue"),
        meta: {
            title: "Contact Page",
            beforeResolve(routeTo, routeFrom, next) {
                const auth = useAuthStore();
                if (auth.getToken) {
                    next({ name: "default" });
                } else {
                    next();
                }
            },
        },
    },
];
