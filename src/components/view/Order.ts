import { Form } from "./Form";
import { IOrderForm, TFormErrors } from "../../types";
import { EventEmitter } from "../base/events";
import { ensureElement } from "../../utils/utils";

export class Order extends Form<IOrderForm> {
  protected _cardPaymentButton: HTMLButtonElement;
  protected _cashPaymentButton: HTMLButtonElement;
  protected _submit: HTMLButtonElement;
  protected _address: HTMLInputElement;
  protected _errors: HTMLElement;

  constructor(container: HTMLFormElement, events: EventEmitter) {
    super(container, events);

    this._cardPaymentButton = this.container.elements.namedItem('card') as HTMLButtonElement;
    this._cashPaymentButton = this.container.elements.namedItem('cash') as HTMLButtonElement;
    this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
    this._address = this.container.elements.namedItem('address') as HTMLInputElement;
    this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

    this._address.addEventListener('input', () => {
      events.emit('order.address:change', { field: 'address', value: this._address.value });
    });

    this._cardPaymentButton.addEventListener('click', () => {
      this.payment = 'card';
      events.emit('order.payment:change', { field: 'payment', value: 'card' });
    });

    this._cashPaymentButton.addEventListener('click', () => {
      this.payment = 'cash';
      events.emit('order.payment:change', { field: 'payment', value: 'cash' });
    });

    this._submit.addEventListener('click', (event: Event) => {
      event.preventDefault();
      if (!this._submit.disabled) {
        events.emit('order:step_contacts');
      }
    });

    events.on('formErrors:change', (errors: TFormErrors) => {
      if (this._errors) {
        this._errors.textContent =
          errors.payment ||
          errors.address ||
          '';
      }
    });
  }

  set address(value: string) {
    this._address.value = value;
  }

  set payment(value: string) {
    if(value === 'card') {
      this._cardPaymentButton.classList.toggle('button_alt-active');
      this._cashPaymentButton.classList.remove('button_alt-active');
    } else if(value === 'cash') {
      this._cashPaymentButton.classList.toggle('button_alt-active');
      this._cardPaymentButton.classList.remove('button_alt-active');
    }
  }
}