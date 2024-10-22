import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    appTitle: 'Shopping List App',
    deleteConfirmationTitle: 'Deletion confirm',
    deleteConfirmationText: 'Are you sure you want to delete all products from the list?',
    deleteConfirmationBtnConfirm: 'Delete all',
    btnTextCancel: 'Cancel',
    editProductText: 'Edit Product',
    addProductText: 'Add Product',
    addProductTitle: 'Product Title',
    quantityLabel: 'Quantity',
    editModeSave: 'Save',
    editModeAdd: 'Add Product',
    dueDateLabel: 'Due date',
    completedText: 'Completed',
    pendingText: 'Pending',
    deleteProductText: 'Delete Product',
    confirmDeletionTitle: 'Deletion Confirm',
    confirmDeletionText: 'Are you sure you want to delete this product?',
    noProductsText: 'No Products Added',
    noProductsMessage: 'It looks like you haven\'t added any products yet. Start adding some!',
    deleteAllProductsText: 'Delete All Products',
    deleteBtnText: 'Delete'
  },
  de: {
    appTitle: 'Einkaufslisten-App',
    deleteConfirmationTitle: 'Löschbestätigung',
    deleteConfirmationText: 'Sind Sie sicher, dass Sie alle Produkte aus der Liste löschen möchten?',
    deleteConfirmationBtnConfirm: 'Alle löschen',
    btnTextCancel: 'Abbrechen',
    editProductText: 'Produkt bearbeiten',
    addProductText: 'Produkt hinzufügen',
    addProductTitle: 'Produkttitel',
    quantityLabel: 'Menge',
    editModeSave: 'Speichern',
    editModeAdd: 'Produkt hinzufügen',
    dueDateLabel: 'Fälligkeitsdatum',
    completedText: 'Abgeschlossen',
    pendingText: 'Ausstehend',
    deleteProductText: 'Produkt löschen',
    confirmDeletionTitle: 'Löschbestätigung',
    confirmDeletionText: 'Sind Sie sicher, dass Sie dieses Produkt löschen möchten?',
    noProductsText: 'Keine Produkte hinzugefügt',
    noProductsMessage: 'Es scheint, dass Sie noch keine Produkte hinzugefügt haben. Beginnen Sie mit dem Hinzufügen!',
    deleteAllProductsText: 'Alle Produkte löschen',
    deleteBtnText: 'Löschen'
  },
};

const i18n = createI18n({
  locale: 'en', // установка начального языка
  messages,
});

export default i18n;