<template>
  <div class="container-fluid">
    <!-- ============================================================== -->
    <!-- Bread crumb and right sidebar toggle -->
    <!-- ============================================================== -->
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h3 class="text-themecolor">Profile</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
          <li class="breadcrumb-item active">Profile</li>
        </ol>
      </div>
      <div class="col-md-7 align-self-center">
        <a
          href="https://www.wrappixel.com/templates/adminwrap/"
          class="btn waves-effect waves-light btn btn-info pull-right hidden-sm-down text-white"
        >
          Upgrade to Pro</a
        >
      </div>
    </div>
    <!-- ============================================================== -->
    <!-- End Bread crumb and right sidebar toggle -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- Start Page Content -->
    <!-- ============================================================== -->
    <!-- Row -->
    <div class="row">
      <!-- Column -->
      <div class="col-lg-4 col-xlg-3 col-md-5">
        <div class="card">
          <div class="card-body">
            <center class="mt-4">
              <img
                :src="data.image"
                class="img-circle"
                width="150" height="150"
              />
              <h4 class="card-title mt-2">Hanna Gover</h4>
              <h6 class="card-subtitle">Accoubts Manager Amix corp</h6>
              <div class="row text-center justify-content-md-center">
                <div class="col-4">
                  <a href="javascript:void(0)" class="link"
                    ><i class="fa fa-user"></i>
                    <font class="font-medium">254</font>
                  </a>
                </div>
                <div class="col-4">
                  <a href="javascript:void(0)" class="link"
                    ><i class="fa fa-camera"></i>
                    <font class="font-medium">54</font>
                  </a>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
      <!-- Column -->
      <!-- Column -->
      <div class="col-lg-8 col-xlg-9 col-md-7">
        <div class="card">
          <!-- Tab panes -->
          <div class="card-body">
            <form class="form-horizontal form-material mx-2">
              <div class="form-group">
                <label class="col-md-12">{{data.username}}</label>
                <div class="col-md-12">
                  <input
                    type="text"
                    placeholder="Johnathan Doe"
                    class="form-control form-control-line"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="example-email" class="col-md-12">{{data.email}}</label>
                <div class="col-md-12">
                  <input
                    type="email"
                    placeholder="johnathan@admin.com"
                    class="form-control form-control-line"
                    name="example-email"
                    id="example-email"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-12">{{data.password}}</label>
                <div class="col-md-12">
                  <input
                    type="password"
                    value="password"
                    class="form-control form-control-line"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-12">{{data.phone}}</label>
                <div class="col-md-12">
                  <input
                    type="text"
                    placeholder="123 456 7890"
                    class="form-control form-control-line"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-12">Message</label>
                <div class="col-md-12">
                  <textarea
                    rows="5"
                    class="form-control form-control-line"
                  ></textarea>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-12">{{data.action == true ? "Đã Action" : "Chưa Action"}}</label>
                <div class="col-sm-12">
                  <select class="form-control form-control-line">
                    <option>London</option>
                    <option>India</option>
                    <option>Usa</option>
                    <option>Canada</option>
                    <option>Thailand</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-12">
                  <button class="btn btn-success">Update Profile</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- Column -->
    </div>
    <!-- Row -->
    <!-- ============================================================== -->
    <!-- End PAge Content -->
    <!-- ============================================================== -->
  </div>
</template>

<script setup>
    import {ref, getCurrentInstance, onMounted  } from 'vue'
    import axios from 'axios'
    import {useToast} from 'vue-toastification'
    import { useCounterStore } from "../store";

    const {proxy} = getCurrentInstance()
    const Toast = useToast()
    const hostName = proxy?.hostname
    const isLoading = ref(false)

    const getToken = () => {
        var token = store.getToken
            var result = {
                headers: {Authorization: `Bearer ${token}`}
            }
            return result
      }
    const data = ref({})
    onMounted(() => {
        loadData()
    })
    const store = useCounterStore()
    const loadData = async () => {
        isLoading.value = true
        document.body.classList.add('loading') // Add Lớp "loading"

        const res = await axios.get(hostName  + "/api/Account/Showrofile", getToken())
        
        if(res.data.success){
            isLoading.value = false
            document.body.classList.remove('loading') // Xóa Lớp "loading"
            data.value = res.data.content
            console.log(data.value)
        }else{
            isLoading.value = false
            document.body.classList.remove('loading') // Xóa Lớp "loading"
            Toast.error("Tài khoản không chính xác", {
                timeout: 3000
            })
        }
    }
</script>

<style setup>
     /* Màn hình chờ */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: all; /* Kích hoạt lớp phủ ngăn tương tác */
}

/* Biểu tượng spinner */
.spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

/* Hiệu ứng xoay */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Ngăn người dùng thao tác khi đang load */
body.loading {
  pointer-events: none; /* Ngăn tất cả tương tác */
  user-select: none; /* Ngăn chọn văn bản */
}
</style>