<script setup>
import { defineProps, ref, watch } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

// Đăng ký các thành phần cần thiết
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  salesData: Array,
  text: String,
  backgroudColorData: String
});

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Số lượng sản phẩm bán",
      backgroundColor: props.backgroudColorData,
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      data: [],
    },
  ],
});

watch(
  () => props.salesData,
  (newData) => {
    chartData.value.labels = newData.map(item => `${props.text} ${item.month}`);
    chartData.value.datasets[0].data = newData.map(item => item.sales);
  },
  { immediate: true }
);
</script>

<template>
  <div style="height: 500px;">
    <Bar :data="chartData" :options="{ responsive: true, maintainAspectRatio: false }" />
  </div>
</template>