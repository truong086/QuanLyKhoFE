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
import Toast from 'vue-toastification'
import VueMap from '@fawmi/vue-google-maps';
import 'vue-toastification/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createI18n } from 'vue-i18n'

// Cấu hình i18n
const i18n = createI18n({
    legacy: false,
    locale: 'zh', // Ngôn ngữ mặc định
    messages: {
      en: {
        
        dashboard: 'Dashboard',
        profile: 'Profile',
        warehouse: 'Warehouse',
        plan: 'Plan',
        showplan: 'Show plan',
        productwarehouse: 'Product in warehouse',
        product: 'Product',
        status: 'Status',
        table: 'Table',
        planof: 'Plan of',
        statistics: 'Statistics',
        pagesize: 'Page size',
        floor: 'Floor',
        area: 'Area',
        almostFull: 'Almost full !!!',
        full: 'Full !!!',
        update: 'Update',
        reduce: 'Reduce quantity',
        close: 'Close',
        search: 'Search',
        add: 'Add',
        delete: 'Delete',
        confirm: 'Confirm',
        cancel: 'Cancel',
        quantity: 'Quantity',
        settings: 'Settings',
        logout: 'Logout'
      },
      vi: {
        dashboard: 'Bảng điều khiển',
        profile: 'Hồ sơ',
        warehouse: 'Kho hàng',
        showplan: 'Hiển thị kế hoạch',
        plan: 'Kế hoạch',
        productwarehouse: 'Sản phẩm trong kho',
        product: 'Sản phẩm',
        status: 'Trang thái',
        table: 'Bảng',
        planof: 'Kế hoạch của',
        statistics: 'Thống kê',
        pagesize: 'Số lượng trang',
        floor: 'Tầng',
        area: 'Khu vực',
        almostFull: 'Sắp đầy !!!',
        full: 'Đầy !!!',
        update: 'Cập nhật',
        reduce: 'Giảm số lượng',
        close: 'Đóng',
        search: 'Tìm kiếm',
        add: 'Thêm',
        delete: 'Xóa',
        confirm: 'Xác nhận',
        cancel: 'Hủy',
        quantity: 'Số lượng',
        settings: 'Cài đặt',
        logout: 'Đăng xuất'
      },
      zh: {
        dashboard: '儀表盤',
        profile: '資料',
        warehouse: '倉庫',
        showplan: '顯示計劃',
        plan: '計劃',
        productwarehouse: '產品在倉庫',
        product: '產品',
        status: '狀態',
        table: '桌子',
        planof: '計劃的',
        statistics: '統計',
        pagesize: '頁面大小',
        floor: '樓層',
        area: '區域',
        almostFull: '幾乎滿了 !!!',
        full: '满了 !!!',
        update: '更新',
        reduce: '减少数量',
        close: '關閉',
        search: '搜尋',
        add: '添加',
        delete: '刪除',
        confirm: '確認',
        cancel: '取消',
        quantity: '數量',
        settings: '設置',
        logout: '登出'
      }
    }
})

// Khởi tạo ứng dụng
Chart.register(...registerables)
const app = createApp(App);

// Tạo instance Pinia
const pinia = createPinia();
app.use(pinia);
// app.config.globalProperties.hostname = "http://52.184.83.97:5000"
app.config.globalProperties.hostname = "https://localhost:44376"

app.use(VueMap, {
    load: {
        key: 'AIzaSyBkgBNM7Mtgg6I3SvhOlwZCgqp7vFAPrS8',
        libraries: 'places' // Để hỗ trợ tìm kiếm
    }
})

pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(store)
app.use(Toast)
app.use(VueAxios, axios)
app.use(Vue3Notification)
app.use(i18n) // Sử dụng i18n

app.mount('#app');
