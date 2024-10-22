<template>
  <v-dialog
   v-model="showDialog"
   max-width="600"
   @click:outside="clickOutside">
    <v-card>
      <v-card-title class="headline">{{ $t('deleteConfirmationTitle') }}</v-card-title>
      <v-card-text>{{ $t('deleteConfirmationText') }}</v-card-text>
      <v-card-actions>
        <v-btn
         @click="closeDialog"
         color="grey">{{ $t('btnTextCancel') }}
        </v-btn>
        <v-btn
         @click="confirmDelete"
         color="red">{{ $t('deleteConfirmationBtnConfirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, defineEmits, watch, onMounted, onBeforeUnmount} from 'vue';
import {useI18n} from 'vue-i18n';

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['delete-confirmed', 'close']);
const {t} = useI18n();
const showDialog = ref(false);

const closeDialog = () => {
  emit('close');
};

const confirmDelete = () => {
  emit('delete-confirmed');
  closeDialog();
};

const clickOutside = () => {
  closeDialog();
};

watch(() => props.showModal, (newStatus) => {
  showDialog.value = newStatus;
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

<style>
</style>
