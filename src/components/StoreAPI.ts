import { IOrder, IOrderSuccess, IProduct, IProductList } from "../types";
import { Api } from "./base/api";

export class StoreAPI extends Api {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getItems(): Promise<IProductList> {
    return this.get<IProductList>('/product');
  }

  getItem(): Promise<IProduct> {
    return this.get<IProduct>('/product');
  }

  sendOrder(order: IOrder): Promise<IOrderSuccess> {
    return this.post<IOrderSuccess>('/order', order, 'POST');
  }
}