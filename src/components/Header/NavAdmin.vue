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
                        <li>
                        <router-link to="/warehouse" class="waves-effect waves-dark" aria-expanded="false">
                            <i class="fa fa-tachometer"></i>
                            <span class="hide-menu">Dashboard</span>
                        </router-link>
                        </li>
                        <li> <a class="waves-effect waves-dark" @click="next" aria-expanded="false"><i
                                    class="fa fa-user-circle-o"></i><span class="hide-menu">Profile</span></a>
                        </li>
                        <li> <a class="waves-effect waves-dark" href="table-basic.html" aria-expanded="false"><i
                                    class="fa fa-table"></i><span class="hide-menu">Tables</span></a>
                        </li>
                        <li> <a class="waves-effect waves-dark" href="icon-fontawesome.html" aria-expanded="false"><i
                                    class="fa fa-smile-o"></i><span class="hide-menu">Plan</span></a>
                        </li>
                        <li> <a class="waves-effect waves-dark" href="map-google.html" aria-expanded="false"><i
                                    class="fa fa-globe"></i><span class="hide-menu">Map</span></a>
                        </li>
                        <li>
                        <router-link to="/admin/ware" class="waves-effect waves-dark" aria-expanded="false">
                            <i class="fa fa-bookmark-o"></i>
                            <span class="hide-menu">Status</span>
                            <span class="hide-menu">Status</span>
                        </router-link>
                        </li>
                        <li>
                        <router-link to="/admin/tablepage" class="waves-effect waves-dark" aria-expanded="false">
                            <i class="fa fa-info-circle"></i>
                            <span class="hide-menu">Index</span>
                        </router-link>
                        </li>
                        <!----<li> <a class="waves-effect waves-dark" href="pages-error-404.html" aria-expanded="false"><i
                                    class="fa fa-question-circle"></i><span class="hide-menu">404</span></a>
                        </li> ---->
                    </ul>
                    <div class="text-center mt-4">
                        <a href="https://www.wrappixel.com/templates/adminwrap/"
                            class="btn waves-effect waves-light btn-info hidden-md-down text-white"> Upgrade to Pro</a>
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
    const router = useRouter()
    const next = () => {
        router.push("/ProfilePage")
    }
</script>