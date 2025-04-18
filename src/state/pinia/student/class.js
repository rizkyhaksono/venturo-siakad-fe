import { defineStore } from "pinia";
import axios from "axios";

export const useStudentClassStore = defineStore("studentClass", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    classes: [],
    class: null,
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
    openForm(newAction, classData) {
      this.modalAction.action = newAction;
      this.class = classData
    },
    async getClasses() {
      try {
        const url = `${this.apiUrl}/v1/student/classes?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const classesDataList = res.data;
        this.classes = classesDataList;
        this.totalData = res.data.total;
        this.totalPage = Math.ceil(this.totalData / this.perpage);
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async getByIdClass(id) {
      try {
        const url = `${this.apiUrl}/v1/student/classes/${id}`;
        const res = await axios.get(url);
        this.class = res.data;
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async changePage(newPage) {
      this.current = newPage;
      await this.getClasses();
    },
    async searchClasses(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getClasses();
    },
  }
})