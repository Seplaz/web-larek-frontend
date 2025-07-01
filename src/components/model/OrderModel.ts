import { IOrderForm } from "../../types";

export interface IOrderModel {
  getOrderForm(): IOrderForm;
  updateOrderForm(data: Partial<IOrderForm>): void;
  submitOrder(): Promise<IOrderForm>;
}