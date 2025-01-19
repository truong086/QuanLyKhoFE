<template>
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5">
            <h2 class="heading-section">Login to Warehouse</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <div class="login-wrap p-0">
              <h3 class="mb-4 text-center">Have an account?</h3>
              <form class="signin-form">
                <div class="form-group">
                  <input type="text" class="form-control" v-model="username" placeholder="Username" required />
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" v-model="password" placeholder="Password" required />
                </div>
                <div class="form-group">
                  <button type="button" class="form-control btn btn-primary submit px-3" @click="handleLogin">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axiosInstance from '../axiosInstance';
  import { useToast } from 'vue-toastification';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
        async handleLogin() {
            const toast = useToast();

            if (!this.username || !this.password) {
                toast.error("Username and password are required!");
                return;
            }

            try {
                const payload = { username: this.username, password: this.password };
                const response = await axiosInstance.post('/api/Account/LoginData', payload);

                // Kiểm tra phản hồi từ API
                if (response.data && response.data.success) { // Giả sử API trả về `success: true` nếu thành công
                toast.success("Login successful!");

                // Lưu token nếu có
                if (response.data.token) {
                    localStorage.setItem("accessToken", response.data.token);
                }
                } else {
                // Trường hợp API trả về lỗi nhưng không ném exception
                toast.error(response.data.message || "Login failed. Please check your credentials.");
                }
            } catch (error) {
                // Xử lý lỗi khác
                if (error.response) {
                toast.error(error.response.data.message || "Server error.");
                } else if (error.request) {
                toast.error("Unable to connect to the server.");
                } else {
                toast.error("An unexpected error occurred.");
                }
            }
        }

    },
  };
  </script>
  
  <style scoped>
    section {
        background-image: url('../assets/loginTemplate/images/bg.jpg');
        background-size: cover;
        background-position: center center;
        background-attachment: fixed;
        height: 100vh;
        margin: 0;
    }
    form {
        background: rgba(0, 0,0, 0.3);
        padding: 20px 10px;  
        border-radius: 10px; 
     }
  </style>
  