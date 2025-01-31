<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
  import * as signalR from "@microsoft/signalr";
  import { useCounterStore } from "./store";
  import {ref, onMounted} from 'vue'
  import { useToast } from "vue-toastification";
  onMounted(() => {
    ivalidate()
  })
  const store = useCounterStore();
const connection = ref(null)
    const ivalidate = () => {
     connection.value = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44376/notificationHub", {
        accessTokenFactory: () => store.getToken
      })
      .withAutomaticReconnect() // Tự động kết nối lại khi bị mất kết nối
      .build();
    
      connection.value.start().then(() => {
          console.log("Connection started");
        }).catch(err => console.log("SignalR Connection Error:", err));

        connection.value.on("thongbao", (title, account) => {
          Toast.success("💨💫💫💌Có thông báo mới: " + title + " " + "người tạo là " + account)
        })

        connection.value.on("confirm", (account, title) => {
          Toast.success("💯⁉💯Có thông báo mới: " + account + " đã nhận plan: " + title)
        })

        connection.value.on("DonePlan", (title, account) => {
          Toast.success("💯❤❤💟 Account: " + account + " đã Done plan: " + title)
        })
    }
    const Toast = useToast();
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
