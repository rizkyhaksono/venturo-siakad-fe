import { defineStore } from "pinia";
import axios from "axios";

export const useAdminStudentAssesment = defineStore("adminStudentAssesment", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    studentAssesments: [],
    studentAssesment: null,
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
    openForm(newAction, studentAssesment) {
      this.modalAction.action = newAction;
      this.studentAssesment = studentAssesment;
    },
    async getStudentAssesments() {
      try {
        const url = `${this.apiUrl}/v1/admin/student-assesments?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const studentAssesmentsDataList = res.data.data;
        this.studentAssesments = studentAssesmentsDataList;
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
      await this.getStudentAssesments();
    },
    async searchStudentAssesments(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getStudentAssesments();
    },
    async postStudentAssesment(studentAssesments) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/student-assessments`, studentAssesments);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getStudentAssesments();
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