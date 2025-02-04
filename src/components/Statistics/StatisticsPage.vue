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

const findAllDataMonth = async () => {
  const res = await axios.get(hostName + '/api/Statistical/GetMonthlyProductStatistics', getToken())
  if(res.data.success){
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

     console.log(store.getCheckStatictisTotalProductByCustomer)
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
    console.log(store.getdataTotalProductDelivenote)
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
    <h2>Most Supplier</h2>
    <SalesChartPage :products="store.getdataTotalProductSupplier" :colorData="color3" :text="text1"/>
    <h2>Most purchased users</h2>
    <SalesChartPage :products="store.getDataAccountByProduct" :colorData="color4" :text="text1"/>
  </div>
</template>