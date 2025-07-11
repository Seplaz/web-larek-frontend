import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { StoreAPI } from './components/StoreAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { Modal } from './components/Modal';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Basket } from './components/Basket';
import { ProductModel } from './components/model/ProductModel';
import { Product } from './components/view/Product';
import { Page } from './components/Page';

const events = new EventEmitter();
const api = new StoreAPI(CDN_URL, API_URL);

events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

const page = new Page(ensureElement<HTMLElement>('.gallery'), events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const productModel = new ProductModel(events);

const card = new Product(cloneTemplate(cardCatalogTemplate), events);

api.getItems()
	.then(data => {
		productModel.setItems(data.items)
		console.log(productModel)
	})
	.catch(error => console.log(error))


events.on('products:loaded', () => {
	const cardsArray = productModel.getItems().map(item => new Product(cloneTemplate(cardCatalogTemplate), events).render(item))
	page.render({ catalog: cardsArray })
})












events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});
