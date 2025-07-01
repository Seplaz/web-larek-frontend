import { IProduct } from "../../types";

export interface IProductModel {
  getProducts(): Promise<IProduct[]>;
  getProductById(id: string): Promise<IProduct | undefined>;
}