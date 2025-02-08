<template>
  <div id="app">
    <header>
      <h3>Plan Details</h3>
    </header>

    <main>
      <div class="product-detail">
        <div
          class="card"
          v-if="data.isConfirmation && data.status !== 'done'"
          style="background-color: rgba(11, 176, 217, 0.1); border-radius: 15px"
        >
          <div class="card-body">
            <h2 class="card-title" style="font-weight: bold; margin: 25px 0">
              Title: <a style="color: red">{{ data.title }}</a>
            </h2>
            <p style="font-size: 18px" class="card-text">
              Location Old:
              <img
                v-if="data.imageWarehourseOld"
                :src="data.imageWarehourseOld"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.warehouseOld }} =>
              <img
                v-if="data.imageFloorOld"
                style="width: 30px; height: 30px; border-radius: 50%"
                :src="data.imageFloorOld"
                alt=""
              />
              {{ data.floorOld }} =>
              <img
                v-if="data.imageAreaeOld"
                :src="data.imageAreaeOld"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.areaOld }} => {{ data.localtionOld }} ({{ data.localtionOldCode }})
            </p>
            <p class="card-text" style="font-size: 20px">⏬</p>
            <p style="font-size: 18px" class="card-text">
              Location New:
              <img
                v-if="data.imageWarehourseNew"
                :src="data.imageWarehourseNew"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.warehouse }} =>
              <img
                v-if="data.imageFloorNew"
                style="width: 30px; height: 30px; border-radius: 50%"
                :src="data.imageFloorNew"
                alt=""
              />
              {{ data.floor }} =>
              <img
                v-if="data.imageAreaeNew"
                :src="data.imageAreaeNew"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.area }} => {{ data.localtionNew }} ({{ data.localtionNewCode }})
            </p>
            <p style="font-weight: bold; margin: 30px 0; color: blueviolet">
              Account creat Plan: {{ data.account_creatPlan }}
            </p>
            <p>
              Receiver: {{ data.receiver_name }}
              <img
                v-if="data.receiver_image"
                :src="data.receiver_image"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
            </p>

            <p style="font-size: 18px">
              Status:
              <a style="color: red; font-weight: bold">{{ data.status }}</a>
            </p>
            <p style="font-size: 18px">
              Update Date:
              <a style="font-weight: bold">{{
                formatDateTime(data.updatedAt).includes("01/01/1 08:06")
                  ? "Chưa cập nhật thời gian"
                  : formatDateTime(data.updatedAt)
              }}</a>
            </p>
            <p>Description: {{ data.description }}</p>
            <button
              v-if="data.isConfirmation"
              style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                outline: none;
                border: 1px solid greenyellow;
                background: transparent;
                font-size: 20px;
              "
            >
              <i class="fa fa-check" aria-hidden="true"></i>
            </button>
            <button
              v-on:click="updateReceiver"
              v-else
              style="
                animation: NoConfirmation 0.5s ease-in infinite;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                outline: none;
                border: 1px solid yellow;
                background: transparent;
                font-size: 20px;
              "
            >
              <i class="fa fa-handshake-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div
          class="card"
          v-else-if="data.isConfirmation && data.status === 'done'"
          style="background: rgba(52, 199, 62, 0.1); border-radius: 15px"
        >
          <div class="card-body">
            <h2 class="card-title" style="font-weight: bold; margin: 25px 0">
              Title: <a style="color: red">{{ data.title }}</a>
            </h2>
            <p style="font-size: 18px" class="card-text">
              Location Old:
              <img
                v-if="data.imageWarehourseOld"
                :src="data.imageWarehourseOld"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.warehouseOld }} =>
              <img
                v-if="data.imageFloorOld"
                style="width: 30px; height: 30px; border-radius: 50%"
                :src="data.imageFloorOld"
                alt=""
              />
              {{ data.floorOld }} =>
              <img
                v-if="data.imageAreaeOld"
                :src="data.imageAreaeOld"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.areaOld }} => {{ data.localtionOld }} ({{ data.localtionOldCode }})
            </p>
            <p class="card-text" style="font-size: 20px">⏬</p>
            <p style="font-size: 18px" class="card-text">
              Location New:
              <img
                v-if="data.imageWarehourseNew"
                :src="data.imageWarehourseNew"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.warehouse }} =>
              <img
                v-if="data.imageFloorNew"
                style="width: 30px; height: 30px; border-radius: 50%"
                :src="data.imageFloorNew"
                alt=""
              />
              {{ data.floor }} =>
              <img
                v-if="data.imageAreaeNew"
                :src="data.imageAreaeNew"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.area }} => {{ data.localtionNew }} ({{ data.localtionNewCode }})
            </p>
            <p style="font-weight: bold; margin: 30px 0; color: blueviolet">
              Account creat Plan: {{ data.account_creatPlan }}
            </p>
            <p>
              Receiver: {{ data.receiver_name }}
              <img
                v-if="data.receiver_image"
                :src="data.receiver_image"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
            </p>

            <p style="font-size: 18px">
              Status:
              <a style="color: red; font-weight: bold">{{ data.status }}</a>
            </p>
            <p style="font-size: 18px">
              Update Date:
              <a style="font-weight: bold">{{
                formatDateTime(data.updatedAt).includes("01/01/1 08:06")
                  ? "Chưa cập nhật thời gian"
                  : formatDateTime(data.updatedAt)
              }}</a>
            </p>
            <p>Description: {{ data.description }}</p>
            <button
              v-if="data.isConfirmation"
              style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                outline: none;
                border: 1px solid greenyellow;
                background: transparent;
                font-size: 20px;
              "
            >
              <i class="fa fa-check" aria-hidden="true"></i>
            </button>
            <button
              v-on:click="updateReceiver"
              v-else
              style="
                animation: NoConfirmation 0.5s ease-in infinite;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                outline: none;
                border: 1px solid yellow;
                background: transparent;
                font-size: 20px;
              "
            >
              <i class="fa fa-handshake-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div
          class="card"
          v-else
          style="background: rgba(247, 231, 5, 0.1); border-radius: 15px"
        >
          <div class="card-body">
            <h2 class="card-title" style="font-weight: bold; margin: 25px 0">
              Title: <a style="color: red">{{ data.title }}</a>
            </h2>
            <p style="font-size: 18px" class="card-text">
              Location Old:
              <img
                v-if="data.imageWarehourseOld"
                :src="data.imageWarehourseOld"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.warehouseOld }} =>
              <img
                v-if="data.imageFloorOld"
                style="width: 30px; height: 30px; border-radius: 50%"
                :src="data.imageFloorOld"
                alt=""
              />
              {{ data.floorOld }} =>
              <img
                v-if="data.imageAreaeOld"
                :src="data.imageAreaeOld"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.areaOld }} => {{ data.localtionOld }} ({{ data.localtionOldCode }})
            </p>
            <p class="card-text" style="font-size: 20px">⏬</p>
            <p style="font-size: 18px" class="card-text">
              Location New:
              <img
                v-if="data.imageWarehourseNew"
                :src="data.imageWarehourseNew"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.warehouse }} =>
              <img
                v-if="data.imageFloorNew"
                style="width: 30px; height: 30px; border-radius: 50%"
                :src="data.imageFloorNew"
                alt=""
              />
              {{ data.floor }} =>
              <img
                v-if="data.imageAreaeNew"
                :src="data.imageAreaeNew"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
              {{ data.area }} => {{ data.localtionNew }} ({{ data.localtionNewCode }})
            </p>
            <p style="font-weight: bold; margin: 30px 0; color: blueviolet">
              Account creat Plan: {{ data.account_creatPlan }}
            </p>
            <p>
              Receiver: {{ data.receiver_name }}
              <img
                v-if="data.receiver_image"
                :src="data.receiver_image"
                style="width: 30px; height: 30px; border-radius: 50%"
                alt=""
              />
            </p>

            <p style="font-size: 18px">
              Status:
              <a style="color: red; font-weight: bold">{{ data.status }}</a>
            </p>
            <p style="font-size: 18px">
              Update Date:
              <a style="font-weight: bold">{{
                formatDateTime(data.updatedAt).includes("01/01/1 08:06")
                  ? "Chưa cập nhật thời gian"
                  : formatDateTime(data.updatedAt)
              }}</a>
            </p>
            <p>Description: {{ data.description }}</p>
            <button
              v-if="data.isConfirmation"
              style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                outline: none;
                border: 1px solid greenyellow;
                background: transparent;
                font-size: 20px;
              "
            >
              <i class="fa fa-check" aria-hidden="true"></i>
            </button>
            <button
              v-on:click="updateReceiver"
              v-else
              style="
                animation: NoConfirmation 0.5s ease-in infinite;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                outline: none;
                border: 1px solid yellow;
                background: transparent;
                font-size: 20px;
              "
            >
              <i class="fa fa-handshake-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
  <!-- Hiển thị màn hình loading -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>Đang tải...</p>
  </div>
</template>

<script setup>
import { useCounterStore } from "../../store";
import { ref, getCurrentInstance, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";

const isLoading = ref(false);
const store = useCounterStore();
const Toast = useToast();
const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;
const route = useRoute();
const data = ref({});
const updateData = ref({
  id: [],
  isConfirmation: true,
});

const router = useRouter();
const updateReceiver = async () => {
  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
  updateData.value.id.push(data.value.id);
  const res = await axios.put(
    hostName + `/api/Plan/UpdatePlanConfirmation`,
    updateData.value,
    getToken()
  );
  if (res.data.success) {
    Toast.success("Sucess !!!");
    router.push("tablepage");
  }

  isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
  console.log(res);
};
onMounted(() => {
  if (route.query.id) {
    findOneIdPlan(route.query.id);
  }
});

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
const findOneIdPlan = async (id) => {
  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  document.body.style.overflow = "hidden";
  const res = await axios.get(
    hostName + `/api/Plan/FindOne?id=${id}`,
    getToken()
  );
  if (res.data.success) {
    data.value = res.data.content;
    Toast.success("Success");
  }
  console.log(res);
  isLoading.value = false;
  document.body.classList.remove("loading");
  document.body.style.overflow = "auto";
};
</script>

<style>
@keyframes NoConfirmation {
  0% {
    transform: scale(1.1);
    border: 1px solid red;
  }
  50% {
    transform: scale(1.2);
    border: 1px solid darkblue;
  }
  100% {
    transform: scale(1.1);
    border: 1px solid yellow;
  }
}
</style>
