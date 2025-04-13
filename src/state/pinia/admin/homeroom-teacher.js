import { defineStore } from "pinia";
import axios from "axios";

export const useAdminHomeroomTeacherStore = defineStore("adminHomeroomTeacher", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    homeroomTeachers: [],
    homeroomTeacher: null,
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
    openForm(newAction, homeroomTeacher) {
      this.modalAction.action = newAction;
      this.homeroomTeacher = homeroomTeacher;
    },
    async getHomeroomTeacher() {
      try {
        const url = `${this.apiUrl}/v1/admin/homeroom-teachers?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const homeroomTeacherDataList = res.data.data;
        this.homeroomTeachers = homeroomTeacherDataList;
        this.totalData = res.data.meta.total;
        this.totalPage = Math.ceil(this.totalData / this.perpage);
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    }
  }
})