import { defineStore } from "pinia";
import axios from "axios";

export const useAdminStudyYearStore = defineStore("adminStudyYear", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    studyYears: [],
    studyYear: null,
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
    openForm(newAction, studyYear) {
      this.modalAction.action = newAction;
      this.studyYear = studyYear;
    },
    async getStudyYears() {
      try {
        const url = `${this.apiUrl}/v1/admin/study-years?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const studyYearsDataList = res.data.data;
        this.studyYears = studyYearsDataList;
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
      await this.getStudyYears();
    },
    async searchStudyYears(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getStudyYears();
    },
    async postStudyYear(studyYear) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/study-years`, studyYear);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getStudyYears();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors,
        };
      }
    },
    async deleteStudyYear(id) {
      try {
        const res = await axios.delete(`${this.apiUrl}/v1/admin/study-years/${id}`);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getStudyYears();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors,
        };
      }
    },
  }
})