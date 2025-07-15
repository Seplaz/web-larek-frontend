import { IProduct } from "../../types";
import { EventEmitter } from "../base/events";

export class BasketModel {
  protected items: IProduct[] = [];

  constructor(protected events: EventEmitter) {}

  add(item: IProduct) {
    if (!this.items.find(i => i.id === item.id)) {
      this.items.push(item);
      this.events.emit('basket:changed', this.items);
    }
  }

  remove(id: string) {
    this.items = this.items.filter(i => i.id !== id);
    this.events.emit('basket:changed', this.items);
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
  }
}