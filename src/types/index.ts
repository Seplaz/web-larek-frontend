export type PaymentMethod = 'online' | 'upon_receipt';
export type Price = number | null;

export interface ICard {
  id: string;
  category: string;
  name: string;
  description: string;
  image: string;
  price: Price;
}

export interface ICardList {
  cards: ICard[];
}

export interface IBasket {
  items: ICard[];
  totalPrice: Price;
}

export interface IOrderForm {
  payment: PaymentMethod;
  deliveryAddress: string;
  email: string;
  phone: string;
}

export interface IOrderSuccess {
  totalPrice: number;
}

export interface IAppState {
  cardList: ICardList;
  basket: IBasket;
  orderForm: IOrderForm;
  orderSuccess: IOrderSuccess;
}