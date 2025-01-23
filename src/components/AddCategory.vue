<template>
    <div class="container">
      <h1>Thêm Category Mới</h1>
      <form @submit.prevent="addCategory">
        <div>
          <label for="name">Tên Category:</label>
          <input type="text"  id="name" placeholder="Name of category..." />
        </div>

        <div>
          <label for="image">Hình ảnh:</label>
          <input type="file" @change="handleFileUpload" id="image" required />
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
</template>
  
  <script setup>
    import axiosInstance from "../axiosInstance";
    import {ref} from "vue";
    import { useCounterStore } from "../store";

        const category = ref({
            name: '',
            image: null
        });
        
        const handleFileUpload = (event) => {
            category.value.image = event.target.files[0];
        };

        const store = useCounterStore();
        const getToken = () => {
            
            const token = store.getToken;
            return {
                headers: { Authorization: `Bearer ${token}` }
            };
        }
      const addCategory = async () => {
        try {
            const formData = new FormData();
            formData.append('name', category.value.name);
            formData.append('image', category.value.image);

            const response = await axiosInstance.post('/api/Category/Add', formData, getToken());
            console.log('Category added:', response.data);
        } catch (error) {
            console.error('Error adding category:', error);
        }
      }
  </script>
  
  <style scoped>
  div {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }

  h1 {
    text-align: center;
    color: #333;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #45a049;
  }
</style>