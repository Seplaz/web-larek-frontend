import { IProduct, TPrice } from "../../types";
import { EventEmitter } from "../base/events";
import { Component } from "../base/component";
import { ensureElement } from "../../utils/utils";

export class BasketItem extends Component<IProduct> {
  protected _index: HTMLElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _deleteButton: HTMLButtonElement;
  public id: string;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._index = ensureElement('.basket__item-index', this.container) as HTMLElement;
    this._title = ensureElement('.card__title', this.container) as HTMLElement;
    this._price = ensureElement('.card__price', this.container) as HTMLElement;
    this._deleteButton = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;

    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.events.emit('product:remove', { card: { id: this.id } });
      })
    }
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