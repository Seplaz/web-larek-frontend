import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { StoreAPI } from './components/StoreAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { Modal } from './components/Modal';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Basket } from './components/Basket';
import { ProductModel } from './components/ProductModel';
import { Product } from './components/Product';
import { IProduct } from './types';

const events = new EventEmitter();
const api = new StoreAPI(CDN_URL, API_URL);
const productModel = new ProductModel();

const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);



events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})


  const gallery = ensureElement<HTMLElement>('.gallery');
  const card = new Product(cloneTemplate(cardCatalogTemplate), events)

  api.getItems()
  .then(data => {
    productModel.setItems(data.items);
    productModel.getItems().forEach((item: IProduct) => {
      const card = new Product(cloneTemplate(cardCatalogTemplate), events);
      card.title = item.title;
      card.image = item.image;
      gallery.append(card.render(item));
    });
  })
  .catch(error => {
    console.log(error)
  });
