<template>
  <div class="app-wrapper">
  <div class="Warehouse-Management">
    <!-- Frame for displaying shipments with scroll -->
    <div class="shipment-frame">
      <div class="shipment-wrapper" v-for="(shipment, index) in shipments" :key="shipment.id">
        <div class="shipment-info">
          <p><strong>Name:</strong> {{ shipment.name }}</p>
          <p><strong>Code:</strong> {{ shipment.code }}</p>
          <p><strong>Quantity:</strong> {{ shipment.quantity }}</p>
          <p><strong>Price:</strong> {{ shipment.price }}</p>
          <div class="actions">
            <button class="main-btn" @click="toggleStatusMenu(index)">+</button>
            <button class="action-btn" @click="updateShipment(shipment.id)">Update</button>
            <button class="action-btn" @click="selectShipment(shipment.id)">Select</button>
            <div v-if="statusMenuVisible[index]" class="status-menu">
              <button class="sub-btn" @click="addStatus(shipment.id)">Add Status</button>
              <button class="sub-btn" @click="showList(shipment.id)">List Icon</button>
            </div>
          </div>
        </div>
        <div class="shipment-status">
          <p><strong>Shipment status:</strong></p>
          <ul>
            <li>Created</li>
            <li>Packed</li>
            <li>In Transit</li>
            <li>Received/Stocked</li>
            <li>Shipped/Dispatched</li>
          </ul>
          <p><strong>Total Price:</strong> {{ shipment.price }}</p>
        </div>
          <div class="shipper-info">
            <div class="delivery-man-image">
            <!-- Hình ảnh mặc định hoặc hình ảnh động -->
              <img :src="shipment.deliveryManImage || 'default-image-path.jpg'" alt="Delivery Man" class="delivery-man-img" />
          </div>
              <p><strong>Shipper Name:</strong> {{ shipment.shipperName }}</p>
        </div>=
      </div>
    </div>
    <div class="total-price-container">
      <h3>Total Price</h3>
      <p><strong>Total:</strong> {{ totalPrice }}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      shipments: [
        { id: 1, name: 'Shipment 1', code: 'A001', quantity: 10, price: 100, shipperName: 'John Doe', deliveryManImage: '/assets/20 - TUYEN.jpg'},
        { id: 2, name: 'Shipment 2', code: 'A002', quantity: 20, price: 200, shipperName: 'Jane Smith' },
        { id: 3, name: 'Shipment 3', code: 'A003', quantity: 30, price: 300, shipperName: 'Alice Brown' },
        { id: 4, name: 'Shipment 4', code: 'A004', quantity: 40, price: 400, shipperName: 'Bob White' },
      ],
      statusMenuVisible: {},
    };
  },
  computed: {
    totalPrice() {
      return this.shipments.reduce((sum, shipment) => sum + shipment.price, 0);
    },
  },
  methods: {
    toggleStatusMenu(index) {
      this.statusMenuVisible[index] = !this.statusMenuVisible[index];
    },
    addStatus(shipmentId) {
      alert(`Adding status to shipment ID: ${shipmentId}`);
    },
    showList(shipmentId) {
      alert(`Showing list for shipment ID: ${shipmentId}`);
    },
    updateShipment(shipmentId) {
      alert(`Updating shipment ID: ${shipmentId}`);
    },
    selectShipment(shipmentId) {
      alert(`Selecting shipment ID: ${shipmentId}`);
    },
  },
};
</script>

<style scoped>

.app-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Đảm bảo khung nền bao phủ toàn màn hình */
  background: linear-gradient(to bottom, #dbeafe, #e0e7ff); /* Nền gradient nhẹ */
  font-family: 'Arial', sans-serif;
  color: #333; /* Màu chữ chính */
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden; /* Ẩn thanh cuộn ngang */
}

.app-wrapper h1 {
  font-size: 2rem;
  color: #1e40af; /* Màu xanh dương đậm */
  margin-bottom: 20px;
  text-align: center;
}

.app-wrapper p {
  font-size: 1rem;
  color: #4b5563; /* Màu xám đậm */
  margin: 0;
}

.app-wrapper .button-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.app-wrapper button {
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.app-wrapper button:hover {
  background-color: #4caf50; /* Màu xanh lá khi hover */
  color: #fff;
}

.warehouse-management {
  display: flex;
  flex-direction: column;
  align-items: center; /* Trung tâm hóa các phần tử */
  font-family: 'Arial', sans-serif;
  background: linear-gradient(to bottom, #f0f8ff, #e6e6fa);
  padding: 20px;
  animation: fadeIn 2s;
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.shipment-frame {
  display: flex;
  flex-direction: column; /* Để các lô hàng stack theo chiều dọc */
  align-items: center; /* Căn giữa theo chiều ngang */
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  max-width: 900px;
  max-height: 600px;
  overflow-y: auto;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 10px;
  background: #f8f8f8;
  position: relative;
}


.shipment-wrapper {
  display: flex;
  flex-direction: row; /* Căn các khung ngang hàng */
  justify-content: space-between;
  align-items: stretch; /* Đảm bảo các khung bằng chiều cao */
  flex-wrap: nowrap;
  gap: 15px;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(to right, #ffffff, #dfe9f3);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
.shipment-info,
.shipment-status,
.shipper-info {
  flex: 1; /* Chia đều không gian */
  min-width: 200px;
  padding: 15px;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.shipment-info p,
.shipment-status p,
.shipper-info p {
  margin: 5px 0; /* Khoảng cách giữa các đoạn văn */
}
.shipment-status ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.shipment-status ul li {
  margin-bottom: 5px;
}

.actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.action-btn {
  background: #d0d0d0;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.main-btn {
  background: radial-gradient(circle, #4CAF50, #45a049);
  border: none;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
  animation: pulse 1.5s infinite;
}

.status-menu {
  position: absolute;
  top: 50px;
  left: 0;
  background: #f4f4f4;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  padding: 10px;
  z-index: 10;
}

.sub-btn {
  display: block;
  margin: 8px 0;
  padding: 8px 12px;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  color: #555;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sub-btn:hover {
  background-color: #d5d5d5;
}

.delivery-man-image {
  text-align: center;
  margin-bottom: 10px;
}
.delivery-man-img {
  max-width: 100%;
  height: auto;
  border-radius: 50%;
}
.total-price-container {
  margin-top: 20px;
  text-align: left;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 5px rgba(72, 239, 128, 0.9);
  }
  50% {
    box-shadow: 0 0 15px rgba(72, 239, 128, 0.9);
  }
  100% {
    box-shadow: 0 0 5px rgba(72, 239, 128, 0.9);
  }
}

@media screen and (max-width: 1024px) {
  .shipment-wrapper {
    flex-direction: column; /* Chuyển từ row sang column khi màn hình nhỏ */
    align-items: stretch;
    width: 100%;
    max-width: 100%;
  }

  .shipment-info,
  .shipment-status,
  .shipper-info {
    max-width: 100%; /* Chiếm toàn bộ chiều rộng */
  }
}
</style>

