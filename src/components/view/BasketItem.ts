import { IProduct } from "../../types";
import { EventEmitter } from "../base/events";
import { cloneTemplate } from "../../utils/utils";

export class BasketItem {
  protected _container: HTMLElement;
  protected _index: HTMLElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;

  constructor(template: HTMLTemplateElement, item: IProduct, index: number) {
    this._container = cloneTemplate(template);
    this._index = this._container.querySelector('.basket__item-index');
    this._title = this._container.querySelector('.card__title');
    this._price = this._container.querySelector('.card__price');

    this._index.textContent = String(index + 1);
    this._title.textContent = item.title;
    this._price.textContent = item.price === null ? 'Бесценно' : `${item.price} синапсов`;
  }

  render(): HTMLElement {
    return this._container;
  }
}