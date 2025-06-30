# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура

Архитектура: MVP (Model-View-Presenter) с брокером событий (EventEmitter) для связи между слоями.

**Принципы архитектуры:**
- **Изолированность** — отдельные части системы могут использоваться как самостоятельные решения
- **Единственная ответственность** — каждый компонент архитектуры решает ровно одну задачу и делает её хорошо
- **Масштабируемость** — возможность расширять функциональность системы без изменения базового кода

**Слои архитектуры:**
- **Model** — управление данными и бизнес-логикой
- **View** — отображение интерфейса пользователя
- **Presenter** — координация между Model и View через брокер событий

## Описание базовых классов

### Класс EventEmitter
Класс EventEmitter обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события, создавать коллбеки-триггеры для генерации событий, подписываться на все события и сбрасывать все обработчики.

### Класс Api
Класс Api обеспечивает взаимодействие с сервером. Его функции: получение списка товаров с сервера и отправка заказа на сервер.

### Класс Component
Класс Component является базовым классом для всех компонентов интерфейса. Его функции: предоставление инструментария для работы с DOM, управление отображением элементов и рендеринг компонентов.

## Описание компонентов

### Компонент Card
Компонент Card отображает информацию о товаре в виде карточки. Использует компонент Button для кнопок "Купить" и "Убрать", компонент Image для отображения изображения товара. Генерирует события CARD_ADDED_TO_BASKET и CARD_REMOVED_FROM_BASKET.

### Компонент Catalog
Компонент Catalog отображает каталог товаров в виде сетки карточек. Использует компонент Card для отображения каждого товара. Генерирует событие CARD_SELECTED при клике на карточку.

### Компонент Basket
Компонент Basket отображает корзину с выбранными товарами. Использует компонент Card для отображения товаров в корзине, компонент Button для кнопки "Оформить заказ". Генерирует события BASKET_UPDATED и ORDER_STEP_COMPLETED.

### Компонент Modal
Компонент Modal отображает модальные окна для различных операций. Может содержать любой произвольный компонент в качестве содержимого. Генерирует события MODAL_OPENED и MODAL_CLOSED.

### Компонент OrderForm
Компонент OrderForm отображает форму заказа с пошаговой валидацией. Использует компонент Button для навигации по шагам, компонент Input для полей ввода. Генерирует события ORDER_STEP_COMPLETED и ORDER_SUBMITTED.

### Компонент OrderSuccess
Компонент OrderSuccess отображает сообщение об успешном оформлении заказа. Использует компонент Button для кнопки "Продолжить покупки". Генерирует событие для возврата к каталогу.

## Описание типов и классов

### Базовые типы

Для стоимости товара есть отдельный тип Price, который может быть числом или null
(если цена товара отсутствует, например: бесценно):

``` TypeScript
type Price = number | null;
```

Тип для способа оплаты PaymentMethod, который может принимать два значения:
- 'online' - оплата онлайн
- 'upon_receipt' - оплата при получении

``` TypeScript
type PaymentMethod = 'online' | 'upon_receipt';
```

Тип для названия события EventName, который может быть строкой или регулярным выражением:
- `string` - точное название события (например: 'card:selected', 'basket:updated')
- `RegExp` - шаблон для подписки на несколько событий (например: /^card:/ для всех событий карточек)

``` TypeScript
type EventName = string | RegExp;
```

### Базовые классы

Класс карточки с товаром:

``` TypeScript
class Card {
  // Идентификатор карточки (товара)
  protected id: string;

  // Ссылка на картинку товара
  protected image: string;

  // Категория
  // (например: софт-скил, хард-скил, другое, дополнительное, кнопка)
  protected category: string;

  // Наименование товара в карточке 
  // (например: HEX-леденец, Портативный телепорт)
  protected title: string;

  // Описание товара в карточке
  protected text: string;

  // Стоимость товара
  protected price: Price;
}
```

Класс контейнера со списком товаров:

``` TypeScript
class CardList {
  // Массив с карточками
  protected cards: ICard[];

  // Метод для получения всех карточек
  // Возвращает: ICard[] (массив всех карточек)
  getCards(): ICard[];

  // Метод для поиска карточки по ID
  // Возвращает: ICard | undefined (найденную карточку или undefined, если не найдена)
  getCardById(id: string): ICard | undefined;
}
```

Класс корзины для управления товарами в заказе:

``` TypeScript
class Basket {
  // Номер позиции в корзине
  protected index: number;

  // Массив товаров в корзине
  protected items: ICard[];

  // Общая стоимость товаров в корзине
  protected totalPrice: Price;

  // Метод для добавления товара в корзину
  // Возвращает: void (ничего не возвращает)
  addItem(item: ICard): void;

  // Метод для удаления товара из корзины по ID
  // Возвращает: void (ничего не возвращает)
  removeItem(id: string): void;

  // Метод для получения всех товаров в корзине
  // Возвращает: ICard[] (массив всех товаров в корзине)
  getItems(): ICard[];

  // Метод для расчета общей стоимости
  // Возвращает: Price (общую стоимость товаров в корзине или null)
  calculateTotal(): Price;

  // Метод для очистки корзины (например после оформления заказа корзина очищается)
  // Возвращает: void (ничего не возвращает)
  clear(): void;

  // Метод для проверки, есть ли товар в корзине (если товар есть, то добавить тот же товар нельзя)
  // Возвращает: boolean (true, если товар есть в корзине, false - если нет)
  hasItem(id: string): boolean;
}
```

Класс для управления формой заказа:

``` TypeScript
class OrderForm {
  // Способ оплаты (онлайн или при получении)
  protected payment: PaymentMethod;

  // Адрес доставки
  protected deliveryAddress: string;

  // Email покупателя
  protected email: string;

  // Телефон покупателя
  protected phone: string;

  // Метод для установки способа оплаты
  // Возвращает: void (ничего не возвращает)
  setPayment(payment: PaymentMethod): void;

  // Метод для установки адреса доставки
  // Возвращает: void (ничего не возвращает)
  setDeliveryAddress(address: string): void;

  // Метод для установки email
  // Возвращает: void (ничего не возвращает)
  setEmail(email: string): void;

  // Метод для установки телефона
  // Возвращает: void (ничего не возвращает)
  setPhone(phone: string): void;

  // Метод для валидации текущего шага формы
  // Возвращает: boolean (true, если текущий шаг формы валиден, false - если есть ошибки)
  validateStep(): boolean;

  // Показать сообщение об ошибке
  // Принимает: message — текст ошибки
  // Возвращает: void
  showError(message: string): void;

  // Скрыть сообщение об ошибке
  // Возвращает: void
  hideError(): void;

  // Метод для валидации конкретного поля формы
  // Принимает: field — название поля для валидации
  // Возвращает: boolean (true, если поле валидно, false - если есть ошибки)
  validateField(field: keyof IOrderForm): boolean;

  // Метод для получения сообщения об ошибке валидации
  // Возвращает: string | null (строка с ошибкой, если есть; null — если ошибок нет)
  getValidationError(): string | null;

  // Метод для получения данных формы
  // Возвращает: IOrderForm (объект с данными формы)
  getFormData(): IOrderForm;
}
```

Класс для отображения результата успешного заказа:

``` TypeScript
class OrderSuccess {
  // Общая стоимость заказа
  protected totalPrice: Price;

  // Метод для установки общей стоимости
  // Возвращает: void (ничего не возвращает)
  setTotalPrice(price: Price): void;

  // Метод для получения общей стоимости
  // Возвращает: number (общую стоимость заказа)
  getTotalPrice(): Price;
}
```

Класс брокера событий для связи между компонентами:

``` TypeScript
class EventEmitter {
  // Подписка на событие
  // Принимает: event — название события, callback — функция-обработчик
  // Возвращает: void
  on<T extends object>(event: EventName, callback: (data: T) => void): void;

  // Отписка от события
  // Принимает: event — название события, callback — функция-обработчик
  // Возвращает: void
  off(event: EventName, callback: (data: any) => void): void;

  // Вызов события
  // Принимает: event — название события, data — данные события
  // Возвращает: void
  emit<T extends object>(event: string, data?: T): void;

  // Создание коллбека-триггера для генерации события
  // Принимает: event — название события, context — контекстные данные
  // Возвращает: функция-триггер, которая при вызове генерирует событие
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;

  // Подписка на все события
  // Принимает: callback — функция-обработчик всех событий
  // Возвращает: void
  onAll(callback: (event: { eventName: string, data: unknown }) => void): void;

  // Сброс всех обработчиков событий
  // Возвращает: void
  offAll(): void;
}
```

Класс базового компонента для всех элементов интерфейса:

``` TypeScript
class Component<T> {
  // Контейнер компонента
  protected readonly container: HTMLElement;

  // Конструктор класса
  // Принимает: container — DOM-элемент контейнера
  protected constructor(container: HTMLElement);

  // Переключить CSS класс элемента
  // Принимает: element — DOM-элемент, className — название класса, force — принудительное состояние
  // Возвращает: void
  toggleClass(element: HTMLElement, className: string, force?: boolean): void;

  // Установить текстовое содержимое элемента
  // Принимает: element — DOM-элемент, value — значение для установки
  // Возвращает: void
  protected setText(element: HTMLElement, value: unknown): void;

  // Сменить статус блокировки элемента
  // Принимает: element — DOM-элемент, state — состояние блокировки
  // Возвращает: void
  setDisabled(element: HTMLElement, state: boolean): void;

  // Скрыть элемент
  // Принимает: element — DOM-элемент
  // Возвращает: void
  protected setHidden(element: HTMLElement): void;

  // Показать элемент
  // Принимает: element — DOM-элемент
  // Возвращает: void
  protected setVisible(element: HTMLElement): void;

  // Установить изображение с альтернативным текстом
  // Принимает: element — элемент изображения, src — источник, alt — альтернативный текст
  // Возвращает: void
  protected setImage(element: HTMLImageElement, src: string, alt?: string): void;

  // Отобразить компонент
  // Принимает: data — данные для рендеринга
  // Возвращает: HTMLElement (DOM-элемент компонента)
  render(data?: Partial<T>): HTMLElement;
}
```

### События приложения

События используются для связи между компонентами через брокер EventEmitter:

- `CARD_SELECTED` - товар выбран для просмотра (данные: ICardSelectedEvent)
- `CARD_ADDED_TO_BASKET` - товар добавлен в корзину (данные: ICardBasketEvent)
- `CARD_REMOVED_FROM_BASKET` - товар удален из корзины (данные: ICardBasketEvent)
- `BASKET_UPDATED` - корзина обновлена (данные: IBasketUpdatedEvent)
- `ORDER_STEP_COMPLETED` - шаг заказа завершен (данные: IOrderStepEvent)
- `ORDER_SUBMITTED` - заказ отправлен (данные: IOrderSubmittedEvent)
- `MODAL_OPENED` - модальное окно открыто (данные: IModalEvent)
- `MODAL_CLOSED` - модальное окно закрыто (данные: IModalEvent)


### Интерфейсы событий

``` TypeScript
// Событие выбора карточки товара
interface ICardSelectedEvent {
  cardId: string;
}

// Событие добавления/удаления товара из корзины
interface ICardBasketEvent {
  card: ICard;
}

// Событие обновления корзины
interface IBasketUpdatedEvent {
  items: ICard[];
  totalPrice: Price;
}

// Событие завершения шага заказа
interface IOrderStepEvent {
  step: number;
  isValid: boolean;
}

// Событие отправки заказа
interface IOrderSubmittedEvent {
  order: IOrderForm;
  result: IOrderSuccess;
}

// Событие модального окна
interface IModalEvent {
  content: HTMLElement;
}
```

Класс API-клиента для работы с сервером:

``` TypeScript
class Api {
  // Базовый URL для API запросов
  readonly baseUrl: string;

  // Опции для HTTP запросов
  protected options: RequestInit;

  // Конструктор класса
  // Принимает: baseUrl — базовый URL API, options — опции запросов
  constructor(baseUrl: string, options: RequestInit = {});

  // Получить список товаров с сервера
  // Возвращает: Promise<ICard[]> (промис с массивом карточек товаров)
  getProducts(): Promise<ICard[]>;

  // Отправить заказ на сервер
  // Принимает: order — объект заказа
  // Возвращает: Promise<IOrderSuccess> (промис с результатом заказа)
  submitOrder(order: IOrderForm): Promise<IOrderSuccess>;

  // Выполнить GET запрос
  // Принимает: uri — путь запроса
  // Возвращает: Promise<object> (промис с ответом сервера)
  get(uri: string): Promise<object>;

  // Выполнить POST запрос
  // Принимает: uri — путь запроса, data — данные для отправки, method — метод HTTP
  // Возвращает: Promise<object> (промис с ответом сервера)
  post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>;
}
```

Класс представления успешного заказа:

``` TypeScript
class OrderSuccessView {
  // Установить итоговую стоимость
  // Принимает: price — итоговая стоимость
  // Возвращает: void
  setTotalPrice(price: number): void;

  // Отобразить сообщение об успехе
  // Возвращает: HTMLElement (DOM-элемент сообщения)
  render(): HTMLElement;

  // Подписка на продолжение покупок
  // Принимает: callback — функция-обработчик
  // Возвращает: void
  onContinueShopping(callback: () => void): void;
}
```

### Интерфейсы представлений

``` TypeScript
// Базовый интерфейс для всех представлений
interface IView {
  render(): HTMLElement;
}

// Интерфейс представления карточки товара
interface ICardView extends IView {
  setCard(card: ICard): void;
  onBuy(callback: () => void): void;
  onRemove(callback: () => void): void;
}

// Интерфейс представления каталога товаров
interface ICatalogView extends IView {
  setCards(cards: ICard[]): void;
  onCardClick(callback: (cardId: string) => void): void;
}

// Интерфейс представления корзины
interface IBasketView extends IView {
  setItems(items: ICard[]): void;
  setTotalPrice(price: Price): void;
  onRemoveItem(callback: (cardId: string) => void): void;
  onCheckout(callback: () => void): void;
}

// Интерфейс представления модального окна
interface IModalView extends IView {
  setContent(content: HTMLElement): void;
  show(): void;
  hide(): void;
  onClose(callback: () => void): void;
}

// Интерфейс представления формы заказа
interface IOrderFormView extends IView {
  setFormData(data: IOrderForm): void;
  onNextStep(callback: () => void): void;
  validate(): boolean;
  showError(message: string): void;
  hideError(): void;
}

// Интерфейс представления успешного заказа
interface IOrderSuccessView extends IView {
  setTotalPrice(price: number): void;
  onContinueShopping(callback: () => void): void;
}
```

### Интерфейсы моделей данных

``` TypeScript
// Интерфейс модели каталога товаров
interface ICardModel {
  getCards(): ICard[];
  getCardById(id: string): ICard | undefined;
}

// Интерфейс модели корзины
interface IBasketModel {
  addItem(item: ICard): void;
  removeItem(id: string): void;
  getItems(): ICard[];
  calculateTotal(): Price;
  clear(): void;
  hasItem(id: string): boolean;
  getIndex(): number;
}

// Интерфейс модели формы заказа
interface IOrderFormModel {
  setPayment(payment: PaymentMethod): void;
  setDeliveryAddress(address: string): void;
  setEmail(email: string): void;
  setPhone(phone: string): void;
  validateStep(): boolean;
  validateField(field: keyof IOrderForm): boolean;
  getValidationError(): string | null;
  getFormData(): IOrderForm;
}

// Интерфейс модели успешного заказа
interface IOrderSuccessModel {
  setTotalPrice(price: number): void;
  getTotalPrice(): number;
}
```