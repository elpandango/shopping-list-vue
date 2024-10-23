<template>
  <div
   class="product-item"
   :class="{ completed: product?.completed }">
    <div class="product-details">
      <p class="product-name">{{ product.name }} ({{ product.quantity }})</p>
      <p
       class="product-due-to"><strong>{{ $t('dueDateLabel') }}:</strong> {{ product.dueDate ?? $t('dueDateNotAssigned') }}</p>
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
            <v-icon>{{ product.completed ? 'mdi-check' : 'mdi-alert-circle' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ product.completed ? $t('completedText') : $t('pendingText') }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template #activator="{ props }">
          <v-btn
           v-bind="props"
           @click="emitEditProduct"
           color="primary"
           class="ml-2"
           icon
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('editProductText') }}</span>
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
        <span>{{ $t('deleteProductText') }}</span>
      </v-tooltip>
    </div>

    <v-dialog
     v-model="showDeleteDialog"
     max-width="400">
      <v-card>
        <v-card-title class="headline px-4">{{ $t('confirmDeletionTitle') }}</v-card-title>
        <v-card-text class="px-4">{{ $t('confirmDeletionText') }}</v-card-text>
        <v-card-actions>
          <v-btn
           color="grey"
           @click="showDeleteDialog = false">{{ $t('btnTextCancel') }}
          </v-btn>
          <v-btn
           color="error"
           @click="confirmDelete">{{ $t('deleteBtnText') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useI18n} from "vue-i18n";
import {Product} from "@/interfaces/Product";

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits(['delete-product', 'edit-product', 'toggle-status']);
const {t} = useI18n();
const showDeleteDialog = ref(false);

const openDeleteDialog = () => {
  showDeleteDialog.value = true;
};

const confirmDelete = () => {
  emit('delete-product');
  showDeleteDialog.value = false;
};

const emitEditProduct = () => {
  emit('edit-product', props.product);
};

const toggleStatus = () => {
  emit('toggle-status');
};
</script>

<style
 lang="scss"
 src="./styles.scss">
</style>
