import {defineStore} from 'pinia';

interface Product {
  name: string,
  quantity: number,
  id: string,
  completed: boolean,
  dueDate?: string
}

export const useStoreProducts = defineStore({
  id: 'storeProducts',
  state: () => ({
    products: [],
  }),
  actions: {
    addProduct(product: Product) {
      const newProduct: Product = {...product, id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`};
      this.products.push(newProduct);
      this.saveProducts();
    },
    editProduct(product: Product) {
      const newProductsArray: Product[] = [...this.products];
      const index = newProductsArray.findIndex(item => item.id === product.id);
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
    toggleProductStatus(id: string) {
      const newProductsArray: Product[] = [...this.products];
      const index: number = newProductsArray.findIndex(item => item.id === id);
      const newProduct: Product = newProductsArray[index];
      newProduct.completed = !newProduct.completed;
      this.products = [...newProductsArray];
      this.saveProducts();
    }
  },
  getters: {
    getProducts: (state: any) => state.products,
  }
})
