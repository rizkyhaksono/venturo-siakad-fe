import { defineStore } from "pinia";
import axios from "axios";

export const useAdminTeacherStore = defineStore("adminTeacher", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    teachers: [],
    teacher: null,
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
    openForm(newAction, teacher) {
      this.modalAction.action = newAction;
      this.teacher = teacher;
    },
    async getTeachers() {
      try {
        const url = `${this.apiUrl}/v1/admin/teachers?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const teachersDataList = res.data.data;
        this.teachers = teachersDataList;
        this.totalData = res.data.data.total;
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
      await this.getTeachers();
    },
    async searchTeachers(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getTeachers();
    },
    async postTeacher(teacher) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/teachers`, teacher);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getTeachers();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors,
        };
      }
    },
  }
})