import { IProduct } from "../../types";

export class Basket {
  products: IProduct[] = [];

  add(product: IProduct) {
    if (!this.products.find(p => p.id === product.id)) {
      this.products.push(product);
    }
  }

  remove(productId: string) {
    this.products = this.products.filter(p => p.id !== productId);
  }

  clear() {
    this.products = [];
  }

  getTotal(): number {
    return this.products.reduce((sum, p) => sum + (p.price || 0), 0);
  }
}