<template>
  <div class="warehouse-management">
    <!-- Khung cuộn -->
    <div class="scrollable-container">
      <div class="warehouse-container">
        <div
          v-for="(area, areaIndex) in currentWarehouseData[currentFloor - 1]"
          :key="areaIndex"
          class="frame"
        >
          <div class="header-container">
            <div class="header-title">
              <h2 class="warehouse-title">
                {{ currentWarehouse }} - Tầng {{ currentFloor }} - Khu {{ areaPrefixes[currentFloor - 1] }}{{ areaIndex + 1 }}
              </h2>
            </div>
            <div class="selectors-container">
              <div class="warehouse-select-container">
                <label for="warehouse-select" class="warehouse-label">Chọn kho:</label>
                <select id="warehouse-select" v-model="currentWarehouse">
                  <option v-for="warehouse in Object.keys(warehouseData)" :key="warehouse" :value="warehouse">
                    {{ warehouse }}
                  </option>
                </select>
              </div>

              <div class="floor-select-container">
                <label for="floor-select" class="floor-label">Chọn tầng:</label>
                <select id="floor-select" v-model="currentFloor">
                  <option
                    v-for="(floor, index) in currentWarehouseData"
                    :key="index"
                    :value="index + 1"
                  >
                    Tầng {{ index + 1 }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Hiển thị lưới dữ liệu -->
          <div class="grid-wrapper">
            <div v-for="(row, rowIndex) in area" :key="rowIndex" class="grid-item">
              <div class="row-container">
                <div class="row-header">
                  <h3>排 {{ rowIndex + 1 }}</h3>
                </div>
                <div class="grid">
                  <button
                    v-for="(cell, cellIndex) in row"
                    :key="cellIndex"
                    :class="['cell', { occupied: cell.occupied }]"
                    @click="(event) => openFrame(cell, rowIndex, cellIndex, event)"
                  >
                    {{ cell.id }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Frame Popup -->
      <div
        v-if="frameVisible"
        class="frame-popup"
        :style="{ top: popupPosition.top + 'px', left: popupPosition.left + 'px' }"
        @click="closeFrame"
      >
        <div class="frame-content" @click.stop>
          <div class="frame-main">
            <h3>{{ frameData?.title }}</h3>
            <img :src="frameData?.image" alt="Image" class="frame-image" />
          </div>

          <div class="frame-info">
            <div class="info-line">
              <span class="info-title">Giá:</span>
              <span class="info-content">{{ frameData?.content1 }}</span>
            </div>
            <div class="info-line">
              <span class="info-title">Số Lượng:</span>
              <span class="info-content">{{ frameData?.content2 }}</span>
            </div>
            <div class="info-line">
              <span class="info-title">Tồn kho:</span>
              <span class="info-content">{{ frameData?.content3 }}</span>
            </div>

            <button @click="goToNextPage" class="navigate-btn">Update</button>
            <button @click="closeFrame" class="close-btn">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script setup>
import { ref, computed } from "vue";

// Khai báo tiền tố khu vực cho từng kho
const areaPrefixesForWarehouses = {
  "Kho 1": ["A", "B", "C", "D", "E"],
  "Kho 2": ["F", "G", "H", "I", "J"],
  "Kho 3": ["K", "L", "M", "N", "O"],
  "Kho 4": ["P", "Q", "R", "S", "T"],
};

// Dữ liệu cho từng kho
const warehouseData = {
  "Kho 1": generateWarehouseData("Kho 1"),
  "Kho 2": generateWarehouseData("Kho 2"),
  "Kho 3": generateWarehouseData("Kho 3"),
  "Kho 4": generateWarehouseData("Kho 4"),
};

// Hàm tạo dữ liệu cho từng kho
function generateWarehouseData(warehouseName) {
  const areaPrefixes = areaPrefixesForWarehouses[warehouseName];
  return Array.from({ length: 5 }, (_, floorIndex) =>
    Array.from({ length: 10 }, (_, areaIndex) =>
      Array.from({ length: 10 }, (_, rowIndex) =>
        Array.from({ length: 20 }, (_, colIndex) => ({
          id: `${warehouseName}-${areaPrefixes[floorIndex]}${areaIndex + 1}-${String(rowIndex + 1).padStart(2, "0")}-${colIndex + 1}`,
          occupied: Math.random() > 0.7,
        }))
      )
    )
  );
}
// Trạng thái hiện tại
const currentWarehouse = ref("Kho 1");
const currentFloor = ref(1);

// Dữ liệu tầng của kho được chọn
const currentWarehouseData = computed(() => warehouseData[currentWarehouse.value]);

// Tiền tố khu vực
const areaPrefixes = ["A", "B", "C", "D", "E"];

// Các biến để điều khiển popup
const frameVisible = ref(false);
const frameData = ref(null);
const popupPosition = ref({ top: 0, left: 0 });

// Hàm mở frame với dữ liệu của ô được nhấn
function openFrame(cell, rowIndex, cellIndex, event) {
  console.log("Row:", rowIndex, "Cell:", cellIndex, "Data:", cell);

  frameData.value = {
    title: cell.id,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRPjVjuhd5m-dXPSvTua4ApUesQ7RreOtWXw&s",
    content1: "1200$",
    content2: "20",
    content3: "200",
  };

  const gridButton = event.target;
  const rect = gridButton.getBoundingClientRect();

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  let top = rect.top + window.scrollY;
  let left = rect.left + window.scrollX + rect.width + 10;

  // Điều chỉnh nếu vượt quá giới hạn màn hình
  if (left + 300 > screenWidth) {
    left = rect.left + window.scrollX - 300 - 10;
  }
  if (top + 200 > screenHeight) {
    top = rect.top + window.scrollY - 200 - 10;
  }

  popupPosition.value = { top, left };
  frameVisible.value = true;
}



// Hàm đóng frame
function closeFrame() {
  frameVisible.value = false;
}

// Hàm chuyển trang (ví dụ: chuyển tầng hoặc kho)
function goToNextPage() {
  // Chuyển tới tầng kế tiếp hoặc kho kế tiếp
  if (currentFloor.value < 5) {
    currentFloor.value++;
  } else {
    currentWarehouse.value = "Kho 2"; // Ví dụ chuyển kho nếu đạt tầng cuối
    currentFloor.value = 1; // Reset lại tầng
  }
  closeFrame();
}

</script>








<style scoped>
.info-line {
  display: flex;
  margin: 5px 0;
}

.info-title {
  font-weight: bold;
  margin-right: 10px;
}

.info-content {
  flex: 1;
  text-align: left;
}

/* Style cho frame popup */
.scrollable-container {
  position: absolute; /* Hoặc `fixed` nếu bạn muốn nó luôn giữ vị trí */
  top: 0;
  left: 0;
  padding-right: 100px;
  width: 110%;
  height: 100vh; /* Chiều cao 100% màn hình */
  overflow-y: auto; /* Đảm bảo có thể cuộn theo chiều dọc */
  overflow-x: hidden; /* Ẩn cuộn ngang nếu không cần */
  display: flex;
  flex-direction: column; /* Sắp xếp các phần tử theo chiều dọc */
  justify-content: flex-start; /* Bắt đầu căn từ trên */
  align-items: center;
}


.frame-popup {
  position: fixed; /* Giữ cố định trong màn hình */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* Đảm bảo popup luôn nổi trên */
  max-height: 90%; /* Giới hạn chiều cao để không vượt màn hình */
  overflow-y: auto; /* Kích hoạt cuộn dọc nếu nội dung quá lớn */
}


.frame-content {
  width: 100%;
}



/* Nội dung của popup */
.frame-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex; /* Sắp xếp ngang */
  align-items: flex-start; /* Căn chỉnh theo chiều dọc */
  gap: 20px; /* Khoảng cách giữa các phần */
  max-width: 100%;
  animation: fadeInContent 0.3s ease-in-out;
  flex: 1;
}

.frame-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
}

.frame-info {
  display: flex;
  flex-direction: column; /* Các dòng thông tin xếp dọc */
  justify-content: flex-start;
  gap: 10px;
  text-align: left;
}

.frame-image {
  max-width: 150px;
  max-height: 150px;
  border-radius: 5px;
}

.info-line {
  display: flex;
  gap: 10px; /* Khoảng cách giữa tiêu đề và nội dung */
}

.info-title {
  font-weight: bold;
  color: #333;
  min-width: 80px; /* Đảm bảo các tiêu đề có kích thước đồng đều */
}

.info-content {
  flex: 1;
  color: #555;
}

/* Điều chỉnh các nút trong popup */
.close-btn, .navigate-btn {
  width: 100px;
  margin-top: 10px;
}


/* Thêm các hiệu ứng animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes fadeInContent {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Nút đóng và nút điều hướng */
.close-btn, .navigate-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s ease;
}

.close-btn:hover, .navigate-btn:hover {
  background-color: #0056b3;
}

/* Các kiểu trước đó giữ nguyên */
.warehouse-management {
  transform: scale(0.9); /* Shrinks the whole page to 90% */
  transform-origin: top center; /* Keeps the scaling anchored from the top center */
  width: 100%;
  padding: 0; /* Loại bỏ padding */
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Căn chỉnh từ trên cùng */
  min-height: 100vh; /* Đảm bảo chiều cao của body chiếm toàn bộ chiều cao màn hình */

}

.warehouse-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%; /* Đảm bảo container chiếm toàn bộ chiều rộng */
  position: relative; /* Cần thiết để .frame-popup định vị chính xác */
}


.frame {
  width: 100%;
  max-width: 1500px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding-left: 0; /* Loại bỏ padding-left để không còn khoảng trống bên trái */
  margin-bottom: 40px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.header-title {
  flex: 1;
}

.warehouse-title {
  font-size: 25px;
  margin-bottom: 20px;
  margin-left: 200px;
  padding: 10px 20px;
  border: 2px solid #007bff;
  border-radius: 10px;
  display: inline-block;
  background-color: #f0f8ff;
  color: #007bff;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 22px;
  padding: 8px 15px;
}

.grid-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.row-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.row-header {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 100px;
  margin-right: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  gap: 20px;
}

.cell {
  width: 95px;
  height: 40px;
  background-color: #eee;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 40px;
  font-size: 10px;
}

.cell.occupied {
  background-color: #ff4d4d;
  color: white;
}
.selectors-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.warehouse-select-container,
/* .area-select-container {
  display: flex;
  align-items: center;
  gap: 10px;
} */

.warehouse-label,
.area-label {
  font-size: 16px;
  color: #007bff;
  font-weight: bold;
}

select {
  font-size: 16px;
  padding: 5px 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  background-color: #f0f8ff;
  color: #007bff;
  cursor: pointer;
}
.floor-label {
  font-size: 16px;
  color: #007bff;
  font-weight: bold;
}

#warehouse-select,
#area-select,
#floor-select {
  font-size: 17px;
  padding: 5px 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  background-color: #f0f8ff;
  color: #007bff;
  cursor: pointer;
}

#warehouse-select:focus,
#area-select:focus,
#floor-select:focus {
  border-color: #01060c;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

@media (max-width: 768px) {
  .frame {
    width: 95%;
    padding-left: 30px;
  }

  .warehouse-title {
    font-size: 18px;
    padding: 8px 15px;
  }

  .row-container {
    flex-direction: column;
    align-items: center;
  }

  .grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }

  .cell {
    width: 60px;
    height: 30px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .warehouse-title {
    font-size: 16px;
    padding: 5px 10px;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .cell {
    width: 50px;
    height: 25px;
    font-size: 10px;
  }
}
</style>