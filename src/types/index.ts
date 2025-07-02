export type TPaymentMethod = 'online' | 'upon_receipt';
export type TPrice = number | null;
export type TApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type TEventName = string | RegExp;

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

export interface IApiResponse<T> {
  baseUrl: string;
  get<T>(uri: string, method?: TApiMethod): Promise<T>;
  post<T>(uri: string, data: object, method?: TApiMethod): Promise<T>;
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

export interface IView {
  render(data?: unknown): void;
  show(): void;
  hide(): void;
}

export interface IProductView extends IView {
  onProductSelect(callback: (id: string) => void): void;
}

export interface IBasketView extends IView {
  onRemoveItem(callback: (id: string) => void): void;
  onCheckout(callback: () => void): void;
}

export interface IOrderFormView extends IView {
  onSubmit(callback: (data: IOrderForm) => void): void;
}

export interface IPresenter {
  init(): void;
  destroy(): void;
}

export interface IProductPresenter extends IPresenter {}

export interface IBasketPresenter extends IPresenter {}

export interface IOrderPresenter extends IPresenter {}

export interface IEventEmitter {
  on<T extends object>(event: TEventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
