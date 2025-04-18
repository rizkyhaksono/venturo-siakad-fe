import { defineStore } from "pinia";
import axios from "axios";

export const useStudentClassHistoryStore = defineStore("studentClassHistory", {
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
        const url = `${this.apiUrl}/v1/student/class-histories?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
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
  }
})