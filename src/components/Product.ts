import { IProduct } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/component";

export class Product extends Component<IProduct> {
  protected category: HTMLElement;
  protected title: HTMLElement;
  protected image: HTMLImageElement;
  protected price: HTMLElement;
  protected button: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);

    this.category = ensureElement('.card__category', this.container) as HTMLElement;
    this.title = ensureElement('.card__title', this.container) as HTMLElement;
    this.image = ensureElement('.card__image', this.container) as HTMLImageElement;
    this.price = ensureElement('.card__price', this.container) as HTMLElement;
    // this.button = ensureElement('.gallery__item', this.container) as HTMLButtonElement;


  }

  set productCategory(value: string) {
    this.setText(this.category, value)
  }

  set productTitle(value: string) {
    this.setText(this.title, value);
  }

  set productImage(value: string) {
    this.setImage(this.image, value, `Изображение товара: ${this.title.textContent}` || "Изображение товара");
  }

  set productPrice(value: string) {
    this.setText(this.price, value);
  }

  render(data: Partial<IProduct>): HTMLElement {
    Object.assign(this as object, data);
    return this.container;
  }

  // добавить кнопку добавления продукта в корзину

  // Кнопки выбора метода оплаты
  // set payment(value: TPaymentMethod) {
  //   this.toggleClass(this.button, 'название класса кнопки', value);
  //   this.toggleClass(this.button, 'название класса кнопки', !value);
  // }
}