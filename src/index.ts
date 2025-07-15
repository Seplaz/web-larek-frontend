import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { StoreAPI } from './components/StoreAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { Modal } from './components/Modal';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Basket } from './components/view/Basket';
import { BasketItem } from './components/view/BasketItem';
import { ProductModel } from './components/model/ProductModel';
import { BasketModel } from './components/model/BasketModel';
import { Card } from './components/view/Card';
import { Page } from './components/Page';
import { IProduct } from './types';

const events = new EventEmitter();
const api = new StoreAPI(CDN_URL, API_URL);

events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const basket = new Basket(cloneTemplate(basketTemplate), events);
const productModel = new ProductModel(events);
const basketModel = new BasketModel(events);

api.getItems()
	.then(data => {
		productModel.setItems(data.items)
	})
	.catch(error => console.log(error))

events.on('products:loaded', () => {
	const cardsArray = productModel.getItems().map(item => new Card(cloneTemplate(cardCatalogTemplate), events).render(item));
	page.render({ catalog: cardsArray });
});

events.on('product:select', (data: { card: IProduct }) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), events);
	modal.render({ content: card.render(data.card) });
});


events.on('product:add', (data: { card: IProduct }) => {
  basketModel.add(data.card);
});

events.on('basket:changed', (basketItems: IProduct[]) => {
  basket.items = basketItems.map((item, index) => {
    const basketItem = new BasketItem(cloneTemplate(cardBasketTemplate), events);
    basketItem.index = index + 1;
    basketItem.title = item.title;
    basketItem.price = item.price;
    return basketItem.render();
  });
  page.counter = basketItems.length;
  basket.total = basketModel.getTotal();
  modal.close();
});


events.on('basket:open', () => {
	modal.render({ content: basket.render() });
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

