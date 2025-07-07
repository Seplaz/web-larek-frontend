export type TPaymentMethod = 'online' | 'upon_receipt';
export type TPrice = number | null;
export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: TPrice;
}

export interface IProductList {
  items: IProduct[];
}

export interface IBasket {
  index: number;
  items: IProduct[];
  totalPrice: TPrice;
}

export interface IUserData {
  deliveryAddress: string;
  email: string;
  phone: string;
}

export interface IOrderForm extends IUserData {
  payment: TPaymentMethod;
  totalPrice: TPrice;
}

export interface IOrder extends IOrderForm {
  items: string[]
}

export interface IOrderSuccess {
  totalPrice: TPrice;
}

export enum Events {
  PAGE_LOADED = 'page:loaded',


  PRODUCTS_LOADED = 'products:loaded',
  
  PRODUCT_SELECTED = 'product:selected',
  PRODUCT_ADDED_TO_BASKET = 'product:added_to_basket',
  PRODUCT_REMOVED_FROM_BASKET = 'product:removed_from_basket',

  BASKET_OPENED = 'basket:open',
  BASKET_UPDATED = 'basket:update',
  BASKET_CLOSED = 'basket:close',

  ORDER_STEP_COMPLETED = 'order:step_completed',
  ORDER_SUBMITTED = 'order:submitted',
  ORDER_SUCCESS = 'order:success',
  ORDER_ERROR = 'order:error',

  MODAL_OPEN = 'modal:open',
  MODAL_CLOSE = 'modal:close'
}
