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
          <p>Kéo thả tệp tại đây</p>
        </div>
        <!-- Hiển thị ảnh khi chọn -->
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Image preview" />
        </div>
      </div>
  
      <!-- Các mục chọn miền, tỉnh, huyện, xã, và ghi chú không thay đổi -->
      <div class="form-group">
        <label for="region">Miền:</label>
        <select v-model="selectedRegion" @change="onRegionChange" class="form-select">
          <option value="" disabled selected>Miền</option>
          <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
        </select>
      </div>
  
      <div v-if="provinces.length > 0" class="form-group">
        <label for="province">Tỉnh:</label>
        <select v-model="selectedProvince" @change="onProvinceChange" class="form-select">
          <option value="" disabled selected>Tình:</option>
          <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}</option>
        </select>
      </div>
  
      <div v-if="districts.length > 0" class="form-group">
        <label for="district">Huyện:</label>
        <select v-model="selectedDistrict" @change="onDistrictChange" class="form-select">
          <option value="" disabled selected>Huyện</option>
          <option v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}</option>
        </select>
      </div>
  
      <div v-if="wards.length > 0" class="form-group">
        <label for="ward">Xã:</label>
        <select v-model="selectedWard" class="form-select">
          <option value="" disabled selected>Xã</option>
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
    const quantity = ref(1);
    const comments = ref("");
    const imagePreview = ref(null);
    const isDragOver = ref(false);

    const regions = ref([
      {
        id: "1",
        name: "Miền Bắc",
        provinces: [
          {
            id: "1-1",
            name: "Hà Nội",
            districts: [
              {
                id: "1-1-1",
                name: "Quận Hoàn Kiếm",
                wards: [
                  { id: "1-1-1-1", name: "Phường Hàng Bạc" },
                  { id: "1-1-1-2", name: "Phường Cửa Đông" },
                ],
              },
              {
                id: "1-1-2",
                name: "Quận Hai Bà Trưng",
                wards: [
                  { id: "1-1-2-1", name: "Phường Bạch Mai" },
                  { id: "1-1-2-2", name: "Phường Minh Khai" },
                ],
              },
            ],
          },
          {
            id: "1-2",
            name: "Vĩnh Phúc",
            districts: [
              {
                id: "1-2-1",
                name: "Vĩnh Yên",
                wards: [
                  { id: "1-2-1-1", name: "Phường Đống Đa" },
                  { id: "1-2-1-2", name: "Phường Liên Bảo" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Miền Nam",
        provinces: [
          {
            id: "2-1",
            name: "TP.HCM",
            districts: [
              {
                id: "2-1-1",
                name: "Quận 1",
                wards: [
                  { id: "2-1-1-1", name: "Phường Bến Nghé" },
                  { id: "2-1-1-2", name: "Phường Nguyễn Thái Bình" },
                ],
              },
              {
                id: "2-1-2",
                name: "Quận 3",
                wards: [
                  { id: "2-1-2-1", name: "Phường Võ Thị Sáu" },
                  { id: "2-1-2-2", name: "Phường Tân Định" },
                ],
              },
            ],
          },
          {
            id: "2-2",
            name: "Bình Dương",
            districts: [
              {
                id: "2-2-1",
                name: "Thủ Dầu Một",
                wards: [
                  { id: "2-2-1-1", name: "Phường Phú Hòa" },
                  { id: "2-2-1-2", name: "Phường Hiệp Thành" },
                ],
              },
            ],
          },
        ],
      },
    ]);

    const provinces = ref([]);
    const districts = ref([]);
    const wards = ref([]);

    // Lấy danh sách tỉnh khi chọn miền
    const onRegionChange = () => {
      const region = regions.value.find((r) => r.id === selectedRegion.value);
      provinces.value = region ? region.provinces : [];
      selectedProvince.value = null;
      selectedDistrict.value = null;
      selectedWard.value = null;
      districts.value = [];
      wards.value = [];
    };

    // Lấy danh sách huyện khi chọn tỉnh
    const onProvinceChange = () => {
      const province = provinces.value.find((p) => p.id === selectedProvince.value);
      districts.value = province ? province.districts : [];
      selectedDistrict.value = null;
      selectedWard.value = null;
      wards.value = [];
    };

    // Lấy danh sách xã khi chọn huyện
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
  