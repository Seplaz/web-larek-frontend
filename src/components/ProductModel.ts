import { IProduct } from "../types";

export class ProductModel {
  protected items: IProduct[] = [];

  // constructor() {
  // 
  // }

  addItem(item: IProduct) {
    this.items.push(item);
  }

  removeItem(id: string) {
    this.items = this.items.filter(item => item.id !== id);
  }

  getItems(): IProduct[] {
    return this.items;
  }

  setItems(items: IProduct[]) {
    this.items = items;
  }
  
  getItem(id: string): IProduct {
    return this.items.find(item => item.id === id);
  }

  getTotal() {
    return this.items.length;
  }
}