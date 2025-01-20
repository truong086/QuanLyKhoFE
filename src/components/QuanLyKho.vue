<template>
  <div class="warehouse-management">
    <div class="scroll-container">
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
                    @click="openFrame(cell, rowIndex, cellIndex)"
                  >
                    {{ cell.id }}
                  </button>
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
    <h3>{{ frameData?.title }}</h3>
    <img :src="frameData?.image" alt="Image" class="frame-image" />
    <p class="frame-description">{{ frameData?.description }}</p>
    <button @click="goToNextPage" class="navigate-btn">Xem Chi Tiết</button>
    <button @click="closeFrame" class="close-btn">Đóng</button>
  </div>
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
function openFrame(cell, rowIndex, cellIndex) {
  frameData.value = {
  title: cell.id,
  image: "https://via.placeholder.com/150", // Thay thế với đường dẫn thực tế của ảnh
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
};

  
  // Lấy vị trí của ô grid
  const gridButton = document.querySelectorAll('.grid button')[rowIndex * 20 + cellIndex]; // Tính toán vị trí của ô
  const rect = gridButton.getBoundingClientRect();
  
  // Cập nhật vị trí của popup
  popupPosition.value = {
    top: rect.top + window.scrollY + 10, // Thêm khoảng cách từ trên xuống
    left: rect.left + window.scrollX + 10, // Thêm khoảng cách từ bên trái
  };

  // Hiển thị frame popup
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
/* Style cho frame popup */
.frame-popup {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  max-height: 90%; /* Đảm bảo nội dung không vượt quá màn hình */
  overflow-y: auto; /* Thêm thanh cuộn nếu nội dung quá lớn */
}

.frame-content {
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px; /* Giới hạn chiều rộng tối đa */
  box-sizing: border-box;
}

.frame-description {
  margin: 10px 0;
  text-align: left;
  font-size: 14px;
  line-height: 1.5;
}


.frame-image {
  max-width: 100%;
  height: auto;
  margin: 10px 0;
}

.close-btn, .navigate-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.close-btn:hover, .navigate-btn:hover {
  background-color: #0056b3;
}

/* Các kiểu trước đó giữ nguyên */
.warehouse-management {
  padding: 20px;
  font-family: Arial, sans-serif;
  align-items: center;
}

.scroll-container {
  overflow-y: auto;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.warehouse-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  padding-left: 200px;
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
  width: 90px;
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
.area-select-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

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

#warehouse-select,
#area-select,
#floor-select {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  color: #333;
  outline: none;
  margin-left: 10px;
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
