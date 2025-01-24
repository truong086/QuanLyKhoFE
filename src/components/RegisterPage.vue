<template>
  <div class="wrapper">
    <div class="inner">
      <form @submit.prevent="sendRegiter">
        <h3>RegisterPage</h3>
        
        <div class="form-wrapper">
          <label for="username" class="label-input">Username</label>
          <input type="text" class="form-control" v-model="username" id="username" />
        </div>
        
        <div class="form-wrapper">
          <label for="password" class="label-input">Password</label>
          <input type="password" class="form-control" v-model="password" id="password" />
        </div>
        
        <div class="form-wrapper">
          <label for="image" class="label-input">Image</label>
          <input type="file" class="form-control" @change="handleImageUpload" id="image" />
        </div>

        <div class="form-wrapper">
          <label for="email" class="label-input">Email</label>
          <input type="email" class="form-control" v-model="email" id="email" />
        </div>

        <div class="form-wrapper">
          <label for="phone" class="label-input">Phone</label>
          <input type="text" class="form-control" v-model="phone" id="phone" />
        </div>

        <div class="form-wrapper">
          <label for="address" class="label-input">Address</label>
          <input type="text" class="form-control" v-model="address" id="address" />
        </div>

        <button type="submit">Register</button>
      </form>      
      <div class="image-holder">
        <img :src="imagePreview" v-if="imagePreview" alt="Image Preview" />
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axiosInstance';  // Đảm bảo import đúng axios instance
export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      password: "",
      image: null,
      imagePreview: null,
      email: "",
      phone: "",
      address: "",
      errorMessage: "",
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = file;
        this.imagePreview = URL.createObjectURL(file); // Preview image
         // Debug: Log file đã chọn
         console.log("Selected image:", file.name);
      }
    },
    async sendRegiter() {
  try {
     const formData = new FormData();
     formData.append("username", this.username);
     formData.append("password", this.password);
     formData.append("image", this.image);
     formData.append("email", this.email);
     formData.append("phone", this.phone);
     formData.append("address", this.address);

     // Debug: Log form data để kiểm tra
     console.log("Sending registration data:", {
       username: this.username,
       email: this.email,
       phone: this.phone,
       address: this.address,
       image: this.image ? this.image.name : null,  // Log tên file nếu có ảnh
     });

     // Gửi yêu cầu POST với FormData
     const response = await axiosInstance.post('/api/Account/Add', formData, {
       headers: {
        // 'Content-Type': 'multipart/form-data',  // Đảm bảo gửi đúng header cho file upload
       },
     });

     // Debug: Log response từ API
     console.log("Registration response:", response);

     if (response.data.success) {
       this.$toast.success("Đăng ký thành công!");
     } else {
       this.$toast.error("Đã xảy ra lỗi khi đăng ký!");
     }
   } catch (error) {
     console.error("Lỗi khi gửi yêu cầu đăng ký:", error);

     // Debug: Log chi tiết lỗi
     if (error.response) {
       console.error("Error response data:", error.response.data);
       console.error("Error response status:", error.response.status);
     } else {
       console.error("Error message:", error.message);
     }

     this.$toast.error("Có lỗi xảy ra, vui lòng thử lại!");
   }
 }

  }
};
</script>

<style scoped>
/* Các kiểu CSS của bạn ở đây */

.image-holder{
  background-image: url(../assets/RegisterPageTemplate/images/anh-cute-pho-mai-que-con-gai-1.jpg);
  background-repeat: no-repeat;
  background-position: center;
}

</style>
