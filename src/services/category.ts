import { v1 as uuid } from 'uuid';

export class Category {
  public readonly id: string;

  constructor(public name: string) {
    this.id = uuid();
  }
}
