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
  }
})