import { defineStore } from "pinia";
import axios from "axios";

export const useAdminSubjectHourStore = defineStore("adminSubjectHour", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    subjectHour: [],
    subjectHourDetail: null,
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
    openForm(newAction, subjectHourData) {
      this.modalAction.action = newAction;
      this.subjectHourDetail = subjectHourData;
    },
    async getSubjectHour() {
      try {
        const url = `${this.apiUrl}/v1/admin/subject-hours?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const subjectHourDataList = res.data;
        this.subjectHour = subjectHourDataList;
        this.totalData = res.data.total;
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
      await this.getSubjectHour();
    },
    async searchSubjectHour(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getSubjectHour();
    },
    async postSubjectHour(subjectHour) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/subject-hours`, subjectHour);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors,
        }
      }
    },
    async updateSubjectHour(id, subjectHour) {
      try {
        const res = await axios.put(`${this.apiUrl}/v1/admin/subject-hours/${id}`, subjectHour);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors,
        };
      }
    },
    async deleteSubjectHour(id) {
      try {
        const res = await axios.delete(`${this.apiUrl}/v1/admin/subject-hours/${id}`);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getSubjectHour();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors,
        };
      }
    }
  }
})