<template>
  <div class="page-container">
    <!-- Header -->
    <header class="header">
      <!-- Select Boxes -->
      <div class="select-container">
        <select v-model="selectedWarehouse" class="form-select" @change="searchWarehouse">
          <option v-for="warehouse in warehouses" :key="warehouse" :value="warehouse.id">{{ warehouse.name }}</option>
        </select>
        <select v-model="selectedFloor" class="form-select" @change="searchFloor">
          <option v-for="floor in floors" :key="floor" :value="floor.id">{{ floor.name }}</option>
        </select>
        <select v-model="selectedZone" class="form-select" @change="searchArea">
          <option v-for="zone in zones" :key="zone" :value="zone.id">{{ zone.name }}</option>
        </select> 
        <select v-model="selectedRack" class="form-select" @change="searchShelf">
          <option v-for="rack in racks" :key="rack" :value="rack.id">{{ rack.name }}</option>
        </select>
      </div>
    </header>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Navbar -->
      <nav class="navbar">
        <!-- Search Input -->
      <div class="search-container">
        <input type="text" v-model="searchQuery" class="search-input" placeholder="Tìm kiếm sản phẩm..." />
        <button @click="handleSearch" class="search-button">
          🔍
        </button>
      </div>

        <!-- Nhà cung cấp -->
        <div class="supplier-select">
          <label for="supplier" class="select-label">選擇供應商</label>
          <select v-model="selectedSupplier" id="supplier" class="form-select" @change="searchSupplier">
            <option v-for="supplier in suppliers" :key="supplier" :value="supplier.id">{{ supplier.name }}</option>
          </select>
        </div>
        <!-- category -->
        <div class="supplier-select">
          <label for="supplier" class="select-label">類別</label>
          <select v-model="selectCategory" id="supplier" class="form-select" @change="searchCategory">
            <option v-for="item in category" :key="item" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
        <!-- Input giá -->
        <div class="price-input">
          <label for="price" class="input-label">輸入價格</label>
          <input type="number" id="price" v-model="price" class="form-input" placeholder="Nhập giá">
          <button @click="submitPrice" class="btn-ok">OK</button>
        </div>
        <!-- Mức giá tìm kiếm -->
        <!-- <div class="price-search">
          <label for="priceRange" class="select-label">Mức Giá</label>
          <div class="price-range">
            <div v-for="(range, index) in priceRanges" :key="index" class="price-item" @click="selectedPriceRange = range">
              {{ range }}
            </div>
          </div>
        </div> -->
        <!-- Nút OK ở cuối navbar -->
        <div class="navbar-footer">
          <button @click="handleNavbarOk" class="btn-ok">確認</button>
        </div>
      </nav>

      <!-- Content -->
      <div class="content">
        <h2>產品清單</h2>

        <!-- Loop through the products and display each one -->
        <div v-for="(product, index) in products" :key="index" class="product-frame">
          <img :src="product.images[0]" alt="Product Image" class="product-image" />
          <div style="margin: 0 15px;">
            <p>Location: </p>
            <div v-for="(item, indexProduct) in product.listAreaOfproducts" :key="indexProduct">
              <p>
                <img :src="item.warehouse_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ item.warehouse_name }}
                => 
                <img :src="item.floor_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ item.floor_name }} =>

                <img :src="item.area_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ item.area_name }} => 

                <img :src="item.shelf_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                {{ item.shelf_name }} => 
                {{ item.location }} ({{ item.code }})
              </p>

              <p class="product-quantity">類別: {{ product.categoryName }}
                <img :src="product.categoryImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
              </p>

              <p class="product-quantity">供應商: {{ product.supplierName }}
                <img :src="product.supplierImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
              </p>
            </div>
            
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.title }}</h3>
            <p class="product-price">價格: {{ product.price }}k</p>
            <p class="product-quantity"> 數量: {{ product.quantity }}</p>
            <p class="product-quantity"> 計量單位: {{ product.donViTinh }}</p>
          </div>
          <div>
            <button class="btn" style="border: 1px solid green;" @click="nextDetails(product.id)"> 詳細資料</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Hiển thị màn hình loading -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>
  
  <script setup>
import { useCounterStore } from "../store";
  import {ref, getCurrentInstance, onMounted} from 'vue'
  // import PagesTotal from './PageList/PagesTotal.vue'
  import axios from 'axios'
  import {useToast} from 'vue-toastification'
import router from "@/router";
  const searchQuery = ref("");

  const isLoading = ref(false)
  
  const {proxy} = getCurrentInstance()
  const hostName = proxy?.hostname
  const store = useCounterStore()
  const Toast = useToast()

  const searchDataAllProduct = ref({
    idWarehouse: null,
    idFloor: null,
    idArea: null,
    idShelf: null,
    supplier: null,
    category: null,
    pricefrom: null,
    priceto: null,
    name: null
  })

  const getToken = () => {
        var token = store.getToken
            var result = {
                headers: {Authorization: `Bearer ${token}`}
            }
            return result
      }

      onMounted(() => {
        findAllWarehouse()
        findAllFloor()
        findAllArea()
        findAllShelf()
        findAllCategory()
        findAllSupplier()
      })

      const nextDetails = (id) =>{
        router.push({path: "/ChiTietSanPham", query: {id: id, name: "Details"}})
      }
  const findAllWarehouse = async () => {
    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
    const res = await axios.get(hostName + `/api/Warehouse/FindAll?page=1&pageSize=2000`, getToken())
    if(res.data.success){
      warehouses.value = res.data.content.data
      Toast.success("Success")
    }

    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
  }

  const findAllFloor = async () => {

    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'

    const res = await axios.get(hostName + `/api/Floor/FindAll?page=1&pageSize=2000`, getToken())
    if(res.data.success){
      floors.value = res.data.content.data
      Toast.success("Success")
    }

    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
  }

  const findAllArea = async () => {
    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
    const res = await axios.get(hostName + `/api/Area/FindAll?page=1&pageSize=2000`, getToken())
    if(res.data.success){
      zones.value = res.data.content.data
    }

    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
  }

  const findAllShelf = async () => {

    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
    const res = await axios.get(hostName + `/api/Shelf/FindAll?page=1&pageSize=2000`, getToken())
    if(res.data.success){
      racks.value = res.data.content.data
    }

    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
  }

  const findAllCategory = async () => {
    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'

    const res = await axios.get(hostName + `/api/Category/FindAll?page=1&pageSize=2000`, getToken())
    if(res.data.success){
      category.value = res.data.content.data
    }

    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
  } 

  const findAllSupplier = async () => {
    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'

    const res = await axios.get(hostName + `/api/Supplier/FindAll?page=1&pageSize=2000`, getToken())
    if(res.data.success){
      suppliers.value = res.data.content.data
    }

    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
  } 

  const searchWarehouse = () =>{
    findOneFloorByWarehouse()
    findAllArea()
    findAllShelf()

    selectedZone.value = null;
    selectedRack.value = null;
    searchDataAllProduct.value.idWarehouse = selectedWarehouse.value
    searchDataAllProduct.value.idFloor = null
    searchDataAllProduct.value.idArea = null
    searchDataAllProduct.value.idShelf = null

    if(searchQuery.value.trim())
       searchDataAllProduct.value.name = searchQuery.value
    else
        searchDataAllProduct.value.name = null  

    if(price.value != null)
       searchDataAllProduct.value.pricefrom = price.value
    else
        searchDataAllProduct.value.pricefrom = null  
    searchDataAll()
  }

const searchFloor = () => {
  findOneAreaByFloor()
  findAllShelf()

  selectedZone.value = null;
  selectedRack.value = null;
  searchDataAllProduct.value.idFloor = selectedFloor.value
  searchDataAllProduct.value.idArea = null
  searchDataAllProduct.value.idShelf = null

  if(searchQuery.value.trim())
       searchDataAllProduct.value.name = searchQuery.value
    else
        searchDataAllProduct.value.name = null  

  if(price.value != null)
       searchDataAllProduct.value.pricefrom = price.value
  else
      searchDataAllProduct.value.pricefrom = null  
  searchDataAll()
}

const searchArea = () => {
  findOneShelfByArea()
  selectedRack.value = null;
  searchDataAllProduct.value.idArea = selectedZone.value
    searchDataAllProduct.value.idShelf = null

    if(searchQuery.value.trim())
       searchDataAllProduct.value.name = searchQuery.value
    else
        searchDataAllProduct.value.name = null  

    if(price.value != null)
       searchDataAllProduct.value.pricefrom = price.value
    else
        searchDataAllProduct.value.pricefrom = null  
  searchDataAll()
}

const searchShelf = () => {
  searchDataAllProduct.value.idShelf = selectedRack.value
  if(searchQuery.value.trim())
       searchDataAllProduct.value.name = searchQuery.value
    else
        searchDataAllProduct.value.name = null  

    if(price.value != null)
       searchDataAllProduct.value.pricefrom = price.value
    else
        searchDataAllProduct.value.pricefrom = null  
  searchDataAll()
}

const searchSupplier = () =>{
  console.log(selectedSupplier.value)
  searchDataAllProduct.value.supplier = selectedSupplier.value
  if(searchQuery.value.trim())
      searchDataAllProduct.value.name = searchQuery.value
  else
      searchDataAllProduct.value.name = null  

  if(price.value != null)
      searchDataAllProduct.value.pricefrom = price.value
  else
      searchDataAllProduct.value.pricefrom = null  
  searchDataAll()
}

const searchCategory = () => {
  searchDataAllProduct.value.category = selectCategory.value
  if(searchQuery.value.trim())
      searchDataAllProduct.value.name = searchQuery.value
  else
      searchDataAllProduct.value.name = null  

  if(price.value != null)
      searchDataAllProduct.value.pricefrom = price.value
  else
      searchDataAllProduct.value.pricefrom = null  
  searchDataAll()
}
const findOneShelfByArea = async () => {
  isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'

  const res = await axios.get(hostName + `/api/Shelf/FindByArea?id=${selectedZone.value}&page=1&pageSize=2000`, getToken())
    if(res.data.success){
      racks.value = res.data.content.data
    }

    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
}
const findOneAreaByFloor = async () => {

  isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
  const res = await axios.get(hostName + `/api/Area/FindOneByFloor?id=${selectedFloor.value}`, getToken())
    if(res.data.success){
      zones.value = res.data.content.data
    }

    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
}
  const findOneFloorByWarehouse = async () => {
    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'

    const res = await axios.get(hostName + `/api/Floor/FindByWareHouser?id=${selectedWarehouse.value}&page=1&pageSize=2000`, getToken())
    if(res.data.success){
      floors.value = res.data.content.data
    }

    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
  }

  const searchDataAll = async () =>{
    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
    console.log(searchDataAllProduct.value)
    const res = await axios.post(hostName + `/api/Product/FindAllProductSearch`,searchDataAllProduct.value , getToken())
    if(res.data.success){
      products.value = res.data.content.dataMapList

    }
    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
    console.log(res)
  }
const handleSearch = () => {
  if(searchQuery.value.trim()){
    searchDataAllProduct.value.name = searchQuery.value
    searchDataAll()
  }else{
    searchDataAllProduct.value.name = null
    searchDataAll()
  }
  
};

  // Sample data for warehouses, floors, zones, racks, suppliers, and price ranges
  const warehouses = ref([]);
  const floors = ref([]);
  const zones = ref([]);
  const racks = ref([]);
  const category = ref([])
  const suppliers = ref([]);
  // const priceRanges = ref(["Dưới 100k", "100k - 200k", "200k - 300k", "300k - 400k", "400k - 500k", "500k - 600k", "Trên 600k"]);
  
  // Sample products data
  const products = ref([]);
  
  const selectedWarehouse = ref(null);
  const selectedFloor = ref(null);
  const selectedZone = ref(null);
  const selectedRack = ref(null);
  const selectedSupplier = ref(null);
  const price = ref(null);
  // const selectedPriceRange = ref(null);
  const selectCategory = ref(null)
  // Handle button OK click next to input price
  const submitPrice = () => {
    if(price.value !== null){
      searchDataAllProduct.value.pricefrom = price.value
      searchDataAll()
    }else if(price.value === "" || price.value === 0){
      searchDataAllProduct.value.pricefrom = null
      searchDataAll()
    }
    
  };
  
  // Handle button OK click at the end of navbar
  const handleNavbarOk = () => {
    alert("Đã xác nhận");
  };
  </script>
  
  <style scoped>
 /* Toàn bộ trang */
 .page-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  height: 100vh;
}

/* Header */
.header {
background: linear-gradient(135deg, #3a7bd5, #d76d77);
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Container cho select */
.select-container {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.form-select {
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.form-select:hover {
  border-color: #4a90e2;
}

.form-select:focus {
  border-color: #2c5fb8;
  box-shadow: 0 0 8px rgba(44, 95, 184, 0.5);
}

/* Main Content */
.main-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  margin: 20px;
  overflow: auto;
}

/* Navbar */
.navbar {
  background: linear-gradient(135deg, #3a7bd5, #d76d77);
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: grid;
  gap: 20px;
  color: white;
}

/* Mức giá tìm kiếm */
.price-search {
  display: flex;
  flex-direction: column;
}

.price-range {
  display: block;
  margin-top: 10px;
}

.price-item {
  background-color: #1a1886;
  padding: 12px 15px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.price-item:hover {
  background-color: #4a90e2;
  color: white;
}

/* Nút OK */
.btn-ok {
  padding: 5px 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-ok:hover {
  background-color: #357ab7;
}

/* Content */
.content {
  overflow-y: auto;
  max-height: 70vh;
  background: linear-gradient(135deg, #ff9a9e, #ff6a00);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

/* Sản phẩm Frame */
.product-frame {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 5px solid #ff758c;
}

.product-frame:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  border-left: 5px solid #d76d77;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
}

.product-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  transition: color 0.3s ease;
}

.product-name:hover {
  color: #ff4d4d;
}

.product-price, .product-quantity, .product-location {
  font-size: 16px;
  color: #666;
}

/* Footer */
footer {
  background-color: #4a90e2;
  padding: 20px;
  text-align: center;
  color: white;
  font-size: 16px;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
}

.search-button {
  padding: 8px 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.search-button:hover {
  background-color: #357ab7;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  .navbar {
    display: block;
  }
  .price-range {
    grid-template-columns: 1fr 1fr;
  }
}

  </style>
  