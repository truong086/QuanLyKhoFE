<template>
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <h3>Products Showcase with Bootstrap</h3>
        </div>
        <div class="col-md-3">
          <!-- Controls -->
          <div class="controls pull-right hidden-xs">
            <button class="left btn btn-primary" @click="prevSlide">
              <span class="fa fa-chevron-left"></span>
            </button>
            <button class="right btn btn-primary" @click="nextSlide">
              <span class="fa fa-chevron-right"></span>
            </button>
          </div>
        </div>
      </div>
    
      <div id="carousel-example" class="carousel slide" data-bs-ride="carousel">
        <!-- Wrapper for slides -->
        <div class="carousel-inner">
          <div class="carousel-item" v-for="(slide, index) in slides" :key="index" :class="{ active: index === currentSlide }">
            <div class="row">
              <div class="col-sm-4" v-for="product in slide.products" :key="product.id">
                <div class="col-item">
                  <div class="info">
                    <div class="row">
                      <div class="price col-md-12">
                        <h5>{{ product.name }}</h5>
                      </div>
                    </div>
                  </div>
                  <!-- Single product image -->
                  <div class="photo">
                    <img :src="product.images[0]" :alt="product.name" class="product-img" />
                  </div>
                  <div class="info">
                    <div class="separator clear-left">
                      <div class="product-details">
                        <p><strong>Description:</strong> {{ product.description }}</p>
                        <p><strong>Price:</strong> {{ product.price }}</p>
                        <p><strong>Unit:</strong> {{ product.unit }}</p>
                        <p><strong>Category:</strong> {{ product.categoryName }}</p>
                        <p><strong>Quantity:</strong> {{ product.quantity }}</p>
                      </div>
                      <!-- More Details Button -->
                      <p class="btn-details">
                        <button class="btn btn-blinking">More details</button>
                      </p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentSlide: 0,
        slides: [
          {
            products: [
              {
                id: 1,
                name: 'Product A',
                price: '$7.99',
                description: 'Description for product A',
                unit: 'pcs',
                categoryName: 'Category 1',
                quantity: 10,
                images: [
                  'https://blogcongnghe247.com/wp-content/uploads/2023/08/tong-hop-anh-3D-my-do-toa-dau-pha-thuong-khung-5.jpg'
                ]
              },
              {
                id: 2,
                name: 'Product B',
                price: '$9.99',
                description: 'Description for product B',
                unit: 'pcs',
                categoryName: 'Category 2',
                quantity: 5,
                images: [
                  'https://picsum.photos/id/423/400/300'
                ]
              },
              {
                id: 3,
                name: 'Product C',
                price: '$7.58',
                description: 'Description for product C',
                unit: 'pcs',
                categoryName: 'Category 3',
                quantity: 15,
                images: [
                  'https://picsum.photos/id/124/400/300'
                ]
              }
            ]
          },
          {
            products: [
              {
                id: 4,
                name: 'Product D',
                price: '$7.17',
                description: 'Description for product D',
                unit: 'pcs',
                categoryName: 'Category 4',
                quantity: 20,
                images: [
                  'https://picsum.photos/id/423/400/300'
                ]
              },
              {
                id: 5,
                name: 'Product E',
                price: '$19.99',
                description: 'Description for product E',
                unit: 'pcs',
                categoryName: 'Category 5',
                quantity: 30,
                images: [
                  'https://picsum.photos/id/235/400/300'
                ]
              },
              {
                id: 6,
                name: 'Product F',
                price: '$1.99',
                description: 'Description for product F',
                unit: 'pcs',
                categoryName: 'Category 6',
                quantity: 50,
                images: [
                  'https://picsum.photos/id/199/400/300'
                ]
              }
            ]
          }
        ]
      };
    },
    methods: {
      prevSlide() {
        if (this.currentSlide > 0) {
          this.currentSlide--;
        } else {
          this.currentSlide = this.slides.length - 1;
        }
      },
      nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
          this.currentSlide++;
        } else {
          this.currentSlide = 0;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Global styles */
  .col-item {
    border: 2px solid #2323A1;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .col-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
  
  .col-item .photo {
    width: 100%;
    height: 250px;
    overflow: hidden;
  }
  
  .product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-bottom: 2px solid #2323A1;
  }
  
  .col-item .info .price h5 {
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
    margin: 15px 0;
    color: #2323A1;
    transition: color 0.3s ease;
  }
  
  .col-item .info .price h5:hover {
    color: #FF6347;
  }
  
  .col-item .info .product-details p {
    font-size: 0.9em;
    margin: 5px 0;
    color: #555;
    transition: color 0.3s ease;
  }
  
  .col-item .info .product-details p:hover {
    color: #007bff;
  }
  
  .col-item .btn-details .btn {
    background-color: #2323A1;
    color: #fff;
    border: 1px solid #2323A1;
    padding: 10px 20px;
    font-size: 1em;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .col-item .btn-details .btn:hover {
    background-color: #0a58ca;
    border-color: #0a58ca;
    transform: scale(1.05);
  }
  
  /* 7-color Blinking Animation */
  @keyframes blink {
    0% {
      background-color: #ff6347;
      border-color: #ff6347;
    }
    14% {
      background-color: #ffb3b3;
      border-color: #ffb3b3;
    }
    28% {
      background-color: #ffcc00;
      border-color: #ffcc00;
    }
    42% {
      background-color: #ff007f;
      border-color: #ff007f;
    }
    57% {
      background-color: #32cd32;
      border-color: #32cd32;
    }
    71% {
      background-color: #00bfff;
      border-color: #00bfff;
    }
    85% {
      background-color: #9400d3;
      border-color: #9400d3;
    }
    100% {
      background-color: #ff6347;
      border-color: #ff6347;
    }
  }
  
  .btn-blinking {
    animation: blink 3s linear infinite;
  }
  
  .col-item:hover .photo {
    border: 2px solid #007bff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .col-item:hover .info .price h5 {
    color: #007bff;
  }
  
  /* Controls for carousel */
  .controls {
    text-align: right;
    margin-top: 10px;
  }
  
  .controls button {
    font-size: 20px;
    color: #fff;
    background-color: #2323A1;
    border: 1px solid #2323A1;
    padding: 8px 16px;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .controls button:hover {
    background-color: #0a58ca;
    border-color: #0a58ca;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .col-sm-4 {
      margin-bottom: 20px;
    }
  }
  </style>
  