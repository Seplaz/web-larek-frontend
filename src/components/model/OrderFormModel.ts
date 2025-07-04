import { TPaymentMethod, TPrice } from "../../types";

export class OrderForm {
  payment: TPaymentMethod = 'online';
  deliveryAddress = '';
  email = '';
  phone = '';
  totalPrice: TPrice = null;

  isValidStep1() {
    return this.payment && this.deliveryAddress;
  }

  isValidStep2() {
    return this.email && this.phone;
  }

  submit() {
    // Логика оформления заказа
  }
}