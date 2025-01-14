import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Chart, registerables } from 'chart.js'
import VueChart from 'vue-chartjs'
import Vue3Notification from '@kyvg/vue3-notification'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import  Toast  from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Chart.register(...registerables)
const app = createApp(App);
app.config.globalProperties.hostname = "https://localhost:44378" 

// Tạo instance Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
// Sử dụng Pinia trong ứng dụng
app.use(pinia);
// app.use(createPinia())
app.use(VueChart)
app.use(router)
app.use(store)
app.use(Toast)
app.use(VueAxios, axios)
app.use(Vue3Notification)

app.mount('#app');
