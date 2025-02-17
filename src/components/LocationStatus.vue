<template>
  <div class="container mt-4">
    <div class="header">
      <label for="floorSelect" class="form-label"> 選擇樓層:</label>
      <select
        id="floorSelect"
        v-model="selectedFloor"
        @change="seareArea"
        class="form-select small-select"
      >
        <option v-for="floor in floors" :key="floor" :value="floor.id">
          {{ floor.name }}
        </option>
      </select>
    </div>

    <div class="zone-container">
      <!-- Loop through zones based on selected floor -->
      <div v-for="(zone, index) in zones" :key="index" class="zone-grid">
        <div class="zone-label">{{ zone.name }}</div>
        <div class="column" style="width: 400px; overflow-y: auto;">
          <div class="row" v-for="(row, indexRow) in zone.data" :key="indexRow">
            <div class="row-item">
              <button
                class="row-label"
                @click="openRowDetail(row.shelfGetAlls)"
                :style="{ marginBottom: '15px' }"
              >
                {{ indexRow + 1 }}
              </button>
              <div class="sub-row-container" style="width: 40px; overflow-x: auto; flex-wrap: wrap;">
                <div
                  class="sub-row"
                  v-for="(box, indexBox) in row.shelfGetAlls"
                  :key="indexBox"
                  
                >
                <button
                  v-if="box.productShefl.productLocationAreas.length > 0"
                       @click="openFrameData(box, indexBox + 1)"
                      style="background-color: red"
                      class="box"
                      :class="{
                        'has-items': hasItems(zone, row, box),
                        empty: !hasItems(zone, row, box),
                      }"
                    >
                      <span>
                        {{ indexBox + 1 }}
                      </span>
                    </button>

                    <button
                  v-else
                       @click="openFrameData(box, indexBox + 1)"
                      class="box"
                      :class="{
                        'has-items': hasItems(zone, row, box),
                        empty: !hasItems(zone, row, box),
                      }"
                    >
                      <span>
                        {{ indexBox + 1 }}
                      </span>
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Frame chi tiết vị trí -->
    <div v-if="frameVisible" class="detail-frame">
      <div class="frame-content">
        <div v-for="(item, index) in selectedDetail" :key="index">
          <div class="frame-top">
            <div class="frame-image">
              <div>
                <img :src="item.image" :class="'images_' + item.id" alt="Product Image" />
              </div>
              <div v-if="item.images">
                <img
                  v-for="(itemImage, indexImage) in item.images"
                  :key="indexImage"
                  :src="itemImage"
                  style="width: 30px; height: 30px"
                  alt="Product Image"
                  @click="swapImage('images_' + item.id, itemImage)"
                />
              </div>
            </div>
            <div class="frame-details">
              <p><strong>產品:</strong> {{ item.name }}</p>
              <h3>細節</h3>
              <p>
                <strong>類別:</strong> {{ item.category }}
                <img
                  :src="item.category_image"
                  style="width: 30px; height: 30px; border-radius: 50%"
                  alt="Product Image"
                />
              </p>
              <p>
                <strong>供應商:</strong> {{ item.supplier }}
                <img
                  :src="item.supplier_image"
                  style="width: 30px; height: 30px; border-radius: 50%"
                  alt="Product Image"
                />
              </p>
              <p><strong>價格:</strong> {{ item.price }}</p>
              <p><strong>庫存:</strong> {{ item.inventory }}</p>
              <p><strong>數量位置:</strong> {{ item.quantity }}</p>
              <p><strong>位置:</strong> {{ item.location }}</p>
              <p><strong>代碼:</strong> {{ item.code }}</p>
            </div>
          </div>
        </div>
        

        <div class="frame-buttons">
          <button class="close-button" @click="frameVisible = false">
            關閉按鈕
          </button>
        </div>
      </div>
    </div>

    <!-- Frame danh sách sản phẩm -->
    <div v-if="rowDetailVisible" class="detail-frame">
      <div class="frame-content" >
        <div v-for="(item, index) in selectedRowDetail" :key="index" style="display: flex !important;">
          <div class="frame-top" style="display: flex !important;">
          <div class="frame-image">
            <div>
              <img :src="item.image" :class="'images_' + item.id" alt="Product Image" />
            </div>
            <div v-if="item.images">
              <img
                v-for="(itemImage, indexImage) in item.images"
                :key="indexImage"
                :src="itemImage"
                style="width: 30px; height: 30px"
                alt="Product Image"
                @click="swapImage('images_' + item.id, itemImage)"
              />
            </div>
          </div>
          <div class="frame-details">
            <p><strong>產品:</strong> {{ item.name }}</p>
            <h3>細節</h3>
            <p>
              <strong>類別:</strong> {{ item.category }}
              <img
                :src="item.category_image"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt="Product Image"
              />
            </p>
            <p>
              <strong>供應商:</strong> {{ item.supplier }}
              <img
                :src="item.supplier_image"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt="Product Image"
              />
            </p>
            <p><strong>價格:</strong> {{ item.price }}</p>
            <p><strong>庫存:</strong> {{ item.inventory }}</p>
            <p><strong>數量位置:</strong> {{ item.quantity }}</p>
            <p><strong>位置:</strong> {{ item.location }}</p>
            <p><strong>代碼:</strong> {{ item.code }}</p>
          </div>
        </div>
        
        </div>
        <div class="frame-buttons">
          <button class="close-button" @click="rowDetailVisible = false">
            關閉按鈕
          </button>
        </div>
        
      </div>
    </div>
  </div>
  <PagesTotal :page="page" :totalPage="totalPage" :valueE="valueE" @pageChange="findOneAreByFloor" @pageSizeChange="changeReload"></PagesTotal>
  <!-- Hiển thị màn hình loading -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>

   <!-- Form hiển thị khi isFormVisible = true -->
   <div v-if="isFormVisible && dataShelfLocation" class="form-container2">
    
      <div class="form-content2">
        <div>
          <button class="row-label"
                @click="openRowDetailShelf(dataShelfLocation)"
                :style="{ marginBottom: '15px' }">{{ indexLine }}</button>
      <button @click="isFormVisible = false" style="border: none; outline: none; background-color: transparent; color: red;"><i class="fa fa-window-close-o" aria-hidden="true"></i></button>
        </div>
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="(location, indexlocation) in dataShelfLocation.quantity" :key="indexlocation" >
           
            <div
                    v-if="
                      dataShelfLocation.productInPlans.some(
                        (x) => (x.locationNew == location && x.shelfsNew == dataShelfLocation.id) || (x.shelfsOld == dataShelfLocation.id && x.locationOld == location)
                      )
                    "
                  >
                    <p
                      style="
                        position: absolute;
                        animation: index1 0.1s ease-in-out infinite;
                        font-size: 8px;
                        width: 25px;
                      "
                    >
                      Plan:
                      {{
                        checkLocationPlan(
                          dataShelfLocation.productInPlans,
                          dataShelfLocation.id,
                          location
                        ).title
                      }}
                      :
                      {{
                        checkLocationPlan(
                          dataShelfLocation.productInPlans,
                          dataShelfLocation.id,
                          location
                        ).shelfsOld == dataShelfLocation.id &&
                        checkLocationPlan(
                          dataShelfLocation.productInPlans,
                          dataShelfLocation.id,
                          location
                        ).locationOld == location
                          ? "Old"
                          : "New"
                      }}
                    </p>
                    <!-- <button 
                              :key="cellIndex"
                              :class="'form-select' + ' ' + 'swapBgOld_' + quantityLocation.id + '_' + cell"
                              @click="(event) => openFrame(quantityLocation.id, cell, quantityLocation.productLocationAreas, quantityLocation.productPlans, 'old', 'swapBgOld_' + quantityLocation.id + '_' + cell)"
                              style="animation: planData 0.1s ease-in-out infinite; font-size: 12px;"
                            >
                            {{ quantityLocation.productLocationAreas.some(x => x.location == cell) || quantityLocation.productPlans.some(x => x.location == cell) ? cell + " - " + quantityLocation.name + " (Có sản phẩm)" : cell + " - " + quantityLocation.name }}
                          </button> -->
                    <div
                    v-if="
                        checkQuantityLocationProduct(
                          dataShelfLocation.productShefl.
                          productLocationAreas,
                          location
                        ) > 0
                      "
                    >
                    <!--
                           <div v-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 15 && d.quantityUsed > 1)" style="position: absolute;">
                    <p style="font-size: 10px; font-weight: bold; animation: AlmostFull 0.5s ease-in-out infinite;">Almost full !!!</p>
                  </div>
                  <div v-else-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 0)" style="position: absolute;">
                    <p style="font-size: 10px; font-weight: bold; animation: Full 0.5s ease-in-out infinite;">Full !!!</p>
                  </div>
                    -->
                    <button
                     
                      style="background-color: blueviolet; padding: 15px 25px;"
                      class="box"
                      :class="{
                        'has-items': hasItems(1, row, box),
                        empty: !hasItems(1, row, box),
                      }"
                      @click="
                        openFrame(
                          dataShelfLocation.productShefl
                          .productLocationAreas,
                          location
                        )
                      "
                    >
                    <p v-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 15 && d.quantityUsed > 1)"
                       style="position: absolute; font-size: 8px; font-weight: bold; animation: AlmostFull 0.5s ease-in-out infinite; margin-left: 30px;">Almost full !!!</p>
                       <p v-else-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 0)" 
                        style="position: absolute; font-size: 8px; font-weight: bold; animation: Full 0.5s ease-in-out infinite; margin-left: 30px;">Full !!!</p>
                       <span>
                        {{ location }}
                      </span>
                    </button>
                    </div>
                    <div v-else>
                      <button
                      v-if="
                        checkQuantityLocationProduct(
                          dataShelfLocation.productShefl.
                          productLocationAreas,
                          location
                        ) > 0
                      "
                      style="background-color: blueviolet; padding: 15px 25px;"
                      class="box"
                      :class="{
                        'has-items': hasItems(1, row, box),
                        empty: !hasItems(1, row, box),
                      }"
                      @click="
                        openFrame(
                          dataShelfLocation.productShefl
                          .productLocationAreas,
                          location
                        )
                      "
                    >
                    <p v-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 15 && d.quantityUsed > 1)"
                       style="position: absolute; font-size: 8px; font-weight: bold; animation: AlmostFull 0.5s ease-in-out infinite; margin-left: 30px;">Almost full !!!</p>
                       <p v-else-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 0)" 
                        style="position: absolute; font-size: 8px; font-weight: bold; animation: Full 0.5s ease-in-out infinite; margin-left: 30px;">Full !!!</p>
                      <span>
                        {{ location }}
                      </span>
                    </button>
                    <button
                      v-else
                      class="box"
                      :class="{
                        'has-items': hasItems(1, row, box),
                        empty: !hasItems(1, row, box),
                      }"
                      style="padding: 15px 25px;"
                      @click="
                        openFrame(
                          dataShelfLocation.productShefl
                          .productLocationAreas,
                          location
                        )
                      "
                    >
                    <p v-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 15 && d.quantityUsed > 1)"
                       style="position: absolute; font-size: 8px; font-weight: bold; animation: AlmostFull 0.5s ease-in-out infinite; margin-left: 30px;">Almost full !!!</p>
                       <p v-else-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 0)" 
                        style="position: absolute; font-size: 8px; font-weight: bold; animation: Full 0.5s ease-in-out infinite; margin-left: 30px;">Full !!!</p>
                      <span>
                        {{ location }}
                      </span>
                    </button>
                    </div>
                  </div>
                  <div v-else>
                    <button
                      v-if="
                        checkQuantityLocationProduct(
                          dataShelfLocation.productShefl.
                          productLocationAreas,
                          location
                        ) > 0
                      "
                      style="background-color: blueviolet; padding: 15px 25px;"
                      class="box"
                      :class="{
                        'has-items': hasItems(1, row, box),
                        empty: !hasItems(1, row, box),
                      }"
                      @click="
                        openFrame(
                          dataShelfLocation.productShefl
                          .productLocationAreas,
                          location
                        )
                      "
                    >
                    <p v-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 15 && d.quantityUsed > 1)"
                       style="position: absolute; font-size: 8px; font-weight: bold; animation: AlmostFull 0.5s ease-in-out infinite; margin-left: 30px;">Almost full !!!</p>
                       <p v-else-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 0)" 
                        style="position: absolute; font-size: 8px; font-weight: bold; animation: Full 0.5s ease-in-out infinite; margin-left: 30px;">Full !!!</p>
                      <span>
                        {{ location }}
                      </span>
                    </button>
                    <button
                      v-else
                      class="box"
                      :class="{
                        'has-items': hasItems(1, row, box),
                        empty: !hasItems(1, row, box),
                      }"
                      style="padding: 15px 25px;"
                      @click="
                        openFrame(
                          dataShelfLocation.productShefl
                          .productLocationAreas,
                          location
                        )
                      "
                    >
                    <p v-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 15 && d.quantityUsed > 1)"
                       style="position: absolute; font-size: 8px; font-weight: bold; animation: AlmostFull 0.5s ease-in-out infinite; margin-left: 30px;">Almost full !!!</p>
                       <p v-else-if="dataShelfLocation.totalQuantityUseds.some(d => d.location == location && d.quantityUsed <= 0)" 
                        style="position: absolute; font-size: 8px; font-weight: bold; animation: Full 0.5s ease-in-out infinite; margin-left: 30px;">Full !!!</p>
                      <span>
                        {{ location }}
                      </span>
                    </button>
                  </div>
            
        </div>
        </div>
        
        
      </div>
    </div>
</template>

<script setup>
import { useCounterStore } from "../store";
import { ref, getCurrentInstance, onMounted, watch } from "vue";
import PagesTotal from './PageList/PagesTotal.vue'
import axios from "axios";
import { useToast } from "vue-toastification";

// Updated floors and zones, fixed to correctly match the zones for each floor
const floors = ref(["Tầng 1", "Tầng 3"]);
const selectedFloor = ref(null);
const zones = ref({
  "Tầng 1": ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
  "Tầng 3": ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
});
const valueE = ref("")
const frameVisible = ref(false);
const rowDetailVisible = ref(false);
const selectedDetail = ref([]);
const selectedRowDetail = ref([]);
const isLoading = ref(false);
const isFormVisible = ref(false)
const page = ref(1)
  const totalPage = ref(0)
  const pageSize = ref(2)
  const dataShelfLocation = ref({})

const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;
const store = useCounterStore();
const indexLine = ref(0)
const Toast = useToast();
// Sample inventory data
const inventory = ref({
  "C1-2-3": "Sản phẩm A",
  "C2-5-7": "Sản phẩm C",
  "C3-8-4": "Sản phẩm D",
  "C4-3-6": "Sản phẩm G",
  "C5-9-2": "Sản phẩm H",
});

onMounted(() => {
  findAllFloor();
});
const getToken = () => {
  var token = store.getToken;
  var result = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return result;
};

const checkLocationPlan = (list, id, cell) => {
  return list.find(
    (x) =>
      (x.shelfsOld == id || x.shelfsNew == id) &&
      (x.locationOld == cell || x.locationNew == cell)
  );
};

const openFrameData = (box, index) => {
  dataShelfLocation.value = box
  indexLine.value = index
  console.log(box)
  isFormVisible.value = true
}
const swapImage = (classData, link) => {
  document.querySelector('.' + classData).src = link
}
const findAllFloor = async () => {
  isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
  const res = await axios.get(
    hostName + "/api/Floor/FindAll?page=1&pageSize=2000",
    getToken()
  );
  if (res.data.success) {
    floors.value = res.data.content.data;
    selectedFloor.value = res.data.content.data[0].id
    findOneAreByFloor(valueE.value, page.value)
    Toast.success("Success");
  }else{
    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
  }

  
};

const checkQuantityLocationProduct = (data, location) => {
  var count = data.filter((p) => p.location == location).length;
  return count;
};
const seareArea = () => {
  findOneAreByFloor(valueE.value, page.value);
};

const findOneAreByFloor = async (search, pageData) => {
  console.log(search)
  isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
  const res = await axios.get(
    hostName +
      `/api/Shelf/FindByDataAreaLineByFloor?id=${selectedFloor.value}&page=${pageData}&pageSize=${pageSize.value}`,
    getToken()
  );
  console.log(res);
  if (res.data.success) {
    page.value = res.data.content.page
    totalPage.value = res.data.content.totalPages
    zones.value = res.data.content.data;
    Toast.success("Success");
  }

  isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
};
// Check if a box has items in the inventory
const hasItems = (zone, row, col) => {
  return Boolean(inventory.value[`${zone}-${row}-${col}`]);
};

// Open frame with detailed item info
const openFrame = (list, location) => {
  console.log(list)
  console.log(location)
  selectedDetail.value = [];
  const checkListData = list.filter((x) => x.location == location);
  if (checkListData.length <= 0) return;
  if (list.length > 0) {
    if (checkListData.length > 0) {
      checkListData.forEach((element) => {
        if (element.location === location) {
          let dataItem = { ...element, type: "Sản phẩm đang ở kho" };
          selectedDetail.value.push(dataItem);
        }
      });
    }
  }
  frameVisible.value = true;
};

// Open row detail to show the products in a specific row
const openRowDetail = (zone, row) => {
  console.log(zone)
  let productSet = new Set();
  selectedRowDetail.value = [];
  zone.forEach((element) => {
    element.productShefl.productLocationAreas.forEach((item) => {
      selectedRowDetail.value.push(item);
    });
  });
  for (let col = 1; col <= 10; col++) {
    const key = `${zone}-${row}-${col}`;
    if (inventory.value[key]) {
      productSet.add(inventory.value[key]);
    }
  }

  if(selectedRowDetail.value.length > 0)
      rowDetailVisible.value = true;
};

const openRowDetailShelf = (zone) => {
  selectedRowDetail.value = [];
  zone.productShefl.productLocationAreas.forEach((element) => {
    selectedRowDetail.value.push(element);
  });

  rowDetailVisible.value = true;
};

const changeReload = (event) => {
    pageSize.value = event
    findOneAreByFloor(valueE.value, page.value)
  }

  watch(page.value, (newPage) => {
    findOneAreByFloor(valueE.value, newPage)
  })


</script>

<style>
  @keyframes AlmostFull {
    0%{
      color: blue;
    }
    100%{
      color: azure;
    }
  }

  @keyframes Full {
    0%{
      color: goldenrod;
    }
    50%{
      color: white;
    }
    100%{
      color: green;
    }
  }

  @keyframes AlmostFullHeader {
    0%{
      background-color: violet;
    }
    100%{
      background-color: darkorange;
    }
  }

  @keyframes FullHeader {
    0%{
      background-color: gold;
    }
    100%{
      background-color: mediumblue;
    }
  }
</style>

<style scoped>
/* Container chính */
.container {
  max-width: 1000px;
  margin: auto;
  text-align: center;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
}

/* Header */
.header {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: start;
  margin-bottom: 20px;
}

/* Select Box */
/* Cải thiện kiểu cho select */
.small-select {
  width: 120px; /* Tăng chiều rộng */
  height: 35px;
  padding: 5px;
  border: 1px solid #4a90e2;
  border-radius: 5px;
  background: linear-gradient(135deg, #ffffff, #f1f4ff);
  transition: all 0.3s ease;
  font-size: 14px;
}

.small-select:hover {
  background: linear-gradient(135deg, #e8eeff, #cbd9ff);
}

.small-select:focus {
  border-color: #2c5fb8;
  box-shadow: 0 0 8px rgba(44, 95, 184, 0.5);
}

/* Cải thiện zone-label */
.zone-label {
  margin-bottom: 10px;
  font-weight: bold;
  background: linear-gradient(135deg, #3a7bd5, #d76d77);
  font-size: 14px; /* Thu nhỏ kích thước font */
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Cải thiện zone-container */
.zone-container {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  ); /* Cải thiện layout */
  gap: 30px;
  justify-content: center;
  margin-top: 30px;
}

/* Cải thiện zone-grid */
.zone-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  width: 100%; /* Đảm bảo mỗi zone-grid có chiều rộng đầy đủ */
}

.zone-grid:hover {
  transform: translateY(-5px);
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.2);
}

.small-select:hover {
  background: linear-gradient(135deg, #e8eeff, #cbd9ff);
}

.small-select:focus {
  border-color: #2c5fb8;
  box-shadow: 0 0 8px rgba(44, 95, 184, 0.5);
}

/* Khu vực chứa các zone */
.zone-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 50px;
  justify-content: center;
}

/* Mỗi zone */
.zone-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.zone-grid:hover {
  transform: translateY(-5px);
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.2);
}

/* Các hàng và cột */
.column {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 15px; /* Khoảng cách giữa các row-label */
  justify-content: center; /* Căn giữa các row-label */
}
.row-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sub-row-container {
  display: flex;
  flex-direction: row;
  gap: 2px;
}

.sub-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Ô box */
.box {
  width: 12px;
  height: 12px;
  border: 1px solid #6c757d;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  border-radius: 4px;
  padding: 0;
  margin: 1px;
  transition: all 0.3s ease-in-out;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.box:hover {
  background: linear-gradient(135deg, #d9e2ff, #c3d1ff);
  border-color: #4a90e2;
  box-shadow: 2px 2px 5px rgba(74, 144, 226, 0.4);
  transform: scale(1.2);
}

.box:active {
  background: linear-gradient(135deg, #4a90e2, #6b9df2);
  color: white;
  border-color: #2c5fb8;
  transform: scale(1);
}

/* Hiệu ứng khi được chọn */
.box.selected {
  background: linear-gradient(135deg, #ff7675, #ff9999);
  color: white;
  border-color: #d63031;
  box-shadow: 2px 2px 5px rgba(214, 48, 49, 0.4);
}
.box.has-items {
  background: red;
  border: 1px solid darkred;
}
.box.empty {
  background: white;
  border: 1px solid grey;
}
.row-label {
  background: linear-gradient(135deg, #ff9a9e, #ff6a00);
  color: white;
  padding: 5px 9px;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
}
/* Nhãn của từng zone */
.zone-label {
  margin-top: 5px;
  font-weight: bold;
  background-color: orange;
  color: #333;
  font-size: 16px;
  text-transform: uppercase;
}

/* Frame chi tiết */
/* Frame chi tiết */
.detail-frame {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  text-align: left; /* Canh trái */
  width: 1000px;
  animation: fadeIn 0.3s ease-in-out;
  display: flex;
  flex-wrap: wrap;
}

.frame-content {
  gap: 20px; /* Khoảng cách giữa các phần tử */
  padding: 20px;
}

.frame-top {
  display: flex;
  gap: 20px;
}

.frame-image img {
  width: 100px; /* Kích thước ảnh */
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}



.frame-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

/* Hiệu ứng fadeIn */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -55%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -55%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.frame-content {
  display: flex;
}

/* Hình ảnh trong frame */
.frame-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* Các nút trong frame */
.frame-buttons {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.action-button {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.action-button:hover {
  background: linear-gradient(135deg, #0056b3, #003d80);
  box-shadow: 2px 2px 10px rgba(0, 91, 255, 0.3);
}

.close-button {
  background: linear-gradient(135deg, #dc3545, #a71d2a);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.close-button:hover {
  background: linear-gradient(135deg, #a71d2a, #7a141e);
  box-shadow: 2px 2px 10px rgba(255, 0, 0, 0.3);
}

.form-container2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-content2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 300px;
}
</style>
