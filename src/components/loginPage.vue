<template>
  <body class="img js-fullheight">
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5">
            <h2 class="heading-section">Login</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <div class="login-wrap p-0">
              <h3 class="mb-4 text-center">Have an account?</h3>
              <form action="#" class="signin-form">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    required
                    v-model="LoginModel.username"
                  />
                </div>
                <div class="form-group">
                  <input
                    id="password-field"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required
                    v-model="LoginModel.password"
                  />
                  <span
                    toggle="#password-field"
                    class="fa fa-fw fa-eye field-icon toggle-password"
                  ></span>
                </div>
                <div class="form-group">
                  <button
                    type="button"
                    class="form-control btn btn-primary submit px-3"
                    v-on:click="login"
                  >
                    Sign In
                  </button>
                </div>
                <div class="form-group d-md-flex">
                  <div class="w-50">
                    <label class="checkbox-wrap checkbox-primary"
                      >Remember Me
                      <input type="checkbox" checked />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="w-50 text-md-right">
                    <a href="#" @click="Next" style="color: #fff">Register</a>
                  </div>
                </div>
              </form>
              <p class="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
              <div class="social d-flex text-center">
                <a href="#" class="px-2 py-2 mr-md-1 rounded"
                  ><span class="ion-logo-facebook mr-2"></span> Facebook</a
                >
                <a href="#" class="px-2 py-2 ml-md-1 rounded"
                  ><span class="ion-logo-twitter mr-2"></span> Twitter</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>

  <!-- Hiển thị màn hình loading -->
  <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Đang tải...</p>
    </div>
</template>

<script setup>
  import { useCounterStore } from "../store";
  import {ref, getCurrentInstance  } from 'vue'
  import axios from 'axios'
  import {useRouter} from 'vue-router'
  import {useToast} from 'vue-toastification'

  const LoginModel = ref({
    username: "",
    password: ""
  })

  const isLoading = ref(false)

  const router = useRouter()
  const Toast = useToast()

  const {proxy} = getCurrentInstance()
  const hostName = proxy?.hostname

  const Next = () => {
    router.push('/register')
  }

  const login = async () => {
    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"

    const res = await axios.post(hostName  + "/api/Account/LoginData", LoginModel.value)
    if(res.data.success){
      isLoading.value = false
      document.body.classList.remove('loading') // Xóa Lớp "loading"
      const DataToken = useCounterStore()
      Toast.success("Đăng nhập thành công")
      DataToken.setToken(res.data.content.token)
      DataToken.setRole(res.data.content.role)
      DataToken.setIdAccount(res.data.content.id)
      DataToken.setAccountImage(res.data.content.image)
      DataToken.setAccountName(res.data.content.username)
      router.push("/")
      
    }else{
      isLoading.value = false
      document.body.classList.remove('loading') // Xóa Lớp "loading"
      Toast.error("Tài khoản không chính xác", {
        timeout: 3000
      })
    }
  }
</script>

<style module>
body {
  background-image: url("../assets/loginTemplate/images/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

 /* Màn hình chờ */
 .loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: all; /* Kích hoạt lớp phủ ngăn tương tác */
}

/* Biểu tượng spinner */
.spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

/* Hiệu ứng xoay */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Ngăn người dùng thao tác khi đang load */
body.loading {
  pointer-events: none; /* Ngăn tất cả tương tác */
  user-select: none; /* Ngăn chọn văn bản */
}
</style>
