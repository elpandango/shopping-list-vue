<template>
  <v-row justify="center">
    <v-col
     cols="12"
     md="8"
     lg="8">
      <v-card
       class="mx-auto"
       v-if="products.length">
        <v-main class="pt-0">
          <v-btn
           @click="deleteAllProducts"
           color="red"
           class="mb-2">
            {{ $t('deleteAllProductsText') }}
          </v-btn>
          <ul class="product-list">
            <li
             v-for="product in props.products"
             :key="product.id">
              <ProductItem
               :product="product"
               @delete-product="deleteProduct(product.id)"
               @edit-product="editProduct"
               @toggle-product-status="toggleProductStatus(product.id)"
              />
            </li>
          </ul>
        </v-main>
      </v-card>

      <v-card
       v-else
       class="text-center">
        <v-card-title class="text-wrap">
          <h2>{{ $t('noProductsText') }}</h2>
        </v-card-title>
        <v-card-text>
          <p>{{ $t('noProductsMessage') }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script
 setup
 lang="ts">

import ProductItem from "@/components/ProductItem/ProductItem.vue";
import {useStoreProducts} from "@/stores/storeProducts";
import {useI18n} from 'vue-i18n';
import {Product} from "@/interfaces/Product";

const storeProduct = useStoreProducts();

const props = defineProps<{
  products: Product[]
}>();

const emit = defineEmits(['toggle-product-status', 'edit-product', 'delete-all-products']);
const {t} = useI18n();

const toggleProductStatus = (id) => {
  storeProduct.toggleProductStatus(id);
  emit('toggle-product-status');
};

const deleteProduct = (id) => {
  storeProduct.deleteProductById(id);
};

const deleteAllProducts = () => {
  emit('delete-all-products');
};

const editProduct = (product) => {
  storeProduct.editProduct(product);
  emit('edit-product', product);
};
</script>

<style
 lang="scss"
 src="./styles.scss">
</style>
