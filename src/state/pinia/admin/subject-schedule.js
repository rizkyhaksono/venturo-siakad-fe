import { defineStore } from "pinia";
import axios from "axios";

export const useAdminSubjectScheduleStore = defineStore("adminSubjectSchedule", {
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
        const url = `${this.apiUrl}/v1/admin/subject-schedules?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        this.schedules = res.data.data;
        this.totalData = res.data.meta?.total || 0;
        this.totalPage = Math.max(1, Math.ceil(this.totalData / this.perpage));
        if (this.current > this.totalPage) {
          this.current = this.totalPage;
        }
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
        this.totalData = 0;
        this.totalPage = 1;
        this.current = 1;
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
    async postSchedule(schedule) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/subject-schedules`, schedule);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error || [],
        };
      }
    },
    async updateSchedule(id, schedule) {
      try {
        const res = await axios.put(`${this.apiUrl}/v1/admin/subject-schedules/${id}`, schedule);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getSchedules();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error || [],
        };
      }
    },
    async deleteSchedule(id) {
      try {
        const res = await axios.delete(`${this.apiUrl}/v1/admin/subject-schedules/${id}`);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getSchedules();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.error || [],
        };
      }
    }
  }
})