<template>
  <div class="warehouse-management">
    <!-- Khung cuộn -->
    <div class="scrollable-container">
      <div class="warehouse-container">
        <div
          class="frame"
        >
        <div>
          <div class="header-title">
              <h2 class="warehouse-title" style="width: 850px;">
                {{ $t('warehouse') }}: {{ Warename }} => {{ $t('floor') }}: {{ Floorname }} => {{ $t('area') }}: {{ areaName }}
              </h2>
            </div>
        </div>
          <div class="header-container" style="margin: 50px;">
            <div class="selectors-container">
              <div class="warehouse-select-container">
                <label for="warehouse-select" class="warehouse-label">{{ $t('warehouse') }}:</label>
                <select id="warehouse-select" v-model="currentWarehouse" @change="SearchWarehourse">
                  <option v-for="(item, index) in warehouseData" :key="index" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="floor-select-container">
                <label for="floor-select" class="floor-label">{{ $t('floor') }}:</label>
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
              <div class="floor-select-container">
                <label for="floor-select" class="floor-label">{{ $t('area') }}:</label>
                <select id="floor-select" v-model="currentAreaFindOne" @change="SearchArea">
                  <option
                    v-for="(item, index) in currentAreaData"
                    :key="index"
                    :value="item"
                  >
                    {{ item.name }} 
                  </option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="grid-wrapper" v-if="currentShelfData.length > 0">
            <div v-for="(row, rowIndex) in currentShelfData" :key="rowIndex" class="grid-item">
              <div class="row-container">
                <div v-if="row.totalLocationExsis <= 17">
                  <div class="row-header" style="animation: AlmostFullHeader 0.5s ease-in-out infinite; flex-direction: column;">
                    <h3>排 {{ rowIndex + 1 }}</h3>
                    <p style="font-size: 10px; animation: AlmostFull 0.5s ease-in-out infinite;">Almost full !!!</p>
                  </div>
                </div>
                <div v-else-if="row.totalLocationExsis == 0">
                  <div class="row-header" style="animation: FullHeader 0.5s ease-in-out infinite; flex-direction: column;">
                    <h3>排 {{ rowIndex + 1 }}</h3>
                    <p style="font-size: 10px; animation: Full 0.5s ease-in-out infinite;">Full !!!</p>
                  </div>
                </div>
                <div v-else>
                  <div class="row-header">
                    <h3>排 {{ rowIndex + 1 }}</h3>
                  </div>
                </div>
                
                <div class="grid" style="width: 1200px; display: flex; flex-wrap: wrap;">
                  <div v-for="(cell, cellIndex) in row.quantity" :key="cellIndex">
                  <div v-if="row.totalQuantityUseds.some(d => d.location == cell && d.quantityUsed <= 15 && d.quantityUsed > 1)" style="position: absolute;">
                    <p style="font-size: 10px; font-weight: bold; animation: AlmostFull 0.5s ease-in-out infinite;">Almost full !!!</p>
                  </div>
                  <div v-else-if="row.totalQuantityUseds.some(d => d.location == cell && d.quantityUsed <= 0)" style="position: absolute;">
                    <p style="font-size: 10px; font-weight: bold; animation: Full 0.5s ease-in-out infinite;">Full !!!</p>
                  </div>
                    <div v-if="row.productShefl.productPlans.some(x => x.location == cell)">
                        <button 
                            :key="cellIndex"
                            :class="['cell', { occupied: cell }]"
                            @click="(event) => openFrame(row.id, cell, row.productShefl.productLocationAreas, row.productShefl.productPlans)"
                            style="animation: planData 0.1s ease-in-out infinite;"
                          >
                          {{ row.productShefl.productLocationAreas.some(x => x.location == cell) || row.productShefl.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                        </button>
                    </div>
                    <div v-else-if="hasvalue(row.productShefl.locationTotal)">
                      <div v-if="row.productShefl.locationTotal.hasOwnProperty(cell)"> <!--Tìm Key, sử dụng hàm "hasOwnProperty()"-->
                          <button v-if=" row.productShefl.locationTotal[cell] <= 3"
                            :class="['cell', { occupied: cell }]"
                            @click="(event) => openFrame(row.id, cell, row.productShefl.productLocationAreas, row.productShefl.productPlans)"
                            style="background-color: red;"
                          >
                            {{ row.productShefl.productLocationAreas.some(x => x.location == cell) || row.productShefl.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                          </button>
                          <button v-else-if="row.productShefl.locationTotal[cell] >= 5 && row.productShefl.locationTotal[cell] <= 10"
                              :class="['cell', { occupied: cell }]"
                              @click="(event) => openFrame(row.id, cell, row.productShefl.productLocationAreas, row.productShefl.productPlans)"
                              style="background-color: yellow;"
                            >
                            {{ row.productShefl.productLocationAreas.some(x => x.location == cell) || row.productShefl.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                          </button>
                          <button v-else
                              :class="['cell', { occupied: cell }]"
                              @click="(event) => openFrame(row.id, cell, row.productShefl.productLocationAreas, row.productShefl.productPlans)"
                              style="background-color: pink;"
                            >
                            {{ row.productShefl.productLocationAreas.some(x => x.location == cell) || row.productShefl.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                          </button>
                      </div>
                      <div v-else>
                        <button v-if="checkQuantityLocationProduct(row.productShefl.productLocationAreas, cell) > 0 && checkQuantityLocationProduct(row.productShefl.productLocationAreas, cell) <=  4"
                            :key="cellIndex"
                            :class="['cell', { occupied: cell }]"
                            @click="(event) => openFrame(row.id, cell, row.productShefl.productLocationAreas, row.productShefl.productPlans)"
                            style="background-color: blueviolet;"
                          >
                          {{ row.productShefl.productLocationAreas.some(x => x.location == cell) || row.productShefl.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                          </button>
                          <button v-if="checkQuantityLocationProduct(row.productShefl.productLocationAreas, cell) <= 0"
                              :key="cellIndex"
                              :class="['cell', { occupied: cell }]"
                              @click="(event) => openFrame(row.id, cell, row.productShefl.productLocationAreas, row.productShefl.productPlans)"
                              style="background-color: grey; opacity: 0.5;"
                            >
                            {{ row.productShefl.productLocationAreas.some(x => x.location == cell) || row.productShefl.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                          </button>
                          <!-- <button
                              :class="['cell', { occupied: cell }]"
                              @click="(event) => openFrame(row.id, cell, row.productShefl.productLocationAreas, row.productShefl.productPlans)"
                              style="background-color: gray;"
                            >
                            {{ row.productShefl.productLocationAreas.some(x => x.location == cell) || row.productShefl.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                          </button> -->
                        </div>
                    </div>
                    <div v-else>
                      <div v-if="checkQuantityLocationProduct(row.productShefl.productLocationAreas, cell) > 0 && checkQuantityLocationProduct(row.productShefl.productLocationAreas, cell) <=  4">
                        <button 
                          :key="cellIndex"
                          :class="['cell', { occupied: cell }]"
                          @click="(event) => openFrame(row.id, cell, row.productShefl.productLocationAreas, row.productShefl.productPlans)"
                          style="background-color: blueviolet;"
                        >
                        {{ row.productShefl.productLocationAreas.some(x => x.location == cell) || row.productShefl.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                        </button>
                      </div>
                      <div v-else-if="checkQuantityLocationProduct(row.productShefl.productLocationAreas, cell) > 0 && checkQuantityLocationProduct(row.productShefl.productLocationAreas, cell) <=  5">
                        <button
                          :key="cellIndex"
                          :class="['cell', { occupied: cell }]"
                          @click="(event) => openFrame(row.id, cell, row.productShefl.productLocationAreas, row.productShefl.productPlans)"
                          style="background-color: blueviolet;"
                        >
                        {{ row.productShefl.productLocationAreas.some(x => x.location == cell) || row.productShefl.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                        </button>
                      </div>
                      <div v-else>
                        <button
                            :key="cellIndex"
                            :class="['cell', { occupied: cell }]"
                            @click="(event) => openFrame(row.id, cell, row.productShefl.productLocationAreas, row.productShefl.productPlans)"
                            style="background-color: grey; opacity: 0.5;"
                          >
                          {{ row.productShefl.productLocationAreas.some(x => x.location == cell) || row.productShefl.productPlans.some(x => x.location == cell) ? cell + " - " + row.name + " (Có sản phẩm)" : cell + " - " + row.name }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PagesTotal :page="page" :totalPage="totalPage" :valueE="valueE" @pageChange="findAllShelfByArea" @pageSizeChange="changeReload"></PagesTotal>
        </div>
      </div>
      <div
        v-if="frameVisible"
        class="frame-popup"
        :style="{ top: popupPosition.top + 'px', left: popupPosition.left + 'px'}"
        @click="closeFrame"
      >
          <div style="width: 1200px; display: flex; flex-wrap: wrap;">
            <div class="frame-content" @click.stop v-for="(item, index) in frameData" :key="index">
                <div class="frame-main">
                  <h3>{{ item?.name }}</h3>
                  <img :src="item?.image" alt="Image" :class="'frame-image' + ' ' + 'images_' + item.id_product"/>
                  <div style="display: flex; width: 150px; flex-wrap: wrap;">
                    <div v-for="(imageItem, indexImage) in item.images" :key="indexImage" style="margin: 0 10px;">
                      <img :src="imageItem" width="50px" @click="swapImage('images_' + item.id_product, imageItem)" alt="">
                    </div>
                  </div>
                </div>

              <div class="frame-info">
                <div class="info-line">
                  <span class="info-title">Location:</span>
                  <span class="info-content">{{ item?.location }}</span>
                </div>
                <div class="info-line">
                  <span class="info-title">Quantity:</span>
                  <span :class="'info-content' + '_' + item?.id">{{ item?.quantity }}</span>
                </div>
                <div class="info-line"><span class="info-title">inventory:</span> {{ item?.inventory }}</div>
                <div class="info-line"><span class="info-title">price:</span> {{ item?.price }}</div>
                <div class="info-line"><span class="info-title">supplier:</span> {{ item?.supplier }}</div>
                <div class="info-line"><span class="info-title">supplier Image:</span> <img :src="item?.supplier_image" width="50px" alt=""></div>
                <div class="info-line"><span class="info-title">category Image:</span> <img :src="item?.category_image" width="50px" alt=""></div>
                <div class="info-line"><span class="info-title">category:</span> {{ item?.category }}</div>
                <div class="info-line"><span class="info-title">account Name:</span> {{ item?.account_name }}</div>
                <div class="info-line"><span class="info-title">account Image:</span> <img :src="item.account_image" width="50px" alt=""></div>
                <div class="info-line">
                  <span class="info-title">Type:</span>
                  <span class="info-content">{{ item?.type }}</span>
                </div>
                <div v-if="item.id_plan == 0" style="flex-direction: column; width: 350px;">
                  <div>
                    <input type="number" placeholder="quantity" v-model="quantityProduct" style="padding: 0 10px;">
                    <button style="margin: 0 10px;" @click="updateQuantity(item?.location, item?.id, item?.id_product)" class="navigate-btn">Update</button>
                  </div>
                  <div style="margin: 15px 0;">
                    <input type="number" placeholder="Reduce quantity" v-model="quantityProductReduceQuantity" style="padding: 0 10px;">
                    <button @click="ReduceQuantity(item?.location, item?.id, item?.id_product)" style="width: 200px;" class="navigate-btn">Update reduce</button>
                  </div>
                </div>
                <button @click="closeFrame" class="close-btn">Close</button>
              </div>
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

  const swapImage = (data, imageNew) =>{
    document.querySelector('.' + data).src = imageNew
  }
  const checkQuantityLocationProduct = (data, location) => {
    var count = data.filter(p => p.location == location).length
    return count
  }
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
  const warehouseData = ref([])
  const currentFloor = ref({})
  const currentFloorData = ref([])
  const valueE = ref("")
  const currentAreaData = ref([])
  const currentAreaFindOne = ref({})
  const currentShelfData = ref([])
  const currentWarehouse = ref({})
  const isLoading = ref(false)
  const store = useCounterStore()
  const Toast = useToast()
  const page = ref(1)
  const totalPage = ref(0)
  const pageSize = ref(5)
  const frameData = ref([])
  const id_area = ref(0)
  const areaName = ref('')
  const quantityProduct = ref(0)
  const quantityProductReduceQuantity = ref(0)
  const updateDataQuantity = ref({
    id_product: 0,
    id_shefl: 0,
    location: 0,
    quantity: 0
  })

  const {proxy} = getCurrentInstance()
  const hostName = proxy?.hostname
  const popupPosition = ref({})
  const frameVisible = ref(false)

  const SearchArea = () =>{
    findAllShelfByArea(valueE.value, page.value)
  }
  const findAllShelfByArea = async (search, pageData) => {
    console.log(search)
    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'

    const res = await axios.get(hostName + `/api/Shelf/FindByArea?id=${currentAreaFindOne.value.id}&page=${pageData}&pageSize=${pageSize.value}`, getToken())
    if(res.data.success){
      page.value = res.data.content.page
      totalPage.value = res.data.content.totalPages
      currentShelfData.value = res.data.content.data
      console.log(res)
    }

    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
    
  }
  const closeFrame = () => {
    frameVisible.value = false
  }

  const updateQuantity = async (location, id, id_product) => {
    if(quantityProduct.value == 0){
      Toast.info("Chưa nhập số lượng !!!")
      return
    }
    updateDataQuantity.value.id_product = id_product
    updateDataQuantity.value.location = location
    updateDataQuantity.value.id_shefl = id_area.value
    updateDataQuantity.value.quantity = quantityProduct.value

    console.log(updateDataQuantity.value)
    const res = await axios.put(hostName + `/api/Product/UpdateArea?id=${id}`, updateDataQuantity.value, getToken())
    if(res.data.success){
      Toast.success("Update Success !!!")
     const element = document.querySelector('.info-content' + '_' + id)
     if(element){
      let totalData = parseInt(element.textContent) + quantityProduct.value

      element.textContent = totalData
     }
      findAllArea()
    }else{
      Toast.error(res.data.error)
    }
  }

  const ReduceQuantity = async(location, id, id_product) => {
    if(quantityProductReduceQuantity.value == 0){
      Toast.info("Chưa nhập số lượng !!!")
      return
    }
    updateDataQuantity.value.id_product = id_product
    updateDataQuantity.value.location = location
    updateDataQuantity.value.id_shefl = id_area.value
    updateDataQuantity.value.quantity = quantityProductReduceQuantity.value

    const res = await axios.put(hostName + `/api/Product/UpdateAreaQuantity?id=${id}`, updateDataQuantity.value, getToken())
    if(res.data.success){
      Toast.success("Update Success !!!")
      const element = document.querySelector('.info-content' + '_' + id)
      if(element){
        let total = parseInt(element.textContent) - quantityProductReduceQuantity.value
        element.textContent = total
      }
      findAllArea()
    }else{
      Toast.error(res.data.error)
    }
  }
  const openFrame = (id, location, list, listPlan) =>{
    frameData.value = []
    if(list.length <= 0 && listPlan <= 0)
      return
    if(list.length > 0){
      const checkListData = list.filter(x => x.location == location)
      if(checkListData.length > 0){
        id_area.value = id
        checkListData.forEach(element => {
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
    if(frameData.value.length > 0){
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
}
  watch(page.value, (newPage) => {
    findAllShelfByArea(valueE.value, newPage)
  })
  const changeReload = (event) => {
    pageSize.value = event
    findAllShelfByArea(valueE.value, page.value)
  }
  const SearchFloor = async () => {
    findAllArea()
  }
  const findAllArea = async () => {

    const res = await axios.get(hostName + `/api/Area/FindOneByFloor?id=${currentFloor.value.id}`, getToken())
    if(res.data.success){
      if(res.data.content.data.length > 0){
        currentAreaData.value = res.data.content.data
        currentAreaFindOne.value = res.data.content.data[0]
        areaName.value = currentAreaFindOne.value.name
        findAllShelfByArea(valueE.value, page.value)
      }else{
        currentAreaFindOne.value = null
        currentShelfData.value = []
      }
    }
    else{
        currentAreaFindOne.value = null
        currentShelfData.value = []
      }
    
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
        console.log(res)
        if(res.data.success){
          if(res.data.content.data.length > 0){
            currentFloorData.value = res.data.content.data
            currentFloor.value = res.data.content.data[0]
            Warename.value = currentWarehouse.value.name
            Floorname.value = res.data.content.data[0].name
            findAllArea()
            Toast.success("Success")
          }else{
            currentFloorData.value = null
            currentFloor.value = []
            Warename.value = ''
            Floorname.value = ''
            currentAreaData.value = []
          }
          
        }
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
    findAllArea()
    Toast.success("Success")
  }

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
