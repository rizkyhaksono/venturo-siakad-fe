import { defineStore } from "pinia";
import axios from "axios";

export const useAdminRegistrationStore = defineStore("adminRegistration", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    registrations: [],
    registration: null,
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
    openForm(newAction, registration) {
      this.modalAction.action = newAction;
      this.registration = registration;
    },
    async getRegistrations() {
      try {
        const url = `${this.apiUrl}/v1/admin/registrations?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const registrationsDataList = res.data.data;
        this.registrations = registrationsDataList;
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
      await this.getRegistrations();
    },
    async searchRegistrations(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getRegistrations();
    },
    async updateStatusRegistration(registrationId, data) {
      try {
        const url = `${this.apiUrl}/v1/admin/registration/${registrationId}`;
        const res = await axios.put(url, {
          status: data.status,
          assigned_to: data.assigned_to,
        });
        this.response = {
          status: res.status,
          message: res.data.message,
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    }
  }
})