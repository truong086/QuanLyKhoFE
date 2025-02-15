<template>
    <div style="display: flex;">
      <div ref="scrollContainer" style="width: 1500px; height: 300px; padding: 20px; box-shadow: 3px 2px 8px gray; margin-top: 20px; overflow-y: auto" v-if="dataPercentage.length > 0">
        <div v-for="(item, index) in dataPercentage" :key="index">
          <p v-if="index + 1 === 1" style="font-weight: bold; animation: index1 0.5s ease-in-out infinite;">
            <img :src="item.warehouseImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.warehouseName }} => 
  
            <img :src="item.floorImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.floorName }} => 
  
            <img :src="item.areaImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.areaName }} => 
  
            <img :src="item.shelfImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.shelfName }} => 
            {{ item.location }} ({{ item.code }}) : {{ getTwoDecimals(item.percentage) }}%
          </p>
  
          <p v-else-if="index + 1 === 2" style="font-weight: bold; color: blue;">
            <img :src="item.warehouseImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.warehouseName }} => 
  
            <img :src="item.floorImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.floorName }} => 
  
            <img :src="item.areaImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.areaName }} => 
  
            <img :src="item.shelfImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.shelfName }} => 
            {{ item.location }} ({{ item.code }}) : {{ getTwoDecimals(item.percentage) }}%
          </p>
  
          <p v-else-if="index + 1 === 3" style="font-weight: bold; color: blueviolet;">
            <img :src="item.warehouseImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.warehouseName }} => 
  
            <img :src="item.floorImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.floorName }} => 
  
            <img :src="item.areaImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.areaName }} => 
  
            <img :src="item.shelfImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.shelfName }} => 
            {{ item.location }} ({{ item.code }}) : {{ getTwoDecimals(item.percentage) }}%
          </p>
  
          <p v-else style="font-weight: bold;">
            <img :src="item.warehouseImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.warehouseName }} => 
  
            <img :src="item.floorImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.floorName }} => 
  
            <img :src="item.areaImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.areaName }} => 
  
            <img :src="item.shelfImage" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
            {{ item.shelfName }} => 
            {{ item.location }} ({{ item.code }}) : {{ getTwoDecimals(item.percentage) }}%
          </p>
        </div>
      </div>
      <div class="container">
      <!-- Form Kho cũ -->
      <div class="form-section">
        <h2 class="title">Warehourse old</h2>
  
        <!-- Kho Select -->
        <div class="form-group">
          <label for="region">Warehourse:</label>
          <select class="form-select" v-model="currentWarehouse" @change="SearchWarehourse('old')">
            <option value="" disabled selected>Chọn kho</option>
            <option v-for="(item, index) in warehouseData" :key="index" :value="item">{{ item.name }}</option>
          </select>
        </div>
  
        <!-- Tầng Select -->
        <div class="form-group">
          <label for="province">Floor:</label>
          <select class="form-select" v-model="currentFloor" @change="SearchFloor('old')">
            <option v-for="(item, index) in currentFloorData" :key="index" :value="item">{{item.name}}</option>
          </select>
        </div>
  
        <!-- Khu Select -->
        <div class="form-group">
          <label for="district">Area:</label>
          <select class="form-select" v-model="DataOneArea" @change="searchArea('old')">
            <option value="" disabled selected>Chọn khu</option>
            <option v-for="(item, index) in currentAreaData" :key="index" :value="item">{{ item.name }}</option>
          </select>
        </div>
  
        <!-- Keej Select -->
        <div class="form-group">
          <label for="district">Shelf:</label>
          <select class="form-select" v-model="shelfCurrentOld" @change="searchShelf('old')">
            <option value="" disabled selected>Chọn khu</option>
            <option v-for="(item, index) in shelfOld" :key="index" :value="item">{{ item.name }}</option>
          </select>
        </div>
  
        <!-- Vị trí Select -->
        <div class="form-group">
          <label for="ward">Location:</label>
          <div class="dropdown-container">
            <button class="form-select">Chọn vị trí</button>
  
            <div class="ward-dropdown">
              <div class="ward-grid">
                <div v-for="(cell, cellIndex) in quantityLocation.quantity" :key="cellIndex">
                      <div v-if="quantityLocation.productInPlans.some(x => x.locationNew == cell || x.locationOld == cell)">
                        <p style="position: absolute; animation: index1 0.1s ease-in-out infinite; font-size: 10px;">Plan: {{ checkLocationPlan(quantityLocation.productInPlans, quantityLocation.id, cell).title }} :
                           {{ checkLocationPlan(quantityLocation.productInPlans, quantityLocation.id, cell).shelfsOld == quantityLocation.id && checkLocationPlan(quantityLocation.productInPlans, quantityLocation.id, cell).locationOld == cell ? "Old" : "New"}}</p>
                          <!-- <button 
                              :key="cellIndex"
                              :class="'form-select' + ' ' + 'swapBgOld_' + quantityLocation.id + '_' + cell"
                              @click="(event) => openFrame(quantityLocation.id, cell, quantityLocation.productLocationAreas, quantityLocation.productPlans, 'old', 'swapBgOld_' + quantityLocation.id + '_' + cell)"
                              style="animation: planData 0.1s ease-in-out infinite; font-size: 12px;"
                            >
                            {{ quantityLocation.productLocationAreas.some(x => x.location == cell) || quantityLocation.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocation.name + " (Có sản phẩm)" : cell + " - " + quantityLocation.name }}
                          </button> -->
                          <div v-if="checkQuantityLocationProduct(quantityLocation.productLocationAreas, cell) > 0 && checkQuantityLocationProduct(quantityLocation.productLocationAreas, cell) <=  4">
                          <button 
                            :key="cellIndex"
                            :class="'form-select' + ' ' + 'swapBgOld_' + quantityLocation.id + '_' + cell"
                            @click="(event) => openFrame(quantityLocation.id, cell, quantityLocation.productLocationAreas, quantityLocation.productPlans, 'old', 'swapBgOld_' + quantityLocation.id + '_' + cell)"
                            style="background-color: blueviolet; font-size: 12px;"
                          >
                          {{ quantityLocation.productLocationAreas.some(x => x.location == cell) || quantityLocation.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocation.name + " (Có sản phẩm)" : cell + " - " + quantityLocation.name }}
                          </button>
                        </div>
                        <div v-else>
                          <button 
                              :key="cellIndex"
                              :class="'form-select' + ' ' + 'swapBgOld_' + quantityLocation.id + '_' + cell"
                              @click="(event) => openFrame(quantityLocation.id, cell, quantityLocation.productLocationAreas, quantityLocation.productPlans, 'old', 'swapBgOld_' + quantityLocation.id + '_' + cell)"
                              style="background-color: gray; opacity: 0.5; font-size: 12px;"
                            >
                            {{ quantityLocation.productLocationAreas.some(x => x.location == cell) || quantityLocation.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocation.name + " (Có sản phẩm)" : cell + " - " + quantityLocation.name }}
                          </button>
                        </div>
                      </div>
                      
                      <div v-else>
                        <div v-if="checkQuantityLocationProduct(quantityLocation.productLocationAreas, cell) > 0 && checkQuantityLocationProduct(quantityLocation.productLocationAreas, cell) <=  4">
                          <button 
                            :key="cellIndex"
                            :class="'form-select' + ' ' + 'swapBgOld_' + quantityLocation.id + '_' + cell"
                            @click="(event) => openFrame(quantityLocation.id, cell, quantityLocation.productLocationAreas, quantityLocation.productPlans, 'old', 'swapBgOld_' + quantityLocation.id + '_' + cell)"
                            style="background-color: blueviolet; font-size: 12px;"
                          >
                          {{ quantityLocation.productLocationAreas.some(x => x.location == cell) || quantityLocation.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocation.name + " (Có sản phẩm)" : cell + " - " + quantityLocation.name }}
                          </button>
                        </div>
                        <div v-else-if="checkQuantityLocationProduct(quantityLocation.productLocationAreas, cell) > 0 && checkQuantityLocationProduct(quantityLocation.productLocationAreas, cell) <=  5">
                          <button
                            :key="cellIndex"
                            :class="'form-select' + ' ' + 'swapBgOld_' + quantityLocation.id + '_' + cell"
                            @click="(event) => openFrame(quantityLocation.id, cell, quantityLocation.productLocationAreas, quantityLocation.productPlans, 'old', 'swapBgOld_' + quantityLocation.id + '_' + cell)"
                            style="background-color: blueviolet; font-size: 12px;"
                          >
                          {{ quantityLocation.productLocationAreas.some(x => x.location == cell) || quantityLocation.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocation.name + " (Có sản phẩm)" : cell + " - " + quantityLocation.name }}
                          </button>
                        </div>
                        <div v-else>
                          <button
                              :key="cellIndex"
                              :class="'form-select' + ' ' + 'swapBgOld_' + quantityLocation.id + '_' + cell"
                              @click="(event) => openFrame(quantityLocation.id, cell, quantityLocation.productLocationAreas, quantityLocation.productPlans, 'old', 'swapBgOld_' + quantityLocation.id + '_' + cell)"
                              style="background-color: grey; opacity: 0.5; font-size: 12px;"
                            >
                            {{ quantityLocation.productLocationAreas.some(x => x.location == cell) || quantityLocation.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocation.name + " (Có sản phẩm)" : cell + " - " + quantityLocation.name }}
                          </button>
                        </div>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Swap Button -->
      <button class="swap-button" @click="toggleKhoMoi">
        <i class="fas fa-exchange-alt"></i> Swap Warehourse New
      </button>
  
      <!-- Form Kho mới -->
      <div class="form-section" v-if="isKhoMoiVisible">
        <h2 class="title">Warehourse New</h2>
  
        <div class="form-group">
          <label for="region">Warehourse:</label>
          <select class="form-select" v-model="currentWarehouseNew" @change="SearchWarehourse('new')">
            <option value="" disabled selected>Chọn kho</option>
            <option v-for="(item, index) in warehouseDataNew" :key="index" :value="item">{{ item.name }}</option>
          </select>
        </div>
  
        <!-- Tầng Select -->
        <div class="form-group">
          <label for="province">Floor:</label>
          <select class="form-select" v-model="currentFloorNew" @change="SearchFloor('new')">
            <option v-for="(item, index) in currentFloorDataNew" :key="index" :value="item">{{item.name}}</option>
          </select>
        </div>
  
        <!-- Khu Select -->
        <div class="form-group">
          <label for="district">Area:</label>
          <select class="form-select" v-model="DataOneAreaNew" @change="searchArea('new')">
            <option value="" disabled selected>Chọn khu</option>
            <option v-for="(item, index) in currentAreaDataNew" :key="index" :value="item">{{ item.name }}</option>
          </select>
        </div>
  
         <!-- Khu Select -->
         <div class="form-group">
          <label for="district">Shelf:</label>
          <select class="form-select" v-model="shelfCurrentNew" @change="searchShelf('new')">
            <option value="" disabled selected>Chọn khu</option>
            <option v-for="(item, index) in shelfNew" :key="index" :value="item">{{ item.name }}</option>
          </select>
        </div>
  
        <!-- Vị trí Select -->
        <div class="form-group">
          <label for="ward">Location:</label>
          <div class="dropdown-container">
            <button class="form-select">Chọn vị trí</button>
  
            <div class="ward-dropdown">
              <div class="ward-grid">
                <div v-for="(cell, cellIndex) in quantityLocationNew.quantity" :key="cellIndex">
                      <div v-if="quantityLocationNew.productInPlans.some(x => x.locationNew == cell || x.locationOld == cell)">

                        <p style="position: absolute; animation: index1 0.1s ease-in-out infinite; font-size: 10px;">Plan: {{ checkLocationPlan(quantityLocationNew.productInPlans, quantityLocationNew.id, cell).title }} :
                          {{ checkLocationPlan(quantityLocationNew.productInPlans, quantityLocationNew.id, cell).shelfsOld == quantityLocationNew.id && checkLocationPlan(quantityLocationNew.productInPlans, quantityLocationNew.id, cell).locationOld == cell ? "Old" : "New"}}</p>  
                        <!-- <button 
                              :key="cellIndex"
                              :class="'form-select' + ' ' + 'swapBgNew_' + quantityLocation.id + '_' + cell"
                              @click="(event) => openFrame(quantityLocationNew.id, cell, quantityLocationNew.productLocationAreas, quantityLocationNew.productPlans, 'new', 'swapBgNew_' + quantityLocation.id + '_' + cell)"
                              style="animation: planData 0.1s ease-in-out infinite; font-size: 12px;"
                            >
                            {{ quantityLocationNew.productLocationAreas.some(x => x.location == cell) || quantityLocationNew.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocationNew.name + " (Có sản phẩm)" : cell + " - " + quantityLocationNew.name }}
                          </button> -->

                          <div v-if="checkQuantityLocationProduct(quantityLocationNew.productLocationAreas, cell) > 0 && checkQuantityLocationProduct(quantityLocationNew.productLocationAreas, cell) <=  4">
                          <button 
                            :key="cellIndex"
                            :class="'form-select' + ' ' + 'swapBgNew_' + quantityLocation.id + '_' + cell"
                            @click="openFrame(quantityLocationNew.id, cell, quantityLocationNew.productLocationAreas, quantityLocationNew.productPlans, 'new', 'swapBgNew_' + quantityLocation.id + '_' + cell)"
                            style="background-color: blueviolet; font-size: 12px;"
                          >
                          {{ quantityLocationNew.productLocationAreas.some(x => x.location == cell) || quantityLocationNew.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocationNew.name + " (Có sản phẩm)" : cell + " - " + quantityLocationNew.name }}
                          </button>
                        </div>
                          <div v-else>
                            <button 
                              :key="cellIndex"
                              :class="'form-select' + ' ' + 'swapBgNew_' + quantityLocation.id + '_' + cell"
                              @click="(event) => openFrame(quantityLocationNew.id, cell, quantityLocationNew.productLocationAreas, quantityLocationNew.productPlans, 'new', 'swapBgNew_' + quantityLocation.id + '_' + cell)"
                              style="font-size: 12px; background-color: grey; opacity: 0.5;"
                            >
                            {{ quantityLocationNew.productLocationAreas.some(x => x.location == cell) || quantityLocationNew.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocationNew.name + " (Có sản phẩm)" : cell + " - " + quantityLocationNew.name }}
                          </button>
                          </div>
                      </div>
                      <div v-else>
                        <div v-if="checkQuantityLocationProduct(quantityLocationNew.productLocationAreas, cell) > 0 && checkQuantityLocationProduct(quantityLocationNew.productLocationAreas, cell) <=  4">
                          <button 
                            :key="cellIndex"
                            :class="'form-select' + ' ' + 'swapBgNew_' + quantityLocation.id + '_' + cell"
                            @click="openFrame(quantityLocationNew.id, cell, quantityLocationNew.productLocationAreas, quantityLocationNew.productPlans, 'new', 'swapBgNew_' + quantityLocation.id + '_' + cell)"
                            style="background-color: blueviolet; font-size: 12px;"
                          >
                          {{ quantityLocationNew.productLocationAreas.some(x => x.location == cell) || quantityLocationNew.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocationNew.name + " (Có sản phẩm)" : cell + " - " + quantityLocationNew.name }}
                          </button>
                        </div>
                        <div v-else-if="checkQuantityLocationProduct(quantityLocationNew.productLocationAreas, cell) > 0 && checkQuantityLocationProduct(quantityLocationNew.productLocationAreas, cell) <=  5">
                          <button
                            :key="cellIndex"
                            :class="'form-select' + ' ' + 'swapBgNew_' + quantityLocation.id + '_' + cell"
                            @click="openFrame(quantityLocationNew.id, cell, quantityLocationNew.productLocationAreas, quantityLocationNew.productPlans, 'new', 'swapBgNew_' + quantityLocation.id + '_' + cell)"
                            style="background-color: blueviolet; font-size: 12px;"
                          >
                          {{ quantityLocationNew.productLocationAreas.some(x => x.location == cell) || quantityLocationNew.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocationNew.name + " (Có sản phẩm)" : cell + " - " + quantityLocationNew.name }}
                          </button>
                        </div>
                        <div v-else>
                          <button
                              :key="cellIndex"
                              :class="'form-select' + ' ' + 'swapBgNew_' + quantityLocation.id + '_' + cell"
                              @click="openFrame(quantityLocationNew.id, cell, quantityLocationNew.productLocationAreas, quantityLocationNew.productPlans, 'new', 'swapBgNew_' + quantityLocation.id + '_' + cell)"
                              style="background-color: grey; opacity: 0.5; font-size: 12px;"
                            >
                            {{ quantityLocationNew.productLocationAreas.some(x => x.location == cell) || quantityLocationNew.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocationNew.name + " (Có sản phẩm)" : cell + " - " + quantityLocationNew.name }}
                          </button>
                        </div>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Quantity and Comments -->
        <div class="form-group">
          <label for="quantity">Title:</label>
          <input
            type="text"
            min="1"
            class="form-input"
            placeholder="Nhập số lượng"
            v-model="planNew.title"
          />
        </div>
        <div class="form-group">
          <label for="comments">Desctiption:</label>
          <textarea
            class="form-textarea"
            placeholder="Nhập ghi chú..."
            v-model="planNew.description"
          ></textarea>
        </div>
        <div class="form-group">
          <button v-if="route.query.id" class="save-button" v-on:click="updatePlan">Update Plan</button>
          <button v-else class="save-button" v-on:click="addPlan">Add Plan</button>
        </div>
      </div>
  
      <!-- Frame hiển thị thông tin -->
      <div v-if="frameVisible" class="frame-popup">
        <div class="frame-content" :style="{maxWidth: widthDom + 'px', justifyContent: 'flex-start'}">
          <button @click="closeFrame" class="close-btn">Đóng</button>
          <button @click="updateData" v-if="isSwap" class="close-btn">Swap</button>
          <button @click="updateDataLocationNew" v-if="isSwapNew" class="close-btn">Swap Location New</button>
          <div class="frame-item" v-for="(item, index) in frameData" :key="index" style="margin: 10px 50px;">
            <h3>{{ item?.name }}</h3>
            <img :src="item?.image" alt="Image" :class="'frame-image' + ' ' + 'images_' + item.id_product" />
            <div style="display: flex; width: 150px; flex-wrap: wrap;">
              <div v-for="(imageItem, indexImage) in item.images" :key="indexImage" style="margin: 0 10px;">
                <img :src="imageItem" width="50px" @click="swapImage('images_' + item.id_product, imageItem)" alt="">
              </div>
            </div>
            <div class="frame-info">
              <div class="info-line"><span class="info-title">Location:</span> {{ item?.location }}</div>
              <div class="info-line"><span class="info-title">Quantity:</span> {{ item?.quantity }}</div>
              <div class="info-line"><span class="info-title">inventory:</span> {{ item?.inventory }}</div>
              <div class="info-line"><span class="info-title">price:</span> {{ item?.price }}</div>
              <div class="info-line"><span class="info-title">supplier:</span> {{ item?.supplier }}</div>
              <div class="info-line"><span class="info-title">supplier Image:</span> <img :src="item?.supplier_image" width="50px" alt=""></div>
              <div class="info-line"><span class="info-title">category Image:</span> <img :src="item?.category_image" width="50px" alt=""></div>
              <div class="info-line"><span class="info-title">category:</span> {{ item?.category }}</div>
              <div class="info-line"><span class="info-title">account Name:</span> {{ item?.account_name }}</div>
              <div class="info-line"><span class="info-title">account Image:</span> <img :src="item.account_image" width="50px" alt=""></div>
              <div class="info-line"><span class="info-title">Type:</span> {{ item?.type }}</div>
              <!-- <button @click="closeFrame" v-if="item.id_plan == 0" class="close-btn">Swap</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  
    <!-- Hiển thị màn hình loading -->
    <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Đang tải...</p>
    </div>
  </template>
  <script setup>
  import { useCounterStore } from "../store";
  import { ref, getCurrentInstance, onMounted, nextTick } from "vue";
  import axios from "axios";
  import { useToast } from "vue-toastification";
  import { useRouter, useRoute } from "vue-router";
  import Swal from 'sweetalert2';
  
  const route = useRoute()

  onMounted(() => {
    if(route.query.id){
        findOnePlan(route.query.id)
    }
    loadDataWarehouse('old');
    loadDataWarehouse('new')
    loadDataPercentage()
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
    setInterval(() => {
      if (!checkTokenData()) {
        store.clearStore();
        localStorage.clear();
        router.push("/login");
      }
    }, 20000);
  });
  
  const checkLocationPlan = (list, id, cell) => {
    return list.find(x => (x.shelfsOld == id || x.shelfsNew == id) && (x.locationOld == cell || x.locationNew == cell))
  }
  const findOnePlan = async (id) => {
    const res = await axios.get(hostName + `/api/Plan/FindOne?id=${id}`, getToken())
    if(res.data.success){
        planNew.value.title = res.data.content.title
        planNew.value.description = res.data.content.description
        planNew.value.isWarehourse = true
        planNew.value.warehouse = res.data.content.idWarehouseNew
        planNew.value.shelf = res.data.content.idShelfNew
        planNew.value.area = res.data.content.idAreaNew
        planNew.value.floor = res.data.content.idFloorNew
        planNew.value.localtionNew = res.data.content.localtionNew
        planNew.value.shelfOld = res.data.content.idShelfOld
        planNew.value.locationOld = res.data.content.locationOld
        locationCheck.value.id_Shelf = res.data.content.idShelfOld
        locationCheck.value.location = res.data.content.localtionOld

    }
    console.log(res)
  }
  const getTwoDecimals  = (value) => {
    return parseFloat(value).toFixed(2) // Giữ 2 số sau dấu "."
  }
  const checkQuantityLocationProduct = (data, location) => {
    var count = data.filter((p) => p.location == location).length;
    return count;
  };
  const checkTokenData = async () => {
    const res = await axios.post(
      hostName + `/api/Account/CheckToken?token=${store.getToken}`,
      {},
      getToken()
    );
    if (res.data.success) {
      const check = res.data.content.split(".");
      if (check.length !== 3) {
        return true;
      } else {
        store.setToken(res.data.content);
        return true;
      }
    } else {
      return false;
    }
  };
  
  const router = useRouter();
  // const hasvalue = (data) => {
  //   return Object.keys(data).length > 0;
  // };
  const Warename = ref("");
  const Floorname = ref("");
  const warehouseData = ref([]);
  const warehouseDataNew = ref([]);
  const currentWarehouseNew = ref({});
  const currentFloorNew = ref({});
  const currentFloorDataNew = ref([]);
  const currentAreaDataNew = ref([]);
  const DataOneAreaNew = ref({})
  const currentFloor = ref({});
  const currentFloorData = ref([]);
  const currentAreaData = ref([]);
  const currentWarehouse = ref({});
  const isLoading = ref(false);
  const store = useCounterStore();
  const Toast = useToast();
  const frameData = ref([]);
  const DataOneArea = ref({})
  const quantityLocation = ref({})
  const quantityLocationNew = ref({})
  // Biến trạng thái để hiển thị/ẩn "Kho mới"
  const isKhoMoiVisible = ref(false);
  const widthDom = ref(1500)
  const isCloseNoProduct = ref(false)
  const isSwap = ref(false)
  const isSwapNew = ref(false)
  const classNameData = ref('')
  const classNameDataOld = ref('')
  const classNameDataNew = ref('')
  const classNameNew = ref('')
  const classNamSwapOrNew = ref('')
  const shelfOld = ref([])
  const shelfCurrentOld = ref([])
  const shelfNew = ref([])
  const shelfCurrentNew = ref([])
  const dataPercentage = ref([])
  const scrollContainer = ref(null);

  const locationNewDataDemo = ref({
    localtionNew: 0,
    shelf: 0

  })
  const locationCheck = ref({
    id_Shelf: 0,
    location: 0
  })

  const locationCheckDemo = ref({
    id_Shelf: 0,
    location: 0
  })
  const planNew = ref({
    title: "",
    description: "",
    isWarehourse: true,
    shelfOld: 0,
    localtionNew: 0,
    warehouse: 0,
    shelf: 0,
    area: 0,
    floor: 0,
    locationOld: 0
  })
  
  const updatePlan = async () => {
    isLoading.value = true;
    document.body.classList.add("loading"); // Add Lớp "loading"
    document.body.style.overflow = "hidden";
    const res = await axios.put(hostName + `/api/Plan/Update?id=${route.query.id}`, planNew.value, getToken())
    if(res.data.success){
        Toast.success("Success")
        router.push("LocationStatus")
    }

    console.log(planNew.value)

    isLoading.value = false;
    document.body.classList.remove("loading");
    document.body.style.overflow = "auto";
  }
  const { proxy } = getCurrentInstance();
  const hostName = proxy?.hostname;
  const frameVisible = ref(false);
  
  const loadDataPercentage = async () => {
    const res = await axios.get(hostName + '/api/Deliverynote/GetWarehouseSalesPercentage', getToken())
    if(res.data.success){
      dataPercentage.value = res.data.content
  
      const dataPhanTram = dataPercentage.value.some(x => x.percentage > 0.4)
      if(dataPhanTram){
        Swal.fire("Có bản ghi phần trăm lớp  hơn 0.4")
        Toast.success("Đã có Data")
      }
    }
    console.log(res)
  }
  
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  })
  const addPlan = async () => {
    isLoading.value = true;
    document.body.classList.add("loading"); // Add Lớp "loading"
    document.body.style.overflow = "hidden";
    planNew.value.shelfOld = locationCheck.value.id_Shelf
    planNew.value.shelf = locationNewDataDemo.value.shelf
    console.log(planNew.value)
    const res = await axios.post(hostName + "/api/Plan/Add", planNew.value, getToken())
    if(res.data.success){
      Toast.success("Add Success !!!")
      router.push("LocationStatus")
    }else{
      Toast.info(res.data.error)
    }
  
    isLoading.value = false;
    document.body.classList.remove("loading");
    document.body.style.overflow = "auto";
  }
  const updateData = async () => {
    classNameDataOld.value = classNameData.value
    classNameData.value = classNamSwapOrNew.value

    locationCheck.value.location = locationCheckDemo.value.location
    locationCheck.value.id_Shelf = locationCheckDemo.value.id_Shelf
     const res = await axios.post(hostName + "/api/Product/checkLocationTotal", locationCheck.value, getToken())
     if(res.data.content){
      Toast.success("Success !!!")
      Swal.fire("Success !!!")
      if(classNameDataOld.value != null && classNameDataOld.value != '')
          document.querySelector('.' + classNameDataOld.value).style.backgroundColor = 'transparent'
  
      document.querySelector('.' + classNameData.value).style.backgroundColor = 'yellow'
     }else{
      Toast.error(res.data.error)
     }

     closeFrame()
  }
  
  const updateDataLocationNew = async () => {
    planNew.value.floor = currentFloorNew.value.id
    planNew.value.warehouse = currentWarehouseNew.value.id
    planNew.value.area = DataOneArea.value.id
    planNew.value.locationOld = locationCheck.value.location
    planNew.value.localtionNew = locationNewDataDemo.value.localtionNew
  
    classNameNew.value = classNameDataNew.value
    classNameDataNew.value = classNamSwapOrNew.value
    if(classNameNew.value != null && classNameNew.value != '')
          document.querySelector('.' + classNameNew.value).style.backgroundColor = 'transparent'
  
    document.querySelector('.' + classNameDataNew.value).style.backgroundColor = 'yellow'
    closeFrame()
    Toast.success("Success !!!")
  }
  const swapImage = (data, imageNew) =>{
    document.querySelector('.' + data).src = imageNew
  }
  // Hàm toggle hiển thị/ẩn phần Kho mới
  const toggleKhoMoi = () => {
    isKhoMoiVisible.value = !isKhoMoiVisible.value;
  };
  const closeFrame = () => {
    frameVisible.value = false;
  };
  // Hàm cập nhật kích thước frame dựa theo số sản phẩm
  // const updateFrameSize = () => {
  //   const itemCount = frameData.value.length; // Lấy số sản phẩm hiển thị
  
  //   widthDom.value = Math.min(1200, itemCount * 250); // Tăng chiều rộng mỗi sản phẩm 250px
  //   // frameHeight.value = Math.min(600, Math.ceil(itemCount / 3) * 200); // Mỗi 3 sản phẩm sẽ tăng 200px
  // };
  const openFrame = (id, location, list, listPlan, type, classData) =>{
    
    classNamSwapOrNew.value = classData
      frameVisible.value = true;
      if(type === 'new'){
        locationNewDataDemo.value.shelf = id
        locationNewDataDemo.value.localtionNew = location
        // classNameNew.value = classNameDataNew.value
        // classNameDataNew.value = classData
      }
      frameData.value = []
      let check = false
      if(list.length > 0){
        
        const checkListTotal = list.filter(l => l.location == location)
        if(checkListTotal.length > 0){
          if(type === 'old'){
            locationCheckDemo.value.id_Shelf = id
            locationCheckDemo.value.location = location
            // classNameDataOld.value = classNameData.value
            // classNameData.value = classData
          }
          check = true
  
          checkListTotal.forEach(element => {
            if(element.location === location){
              let dataItem = {...element, type: "Sản phẩm đang ở kho"}
              frameData.value.push(dataItem)
              
            }
          });
        }
        
      }
      if(listPlan.length > 0){
        listPlan.forEach(element => {
          if(element.location === location){
            let dataItem = {...element, type: "Sản phẩm chuẩn bị chuyển đến"}
            frameData.value.push(dataItem)
          }
        });
      }
  
      console.log(frameData.value)
      
      if(!check && type === 'old' && frameData.value.length > 0){
        widthDom.value = 1500
        isCloseNoProduct.value = true
        isSwapNew.value = false
        isSwap.value = false
        // updateFrameSize()
      }else if(frameData.value.length <= 0 && type === 'old'){
        widthDom.value = 300
        isCloseNoProduct.value = true
        isSwapNew.value = false
        isSwap.value = false
      }
      else if(frameData.value.length <= 0 && type === 'new'){
        widthDom.value = 300
        isCloseNoProduct.value = true
        isSwap.value = false
        isSwapNew.value = true
      }
      else if(frameData.value.length > 0 && type === 'old'){
        widthDom.value = 1500
        isCloseNoProduct.value = false
        isSwap.value = true
        isSwapNew.value = false
      }else if(frameData.value.length > 0 && type === 'new'){
        widthDom.value = 1500
        isCloseNoProduct.value = false
        isSwapNew.value = true
        isSwap.value = false
      }

      if(frameData.value.length == 1){
        widthDom.value = 300
      }
  }
  const SearchFloor = (type) => {
    findAllArea(type);
  };
  const searchArea = (type) => {
    findAllShelf(type)
  }
  
  const searchShelf = (type) => {
    classNamSwapOrNew.value = ''
    classNameNew.value = ''
    classNameDataNew.value = ''
    classNameDataOld.value = ''
    classNameData.value = ''
    findOneArea(type)
  }
  const findOneArea = async (type) => {
    isLoading.value = true;
    document.body.classList.add("loading"); // Add Lớp "loading"
    document.body.style.overflow = "hidden";
    if(shelfCurrentOld.value != null || shelfCurrentNew.value != null){
      const res = await axios.get(
        hostName +
          `/api/Product/FindOneByArea?id=${type === 'old' ? shelfCurrentOld.value.id : shelfCurrentNew.value.id}`,
        getToken()
      );
      if (res.data.success) {
        if(type === 'old'){
          quantityLocation.value = res.data.content
        }else{
          quantityLocationNew.value = res.data.content
        }
        
      }

      console.log(res)
    }else{
      quantityLocation.value = {}
      quantityLocationNew.value = {}
    }
  
    isLoading.value = false;
    document.body.classList.remove("loading");
    document.body.style.overflow = "auto";
  };
  const findAllShelf = async (type) =>{
  
    if(DataOneArea.value != null || DataOneAreaNew.value != null){
      const res = await axios.get(hostName + `/api/Shelf/FindByArea?id=${type === 'old' ? DataOneArea.value.id 
      : DataOneAreaNew.value.id}&page=1&pageSize=2000`, getToken())
      if (res.data.success) {
          if(res.data.content.data.length > 0){
            if(type === 'old'){
              shelfOld.value = res.data.content.data;
              shelfCurrentOld.value = res.data.content.data[0]
            }else{
              shelfNew.value = res.data.content.data;
              shelfCurrentNew.value = res.data.content.data[0]
            }
          
          findOneArea(type)
          }
        }
    }
  }
  const findAllArea = async (type) => { 
    if(currentFloor.value != null || currentFloorNew.value != null){
      const res = await axios.get(
      hostName +
        `/api/Area/FindOneByFloor?id=${type === 'old' ? currentFloor.value.id : currentFloorNew.value.id}`,
          getToken()
        );
        if (res.data.success) {
          if(res.data.content.data.length > 0){
            if(type === 'old'){
              currentAreaData.value = res.data.content.data;
              DataOneArea.value = res.data.content.data[0]
            }else{
              currentAreaDataNew.value = res.data.content.data;
              DataOneAreaNew.value = res.data.content.data[0]
            }
            findAllShelf(type)
          }
        }
  
    }
  };
  const getToken = () => {
    var token = store.getToken;
    var result = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return result;
  };
  const SearchWarehourse = async (type) => {
    const res = await axios.get(
      hostName +
        `/api/Floor/FindByWareHouser?id=${type === 'old' ? currentWarehouse.value.id : currentWarehouseNew.value.id}&page=1&pageSize=2000`,
      getToken()
    );
    if(res.data.success){
      if(res.data.content.data.length > 0){
        if(type === 'old'){
          currentFloorData.value = res.data.content.data;
          currentFloor.value = res.data.content.data[0];
          currentAreaData.value = res.data.content.data;
          DataOneArea.value = res.data.content.data[0]
        }else{
          currentFloorDataNew.value = res.data.content.data;
          currentFloorNew.value = res.data.content.data[0];
          currentAreaDataNew.value = res.data.content.data;
          DataOneAreaNew.value = res.data.content.data[0]
        }
  
        Warename.value = currentWarehouse.value.name;
        Floorname.value = res.data.content.data[0].name;
        findAllArea(type);
        Toast.success("Success");
      }else{
        currentFloorData.value = []
        currentFloor.value = null
        currentAreaData.value = []
        DataOneArea.value = null
        currentFloorDataNew.value = [];
        currentFloorNew.value = null;
        currentAreaDataNew.value = [];
        DataOneAreaNew.value = null
        // quantityLocationNew.value = 0
        // quantityLocation.value = 0
      }
    }
    else{
        currentFloorData.value = []
        currentFloor.value = null
        currentAreaData.value = []
        DataOneArea.value = null
        currentFloorDataNew.value = [];
        currentFloorNew.value = null;
        currentAreaDataNew.value = [];
        DataOneAreaNew.value = null
        // quantityLocationNew.value = 0
        // quantityLocation.value = 0
      }
  };
  const loadDataWarehouse = async (type) => {
    isLoading.value = true;
    document.body.classList.add("loading"); // Add Lớp "loading"
    document.body.style.overflow = "hidden";
    const res = await axios.get(
      hostName + "/api/Warehouse/FindAll?page=1&pageSize=2000",
      getToken()
    );
    
    if(type === 'old'){
      currentWarehouse.value = res.data.content.data[0];
      Warename.value = res.data.content.data[0].name;
      warehouseData.value = res.data.content.data;
    }
    else{
      currentWarehouseNew.value = res.data.content.data[0];
      warehouseDataNew.value = res.data.content.data;
    } 
    loadDataFloor(type === 'old' ? currentWarehouse.value : currentWarehouseNew.value, type);
    Toast.success("Success");
  };
  
  const loadDataFloor = async (id, type) => {
    const res = await axios.get(
      hostName + `/api/Floor/FindByWareHouser?id=${id.id}&page=1&pageSize=2000`,
      getToken()
    );
    if(type === 'old'){
      currentFloorData.value = res.data.content.data;
      currentFloor.value = res.data.content.data[0];
    }else{
      currentFloorDataNew.value = res.data.content.data;
      currentFloorNew.value = res.data.content.data[0];
    }
    Floorname.value = res.data.content.data[0].name;
    findAllArea(type);
    Toast.success("Success");
  };
  </script>
  
  <style>
  @keyframes index1 {
    0%{
      color: red;
    }
    100%{
      color: yellow;
    }
  }
  </style>
  <style scoped>
    .frame-popup {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
  }
  
  .frame-content {
    display: flex;
    flex-wrap: wrap; /* Cho phép xuống dòng khi không đủ chỗ */
    justify-content: center; /* Căn giữa sản phẩm */
    align-items: center;
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-height: 80vh; /* Giới hạn chiều cao tối đa */
    overflow-y: auto; /* Bật cuộn dọc nếu nội dung quá dài */
  }
  
  .frame-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    gap: 10px; /* Khoảng cách giữa các phần */
  }
  
  .info-line {
    width: calc(33.333% - 10px); /* Hiển thị 3 cột trên 1 hàng, trừ khoảng cách */
    min-width: 150px; /* Đảm bảo cột không quá nhỏ */
  }
  
  .frame-image {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .close-btn {
    margin-top: 10px;
    padding: 5px 10px;
    background: red;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
    .container {
      padding: 20px;
      max-width: 800px;
      margin: auto;
    }
  
    .form-section {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
  
    .title {
      font-size: 1.5rem;
      margin-bottom: 20px;
      color: #333;
    }
  
    .form-group {
      margin-bottom: 15px;
    }
  
    .form-select,
    .form-input,
    .form-textarea {
      height: 50px;
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    .form-select {
      cursor: pointer;
    }
  
    .swap-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .swap-button i {
      margin-right: 8px;
    }
  
    .save-button {
      background-color: #28a745;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .ward-dropdown {
      position: relative; /* Make sure it can hold the hover frame */
      background-color: white;
      border: 1px solid #ccc;
      z-index: 10;
      max-height: 300px;
      border-radius: 4px;
      padding: 10px;
      overflow-y: auto;
    }
  
    .ward-grid {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 5px;
      padding: 5px;
      text-align: left;
    }
  
    .ward-button {
      padding: 1px;
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      cursor: pointer;
      text-align: center;
      font-size: 0.8rem;
      height: 50px;
      width: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
  
    .ward-button:hover {
      background-color: #007bff;
      color: white;
    }
  
    .ward-button.selected {
      background-color: #0056b3;
      color: white;
    }
  
    /* Hover frame styling */
    .ward-info-frame {
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 6px;
      z-index: 1000;
      max-width: 250px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      transform: translateX(-50%);
  
    }
  
    .ward-info-frame h3 {
      font-size: 1rem;
      margin-bottom: 8px;
    }
  
    .ward-info-image {
      width: 100%;
      height: auto;
      border-radius: 6px;
      object-fit: cover;
    }
  
    .cancel-button {
      background-color: #dc3545;
      color: white;
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
  
    .cancel-button:hover {
      background-color: #c82333;
    }
  </style>
  