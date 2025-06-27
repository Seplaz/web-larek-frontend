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

![UML Схема](/UML.jpg)

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

### Базовые классы

Класс карточки с товаром:

``` TypeScript
class Card {
  // Идентификатор
  protected id: string;

  // Категорию 
  // (например: софт-скил, хард-скил, другое, дополнительное, кнопка)
  protected category: string;

  // Наименование товара в карточке 
  // (например: HEX-леденец, Портативный телепорт)
  protected name: string;

  // Описание товара в карточке
  protected description: string;

  // Ссылка на картинку товара
  protected image: string;

  // Стоимость товара
  protected price: Price;
}
```

Класс контейнера со списком товаров имеет следующие поля и методы:

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

  // Метод для получения сообщения об ошибке валидации
  // Возвращает: string | null (строка с ошибкой, если есть; null — если ошибок нет)
  getValidationError(): string | null;
}
```

Класс для отображения результата успешного заказа:

``` TypeScript
class OrderSuccess {
  // Общая стоимость заказа
  protected totalPrice: number;

  // Метод для установки общей стоимости
  // Возвращает: void (ничего не возвращает)
  setTotalPrice(price: number): void;

  // Метод для получения общей стоимости
  // Возвращает: number (общую стоимость заказа)
  getTotalPrice(): number;
}
```

Главный класс для управления состоянием всего приложения:

``` TypeScript
class AppState {
  // Экземпляры всех классов
  protected cardList: CardList;
  protected basket: Basket;
  protected orderForm: OrderForm;
  protected orderSuccess: OrderSuccess;

  // Методы для работы с каталогом товаров
  // Загружает каталог товаров с сервера
  // Возвращает: Promise<void> (промис, который разрешается после загрузки)
  loadCatalog(): Promise<void>;

  // Получает все товары из каталога
  // Возвращает: ICard[] (массив всех товаров в каталоге)
  getCatalog(): ICard[];

  // Методы для работы с корзиной
  // Добавляет товар в корзину
  // Возвращает: void (ничего не возвращает)
  addToBasket(card: ICard): void;

  // Удаляет товар из корзины по ID
  // Возвращает: void (ничего не возвращает)
  removeFromBasket(id: string): void;

  // Получает все товары в корзине
  // Возвращает: ICard[] (массив всех товаров в корзине)
  getBasketItems(): ICard[];

  // Получает общую стоимость товаров в корзине
  // Возвращает: Price (общую стоимость или null)
  getBasketTotal(): Price;

  // Методы для работы с заказом
  // Обновляет данные формы заказа
  // Возвращает: void (ничего не возвращает)
  updateOrderForm(data: Partial<IOrderForm>): void;

  // Отправляет заказ на сервер
  // Возвращает: Promise<IOrderSuccess> (промис с результатом заказа)
  submitOrder(): Promise<IOrderSuccess>;
}
```

### События приложения

- `CARD_SELECTED` - товар выбран для просмотра
- `CARD_ADDED_TO_BASKET` - товар добавлен в корзину
- `CARD_REMOVED_FROM_BASKET` - товар удален из корзины
- `BASKET_UPDATED` - корзина обновлена
- `ORDER_STEP_COMPLETED` - шаг заказа завершен
- `ORDER_SUBMITTED` - заказ отправлен
- `MODAL_OPENED` - модальное окно открыто
- `MODAL_CLOSED` - модальное окно закрыто

### Интерфейсы для API, событий и представлений

Класс API-клиента для работы с сервером:

``` TypeScript
class Api {
  // Получить список товаров с сервера
  // Возвращает: Promise<ICard[]> (промис с массивом карточек товаров)
  getProducts(): Promise<ICard[]>;

  // Отправить заказ на сервер
  // Принимает: order — объект заказа
  // Возвращает: Promise<IOrderSuccess> (промис с результатом заказа)
  submitOrder(order: IOrderForm): Promise<IOrderSuccess>;
}
```

Класс брокера событий для связи между компонентами:

``` TypeScript
class EventEmitter {
  // Подписка на событие
  // Принимает: event — название события, callback — функция-обработчик (data?: any)
  // Возвращает: void
  on(event: string, callback: (data?: any) => void): void;

  // Отписка от события
  // Принимает: event — название события, callback — функция-обработчик
  // Возвращает: void
  off(event: string, callback: (data?: any) => void): void;

  // Вызов события
  // Принимает: event — название события, data — данные события
  // Возвращает: void
  emit(event: string, data?: any): void;
}
```

Класс представления карточки товара:

``` TypeScript
class CardView {
  // Установить данные карточки
  // Принимает: card — объект карточки
  // Возвращает: void
  setCard(card: ICard): void;

  // Отобразить карточку
  // Возвращает: HTMLElement (DOM-элемент карточки)
  render(): HTMLElement;

  // Подписка на событие "Купить"
  // Принимает: callback — функция-обработчик
  // Возвращает: void
  onBuy(callback: () => void): void;

  // Подписка на событие "Убрать"
  // Принимает: callback — функция-обработчик
  // Возвращает: void
  onRemove(callback: () => void): void;
}
```

Класс представления каталога товаров:

``` TypeScript
class CatalogView {
  // Установить список карточек
  // Принимает: cards — массив карточек
  // Возвращает: void
  setCards(cards: ICard[]): void;

  // Отобразить каталог
  // Возвращает: HTMLElement (DOM-элемент каталога)
  render(): HTMLElement;

  // Подписка на клик по карточке
  // Принимает: callback — функция-обработчик, принимает id карточки
  // Возвращает: void
  onCardClick(callback: (cardId: string) => void): void;
}
```

Класс представление корзины:

``` TypeScript
class BasketView {
  // Установить товары в корзине
  // Принимает: items — массив карточек
  // Возвращает: void
  setItems(items: ICard[]): void;

  // Установить итоговую стоимость
  // Принимает: price — итоговая стоимость
  // Возвращает: void
  setTotalPrice(price: Price): void;

  // Отобразить корзину
  // Возвращает: HTMLElement (DOM-элемент корзины)
  render(): HTMLElement;

  // Подписка на удаление товара
  // Принимает: callback — функция-обработчик, принимает id карточки
  // Возвращает: void
  onRemoveItem(callback: (cardId: string) => void): void;

  // Подписка на оформление заказа
  // Принимает: callback — функция-обработчик
  // Возвращает: void
  onCheckout(callback: () => void): void;
}
```

Класс представления модального окна:

``` TypeScript
class ModalView {
  // Установить содержимое модального окна
  // Принимает: content — DOM-элемент содержимого
  // Возвращает: void
  setContent(content: HTMLElement): void;

  // Показать модальное окно
  // Возвращает: void
  show(): void;

  // Скрыть модальное окно
  // Возвращает: void
  hide(): void;

  // Подписка на закрытие окна
  // Принимает: callback — функция-обработчик
  // Возвращает: void
  onClose(callback: () => void): void;
}
```

Класс представления формы заказа:

``` TypeScript
class OrderFormView {
  // Установить данные формы заказа
  // Принимает: data — объект формы заказа
  // Возвращает: void
  setFormData(data: IOrderForm): void;

  // Отобразить форму
  // Возвращает: HTMLElement (DOM-элемент формы)
  render(): HTMLElement;

  // Подписка на переход к следующему шагу
  // Принимает: callback — функция-обработчик
  // Возвращает: void
  onNextStep(callback: () => void): void;

  // Валидация формы
  // Возвращает: boolean (true, если форма валидна)
  validate(): boolean;
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