<template>
    <div class="container">
      <!-- Title và nhập số lượng -->
      <div class="title-container">
        <h2 class="title">Form</h2>
        <div class="quantity-input">
          <label for="quantity">Quantity:</label>
          <input
            v-model="addDataWarehourse.storage"
            type="number"
            min="1"
            class="form-input"
            placeholder="Enter quantity"
          />
        </div>
      </div>
  
      <!-- Chọn file -->
      <div class="file-upload-container">
        <input
          type="file"
          id="file-upload"
          class="file-upload-input"
          accept="image/*"
          @change="onFileChange"
          ref="fileInput"
          style="display: none"
        />
        <!-- Khung cho phép kéo thả và chọn tệp -->
        <div
          class="file-upload-zone"
          :class="{ 'drag-over': isDragOver }"
          @click="triggerFileInput"
        >
          <p>Kéo thả tệp tại đây</p>
        </div>
        <!-- Hiển thị ảnh khi chọn -->
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Image preview" />
        </div>
      </div>
  
      <div class="form-group">
      <label for="region">Floor:</label>
      <select class="form-select" v-model="currentFloor">
        <option value="" disabled>Foor</option>
        <option
          v-for="(item, index) in floorData"
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
          placeholder="Name Warehourse..."
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
  const imagePreview = ref(null);
  const isDragOver = ref(false);
  const { proxy } = getCurrentInstance();
  const hostName = proxy?.hostname;
  const Toast = useToast();
  const store = useCounterStore();
  const isLoading = ref(false);
  const router = useRouter();
  const route = useRoute();
  const currentFloor = ref(null)
  const floorData = ref([])
  const addDataWarehourse = ref({
    name: "",
    storage: 0,
    imagearea: null,
    floor_map: 0
  });
  
  onMounted(() => {
    console.log("Hello World")
    FindAllFloor()
  });

  const AddData = async () => {
    if(!addDataWarehourse.value.name.trim() || addDataWarehourse.value.storage <= 0 || currentFloor.value == null){
        Toast.info("Data Null")
        return
    }

    isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
  
    const form = new FormData()
    form.append("name", addDataWarehourse.value.name)
    form.append("storage", addDataWarehourse.value.storage)
    form.append("floor_map", currentFloor.value)

    if(addDataWarehourse.value.imagearea != null){
        form.append("imagearea", addDataWarehourse.value.imagearea)
    }
    const res = await axios.post(hostName + '/api/Area/Add', form, getToken())
    if(res.data.success){
        Toast.success("Success")
    }

    isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
  }
  const FindAllFloor = async () => {
    const res = await axios.get(hostName + `/api/Floor/FindAll?page=1&pageSize=2000`, getToken())
    if(res.data.success){
        floorData.value = res.data.content.data
        currentFloor.value = res.data.content.data[0].id
        Toast.success("Success")
    }
    router.push("")
  }
  const getToken = () => {
    var token = store.getToken;
    var result = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return result;
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("file-upload");
    fileInput.click(); // Kích hoạt chọn tệp khi nhấp vào khung
  };

  const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    addDataWarehourse.value.imagearea = file;
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
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
  