<template>
    <div class="container">
      <!-- Frame 1: Single Product -->
      <div class="panel panel-primary frame">
        <!-- Panel Header -->
        <div class="panel-heading">
          <h3 class="panel-title title">{{ product.name }}</h3>
        </div>
  
        <!-- Panel Body with Image at the Top -->
        <div class="panel-body">
          <div class="text-center">
            <img :src="product.image" alt="Product Image" class="customimage" />
          </div>
          <p><strong>Price:</strong> ${{ product.price }}</p>
          <p><strong>Description:</strong> {{ product.description }}</p>
          <p><strong>Features:</strong></p>
          <div v-for="(feature, idx) in product.features" :key="idx" class="feature">{{ feature }}</div>
          <div class="text-center">
            <button @click="viewDetails" class="btn btn-info">Details -></button>
          </div>
        </div>
      </div>
  
      <!-- Frame 2: Warehouse Info -->
      <div class="panel panel-default frame">
        <div class="panel-body">
          <div class="row align-items-center">
            <div class="col-md-3 text-center">
              <img :src="product.image" alt="Warehouse Product Image" class="customimage-smaller" />
            </div>
            <div class="col-md-9">
              <p class="title">Tên kho: kho1 → tầng3 → khu7</p>
              <div class="text-end">
                <button class="btn btn-primary btn-hover">Tìm trên Map</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Frame 3: Warehouse Info (Duplicate for another location) -->
      <div class="panel panel-default frame">
        <div class="panel-body">
          <div class="row align-items-center">
            <div class="col-md-3 text-center">
              <img :src="product.image" alt="Warehouse Product Image" class="customimage-smaller" />
            </div>
            <div class="col-md-9">
              <p class="title">Tên kho: kho2 → tầng5 → khu9</p>
              <div class="text-end">
                <button class="btn btn-primary btn-hover">Tìm trên Map</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          name: "Bikini Red",
          price: "5.99",
          description: "Fresh organic tomatoes available in stock.",
          image: "https://blogcongnghe247.com/wp-content/uploads/2023/08/tong-hop-anh-3D-my-do-toa-dau-pha-thuong-khung-5.jpg",
          features: ["Rich in vitamins", "Organic", "Farm fresh"],
        },
      };
    },
    methods: {
      viewDetails() {
        alert("Details for " + this.product.name);
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
    background-color: #f8f9fa; /* Light gray background */
    padding: 15px;
    border-radius: 8px;
  }
  
  .customimage {
    width: 100%;
    max-width: 300px;
    height: auto;
    margin: 15px auto;
    display: block;
    border: 3px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .customimage-smaller {
    width: 100%;
    max-width: 100px;
    height: auto;
    border: 3px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .panel-primary .panel-heading {
    background: linear-gradient(90deg, #0275d8, #0056b3);
    color: white;
    font-weight: bold;
    text-align: center;
    padding: 10px;
    font-size: 1.5rem;
    border-radius: 8px 8px 0 0;
  }
  
  .panel-default {
    margin-top: 15px;
    border: 1px solid #ddd;
    background-color: #ffffff;
  }
  
  .panel-body {
    padding: 15px;
  }
  
  .btn-info {
    font-size: 16px;
    padding: 10px 20px;
    background-color: #5bc0de;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  
  .btn-info:hover {
    background-color: #31b0d5;
    box-shadow: 0 4px 8px rgba(49, 176, 213, 0.4);
  }
  
  .btn-primary {
    font-size: 14px;
    padding: 8px 16px;
    background-color: #0275d8;
    border: none;
    border-radius: 5px;
    color: white;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  
  .btn-primary:hover {
    background-color: #0256a8;
    box-shadow: 0 4px 8px rgba(2, 86, 168, 0.4);
  }
  
  .btn-hover {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 5px rgba(0, 117, 216, 0.5);
    }
    50% {
      box-shadow: 0 0 15px rgba(0, 117, 216, 0.9);
    }
  }
  
  .frame {
    border: 2px solid #000;
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
  }
  
  .title {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
    text-transform: uppercase;
  }
  
  .feature {
    margin-left: 15px;
    font-size: 14px;
  }
  
  .text-end {
    text-align: end;
  }
  </style>
  