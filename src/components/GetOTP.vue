<template>
    <div class="container height-100 d-flex justify-content-center align-items-center">
      <div class="position-relative">
        <div class="card p-2 text-center">
          <h6>Nhập mã OTP để xác minh tài khoản</h6>
          <div> 
            <span>Mã OTP đã được gửi tới</span> 
            <small id="maskedNumber">*******9897</small> 
          </div>
          <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2">
            <input class="m-2 text-center form-control rounded" type="text" maxlength="1" v-for="n in 6" :key="n" v-model="otp[n - 1]" @input="handleInput(n - 1)" @keydown="handleBackspace($event, n - 1)" />
          </div>
          <div class="mt-4"> 
            <button @click="validateOTP" class="btn btn-danger px-4 validate">Xác nhận</button> 
          </div>
          <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
//   import { ref } from "vue";
//   import { useToast } from "vue-toastification";
  
//   const otp = ref(Array(6).fill(""));
//   const errorMessage = ref("");
//   const toast = useToast();
  
//   const handleInput = (index) => {
//     if (otp.value[index].length > 1) {
//       otp.value[index] = otp.value[index][0]; // Chỉ lấy ký tự đầu tiên
//     }
  
//     if (otp.value[index] !== "" && index < otp.value.length - 1) {
//       document.querySelectorAll("#otp > input")[index + 1].focus();
//     }
//   };
  
//   const handleBackspace = (event, index) => {
//     if (event.key === "Backspace" && otp.value[index] === "" && index > 0) {
//       document.querySelectorAll("#otp > input")[index - 1].focus();
//     }
//   };
  
//   const validateOTP = async () => {
//     const otpCode = otp.value.join("");
  
//     if (otpCode.length !== 6) {
//       errorMessage.value = "Vui lòng nhập đầy đủ mã OTP.";
//       return;
//     }
  
//     errorMessage.value = ""; // Xóa thông báo lỗi nếu có
  
//     try {
//       const response = await axios.post("/api/otp/verify", { otp: otpCode });
  
//       if (response.status === 200) {
//         toast.success("Xác minh thành công!");
//       } else {
//         throw new Error("Xác minh thất bại");
//       }
//     } catch (error) {
//       toast.error("Xác minh thất bại. Vui lòng thử lại.");
//       console.error("Lỗi xác minh OTP:", error);
//     }
//   };
  </script>
  
  <style scoped>
  .height-100 {
    height: 100vh;
  }
  
  .card {
    width: 400px;
    border: none;
    height: 350px;
    box-shadow: 0px 5px 20px 0px #d2dae3;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .card h6 {
    color: #333;
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .inputs input {
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 20px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  .inputs input:focus {
    border-color: #dc3545;
    outline: none;
  }
  
  button {
    border-radius: 20px;
    height: 45px;
    background-color: #dc3545;
    color: white;
    border: 1px solid #dc3545;
    width: 150px;
  }
  
  button:hover {
    background-color: #b12a37;
  }
  
  .text-danger {
    font-size: 14px;
  }
  </style>
  