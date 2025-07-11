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
  total: number;
  items: IProduct[];
}

export interface IBasket {
  index: number;
  items: IProduct[];
  total: TPrice;
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
  total: TPrice;
}

export interface IOrder extends IOrderForm {
  items: string[]
}

export interface IOrderSuccess {
  id: string;
  total: TPrice;
}

export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface IStoreAPI {
  getItems(): Promise<IProductList>
  getItem(): Promise<IProduct>
  sendOrder(order: IOrder): Promise<IOrderSuccess>
}

export enum Events {
  PRODUCTS_LOADED = 'products:loaded',
  
  PRODUCT_SELECT = 'product:select',
  PRODUCT_ADD = 'product:add',
  PRODUCT_REMOVE = 'product:remove',

  BASKET_OPEN = 'basket:open',
  BASKET_UPDATE = 'basket:update',
  BASKET_CLOSE = 'basket:close',

  ORDER_STEP_NEXT = 'order:step_next',
  ORDER_SUBMIT = 'order:submitted',
  ORDER_SUCCESS = 'order:success',
  ORDER_ERROR = 'order:error',

  MODAL_OPEN = 'modal:open',
  MODAL_CLOSE = 'modal:close'
}