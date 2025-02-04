<template>
<div
      class="container height-100 d-flex justify-content-center align-items-center"
    >
      <div class="position-relative">
        <div class="card p-2 text-center">
          <h6>
            Please enter the one time password <br />
            to verify your account
          </h6>
          <div>
            <span v-if="sodem > 0">{{ sodem }}</span>
            <button class="btnLoadOTP" v-else @click="resetOTP">Load OTP</button>
          </div>
          <div
            id="otp"
            class="inputs d-flex flex-row justify-content-center mt-2"
          >
            <input
              class="m-2 text-center form-control rounded"
              type="text"
              id="first"
              maxlength="1"
              v-model="otp.a"
              style="background-color: transparent !important"
            />
            <input
              class="m-2 text-center form-control rounded"
              type="text"
              id="second"
              maxlength="1"
              v-model="otp.b"
              style="background-color: transparent !important"
            />
            <input
              class="m-2 text-center form-control rounded"
              type="text"
              id="third"
              maxlength="1"
              style="background-color: transparent !important"
              v-model="otp.c"
            />
            <input
              class="m-2 text-center form-control rounded"
              type="text"
              id="fourth"
              maxlength="1"
              v-model="otp.d"
              style="background-color: transparent !important"
            />
            <input
              class="m-2 text-center form-control rounded"
              type="text"
              id="fifth"
              maxlength="1"
              v-model="otp.e"
              style="background-color: transparent !important"
            />
            <input
              class="m-2 text-center form-control rounded"
              type="text"
              id="sixth"
              maxlength="1"
              v-model="otp.f"
              style="background-color: transparent !important"
            />
          </div>
          <div class="mt-4">
            <button v-on:click="Validate" class="btn btn-danger px-4 validate">Validate</button>
          </div>
        </div>
        <div class="card-2">
          <div class="content d-flex justify-content-center align-items-center">
            <span>Didn't get the code</span>
            <a href="#" class="text-decoration-none ms-3">Resend(1/3)</a>
          </div>
        </div>
      </div>
    </div>
     <!-- Hiển thị màn hình loading -->
  <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Đang tải...</p>
    </div>
</template>

<style scoped>
  .btnLoadOTP{
    border: none;
    outline: none;
    background-color: greenyellow;
    padding: 10px 25px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 12px;
    margin: 10px 0;
  }

  .btnLoadOTP:hover{
    transform: scale(1.2);
    transition: 0.3s ease-in-out;
  }

  .btnLoadOTP:active{
    transform: scale(0.6);
    transition: 0.3s ease-in-out;
  }
  body {
    background-color: red;
  }
  .height-100 {
    height: 100vh;
  }
  .card {
    width: 400px;
    border: none;
    height: 300px;
    box-shadow: 0px 5px 20px 0px #d2dae3;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card h6 {
    color: red;
    font-size: 20px;
  }
  .inputs input {
    width: 40px;
    height: 40px;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
  .card-2 {
    background-color: #fff;
    padding: 10px;
    width: 350px;
    height: 100px;
    bottom: -50px;
    left: 20px;
    position: absolute;
    border-radius: 5px;
  }
  .card-2 .content {
    margin-top: 50px;
  }
  .card-2 .content a {
    color: red;
  }
  .form-control:focus {
    box-shadow: none;
    border: 2px solid red;
  }
  .validate {
    border-radius: 20px;
    height: 40px;
    background-color: red;
    border: 1px solid red;
    width: 140px;
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

.no-scroll {
  overflow: hidden; /* Khóa cuộn */
}
  </style>
  

<script setup>
  import axios from 'axios'
  import {ref, getCurrentInstance, onMounted, onUnmounted, onBeforeUnmount} from 'vue';
  import {useRouter, useRoute} from 'vue-router'
  import {useToast} from 'vue-toastification'
  import {useCounterStore} from '../store'

  const otp = ref({
    a:"",
    b:"",
    c:"",
    d:"",
    e:"",
    f:""
  })

  const store = useCounterStore()

  const actionData = ref({
    email: '',
    code: ''
  })

  const OTPNew = ref({
    email: '',
    type: 'create password'
  })

  const isLoading = ref(false)
  const sodem = ref(60)
  const router = useRouter()
  const Toast = useToast()
  const {proxy} = getCurrentInstance()
  const hostname = proxy?.hostname
  const route = useRoute()
  let interVal = null
  onMounted(() => {
    if(store.getEmailOtp === "" || store.getEmailOtp == null){
      Toast.error("No Email")
      router.push("/login")
    }
    checkEmail(decodeURIComponent(route.query.email))
    Demnguoc()
    window.addEventListener('beforeunload', handlaner) // Bắt hành động khi người dùng load lại trang hoặc chuyển sang trang khác, sử dụng "beforeunload" để bắt sự kiện

    const isRouter = performance.getEntriesByType("navigation")[0].type === "reload"
    if(isRouter){
      router.push("/login")
      localStorage.clear()
      store.clearStore()
    }
  })
  onUnmounted(() => {
    clearInterval(interVal)
  })

   // Dọn dẹp khi component bị hủy
  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handlaner) // Xóa sự kiện"beforeunload" khi đã chuyển trang hoặc đã load lại trang
  })

  const checkEmail = async (email) => {
    const res = await axios.post(hostname + `/api/Account/CheckEmail?Email=${email}`)
    if(!res.data.success){
      router.push("/login")
    }
  }
  const handlaner = async (event) => {
    event.preventDefault();
    localStorage.setItem("number", sodem.value)
  }

  const Demnguoc = () => {
    interVal = setInterval(() => {
      const checkNumber = localStorage.getItem("number")
      if(checkNumber != null){
        const numberValue = parseInt(checkNumber, 10) /**"10" ở đây là cơ số của hệ thập phân (decimal), hệ số mà chúng ta thường sử dụng trong cuộc sống hằng ngày.  Cơ số (hệ đếm) của phép chuyển đổi, là một số nguyên từ 2 đến 36.*/
                            // Ví vụ: "parseInt("42", 10);" // Kết quả: 42
        if(!isNaN(numberValue)){
          if(numberValue > 0){
            sodem.value = numberValue
            sodem.value--
          }
          else{
            clearInterval(interVal)
          }
        }
        
      }else{
        if(sodem.value > 0){
            sodem.value--
        }else{
            clearInterval(interVal)
        }
      }
        
    }, 1000)
  }

  const resetOTP = async () => {
    isLoading.value = true
    document.body.classList.add('loading')

    OTPNew.value.email = store.getEmailOtp

    const res = await axios.post(hostname + '/api/Account/LoadOTP', OTPNew.value)
    console.log(res)
    if(res.data === undefined){
        Toast.error("Hình như có lỗi !")
    }
    else if(res.data.success){
        clearInterval(interVal)
        sodem.value = 60
        Demnguoc()
    }else{
        Toast.error("Error!", {timeout: 3000})
    }

    isLoading.value = false
    document.body.classList.remove('loading')
  }
  const Validate = async () =>{
    isLoading.value = true
    document.body.classList.add('loading')

    const gepString = otp.value.a + otp.value.b + otp.value.c + otp.value.d + otp.value.e + otp.value.f
    actionData.value.code = gepString
    actionData.value.email = store.getEmailOtp

        const res = await axios.post(hostname + `/api/Account/Action`, actionData.value)
        if(res.data.success){
          isLoading.value = false
          document.body.classList.remove('loading')
          Toast.success("Success!", {timeout: 3000})
          router.push("/login")
        }else if(!res.data.success){
            Toast.error("Error!", {timeout: 3000})
        }

        isLoading.value = false
        document.body.classList.remove('loading')
  }
  document.addEventListener("DOMContentLoaded", function () {
    function OTPInput() {
      const inputs = document.querySelectorAll("#otp > *[id]");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("keydown", function (event) {
          if (event.key === "Backspace") {
            inputs[i].value = "";
            if (i !== 0) inputs[i - 1].focus();
          } else {
            if (i === inputs.length - 1 && inputs[i].value !== "") {
              return true;
            } else if (event.keyCode > 47 && event.keyCode < 58) {
              inputs[i].value = event.key;
              if (i !== inputs.length - 1) inputs[i + 1].focus();
              event.preventDefault();
            } else if (event.keyCode > 64 && event.keyCode < 91) {
              inputs[i].value = String.fromCharCode(event.keyCode);
              if (i !== inputs.length - 1) inputs[i + 1].focus();
              event.preventDefault();
            }
          }
        });
      }
    }
    OTPInput();
  });
  </script>