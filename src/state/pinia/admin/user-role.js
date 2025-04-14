import { defineStore } from "pinia";
import axios from "axios";

export const useAdminUserRoleStore = defineStore("adminUserRole", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    roles: [],
    role: null,
    response: {
      status: null,
      message: null,
      error: [],
    },
    modalAction: {
      action: "",
      modal_title: "",
      modal_button: "",
    },
    totalData: 0,
    totalPage: 0,
    current: 1,
    perpage: 10,
    searchQuery: "",
  }),
  actions: {
    openForm(newAction, role) {
      this.modalAction.action = newAction;
      this.role = role;
    },
    async getRoles() {
      try {
        const url = `${this.apiUrl}/v1/admin/roles?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const rolesDataList = res.data.data.list.data;
        this.roles = rolesDataList;
        this.totalData = res.data.data.meta.total;
        this.totalPage = Math.ceil(this.totalData / this.perpage);
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async changePage(newPage) {
      this.current = newPage;
      await this.getRoles();
    },
    async searchRoles(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getRoles();
    },
    async postRole(role) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/roles`, role);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error,
        };
      }
    },
    async updateRole(role) {
      try {
        const res = await axios.put(`${this.apiUrl}/v1/admin/roles/${role.id}`, role);
        this.response = {
          status: res.status,
          message: res.data.message
        }
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error,
        }
      } finally {
        this.getRoles();
      }
    },
    async deleteRole(id) {
      try {
        const res = await axios.delete(`${this.apiUrl}/v1/admin/roles/${id}`);
        this.response = {
          status: res.status,
          message: res.data.message,
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error,
        }
      } finally {
        this.getRoles();
      }
    },
    resetState() {
      this.roles = [];
      this.role = null;
      this.response = {
        status: null,
        message: null,
        error: [],
      };
      this.modalAction = {
        action: "",
        modal_title: "",
        modal_button: "",
      };
      this.totalData = 0;
      this.totalPage = 0;
      this.current = 1;
      this.perpage = 10;
      this.searchQuery = "";
    }
  }
})