<template>
  <v-row
   justify="center">
    <v-col
     cols="12"
     md="8"
     lg="8">
      <v-card
       class="mx-auto">
        <v-main class="pt-0">
          <ul
           class="product-list"
           v-if="products.length">
            <li
             v-for="product in props.products"
             :key="product.id"
             class="list-item">
              <ProductItem
               :product="product"
               @delete-product="deleteProduct(product.id)"
               @edit-product="editProduct"
               @toggle-status="toggleProductStatus(product.id)"
              />
            </li>
          </ul>
          <div v-else>No products added.</div>
        </v-main>
      </v-card>
    </v-col>
  </v-row>
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
.product-list {
  list-style-type: none;
  padding: 16px;
}

.list-item {
  //display: flex;
  //justify-content: space-between;
  padding: 5px 0;
}
</style>
