import { IProduct } from "../../types/index";
import { EventEmitter } from "../base/events";

export class ProductModel {
  protected items: IProduct[] = [];

  constructor(protected events: EventEmitter) {

  }

  getItems(): IProduct[] {
    return this.items;
  }

  setItems(items: IProduct[]) {
    this.items = items;
    this.events.emit('products:loaded');
  }

  getItem(id: string): IProduct {
    return this.items.find(item => item.id === id);
  }
}