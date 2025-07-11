import { defineStore } from "pinia";
import axios from "axios";

export const useAdminRombelStore = defineStore("adminRombel", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    rombels: [],
    rombel: null,
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
    openForm(newAction, rombel) {
      this.modalAction.action = newAction;
      this.rombel = rombel;
    },
    async getRombels() {
      try {
        const url = `${this.apiUrl}/v1/admin/rombels`;
        const res = await axios.get(url);
        const rombelsDataList = res.data.data;
        this.rombels = rombelsDataList;
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
      await this.getRombels();
    },
    async searchRombels(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getRombels();
    },
    async getRombelById(id) {
      try {
        const res = await axios.get(`${this.apiUrl}/v1/admin/rombels/${id}`);
        this.rombel = res.data.data;
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error || [],
        };
        throw error;
      }
    },
    async getStudentByRombelName(classId) {
      try {
        const res = await axios.get(`${this.apiUrl}/v1/admin/rombels/student/${classId}`);
        this.rombel = res.data.data;
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error || [],
        };
        throw error;
      }
    },
    async postRombel(rombel) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/rombels`, rombel);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error || [],
        };
        throw error;
      }
    },
    async updateRombel(rombel, id) {
      try {
        const res = await axios.put(`${this.apiUrl}/v1/admin/rombels/${id}`, rombel);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error || [],
        };
        throw error;
      }
    },
    async deleteRombel(id) {
      try {
        const res = await axios.delete(`${this.apiUrl}/v1/admin/rombels/${id}`);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error || [],
        };
        throw error;
      }
    }
  }
})