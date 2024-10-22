<template>
  <v-app class="app-container">
    <router-view />
  </v-app>
</template>

<script></script>

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
