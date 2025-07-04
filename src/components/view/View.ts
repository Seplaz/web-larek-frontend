export class View<T = any> {
  protected element: HTMLElement;

  constructor(selector: string) {
    this.element = document.querySelector(selector) as HTMLElement;
  }

  render(data: T) {
  }

  on(event: string, handler: EventListener) {
    this.element.addEventListener(event, handler);
  }

  off(event: string, handler: EventListener) {
    this.element.removeEventListener(event, handler);
  }
}