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