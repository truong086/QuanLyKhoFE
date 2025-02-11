<template>
  <div class="form-container">
    <h2 style="margin-bottom: 20px">Phiếu Xuất</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Tiêu đề:</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          placeholder="Nhập tiêu đề"
        />
      </div>

      <div class="form-group">
        <label for="description">Mô tả:</label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Nhập mô tả"
        ></textarea>
      </div>
      <!-- Title and Checkbox under "Mô tả" -->
      <div class="form-group">
        <label for="descriptionOption">Chọn tùy chọn mô tả:</label>
        <input
          type="checkbox"
          id="descriptionOption"
          v-model="form.descriptionOption"
        />
      </div>

      <div class="form-group">
        <label for="retailcustomersOld">Khách hàng cũ:</label>
        <select v-model="retailcustomersOld" id="retailcustomersOld">
          <option value="" disabled selected>Chọn mã kh..</option>
          <option value="1">Bác A</option>
          <option value="2">Cô B</option>
          <option value="1">Chị C</option>
        </select>
      </div>

      <div class="form-group">
        <label for="name">Tên khách hàng:</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          placeholder="Nhập tên khách hàng"
        />
      </div>

      <div class="form-group">
        <label for="address">Địa chỉ:</label>
        <input
          type="text"
          id="address"
          v-model="form.address"
          placeholder="Nhập địa chỉ"
        />
      </div>

      <div class="form-group">
        <label for="phone">Số điện thoại:</label>
        <input
          type="text"
          id="phone"
          v-model="form.phone"
          placeholder="Nhập số điện thoại"
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="Nhập email"
        />
      </div>
      <div class="form-group">
        <label for="code">Mã phiếu:</label>
        <input
          type="text"
          id="code"
          v-model="form.code"
          placeholder="Nhập mã phiếu"
        />
      </div>

      <div class="form-group">
        <label for="deliveryAddress">Địa chỉ giao hàng:</label>
        <input
          type="text"
          id="deliveryAddress"
          v-model="form.deliveryAddress"
          placeholder="Nhập địa chỉ giao hàng"
        />
      </div>

      <div class="product-show">
        <label for="products">Sản phẩm:</label>
        <div
          v-for="(product, index) in form.products"
          :key="index"
          class="product-item"
        >
          <div>
            <label>ID sản phẩm:</label>
            <select v-model="product.id_product">
              <option value="" disabled selected>Chọn ID sản phẩm</option>
              <option v-for="id in productIds" :key="id" :value="id">{{ id }}</option>
            </select>
          </div>
          <div>
            <label>Số lượng:</label>
            <select v-model="product.quantity">
              <option value="" disabled selected>Chọn số lượng</option>
              <option v-for="n in quantityOptions" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div>
            <label>Vị trí:</label>
            <select v-model="product.location">
              <option value="" disabled selected>Chọn vị trí</option>
              <option v-for="loc in locationOptions" :key="loc" :value="loc">{{ loc }}</option>
            </select>
          </div>
          <div>
            <label>Khu:</label>
            <select v-model="product.area">
              <option value="" disabled selected>Chọn khu</option>
              <option v-for="area in areaOptions" :key="area" :value="area">{{ area }}</option>
            </select>
          </div>
          <button type="button" @click="removeProduct(index)">
            Xóa sản phẩm
          </button>
        </div>
        <button type="button" @click="addProduct">Thêm sản phẩm</button>
      </div>

      <div class="form-group">
        <label for="quantity">Số lượng:</label>
        <input
          type="number"
          id="quantity"
          v-model="form.quantity"
          placeholder="Nhập số lượng"
        />
      </div>
      <div class="form-group">
        <label for="price">Giá trước thuế:</label>
        <input
          type="number"
          id="price"
          v-model="form.price"
          placeholder="Nhập giá"
        />
      </div>
      <div class="form-group">
        <label for="tax">Thuế:</label>
        <input
          type="number"
          id="tax"
          v-model="form.tax"
          placeholder="Nhập thuế"
        />
      </div>
      <!-- Title and Checkbox under "Thuế" -->
      <div class="form-group">
        <label for="taxOption">Chọn tùy chọn thuế:</label>
        <input
          type="checkbox"
          id="taxOption"
          v-model="form.taxOption"
        />
      </div>

      <div class="form-group">
        <label for="total">Tổng tiền:</label>
        <input
          type="number"
          id="total"
          v-model="form.total"
          placeholder="Tổng tiền"
          disabled
        />
      </div>

      <button type="submit">Lưu phiếu xuất</button>
    </form>
  </div>
</template>

<script setup>
  import { ref, watch } from "vue";

  const form = ref({
    title: "",
    description: "",
    descriptionOption: false,  // Added descriptionOption
    isRetailcustomers: false,
    retailcustomersOld: 0,
    name: "",
    address: "",
    phone: "",
    email: "",
    price: 0,
    quantity: 0,
    total: 0,
    deliveryAddress: "",
    code: "",
    tax: 0,
    taxOption: false,  // Added taxOption
    isPercentage: false,
    products: [
      {
        id_product: 0,
        quantity: 0,
        location: 0,
        area: 0,
      },
    ],
  });

  const productIds = ref([1, 2, 3, 4, 5]);
  const quantityOptions = ref([1, 2, 3, 4, 5, 10, 20]);
  const locationOptions = ref([101, 102, 103, 104, 105]);
  const areaOptions = ref([1, 2, 3, 4, 5]);

  watch(
    () => form.value.price * form.value.quantity,
    (newTotal) => {
      form.value.total = newTotal;
    }
  );

  const addProduct = () => {
    form.value.products.push({
      id_product: 0,
      quantity: 0,
      location: 0,
      area: 0,
    });
  };

  const removeProduct = (index) => {
    form.value.products.splice(index, 1);
  };

  const handleSubmit = () => {
    console.log("Phiếu xuất đã gửi:", form.value);
  };
</script>

<style scoped>
  .form-container {
    max-width: 100%;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  h4 {
    margin: 20px 0;
    font-weight: bold;
    color: red;
  }
  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 10px;
  }

  .form-group label {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    flex: 1;
  }

  .form-group select,
  .form-group input,
  .form-group textarea {
    flex: 2;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .form-group select,
  .form-group input,
  .form-group textarea:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  .form-group select,
  .form-group input,
  .form-group textarea:focus::placeholder {
    font-style: italic;
  }

  .form-group button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .form-group button:hover {
    background-color: #0056b3;
  }

  .product-item {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  .product-item input {
    flex: 1;
  }

  .product-item button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  .product-item button:hover {
    background-color: darkred;
  }
</style>
