import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axiosInstance from './axiosInstance'; // Import Axios đã cấu hình
import VueAxios from 'vue-axios';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart, registerables } from 'chart.js';
import Vue3Notification from '@kyvg/vue3-notification';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import Toast, {POSITION}from 'vue-toastification';
import 'vue-toastification/dist/index.css';

Chart.register(...registerables);

const app = createApp(App);

app.config.globalProperties.hostname = "https://localhost:44376"; // Hostname gốc

// Gắn Axios toàn cục
app.config.globalProperties.$axios = axiosInstance;

// Tạo instance Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Sử dụng các plugin
app.use(pinia);
app.use(router);
app.use(store);
app.use(Toast, {
    position: POSITION.TOP_RIGHT, // Vị trí thông báo (có thể thay đổi)
    timeout: 5000, // Thời gian hiển thị (ms)
  });
app.use(VueAxios, axiosInstance);
app.use(Vue3Notification);

app.mount('#app');
