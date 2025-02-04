<template>
  <div>
    <h2>Thống kê bán hàng với Ảnh</h2>
    <VueECharts :options="chartOptions" style="height: 400px;" />
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';
import VueECharts from 'vue-echarts';

// Nhận dữ liệu từ props
const props = defineProps({
  products: Array,
});

const chartOptions = ref({
  title: {
    text: 'Sản phẩm bán được',
  },
  tooltip: {
    trigger: 'item',
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'bar',
      barWidth: '50%',
      itemStyle: {
        color: '#FF5733',  // Màu thanh
      },
    },
  ],
  graphic: [],
});

watch(
  () => props.products,
  (newProducts) => {
    const names = [];
    const sales = [];
    const images = [];

    newProducts.forEach((product) => {
      names.push(product.name);  // Tên sản phẩm
      sales.push(product.sales); // Số lượng bán
      images.push(product.image); // URL ảnh
    });

    chartOptions.value.xAxis.data = names;
    chartOptions.value.series[0].data = sales;

    // Thêm ảnh vào graphic của ECharts
    chartOptions.value.graphic = names.map((name, index) => ({
      type: 'image',
      id: `image-${index}`,
      left: `${index * 80 + 20}%`, // Điều chỉnh vị trí ảnh
      top: '80%',  // Đặt ảnh ở dưới thanh bar
      style: {
        image: images[index],
        width: 40,
        height: 40,
        opacity: 1,
      },
    }));
  },
  { immediate: true }
);
</script>