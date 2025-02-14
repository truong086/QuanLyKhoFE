<template>
  <div class="wrapper"> 
    <div class="inner">
      <form>
        <h3>RegisterPage</h3>

        <div class="form-wrapper">
          <label for="username" class="label-input">Username</label>
          <input
            type="text"
            class="form-control"
            v-model="dangky.username"
            id="username"
          />
        </div>

        <div class="form-wrapper">
          <label for="password" class="label-input">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="dangky.password"
            id="password"
          />
        </div>

        <!-- Image Upload -->
        <div class="image-upload-container">
          <label class="image-upload">
            <span>Click to upload your profile picture</span>
            <input
              type="file"
              accept="image/*"
              id="profile-pic"
              style="display: none"
              @change="previewImage"
            />
          </label>
        </div>
        <div class="preview-container" id="image-preview"></div>

        <div class="form-wrapper">
          <label for="email" class="label-input">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="dangky.email"
            id="email"
          />
        </div>

        <div class="form-wrapper">
          <label for="phone" class="label-input">Phone</label>
          <input
            type="text"
            class="form-control"
            v-model="dangky.phone"
            id="phone"
          />
        </div>

        <div class="form-wrapper">
          <label for="address" class="label-input">Address</label>
          <input
            type="text"
            class="form-control"
            v-model="dangky.address"
            id="address"
          />
        </div>

        <button type="button" @click="dangKyAccount">Register</button>
      </form>
      <div class="image-holder"></div>
    </div>
  </div>

  <!-- Hiển thị màn hình loading -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>Đang tải...</p>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { useToast } from "vue-toastification";
import axios from 'axios'
import {useRouter} from 'vue-router'
import {useCounterStore} from '../store'
const dangky = ref({
  username: "",
  password: "",
  image: null,
  email: "",
  phone: "",
  address: "",
});

const store = useCounterStore()
const router = useRouter()
const Toast = useToast();
const isLoading = ref(false);

const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname || "https://localhost:44378";

const validateEmail = (value) => {
  const check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!check.test(value)) {
    return false;
  }
  return true;
};

const previewImage = (event) => {
  const file = event.target.files[0];

  if (file) {
    dangky.value.image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById("image-preview");
      preview.innerHTML = `<img src="${e.target.result}" style="width: 80px; height: 80px; border-radius: 50%;" alt="Profile Picture Preview">`;
    };
    reader.readAsDataURL(file);
  }
};

const checkDataNull = () => {
  if (
    dangky.value.username == "" ||
    dangky.value.email == "" ||
    dangky.value.password == "" ||
    dangky.value.phone == "" ||
    dangky.value.address == ""
  )
    return false;

  return true;
};
const dangKyAccount = async () => {
  if (!validateEmail(dangky.value.email)) {
    Toast.error("Data Email Null");
    return false;
  }

  if (!checkDataNull()) {
    Toast.error("Dữ liệu không được để trống", { timeout: 3000 });
    return;
  }

  if (dangky.value.image == null) {
    Toast.error("Chưa chọn ảnh", { timeout: 3000 });
    return;
  }

  isLoading.value = true;
  document.body.classList.add("loading");
  document.body.style.overflow = "hidden";
  const form = new FormData();

  form.append("image", dangky.value.image);
  form.append("password", dangky.value.password);
  form.append("email", dangky.value.email);
  form.append("phone", dangky.value.phone);
  form.append("username", dangky.value.username);
  form.append("address", dangky.value.address);
  const res = await axios.post(hostName + "/api/Account/Add", form);
  if (res.data.success) {
    isLoading.value = false;
    document.body.classList.remove("loading");
    document.body.style.overflow = "auto";
    const encodeURI = encodeURIComponent(dangky.value.email)
    router.push({ name: "GetOTP", params: { email: dangky.value.email }, query: {email: encodeURI} });
    store.setEmailOtp(dangky.value.email)
  } else if (!res.data.success) {
    Toast.error(res.data.error);
    isLoading.value = false;
    document.body.classList.remove("loading");
  }
};
</script>

<style scoped>
/* Các kiểu CSS của bạn ở đây */

.image-holder {
  background-image: url(../assets/RegisterPageTemplate/images/anh-cute-pho-mai-que-con-gai-1.jpg);
  background-repeat: no-repeat;
  background-position: center;
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
.image-preview img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
}
</style>
