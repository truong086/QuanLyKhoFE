// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44376', // Đường dẫn API cơ bản giúp khi dùng đến phương thức get,post của thàng Api ngắn gọn hơn như: axiosInstance.get('/api/user',..,)
  timeout: 5000, // Thời gian chờ tối đa
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Gắn token vào header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Lỗi API:', error.response);
    return Promise.reject(error);
  }
);

export default axiosInstance;
