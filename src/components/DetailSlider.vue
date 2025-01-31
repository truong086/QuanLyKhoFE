<template>
  <div id="app">
    <header>
      <h3>Products</h3>
    </header>

    <main>
      <h6>{{ filteredProducts.length }} results</h6>
      <p v-if="activeFilters.length">
        <small class="text-muted">Filtered by {{ activeFilters.join(', ') }}</small>
      </p>
      <div class="product-grid">
        <div class="card" v-for="product in filteredProducts" :key="product.name">
          <img class="card-img-top" :src="product.image" alt="">

          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">
              <span>Price: ${{ product.price.toFixed(2) }}</span>
              <br>
              <span>DonViTinh: {{ product.donViTinh }}</span>
              <br>
              <span>Category: {{ product.CategoryName }}</span>
            </p>
            <a class="btn btn-primary" href="#">Chi tiết</a>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <p>
        <small class="text-muted">{{ products.length }} total / {{ filteredProducts.length }} shown</small>
      </p>
    </footer>
  </div>
</template>



<script>
import { ref, computed, watch } from 'vue'

export default {
  setup() {
    const products = ref([
  { name: 'Product 1', CategoryName: 'Home', donViTinh: 'Easy', price: 100.00, image: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Product 2', CategoryName: 'Home', donViTinh: 'Intermediate', price: 120.00, image: 'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Product 3', CategoryName: 'Office', donViTinh: 'Intermediate', price: 190.00, image: 'https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Product 4', CategoryName: 'Office', donViTinh: 'Advanced', price: 260.00, image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Product 5', CategoryName: 'Warehouse', donViTinh: 'Advanced', price: 320.00, image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Product 6', CategoryName: 'Farm', donViTinh: 'Intermediate', price: 120.00, image: 'https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Product 7', CategoryName: 'Space', donViTinh: 'Advanced', price: 157920.00, image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Product 8', CategoryName: 'Bathroom', donViTinh: 'Easy', price: 9.00, image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Product 6', CategoryName: 'Farm', donViTinh: 'Intermediate', price: 120.00, image: 'https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Product 6', CategoryName: 'Farm', donViTinh: 'Intermediate', price: 120.00, image: 'https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=800' }


])


    const activeFilters = ref([])
    
    const uses = computed(() => [...new Set(products.value.map(p => p.CategoryName))])
    const skills = computed(() => [...new Set(products.value.map(p => p.donViTinh))])

    const filters = computed(() => ({
      'Category': uses.value,
      'donViTinh': skills.value
    }))

    const filteredProducts = computed(() => {
      if (activeFilters.value.length === 0) return products.value
      return products.value.filter(prod => 
        activeFilters.value.includes(prod.skill) || activeFilters.value.includes(prod.usage)
      )
    })

    const clearFilters = () => {
      activeFilters.value = []
    }

    watch(activeFilters, (newVal) => {
      location.hash = newVal.join(',')
    })

    return {
      products,
      activeFilters,
      filters,
      filteredProducts,
      clearFilters
    }
  }
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

header {
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
}

h3 {
  font-size: 2rem;
  color: #333;
}

main {
  background: #fff;
  padding: 2rem;
  width: 90%;
  max-width: 1200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 2rem;
}

footer {
  width: 100%;
  background: #fff;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  max-width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.875rem;
  color: #555;
  font-weight: bold;

}

.card-text span {
  display: block;
  margin-bottom: 0.25rem;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  text-transform: uppercase;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

footer small {
  font-size: 0.875rem;
  color: #888;
}
strong {
  font-weight: bold;
}

</style>


