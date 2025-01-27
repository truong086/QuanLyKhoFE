<template>
  <div class="warehouse-management">
    <!-- Khung cuộn -->
    <div class="scrollable-container">
      <div class="warehouse-container">
        <div
          class="frame"
        >
          <div class="header-container">
            <div class="header-title">
              <h2 class="warehouse-title">
                Kho: {{ Warename }} - Tầng:  {{ Floorname }} - Khu: {{ Areaname}}
              </h2>
            </div>
            <div class="selectors-container">
              <div class="warehouse-select-container">
                <label for="warehouse-select" class="warehouse-label">Chọn kho:</label>
                <select id="warehouse-select" v-model="currentWarehouse" @change="SearchWarehourse">
                  <option v-for="(item, index) in warehouseData" :key="index" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>

              <div class="floor-select-container">
                <label for="floor-select" class="floor-label">Chọn tầng:</label>
                <select id="floor-select" v-model="currentFloor" @change="SearchFloor">
                  <option
                    v-for="(floor, index) in currentFloorData"
                    :key="index"
                    :value="floor"
                  >
                    {{ floor.name }} 
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="grid-wrapper">
            <div v-for="(row, rowIndex) in currentAreaData" :key="rowIndex" class="grid-item">
              <div class="row-container">
                <div class="row-header">
                  <h3>排 {{ rowIndex + 1 }}</h3>
                </div>
                <div class="grid" style="width: 1200px; display: flex; flex-wrap: wrap;">
                  <div v-for="(cell, cellIndex) in row.quantity" :key="cellIndex">
                    <div v-if="row.productArea.productPlans.some(x => x.location == cell)">
                        <button 
                            :key="cellIndex"
                            :class="['cell', { occupied: cell }]"
                            @click="(event) => openFrame(row.id, cell, row.productArea.productLocationAreas, row.productArea.productPlans)"
                            style="animation: planData 0.1s ease-in-out infinite;"
                          >
                          {{ row.productArea.productLocationAreas.some(x => x.location == cell) || row.productArea.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                        </button>
                    </div>
                    <div v-else-if="hasvalue(row.productArea.locationTotal)">
                      <div v-if="row.productArea.locationTotal.hasOwnProperty(cell)"> <!--Tìm Key, sử dụng hàm "hasOwnProperty()"-->
                          <button v-if=" row.productArea.locationTotal[cell] <= 3"
                            :class="['cell', { occupied: cell }]"
                            @click="(event) => openFrame(row.id, cell, row.productArea.productLocationAreas, row.productArea.productPlans)"
                            style="background-color: red;"
                          >
                            {{ row.productArea.productLocationAreas.some(x => x.location == cell) || row.productArea.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                          </button>
                          <button v-else-if="row.productArea.locationTotal[cell] >= 5 && row.productArea.locationTotal[cell] <= 10"
                              :class="['cell', { occupied: cell }]"
                              @click="(event) => openFrame(row.id, cell, row.productArea.productLocationAreas, row.productArea.productPlans)"
                              style="background-color: yellow;"
                            >
                            {{ row.productArea.productLocationAreas.some(x => x.location == cell) || row.productArea.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                          </button>
                          <button v-else
                              :class="['cell', { occupied: cell }]"
                              @click="(event) => openFrame(row.id, cell, row.productArea.productLocationAreas, row.productArea.productPlans)"
                              style="background-color: pink;"
                            >
                            {{ row.productArea.productLocationAreas.some(x => x.location == cell) || row.productArea.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                          </button>
                      </div>
                      <div v-else>
                          <button
                              :class="['cell', { occupied: cell }]"
                              @click="(event) => openFrame(row.id, cell, row.productArea.productLocationAreas, row.productArea.productPlans)"
                              style="background-color: gray;"
                            >
                            {{ row.productArea.productLocationAreas.some(x => x.location == cell) || row.productArea.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                          </button>
                        </div>
                    </div>
                    <div v-else>
                      <button 
                        :key="cellIndex"
                        :class="['cell', { occupied: cell }]"
                        @click="(event) => openFrame(row.id, cell, row.productArea.productLocationAreas, row.productArea.productPlans)"
                        style="background-color: gray;"
                      >
                      {{ row.productArea.productLocationAreas.some(x => x.location == cell) || row.productArea.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PagesTotal :page="page" :totalPage="totalPage" :valueE="valueE" @pageChange="findAllArea" @pageSizeChange="changeReload"></PagesTotal>
        </div>
      </div>
      <div
        v-if="frameVisible"
        class="frame-popup"
        :style="{ top: popupPosition.top + 'px', left: popupPosition.left + 'px'}"
        @click="closeFrame"
      >
          <div style="width: 1000px; display: flex; flex-wrap: wrap;">
            <div class="frame-content" @click.stop v-for="(item, index) in frameData" :key="index">
            <div class="frame-main">
              <h3>{{ item?.name }}</h3>
              <img :src="item?.image" alt="Image" class="frame-image" />
            </div>

            <div class="frame-info">
              <div class="info-line">
                <span class="info-title">Location:</span>
                <span class="info-content">{{ item?.location }}</span>
              </div>
              <div class="info-line">
                <span class="info-title">Quantity:</span>
                <span class="info-content">{{ item?.quantity }}</span>
              </div>

              <div class="info-line">
                <span class="info-title">Type:</span>
                <span class="info-content">{{ item?.type }}</span>
              </div>
              <button @click="goToNextPage" class="navigate-btn">Update</button>
              <button @click="closeFrame" class="close-btn">Đóng</button>
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
  import {ref, getCurrentInstance, onMounted, watch} from 'vue'
  import PagesTotal from './PageList/PagesTotal.vue'
  import axios from 'axios'
  import {useToast} from 'vue-toastification'
  import {useRouter} from 'vue-router'

  onMounted(() => {
    loadDataWarehouse()
    setInterval(() => {
      if(!checkTokenData()){
        store.clearStore()
        localStorage.clear()
        router.push("/login")
      }
    }, 20000)
  })

  const checkTokenData = async () => {
    const res = await axios.post(hostName + `/api/Account/CheckToken?token=${store.getToken}`, {}, getToken())
    if(res.data.success){
      const check = res.data.content.split(".")
      if(check.length !== 3){
        return true
      }else{
        store.setToken(res.data.content)
        return true
      }
    }
    else{
      return false
    }
  }

  const router = useRouter()
  const hasvalue = (data) => {
    return Object.keys(data).length > 0
  }
  const Warename = ref("")
  const Floorname = ref("")
  const Areaname = ref("")
  const warehouseData = ref([])
  const currentFloor = ref({})
  const currentFloorData = ref([])
  const valueE = ref("")
  const currentAreaData = ref([])
  const currentWarehouse = ref({})
  const isLoading = ref(false)
  const store = useCounterStore()
  const Toast = useToast()
  const page = ref(1)
  const totalPage = ref(0)
  const pageSize = ref(5)
  const frameData = ref([])

  const {proxy} = getCurrentInstance()
  const hostName = proxy?.hostname
  const popupPosition = ref({})
  const frameVisible = ref(false)
  const closeFrame = () => {
    frameVisible.value = false
  }
  const openFrame = (id, location, list, listPlan) =>{
    frameData.value = []
    if(list.length <= 0 && listPlan <= 0)
      return
    if(list.length > 0){
      list.forEach(element => {
        if(element.location === location){
          let dataItem = {...element, type: "Sản phẩm đang ở kho"}
          frameData.value.push(dataItem)
        }
      });
    }
    if(listPlan.length > 0){
      listPlan.forEach(element => {
        if(element.location === location){
          let dataItem = {...element, type: "Sản phẩm chuẩn bị chuyển đến"}
          frameData.value.push(dataItem)
        }
      });
    }

    const gridButton = event.target;
      const rect = gridButton.getBoundingClientRect();

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let top = rect.top + window.scrollY;
      let left = rect.left + window.scrollX + rect.width + 10;

      // Điều chỉnh nếu vượt quá giới hạn màn hình
      if (left + 300 > screenWidth) {
        left = rect.left + window.scrollX - 300 - 10;
      }
      if (top + 200 > screenHeight) {
        top = rect.top + window.scrollY - 200 - 10;
      }

      popupPosition.value = { top, left };
      frameVisible.value = true;
}
  watch(page.value, (newPage) => {
    findAllArea(valueE.value, newPage)
  })
  const changeReload = (event) => {
    pageSize.value = event
    findAllArea(valueE.value, page.value)
  }
  const SearchFloor = async () => {
    findAllArea(valueE.value, page.value)
  }
  const findAllArea = async (search, pageData) => {
    console.log(search)
    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'

    const res = await axios.get(hostName + `/api/Area/FindByFloor?id=${currentFloor.value.id}&page=${pageData}&pageSize=${pageSize.value}`, getToken())
    if(res.data.success){
      page.value = res.data.content.page
      totalPage.value = res.data.content.totalPages
      currentAreaData.value = res.data.content.data
      console.log(res)
    }

    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
    
  }
  const getToken = () => {
        var token = store.getToken
            var result = {
                headers: {Authorization: `Bearer ${token}`}
            }
            return result
      }
      const SearchWarehourse = async () => {
        const res = await axios.get(hostName + `/api/Floor/FindByWareHouser?id=${currentWarehouse.value.id}&page=1&pageSize=2000`, getToken())
        currentFloorData.value = res.data.content.data
        currentFloor.value = res.data.content.data[0]
        Warename.value = currentWarehouse.value.name
        Floorname.value = res.data.content.data[0].name
        findAllArea(valueE.value, page.value)
        Toast.success("Success")
      }
  const loadDataWarehouse = async () => {
    const res = await axios.get(hostName + '/api/Warehouse/FindAll?page=1&pageSize=2000', getToken())
    warehouseData.value = res.data.content.data
    currentWarehouse.value = res.data.content.data[0]
    Warename.value = res.data.content.data[0].name
    loadDataFloor(currentWarehouse.value)
    Toast.success("Success")
  }

  const loadDataFloor = async (id) => {
    const res = await axios.get(hostName + `/api/Floor/FindByWareHouser?id=${id.id}&page=1&pageSize=2000`, getToken())
    currentFloorData.value = res.data.content.data
    currentFloor.value = res.data.content.data[0]
    Floorname.value = res.data.content.data[0].name
    findAllArea(valueE.value, page.value)
    Toast.success("Success")
  }

</script>

<style>
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

@keyframes planData {
  0%{
    background-color: greenyellow;
  }
  25%{
    background-color: green;
  }
  50%{
    background-color: red;
  }
  100%{
    background-color: violet;
  }
}

/* Ngăn người dùng thao tác khi đang load */
body.loading {
pointer-events: none; /* Ngăn tất cả tương tác */
user-select: none; /* Ngăn chọn văn bản */
}
  .image-preview img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
  }
.info-line {
  display: flex;
  margin: 5px 0;
}

.info-title {
  font-weight: bold;
  margin-right: 10px;
}

.info-content {
  flex: 1;
  text-align: left;
}

/* Style cho frame popup */
.scrollable-container {
  position: absolute; /* Hoặc `fixed` nếu bạn muốn nó luôn giữ vị trí */
  top: 0;
  left: 0;
  padding-right: 100px;
  width: 110%;
  height: 100vh; /* Chiều cao 100% màn hình */
  overflow-y: auto; /* Đảm bảo có thể cuộn theo chiều dọc */
  overflow-x: hidden; /* Ẩn cuộn ngang nếu không cần */
  display: flex;
  flex-direction: column; /* Sắp xếp các phần tử theo chiều dọc */
  justify-content: flex-start; /* Bắt đầu căn từ trên */
  align-items: center;
}


.frame-popup {
  position: fixed; /* Giữ cố định trong màn hình */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* Đảm bảo popup luôn nổi trên */
  max-height: 90%; /* Giới hạn chiều cao để không vượt màn hình */
  overflow-y: auto; /* Kích hoạt cuộn dọc nếu nội dung quá lớn */
}


.frame-content {
  width: 100%;
}



/* Nội dung của popup */
.frame-content {
  background-color: rgb(255, 255, 255);
  padding: 20px;
  border-radius: 10px;
  display: flex; /* Sắp xếp ngang */
  align-items: flex-start; /* Căn chỉnh theo chiều dọc */
  gap: 20px; /* Khoảng cách giữa các phần */
  max-width: 100%;
  animation: fadeInContent 0.3s ease-in-out;
  flex: 1;
}

.frame-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
}

.frame-info {
  display: flex;
  flex-direction: column; /* Các dòng thông tin xếp dọc */
  justify-content: flex-start;
  gap: 10px;
  text-align: left;
}

.frame-image {
  max-width: 150px;
  max-height: 150px;
  border-radius: 5px;
}

.info-line {
  display: flex;
  gap: 10px; /* Khoảng cách giữa tiêu đề và nội dung */
}

.info-title {
  font-weight: bold;
  color: #333;
  min-width: 80px; /* Đảm bảo các tiêu đề có kích thước đồng đều */
}

.info-content {
  flex: 1;
  color: #555;
}

/* Điều chỉnh các nút trong popup */
.close-btn, .navigate-btn {
  width: 100px;
  margin-top: 10px;
}


/* Thêm các hiệu ứng animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes fadeInContent {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Nút đóng và nút điều hướng */
.close-btn, .navigate-btn {
  padding: 10px 20px;
  background-color: #fc04d3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s ease;
}

.close-btn:hover, .navigate-btn:hover {
  background-color: #0056b3;
}

/* Các kiểu trước đó giữ nguyên */
.warehouse-management {
  transform: scale(0.9); /* Shrinks the whole page to 90% */
  transform-origin: top center; /* Keeps the scaling anchored from the top center */
  width: 100%;
  padding: 0; /* Loại bỏ padding */
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Căn chỉnh từ trên cùng */
  min-height: 100vh; /* Đảm bảo chiều cao của body chiếm toàn bộ chiều cao màn hình */

}

.warehouse-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%; /* Đảm bảo container chiếm toàn bộ chiều rộng */
  position: relative; /* Cần thiết để .frame-popup định vị chính xác */
}


.frame {
  width: 100%;
  max-width: 1500px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding-left: 0; /* Loại bỏ padding-left để không còn khoảng trống bên trái */
  margin-bottom: 40px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.header-title {
  flex: 1;
  margin-top: 20px;
}

.warehouse-title {
  font-size: 25px;
  margin-bottom: 20px;
  margin-left: 200px;
  padding: 10px 20px;
  border: 2px solid #007bff;
  border-radius: 10px;
  display: inline-block;
  background-color: #f0f8ff;
  color: #007bff;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 22px;
  padding: 8px 15px;
}

.grid-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.row-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.row-header {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  margin-left: 90px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.grid {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  gap: 20px;
}

.cell {
  width: 95px;
  height: 40px;
  background-color: #eee;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 40px;
  font-size: 10px;
}

.cell.occupied {
  background-color: #ff4d4d;
  color: white;
}
.selectors-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.warehouse-select-container,
/* .area-select-container {
  display: flex;
  align-items: center;
  gap: 10px;
} */

.warehouse-label,
.area-label {
  font-size: 16px;
  color: #007bff;
  font-weight: bold;
}

select {
  font-size: 16px;
  padding: 5px 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  background-color: #f0f8ff;
  color: #007bff;
  cursor: pointer;
}
.floor-label {
  font-size: 16px;
  color: #007bff;
  font-weight: bold;
}

#warehouse-select,
#area-select,
#floor-select {
  font-size: 16px;
  padding: 5px 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  background-color: #f0f8ff;
  color: #007bff;
  cursor: pointer;
}

#warehouse-select:focus,
#area-select:focus,
#floor-select:focus {
  border-color: #01060c;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

@media (max-width: 768px) {
  .frame {
    width: 95%;
    padding-left: 30px;
  }

  .warehouse-title {
    font-size: 18px;
    padding: 8px 15px;
  }

  .row-container {
    flex-direction: column;
    align-items: center;
  }

  .grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }

  .cell {
    width: 60px;
    height: 30px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .warehouse-title {
    font-size: 16px;
    padding: 5px 10px;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .cell {
    width: 50px;
    height: 25px;
    font-size: 10px;
  }
}
</style>