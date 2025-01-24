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
              href="javascript:void(0)">
              <i class="fa fa-bars"></i>
            </a>
          </li>
          <li class="nav-item hidden-xs-down search-box">
            <a 
              class="nav-link hidden-sm-down waves-effect waves-dark" 
              href="javascript:void(0)">
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
            <input 
              type="text" 
              class="additional-input" 
              placeholder="Search" 
            />
          </li>
        </ul>
        <ul class="navbar-nav my-lg-0">
          <li class="nav-item d-flex align-items-center">
            <div class="profile-container">
              <div 
                v-for="(profile, index) in profiles" 
                :key="index" 
                class="profile-item" 
                @click="openChatBox(profile.name)"
              >
                <img 
                  :src="profile.image" 
                  alt="Profile" 
                  class="profile-img"
                />
                <span :class="{'status-online': profile.status === 'online', 'status-offline': profile.status === 'offline'}"></span>
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
              aria-expanded="false">
              <i class="fa fa-bell"></i>
              <span class="badge bg-danger">3</span>
            </a>
            <ul class="dropdown-menu notification-menu" aria-labelledby="notificationDropdown">
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
              aria-expanded="false">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBlfj7Wq-yc1gUVK6j-IpihoYZVLeKGJj5dZFlfQsPy93ScNk5tqMw3XZ7w_aH59wZy98&usqp=CAU" 
                alt="Pro" 
                class="profile-img" 
              />
              <span class="hidden-md-down">VanHauTop1Coder &nbsp;</span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a 
                  class="dropdown-item" 
                  href="javascript:void(0)" 
                  @click="logout">
                  <i class="fa fa-sign-out-alt"></i> Log out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <div v-if="chatBoxVisible" class="chat-box">
  <div class="chat-box-header">
    <div class="profile-info">
      <img :src="activeProfileImage" alt="Profile" class="profile-img" />
      <h5>Chat With {{ activeProfile }}</h5>
    </div >
    <button  @click="closeChatBox"  >X</button>
  </div>
  <div class="chat-box-content">
    <div class="messages" ref="messageContainer">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="message-author">{{ message.author }}</div>
        <div class="message-text">{{ message.text }}</div>
      </div>
    </div>
  </div>
  <div class="chat-box-footer">
      <input
        v-model="messageInput"
        type="text"
        class="chat-input"
        placeholder="Enter message..."
        @keydown="sendMessage"
        @keydown.enter="sendMessage"
      />

      <label for="file-upload" class="send-file-btn">
        <i class="fa fa-paperclip"></i>
      </label>
      <input
        id="file-upload"
        type="file"
        @change="addFile"
        style="display: none;"
      />
      <button class="send-btn" @click="sendMessage">Send</button>
</div>

</div>

</template>



<script>
export default {
  data() {
    return {
      profiles: [
        { name: 'User 1', image: 'https://scontent.fkhh2-2.fna.fbcdn.net/v/t39.30808-6/473256450_122168331770279858_1233402960530596024_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ztOl6zdgjmsQ7kNvgF_Bibs&_nc_zt=23&_nc_ht=scontent.fkhh2-2.fna&_nc_gid=AtNs9twimqxmIRKQNl3MYoe&oh=00_AYCL6FRqrOFH_B3gTMkOHp5U_yxY3LA6vqLTT3zDdAw91A&oe=6797C813', status: 'online' },
        { name: 'User 2', image: 'https://scontent.fkhh2-1.fna.fbcdn.net/v/t39.30808-6/473169881_122168331704279858_1128085097387166884_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=r87rt8AONNYQ7kNvgGo3Jh1&_nc_zt=23&_nc_ht=scontent.fkhh2-1.fna&_nc_gid=ARhIqKJPXYLGLhBh_QDyJul&oh=00_AYALLQpbwkjELBViTDvHWYumkO6CPLy1Je2udzHYTl6c6w&oe=6797A61B ', status: 'offline' },
        { name: 'User 3', image: 'https://scontent.fkhh2-1.fna.fbcdn.net/v/t39.30808-6/473113411_122168331614279858_4841002852087880734_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1ZmvyTiJOiYQ7kNvgFzyFFP&_nc_zt=23&_nc_ht=scontent.fkhh2-1.fna&_nc_gid=ANUYoqaPSKWQp4HeWD2nFc8&oh=00_AYBaFTv-ZwFifmUzBqgESF3exjY_XRkzKBwdvCJlTp9eOA&oe=6797AD9D', status: 'online' },
        { name: 'User 4', image: 'https://scontent.fkhh2-1.fna.fbcdn.net/v/t39.30808-6/472425730_122166648422279858_6731797195696114475_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=2wlCkigHM2UQ7kNvgHumm3D&_nc_zt=23&_nc_ht=scontent.fkhh2-1.fna&_nc_gid=AStWUKv443VBqjPP5xFKhUe&oh=00_AYAvB_-hEXNBCCv2sI2wt_G3FTK3mh3So7ueN-uPLdJyIw&oe=6797CFDB', status: 'offline' },
        { name: 'User 5', image: 'https://scontent.fkhh2-1.fna.fbcdn.net/v/t39.30808-6/472760492_122167839842279858_8147298907144507792_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=yD1V0Pj_es4Q7kNvgGqGpMs&_nc_zt=23&_nc_ht=scontent.fkhh2-1.fna&_nc_gid=AAKrg5UqVG1puiBRAiV757J&oh=00_AYAcnstT1KI0ohXUGz_BrTHxYsGfrNc1JahWO6w5QgDTsQ&oe=6797D5C7', status: 'online' }
      ],
      chatBoxVisible: false,
      activeProfile: '',
      activeProfileImage: '',
      messages: [],
      messageInput: '',
    };
  },
  methods: {
    logout() {
      alert("Log out successfully!");
    },
    openChatBox(profileName) {
      this.activeProfile = profileName;
      const profile = this.profiles.find(p => p.name === profileName);
      this.activeProfileImage = profile.image;
      this.chatBoxVisible = true;
    },
    closeChatBox() {
      this.chatBoxVisible = false;
      this.activeProfile = '';
      this.activeProfileImage = '';
    },
    sendMessage(event) {
  if (event && event.shiftKey) {
    // Nếu người dùng nhấn Shift + Enter, không gửi tin nhắn mà xuống dòng
    return;
  }
  if (this.messageInput.trim()) {
    this.messages.push({
      author: 'You',
      text: this.messageInput
    });
    this.messageInput = '';
    this.scrollToBottom();
  }
},

    addFile(event) {
      // Handle file addition
      alert('File added: ' + event.target.files[0].name);
    },
    scrollToBottom() {
      const messageContainer = this.$refs.messageContainer;
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }
};
</script>

<style scoped>
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

/* Tin nhắn */
.message {
  background-color: #e1f3ff;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  word-wrap: break-word; /* Tự động xuống dòng nếu quá dài */
  max-width: 80%;
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
</style>
