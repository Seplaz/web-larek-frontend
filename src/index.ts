import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { StoreAPI } from './components/StoreAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { Modal } from './components/Modal';
import { ensureElement } from './utils/utils';

const events = new EventEmitter();
const api = new StoreAPI(CDN_URL, API_URL);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})