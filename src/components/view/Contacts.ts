import { Form } from "../Form";
import { EventEmitter } from "../base/events";
import { IOrderForm } from "../../types";

export class Contacts extends Form<IOrderForm> {
  protected _phone: HTMLInputElement;
  protected _email: HTMLInputElement;

  constructor(container: HTMLFormElement, events: EventEmitter) {
    super(container, events);

    this._email = this.container.elements.namedItem('email') as HTMLInputElement;
    this._phone = this.container.elements.namedItem('phone') as HTMLInputElement;
  }

  set phone(value: string) {
    this._phone.value = value;
  }

  set email(value: string) {
    this._email.value = value;
  }
}