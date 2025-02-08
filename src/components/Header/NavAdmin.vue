<template>
    <aside class="left-sidebar">
            <!-- Sidebar scroll-->
            <div class="scroll-sidebar">
                <!-- Sidebar navigation-->
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <!-- <li> <a class="waves-effect waves-dark" href="index.html" aria-expanded="false"><i
                                    class="fa fa-tachometer"></i><span class="hide-menu">Dashboard</span></a>
                        </li> -->
                        <li v-on:click="SwapBackGroupColor('b1')" class="b1">
                        <router-link to="/warehouse" class="waves-effect waves-dark b1" aria-expanded="false">
                            <i class="fa fa-tachometer"></i>
                            <span class="hide-menu">Dashboard</span>
                        </router-link>
                        </li>
                        <li v-on:click="SwapBackGroupColor('b2')" class="b2"> <a class="waves-effect waves-dark" @click="next" aria-expanded="false"><i
                                    class="fa fa-user-circle-o"></i><span class="hide-menu">Profile</span></a>
                        </li>
                        <li v-on:click="SwapBackGroupColor('b3')" v-if="store.getRole(0).includes('Admin')" class="b3"> <router-link class="waves-effect waves-dark" to="/Plan" aria-expanded="false"><i
                                    class="fa fa-table"></i><span class="hide-menu">Show Plan</span></router-link>
                        </li>
                        <li class="b4" v-if="store.getRole(0).includes('Admin')" v-on:click="SwapBackGroupColor('b4')"> 
                        <router-link to="/TransferPage" class="waves-effect waves-dark" href="icon-fontawesome.html" aria-expanded="false">
                          <i
                            class="fa fa-smile-o"></i><span class="hide-menu">Plan</span>
                        </router-link>
                           
                        </li>
                        <li class="b5" v-on:click="SwapBackGroupColor('b5')"> 
                        <router-link to="/SliderPage" class="waves-effect waves-dark" href="icon-fontawesome.html" aria-expanded="false">
                          <i class="fa fa-product-hunt" aria-hidden="true"></i><span class="hide-menu">Product</span>
                        </router-link>
                           
                        </li>
                        <!-- <li v-on:click="SwapBackGroupColor('b6')" class="b6"> <router-link class="waves-effect waves-dark" to="/map" aria-expanded="false"><i
                                    class="fa fa-globe"></i><span class="hide-menu">Map</span></router-link>
                        </li> -->
                        <li class="b7" v-on:click="SwapBackGroupColor('b7')">
                        <router-link to="/ware" class="waves-effect waves-dark" aria-expanded="false">
                            <i class="fa fa-bookmark-o"></i>
                            <span class="hide-menu">Status</span>
                        </router-link>
                        </li>
                        <li class="b8" v-on:click="SwapBackGroupColor('b8')" v-if="store.getRole(0).includes('Admin')">
                        <router-link to="/tablepage" class="waves-effect waves-dark" aria-expanded="false">
                            <i class="fa fa-info-circle"></i>
                            <span class="hide-menu">Index</span>
                        </router-link>
                        
                        </li>
                        <li class="b9" v-on:click="SwapBackGroupColor('b9')">
                          <router-link to="/PlanOfAccount" class="waves-effect waves-dark" aria-expanded="false">
                          <i class="fa fa-paper-plane" aria-hidden="true"></i>
                            <span class="hide-menu">Plan Of {{ store.getIdAccountName }}</span>
                        </router-link>
                        </li>
                        <li class="b10" v-on:click="SwapBackGroupColor('b10')">
                          <router-link to="/Statistics" class="waves-effect waves-dark" aria-expanded="false">
                            <i class="fa fa-desktop" aria-hidden="true"></i>
                            <span class="hide-menu">Statistics</span>
                        </router-link>
                        </li>
                        <!----<li> <a class="waves-effect waves-dark" href="pages-error-404.html" aria-expanded="false"><i
                                    class="fa fa-question-circle"></i><span class="hide-menu">404</span></a>
                        </li> ---->
                    </ul>
                    <div class="text-center mt-4">
                        <a href="https://www.wrappixel.com/templates/adminwrap/"
                            class="btn waves-effect waves-light btn-info hidden-md-down text-white"> Hello World !!!</a>
                    </div>
                </nav>
                <!-- End Sidebar navigation -->
            </div>
            <!-- End Sidebar scroll-->
        </aside>
</template>

<style scoped>
/* Căn các phần tử trong sidebar sang trái */
.left-sidebar .sidebar-nav ul#sidebarnav {
  padding-left: 0; /* Loại bỏ padding bên trái nếu có */
  text-align: left; /* Căn nội dung sang trái */
}

.left-sidebar .sidebar-nav ul#sidebarnav li {
  list-style: none; /* Ẩn ký hiệu danh sách nếu cần */
  text-align: left; /* Đảm bảo nội dung bên trong li được căn trái */
}

.left-sidebar .sidebar-nav ul#sidebarnav li a,
.left-sidebar .sidebar-nav ul#sidebarnav li router-link {
  display: flex; /* Giúp căn chỉnh icon và text trên cùng một hàng */
  align-items: center; /* Căn giữa icon và text theo chiều dọc */
  text-align: left; /* Căn chữ sang trái */
  padding: 10px 15px; /* Tùy chỉnh khoảng cách bên trong */
  text-decoration: none; /* Loại bỏ gạch chân (nếu có) */
}

.left-sidebar .sidebar-nav ul#sidebarnav li a i {
  margin-right: 10px; /* Thêm khoảng cách giữa icon và text */
}

</style>

<script setup>
  import {useRouter} from 'vue-router'
  import {useCounterStore} from '../../store'
  import {ref, onMounted} from 'vue'

  const store = useCounterStore()
  const accountName = ref('')
  const accountImage = ref('')
  const isBackGroup = ref(null)

  onMounted(() => {
    accountImage.value = store.getIdAccountImage
    accountName.value = store.getIdAccountName
  })

  const SwapBackGroupColor = (data) => {
    if(isBackGroup.value !== null)
        document.querySelector('.' + isBackGroup.value).style.backgroundColor = 'transparent'

    document.querySelector('.' + data).style.backgroundColor = 'rgba(79, 232, 232, 0.5)'

    isBackGroup.value = data
  }
    const router = useRouter()
    const next = () => {
        router.push("/ProfilePage")
    }
</script>