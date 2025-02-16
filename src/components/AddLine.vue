<template>
    <div class="container">
      <!-- Title và nhập số lượng -->
      <div class="title-container">
        <h2 class="title">Form</h2>
        <div class="quantity-input">
          <label for="quantity">Quantity:</label>
          <input
            v-model="addDataWarehourse.quantityshelf"
            type="number"
            min="1"
            class="form-input"
            placeholder="Enter quantity"
          />
        </div>
      </div>
  
      <div class="form-group">
      <label for="region">Area:</label>
      <select class="form-select" v-model="currentArea">
        <option value="" disabled>Area</option>
        <option
          v-for="(item, index) in areaData"
          :key="index"
          :value="item.id"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
      <div class="form-group">
        <label for="quantity">Name:</label>
        <input
          v-model="addDataWarehourse.name"
          type="text"
          class="form-input"
          placeholder="Name Line..."
        />
      </div>
  
      <div class="form-group">
        <button v-if="route.query.id" class="btn" @click="UpdateData">
          Update Data
        </button>
        <button v-else class="btn" @click="AddData">Add Data</button>
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
  import { ref, getCurrentInstance, onMounted } from "vue";
  import { useToast } from "vue-toastification";
  import { useCounterStore } from "../store";
  import { useRouter, useRoute } from "vue-router";
  const { proxy } = getCurrentInstance();
  const hostName = proxy?.hostname;
  const Toast = useToast();
  const store = useCounterStore();
  const isLoading = ref(false);
  const router = useRouter();
  const route = useRoute();
  const addDataWarehourse = ref({
    name: "",
    quantityshelf: 0,
    area: 0
  });

  const areaData = ref([])
  const currentArea = ref(null)

  onMounted(() => {
    console.log("Hello World !!!")
    findAllFloor()
  });
  
  const AddData = async () => {
    if(!addDataWarehourse.value.name.trim() || addDataWarehourse.value.quantityshelf <= 0 || currentArea.value == null){
        Toast.info("Data Null")
        return
    }

    isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
    addDataWarehourse.value.area = currentArea.value
    const res = await axios.post(hostName + `/api/Line/Add`, addDataWarehourse.value, getToken())
    if(res.data.success){
        Toast.success("Success")
        router.push("tablepage")
    }

    isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
  }
  const findAllFloor = async () => {
    isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";

  const res = await axios.get(
    hostName + `/api/Area/FindAll?page=1&pageSize=2000`,
    getToken()
  );
  if (res.data.success) {
    areaData.value = res.data.content.data;
    currentArea.value = res.data.content.data[0].id;
  }

  Toast.success("Success")

  isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
};
  const getToken = () => {
    var token = store.getToken;
    var result = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return result;
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 750px;
    margin: 30px auto;
    padding: 30px;
    background-color: #f4f7fa;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    font-family: "Arial", sans-serif;
  }
  
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .title {
    font-size: 1.8rem;
    font-weight: 600;
    color: #333;
  }
  
  .quantity-input {
    display: flex;
    align-items: center;
  }
  
  .quantity-input label {
    font-size: 1rem;
    margin-right: 10px;
    color: #333;
  }
  
  .form-input {
    padding: 10px;
    font-size: 1rem;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    transition: all 0.3s ease;
  }
  
  .form-input:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: #444;
  }
  
  .form-select,
  .form-input,
  .form-textarea {
    width: 100%;
    height: 90%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    box-sizing: border-box;
    background-color: #fff;
    transition: all 0.3s ease;
  }
  
  .form-select:focus,
  .form-input:focus,
  .form-textarea:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .form-textarea {
    height: 150px;
    resize: vertical;
  }
  
  .form-select option {
    padding: 10px;
  }
  
  .file-upload-container {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }
  
  .file-upload-zone {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    color: #777;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .file-upload-zone.drag-over {
    background-color: #e3f7ff;
    border-color: #007bff;
  }
  
  .image-preview {
    margin-top: 20px;
    text-align: center;
  }
  
  .image-preview img {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
  }
  </style>
  