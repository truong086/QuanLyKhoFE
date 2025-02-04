<template>
  <div class="table-page">
    <h1>Manager</h1>

    <!-- Bảng Kho -->
    <div class="table-container">
      <h2 class="table-title">Warehourse Manager</h2>
      <router-link to="/AddorEdit" class="waves-effect waves-dark" aria-expanded="false">
        <i class="fa fa-tachometer"></i>
        <span class="hide-menu">Add Warehourse</span>
      </router-link>
      <table class="table">
        <thead>
          <tr>
            <th class="title">Image</th>
            <th class="title">Name</th>
            <th class="title">Address</th>
            <th class="title">Quantity</th>
            <th class="title">Quantity Emty</th>
            <th class="title">Account Create</th>
            <th class="title">#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in dataWarehourse" :key="rowIndex">
            <td><img :src="row.image" style="width: 50px; height: 50px; border-radius: 50%;" alt=""></td>
            <td>{{ row.name }}</td>
            <td>{{ row.city }}, {{ row.street }}, {{ row.district }}</td>
            <td>{{ row.numberoffloors }}</td>
            <td>{{ row.numberoffloorsEmty }}</td>
            <td>
              <div style="display: flex;">
                <img :src="row.account_image" style="width: 50px; height: 50px; border-radius: 50%;" alt="">
                <h3 style="margin: 0 15px; font-weight: bold;">{{ row.account_name }}</h3>
              </div>
            </td>
            <td>
              <div style="display: flex;">
                <button class="btn btn-sucess" style="background-color: yellow; font-weight: bold;" @click="NextWarehourse(row.id)">Edit</button>
                <button class="btn btn-sucess" style="background-color: red; color: white; font-weight: bold;">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <PagesTotal :page="page" :totalPage="totalPage" :valueE="valueE" @pageChange="findAllWarehourse" @pageSizeChange="changeReload"></PagesTotal>
    </div>

    <!-- Bảng Tầng -->
    <div class="table-container">
      <h2 class="table-title">Floor Manager</h2>
      <table class="table">
        <thead>
          <tr>
            <th class="title">Image</th>
            <th class="title">Name</th>
            <th class="title">Warehourse</th>
            <th class="title">Quantity</th>
            <th class="title">Quantity Emty</th>
            <th class="title">Account Create</th>
            <th class="title">#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in dataFloor" :key="rowIndex">
            <td><img :src="row.image" style="width: 50px; height: 50px; border-radius: 50%;" alt=""></td>
            <td>{{ row.name }}</td>
            <td>
              <div style="display: flex;">
                <img :src="row.warehouse_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                <h5 style="margin: 0 15px; font-weight: bold;">{{ row.warehouse_name }}</h5>
              </div>
            </td>
            <td>{{ row.quantityarea }}</td>
            <td>{{ row.locationEmty }}</td>
            <td>
              <div style="display: flex;">
                <img :src="row.account_image" style="width: 50px; height: 50px; border-radius: 50%;" alt="">
                <h3 style="margin: 0 15px; font-weight: bold;">{{ row.account_name }}</h3>
              </div>
            </td>
            <td>
              <div style="display: flex;">
                <button class="btn btn-sucess" style="background-color: yellow; font-weight: bold;">Edit</button>
                <button class="btn btn-sucess" style="background-color: red; color: white; font-weight: bold;">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <PagesTotal :page="pageFloor" :totalPage="totalPageFloor" :valueE="valueEFloor" @pageChange="findAllFloor" @pageSizeChange="changeReloadFloor"></PagesTotal>
    </div>

    <!-- Bảng Khu -->
    <div class="table-container">
      <h2 class="table-title">Arera Manager</h2>
      <router-link to="/AddOrEditArea" class="waves-effect waves-dark" aria-expanded="false">
        <i class="fa fa-tachometer"></i>
        <span class="hide-menu">Add Area</span>
      </router-link>
      <table class="table">
        <thead>
          <tr>
            <th class="title">Image</th>
            <th class="title">Name</th>
            <th class="title">Floor</th>
            <th class="title">Quantity</th>
            <th class="title">Quantity Emty</th>
            <th class="title">Account Create</th>
            <th class="title">#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in dataArea" :key="rowIndex">
            <td><img :src="row.image" style="width: 50px; height: 50px; border-radius: 50%;" alt=""></td>
            <td>{{ row.name }}</td>
            <td>
              <div style="display: flex;">
                <img :src="row.floor_image" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                <h5 style="margin: 0 15px; font-weight: bold;">{{ row.floor_name }}</h5>
              </div>
            </td>
            <td>{{ row.quantity }}</td>
            <td>{{ row.totalLocationExsis }}</td>
            <td>
              <div style="display: flex;">
                <img :src="row.account_image" style="width: 50px; height: 50px; border-radius: 50%;" alt="">
                <h3 style="margin: 0 15px; font-weight: bold;">{{ row.account_name }}</h3>
              </div>
            </td>
            <td>
              <div style="display: flex;">
                <button class="btn btn-sucess" style="background-color: yellow; font-weight: bold;" @click="NextAreaUpdate(row.id)">Edit</button>
                <button class="btn btn-sucess" style="background-color: red; color: white; font-weight: bold;">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <PagesTotal :page="pageArea" :totalPage="totalPageArea" :valueE="valueEArea" @pageChange="findAllArea" @pageSizeChange="changeReloadArea"></PagesTotal>
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
import { ref, getCurrentInstance, watch, onMounted } from "vue";
import PagesTotal from "./PageList/PagesTotal.vue";
import { useCounterStore } from "../store";
import {useRouter} from 'vue-router'
onMounted(() => {
  findAllArea(valueEArea.value, pageArea.value)
  findAllWarehourse(valueE.value, page.value)
  findAllFloor(valueEFloor.value, pageFloor.value)
  
})
const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;
const page = ref(1);
const totalPage = ref(0);
const pageSize = ref(2);
const valueE = ref("");
const pageFloor = ref(1);
const totalPageFloor = ref(0);
const pageSizeFloor = ref(2);
const valueEFloor = ref("");
const dataFloor = ref([])
const pageArea = ref(1);
const totalPageArea = ref(0);
const pageSizeArea = ref(2);
const valueEArea = ref("");
const dataArea = ref([])
const store = useCounterStore()
const isLoading = ref(false)
const dataWarehourse = ref([])
const router = useRouter()

watch(page.value, (newPage) => {
  findAllWarehourse(valueE.value, newPage)
  
  })
  watch(pageArea.value, (newPage) => {
    findAllArea(valueEArea.value, newPage)
  })
  watch(pageFloor.value, (newPage) => {
    findAllFloor(valueEFloor.value, newPage)
  
  })
const getToken = () => {
        var token = store.getToken
            var result = {
                headers: {Authorization: `Bearer ${token}`}
            }
            return result
      }
const findAllFloor = async (search, pageData) => {
  isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
    const res = search === '' ? await axios.get(hostName + `/api/Floor/FindAll?page=${pageData}&pageSize=${pageSizeFloor.value}`, getToken()) 
    : await axios.get(hostName + `/api/Floor/FindAll?name=${search}&page=${pageData}&pageSize=${pageSizeFloor.value}`, getToken())

    if (res.data.success) {
      dataFloor.value = res.data.content.data
      pageFloor.value = res.data.content.page;
      totalPageFloor.value = res.data.content.totalPages;
    }
  isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
}
const findAllWarehourse = async (search, pageData) => {
  isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
    const res = search === '' ? await axios.get(hostName + `/api/Warehouse/FindAll?page=${pageData}&pageSize=${pageSize.value}`, getToken()) 
                              : await axios.get(hostName + `/api/Warehouse/FindAll?name=${search}&page=${pageData}&pageSize=${pageSize.value}`, getToken())

    if (res.data.success) {
      dataWarehourse.value = res.data.content.data
      page.value = res.data.content.page;
      totalPage.value = res.data.content.totalPages;
    }
    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
}

const changeReload = (event) => {
    pageSize.value = event
    findAllWarehourse(valueE.value, page.value)
  }

  const changeReloadFloor = (event) => {
    pageSizeFloor.value = event
    findAllFloor(valueEFloor.value, pageFloor.value)
  }
  const findAllArea = async (search, pageData) => {
    isLoading.value = true
    document.body.classList.add('loading') // Add Lớp "loading"
    document.body.style.overflow = 'hidden'
    const res = search === '' ? await axios.get(hostName + `/api/Area/FindAll?page=${pageData}&pageSize=${pageSizeArea.value}`, getToken()) 
                              : await axios.get(hostName + `/api/Area/FindAll?name=${search}&page=${pageData}&pageSize=${pageSizeArea.value}`, getToken())
  
    if (res.data.success) {
      dataArea.value = res.data.content.data
      pageArea.value = res.data.content.page;
      totalPageArea.value = res.data.content.totalPages;
    }
    isLoading.value = false
    document.body.classList.remove('loading')
    document.body.style.overflow = 'auto'
  }
  const changeReloadArea = (event) => {
    pageSizeArea.value = event
    findAllArea(valueEArea.value, pageArea.value)
  }

  const NextWarehourse = (id) => {
    router.push({path: "AddorEdit", query: {id: id, name: "Update"}})
  }

  const NextAreaUpdate = (id) => {
    router.push({path: "/AddOrEditArea", query: {id: id, name: "Update"}})
  }
</script>

<style scoped>
.table-page {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #4CAF50;
}

.table-container {
  width: 100%;
  margin-bottom: 30px;
}

.table-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #4CAF50;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.title {
  text-align: center;
  font-size: 1.1rem;
  color: #555;
  background-color: #f2f2f2;
  padding: 10px;
  font-weight: bold;
  border-radius: 10px;
}

.table th,
.table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.table td {
  background-color: #fff;
  color: #666;
}

.table tr:nth-child(even) td {
  background-color: #f9f9f9;
}

.table tr:hover td {
  background-color: #e1e1e1;
  cursor: pointer;
}
</style>
