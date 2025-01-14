import { createRouter, createWebHistory } from 'vue-router';
import DangkyPager from './components/WarehouseManagement.vue';  // Vẫn giữ nguyên WarehouseManagement.vue
import QuanLyKho from './components/QuanLyKho.vue';  // Import thêm QuanLyKho.vue
import { useCounterStore } from './store';

const routes = [
  {
    path: "/",
    name: "Login",
    component: DangkyPager, // Đăng ký trang đăng nhập
  },
  {
    path: "/warehouse",  // Thêm route cho QuanLyKho.vue
    name: "QuanLyKho",
    component: QuanLyKho, // Sử dụng component QuanLyKho.vue
    meta: {
      requiresAuth: true,
      css: ["/path/to/custom.css"],
      js: ["/path/to/custom.js"],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function loadBootstrap(to) {
  // Load CSS
  const cssFiles = to.meta.css || [];
  cssFiles.forEach((css) => {
    if (!document.querySelector(`link[href="${css}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = css;
      document.head.appendChild(link);
    }
  });

  // Load JS
  const jsFiles = to.meta.js || [];
  jsFiles.forEach((js) => {
    if (!document.querySelector(`script[src="${js}"]`)) {
      const script = document.createElement('script');
      script.src = js;
      script.async = false;
      document.body.appendChild(script);
    }
  });
}

router.afterEach((to) => {
  loadBootstrap(to);
});

router.beforeEach((to, from, next) => {
  loadBootstrap(to);
  const counter = useCounterStore();
  const paths = [ "/", "/kho", "/warehouse"];

  const checkPaths = !paths.includes(to.path);

  const auth = to.meta.requiresAuth;
  const roles = to.meta.roleAdmin;
  const token = counter.getToken;
  const role = counter.getRole(0);

  if (checkPaths && !token) {
    next("/login");
  }
  if (auth && !token) {
    next("/login");
  } else if (auth && token) {
    if (!roles || roles.includes(role)) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
  if (paths) {
    next("/login");
  } else {
    next();
  }
});

export default router;
