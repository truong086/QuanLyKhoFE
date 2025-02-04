<template>
  <div id="app">
    <header>
      <h3>Products</h3>
    </header>

    <main>
      <h6>{{ filteredProducts.length }} results</h6>
      <p v-if="activeFilters.length">
        <small class="text-muted"
          >Filtered by {{ activeFilters.join(", ") }}</small
        >
      </p>
      <div class="product-grid">
        <div
          class="card"
          v-for="(product, index) in products"
          :key="index"
        >
          <img class="card-img-top" :src="product.images[0]" alt="" />

          <div class="card-body">
            <h5 class="card-title" style="margin: 25px 0; font-weight: bold; color: red;">{{ product.title }}</h5>
            <p class="card-text">
              <span>Price: ${{ product.price.toFixed(2) }}</span>
              <br />
              <span>DonViTinh: {{ product.donViTinh }}</span>
              <br />
              <span>Quantity: {{ product.quantity }}</span>
              <br />
              <span style="color: violet;">Category: {{ product.categoryName }}
                <img style="width: 30px; height: 30px; border-radius: 50%;" :src="product.categoryImage" alt="">
              </span>
            </p>
            <a class="btn btn-primary" @click="Next(product.id)" href="#">Chi tiết</a>
          </div>
        </div>
        
      </div>
      <PagesTotal
          :page="page"
          :totalPage="totalPage"
          :valueE="valueE"
          @pageChange="findAllProduct"
          @pageSizeChange="changeReload"
        ></PagesTotal>
    </main>

    <footer>
      <p>
        <small class="text-muted"
          >{{ products.length }} total /
          {{ filteredProducts.length }} shown</small
        >
      </p>
    </footer>
  </div>

  <!-- Hiển thị màn hình loading -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>Đang tải...</p>
  </div>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import PagesTotal from "./PageList/PagesTotal.vue";
import { useCounterStore } from "../store";

const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;
const Toast = useToast();
const router = useRouter();
const store = useCounterStore();
const products = ref([]);
const page = ref(1);
const totalPage = ref(0);
const pageSize = ref(5);
const isLoading = ref(false);
const valueE = ref("");
onMounted(() => {
  findAllProduct(valueE.value, page.value);
});
watch(page.value, (newPage) => {
  findAllProduct(valueE.value, newPage);
});
const findAllProduct = async (search, pageData) => {
  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
  const res =
    search === ""
      ? await axios.get(
          hostName +
            `/api/Product/FindAll?page=${pageData}&pageSize=${pageSize.value}`,
          getToken()
        )
      : await axios.get(
          hostName +
            `/api/Product/FindAll?page=${pageData}&name=${search}&pageSize=${pageSize.value}`,
          getToken()
        );

  if (res.data.success) {
    page.value = res.data.content.page;
    totalPage.value = res.data.content.totalPages;
    products.value = res.data.content.data;
  }
  isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
  console.log(res);
  Toast.success("Sucess");
  console.log(router);
};

const getToken = () => {
  var token = store.getToken;
  var result = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return result;
};
const changeReload = (event) => {
  pageSize.value = event;
  findAllProduct(valueE.value, page.value);
};
const activeFilters = ref([]);

const Next = (id) => {
  router.push({path: "/ChiTietSanPham", query: {id: id, name: "Details"}})
}
// const uses = computed(() => [...new Set(products.value.map(p => p.CategoryName))])
// const skills = computed(() => [...new Set(products.value.map(p => p.donViTinh))])

// const filters = computed(() => ({
//   'Category': uses.value,
//   'donViTinh': skills.value
// }))

const filteredProducts = computed(() => {
  if (activeFilters.value.length === 0) return products.value;
  return products.value.filter(
    (prod) =>
      activeFilters.value.includes(prod.skill) ||
      activeFilters.value.includes(prod.usage)
  );
});

// const clearFilters = () => {
//   activeFilters.value = []
// }

watch(activeFilters, (newVal) => {
  location.hash = newVal.join(",");
});
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  padding: 2rem;
  font-family: "Arial", sans-serif;
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
  width: 90%;
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

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
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

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  max-width: 100%;
  height: 200px;
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
  font-weight: bold;
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
strong {
  font-weight: bold;
}
</style>
