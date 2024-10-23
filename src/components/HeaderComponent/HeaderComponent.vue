<template>
  <v-app-bar
   color="primary"
   density="compact"
  >
    <v-app-bar-title>{{ $t('appTitle') }}</v-app-bar-title>
    <v-btn
     @click="toggleLanguage">{{ locale === 'en' ? 'EN' : 'DE' }}
    </v-btn>
  </v-app-bar>
</template>

<script
 setup
 lang="ts">
import {useI18n} from 'vue-i18n';

const {t, locale} = useI18n();

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'de' : 'en';
};

</script>

<style scoped>
</style>
