<template>
    <body class="fix-header fix-sidebar card-no-border">
        <div class="preloader">
        <div class="loader">
            <div class="loader__figure"></div>
            <p class="loader__label">Admin Wrap</p>
        </div>

        <div id="main-wrapper">
            <headerPage></headerPage>
            <navPage></navPage>

            <div class="page-wrapper">
                <router-view></router-view>
                <footerPage></footerPage>
            </div>
        </div>
    </div>
    </body>
</template>

<script setup>
import headerPage from '../Header/HeaderAdmin.vue';
import navPage from '../Header/NavAdmin.vue';
import footerPage from '../Foodter/foodterAdmin.vue';
</script>

<style scoped>
/* Cố định toàn bộ khung nhìn */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#main-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%; /* Chiều cao toàn màn hình */
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* Chiều cao header */
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.nav {
  position: fixed;
  top: 60px; /* Đẩy nav xuống dưới header */
  left: 0;
  width: 100%;
  height: 50px; /* Chiều cao nav */
  background-color: #555;
  color: white;
  z-index: 999;
}

.page-wrapper {
  margin-top: 110px; /* Tổng chiều cao header + nav */
  overflow-y: auto; /* Cho phép cuộn dọc */
  flex-grow: 1;
  padding: 20px;
  background-color: #f9f9f9;
}

.footer {
  position: relative;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
}

</style>