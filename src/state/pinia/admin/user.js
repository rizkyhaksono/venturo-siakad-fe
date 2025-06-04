import { defineStore } from "pinia";
import axios from "axios";

export const useAdminUserStore = defineStore("adminUser", {
  state: () => ({
    apiUrl: import.meta.env.VITE_APP_APIURL,
    users: [],
    user: null,
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
    openForm(newAction, user) {
      this.modalAction.action = newAction;
      this.user = user;
    },
    async getUsers(perpage) {
      try {
        this.perpage = perpage || this.perpage;
        const url = `${this.apiUrl}/v1/admin/users?page=${this.current}&per_page=${this.perpage}&name=${this.searchQuery}`;
        const res = await axios.get(url);
        const usersDataList = res.data.data.list.data;
        this.users = usersDataList;
        this.totalData = res.data.data.list.total;
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
      await this.getUsers();
    },
    async searchUsers(query) {
      this.searchQuery = query;
      this.current = 1;
      await this.getUsers();
    },
    async getSignature(data) {
      const res = await axios.post(`${this.apiUrl}/sign-payload`, data);
      const { signature, token } = res.data;
      return { signature, token };
    },
    async postUser(users) {
      try {
        const { signature, token } = await this.getSignature(users);
        const res = await axios.post(`${this.apiUrl}/v1/admin/users`, users, {
          headers: {
            'X-Signature': signature,
            'X-Signature-Token': token
          }
        });
        this.users = res.data;
        this.response = {
          status: res.status,
          message: res.data.message,
          error: [],
        };
      } catch (error) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data.errors || [],
        };
      }
    },
  }
})