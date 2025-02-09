<template>
  <div>
    <div>
      <div>
        <button class="button">{{ warehourseName }}</button> =>
        <button class="button">{{ floorName }}</button> =>
        <button class="button">{{ areaName }} </button> =>
        <button class="button">{{ productDetail.name }}</button>
      </div>
    </div>
    <div
      v-if="productDetail"
      style="margin: 50px 0; padding-left: 60px; display: flex; flex-wrap: wrap;"
    >
      <div
        v-for="(item, index) in productDetail.productLocationAreas"
        style="
          box-shadow: 3px 2px 3px grey;
          width: 500px;
          border-radius: 10px;
          padding: 20px;
          border: 1px dashed black;
          margin: 20px 20px;
        "
        :key="index"
      >
        <img
          v-if="item.image"
          style="width: 300px; height: 300px;"
          :src="item.image"
          :class="'card-img-top' + '_' + item.id"
          alt=""
        />
        <div style="margin-top: 20px" v-if="item.images">
          <img
            v-on:click="swapImage('card-img-top' + '_' + item.id, itemp)"
            v-for="(itemp, indexp) in item.images"
            :key="indexp"
            :src="itemp"
            style="width: 35px; height: 35px; margin: 0 10px"
            alt=""
          />
        </div>
        <div
          class="card-body"
          style="display: flex; justify-content: space-around; margin: 20px 0"
        >
          <div>
            <h5
              class="card-title"
              style="font-weight: bold; margin: 20px 0; color: red"
            >
              Title: {{ item.name }}
            </h5>
            <p class="card-text">Price: {{ item.price?.toFixed(2) }}</p>
            <p class="card-text">Unit of measure: {{ item.inventory }}</p>
            <p style="font-weight: bold; color: blue;" class="card-text">Code: {{ item.code }}</p>
          </div>
          <div>
            <p>
              Supplier: {{ item.supplier }}
              <img
                v-if="item.supplier_image"
                style="width: 30px; height: 30px; border-radius: 50%"
                src=""
                alt=""
              />
            </p>
            <p>
              Category: {{ item.category }}
              <img
                :src="item.category_image"
                style="
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  margin: 0 15px;
                "
                alt=""
              />
            </p>
            <p>Quantity location: {{ item.quantity }}</p>
            <p>Location: {{ item.location }}</p>
          </div>
        </div>
        <a
          class="btn btn-primary"
          href="#"
          @click="backDetail(item.id_product)"
          >Back</a
        >
      </div>
    </div>
  </div>

  <!-- Hiển thị màn hình loading -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>Đang tải...</p>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "../store";

const store = useCounterStore();
const route = useRoute();
const router = useRouter();
const productDetail = ref({});
const warehourseName = ref('')
const floorName = ref('')
const areaName = ref('')
const isLoading = ref(false)

const getToken = () => {
  var token = store.getToken;
  var result = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return result;
};
const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;
onMounted(() => {
  if (route.query.id && route.query.warehoure && route.query.floor && route.query.area) {
    findOneWarehourse(decodeURIComponent(route.query.id));
    warehourseName.value = decodeURIComponent(route.query.warehoure)
    floorName.value = decodeURIComponent(route.query.floor)
    areaName.value = decodeURIComponent(route.query.area)
  }else{
    router.push({path: "SliderPage"})
  }
});

const swapImage = (classData, image) => {
  document.querySelector("." + classData).src = image;
};
const findOneWarehourse = async (id) => {
  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
  const res = await axios.get(
    hostName + `/api/Product/FindOneByArea?id=${id}`,
    getToken()
  );
  if(res.data.success){
    productDetail.value = res.data.content;
  }

  console.log(res)
  isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
  console.log(res);
};

const backDetail = (id) => {
  router.push({ path: "ChiTietSanPham", query: { id: id, name: "Detail" } });
};
</script>

<style scoped>
.button {
  outline: none;
  padding: 10px 20px;
  background-color: transparent;
  border-radius: 10px;
  border: 1px dashed green;
  font-weight: bold;
  color: blue;
  width: 200px;
}
img {
    mix-blend-mode: multiply; /* Hoặc screen tùy vào màu nền */
}
</style>
