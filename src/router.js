import {createRouter, createWebHistory} from 'vue-router'
import DangkyPager from './components/HelloWorld.vue'
import {useCounterStore} from './store'
const routes = [
    {
        path: "/",
        name: "Login",
        component: DangkyPager
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

function loadBootstrap(to){
   // Load CSS
   const cssFiles = to.meta.css || [];
   cssFiles.forEach(css => {
     if (!document.querySelector(`link[href="${css}"]`)) {
       const link = document.createElement('link');
       link.rel = 'stylesheet';
       link.href = css;
       document.head.appendChild(link);
     }
   });
 
   // Load JS
   const jsFiles = to.meta.js || [];
   jsFiles.forEach(js => {
     if (!document.querySelector(`script[src="${js}"]`)) {
       const script = document.createElement('script');
       script.src = js;
       script.async = false;
       document.body.appendChild(script);
     }
   });
}
router.afterEach((to) =>{
  loadBootstrap(to)
})
router.beforeEach((to, from, next) => {
    loadBootstrap(to)
    const couter = useCounterStore()
    const paths = ['/Login', '/Otp', '/Dangky', "/"]

    const checkPaths = !paths.includes(to.path)

    const auth = to.meta.requiresAuth
    const roles = to.meta.roleAdmin
    // const trangthai = localStorage.getItem("trangthai")
    const token = couter.getToken
    // const role = localStorage.getItem("role")
    const role = couter.getRole(0)

    if(checkPaths && !token){
          
        next("/Login")
    }
    if(auth && !token){
        next("/Login")
    }else if(auth && token){
        if(!roles || roles.includes(role)){
          
            next()
        }else{
          
            next("/Login")
        }
    }
    else{
      
        next()
    }
    if(paths){
      
        next("/Login")
    }
    else{
      
        next()
    }
})


export default router