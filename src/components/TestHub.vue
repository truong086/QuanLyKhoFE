<template>
    <div>
      <h1>Notifications</h1>
      <ul>
        <li v-for="(notification, index) in notifications" :key="index">
          {{ notification }}
        </li>
        <button @click="test">Test</button>
      </ul>
    </div>
  </template>
  
  <script>
  import connection from "./Hub/notificationService";
  import axios from 'axios'
  export default {
    data() {
      return {
        notifications: [],
      };
    },
    created() {
      connection.on("ReceiveNotification", (message) => {
        this.notifications.push(message);
      });
    },
    methods:{
        test(){
            let test = "Test"
            axios.post('https://localhost:44376/api/Hub/send', test, {
                headers: { "Content-Type": "application/json" },
            })
        }
    }
  };
  </script>