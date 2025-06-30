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


## Описание типов и классов

### Базовые типы

Для стоимости товара есть отдельный тип Price, который может быть числом или null
(если цена товара отсутствует, например: бесценно):

``` TypeScript
type Price = number | null;
```

Тип для способа оплаты PaymentMethod, который может принимать два значения:
- `online` - оплата онлайн
- `upon_receipt` - оплата при получении

``` TypeScript
type PaymentMethod = 'online' | 'upon_receipt';
```

Тип для названия события EventName, который может быть строкой или регулярным выражением:
- `string` - точное название события (например: 'product:selected', 'basket:updated')
- `RegExp` - шаблон для подписки на несколько событий (например: /^product:/ для всех событий карточек)

``` TypeScript
type EventName = string | RegExp;
```

### Базовые классы

Класс карточки с товаром:

``` TypeScript
class Product {
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
class ProductList {
  // Массив с карточками
  protected products: IProduct[];

  // Метод для получения всех карточек
  // Возвращает: IProduct[] (массив всех карточек)
  getProducts(): IProduct[];

  // Метод для поиска карточки по ID
  // Возвращает: IProduct | undefined (найденную карточку или undefined, если не найдена)
  getProductById(id: string): IProduct | undefined;
}
```

Класс корзины для управления товарами в заказе:

``` TypeScript
class Basket {
  // Номер позиции в корзине
  protected index: number;

  // Массив товаров в корзине
  protected products: IProduct[];

  // Общая стоимость товаров в корзине
  protected totalPrice: Price;

  // Метод для добавления товара в корзину
  // Возвращает: void (ничего не возвращает)
  addItem(item: IProduct): void;

  // Метод для удаления товара из корзины по ID
  // Возвращает: void (ничего не возвращает)
  removeItem(id: string): void;

  // Метод для получения всех товаров в корзине
  // Возвращает: IProduct[] (массив всех товаров в корзине)
  getItems(): IProduct[];

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
  // Возвращает: Price (общую стоимость заказа)
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

### События приложения

События используются для связи между компонентами через брокер EventEmitter:

- `PRODUCT_SELECTED` - товар выбран для просмотра
- `PRODUCT_ADDED_TO_BASKET` - товар добавлен в корзину
- `PRODUCT_REMOVED_FROM_BASKET` - товар удален из корзины
- `BASKET_UPDATED` - корзина обновлена
- `ORDER_STEP_COMPLETED` - шаг заказа завершен
- `ORDER_SUBMITTED` - заказ отправлен
- `MODAL_OPENED` - модальное окно открыто
- `MODAL_CLOSED` - модальное окно закрыто
