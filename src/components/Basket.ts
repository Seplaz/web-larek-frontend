import { Component } from "./base/Component";
import { cloneTemplate, createElement, ensureElement } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { IBasketView } from "../types/index"

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _totalPrice: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._totalPrice = this.container.querySelector('.basket__total');
        this._button = this.container.querySelector('.basket__action');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open');
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set selected(items: string[]) {
        if (items.length) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    }

    set total(_totalPrice: number) {
        this.setText(this._totalPrice, String(_totalPrice));
    }
}