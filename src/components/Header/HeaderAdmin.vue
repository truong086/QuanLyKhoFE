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
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Logo_DAI_NAM.png/200px-Logo_DAI_NAM.png" 
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
            </li>
          </ul>
          <ul class="navbar-nav my-lg-0">
            <!-- Notification Icon -->
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
            <!-- Profile -->
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
                    <i class="fa fa-sign-out-alt"></i> Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        alert("Logged out successfully!");
      }
    }
  };
  </script>
  
  <style scoped>
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
    border: 2px solid #0ae766;
  }
  
  /* Notification Icon */
  .navbar-nav .fa-bell {
    font-size: 20px;
    position: relative;
  }
  
  .badge {
    position: absolute;
    top: -5px;
    /* right: -1px; */
    font-size: 10px;
    padding: 3px 5px;
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
    animation: fadeIn 0.3s ease-in-out;
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
  </style>
  