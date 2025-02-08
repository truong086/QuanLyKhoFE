<template>
  <div class="app-wrapper">
    <div class="Warehouse-Management">
      <!-- Frame for displaying shipments with scroll -->
      <div class="shipment-frame">
        <div
          class="shipment-wrapper"
          v-for="(shipment, index) in shipments"
          :key="shipment.id"
          style="width: 1000px;"
        >
          <div class="shipment-info">
            <p><strong>Title:</strong> {{ shipment.plan_tile }}</p>
            <p style="font-weight: bold;"><strong>Location Old:</strong> </p>
            <p>{{ shipment.warehourseOld }} -> {{ shipment.floorOld }} -> {{ shipment.areaOld }} -> {{ shipment.locationOld }}</p>
            <p>Code Location Old: {{ shipment.codeLocationOld }}</p>
            <p style="font-weight: bold;"><strong>Location New:</strong></p>
            <p>{{ shipment.warehourseNew }} -> {{ shipment.floorNew }} -> {{ shipment.areaNew }} -> {{ shipment.locationNew }}</p>
            <p>Code Location New: {{ shipment.codeLocationNew }}</p>
            <h3>Status: <a style="font-size: 15px; color: red;"><strong>{{ shipment.statusPlan }}</strong></a></h3> 
            <div class="actions">
              <!-- <button class="main-btn" @click="toggleStatusMenu(index)">
                +
              </button> -->
              <select v-model="shipment.statusPlan" @change="updateDataStatusPlan(shipment.statusPlan, shipment.id_status)" style="width: 250px;">
                <option v-for="(itemStatus, indexStatus) in statusDataItem" :key="indexStatus" :value="itemStatus.toLowerCase()">{{ itemStatus }}</option>
              </select>

              <!-- Status Menu Section Update -->
              <div v-if="statusMenuVisible[index]" class="status-menu">
                <input
                  type="text"
                  v-model="valueInput"
                  placeholder="Enter Status"
                  class="status-input"
                />
                <label class="cursor-pointer border-2 border-dashed border-gray-400 p-6 rounded-lg bg-gray-100 hover:bg-gray-200">
                  <span class="text-gray-700 font-medium">Chọn ảnh</span>
                  <input type="file" multiple accept="image/*" class="hidden" @change="handleFileUpload" />
                </label>
                <div v-if="images.length" class="grid grid-cols-3 gap-4 mt-4">
                  <div v-for="(image, index) in images" :key="index" class="relative group">
                    <img :src="image" style="width: 50px; height: 50px; border-radius: 50%;" class="w-32 h-32 object-cover rounded-lg shadow-md" />
                    <button @click="removeImage(index)" 
                      class="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                      ✕
                    </button>
                  </div>
                </div>
                <button class="sub-btn" @click="addStatus(shipment.id, shipment.id_status)">
                  Add Status
                </button>
                <button class="sub-btn" @click="showList(shipment.id)">
                  List Icon
                </button>
                <div v-if="iconListVisible[shipment.id]" >
                  <div v-if="iconCurrent != null && iconCurrent != ''">
                    <button style="background-color: red;" class="icon-btn"><i :class="iconCurrent"></i></button>
                  </div>
                  <div style="display: flex;">
                    <div class="icon-list" v-for="(itemIcon, indexIcon) in iconButton" :key="indexIcon" >
                      <button @click="iconClick(itemIcon)" class="icon-btn" ><i :class="itemIcon"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="shipment-status" style="width: 300px; height: 350px; overflow-y: auto; border: 1px solid #ccc; padding: 10px;">
            <p><strong>Status Description:</strong></p>
            <div class="status-list" v-for="(item, indexData) in shipment.statusItemPlans" :key="indexData">
              <div class="status-item" style="display: flex; width: 100%; flex-wrap: wrap;">
                <div>
                  <i :class="item.icon" style="animation: icons 0.5s ease-in-out infinite;"></i>
                </div>
                <div style="margin: 0 15px;">
                  <p>{{ item.title }}</p>
                </div>
                <div v-for="(imageItem, indexImage) in item.image" :key="indexImage" style="display: flex;">
                  <img @click="showImage(imageItem)" :src="imageItem" style="width: 20px; height: 20px; border-radius: 50%;" alt="">
                </div>
              </div>
            </div>
            <p><strong>Total Price:</strong> {{ shipment.price }}</p>
          </div> -->

          <div class="shipper-info">
            <div class="delivery-man-image">
              <img
                :src="shipment.account_image || 'default-image-path.jpg'"
                alt="Delivery Man"
                class="delivery-man-img"
                style="width: 50px; height: 50px; border-radius: 50%;"
              />
              <p><strong>Account Name:</strong> {{ shipment.account_name }}</p>
            </div>
          </div>
        </div>
      </div>
      <PagesTotal
        :page="page"
        :totalPage="totalPage"
        :valueE="valueE"
        @pageChange="findAllData"
        @pageSizeChange="changeReload"
      ></PagesTotal>
      <div class="total-price-container">
        <h3>Total Price</h3>
        <p><strong>Total:</strong> {{ totalPrice }}</p>
      </div>
    </div>
    <!-- Popup hiển thị ảnh lớn -->
<div v-if="selectedImage" class="image-modal" @click.self="closeImage">
      <img :src="selectedImage" class="image-full" alt="Full Image" />
    </div>
  </div>

  <!-- Hiển thị màn hình loading -->
  <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Đang tải...</p>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, getCurrentInstance, watch, onMounted } from "vue";
import PagesTotal from "./PageList/PagesTotal.vue";
import { useCounterStore } from "../store";
import {useToast} from 'vue-toastification'

const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;
const page = ref(1);
const totalPage = ref(0);
const pageSize = ref(2);
const valueE = ref("");
const shipments = ref([]);
const statusMenuVisible = ref({});
const iconListVisible = ref({});
const selectedImage = ref(null)
const Toast = useToast()
const isLoading = ref(false)
const images = ref([])
const iconCurrent = ref(null)
const valueInput = ref('')
const imageList = ref([])
const updateStats = ref({
  id_statuswarehourse: 0,
  title: ""
})
 const iconButton = ref([
  'fas fa-box',
  'fas fa-cogs',
  'fas fa-truck',
  'fas fa-warehouse',
  'fas fa-shipping-fast'
 ])
const newStatus = ref({}); // Object lưu trạng thái mới cho mỗi lô hàng
const statusDataItem = ref(['Đã nhận', 'Đang vận chuyển', 'DONE'])
// const selectStatus = ref(null)
const store = useCounterStore()
onMounted(() => {
  findAllData(valueE.value, page.value);
});
watch(page.value, (newPage) => {
  findAllData(valueE.value, newPage);
});

const iconClick = (name) => {
  iconCurrent.value = name
}

const handleFileUpload = (event) => {
  const files = event.target.files;
  imageList.value = Array.from(files)
  for (let file of files) {
    const reader = new FileReader();
    reader.onload = (e) => images.value.push(e.target.result);
    reader.readAsDataURL(file);
  }
};

const removeImage = (index) => {
  images.value.splice(index, 1);
};

const updateDataStatusPlan = async (title, id) => {
  isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
  updateStats.value.title = title
  updateStats.value.id_statuswarehourse = id
  const res = await axios.put(hostName + '/api/Status/UpdateStatus', updateStats.value, getToken())
  if(res.data.success){
    findAllData(valueE.value, page.value);
    Toast.success("Success !!!")
  }else{
    Toast.success(res.data.error)
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
const findAllData = async (search, pageData) => {
  isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
    
    const res = search === "" ? await axios.get(
      hostName + `/api/Status/FindAll?page=${pageData}&pageSize=${pageSize.value}`
    , getToken()) 
    : await axios.get(
      hostName +
        `/api/Status/FindAll?name=${search}&page=${pageData}&pageSize=${pageSize.value}`
    , getToken())

    if (res.data.success) {
      console.log(res)
      shipments.value = res.data.content.data;
      page.value = res.data.content.page;
      totalPage.value = res.data.content.totalPages;
    }

  isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
};

const changeReload = (event) => {
  pageSize.value = event;
  findAllData(valueE.value, page.value);
};
// const toggleStatusMenu = (index) => {
//   // Chuyển đổi trạng thái hiển thị menu trạng thái khi nhấn "+"
//   statusMenuVisible.value[index] = !statusMenuVisible.value[index];
// };
const addStatus = async (shipmentId, id) => {
  
  if(imageList.value.length <= 0){
    Toast.info("Chưa chọn ảnh !!!")
    return
  }
  
  if(iconCurrent.value == null || iconCurrent.value == ''){
    Toast.info("Chưa chọn Icon !!!")
    return
  }

  if(valueInput.value == '' || valueInput.value == null){
    Toast.info("Chưa nhập nội dung !!!")
    return
  }

  isLoading.value = true
  document.body.classList.add('loading') // Add Lớp "loading"
  document.body.style.overflow = 'hidden'
  const form = new FormData()
  imageList.value.forEach((file) => {
    form.append("image", file)
  })
  form.append("id_status", id)
  form.append("title", valueInput.value)
  form.append("icon", iconCurrent.value)
  

  const res = await axios.put(hostName + '/api/Status/UpdateStatusItem', form, getToken())
  if(res.data.success){
    Toast.success("Sucess !!!")
    findAllData(valueE.value, page.value);
  }else{
    Toast.error(res.data.error)
  }

  isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
  // Thêm trạng thái cho lô hàng, sau khi nhấn "Add Status"
  alert(
    `Adding status to shipment ID: ${shipmentId} - Status: ${newStatus.value[shipmentId]}`
  );
  newStatus.value[shipmentId] = ""; // Reset ô nhập sau khi thêm trạng thái
};
const showList = (shipmentId) => {
  // Chuyển đổi trạng thái hiển thị danh sách icon khi nhấn "List Icon"
  iconListVisible.value[shipmentId] = !iconListVisible.value[shipmentId];
};
// const showImage = (image) => {
//       selectedImage.value = image; // Hiển thị ảnh khi click
//     }

    const closeImage = () => {
      selectedImage.value = null; // Đóng popup khi click ngoài
    }

// Tính toán
const totalPrice = computed(() => {
  return shipments.value.reduce((sum, shipment) => sum + shipment.price, 0);
});
</script>

<style>
  @keyframes icons {
    0%{
      color: red;
      transform: scale(1.2);
    }
    100%{
      color: yellow;
      transform: scale(1);
    }
  }
</style>
<style scoped>
.image-full {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
}
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
/* Tối ưu hóa giao diện cho sự đồng nhất và đẹp mắt */

.app-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0f8ff, #e6e6fa);
  font-family: "Arial", sans-serif;
  color: #333;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.warehouse-management {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 100%;
  width: 100%;
  background: linear-gradient(to bottom, #f0f8ff, #ffffff);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.shipment-frame {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1100px;
}

.shipment-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.shipment-wrapper:hover {
  transform: scale(1.03); /* Hiệu ứng phóng to khi di chuột qua */
}

.shipment-info,
.shipment-status,
.shipper-info {
  flex: 1;
  min-width: 200px;
  padding: 15px;
  border-radius: 8px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.actions {
  margin-top: 10px;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  position: relative;
}

.main-btn {
  background: radial-gradient(circle, #4caf50, #45a049);
  border: none;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  animation: pulse 1.5s infinite;
  box-shadow: 0 0 8px rgba(72, 239, 128, 0.7);
}

.main-btn:hover {
  box-shadow: 0 0 12px rgba(72, 239, 128, 0.9);
}

.action-btn {
  background: #4caf50;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #45a049;
}

.status-menu {
  position: absolute;
  bottom: 50px;
  left: 0;
  background: #f4f4f4;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  padding: 10px;
  z-index: 10;
}

.status-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.sub-btn {
  display: block;
  margin: 8px 0;
  padding: 8px 12px;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  color: #555;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sub-btn:hover {
  background-color: #d5d5d5;
}

.icon-list {
  display: flex;
  gap: 10px;
}

.icon-btn {
  background: #e0e0e0;
  border: none;
  padding: 12px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.icon-btn:hover {
  background-color: #d5d5d5;
  transform: scale(1.1);
}

.delivery-man-image {
  text-align: center;
  margin-bottom: 10px;
}

.delivery-man-img {
  max-width: 100%;
  height: auto;
  border-radius: 50%;
}

.total-price-container {
  margin-top: 20px;
  text-align: left;
  padding-left: 200px;
  background: #e6e6fa;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.total-price-container h3 {
  color: #333;
}
</style>
