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
            <!-- start select loction -->
            <!-- ware houses select -->
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
                <!-- Floor select -->
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
                <!-- Area select -->
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
                <!-- Sheft select -->
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
            <!-- ware houses select -->
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
                <!-- Floor select -->
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
                <!-- Area select -->
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
                <!-- Sheft select -->
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
                    <input
                      type="number"
                      v-model="form.productOlds[0].quantity"
                      placeholder="Nhập số lượng"
                      required
                    />
                    <button @click="addProduct('productOlds')">Ok</button>
                  </div>
                </li>
              </ul>
              <div>
                <button @click="loctionAccept">OK</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cabinet_product-show">
          <h4>This form Products have addad</h4>
          <div class="showProduct_added">
            <div class="product-grid">
              <!-- show-product added -->
              <div
                v-for="(product, index) in productNewAdded"
                :key="index"
                class="product-card"
              >
                <img
                  :src="
                    product.image &&
                    Array.isArray(product.image) &&
                    product.image.length > 0
                      ? product.image[0]
                      : defaultImage
                  "
                  alt="Product Image"
                  class="product-image"
                />
                <p class="product-name">
                  <strong>{{ product.title }}</strong>
                </p>
                <p class="product-quantity">Quantity: {{ product.quantity }}</p>
                <p class="product-price">
                  Giá: {{ formatPrice(product.price) }}
                </p>
                <button
                  class="edit-button"
                  @click="editProduct(index, 'newProduct')"
                >
                  Sửa
                </button>
                <button
                  style="background-color: red"
                  class="edit-button"
                  @click="delproduct(index, 'newProduct')"
                >
                  delete
                </button>
              </div>
              <!-- old product -->
              <div
                v-for="(product, index) in productOldsAdded"
                :key="index"
                class="product-card"
              >
                <img
                  :src="
                    product.image &&
                    Array.isArray(product.image) &&
                    product.image.length > 0
                      ? product.image[0]
                      : defaultImage
                  "
                  alt="Product Image"
                  class="product-image"
                />
                <p class="product-name">
                  <strong>{{ product.title }}</strong>
                </p>
                <p class="product-quantity">Quantity: {{ product.quantity }}</p>
                <p class="product-price">
                  Giá: {{ formatPrice(product.price) }}
                </p>
                <button
                  class="edit-button"
                  @click="editProduct(index, 'newProduct')"
                >
                  Sửa
                </button>
                <button
                  style="background-color: red"
                  class="edit-button"
                  @click="delproduct(index, 'newProduct')"
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        image: [],
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
        image: [],
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
            image: [],
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
  // product in cabinet
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

  //   const productNewAdded = ref([]);
  //   const productOldsAdded = ref([]);
  //   const addProduct = (type) => {
  //     if (type === "productNew") {
  //       productNewAdded.value.push({ ...form.productNew[0] });
  //       resetProductNew();
  //     } else if (type === "productOlds") {
  //       productOldsAdded.value.push({ ...form.productOlds[0] });
  //       resetProductOlds();
  //     } else {
  //       console.error("lỗi dữ liệu ..");
  //       // resetAllFormData();
  //     }
  //   };
  // --------------
  // Khai báo danh sách sản phẩm bằng `ref`
  // const productss = ref([
  //   {
  //     name: "Sản phẩm 1",
  //     quantity: 10,
  //     price: 100000,
  //     image:
  //       "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg",
  //   },
  //   {
  //     name: "Sản phẩm 1",
  //     quantity: 10,
  //     price: 100000,
  //     image:
  //       "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg",
  //   },
  //   {
  //     name: "Sản phẩm 1",
  //     quantity: 10,
  //     price: 100000,
  //     image:
  //       "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg",
  //   },
  //   {
  //     name: "Sản phẩm 1",
  //     quantity: 10,
  //     price: 100000,
  //     image:
  //       "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg",
  //   },
  //   {
  //     name: "Sản phẩm 1",
  //     quantity: 10,
  //     price: 100000,
  //     image:
  //       "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg",
  //   },
  // ]);
  // const productsss = ref([
  //   {
  //     name: "Sản phẩm 1",
  //     quantity: 10,
  //     price: 100000,
  //     image:
  //       "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg",
  //   },
  //   {
  //     name: "Sản phẩm 1",
  //     quantity: 10,
  //     price: 100000,
  //     image:
  //       "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg",
  //   },
  //   {
  //     name: "Sản phẩm 1",
  //     quantity: 10,
  //     price: 100000,
  //     image:
  //       "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg",
  //   },
  //   {
  //     name: "Sản phẩm 1",
  //     quantity: 10,
  //     price: 100000,
  //     image:
  //       "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg",
  //   },
  //   {
  //     name: "Sản phẩm 1",
  //     quantity: 10,
  //     price: 100000,
  //     image:
  //       "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg",
  //   },
  // ]);
  // // test=----------------
  // const productssss = ref([]);
  // const productts = () => {
  //   productssss.value.push(...productsss.value);
  // };
  // productts();
  // Hàm định dạng giá tiền
  const productNewAdded = ref([]);
  const productOldsAdded = ref([]);

  const addProduct = (type) => {
    if (type === "productNew") {
      productNewAdded.value.push(
        JSON.parse(JSON.stringify(form.productNew[0]))
      );
      resetProductNew();
    } else if (type === "productOlds") {
      productOldsAdded.value.push(
        JSON.parse(JSON.stringify(form.productOlds[0]))
      );
      resetProductOlds();
    } else {
      console.error("Lỗi dữ liệu...");
      resetAllFormData;
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Hàm xử lý khi nhấn nút "Sửa thông tin"
  // const editProduct = (index, type) => {
  //   if (type === "newProduct") {
  //     alert(`Sửa thông tin cho ${productNewAdded.value[index].name}`);
  //   } else if (type === "oldProduct") {
  //     alert(`Sửa thông tin cho ${productOldsAdded.value[index].name}`);
  //   }
  // };

  const editProduct = (index, type) => {
    if (type === "newProduct") {
      const product = productNewAdded.value[index];

      const newTitle = prompt("Nhập tên mới:", product.title);
      const newPrice = prompt("Nhập giá mới:", product.price);
      const newQuantity = prompt("Nhập số lượng mới:", product.quantity);

      if (newTitle !== null) product.title = newTitle;
      if (newPrice !== null) product.price = parseFloat(newPrice);
      if (newQuantity !== null) product.quantity = parseInt(newQuantity);

      alert(`Đã cập nhật sản phẩm "${product.title}"`);
    } else if (type === "oldProduct") {
      const product = productOldsAdded.value[index];

      const newSupplier = prompt("Nhập nhà cung cấp mới:", product.supplier);
      const newQuantity = prompt("Nhập số lượng mới:", product.quantity);
      const newLocation = prompt("Nhập vị trí mới:", product.location);

      if (newSupplier !== null) product.supplier = newSupplier;
      if (newQuantity !== null) product.quantity = parseInt(newQuantity);
      if (newLocation !== null) product.location = newLocation;

      alert(`Đã cập nhật sản phẩm ID: ${product.id_product}`);
    } else {
      console.error("Lỗi: Loại sản phẩm không hợp lệ.");
    }
  };

  // const delproduct = (index, type) => {
  //   if (type === "newProduct") {
  //     alert(`xóa sản phẩm thứ ${productNewAdded.value[index].name}`);
  //   } else if (type === "oldProduct") {
  //     alert(`xóa sản phẩm thứ:${productOldsAdded.value[index].name}`);
  //   }
  // };

  const delproduct = (index, type) => {
    if (type === "newProduct") {
      const productName = productNewAdded.value[index]?.title || "không có tên";
      const confirmDelete = confirm(
        `Bạn có chắc muốn xóa sản phẩm: ${productName}?`
      );

      if (confirmDelete) {
        productNewAdded.value.splice(index, 1); // Xóa sản phẩm khỏi mảng
        alert(`Sản phẩm "${productName}" đã bị xóa!`);
      }
    } else if (type === "oldProduct") {
      const productName =
        productOldsAdded.value[index]?.id_product || "không có tên";
      const confirmDelete = confirm(
        `Bạn có chắc muốn xóa sản phẩm có ID: ${productName}?`
      );

      if (confirmDelete) {
        productOldsAdded.value.splice(index, 1); // Xóa sản phẩm khỏi mảng
        alert(`Sản phẩm có ID "${productName}" đã bị xóa!`);
      }
    } else {
      console.error("Lỗi: Loại sản phẩm không hợp lệ.");
    }
  };

  const defaultImage =
    "https://th.bing.com/th/id/OIP.C6TzyAievTqJTjBRMcTJVAHaHa?rs=1&pid=ImgDetMain"; // Hình mặc định nếu không có ảnh
  // Xử lý gửi dữ liệu
  const handleSubmit = () => {
    console.log("Phiếu nhập đã gửi:", form);
    // Gửi dữ liệu lên API ở đây
  };
</script>
