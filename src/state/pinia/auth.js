import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        apiUrl: import.meta.env.VITE_APP_APIURL,
        userLogin: {},
        userRegister: {},
        csrfToken: "",
        bearerToken: "",
        response: {
            status: null,
            message: null,
            error: [],
        },
    }),
    actions: {
        async register(credential) {
            try {
                const res = await axios.post(
                    `${this.apiUrl}/v1/auth/register`,
                    credential
                );
                this.response = {
                    status: res.status,
                    message: res.data.message,
                };
                this.userRegister = res.data.data;
                return res;
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                    error: error.response.data.errors,
                };
            }
        },
        async login(credential) {
            try {
                const res = await axios.post(
                    `${this.apiUrl}/v1/auth/login`,
                    credential
                );
                this.response = {
                    status: res.status,
                    message: res.data.message,
                };
                const { access_token, user, role } = res.data.data;
                this.saveToken(access_token);
                this.saveUser(user);
                this.saveRole(role);
                this.userLogin = user;
                return {
                    user: user,
                    role: role,
                }
            } catch (error) {
                this.response = {
                    status: error.response?.status,
                    message: error.message,
                    error: error.response.data.errors,
                };
            }
        },
        async logout() {
            try {
                const token = this.getToken();
                await axios.post(
                    `${this.apiUrl}/v1/auth/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (error) {
                console.error("Logout failed", error);
                this.response = {
                    status: error.response?.status || 500,
                    message:
                        error.response?.data?.message ||
                        "Could not logout token.",
                    error: error.response?.data?.errors || [],
                };
            } finally {
                this.userLogin = {};
                this.removeToken();
                this.removeUser();
                this.removeRole();
            }
        },
        async saveUserLogin() {
            try {
                const response = await axios.get("/v1/auth/profile");
                this.userLogin = response.data.data;
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            }
        },
        async saveRole(token) {
            localStorage.setItem("venturo_siakad_role", token);
        },
        async removeRole() {
            localStorage.removeItem("venturo_siakad_role");
        },
        async saveToken(token) {
            localStorage.setItem("venturo_siakad_token", token);
        },
        async removeToken() {
            localStorage.removeItem("venturo_siakad_token");
        },
        getToken() {
            return localStorage.getItem("venturo_siakad_token") || "";
        },
        async saveUser(user) {
            localStorage.setItem("venturo_siakad_user", JSON.stringify(user));
        },
        async removeUser() {
            localStorage.removeItem("venturo_siakad_user");
        },
        getUser() {
            return JSON.parse(localStorage.getItem("venturo_siakad_user") || "");
        },
    },
});
