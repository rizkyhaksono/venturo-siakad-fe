import { defineStore } from "pinia";
import axios from "axios";

export const useTeacherSubjectStore = defineStore("teacherSubject", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    subjects: [],
    subject: null,
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
      this.subject = subjectData;
    },
    async getSubjects() {
      try {
        const url = `${this.apiUrl}/v1/teacher/subjects?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const subjectsDataList = res.data;
        this.subjects = subjectsDataList;
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
      await this.getSubjects();
    },
    async searchSubjects(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getSubjects();
    },
    async getByIdSubject(id) {
      try {
        const url = `${this.apiUrl}/v1/teacher/subjects/${id}`;
        const res = await axios.get(url);
        this.subject = res.data;
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    }
  }
})