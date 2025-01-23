<template>
  <div class="table-page">
    <h1>Quản lý Kho</h1>

    <!-- Bảng Kho -->
    <table class="table">
      <thead>
        <tr>
          <th class="title">Kho</th>
        </tr>
      </thead>
    </table>
    <div class="empty-frame">
      <!-- Bảng con cho Kho -->
      <table class="table">
        <thead>
          <tr>
            <th v-for="(header, index) in warehouseTable.headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in warehouseTable.rows" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Bảng Tầng -->
    <table class="table">
      <thead>
        <tr>
          <th class="title">Tầng</th>
        </tr>
      </thead>
    </table>
    <div class="empty-frame">
      <!-- Bảng con cho Tầng -->
      <table class="table">
        <thead>
          <tr>
            <th v-for="(header, index) in floorTable.headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in floorTable.rows" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Bảng Khu -->
    <table class="table">
      <thead>
        <tr>
          <th class="title">Khu</th>
        </tr>
      </thead>
    </table>
    <div class="empty-frame">
      <!-- Bảng con cho Khu -->
      <table class="table">
        <thead>
          <tr>
            <th v-for="(header, index) in areaTable.headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in areaTable.rows" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dữ liệu cho bảng Kho
const warehouseTable = ref({
  headers: ['Tên', 'Loại', 'Số lượng'],
  rows: [
    ['Sản phẩm 1', 'Loại A', '50'],
    ['Sản phẩm 2', 'Loại B', '30'],
  ],
});

// Dữ liệu cho bảng Tầng
const floorTable = ref({
  headers: ['Tầng', 'Trạng thái'],
  rows: [
    ['Tầng 1', 'Đầy'],
    ['Tầng 2', 'Trống'],
  ],
});

// Dữ liệu cho bảng Khu
const areaTable = ref({
  headers: ['Khu vực', 'Số lượng'],
  rows: [
    ['Khu A', '20'],
    ['Khu B', '15'],
  ],
});
</script>

<style scoped>
.table-page {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #4CAF50;
}

.table {
  width: auto;
  border-collapse: collapse;
  margin-bottom: 30px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.title {
  text-align: center;
  font-size: 1.1rem;
  color: #555;
  background-color: #f2f2f2;
  padding: 10px;
  font-weight: bold;
  border-radius: 10px;
}

.table th,
.table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.table td {
  background-color: #fff;
  color: #666;
}

.table tr:nth-child(even) td {
  background-color: #f9f9f9;
}

.table tr:hover td {
  background-color: #e1e1e1;
  cursor: pointer;
}

.empty-frame {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 15px;
}
</style>
