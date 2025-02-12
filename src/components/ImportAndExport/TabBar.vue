<template>
  <div class="tab-bar-container">
    <div class="tab-bar">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        :class="{ active: activeTab === tab.id }"
        @click="setActiveTab(tab.id)"
      >
        {{ tab.label }}
      </div>
      <div class="underline" :style="underlineStyle"></div>
    </div>
    <div class="tab-content">
      <slot :activeTab="activeTab" />
    </div>
  </div>
</template>

<script>
  import { ref, computed } from "vue";

  export default {
    props: {
      tabs: {
        type: Array,
        required: true,
      },
      defaultTab: {
        type: String,
        default: "",
      },
    },
    setup(props) {
      const activeTab = ref(props.defaultTab || props.tabs[0].id);

      const setActiveTab = (tabId) => {
        activeTab.value = tabId;
      };

      const underlineStyle = computed(() => {
        const index = props.tabs.findIndex((tab) => tab.id === activeTab.value);
        const width = 100 / props.tabs.length;
        return {
          width: `${width}%`,
          transform: `translateX(${index * 100}%)`,
        };
      });

      return {
        activeTab,
        setActiveTab,
        underlineStyle,
      };
    },
  };
</script>

<style scoped>
  .tab-bar-container {
    max-width: 95%px;
    margin: 20px auto;
  }

  .tab-bar {
    display: flex;
    position: relative;
    border-bottom: 2px solid #ddd;
  }

  .tab {
    flex: 1;
    text-align: center;
    padding: 12px 0;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .tab.active {
    color: #007bff;
    background-color: #ddd;
  }

  .tab:hover {
    color: #0056b3;
  }

  .underline {
    position: absolute;
    bottom: 0;
    height: 3px;
    background-color: #007bff;
    transition: transform 0.3s ease;
  }

  .tab-content {
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-top: 20px;
  }
</style>
