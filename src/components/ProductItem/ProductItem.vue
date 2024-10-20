<template>
  <div
   class="product-item"
   :class="{ completed: product?.completed }">
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
      <div class="product-details">
        <p class="product-name">{{ product.name }} ({{ product.quantity }})</p>
        <p class="product-due-to" v-if="product.dueDate"><strong>Due to:</strong> {{ product.dueDate }}</p>
      </div>

      <div class="actions">
        <v-tooltip bottom>
          <template #activator="{ props }">
            <v-btn
             v-bind="props"
             @click="toggleStatus"
             :color="product.completed ? 'success' : 'warning'"
             class="ml-2"
             icon
            >
              <v-icon>{{ product.completed ? 'mdi-check' : 'mdi-clock' }}</v-icon>
            </v-btn>
          </template>
          <span>{{ product.completed ? 'Completed' : 'Pending' }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template #activator="{ props }">
            <v-btn
             v-bind="props"
             @click="editProduct"
             color="primary"
             class="ml-2"
             icon
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edit Product</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template #activator="{ props }">
            <v-btn
             v-bind="props"
             @click="openDeleteDialog"
             color="error"
             class="ml-2"
             icon
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Delete Product</span>
        </v-tooltip>
      </div>
    </template>

    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline px-4">Confirm Deletion</v-card-title>
        <v-card-text class="px-4">
          Are you sure you want to delete this product?
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
const showDeleteDialog = ref(false);

const openDeleteDialog = () => {
  showDeleteDialog.value = true;
};

const confirmDelete = () => {
  emit('delete-product');
  showDeleteDialog.value = false;
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

<style
 lang="scss"
 src="./styles.scss">
</style>
