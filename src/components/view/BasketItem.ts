import { IProduct, TPrice } from "../../types";
import { EventEmitter } from "../base/events";
import { Component } from "../base/component";
import { ensureElement } from "../../utils/utils";

export class BasketItem extends Component<IProduct> {
  protected _id: string;
  protected _index: HTMLElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._index = ensureElement('.basket__item-index', this.container) as HTMLElement;
    this._title = ensureElement('.card__title', this.container) as HTMLElement;
    this._price = ensureElement('.card__price', this.container) as HTMLElement;
    this._deleteButton = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;

    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        this.events.emit('product:remove', { id: this._id });
      })
    }
  }

  set id(value: string) {
    this._id = value;
  }
  get id(): string {
    return this._id;
  }

  set index(value: number) {
    this.setText(this._index, value);
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set price(value: TPrice) {
    this.setText(this._price, value === null ? 'Бесценно' : `${value} синапсов`);
  }
}