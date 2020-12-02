import { Category } from './category';
import { Product } from './product';

import savedProducts from '../../assets/products.json';
import { ActionStatus, ErrorCategory } from './actionStatus';

export class DataProvider {
  private categories: Category[] = [];
  private products: Product[] = [];

  constructor() {
    savedProducts.forEach((product) => {
      let category = this.categories.find((category) => category.name === product.categoryName);
      if (!category) {
        category = new Category(product.categoryName);
        this.categories.push(category);
      }
      this.products.push(new Product(category.id, product.name, product.itemsInStock));
    });
  }

  //#region Products
  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  getProductAsync(id: string): Promise<Product> {
    const result = this.products.find((product) => product.id === id);
    return new Promise((resolve, reject) => {
      if (result) resolve(result);
      else reject(`Product id ${id} not found`);
    });
  }

  getProductsByCategory(categoryId: string): Product[] {
    return this.products.filter((product) => product.categoryId === categoryId);
  }

  addProduct(categoryId: string, name: string, itemsInStock: number): ActionStatus {
    if (!(categoryId && name && typeof itemsInStock === 'number'))
      return new ActionStatus(false, ErrorCategory.Validation, `All fields are required: categoryId, name, itemsInStock`);

    const product = new Product(categoryId, name, itemsInStock);
    this.products.push(product);
    return new ActionStatus(true);
  }

  editProduct(id: string, categoryId: string, name: string, itemsInStock: number): ActionStatus {
    if (!(id && categoryId && name && typeof itemsInStock === 'number'))
      return new ActionStatus(false, ErrorCategory.Validation, `All fields are required: categoryId, name, itemsInStock`);

    const product = this.getProduct(id);
    if (product) {
      product.categoryId = categoryId;
      product.name = name;
      product.itemsInStock = itemsInStock;
      return new ActionStatus(true);
    } else {
      return new ActionStatus(false, ErrorCategory.NotFound, `Product id ${id} was not found`);
    }
  }

  deleteProduct(id: string): ActionStatus {
    return this.deleteItemById(this.products, id)
      ? new ActionStatus(true)
      : new ActionStatus(false, ErrorCategory.NotFound, `Product id ${id} was not found`);
  }
  //#endregion

  //#region Categories
  getCategories(): Category[] {
    return this.categories;
  }

  getCategory(id: string): Category | undefined {
    return this.categories.find((category) => category.id === id);
  }

  getCategoryAsync(id: string): Promise<Category> {
    const result = this.categories.find((category) => category.id === id);
    return new Promise((resolve, reject) => {
      if (result) resolve(result);
      else reject(`Category id ${id} not found`);
    });
  }

  addCategory(name: string): ActionStatus {
    this.categories.push(new Category(name));
    return new ActionStatus(true);
  }

  editCategory(id: string, name: string): ActionStatus {
    const category = this.getCategory(id);

    if (category) {
      category.name = name;
      return new ActionStatus(true);
    }
    return new ActionStatus(false, ErrorCategory.NotFound, `Category id ${id} was not found`);
  }

  deleteCategory(id: string): ActionStatus {
    return this.deleteItemById(this.categories, id)
      ? new ActionStatus(true)
      : new ActionStatus(false, ErrorCategory.NotFound, `Category id ${id} was not found`);
  }

  deleteItemById(items: { id: string }[], id: string): boolean {
    const index = items.findIndex((item) => item.id === id);
    if (index >= 0) {
      return items.splice(index, 1).length > 0;
    }
    return false;
  }
  //#endregion
}
