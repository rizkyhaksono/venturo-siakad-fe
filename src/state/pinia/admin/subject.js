import { defineStore } from "pinia";
import axios from "axios";

export const useAdminSubjectStore = defineStore("adminSubject", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    subject: [],
    subjectDetail: null,
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
    openForm(newAction, subjectData) {
      this.modalAction.action = newAction;
      this.subjectDetail = subjectData;
    },
    async getSubject() {
      try {
        const url = `${this.apiUrl}/v1/admin/subjects?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const subjectDataList = res.data;
        this.subject = subjectDataList;
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
      await this.getSubject();
    },
    async searchSubject(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getSubject();
    },
  },
})