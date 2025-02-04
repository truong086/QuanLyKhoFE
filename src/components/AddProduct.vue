<template>
    <div class="container">
      <!-- Form Kho cũ -->
      <div class="form-section">
        <h2 class="title">Add Product</h2>
  
        <!-- Kho Select -->
        <div class="form-group">
          <label for="region">Kho:</label>
          <select v-model="selectedRegionOld" @change="onRegionChange('old')" class="form-select">
            <option value="" disabled>Chọn kho</option>
            <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
          </select>
        </div>
  
        <!-- Tầng Select -->
        <div v-if="provincesOld.length > 0" class="form-group">
          <label for="province">Tầng:</label>
          <select v-model="selectedProvinceOld" @change="onProvinceChange('old')" class="form-select">
            <option value="" disabled>Chọn tầng</option>
            <option v-for="province in provincesOld" :key="province.id" :value="province.id">{{ province.name }}</option>
          </select>
        </div>
  
        <!-- Khu Select -->
        <div v-if="districtsOld.length > 0" class="form-group">
          <label for="district">Khu:</label>
          <select v-model="selectedDistrictOld" @change="onDistrictChange('old')" class="form-select">
            <option value="" disabled>Chọn khu</option>
            <option v-for="district in districtsOld" :key="district.id" :value="district.id">{{ district.name }}</option>
          </select>
        </div>
  
        <!-- Vị trí Select -->
        <div v-if="wardsOld.length > 0" class="form-group">
          <label for="ward">Vị trí:</label>
          <div class="dropdown-container">
            <button @click="toggleWardDropdown('old')" class="form-select">
              {{ selectedWardOldName || "Chọn vị trí" }}
            </button>
  
            <div v-if="showWardFrameOld" class="ward-dropdown">
              <div class="ward-grid">
                <button
                  v-for="ward in wardsOld"
                  :key="ward.id"
                  class="ward-button"
                  :class="{ selected: ward.id === selectedWardOld }"
                  @click="selectWard(ward.id, 'old')"
                  @mouseenter="showWardInfo(ward, 'old', $event)"
                  @mouseleave="hideWardInfo"
                >
                  {{ ward.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Quantity and Comments -->
        <div class="form-group">
          <label for="quantity">Số lượng:</label>
          <input v-model="quantityOld" type="number" min="1" class="form-input" placeholder="Nhập số lượng" />
        </div>
  
        <!-- Tax Input -->
        <div class="form-group">
          <label for="tax">Thuế:</label>
          <input v-model="tax" type="number" min="0" class="form-input" placeholder="Nhập thuế" />
        </div>
  
        <!-- Product Name Input -->
        <div class="form-group">
          <label for="productName">Tên sản phẩm:</label>
          <input v-model="productName" type="text" class="form-input" placeholder="Nhập tên sản phẩm" />
        </div>
  
        <!-- Subject (Môn) Input -->
        <div class="form-group">
          <label for="subject">Môn:</label>
          <input v-model="subject" type="text" class="form-input" placeholder="Nhập môn" />
        </div>
  
        <!-- Category Select -->
        <div class="form-group">
          <label for="category">Danh mục:</label>
          <select v-model="selectedCategory" class="form-select">
            <option value="" disabled>Chọn danh mục</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
  
        <!-- Supplier Select -->
        <div class="form-group">
          <label for="supplier">Nhà cung cấp:</label>
          <select v-model="selectedSupplier" class="form-select">
            <option value="" disabled>Chọn nhà cung cấp</option>
            <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
          </select>
        </div>
  
        <!-- Image Input Section with Drag and Drop -->
        <div class="form-group">
          <div
            class="image-upload-frame drop-frame"
            @drop.prevent="handleFileDrop"
            @dragover.prevent
            @dragenter.prevent
            @click="triggerFileInput"
          >
            <p>Kéo và thả tệp vào đây, hoặc click để chọn tệp.</p>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              multiple
              @change="handleImageUpload"
              style="display: none;"
            />
          </div>
          <div v-if="images.length > 0">
            <h4>Danh sách ảnh:</h4>
            <ul class="image-list">
              <li v-for="(image, index) in images" :key="index" class="image-item">
                <img :src="image" alt="Uploaded image" class="image-preview" />
                <button @click="removeImage(index)" class="remove-image-btn">X</button>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Comments -->
        <div class="form-group">
          <label for="comments">Ghi chú:</label>
          <textarea v-model="commentsOld" class="form-textarea" placeholder="Nhập ghi chú..."></textarea>
        </div>
      </div>
  
      <!-- Ward Information Box -->
      <div v-if="showWardInfoBox" class="ward-info-frame" :style="wardInfoFrameStyle">
        <h3>{{ wardInfo.name }}</h3>
        <img :src="wardInfo.image" class="ward-info-image" />
        <button @click="closeWardInfo" class="cancel-button">Đóng</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  
  // Generate mock data for provinces, districts, and wards
  const generateProvinces = (count, regionId) =>
    Array.from({ length: count }, (_, i) => ({
      id: `${regionId}-${i + 1}`,
      name: `Tầng ${regionId}-${i + 1}`,
      districts: Array.from({ length: 10 }, (_, j) => ({
        id: `${regionId}-${i + 1}-${j + 1}`,
        name: `Khu ${regionId}-${i + 1}-${j + 1}`,
        wards: Array.from({ length: 20 }, (_, k) => ({
          id: `${regionId}-${i + 1}-${j + 1}-${k + 1}`,
          name: `Vị trí ${regionId}-${i + 1}-${j + 1}-${k + 1}`,
        })),
      })),
    }));
  
  export default {
    setup() {
      const regions = ref([
        { id: "1", name: "Kho 1", provinces: generateProvinces(5, "1") },
        { id: "2", name: "Kho 2", provinces: generateProvinces(5, "2") },
        { id: "3", name: "Kho 3", provinces: generateProvinces(5, "3") },
      ]);
  
      const categories = ref([
        { id: "1", name: "Điện tử" },
        { id: "2", name: "Gia dụng" },
        { id: "3", name: "Sách" },
      ]);
  
      const suppliers = ref([
        { id: "1", name: "Nhà cung cấp 1" },
        { id: "2", name: "Nhà cung cấp 2" },
        { id: "3", name: "Nhà cung cấp 3" },
      ]);
  
      const selectedRegionOld = ref(null);
      const selectedProvinceOld = ref(null);
      const selectedDistrictOld = ref(null);
      const selectedWardOld = ref(null);
      const selectedCategory = ref(null);
      const selectedSupplier = ref(null);
      const provincesOld = ref([]);
      const districtsOld = ref([]);
      const wardsOld = ref([]);
      const quantityOld = ref("");
      const tax = ref("");
      const productName = ref("");
      const subject = ref("");
      const commentsOld = ref("");
      const images = ref([]);
  
      const showWardFrameOld = ref(false);
      const wardInfo = ref({ name: "", image: "" });
      const wardInfoFrameStyle = ref({ top: "0px", left: "0px" });
      const showWardInfoBox = ref(false);
  
      const selectedWardOldName = computed(() => {
        const ward = wardsOld.value.find((w) => w.id === selectedWardOld.value);
        return ward ? ward.name : null;
      });
  
      const toggleWardDropdown = (type) => {
        if (type === "old") showWardFrameOld.value = !showWardFrameOld.value;
      };
  
      const selectWard = (wardId, type) => {
        if (type === "old") {
          selectedWardOld.value = wardId;
          showWardFrameOld.value = false;
        }
      };
  
      const onRegionChange = (type) => {
        const selectedRegion = type === "old" ? selectedRegionOld : null;
        const provinces = type === "old" ? provincesOld : null;
        const region = regions.value.find((r) => r.id === selectedRegion.value);
  
        provinces.value = region ? region.provinces : [];
        resetSelections(type);
      };
  
      const onProvinceChange = (type) => {
        const selectedProvince = type === "old" ? selectedProvinceOld : null;
        const districts = type === "old" ? districtsOld : null;
        const province = (type === "old" ? provincesOld.value : null).find(
          (p) => p.id === selectedProvince.value
        );
  
        districts.value = province ? province.districts : [];
        resetSelections(type, "district");
      };
  
      const onDistrictChange = (type) => {
        const selectedDistrict = type === "old" ? selectedDistrictOld : null;
        const wards = type === "old" ? wardsOld : null;
        const district = (type === "old" ? districtsOld.value : null).find(
          (d) => d.id === selectedDistrict.value
        );
  
        wards.value = district ? district.wards : [];
        resetSelections(type, "ward");
      };
  
      const resetSelections = (type, level = "region") => {
        if (level === "region") {
          if (type === "old") {
            selectedProvinceOld.value = null;
            selectedDistrictOld.value = null;
            selectedWardOld.value = null;
          }
        } else if (level === "district") {
          if (type === "old") selectedWardOld.value = null;
        }
      };
  
      const showWardInfo = (ward, type, event) => {
        wardInfo.value = {
          name: ward.name,
          image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThbl47VAQK_3kDo3-L6d84Y2qX-f0TTUlgIQ&s`,
        };
        showWardInfoBox.value = true;
  
        const button = event.target;
        const rect = button.getBoundingClientRect();
  
        let formSection = document.querySelector(".form-section");
        let formRect = formSection.getBoundingClientRect();
  
        let top = rect.top - formRect.top;
        let left = rect.left - formRect.left;
  
        wardInfoFrameStyle.value = { top: `${top}px`, left: `${left}px` };
      };
  
      const closeWardInfo = () => {
        showWardInfoBox.value = false;
      };
  
      const handleFileDrop = (event) => {
        const files = event.dataTransfer.files;
        handleFiles(files);
      };
  
      const triggerFileInput = () => {
        const fileInput = document.querySelector("input[type='file']");
        fileInput.click();
      };
  
      const handleImageUpload = (event) => {
        const files = event.target.files;
        handleFiles(files);
      };
  
      const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          reader.onload = () => {
            images.value.push(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
  
      const removeImage = (index) => {
        images.value.splice(index, 1);
      };
  
      return {
        regions,
        categories,
        suppliers,
        selectedRegionOld,
        selectedProvinceOld,
        selectedDistrictOld,
        selectedWardOld,
        selectedCategory,
        selectedSupplier,
        provincesOld,
        districtsOld,
        wardsOld,
        quantityOld,
        tax,
        productName,
        subject,
        commentsOld,
        images,
        showWardFrameOld,
        wardInfo,
        wardInfoFrameStyle,
        showWardInfoBox,
        selectedWardOldName,
        toggleWardDropdown,
        selectWard,
        onRegionChange,
        onProvinceChange,
        onDistrictChange,
        resetSelections,
        showWardInfo,
        closeWardInfo,
        handleFileDrop,
        triggerFileInput,
        handleImageUpload,
        handleFiles,
        removeImage,
      };
    },
  };
  </script>
  
  
  

  <style scoped>
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
  
  .image-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .image-item {
    position: relative;
  }
  
  .image-preview {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .remove-image-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(255, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
  .image-upload-frame {
  border: 2px dashed #007bff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  background-color: #f8f9fa;
  transition: background-color 0.3s ease;
}

.image-upload-frame:hover {
  background-color: #e9ecef;
}

.drop-frame p {
  color: #007bff;
  font-size: 1rem;
  margin: 0;
}

.image-upload-frame.drag-over {
  background-color: #e9ecef;
}

  </style>
  