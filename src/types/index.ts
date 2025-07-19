export type TPaymentMethod = 'card' | 'cash';
export type TPrice = number | null;
export type TFormErrors = Partial<Record<keyof IOrder, string>> & { common?: string };

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: TPrice;
}

export interface IProductListResponse {
  items: IProduct[];
  total?: number;
}

export interface IBasketView {
  items: HTMLElement[];
  total: number;
  selected: string[];
}

export interface IOrderForm {
  email?: string;
  phone?: string;
  address?: string;
  payment?: TPaymentMethod;
}

export interface IOrder extends IOrderForm {
  items: string[];
}

export interface IOrderSuccess {
  id: string;
  total: TPrice;
}

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export interface IAppState {
  catalog: IProduct[];
  basket: string[];
  preview: string | null;
  order: IOrder | null;
  loading: boolean;
}

export enum Events {
  PRODUCTS_LOADED = 'products:loaded',
  PRODUCT_SELECT = 'product:select',
  PRODUCT_ADD = 'product:add',
  PRODUCT_REMOVE = 'product:remove',

  BASKET_OPEN = 'basket:open',
  BASKET_CHANGED = 'basket:changed',

  ORDER_STEP_ADDRESS = 'order:step_address',
  ORDER_STEP_CONTACTS = 'order:step_contacts',
  ORDER_SUCCESS = 'order:success',

  FORM_ERRORS_CHANGE = 'formErrors:change',

  MODAL_OPEN = 'modal:open',
  MODAL_CLOSE = 'modal:close',
}

export enum Category {
  'софт-скил' = 'card__category_soft',
  'другое' = 'card__category_other',
  'дополнительное' = 'card__category_additional',
  'кнопка' = 'card__category_button',
  'хард-скил' = 'card__category_hard'
}