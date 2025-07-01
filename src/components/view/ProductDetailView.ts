import { IProduct, IView } from "../../types";

export interface IProductDetailView extends IView {
  renderProduct(product: IProduct): void;
  onBuyClick(callback: () => void): void;
  onRemoveClick(callback: () => void): void;
}