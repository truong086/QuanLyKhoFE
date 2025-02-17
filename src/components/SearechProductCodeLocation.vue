<template>
    <main>
      <h6>{{ filteredProducts.length }} results</h6>
      <div>
        <input type="text" v-model="searchName" style="padding: 5px 0; outline: none; border-radius: 5px;">
        <button class="btn" style="border: 1px solid green; margin: 0 15px;" @click="searchData">Search</button>
      </div>
      <p v-if="activeFilters.length">
        <small class="text-muted"
          >Filtered by {{ activeFilters.join(", ") }}</small
        >
      </p>
      <div class="product-grid">
      <div class="card" v-for="(product, index) in products" :key="index">
        <div class="card-content">
          <img class="card-img" :src="product.images[0]" alt="" />
          <div class="card-body" style=" display: flex;">
            <h5 class="card-title">{{ product.title }}</h5>
           <div style="margin-left: 20px;">
            <p class="card-text">
              <span>Price: ${{ product.price.toFixed(2) }}</span>
              <br />
            </p>
            <p class="card-text">
              <span>DonViTinh: {{ product.donViTinh }}</span>
              <br />
            </p>
            <p class="card-text">
              <span>Suppliers: {{ product.supplierName }}</span>
              <br />
              <img :src="product.supplierImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            </p>
           </div>
            <div style="margin: 0 20px;">
              <p class="card-text">
              <span>Quantity: {{ product.quantity }}</span>
              <br />
            </p>
              
            <p class="card-text">
              <span style="color: violet;">Category: {{ product.categoryName }}
                <img style="width: 30px; height: 30px; border-radius: 50%;" :src="product.categoryImage" alt="">
              </span>
            </p>
    
            <p class="card-text" style="color: red; font-weight: bold;">
              <span style="color: red;">Code: {{ product.code }}
              </span>
            </p>
            </div>
            <div>
              <h5>Location:</h5>
              <p class="card-text">
                  <img :src="product.warehouse_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                  {{ product.warehouse_name }} => 
    
                  <img :src="product.floor_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                  {{ product.floor_name }} => 
    
                  <img :src="product.area_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                  {{ product.area_name }} => 
    
                  <img :src="product.floor_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                  {{ product.floor_name }} => 
    
                  {{ product.location }} ({{ product.code }})
                </p>
            </div>
            
           
          </div>
          <a class="btn btn-primary" @click="Next(product.id)" href="#">Chi tiết</a>
        </div>
      </div>
    </div>
    
    </main>
    
    <footer>
      <p>
        <small class="text-muted"
          >{{ products.length }} total /
          {{ filteredProducts.length }} shown</small
        >
      </p>
    </footer>
    
    <!-- Hiển thị màn hình loading -->
    <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>Đang tải...</p>
    </div>
    </template>
    
    <script setup>
    import { ref, computed, watch, getCurrentInstance } from "vue";
    import axios from "axios";
    import { useRouter } from "vue-router";
    import { useToast } from "vue-toastification";
    import { useCounterStore } from "../store";
    
    const { proxy } = getCurrentInstance();
    const hostName = proxy?.hostname;
    const Toast = useToast();
    const router = useRouter();
    const store = useCounterStore();
    const products = ref([]);
    const isLoading = ref(false);
    const searchName = ref("")

    const findAllProduct = async () => {
        if(!searchName.value.trim()){
            products.value = []
            return
        }
    isLoading.value = true;
    document.body.classList.add("loading"); // Add Lớp "loading"
    document.body.style.overflow = "hidden";
    const res = await axios.get(
          hostName +
            `/api/Product/FindCodeLocation?code=${searchName.value}`,
          getToken()
        )
    
        
    if (res.data.success) {
        products.value = res.data.content;
        console.log(products.value)
    }
    isLoading.value = false;
    document.body.classList.remove("loading");
    document.body.style.overflow = "auto";
    Toast.success("Sucess");
    console.log(router);
    };
    
    const searchData = () => {
      findAllProduct()
    }
    const getToken = () => {
        var token = store.getToken;
        var result = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return result;
    };
    const activeFilters = ref([]);
    
    const Next = (id) => {
    router.push({path: "/ChiTietSanPham", query: {id: id, name: "Details"}})
    }
    // const uses = computed(() => [...new Set(products.value.map(p => p.CategoryName))])
    // const skills = computed(() => [...new Set(products.value.map(p => p.donViTinh))])
    
    // const filters = computed(() => ({
    //   'Category': uses.value,
    //   'donViTinh': skills.value
    // }))
    
    const filteredProducts = computed(() => {
    if (activeFilters.value.length === 0) return products.value;
    return products.value.filter(
    (prod) =>
      activeFilters.value.includes(prod.skill) ||
      activeFilters.value.includes(prod.usage)
    );
    });
    
    // const clearFilters = () => {
    //   activeFilters.value = []
    // }
    
    watch(activeFilters, (newVal) => {
    location.hash = newVal.join(",");
    });
    
    </script>
    
    <style scoped>
    #app {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f7f7f7;
      padding: 2rem;
      font-family: "Arial", sans-serif;
    }
    
    header {
      width: 100%;
      text-align: center;
      margin-bottom: 2rem;
    }
    
    h3 {
      font-size: 2rem;
      color: #333;
    }
    
    main {
      background: #fff;
      padding: 2rem;
      width: 90%;
      max-width: 1200px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    
    footer {
      width: 100%;
      background: #fff;
      padding: 1rem;
      text-align: center;
      box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
    }
    
    .product-grid {
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    .card {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .card-content {
      display: flex;
      justify-content: space-around;
    }
    
    .card-img {
      max-width: 150px;
      height: auto;
      object-fit: cover;
      margin-right: 1rem;
    }
    
    .card-body {
      padding: 1rem;
    }
    
    .card-title {
      font-size: 1.25rem;
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    .card-text {
      font-size: 0.875rem;
      color: #555;
      font-weight: bold;
    }
    
    .card-text span {
      margin-bottom: 0.25rem;
    }
    
    .btn-primary {
      background-color: #007bff;
      border: none;
      padding: 0.5rem 1rem;
      color: white;
      text-transform: uppercase;
      font-size: 0.875rem;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }
    
    .btn-primary:hover {
      background-color: #0056b3;
    }
    
    footer small {
      font-size: 0.875rem;
      color: #888;
    }
    
    strong {
      font-weight: bold;
    }
    
    </style>
    