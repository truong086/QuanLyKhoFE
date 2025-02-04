<template>
    <div>
      <BarChart :chart-data="props.chartData" :chart-options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  const props = defineProps({
    chartData: Object,
  });
  
  // Custom plugin để vẽ ảnh lên từng thanh cột
  const imagePlugin = {
    id: "imagePlugin",
    afterDatasetsDraw(chart) {
      const { ctx, scales } = chart;
      const dataset = chart.data.datasets[0];
  
      dataset.data.forEach((value, index) => {
        const x = scales.x.getPixelForTick(index); // Lấy vị trí X của cột
        const y = scales.y.getPixelForValue(value); // Lấy vị trí Y theo giá trị
  
        const img = new Image();
        img.src = dataset.images[index]; // Lấy ảnh ứng với sản phẩm
  
        img.onload = () => {
          ctx.drawImage(img, x - 15, y - 40, 30, 30); // Vẽ ảnh lên đúng vị trí
        };
      });
    },
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
      imagePlugin, // Thêm plugin vào biểu đồ
    },
  };
  </script>