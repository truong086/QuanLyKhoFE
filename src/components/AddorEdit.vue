<template>
  <div class="container">
    <!-- Title và nhập số lượng -->
    <div class="title-container">
      <h2 class="title">表單</h2>
      <div class="quantity-input">
        <label for="quantity">數量：</label>
        <input
          v-model="addDataWarehourse.Numberoffloors"
          type="number"
          min="1"
          class="form-input"
          placeholder="輸入數量"
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
        <p>拖放檔案於此處</p>
      </div>
      <!-- Hiển thị ảnh khi chọn -->
      <div v-if="imagePreview" class="image-preview">
        <img :src="imagePreview" alt="圖片預覽" />
      </div>
    </div>

    <div class="form-group">
      <label for="quantity">名稱：</label>
      <input
        v-model="addDataWarehourse.name"
        type="text"
        class="form-input"
        placeholder="倉庫名稱..."
      />
    </div>

    <div class="form-group">
      <label for="quantity">ID：</label>
      <input
        v-model="addDataWarehourse.code"
        type="text"
        class="form-input"
        placeholder="倉庫ID..."
      />
    </div>
    <!-- Các mục chọn miền, tỉnh, huyện, xã, và ghi chú không thay đổi -->
    <div class="form-group">
      <label for="region">區域：</label>
      <select
        v-model="selectedRegion"
        @change="onRegionChange"
        class="form-select"
      >
        <option value="" disabled selected>區域</option>
        <option v-for="region in regions" :key="region.id" :value="region.id">
          {{ region.name }}
        </option>
      </select>
    </div>

    <div v-if="provinces.length > 0" class="form-group">
      <label for="province">省：</label>
      <select
        v-model="selectedProvince"
        @change="onProvinceChange"
        class="form-select"
      >
        <option value="" disabled selected>省</option>
        <option
          v-for="province in provinces"
          :key="province.id"
          :value="province.id"
        >
          {{ province.name }}
        </option>
      </select>
    </div>

    <div v-if="districts.length > 0" class="form-group">
      <label for="district">區：</label>
      <select
        v-model="selectedDistrict"
        @change="onDistrictChange"
        class="form-select"
      >
        <option value="" disabled selected>區</option>
        <option
          v-for="district in districts"
          :key="district.id"
          :value="district.id"
        >
          {{ district.name }}
        </option>
      </select>
    </div>

    <div v-if="wards.length > 0" class="form-group">
      <label for="ward">鄉：</label>
      <select v-model="selectedWard" class="form-select">
        <option value="" disabled selected>鄉</option>
        <option v-for="ward in wards" :key="ward.id" :value="ward.id">
          {{ ward.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="comments">備註：</label>
      <textarea
        v-model="addDataWarehourse.address"
        class="form-textarea"
        placeholder="在此處輸入備註..."
      ></textarea>
    </div>

    <div class="form-group">
      <button v-if="route.query.id" class="btn" @click="UpdateData">
        更新資料
      </button>
      <button v-else class="btn" @click="AddData">新增資料</button>
    </div>
  </div>

  <!-- Hiển thị màn hình loading -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>正在載入...</p>
  </div>
</template>


<script setup>
import axios from "axios";
import { ref, getCurrentInstance, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useCounterStore } from "../store";
import { useRouter, useRoute } from "vue-router";
const selectedRegion = ref(null);
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);
const imagePreview = ref(null);
const isDragOver = ref(false);
const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;
const Toast = useToast();
const store = useCounterStore();
const isLoading = ref(false);
const router = useRouter();
const route = useRoute();
const addDataWarehourse = ref({
  name: "",
  Numberoffloors: "",
  address: "",
  Image: "",
  code: ""
});

onMounted(() => {
  if (route.query.id) {
    // Kiểm tra trên URL có query là "id" không
    findOneId(route.query.id);
  }
});

const UpdateData = async () => {
  if (
    selectedRegion.value == undefined ||
    selectedProvince.value == undefined ||
    selectedDistrict.value == undefined ||
    selectedWard.value == undefined ||
    addDataWarehourse.value.name == "" ||
    addDataWarehourse.value.Numberoffloors == 0 ||
    addDataWarehourse.value.address == ""
  ) {
    Toast.error("Data Address Null !!!");
    return;
  }

  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
  const province = provinces.value.find((p) => p.id === selectedProvince.value);
  const district = districts.value.find((d) => d.id === selectedDistrict.value);
  const wardsd = wards.value.find((d) => d.id === selectedWard.value);

  const form = new FormData();
  form.append("name", addDataWarehourse.value.name);
  form.append("Numberoffloors", addDataWarehourse.value.Numberoffloors);
  form.append("Street", wardsd.name);
  form.append("District", district.name);
  form.append("City", province.name);
  form.append("Country", Regions.value.name);
  form.append("address", addDataWarehourse.value.address);
  form.append("code", addDataWarehourse.value.code);
  if (addDataWarehourse.value.Image != null)
    form.append("Image", addDataWarehourse.value.Image);

  const res = await axios.put(
    hostName + `/api/Warehouse/Update?id=${route.query.id}`,
    form,
    getToken()
  );
  if (res.data.success) {
    Toast.success("Update Success !!!");
    router.push("tablepage");
  } else {
    Toast.error(res.data.error);
  }

  isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
};
const findOneId = async (id) => {
  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
  const res = await axios.get(
    hostName + `/api/Warehouse/FindOneId?id=${id}`,
    getToken()
  );
  const dataRegion = regions.value.find(
    (p) => p.name == res.data.content.country
  );
  if (dataRegion != null) {
    selectedRegion.value = dataRegion.id;

    const Province = dataRegion.provinces.find(
      (x) => x.name == res.data.content.city
    );

    if (Province != null) {
      Regions.value = dataRegion;
      provinces.value = dataRegion ? dataRegion.provinces : [];
      selectedProvince.value = Province.id;
      const province = provinces.value.find(
        (p) => p.id === selectedProvince.value
      );

      if (province != null) {
        districts.value = province ? province.districts : [];
        selectedDistrict.value = districts.value.find(
          (x) => x.name == res.data.content.district
        ).id;

        const district = districts.value.find(
          (d) => d.id === selectedDistrict.value
        );
        if (district != null) {
          wards.value = district ? district.wards : [];
          selectedWard.value = wards.value.find(
            (x) => x.name == res.data.content.street
          ).id;
        }
      }
    }
  }

  imagePreview.value = res.data.content.image;
  addDataWarehourse.value.Numberoffloors = res.data.content.numberoffloors;
  addDataWarehourse.value.name = res.data.content.name;
  addDataWarehourse.value.address = res.data.content.address;
  addDataWarehourse.value.code = res.data.content.code;

  isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
};
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
const Regions = ref({});

const AddData = async () => {
  if (
    selectedRegion.value == undefined ||
    selectedProvince.value == undefined ||
    selectedDistrict.value == undefined ||
    selectedWard.value == undefined ||
    addDataWarehourse.value.name == "" ||
    addDataWarehourse.value.Numberoffloors == 0
  ) {
    Toast.error("Data Address Null !!!");
    return;
  }
  const province = provinces.value.find((p) => p.id === selectedProvince.value);
  const district = districts.value.find((d) => d.id === selectedDistrict.value);
  const wardsd = wards.value.find((d) => d.id === selectedWard.value);

  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";

  const form = new FormData();
  form.append("name", addDataWarehourse.value.name);
  form.append("Numberoffloors", addDataWarehourse.value.Numberoffloors);
  form.append("Street", wardsd.name);
  form.append("District", district.name);
  form.append("City", province.name);
  form.append("Country", Regions.value.name);
  form.append("address", addDataWarehourse.value.address);
  form.append("code", addDataWarehourse.value.code);
  if (addDataWarehourse.value.Image != null)
    form.append("Image", addDataWarehourse.value.Image);

  const res = await axios.post(
    hostName + "/api/Warehouse/Add",
    form,
    getToken()
  );
  if (res.data.success) {
    Toast.success("Add Success !!!");
    router.push("tablepage");
  } else {
    Toast.error(res.data.error);
  }

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
// Lấy danh sách tỉnh khi chọn miền
const onRegionChange = () => {
  const region = regions.value.find((r) => r.id === selectedRegion.value);
  Regions.value = region;
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
    addDataWarehourse.value.Image = file;
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
