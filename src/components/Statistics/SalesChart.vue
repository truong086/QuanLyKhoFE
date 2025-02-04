<script setup>
import { ref, watch, defineProps } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// Nhận dữ liệu từ props
const props = defineProps({
  products: Array,
  colorData: String,
  text: String
});


const series = ref([]);

const chartOptions = ref({
  chart: {
    type: 'bar',
    toolbar: { show: false },
  },
  colors: [props.colorData],
  xaxis: {
    categories: [],
  },
  tooltip: {
    enabled: true, // Bật tooltip
    custom: function({ seriesIndex, dataPointIndex, w }) {
      // Tùy chỉnh nội dung tooltip
      const product = w.globals.series[seriesIndex][dataPointIndex];
      const name = w.globals.labels[dataPointIndex]; // Tên sản phẩm
      const sales = product; // Số lượng bán
      const image = props.products[dataPointIndex].image; // URL ảnh sản phẩm

      return `
        <div style="padding: 10px; text-align: center;">
          <img src="${image}" alt="${name}" width="50" height="50" style="border-radius: 50%;" />
          <div><strong>Name: ${name}</strong></div>
          <div>${props.text}: ${sales}</div>
        </div>
      `;
    },
    style: {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      background: '#2f3e46', // Màu nền tooltip
      color: '#fff',         // Màu chữ tooltip
      borderRadius: '5px',   // Bo góc tooltip
      padding: '10px',       // Padding cho tooltip
    },
    theme: 'dark',           // Thêm theme tối nếu muốn
  },
});

watch(
  () => props.products,
  (newProducts) => {
    const names = [];
    const sales = [];

    newProducts.forEach((product) => {
      names.push(product.name);  // Tên người dùng
      sales.push(product.sales); // Số lượng bán
    });

    chartOptions.value.xaxis.categories = names;
    series.value = [{ name: props.text, data: sales }];
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <VueApexCharts :options="chartOptions" :series="series" height="400" />
  </div>
</template>

<style scoped>
button {
  margin-top: 10px;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>