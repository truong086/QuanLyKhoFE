<template>
  <div class="form-container">
    <h2 style="margin-bottom: 20px">Phiếu Nhập</h2>
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

      <div class="checkbox form-group">
        <label for="isProductNew">Sản phẩm mới:</label>
        <div class="checkbox-parent">
          <input
            type="checkbox"
            id="isProductNew"
            v-model="form.isProductNew"
          />
        </div>
      </div>
      <!-- phần nhập vào thông tin sản phẩm -->
      <!-- Nếu là sản phẩm mới -->
      <div class="product_info-group">
        <div class="product-info-form">
          <div v-if="form.isProductNew" class="product-new">
            <h4>Sản phẩm mới</h4>
            <div class="form-group">
              <label>Tiêu đề:</label>
              <input
                type="text"
                v-model="form.productNew[0].title"
                placeholder="Nhập tiêu đề sản phẩm"
              />
            </div>
            <div class="form-group">
              <label>Mô tả:</label>
              <input
                type="text"
                v-model="form.productNew[0].description"
                placeholder="Nhập mô tả sản phẩm"
              />
            </div>
            <div class="form-group">
              <label>Giá:</label>
              <input
                type="number"
                v-model="form.productNew[0].price"
                placeholder="Nhập giá"
              />
            </div>
            <!-- Product units -->
            <div class="form-group">
              <label for="donViTinh">Đơn vị tính:</label>
              <select v-model="form.productNew[0].donViTinh" id="donViTinh">
                <option value="" disabled>Chọn đơn vị tính</option>
                <option value="kg">Kilogram</option>
                <option value="lit">Lít</option>
                <option value="cai">Cái</option>
              </select>
            </div>
            <!-- product Quantity -->
            <div class="form-group">
              <label>Số lượng:</label>
              <input
                type="number"
                v-model="form.productNew[0].quantity"
                placeholder="Nhập số lượng"
              />
            </div>
            <!-- Number of location -->
            <div class="form-group">
              <label>Số lượng vị trí:</label>
              <select
                name="location-number"
                id="location-number"
                v-model="form.productNew[0].quantityLocation"
              >
                <option value="1" selected>Chọn vị trí 1</option>
                <option value="2">Chọn vị trí 2</option>
              </select>
            </div>
            <!-- Danh mục select -->
            <div class="form-group">
              <label for="category_map">Danh mục:</label>
              <select
                v-model="form.productNew[0].category_map"
                id="category_map"
              >
                <option value="1">danh mục 1</option>
                <option value="2">Danh mục 2</option>
              </select>
            </div>

            <!-- Nhà cung cấp select -->
            <div class="form-group">
              <label for="suppliersNewProductForm">Nhà cung cấp:</label>
              <select
                v-model="form.productNew[0].suppliers"
                id="suppliersNewProductForm"
              >
                <option value="" disabled selected>Chọn nhà cung cấp</option>
                <option value="1000">lựa chọn nhà cung cấp 1000</option>
              </select>
            </div>
            <!-- Area ID select -->
            <div class="form-group">
              <label for="areaId">Khu vực:</label>
              <select id="areaId" v-model="form.productNew[0].areaId">
                <option value="1">Khu vực 1</option>
                <option value="2">Khu vực 2</option>
              </select>
            </div>
            <!-- location select -->
            <div class="form-group">
              <label for="location-new-product">Vị trí:</label>
              <select
                v-model="form.productNew[0].location"
                id="location-new-product"
              >
                <option value="1" disabled selected>1</option>
                <option value="1000">Vị trí 1000</option>
              </select>
            </div>
            <!-- Image upload New product -->
            <div class="upload-show-pr-img border">
              <div class="form-group">
                <label>Hình ảnh:</label>
                <input
                  type="file"
                  id="fileInput"
                  @change="uploadShowImagesProduct"
                  multiple
                  required
                />
              </div>
              <div class="show-img">
                <div
                  v-for="(image, index) in form.productNew[0].image"
                  :key="index"
                  class="img-container"
                >
                  <img :src="image" alt="Uploaded Image" class="uploaded-img" />
                </div>
              </div>
            </div>
            <button type="button" @click="addProduct('productNew')">
              Thêm sản phẩm mới
            </button>
          </div>
          <!-- Nếu là sản phẩm cũ -->
          <div v-else class="product-old">
            <h4>Sản phẩm cũ</h4>

            <!-- old product id -selection -->
            <div class="form-group">
              <label for="id-old-product">ID sản phẩm:</label>
              <select
                v-model="form.productOlds[0].id_product"
                id="id-old-product"
              >
                <option value="" disabled>Chọn ID sản phẩm</option>
                <option value="1">ID sản phẩm 1</option>
                <option value="2">ID sản phẩm 2</option>
              </select>
            </div>

            <!-- product old's name select -->
            <div class="form-group">
              <label for="old-product-name">Tên sản phẩm:</label>
              <select v-model="form.productOlds[0].name" id="old-product-name">
                <!-- Thêm các tùy chọn tên sản phẩm nếu có -->
                <option value="">Chọn tên sản phẩm</option>
                <option value="name1">Tên sản phẩm 1</option>
                <option value="name2">Tên sản phẩm 2</option>
              </select>
            </div>

            <!-- product input quantity -->
            <div class="form-group">
              <label>Số lượng:</label>
              <input
                type="number"
                v-model="form.productOlds[0].quantity"
                placeholder="Nhập số lượng"
                required
              />
            </div>

            <!-- product's areaID select -->
            <div class="form-group">
              <label for="area-product-old">Khu vực:</label>
              <select
                v-model="form.productOlds[0].areaId"
                id="area-product-old"
              >
                <option value="1">Area 1</option>
                <option value="2">Area 2</option>
              </select>
            </div>

            <!-- product's location -->
            <div class="form-group">
              <label for="location-old-product">Vị trí:</label>
              <select
                v-model="form.productOlds[0].location"
                id="location-old-product"
              >
                <option value="" disabled>Chọn vị trí</option>
                <option value="1000">Vị trí 1000</option>
                <!-- Thêm các tùy chọn vị trí khác nếu có -->
              </select>
            </div>

            <!-- Nhà cung cấp -->
            <div class="form-group">
              <label for="suppliersOldProductForm">Nhà cung cấp:</label>
              <select
                v-model="form.productOlds[0].supplier"
                id="suppliersOldProductForm"
              >
                <option value="1">Chọn nhà cung cấp 1</option>
                <option value="500">Lựa chọn nhà cung cấp 500</option>
              </select>
            </div>

            <button type="button" @click="addProduct('productOlds')">
              Thêm sản phẩm cũ
            </button>
          </div>
        </div>

        <div class="cabinet_product-show border">
          <h4>đây là hiển thị sản phẩm đã thêm vào form</h4>
        </div>
      </div>
      <!-- start select loction -->
      <div class="select-location-form form-container">
        <div class="select-location">
          <div class="warehouses form-group">
            <label for="selct-warehouset">Warehouses</label>
            <select
              id="selct-warehouse"
              v-model="selectedWarehouse"
              @change="handleWarehouseChange"
            >
              <option
                v-for="warehouse in warehouses"
                :key="warehouse.id"
                :value="warehouse.id"
              >
                {{ warehouse.name }}
              </option>
            </select>
          </div>
          <div class="floor form-group">
            <label for="select-floor"> Floor</label>
            <select
              v-model="selectedFloor"
              @change="handleFloorChange"
              :disabled="!selectedWarehouse"
            >
              <option
                v-for="floor in filteredFloors"
                :key="floor.id"
                :value="floor.id"
              >
                {{ floor.name }}
              </option>
            </select>
          </div>
          <div class="area form-group">
            <label for="select-area">Area</label>
            <select
              id="select-area"
              v-model="selectedArea"
              @change="handleAreaChange"
              :disabled="!selectedFloor"
            >
              <option
                v-for="area in filteredAreas"
                :key="area.id"
                :value="area.id"
              >
                {{ area.name }}
              </option>
            </select>
          </div>
          <div class="sheft form-group">
            <label for="select-sheft">Sheft</label>
            <select
              id="select-sheft"
              v-model="selectedSheft"
              @change="handleSheftChange"
              :disabled="!selectedArea"
            >
              <option
                v-for="sheft in filteredShefts"
                :key="sheft.id"
                :value="sheft.id"
              >
                {{ sheft.name }}
              </option>
            </select>
          </div>
        </div>
        <!-- Modal product show-->
        <div class="modal product-list" v-if="selectedLocation">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Products in cabinet {{ selectedLocationName }}</h3>
              <span type="button" class="close-button" @click="closeModal"
                >Close</span
              >
            </div>
            <ul style="display: flex; flex-wrap: wrap">
              <li
                v-for="product in filteredProducts"
                :key="product.id"
                class="item"
              >
                <img
                  :src="product.productImage[0]"
                  alt="product avata"
                  class="show_product-img"
                />
                <div class="show_product-info">
                  <p>
                    Name: <strong>{{ product.productName }}</strong>
                  </p>
                  <p>
                    Price: <strong>${{ product.price }}</strong>
                  </p>
                  <p>
                    Quantity:<strong>{{ product.quantity }}</strong>
                  </p>
                </div>
              </li>
            </ul>
            <div class="form-group">
              <label for="quantity-into">Quantity you put into:</label>
              <input type="number" id="quantity-into" />
            </div>
            <div>
              <button @click="loctionAccept">OK</button>
            </div>
          </div>
        </div>

        <div class="cabinets-btn border">
          <!-- Các button cho location -->
          <div class="location-buttons">
            <div
              v-for="(chunk, index) in chunkedLocations"
              :key="index"
              class="button-row"
            >
              <button
                v-for="location in chunk"
                :key="location.id"
                :value="location.id"
                @click="handleLocationChange(location.id)"
                :class="{ active: selectedLocation === location.id }"
              >
                {{ location.locationName }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- slect location End -->
      <div class="form-group">
        <label for="quantity">Tổng số lượng tất cả sản phẩm:</label>
        <input
          type="number"
          id="quantity"
          v-model="form.quantity"
          placeholder="Tổng số lượng tất cả sản phẩm"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="price">Giá trước thuế:</label>
        <input
          type="number"
          id="price"
          v-model="form.price"
          placeholder="Nhập giá"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="total">Tổng tiền sau thuế:</label>
        <input
          type="number"
          id="total"
          v-model="form.total"
          placeholder="Tổng tiền"
          disabled
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

      <div class="form-group">
        <label for="tax">Thuế:</label>
        <input
          type="number"
          id="tax"
          v-model="form.tax"
          placeholder="Nhập thuế"
        />
      </div>

      <div class="checkbox form-group">
        <label for="isPercentage">Thuế theo tỷ lệ:</label>
        <div class="checkbox-parent">
          <input
            type="checkbox"
            id="isPercentage"
            v-model="form.isPercentage"
          />
        </div>
      </div>
      <button type="submit">Lưu phiếu nhập</button>
      <button class="delete-btn" @click="resetAllFormData">
        Xóa Phiếu nhập
      </button>
    </form>
  </div>
  <button @click="downloadWarehouseData">tải json về máy</button>
</template>

<script setup>
  import { reactive, ref, computed } from "vue";

  const form = reactive({
    title: "",
    description: "",
    isProductNew: true,
    productOlds: [
      {
        id_product: 0,
        quantity: 0,
        areaId: 0,
        location: 0,
        supplier: 0,
      },
    ],
    productNew: [
      {
        title: "",
        description: "",
        price: 0,
        donViTinh: "",
        quantity: 0,
        quantityLocation: 0,
        category_map: 0,
        suppliers: 0,
        areaId: 0,
        location: 0,
        image: [""],
      },
    ],
    quantity: 0,
    price: 0,
    total: 0,
    deliveryAddress: "",
    tax: 0,
    isPercentage: false,
  });
  //   upload imge
  const uploadShowImagesProduct = (event) => {
    const files = event.target.files;
    const imageArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    form.productNew[0].image.push(...imageArray);
  };

  //-------------- reset NewProduct-----------
  const resetProductNew = () => {
    form.productNew[0] = [
      {
        title: "",
        description: "",
        price: 0,
        donViTinh: "",
        quantity: 0,
        quantityLocation: 0,
        category_map: 0,
        suppliers: 0,
        areaId: 0,
        location: 0,
        image: [""],
      },
    ];
  };

  //--------------reset old Product----------------
  const resetProductOlds = () => {
    form.productOlds[0] = [
      {
        id_product: 0,
        quantity: 0,
        areaId: 0,
        location: 0,
        supplier: 0,
      },
    ];
  };
  //  ----------- Reset All Data Funtion-----------
  const resetAllFormData = () => {
    form.value = [
      {
        title: "",
        description: "",
        isProductNew: true,
        productOlds: [
          {
            id_product: 0,
            quantity: 0,
            areaId: 0,
            location: 0,
            supplier: 0,
          },
        ],
        productNew: [
          {
            title: "",
            description: "",
            price: 0,
            donViTinh: "",
            quantity: 0,
            quantityLocation: 0,
            category_map: 0,
            suppliers: 0,
            areaId: 0,
            location: 0,
            image: [""],
          },
        ],
        quantity: 0,
        price: 0,
        total: 0,
        deliveryAddress: "",
        tax: 0,
        isPercentage: false,
      },
    ];
    resetProductNew();
    resetProductOlds();
  };
  // --------------------------------------
  // js select-location for product
  //------------------------------
  // Dữ liệu giả định vị trí và số sản phẩm trong 1 vị trí

  // Dữ liệu giả định
  const warehouses = ref([
    { id: 1, name: "Warehouse 1" },
    { id: 2, name: "Warehouse 2" },
  ]);

  const floors = ref([
    { id: 1, warehouseId: 1, name: "Floor 1" },
    { id: 2, warehouseId: 1, name: "Floor 2" },
    { id: 3, warehouseId: 2, name: "Floor 3" },
  ]);

  const areas = ref([
    { id: 1, floorId: 1, name: "Area 1" },
    { id: 2, floorId: 1, name: "Area 2" },
    { id: 3, floorId: 2, name: "Area 3" },
  ]);

  const shefts = ref([
    { id: 1, areaId: 1, name: "Sheft 1" },
    { id: 2, areaId: 2, name: "Sheft 2" },
  ]);

  const locations = ref([
    { id: 1, sheftId: 1, locationName: "1" },
    { id: 2, sheftId: 1, locationName: "2" },
    ...Array.from({ length: 18 }, (_, index) => ({
      id: index + 3, // id từ 3 đến 20
      sheftId: 1,
      locationName: `${index + 3}`,
    })),
  ]);

  const products = ref([
    {
      id: 1,
      locationId: 1,
      productName: "Product 1",
      price: 100,
      quantity: 10,
      productImage: [
        "https://th.bing.com/th/id/OIP.0fiNm1ZXkFZAf8utAxfRDgHaEP?rs=1&pid=ImgDetMain",
      ],
    },
    {
      id: 2,
      locationId: 2,
      productName: "Product 2",
      price: 150,
      quantity: 5,
      productImage: [
        "https://th.bing.com/th/id/OIP.0fiNm1ZXkFZAf8utAxfRDgHaEP?rs=1&pid=ImgDetMain",
      ],
    },
  ]);

  // Các giá trị được chọn
  const selectedWarehouse = ref(null);
  const selectedFloor = ref(null);
  const selectedArea = ref(null);
  const selectedSheft = ref(null);
  const selectedLocation = ref(null);
  const selectedProduct = ref(null);

  // Lưu tên location để hiển thị trong tiêu đề sản phẩm
  const selectedLocationName = computed(() => {
    const location = locations.value.find(
      (loc) => loc.id === selectedLocation.value
    );
    return location ? location.locationName : "";
  });

  // Các hàm để lọc dữ liệu
  const filteredFloors = computed(() => {
    return floors.value.filter(
      (floor) => floor.warehouseId === selectedWarehouse.value
    );
  });

  const filteredAreas = computed(() => {
    return areas.value.filter((area) => area.floorId === selectedFloor.value);
  });

  const filteredShefts = computed(() => {
    return shefts.value.filter((sheft) => sheft.areaId === selectedArea.value);
  });

  const filteredLocations = computed(() => {
    return locations.value.filter(
      (location) => location.sheftId === selectedSheft.value
    );
  });

  const filteredProducts = computed(() => {
    return products.value.filter(
      (product) => product.locationId === selectedLocation.value
    );
  });

  // Chia locations thành các nhóm 10
  const chunkedLocations = computed(() => {
    const chunkSize = 10;
    let result = [];
    for (let i = 0; i < filteredLocations.value.length; i += chunkSize) {
      result.push(filteredLocations.value.slice(i, i + chunkSize));
    }
    return result;
  });

  // Các hàm xử lý khi thay đổi lựa chọn
  const handleWarehouseChange = () => {
    selectedFloor.value = null;
    selectedArea.value = null;
    selectedSheft.value = null;
    selectedLocation.value = null;
    selectedProduct.value = null;
  };

  const handleFloorChange = () => {
    selectedArea.value = null;
    selectedSheft.value = null;
    selectedLocation.value = null;
    selectedProduct.value = null;
  };

  const handleAreaChange = () => {
    selectedSheft.value = null;
    selectedLocation.value = null;
    selectedProduct.value = null;
  };

  const handleSheftChange = () => {
    selectedLocation.value = null;
    selectedProduct.value = null;
  };

  const handleLocationChange = (locationId) => {
    selectedLocation.value = locationId;
  };
  // ---------------------------------------
  // ---close modal--
  const closeModal = () => {
    selectedLocation.value = null;
  };
  const AddedProducts = reactive({
    productNew: [],
    productOlds: [],
  });
  const addProduct = (type) => {
    if (
      type === "productNew" &&
      form.productNew[0].title &&
      form.productNew[0].description &&
      form.productNew[0].price >= 0 &&
      form.productNew[0].donViTinh &&
      form.productNew[0].quantity >= 0 &&
      form.productNew[0].quantityLocation >= 0 &&
      form.productNew[0].category_map >= 0 &&
      form.productNew[0].suppliers >= 0 &&
      form.productNew[0].areaId >= 0 &&
      form.productNew[0].location &&
      (form.productNew[0].image.length >= 0 ||
        form.productNew[0].image[0] >= "")
    ) {
      AddedProducts.productNew.push({ ...form.productNew[0] });
      resetProductNew();
    } else if (
      type === "productOlds" &&
      form.productOlds[0].id_product >= 0 &&
      form.productOlds[0].quantity >= 0 &&
      form.productOlds[0].areaId >= 0 &&
      form.productOlds[0].location >= 0 &&
      form.productOlds[0].supplier >= 0
    ) {
      AddedProducts.productOlds.push({ ...form.productOlds[0] });
      resetProductOlds();
    } else {
      console.error("lỗi dữ liệu ..");
      resetAllFormData();
    }
  };

  // Xử lý gửi dữ liệu
  const handleSubmit = () => {
    console.log("Phiếu nhập đã gửi:", form);
    // Gửi dữ liệu lên API ở đây
  };
</script>

<style scoped>
  .form-container {
    max-width: 100%;
    margin: 20px auto;
    padding: 5px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  .select-location div label {
    width: 30%;
  }
  .select-location div select {
    width: 70%;
  }
  h4 {
    margin: 20px 0;
    font-weight: bold;
    color: red;
  }
  h3 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 10px;
  }
  .upload-show-pr-img {
    flex-direction: column;
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
  .form-group input,
  .form-group select,
  .form-group textarea:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    outline: none;
  }
  .form-group input,
  .form-group select,
  .form-group textarea:focus::placeholder {
    font-style: italic;
  }
  .delete-btn {
    background-color: red;
  }
  .delete-btn:hover {
    background-color: rgb(222, 210, 210);
    color: red;
  }
  button {
    margin: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
  /* css for checkbox */
  .form-group input label {
    align-items: center;
    cursor: pointer;
  }
  .form-group .checkbox-parent {
    flex: 2;
    align-items: center;
  }
  #isProductNew,
  #isPercentage {
    flex: none;
    float: left;
    left: 0;
  }
  /* set check box to square */
  .form-group input[type="checkbox"] {
    appearance: none;
    border: 2px solid #007bff; /* Đặt màu viền cho checkbox */
    width: 30px; /* Chiều rộng của checkbox */
    height: 30px; /* Chiều cao của checkbox */
    border-radius: 0; /* Bỏ border-radius để có hình vuông */
    margin-right: 10px;
    transition: all 0.3s ease;
    position: relative;
  }

  /* when checkbox have chosese */
  .form-group input[type="checkbox"]:checked {
    background-color: #007bff;
    border-color: #007bff;
  }
  .form-group input[type="checkbox"]:checked::after {
    content: "✓";
    color: white;
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* hover for checkbox */
  .form-group:hover input[type="checkbox"] {
    border-color: #0056b3;
  }

  .product-new,
  .product-old {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }

  .product-new input,
  .product-old input,
  .product-new select,
  .product-old select {
    flex: 2;
    max-width: 66.6%;
    box-sizing: border-box;
  }

  .product-new button,
  .product-old button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  .product-new button:hover,
  .product-old button:hover {
    background-color: darkred;
  }
  .product-new,
  .product-old {
    margin-bottom: 20px;
  }
  .product_info-group {
    display: flex;
    margin: 10px 0;
    gap: 10px;
    padding: 10px;
    background-color: #f5eeee;
  }
  .border {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 5px;
  }
  .product-info-form,
  .cabinet_product-show {
    min-height: 100%;
    width: 100%;
    height: 100%;
    margin: 20px auto;
    padding: 20px;
  }
  .cabinet_product-show {
    min-height: 900px;
  }
  /* css for modal .product-list */
  .product-list {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Màu nền mờ */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px; /* Thêm padding để tránh nội dung bị tràn */
    overflow: auto; /* Đảm bảo có thể cuộn nếu nội dung dài */
  }
  /* Nội dung Modal */
  .modal-content {
    background: white;
    width: 90%;
    max-width: 900px;
    max-height: 90vh; /* Giới hạn chiều cao tối đa để tránh tràn màn hình */
    overflow-y: auto; /* Cho phép cuộn khi nội dung dài */
    padding: 0;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: fadeIn 0.3s ease-in-out;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Màu nền mờ */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px; /* Thêm padding để tránh nội dung bị tràn */
    overflow: auto; /* Đảm bảo có thể cuộn nếu nội dung dài */
  }

  /* Nội dung Modal */
  .modal-content {
    background: white;
    width: 90%;
    max-width: 900px;
    max-height: 90vh; /* Giới hạn chiều cao tối đa để tránh tràn màn hình */
    overflow-y: auto; /* Cho phép cuộn khi nội dung dài */
    padding: 0;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: fadeIn 0.3s ease-in-out;
  }

  /* Hiệu ứng mở modal */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ?bám dimhs hiển thị sản phẩm của header-modal */
  .modal-header {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    padding: 16px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  /* Nút đóng modal */
  .close-button {
    position: sticky;
    top: 0;
    left: 0;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    color: #fff;
    background-color: #e74c3c;
    border: none;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-weight: bold;
  }

  .close-button:hover {
    background-color: #c0392b;
    transform: translateY(-55%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  /* Tiêu đề */
  h3 {
    text-align: center;
    margin-bottom: 15px;
  }

  /* Danh sách sản phẩm */
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(
      3,
      1fr
    ); /* Hiển thị 3 cột trên màn hình lớn */
    gap: 15px;
  }

  /* Mỗi sản phẩm */
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
    margin: 10px;
  }

  /* Ảnh sản phẩm */
  .show_product-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }

  /* Thông tin sản phẩm */
  .show_product-info {
    text-align: center;
    margin-top: 10px;
  }

  .show_product-info p {
    margin: 5px 0;
  }

  /* Input số lượng */
  .show_product-info input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-top: 5px;
  }
  /* show new product's images */
  .upload-show-pr-img {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .show-img {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .img-container {
    flex: 1 1 100px; /* Tùy chỉnh kích thước của ảnh */
    max-width: 100px;
    max-height: 100px;
  }

  .uploaded-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cabinet_product-show {
    max-height: 900px;
    overflow: scroll;
  }
  /* ccss cho btn locations */
  .cabinets-btn {
    width: 100%;
    max-height: min-content;
  }
  .location-buttons {
    width: 100%;
    margin-top: 20px;
    overflow-x: auto; /* Thêm thanh cuộn ngang khi cần */
    white-space: nowrap; /* Ngăn các button tràn xuống dòng mới */
  }
  .location-buttons button {
    max-width: 8%;
    margin: 5px;
    padding: 5px;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 8px; /* Thêm border-radius để bo góc button */
    flex: 1 0 9%; /* Giới hạn kích thước của button sao cho có tối đa 10 button trên 1 hàng */
    box-sizing: border-box; /* Đảm bảo padding và margin không ảnh hưởng đến kích thước button */
  }
  .button-row {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
  }
  .cabinets-btn button.active {
    background-color: #01f40d;
  }

  .cabinets-btn button:disabled {
    background-color: gray;
  }

  @media (max-width: 768px) {
    .product_info-group {
      flex-wrap: wrap;
    }
  }
  /* Phần hiển thị sản phẩm đã được thêm */
</style>
