export class Modal {
  protected modal: HTMLElement;
  protected closeBtn: HTMLElement;

  constructor(modalSelector: string, closeSelector: string) {
    this.modal = document.querySelector(modalSelector) as HTMLElement;
    this.closeBtn = this.modal.querySelector(closeSelector) as HTMLElement;
    this.closeBtn.addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
  }

  open(content: HTMLElement) {
    this.modal.querySelector('.modal-content')?.replaceWith(content);
    this.modal.classList.add('open');
  }

  close() {
    this.modal.classList.remove('open');
  }
}