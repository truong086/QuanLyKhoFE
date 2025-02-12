<template>
    <div class="container mt-4">
      <div class="header">
        <label for="floorSelect" class="form-label">Chọn tầng:</label>
        <select id="floorSelect" v-model="selectedFloor" class="form-select small-select">
          <option v-for="floor in floors" :key="floor" :value="floor">
            {{ floor }}
          </option>
        </select>
      </div>
  
      <div class="zone-container">
        <!-- Loop through zones based on selected floor -->
        <div v-for="(zone, index) in zones[selectedFloor]" :key="index" class="zone-grid">
          <div class="zone-label">{{ zone }}</div>
          <div class="column">
            <div class="row" v-for="row in 10" :key="row">
              <div class="row-item">
                <button class="row-label" @click="openRowDetail(zone, row)" :style="{ marginBottom: '15px' }">
                  {{ row }}
                </button>
                <div class="sub-row-container">
                  <div class="sub-row">
                    <button
                      class="box"
                      v-for="box in 10"
                      :key="box"
                      :class="{ 'has-items': hasItems(zone, row, box), 'empty': !hasItems(zone, row, box) }"
                      @click="openFrame(zone, row, box)"
                    >
                      <span v-if="hasItems(zone, row, box)">
                        {{ inventory[`${zone}-${row}-${box}`]?.length || 0 }}
                      </span>
                    </button>
                  </div>
                  <div class="sub-row">
                    <button
                      class="box"
                      v-for="box in 10"
                      :key="box + '-b'"
                      :class="{ 'has-items': hasItems(zone, row, box), 'empty': !hasItems(zone, row, box) }"
                      @click="openFrame(zone, row, box)"
                    >
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
<!-- Frame chi tiết vị trí -->
            <div v-if="frameVisible" class="detail-frame">
            <div class="frame-content">
                <div class="frame-top">
                <div class="frame-image">
                    <img :src="selectedDetail.productImage" alt="Product Image" />
                </div>
                <div class="frame-details">
                    <p><strong>Sản phẩm:</strong> {{ selectedDetail.product }}</p>
                    <h3>Chi tiết vị trí</h3>
                    <p><strong>Khu:</strong> {{ selectedDetail.zone }}</p>
                    <p><strong>Hàng:</strong> {{ selectedDetail.row }}</p>
                    <p><strong>Cột:</strong> {{ selectedDetail.col }}</p>
                </div>
                </div>
                <div class="frame-buttons">
                <button class="close-button" @click="frameVisible = false">Đóng</button>
                </div>
            </div>
            </div>

  
      <!-- Frame danh sách sản phẩm -->
      <div v-if="rowDetailVisible" class="detail-frame">
        <div class="frame-content">
          <h3>Danh sách sản phẩm - Hàng {{ selectedRowDetail.row }}</h3>
          <ul>
            <li v-for="(product, index) in selectedRowDetail.products" :key="index">
              {{ product }}
            </li>
          </ul>
          <div class="frame-buttons">
            <button class="close-button" @click="rowDetailVisible = false">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Updated floors and zones, fixed to correctly match the zones for each floor
  const floors = ref(["Tầng 1", "Tầng 3"]);
  const selectedFloor = ref(floors.value[0]);
  const zones = ref({
    "Tầng 1": ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
    "Tầng 3": ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"]
  });
  const frameVisible = ref(false);
  const rowDetailVisible = ref(false);
  const selectedDetail = ref({ zone: 0, row: 0, col: 0 });
  const selectedRowDetail = ref({ row: 0, products: [] });
  
  // Sample inventory data
  const inventory = ref({
    "C1-2-3": "Sản phẩm A",
    "C2-5-7": "Sản phẩm C",
    "C3-8-4": "Sản phẩm D",
    "C4-3-6": "Sản phẩm G",
    "C5-9-2": "Sản phẩm H"
  });
  
  // Check if a box has items in the inventory
  const hasItems = (zone, row, col) => {
    return Boolean(inventory.value[`${zone}-${row}-${col}`]);
  };
  
  // Open frame with detailed item info
  const openFrame = (zone, row, col) => {
    const key = `${zone}-${row}-${col}`;
    selectedDetail.value = { 
      zone: zone, 
      row, 
      col, 
      product: inventory.value[key] || "Trống" 
    };
    frameVisible.value = true;
  };
  
  // Open row detail to show the products in a specific row
  const openRowDetail = (zone, row) => {
    let productSet = new Set();
  
    for (let col = 1; col <= 10; col++) {
      const key = `${zone}-${row}-${col}`;
      if (inventory.value[key]) {
        productSet.add(inventory.value[key]);
      }
    }
  
    selectedRowDetail.value = { 
      row, 
      products: Array.from(productSet) 
    };
    rowDetailVisible.value = true;
  };
  </script>
  
  <style scoped>
/* Container chính */
.container {
  max-width: 1000px;
  margin: auto;
  text-align: center;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
}

/* Header */
.header {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: start;
  margin-bottom: 20px;
}

/* Select Box */
/* Cải thiện kiểu cho select */
.small-select {
  width: 120px;  /* Tăng chiều rộng */
  height: 35px;
  padding: 5px;
  border: 1px solid #4a90e2;
  border-radius: 5px;
  background: linear-gradient(135deg, #ffffff, #f1f4ff);
  transition: all 0.3s ease;
  font-size: 14px;
}

.small-select:hover {
  background: linear-gradient(135deg, #e8eeff, #cbd9ff);
}

.small-select:focus {
  border-color: #2c5fb8;
  box-shadow: 0 0 8px rgba(44, 95, 184, 0.5);
}

/* Cải thiện zone-label */
.zone-label {
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
  font-size: 14px;  /* Thu nhỏ kích thước font */
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Cải thiện zone-container */
.zone-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));  /* Cải thiện layout */
  gap: 30px;
  justify-content: center;
  margin-top: 30px;
}

/* Cải thiện zone-grid */
.zone-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  width: 100%; /* Đảm bảo mỗi zone-grid có chiều rộng đầy đủ */
}

.zone-grid:hover {
  transform: translateY(-5px);
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.2);
}


.small-select:hover {
  background: linear-gradient(135deg, #e8eeff, #cbd9ff);
}

.small-select:focus {
  border-color: #2c5fb8;
  box-shadow: 0 0 8px rgba(44, 95, 184, 0.5);
}

/* Khu vực chứa các zone */
.zone-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 50px;
  justify-content: center;
}

/* Mỗi zone */
.zone-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.zone-grid:hover {
  transform: translateY(-5px);
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.2);
}

/* Các hàng và cột */
.column {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 15px; /* Khoảng cách giữa các row-label */
  justify-content: center; /* Căn giữa các row-label */
}
.row-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sub-row-container {
  display: flex;
  flex-direction: row;
  gap: 2px;
}


.sub-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Ô box */
.box {
  width: 12px;
  height: 12px;
  border: 1px solid #6c757d;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  border-radius: 4px;
  padding: 0;
  margin: 1px;
  transition: all 0.3s ease-in-out;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.box:hover {
  background: linear-gradient(135deg, #d9e2ff, #c3d1ff);
  border-color: #4a90e2;
  box-shadow: 2px 2px 5px rgba(74, 144, 226, 0.4);
  transform: scale(1.2);
}

.box:active {
  background: linear-gradient(135deg, #4a90e2, #6b9df2);
  color: white;
  border-color: #2c5fb8;
  transform: scale(1);
}

/* Hiệu ứng khi được chọn */
.box.selected {
  background: linear-gradient(135deg, #ff7675, #ff9999);
  color: white;
  border-color: #d63031;
  box-shadow: 2px 2px 5px rgba(214, 48, 49, 0.4);
}
.box.has-items {
  background: red;
  border: 1px solid darkred;
}
.box.empty {
  background: white;
  border: 1px solid grey;
}
.row-label {
  background: #007bff;
  color: white;
  padding: 5px 9px;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
}
/* Nhãn của từng zone */
.zone-label {
  margin-top: 5px;
  font-weight: bold;
  background-color:orange;
  color: #333;
  font-size: 16px;
  text-transform: uppercase;
}

/* Frame chi tiết */
/* Frame chi tiết */
.detail-frame {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  text-align: left; /* Canh trái */
  width: 400px;
  animation: fadeIn 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

.frame-content {
  display: flex;
  flex-direction: column;
}

.frame-top {
  display: flex;
  gap: 20px;
  align-items: center;
}

.frame-image img {
  width: 100px;  /* Kích thước ảnh */
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.frame-details {
  flex-grow: 1;
}

.frame-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

/* Hiệu ứng fadeIn */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -55%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -55%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.frame-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Hình ảnh trong frame */
.frame-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* Các nút trong frame */
.frame-buttons {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.action-button {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.action-button:hover {
  background: linear-gradient(135deg, #0056b3, #003d80);
  box-shadow: 2px 2px 10px rgba(0, 91, 255, 0.3);
}

.close-button {
  background: linear-gradient(135deg, #dc3545, #a71d2a);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.close-button:hover {
  background: linear-gradient(135deg, #a71d2a, #7a141e);
  box-shadow: 2px 2px 10px rgba(255, 0, 0, 0.3);
}

  </style>
  