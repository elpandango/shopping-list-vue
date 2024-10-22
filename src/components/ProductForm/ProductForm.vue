<template>
  <v-row
   justify="center"
   align="center"
   class="pt-6">
    <v-col
     cols="12"
     md="8"
     lg="8">
      <v-btn
       @click="addProductClicked"
       color="primary">Add Product
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
const emit = defineEmits(['add-product']);

const addProductClicked = () => {
  emit('add-product');
};
</script>

<style></style>