import { IBasket, IProduct } from "../../types";

export interface IBasketModel {
  getItems(): IBasket;
  addItem(product: IProduct): void;
  removeItem(productId: string): void;
  clear(): void;
}