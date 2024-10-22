<template>
  <v-container class="text-center">
    <h1>Welcome to Your Product Manager</h1>
    <p class="mb-8">Add, edit, and delete your products efficiently!</p>
    <v-btn @click="goToProducts" color="primary">Manage Products</v-btn>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToProducts = () => {
  router.push({ name: 'products' });
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>
