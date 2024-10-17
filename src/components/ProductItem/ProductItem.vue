<template>
  <div :class="{ completed: product?.completed }">
    <template v-if="isEditing">
      <v-text-field
       v-model="editedProductName"
       label="Edit Product Name"
       @keyup.enter="saveProduct"
       @blur="saveProduct"
      ></v-text-field>
      <v-btn
       @click="saveProduct"
       color="success">Save
      </v-btn>
      <v-btn
       @click="cancelEdit"
       color="error">Cancel
      </v-btn>
    </template>
    <template v-else>
      <div class="d-flex align-center">
        <div class="product-details">
          <p>{{ product.name }} ({{ product.quantity }})</p>
          <p v-if="product.dueDate">Due to: {{ product.dueDate }}</p>
        </div>
<!--        <v-switch-->
<!--         v-model="product.completed"-->
<!--         @change="toggleStatus"-->
<!--         class="mr-3"-->
<!--         label="Status"-->
<!--        ></v-switch>-->
        <button @click="toggleStatus">{{ product.completed ? 'Completed' : 'Pending' }}</button>
        <v-btn
         @click="editProduct"
         color="primary"
         class="ml-2">Edit
        </v-btn>
        <v-btn
         @click="deleteProduct"
         color="error"
         class="ml-2">Delete
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({
  product: {
    type: Object
  }
});
const emit = defineEmits(['delete-product', 'edit-product', 'toggle-status']);

const isEditing = ref(false);
const editedProductName = ref(props.product.name);

const deleteProduct = () => {
  emit('delete-product');
};

const editProduct = () => {
  isEditing.value = true;
};

const saveProduct = () => {
  emit('edit-product', {...props.product, name: editedProductName.value});
  isEditing.value = false;
};

const cancelEdit = () => {
  editedProductName.value = props.product.name;
  isEditing.value = false;
};

const toggleStatus = () => {
  emit('toggle-status');
};
</script>

<style scoped>
.completed .product-details {
  text-decoration: line-through;
  color: gray;
}
</style>
