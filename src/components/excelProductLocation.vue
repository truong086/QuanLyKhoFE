<template>
    <button class="btn" style="border: 1px solid greenyellow;" @click="dowloadData">Dowdload Excel Product Location</button>

    <!-- Hiển thị màn hình loading -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, getCurrentInstance } from "vue";
import { useCounterStore } from "../store";

const isLoading = ref(false);
const store = useCounterStore();
const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;

const dowloadData = async() => {
    isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";

  const res = await axios.post(hostName + '/api/Product/FindAllDataByDateExcel', {}, {
      headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.getToken}`
                },
                responseType: 'blob' // Cực kỳ quan trọng! Không có sẽ bị lỗi file
    })

    const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ProductLocation.xlsx'; // Đặt tên file khi tải xuống
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
}
</script>