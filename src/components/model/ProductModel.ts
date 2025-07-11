import { IProduct } from "../../types/index";
import { IEvents } from "../base/events";

export class ProductModel {
  protected items: IProduct[] = [];

  constructor(protected events: IEvents) {

  }

  addItem(item: IProduct) {
    this.items.push(item);
    this.events.emit('product:add');
  }

  removeItem(id: string) {
    this.items = this.items.filter(item => item.id !== id);
    this.events.emit('product:remove');
  }

  getItems(): IProduct[] {
    return this.items;
    this.events.emit('products:loaded');
  }

  setItems(items: IProduct[]) {
    this.items = items;
    this.events.emit('products:loaded');
  }
  
  getItem(id: string): IProduct {
    return this.items.find(item => item.id === id);
  }

  getTotal() {
    return this.items.length;
  }
}