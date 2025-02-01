<template>
  <div id="app">
    <header>
      <h3>Product Details</h3>
    </header>

    <main>
      <div class="product-detail">
        <div class="card">
          <img class="card-img-top" :src="product.image" alt="">

          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">
              <strong>Price: </strong>${{ product.price.toFixed(2) }}
              <br>
              <strong>DonViTinh: </strong>{{ product.donViTinh }}
              <br>
              <strong>Category: </strong>{{ product.CategoryName }}
            </p>
            <a class="btn btn-primary" href="#">Chi tiết</a>
          </div>
        </div>
      </div>

      <!-- New Frame Below Product - First Warehouse -->
      <div class="warehouse-frame">
        <div class="warehouse-img">
          <img :src="warehouse1.image" alt="Warehouse Image">
        </div>
        <div class="warehouse-info">
          <h5>{{ warehouse1.name }}</h5>
          <p>{{ warehouse1.location }}</p>
        </div>
        <button class="btn btn-location">Location</button>
      </div>

      <!-- New Frame Below Product - Second Warehouse -->
      <div class="warehouse-frame">
        <div class="warehouse-img">
          <img :src="warehouse2.image" alt="Warehouse Image">
        </div>
        <div class="warehouse-info">
          <h5>{{ warehouse2.name }}</h5>
          <p>{{ warehouse2.location }}</p>
        </div>
        <button class="btn btn-location">Location</button>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    // Product Data
    const product = ref({
      name: 'Product 1',
      CategoryName: 'Home',
      donViTinh: 'Easy',
      price: 100.00,
      image: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=800'
    })
    
    // Warehouse Data - First Warehouse
    const warehouse1 = ref({
      image: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=800',
      name: 'Main Warehouse',
      location: 'Kho-1-Tầng-2-Khu-A'
    })

    // Warehouse Data - Second Warehouse
    const warehouse2 = ref({
      image: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=800',
      name: 'Secondary Warehouse',
      location: 'Kho-2-Tầng-3-Khu-B'
    })

    return {
      product,
      warehouse1,
      warehouse2
    }
  }
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

header {
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
}

h3 {
  font-size: 2rem;
  color: #333;
}

main {
  background: #fff;
  padding: 2rem;
  width: 80%;
  max-width: 1200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 2rem;
}

footer {
  width: 100%;
  background: #fff;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.product-detail {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-img-top {
  max-width: 100%;
  height: 300px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.875rem;
  color: #555;
}

.card-text span {
  display: block;
  margin-bottom: 0.25rem;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  text-transform: uppercase;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

footer small {
  font-size: 0.875rem;
  color: #888;
}

/* Warehouse Frame */
.warehouse-frame {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.warehouse-img img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.warehouse-info {
  flex-grow: 1;
  margin-left: 1rem;
}

.warehouse-info h5 {
  font-size: 1.25rem;
  color: #333;
}

.warehouse-info p {
  font-size: 0.875rem;
  color: #555;
}

.btn-location {
  background-color: #28a745;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  text-transform: uppercase;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-location:hover {
  background-color: #218838;
}

footer small {
  font-size: 0.875rem;
  color: #888;
}
</style>
