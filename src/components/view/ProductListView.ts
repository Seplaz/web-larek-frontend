import { IProduct, IView } from "../../types";

export interface IProductListView extends IView {
  renderProducts(products: IProduct[]): void;
  onProductClick(callback: (id: string) => void): void;
}