<template>
  <div class="register-page">
    <h2>Đăng ký tài khoản</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Tên đăng nhập</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      
      <div class="form-group">
        <label for="image">Hình ảnh</label>
        <input @change="handleImageChange" type="file" id="image" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="phone">Số điện thoại</label>
        <input v-model="phone" type="text" id="phone" required />
      </div>

      <div class="form-group">
        <label for="address">Địa chỉ</label>
        <input v-model="address" type="text" id="address" required />
      </div>

      <button type="submit">Đăng ký</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: '',
      image: null,
      email: '',
      phone: '',
      address: '',
    };
  },
  methods: {
    handleImageChange(event) {
      this.image = event.target.files[0];
    },
    async handleRegister() {
      if (!this.image) {
        this.$toast.error('Vui lòng chọn ảnh trước khi đăng ký');
        return;
      }
      try {
        // Tạo FormData
        const formData = new FormData();
        formData.append('username', this.username);
        formData.append('password', this.password);
        formData.append('image', this.image);
        formData.append('email', this.email);
        formData.append('phone', this.phone);
        formData.append('address', this.address);

        // Gửi yêu cầu đăng ký
        const response = await this.$axios.post('/api/Account/add', formData);

        // Nếu đăng ký thành công
        if (response.status === 200) {
          this.$toast.success('Yêu cầu đã được gửi');
        }
      } catch (error) {
        // Nếu có lỗi khi gửi yêu cầu
        this.$toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
        console.error('Đăng ký thất bại:', error);
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 5px 5px rgba(112, 117, 117, 0.1)   ;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
