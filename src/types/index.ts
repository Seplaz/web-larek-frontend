export type TPaymentMethod = 'online' | 'upon_receipt';
export type TPrice = number | null;
export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: TPrice;
}

export interface IProductList {
  total: number;
  items: IProduct[];
}

export interface IBasket {
  index: number;
  items: IProduct[];
  totalPrice: TPrice;
}

export interface IBasketView {
  items: HTMLElement[];
  total: number;
  selected: string[];
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

export interface IStoreAPI {
  getItemsList: () => Promise<IProductList>;
  getItem: (id: string) => Promise<IProduct>;
  sendOrder: (order: IOrder) => Promise<IOrderSuccess>;
}

export enum Events {
  PRODUCTS_LOADED = 'products:loaded',
  PRODUCT_SELECTED = 'product:selected',
  PRODUCT_ADDED_TO_BASKET = 'product:added_to_basket',
  PRODUCT_REMOVED_FROM_BASKET = 'product:removed_from_basket',

  BASKET_OPEN = 'basket:open',
  BASKET_UPDATE = 'basket:update',
  BASKET_CLOSE = 'basket:close',

  ORDER_STEP_COMPLETE = 'order:step_complete',
  ORDER_SUBMIT = 'order:submit',
  ORDER_SUCCESS = 'order:success',
  ORDER_ERROR = 'order:error',

  MODAL_OPEN = 'modal:open',
  MODAL_CLOSE = 'modal:close'
}
