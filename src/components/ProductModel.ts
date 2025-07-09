import { IProduct } from "../types";
import { Api, ApiListResponse } from "./base/api";
import { EventEmitter } from "./base/events";

export class ProductModel {
  constructor(protected api: Api, protected events: EventEmitter) {
    this.api = api;
    this.events = events;
  }

  async getItems(): Promise<IProduct[]> {
    try {
      const response = await this.api.get('/product');
      return (response as ApiListResponse<IProduct>).items;
    }

    catch(error) {
      console.error(`Ошибка запроса: ${error}`);
    }
  }

  async getItem(id: string): Promise<IProduct> {
    try {
      const response = await this.api.get(`/product/${id}`);
      return response as IProduct;
    }

    catch(error) {
      console.error(`Ошибка запроса, товара с идентификатором ${id}. ${error}`)
    }
  }
}