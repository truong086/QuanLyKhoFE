  <template>
    <div class="container">
      <!-- Form Kho cũ -->
      <div class="form-section">
        <h2 class="title">Kho cũ</h2>

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
        <div class="form-group">
          <label for="comments">Ghi chú:</label>
          <textarea v-model="commentsOld" class="form-textarea" placeholder="Nhập ghi chú..."></textarea>
        </div>
      </div>

      <!-- Swap Button -->
      <button @click="swapForm" class="swap-button">
        <i class="fas fa-exchange-alt"></i> Chuyển sang kho mới
      </button>

      <!-- Form Kho mới -->
      <div v-if="showNewWarehouse" class="form-section">
        <h2 class="title">Kho mới</h2>

        <!-- Kho Select -->
        <div class="form-group">
          <label for="region">Kho:</label>
          <select v-model="selectedRegionNew" @change="onRegionChange('new')" class="form-select">
            <option value="" disabled>Chọn kho</option>
            <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
          </select>
        </div>

        <!-- Tầng Select -->
        <div v-if="provincesNew.length > 0" class="form-group">
          <label for="province">Tầng:</label>
          <select v-model="selectedProvinceNew" @change="onProvinceChange('new')" class="form-select">
            <option value="" disabled>Chọn tầng</option>
            <option v-for="province in provincesNew" :key="province.id" :value="province.id">{{ province.name }}</option>
          </select>
        </div>

        <!-- Khu Select -->
        <div v-if="districtsNew.length > 0" class="form-group">
          <label for="district">Khu:</label>
          <select v-model="selectedDistrictNew" @change="onDistrictChange('new')" class="form-select">
            <option value="" disabled>Chọn khu</option>
            <option v-for="district in districtsNew" :key="district.id" :value="district.id">{{ district.name }}</option>
          </select>
        </div>

        <!-- Vị trí Select -->
        <div v-if="wardsNew.length > 0" class="form-group">
          <label for="ward">Vị trí:</label>
          <div class="dropdown-container">
            <button @click="toggleWardDropdown('new')" class="form-select">
              {{ selectedWardNewName || "Chọn vị trí" }}
            </button>

            <div v-if="showWardFrameNew" class="ward-dropdown">
              <div class="ward-grid">
                <button
                  v-for="ward in wardsNew"
                  :key="ward.id"
                  class="ward-button"
                  :class="{ selected: ward.id === selectedWardNew }"
                  @click="selectWard(ward.id, 'new')"
                  @mouseenter="showWardInfo(ward, 'new', $event)"
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
          <input v-model="quantityNew" type="number" min="1" class="form-input" placeholder="Nhập số lượng" />
        </div>
        <div class="form-group">
          <label for="comments">Ghi chú:</label>
          <textarea v-model="commentsNew" class="form-textarea" placeholder="Nhập ghi chú..."></textarea>
        </div>

        <div class="form-group">
          <button @click="saveNewWarehouse" class="save-button">Lưu kho mới</button>
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

      const selectedRegionOld = ref(null);
      const selectedProvinceOld = ref(null);
      const selectedDistrictOld = ref(null);
      const selectedWardOld = ref(null);
      const provincesOld = ref([]);
      const districtsOld = ref([]);
      const wardsOld = ref([]);
      const quantityOld = ref("");
      const commentsOld = ref("");

      const showNewWarehouse = ref(false);
      const selectedRegionNew = ref(null);
      const selectedProvinceNew = ref(null);
      const selectedDistrictNew = ref(null);
      const selectedWardNew = ref(null);
      const provincesNew = ref([]);
      const districtsNew = ref([]);
      const wardsNew = ref([]);
      const quantityNew = ref(1);
      const commentsNew = ref("");

      const showWardFrameOld = ref(false);
      const showWardFrameNew = ref(false);
      const showWardTitle = ref(false);
      const wardInfo = ref({ name: "", image: "" });
      const wardInfoFrameStyle = ref({ top: "0px", left: "0px" });
      const showWardInfoBox = ref(false);

      const selectedWardOldName = computed(() => {
        const ward = wardsOld.value.find((w) => w.id === selectedWardOld.value);
        return ward ? ward.name : null;
      });

      const selectedWardNewName = computed(() => {
        const ward = wardsNew.value.find((w) => w.id === selectedWardNew.value);
        return ward ? ward.name : null;
      });

      const toggleWardDropdown = (type) => {
        if (type === "old") showWardFrameOld.value = !showWardFrameOld.value;
        if (type === "new") showWardFrameNew.value = !showWardFrameNew.value;
      };

      const selectWard = (wardId, type) => {
        if (type === "old") {
          selectedWardOld.value = wardId;
          showWardFrameOld.value = false;
        }
        if (type === "new") {
          selectedWardNew.value = wardId;
          showWardFrameNew.value = false;
        }
      };

      const onRegionChange = (type) => {
        const selectedRegion = type === "old" ? selectedRegionOld : selectedRegionNew;
        const provinces = type === "old" ? provincesOld : provincesNew;
        const region = regions.value.find((r) => r.id === selectedRegion.value);

        provinces.value = region ? region.provinces : [];
        resetSelections(type);
      };

      const onProvinceChange = (type) => {
        const selectedProvince = type === "old" ? selectedProvinceOld : selectedProvinceNew;
        const districts = type === "old" ? districtsOld : districtsNew;
        const province = (type === "old" ? provincesOld.value : provincesNew.value).find(
          (p) => p.id === selectedProvince.value
        );

        districts.value = province ? province.districts : [];
        resetSelections(type, "district");
      };

      const onDistrictChange = (type) => {
        const selectedDistrict = type === "old" ? selectedDistrictOld : selectedDistrictNew;
        const wards = type === "old" ? wardsOld : wardsNew;
        const district = (type === "old" ? districtsOld.value : districtsNew.value).find(
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
          if (type === "new") {
            selectedProvinceNew.value = null;
            selectedDistrictNew.value = null;
            selectedWardNew.value = null;
          }
        } else if (level === "district") {
          if (type === "old") selectedWardOld.value = null;
          if (type === "new") selectedWardNew.value = null;
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

  // Lấy form section cần tính toán vị trí
  let formSection;
if (type === "old") {
  formSection = document.querySelector('.form-section:first-of-type');
} else {
  formSection = document.querySelector('.form-section:nth-of-type(2)');
}

  const formRect = formSection.getBoundingClientRect();

  // Cập nhật vị trí của ward-info-frame sao cho đúng với form section
  wardInfoFrameStyle.value = {
    top: `${rect.top + window.scrollY + button.offsetHeight + 5 - formRect.top}px`,
    left: `${rect.left + window.scrollX + (button.offsetWidth / 2) - 100}px`,
  };
};




      const hideWardInfo = () => {
        showWardInfoBox.value = false;
      };

      const closeWardInfo = () => {
        showWardInfoBox.value = false;
      };

      const swapForm = () => {
        showNewWarehouse.value = !showNewWarehouse.value;
      };

      const saveNewWarehouse = () => {
        // Logic to save the new warehouse data
      };

      return {
        regions,
        selectedRegionOld,
        selectedProvinceOld,
        selectedDistrictOld,
        selectedWardOld,
        provincesOld,
        districtsOld,
        wardsOld,
        quantityOld,
        commentsOld,
        selectedRegionNew,
        selectedProvinceNew,
        selectedDistrictNew,
        selectedWardNew,
        provincesNew,
        districtsNew,
        wardsNew,
        quantityNew,
        commentsNew,
        showNewWarehouse,
        showWardFrameOld,
        showWardFrameNew,
        showWardTitle,
        wardInfo,
        wardInfoFrameStyle,
        showWardInfoBox,
        selectedWardOldName,
        selectedWardNewName,
        toggleWardDropdown,
        selectWard,
        onRegionChange,
        onProvinceChange,
        onDistrictChange,
        showWardInfo,
        hideWardInfo,
        closeWardInfo,
        swapForm,
        saveNewWarehouse,
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
  </style>