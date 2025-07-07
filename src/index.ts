import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { Modal } from './components/Modal';
import { ensureElement } from './utils/utils';
import { Page } from './components/Page';

const events = new EventEmitter();

const page = new Page(ensureElement<HTMLElement>('.page'), events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

events.on('modal:close', () => {
  modal.close();
});
