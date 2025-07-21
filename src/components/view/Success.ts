import { Component } from "../base/component";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";

interface ISuccess {
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected _total: HTMLElement;
    protected _close: HTMLElement;

    constructor(container: HTMLElement, actions: ISuccessActions, protected events: EventEmitter) {
        super(container);

        this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    set total(value: number) {
        if (this._total) {
            this._total.textContent = `Списано ${value} синапсов`;
        }
    }

    render(data: ISuccess) {
        this.total = data.total;
        return this.container;
    }
}