export type TPaymentMethod = 'online' | 'upon_receipt';
export type TPrice = number | null;

export interface IProduct {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  price: TPrice;
}

export interface IProductList {
  products: IProduct[];
}

export interface IBasket {
  index: number;
  products: IProduct[];
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

export interface IOrderSuccess {
  totalPrice: TPrice;
}

export interface IApiClient {
  getProducts(): Promise<IProduct[]>;
  createOrder(order: IOrderForm): Promise<IOrderSuccess>;
}

export interface IPageView {
  render(products: IProduct[]): void;
  onBasketClick(callback: () => void): void;
}

export interface IProductCardView {
  render(product: IProduct): void;
  onClick(callback: () => void): void;
}

export enum Events {
  PRODUCTS_LOADED = 'products:loaded',
  
  PRODUCT_SELECTED = 'product:selected',
  PRODUCT_ADDED_TO_BASKET = 'product:added_to_basket',
  PRODUCT_REMOVED_FROM_BASKET = 'product:removed_from_basket',

  BASKET_OPENED = 'basket:opened',
  BASKET_UPDATED = 'basket:updated',
  BASKET_CLOSED = 'basket:closed',

  ORDER_STEP_COMPLETED = 'order:step_completed',
  ORDER_SUBMITTED = 'order:submitted',
  ORDER_SUCCESS = 'order:success',
  ORDER_ERROR = 'order:error',

  MODAL_OPENED = 'modal:opened',
  MODAL_CLOSED = 'modal:closed'
}
