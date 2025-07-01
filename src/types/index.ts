export type PaymentMethod = 'online' | 'upon_receipt';
export type Price = number | null;
export type EventName = string | RegExp;

export interface IProduct {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  price: Price;
}

export interface IProductList {
  products: IProduct[];
}

export interface IBasket {
  index: number;
  products: IProduct[];
  totalPrice: Price;
}

export interface IOrderForm {
  payment: PaymentMethod;
  deliveryAddress: string;
  email: string;
  phone: string;
  totalPrice: Price;
}

export interface IEventEmitter {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  off(event: EventName, callback: (data: unknown) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
  onAll(callback: (event: { eventName: string, data: unknown }) => void): void;
  offAll(): void;
}

export enum Events {
  PRODUCT_SELECTED = 'product:selected',
  PRODUCT_ADDED_TO_BASKET = 'product:added_to_basket',
  PRODUCT_REMOVED_FROM_BASKET = 'product:removed_from_basket',
  BASKET_UPDATED = 'basket:updated',
  ORDER_STEP_COMPLETED = 'order:step_completed',
  ORDER_SUBMITTED = 'order:submitted',
  MODAL_OPENED = 'modal:opened',
  MODAL_CLOSED = 'modal:closed'
}