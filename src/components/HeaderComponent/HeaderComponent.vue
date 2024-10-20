<template>
  <v-app-bar
   color="primary"
   density="compact"
  >
    <v-app-bar-title>Shopping List App</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'HeaderComponent',
}
</script>

<style scoped>
</style>
