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
    async postSubject(subject) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/subjects`, subject);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getSubject();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async updateSubject(id, subject) {
      try {
        const res = await axios.put(`${this.apiUrl}/v1/admin/subjects/${id}`, subject);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getSubject();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors,
        };
      }
    },
    async deleteSubject(id) {
      try {
        const res = await axios.delete(`${this.apiUrl}/v1/admin/subjects/${id}`);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getSubject();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors,
        };
      }
    }
  },
})