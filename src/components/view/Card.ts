import { IProduct, TPrice, Category } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { EventEmitter } from "../base/events";

export class Card extends Component<IProduct> {
  protected _id: string;
  protected _index: HTMLElement;
  protected _description?: HTMLElement;
  protected _category: HTMLElement;
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;
  protected _cartButton: HTMLButtonElement;
  private _data: IProduct;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._description = this.container.querySelector('.card__text') as HTMLElement;
    this._category = ensureElement('.card__category', this.container) as HTMLElement;
    this._title = ensureElement('.card__title', this.container) as HTMLElement;
    this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
    this._price = ensureElement('.card__price', this.container) as HTMLElement;
    this._button = this.container as HTMLButtonElement;
    this._cartButton = this.container.querySelector('.card__button') as HTMLButtonElement;

    this._button.addEventListener('click', (event) => {
      event.stopPropagation();
      this.events.emit('product:select', { card: this._data });
    });

    if (this._cartButton) {
      this._cartButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this._cartButton.textContent === 'В корзину') {
          this.events.emit('product:add', { card: this._data });
        } else if (this._cartButton.textContent === 'Удалить из корзины') {
          this.events.emit('product:remove', { card: this._data });
        }
      });
    }
  }

  set id(value: string) {
    this._id = value;
  }

  set index(value: number) {
    this.setText(this._index, value);
  }

  set description(value: string) {
    this._description ? this.setText(this._description, value) : '';
  }

  set category(value: string) {
    this.setText(this._category, value)
    this._category.className = 'card__category';

    if (value in Category) {
      this._category.classList.add(Category[value as keyof typeof Category]);
    }
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set image(value: string) {
    this.setImage(this._image, value, `Изображение товара`);
  }

  set price(value: TPrice) {
    this.setText(this._price, value === null ? 'Бесценно' : `${value} синапсов`);
    if (this._cartButton) {
      this._cartButton.textContent = value === null ? 'Недоступно' : 'В корзину';
      this._cartButton.disabled = value === null;
    }
  }

  render(data?: Partial<IProduct>): HTMLElement {
    if (data) {
      this._data = { ...this._data, ...data } as IProduct;
    }
    return super.render(data);
  }
}