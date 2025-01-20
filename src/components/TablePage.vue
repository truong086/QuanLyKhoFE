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
        <tbody>
          <tr v-for="(warehouse, index) in warehouseList" :key="index">
            <td>{{ warehouse }}</td>
          </tr>
        </tbody>
      </table>
      <div class="empty-frame"></div> <!-- Khung dưới Kho -->
      
      <br />
      
      <!-- Bảng Tầng -->
      <table class="table">
        <thead>
          <tr>
            <th class="title">Tầng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="floor in floors" :key="floor">
            <td>{{ `Tầng ${floor}` }}</td>
          </tr>
        </tbody>
      </table>
      <div class="empty-frame"></div> <!-- Khung dưới Tầng -->
      
      <br />
      
      <!-- Bảng Khu -->
      <table class="table">
        <thead>
          <tr>
            <th class="title">Khu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(area, index) in currentAreaPrefixes" :key="index">
            <td>{{ area }}</td>
          </tr>
        </tbody>
      </table>
      <div class="empty-frame"></div> <!-- Khung dưới Khu -->
    </div>
  </template>
  
  
  <script setup>
  
  </script>
  
  <style scoped>
.table-page {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center; /* Căn giữa các phần tử theo chiều ngang */
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #4CAF50; /* Màu xanh lá cây */
}

.table {
  width: 10%; /* Thay đổi width của bảng */
  border-collapse: collapse;
  margin-bottom: 30px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Thêm bóng đổ */
  margin: 0 auto; /* Căn giữa bảng */
  border-radius: 50px;
}

.title {
  width: 120px; /* Thu nhỏ chiều rộng tiêu đề */
  text-align: center;
  font-size: 1.1rem;
  color: #555;
  background-color: #f2f2f2;
  padding: 10px;
  font-weight: bold;
  border-radius: 10px; /* Bo tròn tiêu đề */
  border: none; /* Loại bỏ viền quanh tiêu đề */
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
  background-color: #f9f9f9; /* Dòng chẵn màu sáng */
}

.table tr:hover td {
  background-color: #e1e1e1; /* Màu nền khi hover */
  cursor: pointer;
}

.empty-frame {
  width: 50%; /* Khung cũng căn giữa như bảng */
  height: 300px; /* Chiều cao của khung trống */
  background-color: #e0e0e0; /* Màu nền cho khung */
  border: 1px solid #ccc; /* Đường viền cho khung */
  border-radius: 8px;
  margin-top: 15px; /* Khoảng cách giữa bảng và khung */
  margin: 0 auto; /* Căn giữa khung */
}

@media screen and (max-width: 768px) {
  .table th, .table td {
    font-size: 0.875rem;
    padding: 8px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .table {
    width: 80%; /* Thay đổi width khi màn hình nhỏ */
  }

  .empty-frame {
    width: 80%; /* Khung cũng thay đổi width khi màn hình nhỏ */
  }
}

  </style>
  