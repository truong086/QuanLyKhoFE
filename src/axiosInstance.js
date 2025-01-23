import axios from 'axios';

// Tạo một instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: 'https://localhost:44376', // Địa chỉ API gốc
  timeout: 10000, // Thời gian timeout (ms)
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Thêm token nếu cần
  }
});

// Cấu hình cho các request thông qua instance
axiosInstance.interceptors.request.use(
  (config) => {
    // Bạn có thể sửa đổi config trước khi request được gửi đi
    // Ví dụ: thêm token vào header
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Cấu hình cho các response thông qua instance
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý response nếu cần
    return response;
  },
  (error) => {
    // Xử lý lỗi ở đây
    if (error.response && error.response.status === 401) {
      // Xử lý nếu người dùng chưa đăng nhập (ví dụ: redirect về trang đăng nhập)
      console.log('Unauthorized, redirect to login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
