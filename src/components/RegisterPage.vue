<template>
    <div class="wrapper">
      <div class="inner">
        <form action="">
          <h3>RegisterPage</h3>
          <div class="form-wrapper form-price">
            <label for="">Price</label>
            <span>$270</span>
          </div>
          <div class="form-wrapper form-select">
            <label for="">People</label>
            <div class="form-holder">
              <select name="" id="" class="form-control">
                <option value="1" class="option">1</option>
                <option value="2" class="option">2</option>
                <option value="3" class="option">3</option>
                <option value="4" class="option">4</option>
                <option value="5" class="option">5</option>
                <option value="6" class="option">6</option>
                <option value="7" class="option">7</option>
                <option value="8" class="option">8</option>
                <option value="9" class="option">9</option>
                <option value="10" class="option">10</option>
              </select>
              <i class="zmdi zmdi-chevron-down"></i>
            </div>
          </div>
          <div class="form-wrapper">
            <label for="" class="label-input">Name</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-wrapper">
            <label for="" class="label-input">Mail</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-wrapper">
            <label for="" class="label-input">Phone</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-wrapper">
            <label for="" class="label-comment">Comment</label>
            <textarea name="" id="" class="form-control" style="height: 69px"></textarea>
          </div>
          <button>Send your booking</button>
        </form>
        <div class="image-holder">
          <img src="/RegisterPageTemplate/images/anh-cute-pho-mai-que-con-gai-1.jpg" alt="" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RegisterPage",
  };
  </script>
  
  <style scoped>
  
  </style>
  