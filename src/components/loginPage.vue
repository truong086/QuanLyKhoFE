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
      router.push("/admin/")
      
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
</style>
