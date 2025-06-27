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

![UML Схема](/UML.jpg)

## Описание типов и классов

### Базовые типы

Для стоимости товара есть отдельный тип Price, который может быть числом или null
(если цена товара отсутствует, например: бесценно)

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

  // Метод для валидации формы
  // Возвращает: boolean (true, если форма валидна, false - если есть ошибки)
  validate(): boolean;
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