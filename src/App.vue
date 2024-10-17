<template>
  <v-app>
    <HeaderComponent/>
    <v-container fluid>
      <ProductForm @add-product="addProduct"/>
      <ProductList
       @product-updated="loadProducts"
       :products="products"/>
    </v-container>
  </v-app>
</template>

<script
 setup
 lang="ts">
import {ref, onBeforeMount, watch} from 'vue';
import HeaderComponent from './components/HeaderComponent/HeaderComponent.vue';
import ProductForm from './components/ProductForm/ProductForm.vue';
import ProductList from './components/ProductList/ProductList.vue';
import {useStoreProducts} from "@/stores/storeProducts";

const products = ref([]);
const storeProducts = useStoreProducts();

const loadProducts = () => {
  storeProducts.loadProducts();
  products.value = storeProducts.getProducts;
};

const addProduct = (product) => {
  storeProducts.addProduct(product);
  checkDueDates();
};

const checkDueDates = () => {
  const today = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  const dueProducts = products.value.filter(product => product.dueDate === today && !product.completed);

  if (dueProducts.length > 0) {
    sendNotification(`🛒 Don't forget to buy it today: ${dueProducts.map(product => product.name).join(', ')}`);
  }
};

const requestNotificationPermission = () => {
  Notification.requestPermission().then(permission => {
    console.log(permission === 'granted' ? 'Notification permission granted.' : 'Notification permission denied.');
  });
};

const sendNotification = (message) => {
  const notification = new Notification('Due Date Alert', {
    body: message,
  });
};

onBeforeMount(() => {
  loadProducts();
  requestNotificationPermission();
});

watch(products, (newProducts) => {
  checkDueDates();
});
</script>

<style scoped>

</style>
