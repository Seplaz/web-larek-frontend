import { IAppState, IProduct, IOrder, TFormErrors, IOrderForm, TPaymentMethod } from "../types";
import { EventEmitter } from "./base/events";

export class AppState implements IAppState {
  catalog: IProduct[] = [];
  basket: string[] = [];
  preview: string | null = null;
  order: IOrder = { items: [] };
  loading = false;
  formErrors: TFormErrors = {};

  constructor(protected events: EventEmitter) {}

    setCatalog(items: IProduct[]) {
      this.catalog = items;
      this.events.emit('products:loaded');
    }

    addToBasket(id: string) {
      if (!this.basket.includes(id)) {
        this.basket.push(id);
        this.events.emit('basket:changed', this.getBasketItems());
      }
    }

    removeFromBasket(id: string) {
      this.basket = this.basket.filter(itemId => itemId !== id);
      this.events.emit('basket:changed', this.getBasketItems());
    }

    clearBasket() {
      this.basket = [];
      this.events.emit('basket:changed', []);
    }

    getBasketItems(): IProduct[] {
      return this.basket
      .map(id => this.catalog.find(item => item.id === id))
      .filter((item): item is IProduct => Boolean(item));
    }

    setOrderItems() {
      this.order.items = this.basket;
    }

    setOrderField(field: keyof IOrderForm, value: string | TPaymentMethod) {
      (this.order as Record<keyof IOrderForm, string | TPaymentMethod>)[field] = value;

      if (this.validateOrder()) {
        this.events.emit('order:ready', this.order);
      }
    }

    validateOrder() {
      const errors: typeof this.formErrors = {};

      if(!this.order.address) {
        errors.address = 'Необходимо указать адрес';
      }

      if (!this.order.payment) {
        errors.payment = 'Необходимо выбрать способ оплаты';
      }

      if (!this.order.email) {
          errors.email = 'Необходимо указать email';
      }

      if (!this.order.phone) {
          errors.phone = 'Необходимо указать телефон';
      }

      this.formErrors = errors;
      this.events.emit('formErrors:change', this.formErrors);

      return Object.keys(errors).length === 0;
  }

  getOrderToSend() {
    const basketItems = this.getBasketItems();
    return {
      id: basketItems[0]?.id || (typeof crypto !== 'undefined' ? crypto.randomUUID() : String(Date.now())),
      total: basketItems.reduce((sum, item) => sum + (item.price || 0), 0),
      payment: this.order.payment,
      email: this.order.email,
      phone: this.order.phone,
      address: this.order.address,
      items: this.basket
    };
  }
}