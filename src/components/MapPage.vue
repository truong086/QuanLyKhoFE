<template>
    <div>
  <h3>Tìm kiếm và hiển thị vị trí</h3>

  <!-- Tìm kiếm địa chỉ -->
  <div style="margin: 10px 0;">
    <input
      v-model="searchAddress"
      type="text"
      placeholder="Nhập địa chỉ cần tìm"
      @keyup.enter="searchLocation"
      style="padding: 10px 15px; border: 1px dashed black; border-radius: 10%;"
    />
    <button @click="searchLocation" style="border: none; outline: none; padding: 10px 15px; border-radius: 10%; margin: 0 10px;"><i class="fa fa-search" aria-hidden="true"></i></button>
  </div>

  <!-- Bản đồ -->
  <GMapMap
    :center="mapCenter"
    :zoom="zoomLevel"
    style="height: 500px; width: 100%;"
  >
    <!-- Marker cho tất cả vị trí -->
    <GMapMarker
      v-for="(location, index) in resolvedLocations"
      :key="index"
      :position="location.coordinates"
      :label="location.address"
    />
  </GMapMap>
</div>
</template>

<script setup>
/* global google */
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const mapCenter = ref({ lat: 23.006154867680063, lng: 120.22187068967148 }); // Hồ Chí Minh
// 23.006154867680063, 120.22187068967148
// 10.762622, 106.660172 Thành Phố Hồ Chí Minh
  const zoomLevel = ref(20);

  // const addressNames = ref(['Hà Nội, Vietnam', 'Đà Nẵng, Vietnam', 'Hồ Chí Minh, Vietnam']); // Danh sách địa chỉ ban đầu
  const resolvedLocations = ref([]); // Danh sách vị trí đã giải mã
  const searchAddress = ref(''); // Địa chỉ tìm kiếm

  const LOCAL_STORAGE_KEY = 'map_locations'; // Khóa lưu trong localStorage

  // Lấy danh sách từ localStorage
  const loadFromLocalStorage = () => {
    const savedLocations = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedLocations) {
      resolvedLocations.value = JSON.parse(savedLocations);
    }
  };

  // Lưu danh sách vào localStorage
  // const saveToLocalStorage = () => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resolvedLocations.value));
  // };

  // Chuyển địa chỉ thành tọa độ
  const geocodeAddress = async (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          console.error(`Không tìm thấy địa chỉ: ${address}`);
          reject(status);
        }
      });
    });
  };

  // Lấy tọa độ cho danh sách ban đầu
//   const resolveInitialAddresses = async () => {
//     for (const address of addressNames.value) {
//       try {
//         const coordinates = await geocodeAddress(address);
//         resolvedLocations.value.push({
//           address,
//           coordinates,
//         });
//       } catch (error) {
//         console.error(`Lỗi khi giải mã địa chỉ: ${address}`);
//       }
//     }
//     saveToLocalStorage(); // Lưu danh sách vào localStorage
//   };

  const resolveInitialAddressesItem = async (data) => {
    try {
        const coordinates = await geocodeAddress(data);
        resolvedLocations.value.push({
          data,
          coordinates,
        });

        mapCenter.value = coordinates
      } catch (error) {
        console.error(`Lỗi khi giải mã địa chỉ: ${data}`);
      }
    // saveToLocalStorage(); // Lưu danh sách vào localStorage
  };

  // Tìm kiếm địa chỉ mới
  const searchLocation = async () => {
    if (!searchAddress.value) {
      alert('Vui lòng nhập địa chỉ!');
      return;
    }

    try {
      const coordinates = await geocodeAddress(searchAddress.value);

      // Thêm địa chỉ mới vào danh sách
      resolvedLocations.value.push({
        address: searchAddress.value,
        coordinates,
      });

      // Cập nhật bản đồ
      mapCenter.value = coordinates;
      zoomLevel.value = 15;

      // Lưu danh sách vào localStorage
      // saveToLocalStorage();

      // Xóa ô input
      searchAddress.value = '';
    } catch (error) {
      alert('Không tìm thấy địa chỉ, vui lòng thử lại!');
    }
  };

  onMounted(() => {
    // Tải dữ liệu từ localStorage nếu có
    loadFromLocalStorage();

    // Nếu localStorage trống, giải mã địa chỉ ban đầu
    if (route.query.search) {
        resolveInitialAddressesItem(decodeURIComponent(route.query.search)); // Sử dụng "decodeURIComponent()" để giải mã dữ liệu trên "query"
    }
  });
</script>