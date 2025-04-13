import { defineStore } from "pinia";
import axios from "axios";

export const useAdminStudentStore = defineStore("adminStudent", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    students: [],
    student: null,
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
    openForm(newAction, student) {
      this.modalAction.action = newAction;
      this.student = student;
    },
    async getStudents() {
      try {
        const url = `${this.apiUrl}/v1/admin/students?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const studentsDataList = res.data.data;
        this.students = studentsDataList;
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
      await this.getStudents();
    },
    async searchStudents(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getStudents();
    },
    async postStudent(students) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/students`, students);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors || [],
        };
      }
    },
  }
})