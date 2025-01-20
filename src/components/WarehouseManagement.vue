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
              
             <!-- Status Menu Section Update -->
            <div v-if="statusMenuVisible[index]" class="status-menu">
              <button class="sub-btn" @click="addStatus(shipment.id)">Add Status</button>
              <button class="sub-btn" @click="showList(shipment.id)">List Icon</button>
              <div v-if="iconListVisible[shipment.id]" class="icon-list">
                <button class="icon-btn"><i class="fas fa-box"></i></button>
                <button class="icon-btn"><i class="fas fa-cogs"></i></button>
                <button class="icon-btn"><i class="fas fa-truck"></i></button>
                <button class="icon-btn"><i class="fas fa-warehouse"></i></button>
                <button class="icon-btn"><i class="fas fa-shipping-fast"></i></button>
              </div>
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
              <img :src="shipment.deliveryManImage || 'default-image-path.jpg'" alt="Delivery Man" class="delivery-man-img" />
            </div>
            <p><strong>Shipper Name:</strong> {{ shipment.shipperName }}</p>
          </div>
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
        { id: 1, name: 'Shipment 1', code: 'A001', quantity: 10, price: 100, shipperName: 'John Doe', deliveryManImage: '/assets/20 - TUYEN.jpg' },
        { id: 2, name: 'Shipment 2', code: 'A002', quantity: 20, price: 200, shipperName: 'Jane Smith' },
        { id: 3, name: 'Shipment 3', code: 'A003', quantity: 30, price: 300, shipperName: 'Alice Brown' },
        { id: 4, name: 'Shipment 4', code: 'A004', quantity: 40, price: 400, shipperName: 'Bob White' },
      ],
      statusMenuVisible: {},
      iconListVisible: {},
    };
  },
  computed: {
    totalPrice() {
      return this.shipments.reduce((sum, shipment) => sum + shipment.price, 0);
    },
  },
  methods: {
    toggleStatusMenu(index) {
      // Toggle the visibility of the status menu when clicking "+"
      this.statusMenuVisible[index] = !this.statusMenuVisible[index];
    },
    addStatus(shipmentId) {
      alert(`Adding status to shipment ID: ${shipmentId}`);
    },
    showList(shipmentId) {
      // Toggle the visibility of the list of icons when clicking "List Icon"
      this.iconListVisible[shipmentId] = !this.iconListVisible[shipmentId];
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
  min-height: 100vh;
  background: linear-gradient(to bottom, #dbeafe, #e0e7ff);
  font-family: 'Arial', sans-serif;
  color: #333;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.warehouse-management {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #f0f8ff, #e6e6fa);
  padding: 20px;
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
}

.shipment-frame {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1100px;
  /*margin: 80px auto 0; /* Push content down */
  /* padding-left: 200px; /* Shift content to the right */
}

.shipment-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 15px;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(to right, #ffffff, #dfe9f3);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2); /* Increased shadow intensity */
  transition: transform 0.3s ease-in-out;
}

.shipment-wrapper:hover {
  transform: scale(1.03); /* Make the shipment cards zoom slightly on hover */
}
.shipment-info,
.shipment-status,
.shipper-info {
  flex: 1;
  min-width: 200px;
  padding: 15px;
  border-radius: 8px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Adding shadow to each section */
}

.actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: relative;
}

.main-btn {
  background: radial-gradient(circle, #4CAF50, #45a049);
  border: none;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  animation: pulse 1.5s infinite;
  box-shadow: 0 0 8px rgba(72, 239, 128, 0.7); /* Added a shadow to the main button */
}

.action-btn {
  background: #d0d0d0;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.status-menu {
  position: absolute;
  bottom: 50px;
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

.icon-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.icon-btn {
  background: #e0e0e0;
  border: none;
  padding: 12px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.icon-btn:hover {
  background-color: #d5d5d5;
  transform: scale(1.1); /* Icon hover effect */
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
padding-left: 200px;}
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

