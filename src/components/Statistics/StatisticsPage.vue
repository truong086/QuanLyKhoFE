<script setup>
import { getCurrentInstance, onMounted } from "vue";
import SalesChartAccount from "./SalesChartAccount.vue";
import SalesChartPage from "./SalesChart.vue";
import SalesChartPage2 from "./SalesChart.vue";
import axios from 'axios'
import { useCounterStore } from "../../store";
import {ref} from 'vue'


onMounted(() => {
  findAllDataMonth()
  findAllAccountByProduct()
  findAllTotalProduct()
  findAllCustomerByProduct()
  findAllDataProductDelivenote()
  findAllProductSuplier()
  findAllProductImportFrom()
  findAllProductByCustomer()
  findAllSupplierProduct()
})

const type = ref('Month')
const typeSuplier = ref('')
const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;
const store = useCounterStore()
const backColor = ref("rgba(75, 192, 192, 0.5)")
const backColor2 = ref("rgba(209, 156, 10, 0.5)")
const color1 = ref('#de0dad')
const color2 = ref('#f27a02')
const color3 = ref('#03ff03')
const color4 = ref('#d00cf2')
const text1 = ref('Số lượng mua')
const dataMonthTable = ref([])
const dataproductImportFrom = ref([])
const dataproductByCustomer = ref([])
const dataproductSupplier = ref([])

const findAllDataMonth = async () => {
  const res = await axios.get(hostName + '/api/Statistical/GetMonthlyProductStatistics', getToken())
  if(res.data.success){
    dataMonthTable.value = res.data.content
    res.data.content.forEach(element => {
      if(!store.getCheck.includes(element.month)){
        store.setStatistic({month: element.month, sales: element.totalQuantitySold})
        store.setCheck(element.month)
      }
    });
    
    type.value = 'Tháng'
  }
}
const getToken = () => {
  var token = store.getToken;
  var result = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return result;
};

const findAllAccountByProduct = async () => {
  const res = await axios.get(hostName + '/api/Statistical/GetTotalProductsSoldByAccount', getToken())
  if(res.data.success){
    
    res.data.content.forEach(element => {
      if(!store.getCheckStatictisAccount.includes(element.username)){
        store.setDataAccountByProduct({name: element.username, image: element.image, sales: element.total})
        store.setCheckStatictisAccount(element.username)
      }
    })
  }
}

const findAllTotalProduct = async () => {
  const res = await axios.get(hostName + '/api/Statistical/SetTotalProductsSold', getToken())
  if(res.data.success){
    res.data.content.forEach(element => {
      if(!store.checkStatictisTotalProduct.includes(element.id)){
        store.setDataTotalProduct({name: element.title, image: element.image[0], sales: element.total})
        store.setCheckStatictisTotalProduct(element.id)
      }
    })
  }
}

const findAllCustomerByProduct = async () =>{
  const res = await axios.get(hostName + '/api/Statistical/GetTotalProductsSoldByCustomer', getToken())
  if(res.data.success){
    console.log(res)
     res.data.content.forEach(element =>{
       if(!store.getCheckStatictisTotalProductByCustomer.includes(element.id)){
         store.setDataTotalProductByCustomer({name: element.customer_name, image: element.customer_email, sales: element.total})
         store.setCheckStatictisTotalProductByCustomer(element.id)
       }
     })
  }
}

const findAllDataProductDelivenote = async () => {
  const res = await axios.get(hostName + '/api/Statistical/GetTotalProductsSold', getToken())
  if(res.data.success){
    res.data.content.forEach(element => {
      if(!store.getcheckStatictisTotalProductDelivenote.includes(element.id)){
        store.setdataTotalProductDelivenote({month: element.title, sales: element.total})
        store.setcheckStatictisTotalProductDelivenote(element.id)
      }
    });
    type.value = 'Product Name: '
  }
}

const findAllProductSuplier = async () => {
  const res = await axios(hostName + '/api/Statistical/SetTotalProductsSoldBySupplier', getToken())
  if(res.data.success){
    res.data.content.forEach(element => {
      if(!store.getcheckStatictisTotalProductSupplier.includes(element.id)){
        store.setdataTotalProductSupplier({name: element.name, image: element.image, sales: element.total})
        store.setcheckStatictisTotalProductSupplier(element.id)
      }
    });
  }
}

const findAllProductImportFrom = async () =>{
  const res = await axios.get(hostName + '/api/Statistical/SetDayAndMonthAnhYearlyProductStatistics', getToken())
  if(res.data.success){
    dataproductImportFrom.value = res.data.content
  }
}

const findAllProductByCustomer = async () => {
  const res = await axios.get(hostName + '/api/Statistical/GetTotalProductsSoldByCustomer', getToken())
  if(res.data.success){
    dataproductByCustomer.value = res.data.content
  }
}

const findAllSupplierProduct = async () => {
  const res = await axios.get(hostName + '/api/Statistical/SetTotalProductsSoldBySupplier', getToken())
  if(res.data.success){
    dataproductSupplier.value = res.data.content
  }
}
</script>

<template>
  <div>
    <h2>Inventory statistics</h2>
    <SalesChartPage2 :products="store.getDataTotalProduct" :colorData="color1" :text="text1"/>
    <h2>Quantity of goods shipped</h2>
    <SalesChartPage2 :products="store.getDataTotalProductByCustomer" :colorData="color2" :text="text1"/>
    <h2>Monthly Statistics</h2>
    <SalesChartAccount :salesData="store.getStatistic" :text="type" :backgroudColorData="backColor"/>
    <h2>Top buyers</h2>
    <SalesChartAccount :salesData="store.getdataTotalProductDelivenote" :text="typeSuplier" :backgroudColorData="backColor2"/>
    <h2>Monthly Statistics Import From table</h2>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataproductImportFrom" :key="index">
            <td>Month: {{ item.month }}</td>
            <td v-if="item.data">
              <div v-for="(itemP, indexP) in item.data" :key="indexP">
                <h3>Product name: {{ itemP.title }}</h3>
                <div v-if="itemP.image" style="margin-bottom: 20px;">
                  <img v-for="(imageItem, indexItem) in itemP.image" :key="indexItem" :src="imageItem" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                </div>
                <p style="color: red; font-weight: bold;">Total product: {{ itemP.totalProduct }}</p>
              </div>
            </td>
            <td>Total: {{ item.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    <h2>Most Supplier</h2>
    <SalesChartPage :products="store.getdataTotalProductSupplier" :colorData="color3" :text="text1"/>
    <h2>Top Exporter</h2>
    <SalesChartPage :products="store.getDataAccountByProduct" :colorData="color4" :text="text1"/>
    <h2>Export products by month of the year</h2>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataMonthTable" :key="index">
            <td>Month: {{ item.month }}</td>
            <td v-if="item.producSalesData">
              <div v-for="(itemP, indexP) in item.producSalesData" :key="indexP">
                <h3>Product name: {{ itemP.productName }}</h3>
                <div v-if="itemP.images" style="margin-bottom: 20px;">
                  <img v-for="(imageItem, indexItem) in itemP.images" :key="indexItem" :src="imageItem" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                </div>
                <p style="color: red; font-weight: bold;">Total product: {{ itemP.quantity }}</p>
              </div>
            </td>
            <td>Total: {{ item.totalQuantitySold }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2>Customer By Product table</h2>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataproductByCustomer" :key="index">
            <td>Name: {{ item.customer_name }}</td>
            <td>Email: {{ item.customer_email }}</td>
            <td v-if="item.producSalesData">
              <div v-for="(itemP, indexP) in item.producSalesData" :key="indexP">
                <h3>Product name: {{ itemP.productName }}</h3>
                <div v-if="itemP.images" style="margin-bottom: 20px;">
                  <img v-for="(imageItem, indexItem) in itemP.images" :key="indexItem" :src="imageItem" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                </div>
                <p style="color: red; font-weight: bold;">Total product: {{ itemP.quantity }}</p>
              </div>
            </td>
            <td>Total: {{ item.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Supplier of Product table</h2>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Image</th>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataproductSupplier" :key="index">
            <td>Name: {{ item.name }}</td>
            <td>Address: {{ item.address }}</td>
            <td><img v-if="item.image" :src="item.image" style="width: 30px; height: 30px; border-radius: 50%;" alt=""></td>
            <td v-if="item.data">
              <div v-for="(itemP, indexP) in item.data" :key="indexP">
                <h3>Product name: {{ itemP.title }}</h3>
                <p>Price: {{ itemP.price }}</p>
                <div v-if="itemP.image" style="margin-bottom: 20px;">
                  <img v-for="(imageItem, indexItem) in itemP.image" :key="indexItem" :src="imageItem" style="width: 30px; height: 30px; border-radius: 50%;" alt="">
                </div>
                <p style="color: red; font-weight: bold;">Total product: {{ itemP.quantity }}</p>
              </div>
            </td>
            <td>Total: {{ item.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<style scoped>
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