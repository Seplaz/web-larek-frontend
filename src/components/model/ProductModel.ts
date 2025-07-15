import { IProduct } from "../../types/index";
import { EventEmitter } from "../base/events";

export class ProductModel {
  protected items: IProduct[] = [];
  protected basket: IProduct[] = [];
  
  constructor(protected events: EventEmitter) {

  }

  getItems(): IProduct[] {
    return this.items;
  }

  setItems(items: IProduct[]) {
    this.items = items;
    this.events.emit('products:loaded');
  }
  
  addToBasket(product: IProduct) {
    if (!this.basket.find(item => item.id === product.id)) {
      this.basket.push(product);
      this.events.emit('basket:changed', this.basket);
    }
  }

  getBasket(): IProduct[] {
    return this.basket;
  }
}