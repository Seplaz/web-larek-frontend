import { IOrderForm, IView } from "../../types";

export interface IOrderFormView extends IView {
  renderStep(step: number, data: Partial<IOrderForm>): void;
  onNextStep(callback: () => void): void;
  onSubmit(callback: (data: IOrderForm) => void): void;
  showError(message: string): void;
  clearError(): void;
}