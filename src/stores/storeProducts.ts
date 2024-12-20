import {defineStore} from 'pinia';
import {Product} from "@/interfaces/Product";

export const useStoreProducts = defineStore({
  id: 'storeProducts',
  state: () => ({
    products: [] as Product[],
    registration: null
  }),
  actions: {
    addProduct(product: Product) {
      const newProduct: Product = {...product, id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`};
      this.products.unshift(newProduct);
      this.saveProducts();
    },
    editProduct(product: Product) {
      const newProductsArray: Product[] = [...this.products];
      const index: number = newProductsArray.findIndex(item => item.id === product.id);
      newProductsArray[index] = {...product};
      this.products = [...newProductsArray];
      this.saveProducts();
    },
    deleteProductById(id: string) {
      const index = this.products.findIndex(item => item.id === id);
      this.products.splice(index, 1);
      this.saveProducts();
    },
    loadProducts() {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        this.products = JSON.parse(storedProducts);
      }
    },
    saveProducts() {
      localStorage.setItem('products', JSON.stringify(this.products));
    },
    deleteAllProducts() {
      this.products = [];
      localStorage.removeItem('products');
    },
    toggleProductStatus(id: string) {
      const newProductsArray: Product[] = [...this.products];
      const index: number = newProductsArray.findIndex(item => item.id === id);
      const newProduct: Product = newProductsArray[index];
      newProduct.completed = !newProduct.completed;
      this.products = [...newProductsArray];
      this.saveProducts();
    },
    setServiceWorker(registration) {
      this.registration = registration;
    },
  },
  getters: {
    getProducts: (state: any) => state.products,
  }
})
