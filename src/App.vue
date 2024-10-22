<template>
  <v-app class="app-container">
    <template v-if="showPreloader">
      <Preloader />
    </template>
    <template v-else>
      <router-view/>
    </template>
  </v-app>
</template>

<script setup>
import {ref} from 'vue';
import Preloader from "@/components/Preloader/Preloader.vue";

const showPreloader = ref(true);

setTimeout(() => {
  showPreloader.value = false;
}, 2000);
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
