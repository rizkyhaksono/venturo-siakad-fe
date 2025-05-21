import { defineStore } from "pinia";
import axios from "axios";

export const useAdminSPPStore = defineStore("adminSPP", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    spp: [],
    sppData: null,
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
    openForm(newAction, sppData) {
      this.modalAction.action = newAction;
      this.sppData = sppData;
    },
    async getSPP() {
      try {
        const url = `${this.apiUrl}/v1/admin/spp?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const sppDataList = res.data;
        this.spp = sppDataList;
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
      await this.getSPP();
    },
    async searchSPP(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getSPP();
    },
    async postSPP(spp) {
      try {
        const res = await axios.post(`${this.apiUrl}/v1/admin/spp`, spp);
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
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