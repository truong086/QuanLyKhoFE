<template>
    <div class="page-container">
      <!-- Header -->
      <header class="header">
        <!-- Select Boxes -->
        <div class="select-container">
          <select v-model="selectedWarehouse" class="form-select">
            <option v-for="warehouse in warehouses" :key="warehouse" :value="warehouse">{{ warehouse }}</option>
          </select>
          <select v-model="selectedFloor" class="form-select">
            <option v-for="floor in floors" :key="floor" :value="floor">{{ floor }}</option>
          </select>
          <select v-model="selectedZone" class="form-select">
            <option v-for="zone in zones[selectedFloor]" :key="zone" :value="zone">{{ zone }}</option>
          </select>
          <select v-model="selectedRack" class="form-select">
            <option v-for="rack in racks[selectedZone]" :key="rack" :value="rack">{{ rack }}</option>
          </select>
        </div>
      </header>
  
      <!-- Main Content -->
      <div class="main-content">
        <!-- Navbar -->
        <nav class="navbar">
          <!-- Search Input -->
        <div class="search-container">
          <input type="text" v-model="searchQuery" class="search-input" placeholder="Tìm kiếm sản phẩm..." />
          <button @click="handleSearch" class="search-button">
            🔍
          </button>
        </div>

          <!-- Nhà cung cấp -->
          <div class="supplier-select">
            <label for="supplier" class="select-label">Chọn Nhà Cung Cấp</label>
            <select v-model="selectedSupplier" id="supplier" class="form-select">
              <option v-for="supplier in suppliers" :key="supplier" :value="supplier">{{ supplier }}</option>
            </select>
          </div>
          <!-- Input giá -->
          <div class="price-input">
            <label for="price" class="input-label">Nhập Giá</label>
            <input type="number" id="price" v-model="price" class="form-input" placeholder="Nhập giá">
            <button @click="submitPrice" class="btn-ok">OK</button>
          </div>
          <!-- Mức giá tìm kiếm -->
          <div class="price-search">
            <label for="priceRange" class="select-label">Mức Giá</label>
            <div class="price-range">
              <div v-for="(range, index) in priceRanges" :key="index" class="price-item" @click="selectedPriceRange = range">
                {{ range }}
              </div>
            </div>
          </div>
          <!-- Nút OK ở cuối navbar -->
          <div class="navbar-footer">
            <button @click="handleNavbarOk" class="btn-ok">Xác Nhận</button>
          </div>
        </nav>
  
        <!-- Content -->
        <div class="content">
          <h2>List Product</h2>
  
          <!-- Loop through the products and display each one -->
          <div v-for="(product, index) in products" :key="index" class="product-frame">
            <img :src="product.image" alt="Product Image" class="product-image" />
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">Giá: {{ product.price }}k</p>
              <p class="product-quantity">Số lượng: {{ product.quantity }}</p>
              <p class="product-location">Vị trí: {{ product.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  const searchQuery = ref("");

const handleSearch = () => {
  alert(`Đang tìm kiếm: ${searchQuery.value}`);
};

  // Sample data for warehouses, floors, zones, racks, suppliers, and price ranges
  const warehouses = ref(["Kho 1", "Kho 2", "Kho 3"]);
  const floors = ref(["Tầng 1", "Tầng 2", "Tầng 3"]);
  const zones = ref({
    "Tầng 1": ["C1", "C2", "C3", "C4", "C5"],
    "Tầng 2": ["D1", "D2", "D3"],
    "Tầng 3": ["E1", "E2"]
  });
  const racks = ref({
    C1: ["Kệ 1", "Kệ 2"],
    C2: ["Kệ 3", "Kệ 4"],
    D1: ["Kệ 5", "Kệ 6"],
    E1: ["Kệ 7", "Kệ 8"]
  });
  const suppliers = ref(["Nhà Cung Cấp A", "Nhà Cung Cấp B", "Nhà Cung Cấp C"]);
  const priceRanges = ref(["Dưới 100k", "100k - 200k", "200k - 300k", "300k - 400k", "400k - 500k", "500k - 600k", "Trên 600k"]);
  
  // Sample products data
  const products = ref([
    {
      name: "Sản phẩm 1",
      price: 500,
      quantity: 100,
      location: "Tầng 1, C2, Kệ 3",
      image: "https://cdn.chotot.com/vTwjVrjU8FJ__W8Z6a-m4cPzvRgLs4z_HytY2_O1SsQ/preset:view/plain/e42c8c1eb20bfede15e2644fcd59f9f2-2825804544181120543.jpg"
    },
    {
      name: "Sản phẩm 2",
      price: 350,
      quantity: 200,
      location: "Tầng 1, C3, Kệ 4",
      image: "https://scontent.fkhh2-2.fna.fbcdn.net/v/t39.30808-6/476772171_1058337303005514_852211668641334725_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=EIC613r-m60Q7kNvgHPlKOm&_nc_oc=AdgtpkV84tNHg3Bh3id0rLZ9QgSDMdU_BqJyc0-Z6UuS5ycH-G7mHbNg9fEWpFxS_a0&_nc_zt=23&_nc_ht=scontent.fkhh2-2.fna&_nc_gid=Apk91kgNbV_4JbzyJDPIqfh&oh=00_AYBQx06G8SQzyvtfjmXGDiTqf4TYWqfU4mBiTe3bE_AQ0A&oe=67B2818D"
    },
    {
      name: "Sản phẩm 3",
      price: 150,
      quantity: 50,
      location: "Tầng 2, D1, Kệ 5",
      image: "https://scontent.fkhh2-2.fna.fbcdn.net/v/t39.30808-6/476772171_1058337303005514_852211668641334725_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=EIC613r-m60Q7kNvgHPlKOm&_nc_oc=AdgtpkV84tNHg3Bh3id0rLZ9QgSDMdU_BqJyc0-Z6UuS5ycH-G7mHbNg9fEWpFxS_a0&_nc_zt=23&_nc_ht=scontent.fkhh2-2.fna&_nc_gid=Apk91kgNbV_4JbzyJDPIqfh&oh=00_AYBQx06G8SQzyvtfjmXGDiTqf4TYWqfU4mBiTe3bE_AQ0A&oe=67B2818D"
    }
  ]);
  
  const selectedWarehouse = ref(warehouses.value[0]);
  const selectedFloor = ref(floors.value[0]);
  const selectedZone = ref(zones.value[selectedFloor.value][0]);
  const selectedRack = ref(racks.value[selectedZone.value][0]);
  const selectedSupplier = ref(suppliers.value[0]);
  const price = ref(null);
  const selectedPriceRange = ref(priceRanges.value[0]);
  
  // Handle button OK click next to input price
  const submitPrice = () => {
    alert(`Giá nhập là: ${price.value}`);
  };
  
  // Handle button OK click at the end of navbar
  const handleNavbarOk = () => {
    alert("Đã xác nhận");
  };
  </script>
  
  <style scoped>
 /* Toàn bộ trang */
 .page-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  height: 100vh;
}

/* Header */
.header {
background: linear-gradient(135deg, #3a7bd5, #d76d77);
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Container cho select */
.select-container {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.form-select {
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.form-select:hover {
  border-color: #4a90e2;
}

.form-select:focus {
  border-color: #2c5fb8;
  box-shadow: 0 0 8px rgba(44, 95, 184, 0.5);
}

/* Main Content */
.main-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  margin: 20px;
  overflow: auto;
}

/* Navbar */
.navbar {
  background: linear-gradient(135deg, #3a7bd5, #d76d77);
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: grid;
  gap: 20px;
  color: white;
}

/* Mức giá tìm kiếm */
.price-search {
  display: flex;
  flex-direction: column;
}

.price-range {
  display: block;
  margin-top: 10px;
}

.price-item {
  background-color: #1a1886;
  padding: 12px 15px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.price-item:hover {
  background-color: #4a90e2;
  color: white;
}

/* Nút OK */
.btn-ok {
  padding: 5px 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-ok:hover {
  background-color: #357ab7;
}

/* Content */
.content {
  overflow-y: auto;
  max-height: 70vh;
  background: linear-gradient(135deg, #ff9a9e, #ff6a00);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

/* Sản phẩm Frame */
.product-frame {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 5px solid #ff758c;
}

.product-frame:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  border-left: 5px solid #d76d77;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
}

.product-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  transition: color 0.3s ease;
}

.product-name:hover {
  color: #ff4d4d;
}

.product-price, .product-quantity, .product-location {
  font-size: 16px;
  color: #666;
}

/* Footer */
footer {
  background-color: #4a90e2;
  padding: 20px;
  text-align: center;
  color: white;
  font-size: 16px;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
}

.search-button {
  padding: 8px 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.search-button:hover {
  background-color: #357ab7;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  .navbar {
    display: block;
  }
  .price-range {
    grid-template-columns: 1fr 1fr;
  }
}

  </style>
  