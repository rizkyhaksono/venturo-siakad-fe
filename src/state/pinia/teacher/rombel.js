import { defineStore } from "pinia";
import axios from "axios";

export const useTeacherRombelStore = defineStore("teacherRombel", {
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
        const url = `${this.apiUrl}/v1/teacher/rombels`;
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
        const url = `${this.apiUrl}/v1/teacher/rombels/${id}`;
        const res = await axios.get(url);
        this.rombel = res.data.data;
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async getStudentByRombelName(rombelName) {
      try {
        const res = await axios.get(`${this.apiUrl}/v1/teacher/rombels/${rombelName}/students`);
        this.rombels = res.data;
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error || [],
        }
      }
    },
  }
});