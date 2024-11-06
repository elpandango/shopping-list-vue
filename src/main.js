import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import i18n from './i18n';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

import {useStoreProducts} from "@/stores/storeProducts.ts";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());
app.use(i18n);
app.use(router);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistration('/service-worker.js').then((registration) => {
      console.log('ServiceWorker registered: ', registration);

      const storeProducts = useStoreProducts();
      storeProducts.setServiceWorker(registration);
    }).catch((registrationError) => {
      console.log('ServiceWorker registration failed: ', registrationError);
    });
  });
}

app.mount('#app');
