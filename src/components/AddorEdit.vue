<template>
    <div class="container">
      <!-- Title và nhập số lượng -->
      <div class="title-container">
        <h2 class="title">Form</h2>
        <div class="quantity-input">
          <label for="quantity">Quantity:</label>
          <input
            v-model="quantity"
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
          style="display: none;" 
        />
        <!-- Khung cho phép kéo thả và chọn tệp -->
        <div class="file-upload-zone" :class="{'drag-over': isDragOver}" @click="triggerFileInput">
          <p>將文件拖放到此處或點擊以選擇文件</p>
        </div>
        <!-- Hiển thị ảnh khi chọn -->
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Image preview" />
        </div>
      </div>
  
      <!-- Các mục chọn miền, tỉnh, huyện, xã, và ghi chú không thay đổi -->
      <div class="form-group">
        <label for="region">直轄市:</label>
        <select v-model="selectedRegion" @change="onRegionChange" class="form-select">
          <option value="" disabled selected>直轄市</option>
          <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
        </select>
      </div>
  
      <div v-if="provinces.length > 0" class="form-group">
        <label for="province">縣:</label>
        <select v-model="selectedProvince" @change="onProvinceChange" class="form-select">
          <option value="" disabled selected>縣:</option>
          <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}</option>
        </select>
      </div>
  
      <div v-if="districts.length > 0" class="form-group">
        <label for="district">縣轄市:</label>
        <select v-model="selectedDistrict" @change="onDistrictChange" class="form-select">
          <option value="" disabled selected>縣轄市</option>
          <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}</option>
        </select>
      </div>
  
      <div v-if="wards.length > 0" class="form-group">
        <label for="ward">鎮和區:</label>
        <select v-model="selectedWard" class="form-select">
          <option value="" disabled selected>鎮和區</option>
          <option v-for="ward in wards" :key="ward.id" :value="ward.id">{{ ward.name }}</option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="comments">Notes:</label>
        <textarea v-model="comments" class="form-textarea" placeholder="enter notes here..."></textarea>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    setup() {
      const selectedRegion = ref(null);
      const selectedProvince = ref(null);
      const selectedDistrict = ref(null);
      const selectedWard = ref(null);
      const quantity = ref(1); // Dùng để lưu số lượng nhập vào
      const comments = ref(""); // Dùng để lưu ghi chú
      const imagePreview = ref(null); // Dùng để lưu ảnh đã chọn
      const isDragOver = ref(false); // Để kiểm tra trạng thái kéo thả
  
      const regions = ref([
        {
          id: 1,
          name: "直轄市 1",
          provinces: generateProvinces(5, "1"),
        },
        {
          id: 2,
          name: "直轄市 2",
          provinces: generateProvinces(5, "2"),
        },
        {
          id: 3,
          name: "直轄市 3",
          provinces: generateProvinces(5, "3"),
        },
      ]);
  
      const provinces = ref([]);
      const districts = ref([]);
      const wards = ref([]);
  
      const onRegionChange = () => {
        const region = regions.value.find((r) => r.id === selectedRegion.value);
        provinces.value = region ? region.provinces : [];
        selectedProvince.value = null;
        selectedDistrict.value = null;
        selectedWard.value = null;
        districts.value = [];
        wards.value = [];
      };
  
      const onProvinceChange = () => {
        const province = provinces.value.find((p) => p.id === selectedProvince.value);
        districts.value = province ? province.districts : [];
        selectedDistrict.value = null;
        selectedWard.value = null;
        wards.value = [];
      };
  
      const onDistrictChange = () => {
        const district = districts.value.find((d) => d.id === selectedDistrict.value);
        wards.value = district ? district.wards : [];
        selectedWard.value = null;
      };
  
      const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            imagePreview.value = reader.result;
          };
          reader.readAsDataURL(file);
        }
      };
  
      const triggerFileInput = () => {
        const fileInput = document.getElementById("file-upload");
        fileInput.click(); // Kích hoạt chọn tệp khi nhấp vào khung
      };
  
      // Helper function to generate provinces
      function generateProvinces(count, regionName) {
        return Array.from({ length: count }, (_, i) => ({
          id: `${regionName}-province-${i + 1}`,
          name: `縣 ${regionName}-${i + 1}`,
          districts: generateDistricts(5, `${regionName}-${i + 1}`),
        }));
      }
  
      // Helper function to generate districts with 5 wards
      function generateDistricts(count, provinceName) {
        return Array.from({ length: count }, (_, i) => ({
          id: `${provinceName}-district-${i + 1}`,
          name: `縣轄市 ${provinceName}-${i + 1}`,
          wards: generateWards(5, `${provinceName}-${i + 1}`),
        }));
      }
  
      // Helper function to generate wards for each district
      function generateWards(count, districtName) {
        return Array.from({ length: count }, (_, i) => ({
          id: `${districtName}-ward-${i + 1}`,
          name: `縣轄市 ${districtName}-${i + 1}`,
        }));
      }
  
      return {
        regions,
        provinces,
        districts,
        wards,
        selectedRegion,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        quantity,
        comments,
        onRegionChange,
        onProvinceChange,
        onDistrictChange,
        imagePreview,
        isDragOver,
        onFileChange,
        triggerFileInput,
      };
    },
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
    font-family: 'Arial', sans-serif;
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
  
  .form-select, .form-input, .form-textarea {
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
  
  .form-select:focus, .form-input:focus, .form-textarea:focus {
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
  