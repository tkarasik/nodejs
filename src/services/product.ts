import { v1 as uuid } from 'uuid';

export class Product {
  public readonly id: string;

  constructor(public categoryId: string, public name: string, public itemsInStock: number) {
    this.id = uuid();
  }
}
