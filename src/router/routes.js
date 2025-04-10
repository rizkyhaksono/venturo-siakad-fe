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
                        next({ name: "login" });
                }
            } else {
                next({ name: "login" });
            }
        }
    },
    {
        path: "/admin/dashboard",
        name: "admin-dashboard",
        meta: { title: "Dashboard", authRequired: true },
        component: () => import("../views/admin/dashboard"),
    },
    {
        path: "/student/dashboard",
        name: "student-dashboard",
        meta: { title: "Dashboard", authRequired: true },
        component: () => import("../views/student/dashboard"),
    },
    {
        path: "/teacher/dashboard",
        name: "teacher-dashboard",
        meta: { title: "Dashboard", authRequired: true },
        component: () => import("../views/teacher/dashboard"),
    },
    {
        path: "/admin/user",
        name: "user",
        meta: { title: "User Page", authRequired: true },
        component: () => import("../views/admin/user"),
    },
    {
        path: "/admin/user_role",
        name: "user-role",
        meta: { title: "User Role Page", authRequired: true },
        component: () => import("../views/admin/user"),
    },
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
];
