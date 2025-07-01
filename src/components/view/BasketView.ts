import { IBasket, IView } from "../../types";

export interface IBasketView extends IView {
  renderBasket(basket: IBasket): void;
  onRemoveItem(callback: (id: string) => void): void;
  onCheckoutClick(callback: () => void): void;
}