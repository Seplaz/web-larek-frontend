import { IProduct } from "../../types";

export class ProductList {
  products: IProduct[] = [];

  setProducts(products: IProduct[]) {
    this.products = products;
  }

  getById(id: string) {
    return this.products.find(p => p.id === id);
  }

  filterByCategory(category: string) {
    return this.products.filter(p => p.category === category);
  }
}