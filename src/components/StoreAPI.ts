import { IOrder, IOrderSuccess, IProduct, IProductList } from "../types";
import { Api } from "./base/api";

export class StoreAPI extends Api {
  constructor(
    readonly cdn: string,
    baseUrl: string,
    options?: RequestInit
  ) {
    super(baseUrl, options);
  }

  async getItems(): Promise<IProductList> {
    const data = await this.get<IProductList>('/product');
    return { ...data, items: data.items.map(item => ({ ...item, image: this.cdn + item.image })) };
  }

  async getItem(id: string): Promise<IProduct> {
    const item = await this.get<IProduct>(`/product/${id}`);
    return { ...item, image: this.cdn + item.image };
  }

  async sendOrder(order: IOrder): Promise<IOrderSuccess> {
    return this.post('/order', order);
  }
}