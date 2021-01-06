import fetch from "node-fetch";
import { Category } from "./category";
import { Product } from "./product";
import { ActionStatus, ErrorCategory } from "../utils/actionStatus";

export class DataService {
  private static instance: DataService;
  private _categories: Category[] = [];
  private _products: Product[] = [];
  private _init = this.loadData();
  private static _instance: DataService;

  private constructor() {}

  static getInstance(): DataService {
    if (!DataService._instance) {
      DataService._instance = new DataService();
    }
    return DataService._instance;
  }

  async loadData(): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(process.env.PRODUCTS_URL || `http://localhost:3000/products.json`)
        .then((res) => res.json())
        .then(
          (
            json: { name: string; categoryName: string; itemsInStock: number }[]
          ) => {
            json.forEach((product) => {
              let category = this._categories.find(
                (category) => category.name === product.categoryName
              );
              if (!category) {
                category = new Category(product.categoryName);
                this._categories.push(category);
              }
              this._products.push(
                new Product(category.id, product.name, product.itemsInStock)
              );
            });
            resolve();
          }
        )
        .catch((error) => reject(error));
    });
  }

  //#region Products
  async getProducts(): Promise<Product[]> {
    return this._init.then(() => this._products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const products = await this.getProducts();
    return products.find((product) => product.id === id);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter((product) => product.categoryId === categoryId);
  }

  async addProduct(
    categoryId: string,
    name: string,
    itemsInStock: number
  ): Promise<ActionStatus> {
    if (!(categoryId && name && typeof itemsInStock === "number"))
      return new ActionStatus(
        false,
        ErrorCategory.Validation,
        `All fields are required: categoryId, name, itemsInStock`
      );

    const product = new Product(categoryId, name, itemsInStock);
    this._products.push(product);
    return new ActionStatus(true);
  }

  async editProduct(
    id: string,
    categoryId: string,
    name: string,
    itemsInStock: number
  ): Promise<ActionStatus> {
    if (!(id && categoryId && name && typeof itemsInStock === "number"))
      return new ActionStatus(
        false,
        ErrorCategory.Validation,
        `All fields are required: categoryId, name, itemsInStock`
      );

    const product = await this.getProduct(id);
    if (product) {
      product.categoryId = categoryId;
      product.name = name;
      product.itemsInStock = itemsInStock;
      return new ActionStatus(true);
    } else {
      return new ActionStatus(
        false,
        ErrorCategory.NotFound,
        `Product id ${id} was not found`
      );
    }
  }

  async deleteProduct(id: string): Promise<ActionStatus> {
    return this.deleteItemById(this._products, id)
      ? new ActionStatus(true)
      : new ActionStatus(
          false,
          ErrorCategory.NotFound,
          `Product id ${id} was not found`
        );
  }
  //#endregion

  //#region _categories
  async getCategories(): Promise<Category[]> {
    return this._init.then(() => this._categories);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const categories = await this.getCategories();
    return categories.find((category) => category.id === id);
  }

  async addCategory(name: string): Promise<ActionStatus> {
    this._categories.push(new Category(name));
    return new ActionStatus(true);
  }

  async editCategory(id: string, name: string): Promise<ActionStatus> {
    const category = await this.getCategory(id);

    if (category) {
      category.name = name;
      return new ActionStatus(true);
    }
    return new ActionStatus(
      false,
      ErrorCategory.NotFound,
      `Category id ${id} was not found`
    );
  }

  async deleteCategory(id: string): Promise<ActionStatus> {
    return this.deleteItemById(this._categories, id)
      ? new ActionStatus(true)
      : new ActionStatus(
          false,
          ErrorCategory.NotFound,
          `Category id ${id} was not found`
        );
  }

  async deleteItemById(items: { id: string }[], id: string): Promise<boolean> {
    const index = items.findIndex((item) => item.id === id);
    if (index >= 0) {
      return items.splice(index, 1).length > 0;
    }
    return false;
  }
  //#endregion
}
