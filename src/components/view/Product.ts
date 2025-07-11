import { IProduct, TPrice } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { EventEmitter } from "../base/events";

export class Product extends Component<IProduct> {
  protected _id: string;
  protected _category: HTMLElement;
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._category = ensureElement('.card__category', this.container) as HTMLElement;
    this._title = ensureElement('.card__title', this.container) as HTMLElement;
    this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
    this._price = ensureElement('.card__price', this.container) as HTMLElement;
    this._button = this.container as HTMLButtonElement;

    this._button.addEventListener('click', () => {
      this.events.emit('product:select', {id: this._id})
    })
  }

  set id(value: string) {
    this._id = value;
  }

  set category(value: string) {
    this.setText(this._category, value)
    this._category.classList.remove('card__category_soft')
    
    switch(value) {
      case 'софт-скил':
        this._category.classList.add(`card__category_soft`);
        break;
      case 'другое':
        this._category.classList.add(`card__category_other`);
        break;
      case 'дополнительное':
        this._category.classList.add(`card__category_additional`);
        break;
      case 'кнопка':
        this._category.classList.add(`card__category_button`);
        break;
      case 'хард-скил':
        this._category.classList.add(`card__category_hard`);
        break;
      default:
        this._category.classList.add(`card__category`);
    }
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set image(value: string) {
    this.setImage(this._image, value, `Изображение товара`);
  }

  set price(value: TPrice) {
    value === null ? this.setText(this._price, 'Бесценно') : this.setText(this._price, `${value} синапсов`);
    // this.setText(this._price, `${value} синапсов`);
  }

  // добавить кнопку добавления продукта в корзину

  // Кнопки выбора метода оплаты
  // set payment(value: TPaymentMethod) {
  //   this.toggleClass(this.button, 'название класса кнопки', value);
  //   this.toggleClass(this.button, 'название класса кнопки', !value);
  // }
}