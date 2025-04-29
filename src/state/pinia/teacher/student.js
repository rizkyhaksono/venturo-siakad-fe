import { defineStore } from "pinia";
import axios from "axios";

export const useTeacherStudentStore = defineStore("teacherStudent", {
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
        const url = `${this.apiUrl}/v1/teacher/students?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const studentsDataList = res.data.data;
        this.students = studentsDataList;
        this.totalData = res.data.meta.total;
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
    async getByIdStudent(id) {
      try {
        const url = `${this.apiUrl}/v1/teacher/students/${id}`;
        const res = await axios.get(url);
        this.student = res.data;
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    }
  },
})