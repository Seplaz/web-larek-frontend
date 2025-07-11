import { IProduct, TPrice } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

export class Product extends Component<IProduct> {
  protected _category: HTMLElement;
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._category = ensureElement('.card__category', this.container) as HTMLElement;
    this._title = ensureElement('.card__title', this.container) as HTMLElement;
    this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
    this._price = ensureElement('.card__price', this.container) as HTMLElement;
  }

  set category(value: string) {
    this.setText(this._category, value)
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set image(value: string) {
    this.setImage(this._image, value, `Изображение товара: ${this._title.textContent}` || "Изображение товара");
  }

  set price(value: TPrice) {
    if(value === null) {
      this.setText(this._price, 'Бесценно')
    }
    this.setText(this._price, `${value} синапсов`);
  }

  // добавить кнопку добавления продукта в корзину

  // Кнопки выбора метода оплаты
  // set payment(value: TPaymentMethod) {
  //   this.toggleClass(this.button, 'название класса кнопки', value);
  //   this.toggleClass(this.button, 'название класса кнопки', !value);
  // }
}