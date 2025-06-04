import { defineStore } from "pinia";
import axios from "axios";

export const useAdminKKMStore = defineStore("adminKKM", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    kkm: [],
    kkmData: null,
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
    openForm(newAction, kkmData) {
      this.modalAction.action = newAction;
      this.kkmData = kkmData;
    },
    async getKKM() {
      try {
        const url = `${this.apiUrl}/v1/admin/kkm?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const kkmDataList = res.data;
        this.kkm = kkmDataList;
        this.totalData = res.data.total;
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
      await this.getKKM();
    },
    async searchKKM(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getKKM();
    },
    async postKKM(kkm) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/kkm`, kkm);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getKKM();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data?.errors || [],
        };
      }
    },
    async putKKM(id, kkm) {
      try {
        const res = await axios.put(`${this.apiUrl}/v1/admin/kkm/${id}`, kkm);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getKKM();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data?.errors || [],
        };
      }
    },
    async getKKMById(id) {
      try {
        const res = await axios.get(`${this.apiUrl}/v1/admin/kkm/${id}`);
        this.kkmData = res.data;
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async deleteKKM(id) {
      try {
        const res = await axios.delete(`${this.apiUrl}/v1/admin/kkm/${id}`);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
        await this.getKKM();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data?.errors || [],
        };
      }
    },
  },
})