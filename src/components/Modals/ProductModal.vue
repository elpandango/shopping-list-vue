<template>
  <v-dialog
   v-model="showDialog"
   max-width="600"
   @click:outside="clickOutside"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</span>
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
        <v-btn @click="submitProduct" color="success">
          {{ isEditMode ? 'Save' : 'Add Product' }}
        </v-btn>
        <v-btn @click="closeDialog" color="grey">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { VDateInput } from 'vuetify/labs/VDateInput';
import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      name: '',
      quantity: 0,
      dueDate: null,
      completed: false,
    }),
  },
  showModal: {
    type: Boolean,
    default: false,
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['submit', 'close']);
const showDialog = ref(false);
const product = ref({ ...props.product, quantity: props.product.quantity ? Number(props.product.quantity) : 0 });

const rules = {
  required: (value) => !!value || 'Required.',
};

const closeDialog = () => {
  showDialog.value = false;
  emit('close');
};

const submitProduct = () => {
  if (product.value.dueDate) {
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    product.value.dueDate = product.value.dueDate.toLocaleDateString('en-GB', options);
  }
  emit('submit', product.value);
  closeDialog();
};

const clickOutside = () => {
  closeDialog();
};

watch(() => props.showModal, (newStatus) => {
  showDialog.value = newStatus;
});

watch(() => props.product, (newProduct) => {
  product.value = {
    ...newProduct,
    quantity: newProduct.quantity ? Number(newProduct.quantity) : 0,
    dueDate: newProduct.dueDate ? new Date(newProduct.dueDate) : null,
  };
});


const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeDialog();
  }
};

onMounted(() => {
  showDialog.value = props.showModal;
  window.addEventListener('keydown', handleKeydown); // Добавляем слушатель на нажатие клавиш
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style></style>
