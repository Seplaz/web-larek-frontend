import { IView } from "../../types";

export interface IModalView extends IView {
  open(modalId: string): void;
  close(): void;
  onClose(callback: () => void): void;
}