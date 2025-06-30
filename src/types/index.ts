export type PaymentMethod = 'online' | 'upon_receipt';
export type Price = number | null;
export type EventName = string | RegExp;

export interface ICard {
  id: string;
  image: string;
  category: string;
  title: string;
  text: string;
  price: Price;
}

export interface ICardList {
  cards: ICard[];
}

export interface IBasket {
  index: number;
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

export interface IApi {
  getProducts(): Promise<ICard[]>;
  submitOrder(order: IOrderForm): Promise<IOrderSuccess>;
}

export interface IEventEmitter {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  off(event: EventName, callback: (data: any) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
  onAll(callback: (event: { eventName: string, data: unknown }) => void): void;
  offAll(): void;
}

export interface ICardModel {
  getCards(): ICard[];
  getCardById(id: string): ICard | undefined;
}

export interface IBasketModel {
  addItem(item: ICard): void;
  removeItem(id: string): void;
  getItems(): ICard[];
  calculateTotal(): Price;
  clear(): void;
  hasItem(id: string): boolean;
  getIndex(): number;
}

export interface IOrderFormModel {
  setPayment(payment: PaymentMethod): void;
  setDeliveryAddress(address: string): void;
  setEmail(email: string): void;
  setPhone(phone: string): void;
  validateStep(): boolean;
  validateField(field: keyof IOrderForm): boolean;
  getValidationError(): string | null;
  getFormData(): IOrderForm;
}

export interface IOrderSuccessModel {
  setTotalPrice(price: number): void;
  getTotalPrice(): number;
}

export interface IView {
  render(): HTMLElement;
}

export interface ICardView extends IView {
  setCard(card: ICard): void;
  onBuy(callback: () => void): void;
  onRemove(callback: () => void): void;
}

export interface ICatalogView extends IView {
  setCards(cards: ICard[]): void;
  onCardClick(callback: (cardId: string) => void): void;
}

export interface IBasketView extends IView {
  setItems(items: ICard[]): void;
  setTotalPrice(price: Price): void;
  onRemoveItem(callback: (cardId: string) => void): void;
  onCheckout(callback: () => void): void;
}

export interface IModalView extends IView {
  setContent(content: HTMLElement): void;
  show(): void;
  hide(): void;
  onClose(callback: () => void): void;
}

export interface IOrderFormView extends IView {
  setFormData(data: IOrderForm): void;
  onNextStep(callback: () => void): void;
  validate(): boolean;
  showError(message: string): void;
  hideError(): void;
}

export interface IOrderSuccessView extends IView {
  setTotalPrice(price: number): void;
  onContinueShopping(callback: () => void): void;
}

export interface IComponent<T> {
  render(data?: Partial<T>): HTMLElement;
}

export enum AppEvents {
  CARD_SELECTED = 'card:selected',
  CARD_ADDED_TO_BASKET = 'card:added_to_basket',
  CARD_REMOVED_FROM_BASKET = 'card:removed_from_basket',
  BASKET_UPDATED = 'basket:updated',
  ORDER_STEP_COMPLETED = 'order:step_completed',
  ORDER_SUBMITTED = 'order:submitted',
  MODAL_OPENED = 'modal:opened',
  MODAL_CLOSED = 'modal:closed'
}

export interface ICardSelectedEvent {
  cardId: string;
}

export interface ICardBasketEvent {
  card: ICard;
}

export interface IBasketUpdatedEvent {
  items: ICard[];
  totalPrice: Price;
}

export interface IOrderStepEvent {
  step: number;
  isValid: boolean;
}

export interface IOrderSubmittedEvent {
  order: IOrderForm;
  result: IOrderSuccess;
}

export interface IModalEvent {
  content: HTMLElement;
}


