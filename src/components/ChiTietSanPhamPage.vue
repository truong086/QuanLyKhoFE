<template>
  <div id="app">
    <header>
      <h3>Product Details</h3>
    </header>

    <main>
      <div class="product-detail">
        <div class="card">
          <img
            v-if="product.images?.length > 0"
            class="card-img-top"
            :src="product.images[0]"
            alt=""
          />
          <div style="margin-top: 20px;">
            <img v-on:click="swapImage(item)" v-for="(item, index) in product.images" :key="index" :src="item" style="width: 35px; height: 35px; margin: 0 10px;" alt="">
          </div>
          <div class="card-body" style="display: flex; justify-content: space-around; margin: 20px 0;">
           <div>
            <h5 class="card-title" style="font-weight: bold; margin: 20px 0; color: red;">{{ product.title }}</h5>
            <p class="card-text">Price: ${{ product.price?.toFixed(2) }}</p>
            <p class="card-text">Unit of measure: ${{ product.quantity }}</p>
            <p>DonViTinh: {{ product.donViTinh }}</p>
            <p>
              Category: {{ product.categoryName }}
              <img
                :src="product.categoryImage"
                style="
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  margin: 0 15px;
                "
                alt=""
              />
            </p>

            <p>
              Suppliers: {{ product.supplierName }}
              <img
                :src="product.supplierImage"
                style="
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  margin: 0 15px;
                "
                alt=""
              />
            </p>
            <p>Description: {{ product.description }}</p>
            <h5>History Product Location: </h5>
            <div v-for="(itemhistory, indexhistory) in product.historyProductLocations" :key="indexhistory">
              <p>
                <img :src="itemhistory.warehouse_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ itemhistory.warehouse_name }} => 

                <img :src="itemhistory.floor_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ itemhistory.floor_name }} => 

                <img :src="itemhistory.area_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ itemhistory.area_name }} => 

                <img :src="itemhistory.shelf_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ itemhistory.shelf_name }} => 

                {{ itemhistory.lcoation }} ({{ itemhistory.code }})
                
              </p>
              <span v-if="indexhistory !== product.historyProductLocations.length - 1" style="font-size: 20px; color: blueviolet;">
                ⏫
              </span>
            </div>
           </div>
            
          </div>
          <a class="btn btn-primary" href="#">Back</a>
        </div>
      </div>

      <!-- New Frame Below Product - First Warehouse -->
      <div class="warehouse-frame" v-for="(item, index) in product.oneDataShelfOfProducts" :key="index">
        <div class="warehouse-img">
          <img :src="item.warehouse_image" alt="Warehouse Image" />
        </div>
        <div class="warehouse-info">
          <h2 style="font-weight: bold;">Warehourse Name: {{ item.warehouse_name }}</h2>
          <div v-if="item.listShelfOfproducts">
            <div v-for="(itemWarehouse, indexWarehouse) in item.listShelfOfproducts" :key="indexWarehouse">
              <div style="display: flex; margin-left: 50px;">
                <p>Location {{ indexWarehouse + 1 }}: {{ itemWarehouse.warehouse_name }} => {{ itemWarehouse.floor_name }} => {{ itemWarehouse.area_name }} => {{ itemWarehouse.shelf_name }} => {{ itemWarehouse.location }} ({{ itemWarehouse.code }})</p>
                <button class="btn btn-location" style="font-size: 10px; padding: 2px 15px; height: 25px; margin-left: 10px;" @click="nextSearchWarehourse(itemWarehouse)">Details</button>
              </div>
              <span v-if="indexWarehouse !== item.listShelfOfproducts.length - 1">🔽</span> <!--Kiểm tra xem đã lặp đến phần tử cuối cùng chưa-->
            </div>
            
          </div>
          <h5>Quantity: {{ item.quantity }}</h5>
          <h5>Account Create: {{ item.account_name }} 
            <img :src="item.account_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
          </h5>
          <h5>Address: {{ item.addressWarehouse }} </h5>
        </div>
        <!-- <button class="btn btn-location" @click="NextMap(item.addressWarehouse)">Location</button> -->
      </div>
    </main>
  </div>
  <!-- Hiển thị màn hình loading -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>Đang tải...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "../store";

const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;
const store = useCounterStore();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
// Product Data
const product = ref({});
const getToken = () => {
  var token = store.getToken;
  var result = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return result;
};
onMounted(() => {
  if (route.query.id) {
    findOneId(route.query.id);
  }
});

const swapImage = (image) =>{
  document.querySelector(".card-img-top").src = image
}
// const NextMap = (data) => {
//   const encodeURI = encodeURIComponent(data) // Mã hóa dữ liệu truyền lên query
//   router.push({path: "map", query: {search: encodeURI, name: "Map"}})
// }

const nextSearchWarehourse = (data) =>{
  router.push({path: "detailProductWarehourse", query: {id: encodeURIComponent(data.idShelf), 
    warehoure: encodeURIComponent(data.warehouse_name), 
    floor: encodeURIComponent(data.floor_name),
    area: encodeURIComponent(data.area_name)}})
}

const findOneId = async (id) => {
  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
  const res = await axios.get(
    hostName + `/api/Product/FindOneById?id=${id}`,
    getToken()
  );

  console.log(res)

  if (res.data.success) {
    product.value = res.data.content;
  }
  isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
  console.log(product.value);
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  padding: 2rem;
  font-family: "Arial", sans-serif;
}

img {
    mix-blend-mode: multiply; /* Hoặc screen tùy vào màu nền */
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
  width: 80%;
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

.product-detail {
  display: flex;
  justify-content: center;
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

.card-img-top {
  max-width: 100%;
  height: 300px;
  object-fit: cover;
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
}

.card-text span {
  display: block;
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

/* Warehouse Frame */
.warehouse-frame {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.warehouse-img img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.warehouse-info {
  flex-grow: 1;
  margin-left: 1rem;
}

.warehouse-info h5 {
  font-size: 1.25rem;
  color: #333;
}

.warehouse-info p {
  font-size: 0.875rem;
  color: #555;
}

.btn-location {
  background-color: #28a745;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  text-transform: uppercase;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-location:hover {
  background-color: #218838;
}

footer small {
  font-size: 0.875rem;
  color: #888;
}
</style>
