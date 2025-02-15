<template>
    <div>
      <div>
        <div>
          <select v-model="warehouseData" v-on:change="searchProduct" style="width: 200px;">
            <option v-for="(item, index) in DataWarehouse" :key="index" :value="item">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div
        style="margin: 50px 0; padding-left: 60px; display: flex; flex-wrap: wrap;"
      >
        <div
          v-for="(item, index) in productDetail" :key="index"
          style="
            box-shadow: 3px 2px 3px grey;
            width: 500px;
            border-radius: 10px;
            padding: 20px;
            border: 1px dashed black;
            margin: 20px 20px;
            display: flex;
            width: 1000px;
          "
        >
          <img
            v-if="item.images"
            style="width: 300px; height: 300px;"
            :src="item.images[0]"
            :class="'card-img-top' + '_' + item.id"
            alt=""
          />
          <div style="margin-top: 20px" v-if="item.images"> 
            <img
            v-on:click="swapImage('card-img-top' + '_' + item.id, itemImage)"
              v-for="(itemImage, indexImage) in item.images" :key="indexImage" :src="itemImage" style="width: 50px; height: 50px;"
            />
          </div>
          <div
            class="card-body"
            style=" margin: 20px 0; display: flex;"
          >
            <div>
              <h5
                class="card-title"
                style="font-weight: bold; margin: 20px 0; color: red"
              >
                Title: {{ item.title }}
              </h5>
              <p class="card-text">Price: {{ item.price }}</p>
              <p class="card-text">Unit of measure: {{ item.quantity }}</p>
              <p style="font-weight: bold; color: blue;" class="card-text">Code: {{ item.codeLocation }}</p>
            </div>
            <div>
              <p>
                Supplier: {{ item.suppliers_name }}
                <img
                  style="width: 30px; height: 30px; border-radius: 50%"
                  :src="item.suppliers_image"
                  alt=""
                />
              </p>
              <p>
                Category: {{ item.categoryName }}
                <img
                  :src="item.categoryImage"
                  style="
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin: 0 15px;
                  "
                  alt=""
                />
              </p>
              <p>Quantity location: {{ item.quantityLocaton }}</p>
              <p style="font-weight: bold; color: blue;">Location: {{ item.location }}</p>
              <p>Unit of measure: {{ item.donViTinh }}</p>
              <p>Description: {{ item.description }}</p>
              <p>
                <img :src="item.warehouse_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ item.warehouse_name }} => 

                <img :src="item.floor_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ item.floor_name }} => 

                <img :src="item.area_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ item.area_name }} => 

                <img :src="item.shelf_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ item.shelf_name }} => 

                {{ item.location }} ({{ item.codeLocation }})
              </p>
            </div>
          </div>
          <a
            class="btn btn-primary"
            style="border: 1px solid green; display: block; width: 100px; height: 100px;"
            href="#"
            @click="backDetail(item.id)"
            >Back</a
          >
        </div>
      </div>
      <PagesTotal
      :page="page"
      :totalPage="totalPage"
      :valueE="valueE"
      @pageChange="loadProductByWarehouse"
      @pageSizeChange="changeReload"
    ></PagesTotal>
    </div>
  
    <!-- Hiển thị màn hình loading -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Đang tải...</p>
    </div>
  </template>
  
  <script setup>
    import axios from "axios";
    import { ref, onMounted, getCurrentInstance, watch } from "vue";
    import {useRouter } from "vue-router";
    import { useCounterStore } from "../../store";
    import PagesTotal from "../PageList/PagesTotal.vue";


const store = useCounterStore();
const router = useRouter();
const productDetail = ref([]);
const warehouseData = ref({})
const isLoading = ref(false)
const valueE = ref("");
const page = ref(1);
const totalPage = ref(0);
const pageSize = ref(2);
const DataWarehouse = ref([])

const getToken = () => {
  var token = store.getToken;
  var result = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return result;
};
const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;
onMounted(() => {
    findOneWarehourse();
});

watch(page.value, (newPage) => {
    loadProductByWarehouse(valueE.value, newPage);
});

const searchProduct = () => {
    loadProductByWarehouse(valueE.value, page.value)
}
const swapImage = (classData, image) => {
  document.querySelector("." + classData).src = image;
};
const findOneWarehourse = async () => {
  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
  const res = await axios.get(
    hostName + `/api/Warehouse/FindAll?page=1&pageSize=20000`,
    getToken()
  );
  
  if(res.data.success){
    warehouseData.value = res.data.content.data[0];
    DataWarehouse.value = res.data.content.data
    console.log(res)
    loadProductByWarehouse(valueE.value, page.value)
  }
};

const loadProductByWarehouse = async(search, pageData) => {
    console.log(search)
    console.log(warehouseData.value)
    isLoading.value = true;
    document.body.classList.add("loading"); // Add Lớp "loading"
    document.body.style.overflow = "hidden";
    const res = await axios.get(hostName + `/api/Product/FindAllProductInWarehourse?id=${warehouseData.value.id}&page=${pageData}&pageSize=${pageSize.value}`, getToken())
    if(res.data.success){
        productDetail.value = res.data.content.data
        page.value = res.data.content.page;
        totalPage.value = res.data.content.totalPages;
    }

    console.log(res)
    isLoading.value = false;
    document.body.classList.remove("loading");
    document.body.style.overflow = "auto";
}
const changeReload = (event) => {
  pageSize.value = event;
  loadProductByWarehouse(valueE.value, page.value);
};
const backDetail = (id) => {
  router.push({ path: "ChiTietSanPham", query: { id: id, name: "Detail" } });
};
  </script>
  
  <style scoped>
  .button {
    outline: none;
    padding: 10px 20px;
    background-color: transparent;
    border-radius: 10px;
    border: 1px dashed green;
    font-weight: bold;
    color: blue;
    width: 200px;
  }
  img {
      mix-blend-mode: multiply; /* Hoặc screen tùy vào màu nền */
  }
  </style>
  