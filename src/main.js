import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Chart, registerables } from 'chart.js'
import Vue3Notification from '@kyvg/vue3-notification'
import { createPinia } from 'pinia';
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import  Toast  from 'vue-toastification'
import VueMap from '@fawmi/vue-google-maps';
import 'vue-toastification/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Chart.register(...registerables)
const app = createApp(App);
// Tạo instance Pinia
const pinia = createPinia();
// Sử dụng Pinia trong ứng dụng
app.use(pinia);
app.config.globalProperties.hostname = "http://52.184.83.97:5000"
// app.config.globalProperties.hostname = "https://localhost:44376"
app.use(VueMap, {
    load: {
        key: 'AIzaSyBkgBNM7Mtgg6I3SvhOlwZCgqp7vFAPrS8',
        libraries: 'places' // Để hỗ trợ tìm kiếm
    }
})

pinia.use(piniaPluginPersistedstate)
// app.use(createPinia())
app.use(router)
app.use(store)
app.use(Toast)
app.use(VueAxios, axios)
app.use(Vue3Notification)

app.mount('#app');
