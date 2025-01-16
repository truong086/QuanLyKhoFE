<template>
  <div class="warehouse-management">
    <div class="scroll-container">
      <div class="warehouse-container">
        <!-- Vòng lặp qua các khu trong tầng -->
        <div
          v-for="(area, areaIndex) in floors[currentFloor - 1]"
          :key="areaIndex"
          class="frame"
        >
          <!-- Container tiêu đề và chọn tầng -->
          <div class="header-container">
            <div class="header-title">
              <h2 class="warehouse-title">
                Tầng {{ currentFloor }} - Khu {{ areaPrefixes[currentFloor - 1] }}{{ areaIndex + 1 }}
              </h2>
            </div>
            <div class="floor-select-container">
              <label for="floor-select" class="floor-label">Chọn tầng:</label>
              <select id="floor-select" v-model="currentFloor">
                <option v-for="floor in totalFloors" :key="floor" :value="floor">
                  Tầng {{ floor }}
                </option>
              </select>
            </div>
          </div>

          <!-- Lưới dữ liệu -->
          <div class="grid-wrapper">
            <div v-for="(row, rowIndex) in area" :key="rowIndex" class="grid-item">
              <div class="row-container">
                <div class="row-header">
                  <h3>排 {{ rowIndex + 1 }}</h3>
                </div>
                <div class="grid">
                  <div
                    v-for="(cell, cellIndex) in row"
                    :key="cellIndex"
                    :class="['cell', { occupied: cell.occupied }]"
                  >
                    {{ cell.id }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from "vue";

// Số lượng tầng và khu
const totalFloors = 5; // Tổng số tầng
const totalAreasPerFloor = 10; // Số khu mỗi tầng

// Tiền tố khu vực cho mỗi tầng
const areaPrefixes = ["A", "B", "C", "D", "E"]; // Tầng 1: A, Tầng 2: B, ...

// Tầng hiện tại
const currentFloor = ref(1);

// Dữ liệu cho các tầng và khu
const floors = ref(
  Array.from({ length: totalFloors }, (_, floorIndex) =>
    Array.from({ length: totalAreasPerFloor }, (_, areaIndex) =>
      Array.from({ length: 10 }, (_, rowIndex) =>
        Array.from({ length: 20 }, (_, colIndex) => {
          const id = `${areaPrefixes[floorIndex]}${areaIndex + 1}-${String(rowIndex + 1).padStart(2, "0")}-${colIndex + 1}`;
          return {
            id,
            occupied: Math.random() > 0.7, // Random trạng thái ô kho
          };
        })
      )
    )
  )
);



</script>

<style scoped>
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
  justify-content: space-between; /* Cách đều tiêu đề và nút chọn tầng */
  width: 100%;
  margin-bottom: 20px;
}

.header-title {
  flex: 1; /* Tiêu đề chiếm không gian lớn nhất */
}

.warehouse-title {
  font-size: 25px;
  margin-bottom: 20px;
  margin-left: 200px; /* Push the title to the right */
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

.floor-title {
  font-size: 20px;
  margin-bottom: 20px;
  padding: 10px 20px;
  border: 2px solid #007bff;
  border-radius: 10px;
  display: inline-block;
  background-color: #f0f8ff;
  color: #007bff;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  width: 80px;
  height: 40px;
  background-color: #eee;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}

.cell.occupied {
  background-color: #ff4d4d;
  color: white;
}

.floor-select-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Khoảng cách giữa label và select */
}

.floor-label {
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

#floor-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}


/* Media Queries for Mobile */
@media (max-width: 768px) {
  .frame {
    width: 95%; /* Giảm chiều rộng khung cho màn hình nhỏ */
    padding-left: 30px; /* Giảm khoảng cách bên trái */
  }

  .warehouse-title {
    font-size: 18px; /* Giảm kích thước chữ tiêu đề */
    padding: 8px 15px;
  }

  .row-container {
    flex-direction: column; /* Chuyển tiêu đề và ô thành dọc */
    align-items: center;
  }

  .grid {
    grid-template-columns: repeat(5, 1fr); /* Giảm số cột trong lưới */
    gap: 10px;
  }

  .cell {
    width: 60px; /* Giảm kích thước ô */
    height: 30px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .warehouse-title {
    font-size: 16px; /* Giảm kích thước chữ tiêu đề cho màn hình rất nhỏ */
    padding: 5px 10px;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr); /* Hiển thị 3 cột trên mobile nhỏ */
    gap: 8px; /* Giảm khoảng cách */
  }

  .cell {
    width: 50px; /* Giảm kích thước ô cho mobile nhỏ */
    height: 25px;
    font-size: 10px;
  }
}
</style>
