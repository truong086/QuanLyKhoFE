<template>
  <div class="table-page">
    <h1>Quản lý Kho</h1>

    <!-- Bảng Kho -->
    <div class="table-container">
      <h2 class="table-title">Thông tin Kho</h2>
      <table class="table">
        <thead>
          <tr>
            <th class="title">Tên</th>
            <th class="title">Loại</th>
            <th class="title">Số lượng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in sharedData" :key="rowIndex">
            <td>{{ row.name }}</td>
            <td>{{ row.type }}</td>
            <td>{{ row.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Bảng Tầng -->
    <div class="table-container">
      <h2 class="table-title">Thông tin Tầng</h2>
      <table class="table">
        <thead>
          <tr>
            <th class="title">Tầng</th>
            <th class="title">Trạng thái</th>
            <th class="title">Diện tích</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in sharedData" :key="rowIndex">
            <td>{{ row.floor }}</td>
            <td>{{ row.status }}</td>
            <td>{{ row.area }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Bảng Khu -->
    <div class="table-container">
      <h2 class="table-title">Thông tin Khu</h2>
      <table class="table">
        <thead>
          <tr>
            <th class="title">Khu vực</th>
            <th class="title">Số lượng</th>
            <th class="title">Diện tích</th>
            <th class="title">Loại</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in sharedData" :key="rowIndex">
            <td>{{ row.areaName }}</td>
            <td>{{ row.areaQuantity }}</td>
            <td>{{ row.areaSize }}</td>
            <td>{{ row.areaType }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dữ liệu chung cho các bảng
const sharedData = ref([
  {
    name: 'Sản phẩm 1',
    type: 'Loại A',
    quantity: 50,
    floor: 'Tầng 1',
    status: 'Đầy',
    area: 'Khu A',
    areaName: 'Khu A',
    areaQuantity: 20,
    areaSize: 150,
    areaType: 'Kho'
  },
  {
    name: 'Sản phẩm 2',
    type: 'Loại B',
    quantity: 30,
    floor: 'Tầng 2',
    status: 'Trống',
    area: 'Khu B',
    areaName: 'Khu B',
    areaQuantity: 15,
    areaSize: 120,
    areaType: 'Văn phòng'
  },
]);
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

.table-container {
  width: 100%;
  margin-bottom: 30px;
}

.table-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #4CAF50;
}

.table {
  width: 100%;
  border-collapse: collapse;
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
</style>
