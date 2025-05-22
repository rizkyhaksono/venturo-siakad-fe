import { defineStore } from "pinia";
import axios from "axios";

export const useStudentAssesmentStore = defineStore("studentAssesment", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    assesments: [],
    assesment: null,
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
    openForm(newAction, assesmentData) {
      this.modalAction.action = newAction;
      this.assesment = assesmentData;
    },
    async getAssesments() {
      try {
        const url = `${this.apiUrl}/v1/student/student-assesments?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const assesmentsDataList = res.data;
        this.assesments = assesmentsDataList;
        this.totalData = res.data.meta.total;
        this.totalPage = Math.ceil(this.totalData / this.perpage);
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async getByIdAssesment(id) {
      try {
        const url = `${this.apiUrl}/v1/student/assesments/${id}`;
        const res = await axios.get(url);
        this.assesment = res.data;
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async changePage(newPage) {
      this.current = newPage;
      await this.getAssesments();
    },
  }
})