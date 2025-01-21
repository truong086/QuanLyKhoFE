<template>
    <div class="warehouse-container">
      <h2>🏢 Warehouses</h2>
      <p>Select a warehouse to view its items!</p>
  
      <form class="add-warehouse-form">
        <input type="text" required placeholder="New Warehouse Name" />
        <button type="submit" class="add-button">Add Warehouse</button>
      </form>
  
      <ul class="warehouse-list">
        <li class="warehouse-item">
          <span>Warehouse 1</span>
          <button class="add-ware-button">Add Ware</button>
        </li>
        <li class="warehouse-item">
          <span>Warehouse 2</span>
          <button class="add-ware-button">Add Ware</button>
        </li>
      </ul>
  
      <div class="wares-section">
        <h3>📦 Items in Warehouse 1</h3>
        <ul class="ware-list">
          <li class="ware-item">
            Ware 1 - Cost Method: <strong>Method A</strong>
          </li>
          <li class="ware-item">
            Ware 2 - Cost Method: <strong>Method B</strong>
          </li>
        </ul>
      </div>
  
      <div class="error-message" v-if="errorMessage">
        {{ errorMessage }}
      </div>
  
      <!-- Modal for adding ware -->
      <div class="modal-overlay" v-if="isModalOpen">
        <div class="modal-content">
          <h3>Add New Ware</h3>
          <form>
            <input type="text" required placeholder="Ware Name" />
            <input type="text" required placeholder="Cost Method" />
            <input type="number" required placeholder="Price" />
            <input type="number" required placeholder="Stock" />
            <input type="text" required placeholder="Description" />
  
            <button type="submit">Add Ware</button>
            <button type="button">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WarehousePage',
    data() {
      return {
        isModalOpen: false,
        errorMessage: '',
      };
    },
  };
  </script>
  
  <style scoped>
  .warehouse-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
  }
  
  .add-warehouse-form {
    margin-bottom: 20px;
    display: flex; /* Align items horizontally */
  }
  
  .add-warehouse-form input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1; /* Take up remaining space */
  }
  
  .add-button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    margin-left: 10px; /* Space between input and button */
    cursor: pointer;
  }
  
  .warehouse-list {
    list-style-type: none;
    padding: 0;
  }
  
  .warehouse-item {
    display: flex; /* Align items horizontally */
    justify-content: space-between; /* Space between name and button */
    padding: 10px;
    border-bottom: 1px solid #ccc;
    transition: background-color 0.3s;
  }
  
  .warehouse-item:hover {
    background-color: #e0f7fa;
  }
  
  .add-ware-button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: transparent;
    cursor: pointer;
  }
  
  .ware-list {
    list-style-type: none;
    padding: 0;
  }
  
  .ware-item {
    margin-left: 20px;
  }
  
  .error-message {
    color: red;
    margin-top: 20px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
  }
  
  .modal-content input {
    margin-bottom: 10px;
  }
  </style>
  