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

export interface IApi {
  getProducts(): Promise<ICard[]>;
  submitOrder(order: IOrderForm): Promise<IOrderSuccess>;
}

export interface IEventEmitter {
  on(event: string, callback: (data?: unknown) => void): void;
  off(event: string, callback: (data?: unknown) => void): void;
  emit(event: string, data?: unknown): void;
}

export interface ICardView {
  setCard(card: ICard): void;
  render(): HTMLElement;
  onBuy(callback: () => void): void;
  onRemove(callback: () => void): void;
}

export interface ICatalogView {
  setCards(cards: ICard[]): void;
  render(): HTMLElement;
  onCardClick(callback: (cardId: string) => void): void;
}

export interface IBasketView {
  setItems(items: ICard[]): void;
  setTotalPrice(price: Price): void;
  render(): HTMLElement;
  onRemoveItem(callback: (cardId: string) => void): void;
  onCheckout(callback: () => void): void;
}

export interface IModalView {
  setContent(content: HTMLElement): void;
  show(): void;
  hide(): void;
  onClose(callback: () => void): void;
}

export interface IOrderFormView {
  setFormData(data: IOrderForm): void;
  render(): HTMLElement;
  onNextStep(callback: () => void): void;
  validate(): boolean;
}

export interface IOrderSuccessView {
  setTotalPrice(price: number): void;
  render(): HTMLElement;
  onContinueShopping(callback: () => void): void;
}