import { setActivePinia, createPinia } from 'pinia';
import {useStoreProducts} from "@/stores/storeProducts";
import { expect, vi, it, describe, beforeEach, afterEach } from 'vitest';

describe('storeProducts', () => {
  let store: ReturnType<typeof useStoreProducts>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useStoreProducts();

    // mocks
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
  });

  afterEach(() => {
    // clear mocks
    vi.clearAllMocks();
  });

  it('should add a new product', () => {
    // adding a product
    const product = { name: 'Milk', quantity: 2, id: '', dueDate: '', completed: false };
    // adding a product to the store
    store.addProduct(product);

    // testing array length after adding, product fields and usage of localStorage
    expect(store.products.length).toBe(1);
    expect(store.products[0].name).toBe('Milk');
    expect(store.products[0].quantity).toBe(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('products', JSON.stringify(store.products));
  });

  it('should delete a product by id', () => {
    const product = { name: 'Bread', quantity: 1, id: 'test-123', dueDate: '', completed: false };
    store.addProduct(product);

    store.deleteProductById('test-123');

    expect(store.products.length).toBe(0);
    expect(localStorage.setItem).toHaveBeenCalledWith('products', JSON.stringify(store.products));
  });

  it('should toggle product status', () => {
    const product = { name: 'Eggs', quantity: 12, completed: false };
    store.addProduct(product);

    expect(store.products).toHaveLength(1);

    const generatedId = store.products[0].id;

    expect(typeof generatedId).toBe('string');

    store.toggleProductStatus(generatedId);

    expect(store.products[0].completed).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('products', JSON.stringify(store.products));
  });

  it('should load products from localStorage', () => {
    const mockLocalStorageProducts = [{ name: 'Butter', quantity: 3, id: 'test-789', dueDate: '', completed: false }];
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(JSON.stringify(mockLocalStorageProducts));

    store.loadProducts();

    expect(store.products.length).toBe(1);
    expect(store.products[0].name).toBe('Butter');
  });

  it('should clear all products', () => {
    const product = { name: 'Cheese', quantity: 5, id: 'test-111', dueDate: '', completed: false };
    store.addProduct(product);

    store.deleteAllProducts();

    expect(store.products.length).toBe(0);
    expect(localStorage.removeItem).toHaveBeenCalledWith('products');
  });
});
