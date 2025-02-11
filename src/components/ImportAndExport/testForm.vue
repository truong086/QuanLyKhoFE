<template>
  <div class="container">
    <form @submit.prevent="submitFormImprt">
      <div class="header-section-form">
        <!-- isProductNew Checkbox -->
        <div class="checkbox_isNewProduct">
          IS NEW PRODUCT:
          <label for="isProductNew" style="width: 100%">
            <input
              v-model="formData.isProductNew"
              type="checkbox"
              id="isProductNew"
            />
          </label>
        </div>

        <!-- Tittle and Description -->
        <div class="wrap-items">
          <div class="input-container">
            <label for="tite">Title:</label>
            <input v-model="formData.tite" type="text" id="tite" required />
          </div>
          <div class="input-container">
            <label for="description">Description:</label>
            <input
              v-model="formData.description"
              type="text"
              id="description"
              required
            />
          </div>
        </div>
      </div>
      <!-- header-section-End -->
      <!--  -->
      <!-- Body form -->
      <div class="body-form">
        <div class="body-section-form">
          <!-- Product New (Visible if isProductNew is true) -->
          <div class="ProductNew" v-if="formData.isProductNew">
            <h3
              style="
                padding: 20px;
                margin: 20px auto;
                width: 100%;
                color: aliceblue;
                background-color: rgba(50, 20, 50, 0.9);
              "
            >
              Product New
            </h3>

            <div class="body-section-form-1">
              <div class="box">
                <div class="input-container">
                  <label for="productNewTitle">Title:</label>
                  <input
                    v-model="formData.productNew[0].title"
                    type="text"
                    id="productNewTitle"
                    required
                  />
                </div>
                <div class="input-container">
                  <label for="productNewDescription">Description:</label>
                  <input
                    v-model="formData.productNew[0].description"
                    type="text"
                    id="productNewDescription"
                    required
                  />
                </div>
                <div class="input-container">
                  <label for="productNewPrice">Price:</label>
                  <input
                    v-model="formData.productNew[0].price"
                    type="number"
                    id="productNewPrice"
                    required
                  />
                </div>
                <div class="select-container">
                  <label for="productNewDonViTinh">chọn đơn vị tính:</label>
                  <select name="productNewDonViTinh" id="productNewDonViTinh">
                    <option value="1">Bao</option>
                    <option value="2" selected>kiện</option>
                    <option value="3">Thùng</option>
                  </select>
                </div>

                <div class="select-container">
                  <label for="productNewcategory_map">category_map:</label>
                  <select
                    name="productNewcategory_map"
                    id="productNewcategory_map"
                  >
                    <option value="Newcategory_map-1">Newcategory_map 1</option>
                    <option value="Newcategory_map-2" selected>
                      Newcategory_map 2
                    </option>
                    <option value="Newcategory_map-3">Newcategory_map 3</option>
                  </select>
                </div>

                <div class="select-container">
                  <label for="productNewsuppliers">Nhà CC:</label>
                  <select name="productNewsuppliers" id="productNewsuppliers">
                    <option value="suppliers-1">suppliers 1</option>
                    <option value="suppliers-2" selected>suppliers 2</option>
                    <option value="suppliers-3">suppliers 3</option>
                  </select>
                </div>
              </div>
              <!-- event button use for molbile interface for show product have added.. -->

              <button
                id="showAddedProduct_btn"
                @click="showAddedProduct_funtion"
              >
                Show products you have added
              </button>

              <!-- div show products have added -->
              <div v-if="show_Added_product" class="box">
                <div class="showProduct_added">
                  <div class="product-grid">
                    <div
                      v-for="(product, index) in products"
                      :key="index"
                      class="product-card"
                    >
                      <img
                        :src="product.image"
                        alt="Product Image"
                        class="product-image"
                      />
                      <h3 class="product-name">{{ product.name }}</h3>
                      <p class="product-quantity">
                        Số lượng vừa thêm: {{ product.quantity }}
                      </p>
                      <p class="product-price">
                        Giá: {{ formatPrice(product.price) }}
                      </p>
                      <button class="edit-button" @click="editProduct(index)">
                        Sửa thông tin
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              v-if="formData.isProductNew"
              @click="AddNew_product"
              class="edit-button add-button"
            >
              Add This Product in this form
            </button>
            <button
              v-else
              @click="AddOld_product"
              class="edit-button add-button"
            >
              Add This Product in this form
            </button>
            <br /><br />
            <hr />

            <div class="select-container-position">
              <label>Chọn Tầng - kho:</label>
              <select v-model="selectedWarehouse">
                <option
                  v-for="(warehouse, wIndex) in warehouses"
                  :key="wIndex"
                  :value="wIndex"
                >
                  {{ warehouse.name }}
                </option>
              </select>
            </div>

            <!-- Chọn khu -->
            <div class="select-container-position">
              <label v-if="selectedWarehouse !== null">Chọn Khu:</label>
              <select v-model="selectedArea" v-if="selectedWarehouse !== null">
                <option
                  v-for="(area, aIndex) in warehouses[selectedWarehouse].areas"
                  :key="aIndex"
                  :value="aIndex"
                >
                  {{ area.name }}
                </option>
              </select>
            </div>

            <!-- Chọn dãy tủ -->
            <div class="select-container-position">
              <label v-if="selectedArea !== null">Chọn Dãy:</label>
              <select v-model="selectedRow" v-if="selectedArea !== null">
                <option
                  v-for="(row, rIndex) in warehouses[selectedWarehouse].areas[
                    selectedArea
                  ].rows"
                  :key="rIndex"
                  :value="rIndex"
                >
                  {{ row.name }}
                </option>
              </select>
            </div>

            <!-- Hiển thị các tủ dưới dạng button -->
            <div v-if="selectedRow !== null" class="cabinets-container">
              <h3>Danh sách tủ:</h3>
              <div class="cabinets-grid">
                <button
                  v-for="(cabinet, cIndex) in warehouses[selectedWarehouse]
                    .areas[selectedArea].rows[selectedRow].cabinets"
                  :key="cIndex"
                  @click="selectCabinet(cIndex)"
                  class="cabinet-button"
                >
                  Tủ {{ cIndex + 1 }}
                </button>
              </div>
            </div>
            <!-- Cửa sổ hiển thị chi tiết tủ -->
            <div v-if="showModal" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h3>Thông tin hàng hóa trong tủ:</h3>
                  <span type="button" class="close-button" @click="closeModal"
                    >Close</span
                  >
                </div>
                <ul>
                  <li
                    v-for="(item, index) in selectedCabinetDetails"
                    :key="index"
                    class="item"
                  >
                    <img
                      :src="item.image"
                      alt="Hình ảnh"
                      class="show_product-img"
                    />
                    <div class="show_product-info">
                      <p><strong>Tên hàng hóa:</strong> {{ item.name }}</p>
                      <p><strong>Số lượng:</strong> {{ item.quantity }}</p>
                      <p><strong>Đơn giá:</strong> {{ item.price }} VNĐ</p>
                      <div class="flex-row-nwarp">
                        <label for="productNewQuantityLocation" class="flex1"
                          >How many product</label
                        >
                        <input
                          class="flex1"
                          v-model="formData.productNew[0].quantityLocation"
                          type="number"
                          id="productNewQuantityLocation"
                          placeholder="nha"
                        />
                      </div>
                      <button @click="Add_product" class="add-product">
                        Accept
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!--  -->

            <div class="input-container">
              <label for="productNewlocation">location:</label>
              <input
                v-model="formData.productNew[0].location"
                type="number"
                id="productNewlocation"
                required
              />
            </div>
            <div class="upload_view-image">
              <table style="width: 100%">
                <tr>
                  <td style="width: 25%">
                    <label for="productNewimage">Image:</label>
                  </td>
                  <td style="width: 75%">
                    <input
                      style="width: 100%"
                      type="file"
                      id="productNewimage"
                      multiple
                      accept="image/*"
                      @change="previewImages"
                    />
                  </td>
                </tr>
              </table>
              <section id="preview" class="show-image">
                <div
                  v-for="(image, index) in images"
                  :key="index"
                  class="image-item"
                >
                  <img :src="image" alt="Preview Image" />
                </div>
              </section>
            </div>
          </div>

          <!-- Product Olds (Visible if isProductNew is false) -->
          <div class="ProductOld" v-else>
            <h3
              style="
                padding: 20px;
                margin: 20px auto;
                width: 100%;
                color: aliceblue;
                background-color: rgba(50, 20, 50, 0.9);
              "
            >
              Product Old
            </h3>
            <div class="input-container">
              <label for="id_product">Product ID:</label>
              <input
                v-model="formData.productOlds[0].id_product"
                type="number"
                id="id_product"
                required
              />
            </div>
            <div class="input-container">
              <label for="productOldQuantity">Quantity:</label>
              <input
                v-model="formData.productOlds[0].quantity"
                type="number"
                id="productOldQuantity"
                required
              />
            </div>
            <div class="input-container">
              <label for="productOldLocation">Location:</label>
              <input
                v-model="formData.productOlds[0].location"
                type="number"
                id="productOldLocation"
                required
              />
            </div>
            <!-- chọn vị trí -->
            <!-- <h2>Chọn vị trí tủ</h2>
            <label for="productNewareaIdOld">Vị trí lưu sản phẩm</label>
            <input
              id="productNewareaIdOld"
              class="productNewareaId"
              type="text"
              v-model="productNewareaId"
              readonly
            /> -->
            <div class="select-container">
              <label>Chọn Tầng - Kho:</label>
              <select v-model="selectedWarehouse">
                <option
                  v-for="(warehouse, wIndex) in warehouses"
                  :key="wIndex"
                  :value="wIndex"
                >
                  {{ warehouse.name }}
                </option>
              </select>
            </div>

            <div class="select-container">
              <label v-if="selectedWarehouse !== null">Chọn Khu:</label>
              <select v-model="selectedArea" v-if="selectedWarehouse !== null">
                <option
                  v-for="(area, aIndex) in warehouses[selectedWarehouse].areas"
                  :key="aIndex"
                  :value="aIndex"
                >
                  {{ area.name }}
                </option>
              </select>
            </div>

            <div class="select-container">
              <label v-if="selectedArea !== null">Chọn Dãy:</label>
              <select v-model="selectedRow" v-if="selectedArea !== null">
                <option
                  v-for="(row, rIndex) in warehouses[selectedWarehouse].areas[
                    selectedArea
                  ].rows"
                  :key="rIndex"
                  :value="rIndex"
                >
                  {{ row.name }}
                </option>
              </select>
            </div>

            <!-- Hiển thị danh sách tủ -->
            <div v-if="selectedRow !== null" class="cabinets-container">
              <h3>Danh sách tủ:</h3>
              <div class="cabinets-grid">
                <button
                  v-for="(cabinet, cIndex) in warehouses[selectedWarehouse]
                    .areas[selectedArea].rows[selectedRow].cabinets"
                  :key="cIndex"
                  @click="selectCabinet(cIndex)"
                  class="cabinet-button"
                >
                  Tủ {{ cIndex + 1 }}
                </button>
              </div>
            </div>

            <!-- Cửa sổ hiển thị chi tiết tủ -->
            <div v-if="showModal" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <span type="button" class="close-button" @click="closeModal"
                    >Close</span
                  >
                  <h3>Thông tin hàng hóa trong tủ:</h3>
                </div>
                <ul>
                  <li
                    v-for="(item, index) in selectedCabinetDetails"
                    :key="index"
                    class="item"
                  >
                    <img
                      :src="item.image"
                      alt="Hình ảnh"
                      class="show_product-img"
                    />
                    <div class="show_product-info">
                      <p><strong>Tên hàng hóa:</strong> {{ item.name }}</p>
                      <p><strong>Số lượng:</strong> {{ item.quantity }}</p>
                      <p><strong>Đơn giá:</strong> {{ item.price }} VNĐ</p>
                      <div>
                        <input
                          v-model="formData.productNew[0].quantityLocation"
                          type="number"
                          id="productNewQuantityLocation"
                          required6
                        />
                      </div>
                      <button @click="Add_product" class="add-product">
                        Accept
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="select-container">
              <label for="productOldSupplier">Nhà CC:</label>
              <select name="productOldSupplier" id="productOldSupplier">
                <option value="suppliers-1">suppliers 1</option>
                <option value="suppliers-2" selected>suppliers 2</option>
                <option value="suppliers-3">suppliers 3</option>
              </select>
            </div>
          </div>
        </div>

        <div class="bottom-section-form">
          <div class="form-common-file">
            <!-- Common Fields -->
            <div class="input-container">
              <label for="quantity">Quantity:</label>
              <input
                v-model="formData.quantity"
                type="number"
                id="quantity"
                required
              />
            </div>
            <div class="input-container">
              <label for="price">Price:</label>
              <input
                v-model="formData.price"
                type="number"
                id="price"
                required
              />
            </div>
            <div class="input-container">
              <label for="total">Total:</label>
              <input
                v-model="formData.total"
                type="number"
                id="total"
                required
              />
            </div>
            <div class="input-container">
              <label for="deliveryAddress">Delivery Address:</label>
              <input
                v-model="formData.deliveryAddress"
                type="text"
                id="deliveryAddress"
                required
              />
            </div>
            <div class="input-container">
              <label for="tax">Tax:</label>
              <input v-model="formData.tax" type="number" id="tax" required />
            </div>
            <div class="checkbox_isNewProduct">
              <label for="isPercentage">Is Percentage:</label>
              <input
                v-model="formData.isPercentage"
                type="checkbox"
                id="isPercentage"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- End Body-form-->

      <!--  -->
      <!-- footer-form -->
      <div class="footer-form">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { reactive, ref } from "vue";
  const formData = reactive({
    title: "", // Sửa lỗi "tite" thành "title"
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
        areaId: "",
        location: 0,
        image: ref([]),
      },
    ],
    quantity: 0,
    price: 0,
    total: 0,
    deliveryAddress: "",
    tax: 0,
    isPercentage: true,
  });

  // Khai báo danh sách sản phẩm bằng `ref`
  const products = ref([
    {
      name: "Sản phẩm 1",
      quantity: 10,
      price: 100000,
      image:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg",
    },
  ]);

  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Hàm xử lý khi nhấn nút "Sửa thông tin"
  const editProduct = (index) => {
    alert(`Sửa thông tin cho ${products.value[index].name}`);
  };
  // Dữ liệu kho hàng
  const warehouses = ref([
    {
      name: "Kho A",
      areas: [
        {
          name: "1",
          rows: [
            {
              name: "1",
              cabinets: Array.from({ length: 20 }, () => [
                {
                  image:
                    "https://th.bing.com/th/id/OIP.n2J-te2edVD91F8w6udMmgHaHa?w=163&h=180&c=7&r=0&o=5&pid=1.7",
                  name: "Hàng hóa A",
                  quantity: 10,
                  price: 50000,
                },
                {
                  image:
                    "https://th.bing.com/th/id/OIP.n2J-te2edVD91F8w6udMmgHaHa?w=163&h=180&c=7&r=0&o=5&pid=1.7",
                  name: "Hàng hóa A",
                  quantity: 10,
                  price: 50000,
                },
                {
                  image:
                    "https://th.bing.com/th/id/OIP.n2J-te2edVD91F8w6udMmgHaHa?w=163&h=180&c=7&r=0&o=5&pid=1.7",
                  name: "Hàng hóa A",
                  quantity: 10,
                  price: 50000,
                },
                {
                  image:
                    "https://th.bing.com/th/id/OIP.n2J-te2edVD91F8w6udMmgHaHa?w=163&h=180&c=7&r=0&o=5&pid=1.7",
                  name: "Hàng hóa A",
                  quantity: 10,
                  price: 50000,
                },
                {
                  image:
                    "https://th.bing.com/th/id/OIP.n2J-te2edVD91F8w6udMmgHaHa?w=163&h=180&c=7&r=0&o=5&pid=1.7",
                  name: "Hàng hóa A",
                  quantity: 10,
                  price: 50000,
                },
                {
                  image:
                    "https://th.bing.com/th/id/OIP.JJzQ03RwgZT5qhXIHjgMXQHaJQ?rs=1&pid=ImgDetMain",
                  name: "Hàng hóa A",
                  quantity: 10,
                  price: 50000,
                },
                {
                  image:
                    "https://th.bing.com/th/id/OIP.n2J-te2edVD91F8w6udMmgHaHa?w=163&h=180&c=7&r=0&o=5&pid=1.7",
                  name: "Hàng hóa A",
                  quantity: 10,
                  price: 50000,
                },
                {
                  image:
                    "https://th.bing.com/th/id/OIP.GvNakgya1kk5A6CFQM6Z4gHaHZ?rs=1&pid=ImgDetMain",
                  name: "Hàng hóa A",
                  quantity: 10,
                  price: 50000,
                },
                {
                  image:
                    "https://th.bing.com/th/id/OIP.vz3cycLecmyDwRm64tRxUgHaHa?rs=1&pid=ImgDetMain",
                  name: "Hàng hóa A",
                  quantity: 10,
                  price: 50000,
                },
                {
                  image:
                    "https://th.bing.com/th/id/OIP.n2J-te2edVD91F8w6udMmgHaHa?w=163&h=180&c=7&r=0&o=5&pid=1.7",
                  name: "Hàng hóa A",
                  quantity: 10,
                  price: 50000,
                },
              ]),
            },
          ],
        },
      ],
    },
  ]);

  // Biến trạng thái
  const selectedWarehouse = ref(null);
  const selectedArea = ref(null);
  const selectedRow = ref(null);
  const productNewareaId = ref("");
  // const selectedCabinetDetails = ref(null);
  const selectedCabinetDetails = ref([]); // Giờ là mảng chứa danh sách sản phẩm
  const showModal = ref(false);
  const show_Added_product = ref(true);
  const showAddedProduct_funtion = () => {
    if (window.innerWidth > 768) {
      show_Added_product.value = true;
    } else {
      show_Added_product.value = !show_Added_product.value;
    }
  };
  const selectCabinet = (cIndex) => {
    if (
      selectedWarehouse.value !== null &&
      selectedArea.value !== null &&
      selectedRow.value !== null
    ) {
      const warehouse = warehouses.value[selectedWarehouse.value];
      const area = warehouse.areas[selectedArea.value];
      const row = area.rows[selectedRow.value];
      const cabinetNumber = cIndex + 1;

      productNewareaId.value = `${warehouse.name}-${area.name}-${row.name}-${cabinetNumber}`;
      //hiển thị thông tin sản phẩm của mỗi tủ
      const cabinets =
        warehouses.value[selectedWarehouse.value].areas[selectedArea.value]
          .rows[selectedRow.value].cabinets;
      selectedCabinetDetails.value = cabinets[cIndex]; // Cập nhật danh sách sản phẩm
      showModal.value = true;
    }
  };

  // Đóng cửa sổ chi tiết
  const closeModal = () => {
    showModal.value = false;
    selectedCabinetDetails.value = [];
  };

  const previewImages = (event) => {
    const files = event.target.files;
    formData.productNew[0].image.value = []; // Sửa lỗi gán image

    if (files.length) {
      const previewDiv = document.getElementById("preview");
      previewDiv.innerHTML = "";

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          formData.productNew[0].image.value.push(e.target.result);
          const img = document.createElement("img");
          img.src = e.target.result;
          img.style.width = "100px";
          img.style.margin = "5px";
          previewDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const submitFormImprt = () => {
    console.log(formData);
    // Gửi dữ liệu đến API
  };
</script>
<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .container {
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fffcfc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: scroll;
  }
  form {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .header-section-form {
    margin: 0 auto;
    padding: 10px;
    width: 100%;
    display: flex;
    gap: 10px;
    background-color: #fcfffd;
  }
  .body-section-form,
  .footer-form {
    margin: 0 auto;
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #fcfffd;
  }
  .body-form {
    margin: auto;
    width: 100%;
    margin-top: 0;
    display: flex;
    flex-direction: column;
  }
  .body-section-form-1 {
    width: 100%;
    display: flex;
    gap: 20px;
  }
  .box {
    flex: 1;
    border: 2px solid #007bff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  .form-common-file,
  .ProductOld,
  .ProductNew {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    padding: 15px;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }
  .input-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 10px;
  }

  .input-container label {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    flex: 1;
    text-align: left;
  }

  .input-container input {
    flex: 2;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .input-container input:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  .input-container input::placeholder {
    color: #aaa;
    font-style: italic;
  }
  /* css for hesader's two input */
  .wrap-items {
    display: flex;
    width: 100%;
    flex: 3;
    flex-direction: column;
  }
  /*  css cho checkbox */
  .checkbox_isNewProduct {
    align-items: center;
    font-weight: bold;
    display: flex;
    justify-content: space-around;
    margin: auto;
    width: 100%;
    flex: 1;
  }
  .checkbox_isNewProduct label {
    align-items: center;
    cursor: pointer;
  }

  .checkbox_isNewProduct input[type="checkbox"] {
    appearance: none;
    width: 30px;
    height: 30px;
    border: 2px solid #007bff;
    border-radius: 4px;
    margin-right: 10px;
    transition: all 0.3s ease;
    position: relative;
  }

  .checkbox_isNewProduct input[type="checkbox"]:checked {
    background-color: #007bff;
    border-color: #007bff;
  }

  .checkbox_isNewProduct input[type="checkbox"]:checked::after {
    content: "✓";
    color: white;
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .checkbox_isNewProduct:hover input[type="checkbox"] {
    border-color: #0056b3;
  }

  .select-container-position {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 15px;
    max-width: 60%;
    margin: 30px auto;
  }
  .select-container-position label {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    flex: 1;
  }
  .select-container-position select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    transition: all 0.3s ease;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    flex: 2;
  }

  /*  css cho ô select */
  .select-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 15px;
  }

  .select-container label {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    flex: 1;
  }

  .select-container select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    transition: all 0.3s ease;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    flex: 2;
  }

  .select-container select:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  .select-container select option {
    padding: 10px;
  }
  /* cs show cabinets */
  .cabinets-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr); /* 10 ô trên mỗi hàng */
    gap: 10px;
    overflow-x: auto; /* Hiển thị thanh trượt ngang khi cần */
    padding: 10px;
  }

  .cabinet-button {
    padding: 15px;
    font-size: 14px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: center;
    white-space: nowrap; /* Không cho chữ xuống dòng */
  }

  .cabinet-button:hover {
    background-color: #0056b3;
  }
  /* css show Modal */
  /* Modal Background */
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

  /* Nút chấp nhận */
  .add-product {
    background: #28a745;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
    width: 100%;
  }

  .add-product:hover {
    background: #218838;
  }

  /* show product after added */
  /*  */
  .showProduct_added {
    background-color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-height: 400px; /* Giới hạn chiều cao */
    overflow-y: auto; /* Hiển thị thanh cuộn nếu nội dung dài */
  }

  /* Lưới sản phẩm - luôn 2 cột */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Luôn có 2 cột */
    gap: 15px;
    width: 90%;
    padding: 15px;
  }

  /* Thẻ sản phẩm */
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-5px);
  }

  /* Ảnh sản phẩm */
  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  /* Tên sản phẩm */
  .product-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  /* Thanh cuộn tuỳ chỉnh */
  .showProduct_added::-webkit-scrollbar {
    width: 8px;
  }

  .showProduct_added::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  .showProduct_added::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .product-quantity,
  .product-price {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
  }

  .edit-button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .add-button {
    margin: 20px;
  }

  .edit-button:hover {
    background-color: #0056b3;
  }
  /* button submit */
  .footer-form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* Chiều cao phần footer nếu cần */
  }

  .footer-form button {
    width: 100%; /* Làm cho button chiếm toàn bộ chiều rộng */
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .footer-form button:hover {
    background-color: #0056b3;
  }
  #showAddedProduct_btn {
    display: none; /* Mặc định ẩn */
  }
  /* Desktop lớn (từ 1200px trở lên) */
  @media (min-width: 1200px) {
    .input-container input {
      font-size: 18px;
      padding: 20px;
    }
  }

  /* Tablet (từ 768px đến 1199px) */
  @media (max-width: 1199px) and (min-width: 768px) {
    .input-container input {
      font-size: 16px;
      padding: 15px;
    }
    /* show product in modal*/
    ul {
      grid-template-columns: repeat(
        2,
        1fr
      ); /* Chuyển về 2 cột trên màn hình trung bình */
    }
    .close-button {
      position: static;
    }
  }

  /* Điện thoại (dưới 768px) */
  @media (max-width: 767px) {
    .box .input-container input {
      color: #0056b3;
      max-width: 50%;
    }

    .body-section-form-1 {
      width: 100%;
      display: flex;
      flex-direction: column-reverse;
      justify-items: center;
      gap: 20px;
    }
    /* selection div */

    .box .select-container select {
      max-width: 50%;
    }
    #showAddedProduct_btn {
      display: block;
    }
    .header-section-form {
      flex-direction: column;
    }
    /* show product in modal*/
    .ul {
      grid-template-columns: 1fr; /* Chuyển về 1 cột trên màn hình nhỏ */
    }
    /* show products in just added */
    .product-grid {
      grid-template-columns: 1fr; /* Chuyển về 1 cột trên điện thoại */
    }
  }
</style>
