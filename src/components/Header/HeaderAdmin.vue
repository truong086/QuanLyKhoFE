<template>
  <header class="topbar">
    <nav class="navbar top-navbar navbar-expand-md navbar-light">
      <div class="navbar-header">
        <a class="navbar-brand" href="index.html">
          <b>
            <img
              src="https://www.newsoft.com.tw/wp-content/uploads/2023/01/logo_en.png"
              alt="homepage"
              class="dark-logo"
            />
          </b>
          <span>
            <img
              src="https://www.tsust.edu.tw/var/file/0/1000/img/95/mlogo.png"
              alt="homepage"
              class="dark-logo"
            />
          </span>
        </a>
      </div>
      <div class="navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a
              class="nav-link nav-toggler hidden-md-up waves-effect waves-dark"
              href="javascript:void(0)"
            >
              <i class="fa fa-bars"></i>
            </a>
          </li>
          <li class="nav-item hidden-xs-down search-box">
            <a
              class="nav-link hidden-sm-down waves-effect waves-dark"
              href="javascript:void(0)"
            >
              <i class="fa fa-search"></i>
            </a>
            <form class="app-search">
              <input
                type="text"
                class="form-control"
                placeholder="Search & enter"
              />
              <a class="srh-btn">
                <i class="fa fa-times"></i>
              </a>
            </form>
            <input type="text" class="additional-input" placeholder="Search" />
          </li>
        </ul>
        <ul class="navbar-nav my-lg-0">
          <li class="nav-item d-flex align-items-center">
            <div class="profile-container">
              <div>
                <!-- Data: {{ testData }} -->
              </div>
              <div
                v-for="(profile, index) in accountOnline"
                :key="index"
                class="profile-item"
                @click="openChatBox(profile.id_account)"
              >
                <div
                  v-if="profile.id_account != idACcount"
                  style="margin: 0 15px"
                >
                  {{ profile.account_name }}
                  <img
                    :src="profile.account_image"
                    alt="Profile"
                    class="profile-img"
                  />
                  <span
                    style="margin: 0 15px"
                    :class="{
                      'status-online': profile.isOnline === true,
                      'status-offline': profile.isOnline === false,
                    }"
                  ></span>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown me-3">
            <a
              class="nav-link dropdown-toggle waves-effect waves-dark"
              href="#"
              id="notificationDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-bell"></i>
              <span class="badge bg-danger">3</span>
            </a>
            <ul
              class="dropdown-menu notification-menu"
              aria-labelledby="notificationDropdown"
            >
              <li><a class="dropdown-item" href="#">Notification 1</a></li>
              <li><a class="dropdown-item" href="#">Notification 2</a></li>
              <li><a class="dropdown-item" href="#">Notification 3</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown u-pro">
            <a
              class="nav-link dropdown-toggle waves-effect waves-dark profile-pic"
              href="#"
              id="navbarDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                :src="accountImage"
                alt="Pro"
                class="profile-img"
                style="width: 50px; height: 50px; border-radius: 50%"
              />
              <span
                style="font-size: 15px; font-weight: bold; margin: 0 15px"
                class="hidden-md-down"
                >{{ accountName }} &nbsp;</span
              >
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a
                  class="dropdown-item"
                  href="javascript:void(0)"
                  @click="logout"
                >
                  <i class="fa fa-sign-out-alt"></i> Log out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <div v-if="chatBoxVisible" class="chat-box" style="width: 500px">
    <div class="chat-box-header">
      <div class="profile-info">
        <img :src="messages.image" alt="Profile" class="profile-img" />
        <h5>Chat With {{ messages.username }}</h5>
      </div>
      <button @click="closeChatBox">X</button>
    </div>
    <div class="chat-box-content" ref="messageContainer">
      <div class="messages">
        <div
          v-for="(message, index) in messages.dataItem"
          :key="index"
          style="position: relative"
          class="chat-container"
        >
          <div
            v-if="message.idUser2 == idACcount"
            style="background-color: yellow; margin-left: 200px"
            class="message"
          >
            <div
              @click="showImage(message.imagedata)"
              v-if="message.imagedata !== null"
              class="message-author"
            >
              <img width="60px" :src="message.imagedata" alt="" />
            </div>
            <div class="message-author">
              <p>{{ message.message }}</p>
            </div>
            <p style="font-size: 12px; margin-top: 20px">
              {{ getTimeFromDateTimeOffset(message.createAt) }}
            </p>
          </div>
          <div v-else class="messageData" style="display: flex">
            <div style="margin-right: 30px">
              <img
                v-if="message.image_user1"
                style="width: 20px; height: 20px; border-radius: 50%"
                :src="message.image_user1"
                alt=""
              />
            </div>
            <div>
              <div
                @click="showImage(message.imagedata)"
                v-if="message.imagedata !== null"
                class="message-author"
              >
                <img width="60px" :src="message.imagedata" alt="" />
              </div>
              <div class="message-author">{{ message.message }}</div>
              <p style="font-size: 12px; margin-top: 20px">
                {{ getTimeFromDateTimeOffset(message.createAt) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-box-footer message-box">
      <!-- Input tin nhắn -->
      <input
        v-model="messageInput"
        type="text"
        class="chat-input"
        placeholder="Nhập tin nhắn..."
        @keydown.enter="sendMessage"
        :disabled="isLoadingMessage"
      />

      <!-- Phần upload ảnh -->
      <div class="image-upload-container">
        <label class="image-upload">
          <span>Click to upload your profile picture</span>
          <input
            type="file"
            accept="image/*"
            id="profile-pic"
            style="display: none"
            @change="previewImageLoad"
          />
        </label>
      </div>
      <div class="preview-container" id="image-preview"></div>

      <!-- Nút gửi tin nhắn -->
      <button
        class="send-btn"
        @click="sendMessage"
        :disabled="isLoadingMessage"
      >
        Gửi
      </button>

      <!-- Hiệu ứng loading -->
      <div v-if="isLoadingMessage" class="loading-spinner">
        <div class="spinner"></div>
        <p>Đang gửi...</p>
      </div>
    </div>

    <!-- Hiển thị màn hình loading -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinnerData"></div>
      <p>Đang tải...</p>
    </div>

    <!-- Popup hiển thị ảnh lớn -->
    <div v-if="selectedImage" class="image-modal" @click.self="closeImage">
      <img :src="selectedImage" class="image-full" alt="Full Image" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, onUnmounted } from "vue";
import * as signalR from "@microsoft/signalr";
import { useCounterStore } from "../../store";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const previewImage = ref(null);
const chatBoxVisible = ref(false);
const activeProfile = ref("");
const activeProfileImage = ref("");
const messages = ref({});
const messageInput = ref("");
const accountOnline = ref(null);
const idACcount = ref(0);
const store = useCounterStore();
const connection = ref(null);
const messageTest = ref({});
const messageContainer = ref(null);
const imageMessage = ref(null);
const selectedImage = ref(null);
const preview = ref(null);
const isLoadingMessage = ref(false);
const isLoading = ref(false);
const accountName = ref("");
const accountImage = ref("");
const currentReceiverId = ref(null);

const getTokens = () => {
  var token = store.getToken;
  var result = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return result;
};
const previewImageLoad = (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageMessage.value = reader.result.split(",")[1];
      preview.value = document.getElementById("image-preview");
      preview.value.innerHTML = `<img src="${e.target.result}" width="60px" alt="Profile Picture Preview">`;
    };
    reader.readAsDataURL(file);
  }
};

const getTimeFromDateTimeOffset = (dateTimeOffset) => {
  const date = new Date(dateTimeOffset); // Chuyển đổi DateTimeOffset thành Date đối tượng
  const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ và đảm bảo có 2 chữ số
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút và đảm bảo có 2 chữ số
  return `${hours}:${minutes}`; // Trả về giờ và phút
};
onMounted(() => {
  idACcount.value = store.getIdAccount;
  accountImage.value = store.getIdAccountImage;
  accountName.value = store.getIdAccountName;
  ivalidate();
});
onUnmounted(() => {
  if (connection.value) {
    connection.value.stop();
  }
});
const ivalidate = () => {
  connection.value = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44376/notificationHub", {
      accessTokenFactory: () => store.getToken,
    })
    .withAutomaticReconnect() // Tự động kết nối lại khi bị mất kết nối
    .build();

  connection.value
    .start()
    .then(() => {
      console.log("Connection started");
    })
    .catch((err) => console.log("SignalR Connection Error:", err));

  connection.value.on("UserData", (user) => {
    accountOnline.value = user;
  });

  connection.value.on("logoutData", (user) => {
    accountOnline.value = user;
  });

  connection.value.on("ReceiveMessage", (data) => {
    // if(data.name_user2 != null){
    //   if(chatBoxVisible.value === false && data.idUser2 !== messages.value.id)
    //       Toast.success("Có thông báo mới từ " + data.name_user2 + ", Message: " + data.message)
    // }
    console.log(currentReceiverId.value + " " + data.idUser1);
    if (
      (parseInt(data.idUser1) === parseInt(currentReceiverId.value) ||
      parseInt(data.idUser2) === parseInt(currentReceiverId.value)) &&
      chatBoxVisible.value === true
    ) {
      messages.value.dataItem.push(data);
    } else {
      Toast.success(
        "💨💫💨💨💥Có thông báo mới từ " +
          data.name_user2 +
          ", Message: " +
          data.message
      );
    }

    // Cuộn xuống cuối danh sách
    const container = messageContainer.value;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
    messageTest.value = data;
    isLoadingMessage.value = false;
  });

  connection.value.on("thongbao", (title, account) => {
    Toast.success(
      "💨💫💫💌Có thông báo mới: " + title + " " + "người tạo là " + account
    );
  });

  connection.value.on("confirm", (account, title) => {
    Toast.success(
      "💯⁉💯Có thông báo mới: " + account + " đã nhận plan: " + title
    );
  });

  connection.value.on("DonePlan", (title, account) => {
    Toast.success("💯❤❤💟 Account: " + account + " đã Done plan: " + title);
  });
};

const showImage = (image) => {
  selectedImage.value = image; // Hiển thị ảnh khi click
};
const closeImage = () => {
  selectedImage.value = null; // Đóng popup khi click ngoài
};
const router = useRouter();
const Toast = useToast();
const { proxy } = getCurrentInstance();
const hostName = proxy?.hostname;
const logout = async () => {
  const res = await axios.post(
    hostName + "/api/Account/Logout",
    {},
    getTokens()
  );
  if (res.data.success) {
    Toast.success("Thành công");
  }
  router.push("/login");
  store.clearStore();
};
const openChatBox = async (id) => {
  // activeProfile.value = profileName;
  // const profile = this.profiles.find(p => p.name === profileName);
  // activeProfileImage.value = profile.image;
  currentReceiverId.value = id;
  isLoading.value = true;
  document.body.classList.add("loading"); // Add Lớp "loading"
  const res = await axios.get(
    hostName + `/api/Message/FindAll?user1=${id}`,
    getTokens()
  );
  messages.value = res.data.content;
  console.log(messages.value);
  chatBoxVisible.value = true;
  isLoading.value = false;
  document.body.classList.remove("loading"); // Add Lớp "loading"
};
const closeChatBox = () => {
  chatBoxVisible.value = false;
  activeProfile.value = "";
  activeProfileImage.value = "";
};

const sendMessage = (event) => {
  if (event && event.shiftKey) {
    // Nếu người dùng nhấn Shift + Enter, không gửi tin nhắn mà xuống dòng
    return;
  }
  isLoadingMessage.value = true;
  connection.value
    .invoke(
      "sendMessageToUser",
      messages.value.id,
      messageInput.value,
      imageMessage.value || null
    )
    .catch((err) => console.error("Faild: ", err));

  previewImage.value = null;
  imageMessage.value = null;
  // preview.value.innerHTML = 'no'

  scrollToBottom();
  isLoadingMessage.value = true;
};
const scrollToBottom = () => {
  messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
};
</script>

<style scoped>
.send-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.send-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading-spinner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 16px;
  z-index: 1000;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.image-gallery {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.image-thumbnail {
  width: 150px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #ccc;
  transition: transform 0.2s ease;
}

.image-thumbnail:hover {
  transform: scale(1.1);
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.image-full {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.img-thumbnail {
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}
.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.preview-container img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
/* CSS cũ */
.nav-item.hidden-xs-down .additional-input {
  margin-top: 10px;
  margin-left: 10px;
  width: 200px;
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.nav-item.hidden-xs-down .additional-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Thu nhỏ logo trong navbar */
.navbar-header .navbar-brand img {
  max-width: 100px;
  max-height: 50px;
  object-fit: contain;
}

/* Thu nhỏ ảnh đại diện (profile-pic) */
.navbar-nav .profile-pic {
  width: 200px;
  height: 80px;
  border-radius: 30%;
  object-fit: cover;
  border: 4px solid transparent; /* Đặt border ban đầu */
  animation: border-flash 2s infinite; /* Tạo hiệu ứng nhấp nháy */
}

@keyframes border-flash {
  0% {
    border-color: red;
  }
  25% {
    border-color: yellow;
  }
  50% {
    border-color: green;
  }
  75% {
    border-color: blue;
  }
  100% {
    border-color: red;
  }
}

/* Notification Icon */
.navbar-nav .fa-bell {
  font-size: 20px;
  position: relative;
}

.badge {
  position: absolute;
  font-size: 10px;
  padding: 3px 4px;
  border-radius: 50%;
}

/* Dropdown Menu Style */
.notification-menu {
  min-width: 250px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  animation: fadeIn 0.4s ease-in-out;
  transform-origin: top right;
}

.notification-menu .dropdown-item {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  padding: 10px 15px;
  border-bottom: 1px solid #f1f1f1;
}

.notification-menu .dropdown-item:last-child {
  border-bottom: none;
}

.notification-menu .dropdown-item:hover {
  background-color: #f8f9fa;
  color: #007bff;
}
.nav-item.dropdown.u-pro {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-item.dropdown.u-pro .profile-pic {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.nav-item.dropdown.u-pro .profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.nav-item.dropdown.u-pro .dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: translateY(10px);
  opacity: 0;
  visibility: hidden;
}

.nav-item.dropdown.u-pro .dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-item.dropdown.u-pro .dropdown-item {
  padding: 12px 20px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s ease;
}

.nav-item.dropdown.u-pro .dropdown-item i {
  color: #007bff;
}

.nav-item.dropdown.u-pro .dropdown-item:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

/* Animation Effect */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Khoảng cách giữa chuông và profile */
.nav-item.me-3 {
  margin-right: 20px;
}

/* CSS mới cho hình ảnh người dùng và trạng thái */
/* Container cho các profile */
.profile-container {
  display: flex;
  gap: 10px;
}

.profile-item {
  position: relative;
  cursor: pointer;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.status-online,
.status-offline {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(40, 190, 40); /* Mặc định là online */
}

.status-offline {
  background-color: red;
}

/* Hộp chat */
/* Thêm CSS mới cho chat box */

/* Increase the height of the chat box */
.chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 350px;
  z-index: 20;
  max-height: 600px; /* Increased height */
  display: flex;
  flex-direction: column;
}

/* Make the content section scrollable */
/* Hộp chat */
.chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 350px;
  z-index: 20;
  max-height: 500px; /* Giới hạn chiều cao tổng của chat box */
  display: flex;
  flex-direction: column;
}

.chat-box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.chat-box-content {
  flex-grow: 1;
  overflow-y: auto; /* Chỉ cuộn dọc khi nội dung vượt quá chiều cao */
  height: 300px; /* Đặt chiều cao cố định */
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-container {
  display: flex;
  justify-content: flex-end; /* Căn trái cho phần tử con */
}

/* Tin nhắn */
.message {
  background-color: #e1f3ff;
  padding: 10px;
  font-size: 14px;
  word-wrap: break-word; /* Tự động xuống dòng nếu quá dài */
  display: inline-block; /* Cho phép div co giãn theo nội dung */
  padding: 10px; /* Đệm xung quanh tin nhắn */
  border-radius: 10px; /* Bo góc cho tin nhắn */
  max-width: 80%; /* Giới hạn chiều rộng tối đa nếu muốn */
  margin-left: auto; /* Đẩy div về bên trái */
}
.messageData {
  background-color: #e1f3ff;
  padding: 10px;
  font-size: 14px;
  word-wrap: break-word; /* Tự động xuống dòng nếu quá dài */
  display: inline-block; /* Cho phép div co giãn theo nội dung */
  padding: 10px; /* Đệm xung quanh tin nhắn */
  border-radius: 10px; /* Bo góc cho tin nhắn */
  max-width: 80%; /* Giới hạn chiều rộng tối đa nếu muốn */
  margin-right: auto; /* Đẩy div về bên trái */
}

/* Tin nhắn của bạn */
/* Tin nhắn của bạn */
.message.you {
  align-self: flex-start; /* Giữ nguyên căn lề trái */
  background-color: #d4edda;
  text-align: left; /* Căn text về trái */
}

/* Tin nhắn từ người khác */
.message.other {
  align-self: flex-end; /* Giữ nguyên căn lề phải */
  background-color: #f8d7da;
  text-align: left; /* Căn text về trái */
}
.message-text {
  color: #333;
  text-align: left;
}

/* Footer */
.chat-box-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.chat-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.send-btn {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-btn:hover {
  background-color: #0056b3;
}
/* Nút gửi file */
.send-file-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  color: #333;
}

.send-file-btn:hover {
  background-color: #e1e1e1;
}

.send-file-btn i {
  font-size: 18px;
}

.chat-box-header button {
  font-size: 18px; /* Phóng to chữ */
  font-weight: bold;
  color: red; /* Màu chữ */
  background-color: white; /* Màu nền */
  border: 2px solid red; /* Đường viền */
  border-radius: 50%; /* Tạo nút tròn */
  width: 35px; /* Đặt chiều rộng */
  height: 35px; /* Đặt chiều cao */
  cursor: pointer; /* Thay đổi con trỏ khi hover */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out; /* Hiệu ứng chuyển đổi */
}

.chat-box-header button:hover {
  background-color: red; /* Màu nền khi hover */
  color: white; /* Màu chữ khi hover */
  transform: scale(1.1); /* Phóng to nút khi hover */
}

.chat-box-header button:active {
  background-color: #ffcccc; /* Màu nền khi click */
  color: #cc0000; /* Màu chữ khi click */
}
/* Overlay để đóng tất cả chat */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}

/* Màn hình chờ */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: all; /* Kích hoạt lớp phủ ngăn tương tác */
}

/* Biểu tượng spinner */
.spinnerData {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

/* Hiệu ứng xoay */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Ngăn người dùng thao tác khi đang load */
body.loading {
  pointer-events: none; /* Ngăn tất cả tương tác */
  user-select: none; /* Ngăn chọn văn bản */
}
</style>
