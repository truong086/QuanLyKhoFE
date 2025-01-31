import { defineStore } from 'pinia';

// Định nghĩa store "counter"
export const useCounterStore = defineStore('counter', {
  // State lưu trữ dữ liệu
  state: () => ({
    count: 0,
    token: "",
    role: [],
    id_category: null,
    emailotp: "",
    floorId: {},
    id_account: 0,
    account_name: '',
    account_image: ''
  }),

  // Getters (giống computed)
  getters: {
    doubleCount: (state) => state.count * 2,
    getToken: (state) => state.token,
    getRole: (state) => (index) => {
      return state.role[index]
    },
    getCategory: (state) => state.id_category,
    getEmailOtp: (state) => state.emailotp,
    getFloorId: (state) => state.floorId,
    getIdAccount: (state) => state.id_account,
    getIdAccountName: (state) => state.account_name,
    getIdAccountImage: (state) => state.account_image
    
  },

  // Actions (giống methods)
  actions: {
    setAccountName(item){
      this.account_name = item
    },
    setAccountImage(item){
      this.account_image = item
    },
    setIdAccount(item){
      this.id_account = item
    },
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
    },
    setEmailOtp(item){
      this.emailotp = item
    },
    setFloorId(item){
      this.floorId = item
    },
    clearStore(){
      this.$reset
    }
  },
  persist: true,
});