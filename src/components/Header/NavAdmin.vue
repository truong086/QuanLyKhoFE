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
                            <span class="hide-menu">{{ t('dashboard') }}</span>
                        </router-link>
                        </li>
                        <li v-on:click="SwapBackGroupColor('b2')" class="b2"> <a class="waves-effect waves-dark" @click="next" aria-expanded="false"><i
                                    class="fa fa-user-circle-o"></i>
                                    <span class="hide-menu">{{ t('profile') }}</span></a>
                        </li>
                        <li v-on:click="SwapBackGroupColor('b3')" v-if="store.getRole(0).includes('Admin')" class="b3"> <router-link class="waves-effect waves-dark" to="/Plan" aria-expanded="false"><i
                                    class="fa fa-calendar"></i>
                                    <span class="hide-menu">{{ t('showplan') }}</span></router-link>
                        </li>
                        <li class="b4" v-if="store.getRole(0).includes('Admin')" v-on:click="SwapBackGroupColor('b4')"> 
                        <router-link to="/TransferPage" class="waves-effect waves-dark" href="icon-fontawesome.html" aria-expanded="false">
                          <i
                            class="fa fa-smile-o"></i><span class="hide-menu">{{ t('plan') }}</span>
                        </router-link>
                           
                        </li>
                        <li class="b5" v-on:click="SwapBackGroupColor('b5')"> 
                        <router-link to="/SliderPage" class="waves-effect waves-dark" href="icon-fontawesome.html" aria-expanded="false">
                          <i class="fa fa-product-hunt" aria-hidden="true"></i><span class="hide-menu">{{ t('product') }}</span>
                        </router-link>
                           
                        </li>
                        <!-- <li v-on:click="SwapBackGroupColor('b6')" class="b6"> <router-link class="waves-effect waves-dark" to="/map" aria-expanded="false"><i
                                    class="fa fa-globe"></i><span class="hide-menu">Map</span></router-link>
                        </li> -->
                        <li v-on:click="SwapBackGroupColor('b6')" class="b6"> 
                            <router-link class="waves-effect waves-dark" to="/Productwarehouse" aria-expanded="false">
                                <i class="fa fa-home" aria-hidden="true"></i>
                                <span class="hide-menu">{{ t('productwarehouse') }}</span>
                            </router-link>
                        </li>

                        <li class="b7" v-on:click="SwapBackGroupColor('b7')">
                        <router-link to="/ware" class="waves-effect waves-dark" aria-expanded="false">
                            <i class="fa fa-bookmark-o"></i>
                            <span class="hide-menu">{{ t('status') }}</span>
                        </router-link>
                        </li>
                        <li class="b8" v-on:click="SwapBackGroupColor('b8')" v-if="store.getRole(0).includes('Admin')">
                        <router-link to="/tablepage" class="waves-effect waves-dark" aria-expanded="false">
                            <i class="fa fa-table"></i>
                            <span class="hide-menu">{{ t('table') }}</span>
                        </router-link>
                        
                        </li>
                        <li class="b9" v-on:click="SwapBackGroupColor('b9')">
                          <router-link to="/PlanOfAccount" class="waves-effect waves-dark" aria-expanded="false">
                          <i class="fa fa-paper-plane" aria-hidden="true"></i>
                            <span class="hide-menu">{{ t('planof') }} {{ store.getIdAccountName }}</span>
                        </router-link>
                        </li>
                        <li class="b10" v-on:click="SwapBackGroupColor('b10')">
                          <router-link to="/Statistics" class="waves-effect waves-dark" aria-expanded="false">
                            <i class="fa fa-desktop" aria-hidden="true"></i>
                            <span class="hide-menu">{{ t('statistics') }}</span>
                        </router-link>
                        </li>
                        <!----<li> <a class="waves-effect waves-dark" href="pages-error-404.html" aria-expanded="false"><i
                                    class="fa fa-question-circle"></i><span class="hide-menu">404</span></a>
                        </li> ---->
                    </ul>
                    <div class="text-center mt-4">
                    <select v-model="selectedLanguage" @change="changeLanguage" class="btn waves-effect waves-light btn-info hidden-md-down text-white">
                      <option value="en">English</option>
                      <option value="vi">Tiếng Việt</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>

                </nav>
                <!-- End Sidebar navigation -->
            </div>
            <!-- End Sidebar scroll-->
        </aside>
</template>

<style scoped>
/* Thiết lập Glassmorphism */
.left-sidebar {
  width: 250px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

/* Scroll sidebar */
.scroll-sidebar {
  overflow-y: auto;
  height: calc(100vh - 20px);
  padding: 10px;
}

/* Sidebar navigation */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#sidebarnav {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

/* Sidebar items */
#sidebarnav li {
  width: 100%;
  transition: background 0.3s ease, transform 0.2s ease;
}

#sidebarnav li a {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: rgb(14, 2, 2);
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: background 0.3s ease, transform 0.2s ease;
}

/* Icon chỉnh đẹp hơn */
#sidebarnav li a i {
  margin-right: 12px;
  font-size: 18px;
  transition: transform 0.2s ease-in-out;
}

/* Hover effect */
#sidebarnav li:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

#sidebarnav li a:hover i {
  transform: scale(1.1);
}

/* Click hiệu ứng màu */
#sidebarnav li.active {
  background: linear-gradient(45deg, rgba(79, 232, 232, 0.7), rgba(0, 128, 255, 0.6));
}

/* Căn giữa nút ở cuối */
.text-center {
  text-align: center;
  margin-top: 20px;
}

/* Nút trong sidebar */
.text-center a {
  display: inline-block;
  padding: 10px 20px;
  background: linear-gradient(45deg, #4fe8e8, #0080ff);
  color: white;
  font-weight: bold;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.text-center a:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 128, 255, 0.4);
}

</style>

<script setup>
  import { useRouter } from 'vue-router'
  import { useCounterStore } from '../../store'
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n' // Import vue-i18n

  const store = useCounterStore()
  const accountName = ref('')
  const accountImage = ref('')
  const isBackGroup = ref(null)

  const { t, locale } = useI18n()  // Sử dụng i18n để thay đổi ngôn ngữ

  onMounted(() => {
    accountImage.value = store.getIdAccountImage
    accountName.value = store.getIdAccountName
  })

  const SwapBackGroupColor = (data) => {
    if (isBackGroup.value !== null)
        document.querySelector('.' + isBackGroup.value).style.backgroundColor = 'transparent'

    document.querySelector('.' + data).style.backgroundColor = 'rgba(79, 232, 232, 0.5)'

    isBackGroup.value = data
  }

  const router = useRouter()
  const next = () => {
    router.push("/ProfilePage")
  }

  // Lưu trữ ngôn ngữ đã chọn
  const selectedLanguage = ref('en')

  // Hàm thay đổi ngôn ngữ
  const changeLanguage = () => {
    locale.value = selectedLanguage.value // Cập nhật ngôn ngữ bằng vue-i18n
  }
</script>
