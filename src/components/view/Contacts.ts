import { Form } from "../Form";
import { EventEmitter } from "../base/events";
import { IOrderForm, TFormErrors } from "../../types";
import { ensureElement } from "../../utils/utils";
import { AppState } from "../AppState";

export class Contacts extends Form<IOrderForm> {
  protected _phone: HTMLInputElement;
  protected _email: HTMLInputElement;
  protected _errors: HTMLElement;
  protected _appState: AppState;
  protected _submit: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: EventEmitter) {
    super(container, events);

    this._email = this.container.elements.namedItem('email') as HTMLInputElement;
    this._phone = this.container.elements.namedItem('phone') as HTMLInputElement;
    this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
    this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);

    this._email.addEventListener('input', () => {
      events.emit('order.email:change', { field: 'email', value: this._email.value });
    });

    this._phone.addEventListener('input', () => {
      events.emit('order.phone:change', { field: 'phone', value: this._phone.value });
    });

    events.on('formErrors:change', (errors: TFormErrors) => {
      if (this._errors) {
        this._errors.textContent =
          errors.email ||
          errors.phone ||
          '';
      }
    });

    this._submit.addEventListener('click', (event: Event) => {
      event.preventDefault();
      if (!this._submit.disabled) {
        events.emit('order:success');
      }
    });
  }

  set phone(value: string) {
    this._phone.value = value;
  }

  set email(value: string) {
    this._email.value = value;
  }
}