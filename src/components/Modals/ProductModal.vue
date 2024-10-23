<template>
  <v-dialog
   v-model="showDialog"
   max-width="600"
   @click:outside="clickOutside"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ isEditMode ? $t('editProductText') : $t('addProductText') }}</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
         :label="$t('addProductTitle')"
         v-model="product.name"
         variant="outlined"
         :rules="nameRules"
        ></v-text-field>

        <v-date-input
         :label="$t('dueDateLabel')"
         v-model="product.dueDate"
         prepend-icon=""
         variant="outlined"
         persistent-placeholder
        ></v-date-input>

        <v-number-input
         :label="$t('quantityLabel')"
         v-model="product.quantity"
         :rules="quantityRules"
         :min="0"
         :step="1"
         variant="outlined"
        ></v-number-input>
      </v-card-text>
      <v-card-actions>
        <v-btn
         @click="submitProduct"
         color="success"
         :disabled="saveBtnIsDisabled">
          {{ isEditMode ? $t('editModeSave') : $t('editModeAdd') }}
        </v-btn>
        <v-btn
         @click="closeDialog"
         color="grey">{{ $t('btnTextCancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script
 setup
 lang="ts">
import {VDateInput} from 'vuetify/labs/VDateInput';
import {VNumberInput} from 'vuetify/labs/VNumberInput';
import {ref, watch, onMounted, onBeforeUnmount, computed} from 'vue';
import {useI18n} from 'vue-i18n';
import {Product} from "@/interfaces/Product";
import {useStoreProducts} from "@/stores/storeProducts";

const props = defineProps<{
  product: Product;
  showModal: boolean;
  isEditMode: boolean;
}>();

const emit = defineEmits(['submit', 'close']);
const storeProducts = useStoreProducts();
const {t} = useI18n();
const showDialog = ref(false);
const product = ref({...props.product, quantity: props.product.quantity ? Number(props.product.quantity) : 0});
const productHasDouble = ref(false);

const nameRules = [
  value => {
    if (value) return true;

    return t('nameValidationText');
  },
  value => {
    if (value) {
      const products = storeProducts.getProducts;
      const index = products.findIndex(product => product.name.toLowerCase() === value.toLowerCase());

      if (index !== -1 && !props.isEditMode) {
        productHasDouble.value = true;
        return t('doubleValidationText');
      }

      productHasDouble.value = false;
      return true;
    }
  },
];

const quantityRules = [
  value => {
    if (value) return true;

    return t('quantityValidationText');
  }
];

const closeDialog = () => {
  emit('close');
};

const submitProduct = () => {
  if (product.value.dueDate) {
    const options = {year: 'numeric', month: 'long', day: '2-digit'};
    product.value.dueDate = product.value.dueDate.toLocaleDateString('en-GB', options);
  }

  emit('submit', product.value);
  closeDialog();
};

const clickOutside = () => {
  closeDialog();
};

const saveBtnIsDisabled = computed(() => {
  return product.value.name === '' || product.value.quantity === 0 || (productHasDouble.value && !props.isEditMode);
});

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
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style></style>