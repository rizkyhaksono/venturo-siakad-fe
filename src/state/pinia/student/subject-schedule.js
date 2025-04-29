import { defineStore } from "pinia";
import axios from "axios";

export const useStudentSubjectScheduleStore = defineStore("studentSubjectSchedule", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    schedules: [],
    schedule: null,
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
    openForm(newAction, schedule) {
      this.modalAction.action = newAction;
      this.schedule = schedule;
    },
    async getSchedules() {
      try {
        const url = `${this.apiUrl}/v1/student/subject-schedules?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const schedulesDataList = res.data.data;
        this.schedules = schedulesDataList;
        this.totalData = res.data.meta.total;
        this.totalPage = Math.ceil(this.totalData / this.perpage);
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async getByIdSubjects(id) {
      try {
        const url = `${this.apiUrl}/v1/student/subject-schedules/${id}`;
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
      await this.getSchedules();
    },
    async searchSchedules(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getSchedules();
    },
  }
})