<template>
  <div class="container">
    <TabBar :tabs="tabs" defaultTab="nhap">
      <template #default="{ activeTab }">
        <div v-if="activeTab === 'nhap'">
          <!-- <h3>Phiếu Nhập</h3> -->
          <ImportForm></ImportForm>
        </div>
        <div v-if="activeTab === 'xuat'">
          <!-- <h3>Phiếu Xuất</h3> -->
          <ExportForm> </ExportForm>
        </div>
      </template>
    </TabBar>
    <!-- phân for cần hiển thị -->
  </div>
</template>

<script setup>
  import TabBar from "./TabBar.vue";
  import ImportForm from "./ImportForm.vue";
  import ExportForm from "./ExportForm.vue";
  const tabs = [
    { id: "nhap", label: "Phiếu Nhập" },
    { id: "xuat", label: "Phiếu Xuất" },
  ];
</script>
<style>
  /* .container {
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fffcfc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: scroll;
  } */
</style>
