import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { StoreAPI } from './components/StoreAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { Modal } from './components/Modal';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Basket } from './components/view/Basket';
import { ProductModel } from './components/model/ProductModel';
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
  basket.addItem(data.card);
  basket.items = basket.itemsList.map((item, index) => {
    const basketItem = cloneTemplate(cardBasketTemplate);
    basketItem.querySelector('.basket__item-index').textContent = String(index + 1);
    basketItem.querySelector('.card__title').textContent = item.title;
    return basketItem;
  });

  page.counter = basket.itemsList.length;
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

