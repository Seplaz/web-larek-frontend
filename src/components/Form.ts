export class Form {
  protected form: HTMLFormElement;

  constructor(selector: string) {
    this.form = document.querySelector(selector) as HTMLFormElement;
  }

  getData(): Record<string, string> {
    const data: Record<string, string> = {};
    new FormData(this.form).forEach((value, key) => {
      data[key] = value.toString();
    });
    return data;
  }

  setError(field: string, message: string) {
    // Реализация отображения ошибки
  }

  clearErrors() {
    // Реализация очистки ошибок
  }
}