import { defineStore } from "pinia";
import axios from "axios";

export const useAdminSPPHistoryStore = defineStore("adminSPPHistory", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    sppHistory: [],
    sppHistoryData: null,
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
    openForm(newAction, sppHistoryData) {
      this.modalAction.action = newAction;
      this.sppHistoryData = sppHistoryData;
    },
    async getSPPHistory() {
      try {
        const url = `${this.apiUrl}/v1/admin/spp-history?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const sppHistoryDataList = res.data;
        this.sppHistory = sppHistoryDataList;
        this.totalData = res.data.total;
        this.totalPage = Math.ceil(this.totalData / this.perpage);
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async getSPPHistoryById(id) {
      try {
        const url = `${this.apiUrl}/v1/admin/spp-history/${id}`;
        const res = await axios.get(url);
        this.sppHistoryData = res.data;
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
        };
      }
    },
    async changePage(newPage) {
      this.current = newPage;
      await this.getSPPHistory();
    },
    async searchSPPHistory(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getSPPHistory();
    },
    async postSPPHistory(sppHistoryData) {
      try {
        const url = `${this.apiUrl}/v1/admin/spp-history`;
        const res = await axios.post(url, sppHistoryData);
        this.response = {
          status: res.status,
          message: res.data.message,
        };
        this.sppHistoryData = null;
        await this.getSPPHistory();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors,
        };
      }
    },
    async updateSPPHistory(sppHistoryData, id) {
      try {
        const url = `${this.apiUrl}/v1/admin/spp-history/${id}`;
        const res = await axios.put(url, sppHistoryData);
        this.response = {
          status: res.status,
          message: res.data.message,
        };
        this.sppHistoryData = null;
        await this.getSPPHistory();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors,
        };
      }
    },
    async deleteSPPHistory(id) {
      try {
        const url = `${this.apiUrl}/v1/admin/spp-history/${id}`;
        const res = await axios.delete(url);
        this.response = {
          status: res.status,
          message: res.data.message,
        };
        await this.getSPPHistory();
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors,
        };
      }
    },
  },
})