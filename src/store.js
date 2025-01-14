import { defineStore } from 'pinia';

// Định nghĩa store "counter"
export const useCounterStore = defineStore('counter', {
  // State lưu trữ dữ liệu
  state: () => ({
    count: 0,
    token: "",
    role: [],
    id_category: null
  }),

  // Getters (giống computed)
  getters: {
    doubleCount: (state) => state.count * 2,
    getToken: (state) => state.token,
    getRole: (state) => (index) => {
      return state.role[index]
    },
    getCategory: (state) => state.id_category,
  },

  // Actions (giống methods)
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    setToken(item){
      this.token = item
    },
    setRole(item){
      this.role.push(item)
    },
    setCategory(item){
      this.id_category = item
    }
  },
  persist: true,
});