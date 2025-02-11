<template>
  <div class="container">
    <!-- Title và nhập số lượng -->
    <div class="title-container">
      <h2 class="title">Area From</h2>
      <div class="quantity-input">
        <label for="quantity">Total Location:</label>
        <input
          type="number"
          min="1"
          class="form-input"
          placeholder="Enter quantity"
          v-model="AddDataArea.quantity"
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
      <label for="quantity">Name:</label>
      <input
        type="text"
        class="form-input"
        placeholder="Name Warehourse..."
        v-model="AddDataArea.name"
      />
    </div>
    <div class="form-group">
      <label for="quantity">Max quantity Location:</label>
      <input
        type="number"
        class="form-input"
        placeholder="Max quantity Location..."
        v-model="AddDataArea.max"
      />
    </div>
    <div class="form-group">
      <label for="quantity">Exception position:</label>
      <button
        @click="AddException"
        style="
          border: none;
          outline: none;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 15px;
        "
      >
        <i class="fa fa-plus" aria-hidden="true"></i>
      </button>
      <div v-if="AddDataArea.locationExceptionsDTOs">
        <div
          v-for="(item, index) in AddDataArea.locationExceptionsDTOs"
          :key="index"
          style="margin: 15px 0"
        >
          <h3>Location Exception {{ index + 1 }}</h3>
          <input
            v-model="item.location"
            type="number"
            class="form-input"
            placeholder="Location..."
            min="1"
          />
          <input
            style="margin: 15px 0"
            v-model="item.quantity"
            type="number"
            class="form-input"
            placeholder="Max Quantity..."
            min="1"
          />
        </div>
      </div>
    </div>
    
    <div class="form-group">
      <label for="region">Floor:</label>
      <select class="form-select" v-model="currentFloor">
        <option value="" disabled>Floor</option>
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
      <label for="comments">Notes:</label>
      <textarea
        class="form-textarea"
        placeholder="enter notes here..."
      ></textarea>
    </div>

    <div class="form-group">
      <button v-if="route.query.id" class="btn" @click="UpdateData">Update Data</button>
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
import { ref, onMounted, getCurrentInstance } from "vue";
import { useCounterStore } from "../store";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const imagePreview = ref(null);
const isLoading = ref(false);
const floorData = ref([]);
const currentFloor = ref(null);
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute()
const Toast = useToast();

const hostName = proxy?.hostname;
const AddDataArea = ref({
  name: "",
  quantity: 0,
  image: null,
  area: 0,
  max: 0,
  locationExceptionsDTOs: [],
});
const store = useCounterStore();

onMounted(() => {
  findAllFloor();
  if(route.query.id){
    findOneIdArea(route.query.id)
  }
});

const UpdateData = async () => {
  if (
    currentFloor.value === null ||
    AddDataArea.value.quantity == 0 ||
    AddDataArea.value.quantity == "" ||
    AddDataArea.value.max == 0 ||
    AddDataArea.value.max == "" ||
    AddDataArea.value.name == ""
  ) {
    Toast.info("Data Null !!!");
    return;
  }

  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
  AddDataArea.value.area = currentFloor.value;

  const res = await axios.put(hostName + `/api/Shelf/Update?id=${route.query.id}`, AddDataArea.value, getToken())
  if(res.data.success){
    Toast.success("Update Sucess")
    router.push("/tablepage")
  }else{
    Toast.error(res.data.error)
  }
  console.log(res)
  isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";

}
const findOneIdArea = async (id) => {
  const res = await axios.get(hostName + `/api/Shelf/FindOneId?id=${id}`, getToken())
  console.log(res)
  if(res.data.success){
    AddDataArea.value = res.data.content
    AddDataArea.value.image = null
    imagePreview.value = res.data.content.imageShelf
    AddDataArea.value.locationExceptionsDTOs = res.data.content.quantityExceptions
    currentFloor.value = res.data.content.id_floor
  }
}
const AddData = async () => {
  if (
    currentFloor.value === null ||
    AddDataArea.value.quantity == 0 ||
    AddDataArea.value.quantity == "" ||
    AddDataArea.value.max == 0 ||
    AddDataArea.value.max == "" ||
    AddDataArea.value.name == ""
  ) {
    Toast.info("Data Null !!!");
    return;
  }

  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
  AddDataArea.value.floor = currentFloor.value;
  const res = await axios.post(
    hostName + "/api/Shelf/Add",
    AddDataArea.value,
    getToken()
  );
  if (res.data.success) {
    router.push("tablepage");
    Toast.success("Add Sucess !!!");
  }

  isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
  console.log(res);
};
const AddException = () => {
  AddDataArea.value.locationExceptionsDTOs.push({ location: 1, quantity: 1 });
};
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

const findAllFloor = async () => {
  const res = await axios.get(
    hostName + `/api/Area/FindAll?page=1&pageSize=2000`,
    getToken()
  );
  if (res.data.success) {
    floorData.value = res.data.content.data;
    currentFloor.value = res.data.content.data[0].id;
  }
};
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      AddDataArea.value.image = reader.result.split(",")[1];
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
