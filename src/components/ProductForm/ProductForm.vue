<template>
  <v-row justify="center" align="center" class="pt-6">
    <v-col cols="12" md="8" lg="8">
      <v-btn @click="showDialog = true" color="primary">Add Product</v-btn>

      <v-dialog v-model="showDialog" max-width="600">
        <v-card>
          <v-card-title>
            <span class="headline">Add New Product</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
             label="Product title"
             v-model="product.name"
             variant="outlined"
             :rules="[rules.required]"
            ></v-text-field>

            <v-date-input
             label="Due date"
             v-model="product.dueDate"
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
          </v-card-text>
          <v-card-actions>
            <v-btn @click="addProduct" color="success">Add Product</v-btn>
            <v-btn @click="showDialog = false" color="grey">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { VNumberInput } from 'vuetify/labs/VNumberInput';

const showDialog = ref(false);
const product = ref({
  name: '',
  quantity: null,
  dueDate: null,
  completed: false,
});

const rules = {
  required: (value) => !!value || 'Required.',
};

const emit = defineEmits(['add-product']);

const formatDueDate = (date) => {
  if (!date) return null;
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const addProduct = () => {
  if (product.value.name !== '') {
    if (product.value.dueDate) {
      product.value.dueDate = formatDueDate(product.value.dueDate);
    }

    emit('add-product', { ...product.value });

    product.value.name = '';
    product.value.quantity = null;
    product.value.dueDate = null;
    showDialog.value = false;
  }
};
</script>

<style scoped>
</style>
