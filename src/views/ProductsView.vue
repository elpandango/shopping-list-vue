<template>
  <v-main>
    <v-container
     class="py-0 px-0"
     style="width: 100%;"
     fluid>
      <HeaderComponent/>
      <ProductForm @add-product="openModalToAdd"/>
      <ProductList
       :products="products"
       @toggle-product-status="loadProducts"
       @edit-product="openModalToEdit"
       @delete-all-products="openDeleteAllProductsModal"
      />
    </v-container>

    <ProductModal
     :showModal="showModal"
     :isEditMode="isEditMode"
     :product="currentProduct"
     @submit="handleProductSubmit"
     @close="closeModal"
    />

    <ConfirmDeleteModal
     :showModal="showDeleteAllProductsModal"
     @deleteConfirmed="deleteAllProducts"
     @close="closeDeleteAllProductsModal"
    />
  </v-main>
</template>

<script
 setup
 lang="ts">
import {ref, onBeforeMount, watch} from 'vue';
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent.vue";
import ProductForm from '@/components/ProductForm/ProductForm.vue';
import ProductList from '@/components/ProductList/ProductList.vue';
import ProductModal from "@/components/Modals/ProductModal.vue";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal.vue";
import {useStoreProducts} from "@/stores/storeProducts";
import {Product} from "@/interfaces/Product";
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
const storeProducts = useStoreProducts();
const isEditMode = ref(false);
const showModal = ref(false);
const showDeleteAllProductsModal = ref(false);
const products = ref<Product[]>([]);
const currentProduct = ref<Product>({
  name: '',
  quantity: null,
  id: null,
  dueDate: null,
  completed: false,
});

const loadProducts = () => {
  storeProducts.loadProducts();
  products.value = storeProducts.getProducts;
};

const openModalToAdd = () => {
  isEditMode.value = false;
  currentProduct.value = {
    name: '',
    quantity: null,
    id: null,
    dueDate: null,
    completed: false,
  };
  showModal.value = true;
};

const openModalToEdit = (product) => {
  isEditMode.value = true;
  currentProduct.value = {...product};
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const openDeleteAllProductsModal = () => {
  showDeleteAllProductsModal.value = true;
};

const closeDeleteAllProductsModal = () => {
  showDeleteAllProductsModal.value = false;
};

const deleteAllProducts = () => {
  storeProducts.deleteAllProducts();
  loadProducts();
  closeDeleteAllProductsModal();
};

const handleProductSubmit = (product) => {
  if (isEditMode.value) {
    storeProducts.editProduct(product);
  } else {
    storeProducts.addProduct(product);
  }
  loadProducts();
  checkDueDates();
};

const checkDueDates = () => {
  const today = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  const dueProducts = products.value.filter(product => product.dueDate <= today && !product.completed);

  if (dueProducts.length > 0) {
    sendNotification(`🛒 ${t('notificationText')}: ${dueProducts.map(product => product.name).join(', ')}`);
  }
};

const requestNotificationPermission = () => {
  Notification.requestPermission().then(permission => {
    console.log(permission === 'granted' ? 'Notification permission granted.' : 'Notification permission denied.');
  });
};

const sendNotification = body => {
  const title = 'Due Date Alert';

  const registration = storeProducts.registration;

  const payload = {
    body
  };

  if('showNotification' in registration) {
    registration.showNotification(title, payload);
  }
  else {
    new Notification(title, payload);
  }
};

onBeforeMount(() => {
  loadProducts();
  requestNotificationPermission();
});

watch(products, (newProducts) => {
  checkDueDates();
});
</script>

<style lang="scss">
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #fff;
}

body {
  padding: env(safe-area-inset);
}

#app {
  display: flex !important;
  width: 100%;
  padding: 0 20px;
}
</style>
