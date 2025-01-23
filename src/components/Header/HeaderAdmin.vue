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
            <!-- Thêm ô input mới -->
            <input 
              type="text" 
              class="additional-input" 
              placeholder="Search" 
            />
          </li>
        </ul>
        <ul class="navbar-nav my-lg-0">
          <!-- Hình ảnh người dùng với trạng thái -->
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
          <!-- Biểu tượng thông báo -->
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
              <li><a class="dropdown-item" href="#">Thông báo 1</a></li>
              <li><a class="dropdown-item" href="#">Thông báo 2</a></li>
              <li><a class="dropdown-item" href="#">Thông báo 3</a></li>
            </ul>
          </li>
          <!-- Hồ sơ -->
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
                  <i class="fa fa-sign-out-alt"></i> Đăng xuất
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- Hộp Chat (Ẩn mặc định) -->
  <div v-if="chatBoxVisible" class="chat-box">
    <div class="chat-box-header">
      <h5>Chat với {{ activeProfile }}</h5>
      <button @click="closeChatBox">Đóng</button>
    </div>
    <div class="chat-box-content">
      <!-- Tin nhắn chat sẽ xuất hiện ở đây -->
      <p>Thông điệp chat...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profiles: [
        { name: 'Người dùng 1', image: 'https://via.placeholder.com/50', status: 'online' },
        { name: 'Người dùng 2', image: 'https://via.placeholder.com/50', status: 'offline' },
        { name: 'Người dùng 3', image: 'https://via.placeholder.com/50', status: 'online' },
        { name: 'Người dùng 4', image: 'https://via.placeholder.com/50', status: 'offline' },
        { name: 'Người dùng 5', image: 'https://via.placeholder.com/50', status: 'online' }
      ],
      chatBoxVisible: false,
      activeProfile: ''
    };
  },
  methods: {
    logout() {
      alert("Đăng xuất thành công!");
    },
    openChatBox(profileName) {
      this.activeProfile = profileName;
      this.chatBoxVisible = true;
    },
    closeChatBox() {
      this.chatBoxVisible = false;
      this.activeProfile = '';
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
.profile-container {
  display: flex;
  gap: 10px;
}

.profile-item {
  position: relative;
  cursor: pointer;
}

.profile-img {
  width: 50px;
  height: 50px;
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
  background-color: green; /* Mặc định là online */
}

.status-offline {
  background-color: red;
}

.chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: none;
}

.chat-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}

.chat-box-content {
  margin-top: 10px;
  font-size: 14px;
}
</style>
