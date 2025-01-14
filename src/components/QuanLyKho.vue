<template>
  <div class="warehouse-management">
    <div class="scroll-container">
      <div class="frame">
        <div v-for="(row, rowIndex) in warehouseData" :key="rowIndex" class="grid-item">
          <h3>Dãy {{ rowIndex + 1 }}</h3>
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
</template>

<script setup>
import { ref } from "vue";

// Tạo dữ liệu kho
const warehouseData = ref(
  Array.from({ length: 10 }, (_, rowIndex) => {
    return Array.from({ length: 20 }, (_, colIndex) => {
      const id = `${String(rowIndex + 1).padStart(2, "0")}-${colIndex + 1}`;
      return {
        id,
        occupied: Math.random() > 0.7, // Random trạng thái ô kho
      };
    });
  })
);
</script>

<style scoped>
.warehouse-management {
  padding: 20px;
  font-family: Arial, sans-serif;
  align-items: center;
}

.scroll-container {
  overflow-x: auto;
  display: flex;
  justify-content: center;
  max-width: 100vw;
  align-items: center;
}

.frame {
  width: 100%;
  max-width: 1500px;
  overflow: hidden;
  border: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.grid-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  gap: 5px;
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
</style>
