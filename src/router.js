import { createRouter, createWebHistory } from 'vue-router';
import WarehouseManagement from './components/WarehouseManagement.vue';  // Vẫn giữ nguyên WarehouseManagement.vue
import QuanLyKho from './components/QuanLyKho.vue';  // Import thêm QuanLyKho.vue
import LoginPage from './components/loginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import GetOTP from './components/GetOTP.vue';
import AddorEdit from './components/AddorEdit.vue';
import AdminPage from './components/AdminTemplate/IndexPage.vue';
import dassboadPage from './components/AdminTemplate/DashboadPage.vue';
import TableAdmin from './components/AdminTemplate/TablePage.vue';
import TablePage from './components/TablePage.vue';
import DetailsPage from './components/DetailsPage.vue';
import ProfilePage from './components/ProfilePage.vue';
import AddCategory from './components/AddCategory.vue';
import WarehouseTransfer from './components/WarehouseTransfer.vue';
import AllCategory from './components/AllCategory.vue'
import ChiTietSanPham from './components/ChiTietSanPhamPage.vue';
import SliderPage from './components/DetailSlider.vue';
import AddProduct from './components/AddProduct.vue';

import { useCounterStore } from './store';

const routes = [

  {
    path: "/AllCategory",
    name: "AllCategory",
    component: AllCategory,
  },
  {
    path: "/DetailsPage",
    name: "DetailsPage",
    component: DetailsPage,
  },
  {
    path: "/tablepage",
    name: "tablepage",
    component: TablePage,
  },
  {
    path: "/test/Ware",
    name: "WareTest",
    component: WarehouseManagement,
    meta:{
      css: ['"/AdminTemplatePage/css/statusCss.css"']
    }
  },
  {
    path: "/getotp/:email",
    name: "GetOTP",
    component: GetOTP, 
  },
  {
    path: "/",
    name: "admin",
    component: AdminPage, 
    meta: {
      requiresAuth: true,
      css: [
        "/AdminTemplatePage/assets/images/favicon.png",
        "/AdminTemplatePage/assets/node_modules/bootstrap/css/bootstrap.min.css",
        "/AdminTemplatePage/assets/node_modules/perfect-scrollbar/css/perfect-scrollbar.css",
        "/AdminTemplatePage/assets/node_modules/morrisjs/morris.css",
        "/AdminTemplatePage/assets/node_modules/c3-master/c3.min.css",
        "/AdminTemplatePage/css/style.css",
        "/AdminTemplatePage/css/pages/dashboard1.css",
        "/AdminTemplatePage/css/colors/default.css",
        "/AdminTemplatePage/css/plan.css"
        
      ],
      js: [
        "/AdminTemplatePage/js/perfect-scrollbar.jquery.min.js",
        "/AdminTemplatePage/js/waves.js"
      ]
    },
    children: [
      {
        path: "/AddProduct",
        name: "AddProduct",
        component: AddProduct,
      },
      {
        path: "TransferPage",
        name: "TransferPage",
        component: WarehouseTransfer,
      },
      {
        path: "/ChiTietSanPham",
        name: "ChiTietSanPham",
        component: ChiTietSanPham,
      },
      {
        path: "/SliderPage",
        name: "SliderPage",
        component: SliderPage,
      },
      {
        path: "AddorEdit",
        name: "AddorEdit",
        component: AddorEdit
      },
      {
        path: "DetailsPage",
        name: "DetailsPage",
        component: DetailsPage,
      },
      {
        path: "AddCategory",
        name:  "AddCategory",
        component: AddCategory
        
      },
      {
        path: "ProfilePage",
        name: "ProfilePage",
        component: ProfilePage  
      },
      {
        path: "Addedit",
        name: "addedit",
        component: AddorEdit  
      },
      {
        path: "warehouse",  // Thêm route cho QuanLyKho.vue
        name: "QuanLyKho",
        component: QuanLyKho, // Sử dụng component QuanLyKho.vue
      },
      {
        path: "tablepage",
        name: "tablepage",
        component: TablePage,
      },
      {
        path: "Ware",
        name: "Ware",
        component: WarehouseManagement
      },
      {
        path: "dasboad", 
        name: "das",
        component: dassboadPage, 
      },
      {
        path: "table",
        name: "table",
        component: TableAdmin,
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage, // Đăng ký trang đăng nhập
    meta: {
      requiresAuth: false,
      css: ["https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
            "https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap",
            "/LoginTemplate/css/style.css"],
      js: ["/LoginTemplate/js/jquery.min.js",
          "/LoginTemplate/js/popper.js",
          "/LoginTemplate/js/bootstrap.min.js",
          "/LoginTemplate/js/main.js"],
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
  const paths = ["/login","/register","/getotp", "/"];

  const checkPaths = !paths.includes(to.path);

  const auth = to.meta.requiresAuth;
  const roles = to.meta.roleAdmin;
  const token = counter.getToken;
  const role = counter.getRole(0);

  if (checkPaths) {
    next();
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
