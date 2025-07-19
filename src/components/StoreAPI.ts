import { IOrderSuccess } from "../types";
import { Api } from "./base/api";

export class StoreAPI extends Api {
  constructor(
    readonly cdn: string,
    baseUrl: string,
    options?: RequestInit
  ) {
    super(baseUrl, options);
  }

  async getItems() {
    const data = await this.get<any>("/product");
    return { ...data, items: data.items.map((item: any) => ({ ...item, image: this.cdn + item.image })) };
  }

  async getItem(id: string) {
    const item = await this.get<any>(`/product/${id}`);
    return { ...item, image: this.cdn + item.image };
  }

  async sendOrder(order: any): Promise<IOrderSuccess> {
    return this.post('/order', order);
  }
}