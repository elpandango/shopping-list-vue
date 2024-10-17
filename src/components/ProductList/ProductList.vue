<template>
  <div>
    <ul>
      <li
       v-for="product in props.products"
       :key="product.id">
        <ProductItem
         :product="product"
         @delete-product="deleteProduct(product.id)"
         @edit-product="editProduct"
         @toggle-status="toggleProductStatus(product.id)"
        />
      </li>
    </ul>
    <div v-if="!products.length">No products added.</div>
  </div>
</template>

<script
 setup
 lang="ts">

import ProductItem from "@/components/ProductItem/ProductItem.vue";
import {onMounted} from "vue";
import {useStoreProducts} from "@/stores/storeProducts";

const storeProduct = useStoreProducts();

const props = defineProps({
  products: {
    type: Array,
  }
});

const emit = defineEmits(['product-updated']);

const toggleProductStatus = (id) => {
  storeProduct.toggleProductStatus(id);
  emit('product-updated');
};

const deleteProduct = (id) => {
  storeProduct.deleteProductById(id);
};

const editProduct = (product) => {
  storeProduct.editProduct(product);
  emit('product-updated');
};

onMounted(() => {
  console.log('mounted in ProductList.vue');
  console.log('props.products ', props.products);
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
</style>
