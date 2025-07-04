export class Button {
  protected button: HTMLButtonElement;

  constructor(selector: string) {
    this.button = document.querySelector(selector) as HTMLButtonElement;
  }

  setActive(active: boolean) {
    this.button.disabled = !active;
  }

  onClick(handler: EventListener) {
    this.button.addEventListener('click', handler);
  }
}