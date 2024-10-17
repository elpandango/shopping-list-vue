<template>
  <v-form
   ref="form"
   v-model="valid"
   lazy-validation>
    <v-text-field
     v-model="product.name"
     :rules="[rules.required]"
     label="Product"
     required
    ></v-text-field>

    <v-text-field
     v-model="product.quantity"
     :rules="[rules.required]"
     label="Quantity"
     required
     type="number"
    ></v-text-field>

    <v-date-picker
     v-model="product.dueDate"
     label="Date"
    ></v-date-picker>

    <v-btn
     @click="addProduct"
     color="success">Add Product
    </v-btn>
  </v-form>
</template>

<script setup>
import {ref, useTemplateRef} from 'vue';

const valid = ref(false);
const product = ref({
  name: '',
  quantity: null,
  dueDate: null,
  completed: false
});

const rules = {
  required: (value) => !!value || 'Required.',
};

const emit = defineEmits(['add-product']);
const formRef = useTemplateRef('form');

const formatDueDate = (date) => {

  console.log('date: ', date);

  if (!date) return null;
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const addProduct = () => {
  if (product.value.name !== '' && product.value.name) {
    console.log('Form is valid');
    if (product.value.dueDate) {
      product.value.dueDate = formatDueDate(product.value.dueDate);
    }

    emit('add-product', {...product.value});

    product.value.name = '';
    product.value.quantity = null;
    product.value.dueDate = null;
  } else {
    console.log('Form is invalid');
  }

  // formRef.value.resetValidation();
};
</script>

<style scoped>

</style>
