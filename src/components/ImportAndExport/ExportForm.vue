<template>
  <div class="form-container">
    <!-- Khung bên trái chứa danh sách sản phẩm -->
    <div class="form-left-frame">
      <div class="product-list">
        <h3>Danh sách sản phẩm</h3>
        <div class="product-item" :class="{ selected: selectedProduct === 'product1', saved: productQuantitySaved.product1 }" @click="selectProduct('product1')">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzg1GZ2NStg8tlcudDsvglynQmdW6nqq2wUA&s" alt="Product 1" />
          <span>Tên sản phẩm 1</span>
          <span>Vị trí: Kho 1</span>
          <div v-if="selectedProduct === 'product1'">
            <div v-if="!productQuantitySaved.product1" class="quantity-input">
              <input type="number" v-model="form.quantity['product1']" placeholder="Quantity" />
              <button @click="saveQuantity('product1')">Save</button>
            </div>
            <div v-if="productQuantitySaved.product1">
              <span>Số lượng: {{ form.quantity['product1'] }}</span>
            </div>
          </div>
        </div>

        <div class="product-item" :class="{ selected: selectedProduct === 'product2', saved: productQuantitySaved.product2 }" @click="selectProduct('product2')">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzg1GZ2NStg8tlcudDsvglynQmdW6nqq2wUA&s" alt="Product 2" />
          <span>Tên sản phẩm 2</span>
          <span>Vị trí: Kho 2</span>
          <div v-if="selectedProduct === 'product2'">
            <div v-if="!productQuantitySaved.product2" class="quantity-input">
              <input type="number" v-model="form.quantity['product2']" placeholder="Quantity" />
              <button @click="saveQuantity('product2')">Save</button>
            </div>
            <div v-if="productQuantitySaved.product2">
              <span>Số lượng: {{ form.quantity['product2'] }}</span>
            </div>
          </div>
        </div>

        <div class="product-item" :class="{ selected: selectedProduct === 'product3', saved: productQuantitySaved.product3 }" @click="selectProduct('product3')">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzg1GZ2NStg8tlcudDsvglynQmdW6nqq2wUA&s" alt="Product 3" />
          <span>Tên sản phẩm 3</span>
          <span>Vị trí: Kho 3</span>
          <div v-if="selectedProduct === 'product3'">
            <div v-if="!productQuantitySaved.product3" class="quantity-input">
              <input type="number" v-model="form.quantity['product3']" placeholder="Quantity" />
              <button @click="saveQuantity('product3')">Save</button>
            </div>
            <div v-if="productQuantitySaved.product3">
              <span>Số lượng: {{ form.quantity['product3'] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Khung bên phải chứa form -->
    <div class="form-right-frame">
      <h2 class="form-title">Phiếu Xuất</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Tiêu đề:</label>
          <input type="text" id="title" v-model="form.title" placeholder="Nhập tiêu đề" />
        </div>

        <div class="form-group">
          <label for="description">Mô tả:</label>
          <textarea id="description" v-model="form.description" placeholder="Nhập mô tả"></textarea>
        </div>

        <div class="form-group">
          <label>Loại khách hàng:</label>
          <div class="radio-group">
            <input type="radio" id="oldCustomer" value="old" v-model="form.customerType" />
            <label for="oldCustomer">Khách hàng cũ</label>
            <input type="radio" id="newCustomer" value="new" v-model="form.customerType" />
            <label for="newCustomer">Khách hàng mới</label>
          </div>
        </div>

        <div v-if="form.customerType === 'new'" class="customer-new-frame">
          <div class="form-group">
            <label for="name">Tên khách hàng:</label>
            <input type="text" id="name" v-model="form.name" placeholder="Nhập tên khách hàng" />
          </div>

          <div class="form-group">
            <label for="address">Địa chỉ:</label>
            <input type="text" id="address" v-model="form.address" placeholder="Nhập địa chỉ" />
          </div>

          <div class="form-group">
            <label for="phone">Số điện thoại:</label>
            <input type="text" id="phone" v-model="form.phone" placeholder="Nhập số điện thoại" />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="form.email" placeholder="Nhập email" />
          </div>
        </div>

        <div v-if="form.customerType === 'old'" class="customer-old-frame">
          <h3>Danh sách khách hàng cũ</h3>
          <input type="text" v-model="selectedCustomer" placeholder="Chọn khách hàng" class="customer-input" disabled />
          <ul>
            <li v-for="customer in oldCustomers" :key="customer.id" @click="selectCustomer(customer.name)">
              <img :src="customer.image" alt="Avatar" class="customer-avatar" />
              <span>{{ customer.name }}</span>
            </li>
          </ul>
        </div>

        <div class="form-group">
          <label for="code">Mã phiếu:</label>
          <input type="text" id="code" v-model="form.code" placeholder="Nhập mã phiếu" />
        </div>

        <div class="form-group">
          <label for="deliveryAddress">Địa chỉ giao hàng:</label>
          <input type="text" id="deliveryAddress" v-model="form.deliveryAddress" placeholder="Nhập địa chỉ giao hàng" />
        </div>

        <div v-if="selectedProduct" class="form-group">
          <label for="quantity">Số lượng:</label>
          <input type="number" id="quantity" v-model="form.quantity[selectedProduct]" placeholder="Nhập số lượng" />
        </div>

        <div class="form-group">
          <label for="price">Giá trước thuế:</label>
          <input type="number" id="price" v-model="form.price" placeholder="Nhập giá" />
        </div>

        <div class="form-group">
          <label for="tax">Thuế:</label>
          <input type="number" id="tax" v-model="form.tax" placeholder="Nhập thuế" />
        </div>

        <button type="submit" class="submit-button">Lưu phiếu xuất</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  title: "",
  description: "",
  customerType: "new", 
  name: "",
  address: "",
  phone: "",
  email: "",
  price: 0,
  quantity: {},
  deliveryAddress: "",
  code: "",
  tax: 0,
  taxOption: false
});

const selectedCustomer = ref("");
const selectedProduct = ref(null); // Lưu trữ sản phẩm đã chọn
const productQuantitySaved = ref({
  product1: false,
  product2: false,
  product3: false
}); // Lưu trữ trạng thái lưu số lượng cho từng sản phẩm

const oldCustomers = ref([
  { id: 1, name: "Nguyễn Văn A", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/800px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg" },
  { id: 2, name: "Trần Thị B", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/800px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg" },
  { id: 3, name: "Lê Văn C", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/800px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg" },
  { id: 4, name: "Phạm Thị D", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/800px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg" },
  { id: 5, name: "Đỗ Văn E", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/800px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg" }
]);

const selectProduct = (product) => {
  selectedProduct.value = product;
  // Không reset số lượng khi chuyển sang sản phẩm khác
};


const saveQuantity = (product) => {
  if (!form.value.quantity[product] || form.value.quantity[product] <= 0) {
    alert('Vui lòng nhập số lượng hợp lệ trước khi lưu!');
    return; // Ngừng thực hiện hành động lưu nếu không nhập số lượng hợp lệ
  }
  productQuantitySaved.value[product] = true;
};


const selectCustomer = (name) => {
  selectedCustomer.value = name;
};

const handleSubmit = () => {
  console.log(form.value);
};
</script>

<style scoped>
.form-container {
  display: flex;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.form-left-frame {
  flex: 1;
  padding-right: 20px;
  border-right: 2px solid #ddd;
  height: 100%;
}

.form-right-frame {
  flex: 2;
  padding-left: 20px;
}

.form-title {
  text-align: center;
  color: #007bff;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="email"] {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px;
}

.radio-group {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
}

.customer-old-frame ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.customer-old-frame li {
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
}

.customer-old-frame li:hover {
  background-color: #f5f5f5;
}

.customer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-item.selected {
  background-color: #f0f8ff;
}

.product-item.saved {
  background-color: #d4edda;
}

.product-item img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.quantity-input input {
  width: 100px;
  padding: 5px;
  margin-right: 10px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 5px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.submit-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
