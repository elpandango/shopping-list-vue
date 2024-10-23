<template>
  <v-main>
    <HeaderComponent/>
    <v-container class="text-center" fluid>
      <v-card class="pa-4 mx-auto my-10" max-width="100%" min-width="300" outlined>
        <v-card-title class="headline text-wrap">
          {{ $t('appTitle') }}
        </v-card-title>
        <v-card-text>
          <p class="mb-8">{{ $t('appDescription') }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="goToProducts" color="primary" class="mx-auto">
            {{ $t('manageProducts') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent.vue";

const router = useRouter();
const { t } = useI18n();

const goToProducts = () => {
  router.push({ name: 'products' });
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}

.v-card {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Добавляем тень */
}
</style>
