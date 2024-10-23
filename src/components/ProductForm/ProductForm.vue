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
       color="primary">{{$t('addProductText')}}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n';

const emit = defineEmits(['add-product']);
const {t} = useI18n();

const addProductClicked = () => {
  emit('add-product');
};
</script>

<style></style>