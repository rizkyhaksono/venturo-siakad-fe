import { defineStore } from "pinia";
import axios from "axios";

export const useAdminClassHistoryStore = defineStore("adminClassHistory", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    classHistory: [],
    classHistoryDetail: null,
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
    openForm(newAction, classHistoryData) {
      this.modalAction.action = newAction;
      this.classHistoryDetail = classHistoryData;
    },
    async getClassHistory() {
      try {
        const url = `${this.apiUrl}/v1/admin/class-histories?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const classHistoryDataList = res.data;
        this.classHistory = classHistoryDataList;
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
      await this.getClassHistory();
    },
    async searchClassHistory(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getClassHistory();
    },
    async postClassHstory(classHistory) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/class-histories`, classHistory);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getClassHistory();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async updateClassHistory(id, classHistory) {
      try {
        const res = await axios.put(`${this.apiUrl}/v1/admin/class-histories/${id}`, classHistory);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getClassHistory();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async deleteClassHistory(id) {
      try {
        const res = await axios.delete(`${this.apiUrl}/v1/admin/class-histories/${id}`);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getClassHistory();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    }
  }
})