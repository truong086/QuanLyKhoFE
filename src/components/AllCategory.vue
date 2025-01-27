<template>
    <div class="container">
      <h1>Danh sách Category</h1>
      <table>
        <thead>
          <tr>
            <th>Tên Category</th>
            <th>Hình ảnh</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td><img :src="category.image" alt="Category Image" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axiosInstance from '../axiosInstance';
  import { useCounterStore } from '../store';
  
  const categories = ref([]);
  const store = useCounterStore();
  
  const getToken = () => {
    const token = store.getToken;
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };
  
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/api/Category/FindAll?page=1&pageSize=200', getToken());
      categories.value = response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  onMounted(() => {
    fetchCategories();
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
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
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }
  
  img {
    max-width: 100px;
    height: auto;
  }
  </style>
  