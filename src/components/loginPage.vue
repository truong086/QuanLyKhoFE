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

                <!-- remember and forgot passw section -->
                 <div class="remeber_forgotPassw" style="display: flex;margin:auto 5px; justify-content:space-around;">
                  
                  <div class="remember">
                    <input type="checkbox" id="remember" v-model="rememberMe" class="form-check-input"> 
                    <label for="remember">Remember me</label>
                 
                  </div>
                  <div><a href="#" class="forgot_passw">Forgot password ? </a></div>

                 </div>
                 
                 <!--button Login  -->
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
  
            // Kiểm tra input
            if (!this.username || !this.password) {
                toast.error("Username and password are required!");
                return;
            }
  
            try {
                const payload = { username: this.username, password: this.password };
                 // Log dữ liệu payload trước khi gửi
                 console.log('Payload:', payload);
                const response = await axiosInstance.post('/api/Account/LoginData', payload);
              
                // Log dữ liệu trả về từ API để kiểm tra
                 console.log('API Response:', response);
  
                // Kiểm tra phản hồi từ API
                // Kiểm tra nếu response và response.data tồn tại
                    if (response.success) {
                        toast.success("Login successful!");
    
                        // Lưu token nếu có
                        if (response.data.content.token) {
                            localStorage.setItem("accessToken", response.data.token);
                        }
                    } else {
                        // Nếu không thành công, hiển thị thông báo lỗi từ response.data.message
                        toast.error(response.data.message || "Login failed. Please check your credentials.");
                    }
  
            } catch (error) {
                // Xử lý lỗi khi không thể kết nối hoặc lỗi máy chủ
  
                // Kiểm tra lỗi trả về từ server (nếu có)
                if (error.response) {
                    // Log lỗi response (phản hồi lỗi từ API)
                    console.log('Error Response:', error.response);
                    console.log('Error Response Data:', error.response.data);
                    console.log('Error Response Status:', error.response.status);
                    console.log('Error Response Headers:', error.response.headers);
                    
                    toast.error(error.response.data.message || "Server error.");
                } 
                // Nếu không có phản hồi từ server (không kết nối được)
                else if (error.request) {
                    console.log('Error Request:', error.request);
                    toast.error("Unable to connect to the server.");
                } 
                // Xử lý lỗi khác (có thể lỗi không xác định)
                else {
                    console.log('Error:', error);
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
      background: rgba(0, 0, 0, 0.3);
      padding: 20px;  
      border-radius: 10px; 
    }
    .remember label{
      color: #FBCEB5;
    }
    .forgot_passw{
      color: white; font-size: 14px; margin-left: 10px;  
    }
    .forgot_passw:hover {
      color: blue;
    }
    .remember input{
      padding-right: -20px;
     }
  </style>
  