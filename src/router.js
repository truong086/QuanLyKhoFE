import { createRouter, createWebHistory } from 'vue-router';
import WarehouseManagement from './components/WarehouseManagement.vue';  // Vẫn giữ nguyên WarehouseManagement.vue
import QuanLyKho from './components/QuanLyKho.vue';  // Import thêm QuanLyKho.vue
import LoginPage from './components/loginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import GetOTP from './components/GetOTP.vue';
import AddorEdit from './components/AddorEdit.vue';

import { useCounterStore } from './store';

const routes = [
  {
    path: "/Ware",
    name: "Ware",
    component: WarehouseManagement,
  },
  {
    path: "/AddorEdit",
    name: "AddorEdit",
    component: AddorEdit,
  },
  {
    path: "/getotp",
    name: "GetOTP",
    component: GetOTP, 
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage, // Đăng ký trang đăng nhập
    meta: {
      requiresAuth: false,
      css: ["https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
            "https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap",
            "/loginTemplate/css/style.css"],
      js: ["/loginTemplate/js/jquery.min.js",
          "/loginTemplate/js/popper.js",
          "/loginTemplate/js/bootstrap.min.js",
          "/loginTemplate/js/main.js"],
    },
  },
  {
    path: "/register",
    name: "Register", 
    component: RegisterPage,
    meta: {
      requiresAuth: false,
      css: ["/RegisterPageTemplate/css/style.css",
            "/RegisterPageTemplate/fonts/material-design-iconic-font/css/material-design-iconic-font.min.css",
          ],
      js: ["/RegisterPageTemplate/js/jquery-3.3.1.min.js",
           "/RegisterPageTemplate/js/main.js"],
    },
  },  
  {
    path: "/warehouse",  // Thêm route cho QuanLyKho.vue
    name: "QuanLyKho",
    component: QuanLyKho, // Sử dụng component QuanLyKho.vue
    meta: {
      requiresAuth: false,
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
  const paths = [ "/", "/ware", "/warehouse","/login","/register","/getotp","/Add","/"];

  const checkPaths = !paths.includes(to.path);

  const auth = to.meta.requiresAuth;
  const roles = to.meta.roleAdmin;
  const token = counter.getToken;
  const role = counter.getRole(0);

  if (checkPaths) {
    next();
  }
  if (auth && !token) {
    next("/warehouse");
  } else if (auth && token) {
    if (!roles || roles.includes(role)) {
      next();
    } else {
      next("/warehouse");
    }
  } else {
    next();
  }
  if (paths) {
    next("/warehouse");
  } else {
    next();
  }
});

export default router;
