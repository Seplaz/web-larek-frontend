import { Component } from "./base/Component";
import { IProduct, TPrice } from "../types";
import { bem, createElement, ensureElement } from "../utils/utils";
import clsx from "clsx";

interface IProductCardActions {
    onClick: (event: MouseEvent) => void;
}

export class ProductCard extends Component<IProduct> {
  protected _id: string;
  protected _description?: string;
  protected _image: string;
  protected _title: string;
  protected _category: string;
  protected _price: TPrice;

  constructor(container: HTMLElement) {
    super(container);
  }

}