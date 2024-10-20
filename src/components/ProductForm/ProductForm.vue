<template>
  <v-row
   justify="center"
   align="center"
  >
    <v-col
     cols="12"
     md="8"
     lg="8">
      <v-card class="py-6 px-6">
        <v-text-field
         label="Product title"
         v-model="product.name"
         variant="outlined"
        ></v-text-field>

        <v-date-input
         label="Due date"
         prepend-icon=""
         variant="outlined"
         persistent-placeholder
        ></v-date-input>

        <v-number-input
         label="Quantity"
         v-model="product.quantity"
         :rules="[rules.required]"
         :min="0"
         variant="outlined"
        ></v-number-input>

        <v-btn
         @click="addProduct"
         color="success"
        >Add Product
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {ref, useTemplateRef} from 'vue';
import {VDateInput} from 'vuetify/labs/VDateInput';
import {VNumberInput} from 'vuetify/labs/VNumberInput';

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
  const options = {year: 'numeric', month: 'long', day: '2-digit'};
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
