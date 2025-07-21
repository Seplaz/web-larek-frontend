import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { StoreAPI } from './components/StoreAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { Modal } from './components/view/Modal';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Basket } from './components/view/Basket';
import { BasketItem } from './components/view/BasketItem';
import { Card } from './components/view/Card';
import { Page } from './components/view/Page';
import { IOrderForm, IProduct } from './types';
import { AppState } from './components/AppState';
import { Order } from './components/view/Order'
import { Contacts } from './components/view/Contacts';
import { Success } from './components/view/Success';

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

const appState = new AppState(events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);

api.getItems()
	.then(data => {
		appState.setCatalog(data.items);
	})
	.catch(error => console.log(error))

events.on('products:loaded', () => {
	const cardsArray = appState.catalog.map(item => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), events);
		card.render(item);
		card.inBasket = appState.basket.includes(item.id);
		return card.render();
	});
	page.render({ catalog: cardsArray });
});

events.on('product:select', (data: { id: string }) => {
  const product = appState.catalog.find(item => item.id === data.id);
  if (!product) return;
  const card = new Card(cloneTemplate(cardPreviewTemplate), events);
  card.render(product);
  card.inBasket = appState.basket.includes(product.id);
  modal.render({ content: card.render() });
});

events.on('product:add', (data: { id: string }) => {
	appState.addToBasket(data.id);
});

events.on('product:remove', (data: { id: string }) => {
	appState.removeFromBasket(data.id);
})

events.on('basket:changed', (basketItems: IProduct[]) => {
	basket.items = basketItems.map((item, index) => {
		const basketItem = new BasketItem(cloneTemplate(cardBasketTemplate), events);
		basketItem.index = index + 1;
		basketItem.title = item.title;
		basketItem.price = item.price;
		basketItem.id = item.id;
		return basketItem.render();
	});
	page.counter = basketItems.length;
	basket.total = basketItems.reduce((sum, item) => sum + (item.price || 0), 0);
});

events.on('basket:open', () => {
	modal.render({ content: basket.render() });
});


events.on('order:success', () => {
  appState.setOrderItems();
  const orderToSend = appState.getOrderToSend();
  api.sendOrder(orderToSend)
    .then((result) => {
      const success = new Success(cloneTemplate(successTemplate), {
        onClick: () => {
          modal.close();
          appState.clearBasket();
        }
      }, events);
      modal.render({
        content: success.render({ total: orderToSend.total })
      });
    })
    .catch(err => {
      console.error(err);
    });
});

events.on('formErrors:change', (data: { errors: Partial<IOrderForm> }) => {
	const orderErrors = { address: data.errors.address, payment: data.errors.payment };
	order.valid = !orderErrors.address && !orderErrors.payment;
	order.errors = Object.values(orderErrors).filter(i => !!i).join('; ');

	const contactsErrors = { email: data.errors.email, phone: data.errors.phone };
	contacts.valid = !contactsErrors.email && !contactsErrors.phone;
	contacts.errors = Object.values(contactsErrors).filter(i => !!i).join('; ');
});

events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
	appState.setOrderField(data.field, data.value);
});

events.on('order:step_address', () => {
  modal.render({ content: order.render({ valid: false, errors: [] }) });
});

events.on('order:step_contacts', () => {
  modal.render({ content: contacts.render({ valid: false, errors: [] }) });
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});
