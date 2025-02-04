<template>
    <div class="container">
      <div class="button-group">
        <button class="all" @click="showData('all', 'all')">Plan của {{ store.getIdAccountName }}</button>
        <button class="lichsu" @click="showData('lichsu', 'lichsu')">
          Lịch sử của {{ store.getIdAccountName }}
        </button>
        <button class="NoReceiver" @click="showData('NoReceiver', 'NoReceiver')">
          Plan chưa có người nhận
        </button>
      </div>
  
      <div style="height: auto" class="result">
        <!-- New Frame Below Product - First Warehouse -->
        <div v-for="(item, index) in currentPlanData" :key="index">
          <div
            class="warehouse-frame"
            v-if="item.isConfirmation && item.status !== 'done'"
            style="background-color: rgba(11, 176, 217, 0.2)"
          >
            <div class="warehouse-info" style="z-index: 1000">
              <h2 style="font-weight: bold">Plan Name: {{ item.title }}</h2>
              <p>
                Location Old: {{ item.warehouseOld }} => {{ item.floorOld }} =>
                {{ item.areaOld }} => {{ item.localtionOld }}
              </p>
              <p style="font-size: 20px">⏬</p>
              <p>
                Location New: {{ item.warehouse }} => {{ item.floor }} =>
                {{ item.area }} => {{ item.localtionNew }}
              </p>
              <h5>Account Create: {{ item.account_creatPlan }}</h5>
              <h5>
                Status:
                <a style="font-weight: bold; color: red">{{ item.status }}</a>
              </h5>
              <h5>
                Receiver:
                <a style="font-weight: bold; color: violet">{{
                  item.receiver_name
                }}</a>
                <img
                  v-if="item.receiver_image"
                  :src="item.receiver_image"
                  style="width: 30px; height: 30px; border-radius: 50%"
                  alt=""
                />
              </h5>
              <h5>
                Thời gian update gần nhất:
                <a style="font-weight: bold; color: violet">{{
                  formatDateTime(item.updatedAt)
                }}</a>
              </h5>
            </div>
            <button
              v-if="item.isConfirmation"
              class="btn btn-location"
              style="margin-left: 50px; background-color: rgba(11, 176, 217, 0.8)"
              @click="NextMap(item.id)"
            >
              Chi tiết
            </button>
            <button
              v-else
              class="btn btn-location"
              style="margin-left: 50px; background-color: yellow; color: black"
              @click="NextMap(item.id)"
            >
              Chi tiết
            </button>
          </div>
          <div
            class="warehouse-frame"
            v-else-if="item.isConfirmation && item.status === 'done'"
            :style="
              item.isConfirmation
                ? 'background: rgba(52, 199, 62, 0.2); '
                : 'background: rgba(247, 231, 5, 0.2);'
            "
          >
            <div class="warehouse-info" style="z-index: 1000">
              <h2 style="font-weight: bold">Plan Name: {{ item.title }}</h2>
              <p>
                Location Old: {{ item.warehouseOld }} => {{ item.floorOld }} =>
                {{ item.areaOld }} => {{ item.localtionOld }}
              </p>
              <p style="font-size: 20px">⏬</p>
              <p>
                Location New: {{ item.warehouse }} => {{ item.floor }} =>
                {{ item.area }} => {{ item.localtionNew }}
              </p>
              <h5>Account Create: {{ item.account_creatPlan }}</h5>
              <h5>
                Status:
                <a style="font-weight: bold; color: red">{{ item.status }}</a>
              </h5>
              <h5>
                Receiver:
                <a style="font-weight: bold; color: violet">{{
                  item.receiver_name
                }}</a>
                <img
                  v-if="item.receiver_image"
                  :src="item.receiver_image"
                  style="width: 30px; height: 30px; border-radius: 50%"
                  alt=""
                />
              </h5>
              <h5>
                Thời gian update gần nhất:
                <a style="font-weight: bold; color: violet">{{
                  formatDateTime(item.updatedAt)
                }}</a>
              </h5>
            </div>
            <button
              v-if="item.isConfirmation"
              class="btn btn-location"
              style="margin-left: 50px"
              @click="NextMap(item.id)"
            >
              Chi tiết
            </button>
            <button
              v-else
              class="btn btn-location"
              style="margin-left: 50px; background-color: yellow; color: black"
              @click="NextMap(item.id)"
            >
              Chi tiết
            </button>
          </div>
          <div
            class="warehouse-frame"
            v-else
            style="background-color: rgba(247, 231, 5, 0.2);"
          >
            <div class="warehouse-info" style="z-index: 1000">
              <h2 style="font-weight: bold">Plan Name: {{ item.title }}</h2>
              <p>
                Location Old: {{ item.warehouseOld }} => {{ item.floorOld }} =>
                {{ item.areaOld }} => {{ item.localtionOld }}
              </p>
              <p style="font-size: 20px">⏬</p>
              <p>
                Location New: {{ item.warehouse }} => {{ item.floor }} =>
                {{ item.area }} => {{ item.localtionNew }}
              </p>
              <h5>Account Create: {{ item.account_creatPlan }}</h5>
              <h5>
                Status:
                <a style="font-weight: bold; color: red">{{ item.status }}</a>
              </h5>
              <h5>
                Receiver:
                <a style="font-weight: bold; color: violet">{{
                  item.receiver_name
                }}</a>
                <img
                  v-if="item.receiver_image"
                  :src="item.receiver_image"
                  style="width: 30px; height: 30px; border-radius: 50%"
                  alt=""
                />
              </h5>
              <h5>
                Thời gian update gần nhất:
                <a style="font-weight: bold; color: violet">{{
                  formatDateTime(item.updatedAt).includes("01/01/1 08:06")
                    ? "Chưa Update"
                    : formatDateTime(item.updatedAt)
                }}</a>
              </h5>
            </div>
            <button
              v-if="item.isConfirmation"
              class="btn btn-location"
              style="margin-left: 50px"
              @click="NextMap(item.id)"
            >
              Chi tiết
            </button>
            <button
              v-else
              class="btn btn-location"
              style="margin-left: 50px; background-color: yellow; color: black"
              @click="NextMap(item.id)"
            >
              Chi tiết
            </button>
          </div>
        </div>
      </div>
      <PagesTotal
        :page="page"
        :totalPage="totalPage"
        :valueE="valueE"
        @pageChange="findAllData"
        @pageSizeChange="changeReload"
      ></PagesTotal>
    </div>
  
    <!-- Hiển thị màn hình loading -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Đang tải...</p>
    </div>
  </template>
  
  <script setup>
  import { useCounterStore } from "../../store";
  import { ref, getCurrentInstance, watch } from "vue";
  import PagesTotal from "../PageList/PagesTotal.vue";
  import axios from "axios";
  import { useToast } from "vue-toastification";
  import { useRouter } from "vue-router";
  const valueE = ref("");
  const isLoading = ref(false);
  const store = useCounterStore();
  const Toast = useToast();
  const page = ref(1);
  const totalPage = ref(0);
  const pageSize = ref(5);
  const currentPlanData = ref([]);
  const router = useRouter();
  const { proxy } = getCurrentInstance();
  const hostName = proxy?.hostname;
  const isButton = ref("");
  const typePlan = ref("");
  
  watch(page.value, (newPage) => {
    findAllData(valueE.value, newPage);
  });
  
  const NextMap = (id) => {
    router.push({ path: "DetailPlan", query: { id: id, name: "Detail Plan" } });
  };
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
  
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
  
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  const getToken = () => {
    var token = store.getToken;
    var result = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return result;
  };
  const findAllData = async (search, pageData) => {
    isLoading.value = true;
    document.body.classList.add("loading"); // Add Lớp "loading"
    document.body.style.overflow = "hidden";
    if (typePlan.value === "all") {
      const res =
        search === ""
          ? await axios.get(
              hostName +
                `/api/Plan/FindConfirmationByAccount?page=${pageData}&pageSize=${pageSize.value}`,
              getToken()
            )
          : await axios.get(
              hostName +
                `/api/Plan/FindConfirmationByAccount?name=${search}&page=${pageData}&pageSize=${pageSize.value}`,
              getToken()
            );
  
      if (res.data.success) {
        page.value = res.data.content.page;
        totalPage.value = res.data.content.totalPages;
        currentPlanData.value = res.data.content.data;
      }else{
        page.value = 1
        totalPage.value = 0
        currentPlanData.value = []
      }
    } else if (typePlan.value === "lichsu") {
      const res =
        search === ""
          ? await axios.get(
              hostName +
                `/api/Plan/FindDoneByAccount?page=${pageData}&pageSize=${pageSize.value}`,
              getToken()
            )
          : await axios.get(
              hostName +
                `/api/Plan/FindDoneByAccount?name=${search}&page=${pageData}&pageSize=${pageSize.value}`,
              getToken()
            );
  
      if (res.data.success) {
        page.value = res.data.content.page;
        totalPage.value = res.data.content.totalPages;
        currentPlanData.value = res.data.content.data;
      }else{
        page.value = 1
        totalPage.value = 0
        currentPlanData.value = []
      }
    } else if (typePlan.value === "NoReceiver") {
      const res =
        search === ""
          ? await axios.get(
              hostName +
                `/api/Plan/FindNoConfirmationAdmin?page=${pageData}&pageSize=${pageSize.value}`,
              getToken()
            )
          : await axios.get(
              hostName +
                `/api/Plan/FindNoConfirmationAdmin?name=${search}&page=${pageData}&pageSize=${pageSize.value}`,
              getToken()
            );
  
      if (res.data.success) {
        page.value = res.data.content.page;
        totalPage.value = res.data.content.totalPages;
        currentPlanData.value = res.data.content.data;
      }else{
        page.value = 1
        totalPage.value = 0
        currentPlanData.value = []
      }
    }
    Toast.success("Success");
    isLoading.value = false;
    document.body.classList.remove("loading");
    document.body.style.overflow = "auto";
  };
  
  const changeReload = (event) => {
    pageSize.value = event;
    findAllData(valueE.value, page.value);
  };
  
  const showData = (data, type) => {
    if (isButton.value != "") {
      document.querySelector("." + isButton.value).style.backgroundColor =
        "white";
      document.querySelector("." + isButton.value).style.color = "black";
    }
  
    document.querySelector("." + data).style.backgroundColor = "#45a049";
    document.querySelector("." + data).style.color = "white";
    isButton.value = data;
    typePlan.value = type;
  
    findAllData(valueE.value, page.value);
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    margin-top: 20px;
    background: linear-gradient(135deg, #f0f0f0, #dcdcdc);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .button-group {
    display: flex;
    justify-content: center;
    padding-top: 0;
  }
  button {
    padding: 12px 20px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    background: white;
    color: black;
    font-weight: bold;
    transition: all 0.3s ease;
    width: 400px;
  }
  button:hover {
    background: #45a049;
    transform: scale(1.1);
  }
  .result {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #222;
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  /* Warehouse Frame */
  .warehouse-frame {
    width: 100%;
    padding: 15px;
    display: flex;
    align-items: center;
    background: #f9f9f9;
    margin-top: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .warehouse-img img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .warehouse-info {
    margin-left: 1rem;
  }
  
  .warehouse-info h5 {
    font-size: 1.25rem;
    color: #333;
  }
  
  .warehouse-info p {
    font-size: 0.875rem;
    color: #555;
  }
  
  .btn-location {
    background-color: #28a745;
    border: none;
    padding: 0.5rem 1rem;
    color: white;
    text-transform: uppercase;
    font-size: 0.875rem;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .btn-location:hover {
    background-color: #218838;
  }
  </style>
  