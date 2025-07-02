# Проектная работа "Веб-ларек"

## Описание проекта

Проект интернет-магазин с товарами для веб-разработчиков — Web-ларёк. В нём можно посмотреть каталог товаров, добавить товары в корзину и сделать заказ.

**Стек:** `HTML`, `SCSS`, `TS`, `Webpack`

## Функциональные требования

Эти требования описывают принцип работы интернет-магазина. Учитывайте их в своём проекте.

### 1. Главная страница:
- содержит каталог товаров;
- при нажатии на карточку товара открывается модальное окно с детальной информацией о товаре;
- при нажатии на иконку корзины открывается корзина.

### 2. Просмотр товара:
- показана детальная информация о товаре;
- при нажатии на кнопку «Купить» товар добавляется в корзину, если не был добавлен в корзину раньше;
- при нажатии на кнопку «Убрать» товар удаляется из корзины.

### 3. Оформление товара:

**Первый шаг:**
- выбор способа оплаты;
- ввод адреса доставки;
- если адрес доставки не введён, появляется сообщение об ошибке.

**Второй шаг:**
- ввод почты и телефона покупателя;
- если одно из полей не заполнено, появляется сообщение об ошибке;
- при нажатии на кнопку оплаты появляется сообщение об успешной оплате и товары удаляются из корзины.

### Требования ко всем страницам:
Модальные окна закрываются:
- по клику вне модального окна;
- по клику на иконку «Закрыть» (крестик).

Кнопка перехода к следующему шагу становится доступна только после выполнения действий на текущей странице (выбора товара, способа оплаты, заполнения данных о покупателе).

## Структура проекта

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

**Важные файлы:**
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

Архитектура: MVP (Model-View-Presenter) с брокером событий `EventEmitter` для связи между слоями.

### Принципы архитектуры:
- **Изолированность** — отдельные части системы могут использоваться как самостоятельные решения
- **Единственная ответственность** — каждый компонент архитектуры решает ровно одну задачу и делает её хорошо
- **Масштабируемость** — возможность расширять функциональность системы без изменения базового кода

### Слои архитектуры:
- **Model** — управление данными и бизнес-логикой
- **View** — отображение интерфейса пользователя
- **Presenter** — координация между Model и View через брокер событий

### Из каких основных частей состоит архитектура проекта:

1. **Данные (Model):**
   - `Product` — модель товара
   - `ProductList` — коллекция товаров
   - `Basket` — корзина покупок
   - `UserData` — данные пользователя
   - `OrderForm` — форма заказа

2. **Отображения (View):**
   - `PageView` — начальная страница приложения
   - `ProductCard` — карточка товара
   - `ProductModal` — модальное окно товара
   - `BasketModal` — модальное окно корзины
   - `BasketItem` — отдельный товар в корзине
   - `OrderDeliveryView` — первый шаг оформления заказа (доставка и оплата)
   - `OrderContactsView` — второй шаг оформления заказа (контактные данные)
   - `OrderSuccess` — страница успешного заказа

3. **Координаторы (Presenter):**
   - `ProductPresenter` — управление отображением товаров
   - `BasketPresenter` — управление корзиной
   - `OrderPresenter` — управление процессом заказа

4. **Брокер событий (EventEmitter):**
   - Обеспечивает связь между компонентами через события
   - Позволяет компонентам взаимодействовать без прямых зависимостей

### Как части взаимодействуют:
- `Presenter` получает данные от `Model`
- `Presenter` обновляет `View`
- `View` отправляет события через `EventEmitter`
- `Presenter` обрабатывает события и обновляет `Model`
- `Model` уведомляет об изменениях через события

### Какие данные используются в приложении:
- **Товары (Product):** id, image, category, title, description, price
- **Корзина (Basket):** список товаров, общая стоимость
- **Пользователь (UserData):** адрес доставки, email, телефон
- **Заказ (OrderForm):** данные пользователя + способ оплаты + стоимость

### Из каких компонентов состоит приложение:
- **PageView** — отвечает за отображение начальной страницы приложения
- **ProductCard** — отображает карточку товара в каталоге
- **ProductModal** — показывает детальную информацию о товаре
- **BasketModal** — отображает корзину покупок
- **BasketItem** — отображает отдельный товар в корзине
- **OrderDeliveryView** — первый шаг оформления заказа (доставка и оплата)
- **OrderContactsView** — второй шаг оформления заказа (контактные данные)
- **OrderForm** — форма оформления заказа с двумя шагами
- **OrderSuccess** — страница успешного заказа
- **Modal** — базовый компонент для модальных окон
- **Button** — переиспользуемая кнопка
- **Form** — базовый компонент формы

## Описание компонентов

### Компонент PageView
Компонент `PageView` отвечает за отображение начальной страницы приложения. В нем отображается список карточек товаров (каталог), а также присутствует кнопка для открытия корзины и счетчик количества товаров в корзине. Компонент управляет структурой главной страницы и взаимодействием пользователя с основными элементами интерфейса.

### Компонент ProductCard
Компонент `ProductCard` отображает карточку товара в каталоге. При клике на карточку открывается модальное окно с детальной информацией о товаре.

### Компонент ProductModal
Компонент `ProductModal` отображает детальную информацию о товаре в модальном окне, используя базовый компонент `Modal`. Содержит кнопки "Купить" и "Недоступно" для добавления товара в корзину.

### Компонент BasketModal
Компонент `BasketModal` отображает корзину покупок в модальном окне, используя базовый компонент `Modal`. Показывает список товаров, общую стоимость и кнопку перехода к оформлению заказа.

### Компонент BasketItem
Компонент `BasketItem` отвечает за отображение отдельного товара в корзине. Показывает информацию о товаре (индекс, наименование и цена), а также кнопку для удаления товара из корзины.

### Компонент OrderDeliveryView
Компонент `OrderDeliveryView` отвечает за отображение первого шага оформления заказа: выбор способа оплаты и ввод адреса доставки. Содержит выбор способа оплаты и поле для ввода адреса, а также кнопку перехода к следующему шагу. Кнопка становится недоступной, если не выбран способ оплаты или не введён адрес доставки.

### Компонент OrderContactsView
Компонент `OrderContactsView` отвечает за отображение второго шага оформления заказа: ввод контактных данных пользователя (email и телефон). Содержит соответствующие поля и кнопку для завершения оформления заказа. Кнопка становится недоступной, если не заполнены контактные данные пользователя.

### Компонент OrderForm
Компонент `OrderForm` управляет процессом оформления заказа с двумя шагами, используя базовый компонент `Form`. На первом шаге собирает способ оплаты и адрес доставки, на втором — контактные данные покупателя (email и номер телефона). На первом шаге содержит кнопку "Далее", на вотором шаге кнопку "Оплатить". Обе кнопки становятся недоступны, если не выбран способ оплаты, не введен адрес доставки или не заполнены контактные данные пользователя.

### Компонент OrderSuccess
Компонент `OrderSuccess` отображает страницу успешного заказа с информацией о стоимости заказа и кнопкой "За новыми покупками!".

### Компонент Modal
Компонент `Modal` обеспечивает базовую функциональность модальных окон. Его функции: открытие и закрытие окна, обработка кликов вне окна, управление фокусом.

### Компонент Button
Компонент `Button` обеспечивает отображение кнопок в интерфейсе. Его функции: настройка внешнего вида, обработка кликов, управление состоянием (активна/неактивна).

### Компонент Form
Компонент `Form` обеспечивает базовую функциональность форм. Его функции: валидация полей, сбор данных, отображение ошибок.

## Описание типов и классов

### Базовые типы

Для стоимости товара есть отдельный тип `TPrice`, который может быть `number` или `null`
(если цена товара отсутствует, например: бесценно):

``` TypeScript
type TPrice = number | null;
```

Тип для способа оплаты `TPaymentMethod`, который может принимать два значения:
- `online` - оплата онлайн
- `upon_receipt` - оплата при получении

``` TypeScript
type TPaymentMethod = 'online' | 'upon_receipt';
```

Тип для HTTP-метода запроса `TApiMethod`, который может принимать следующие значения:
- `GET` — получить данные
- `POST` — создать данные
- `PUT` — полностью обновить данные
- `PATCH` — частично обновить данные
- `DELETE` — удалить данные

``` TypeScript
type TApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
```

Тип для имени события `TEventName`, который может быть строкой или регулярным выражением:

```TypeScript
type TEventName = string | RegExp;
```

### Базовые классы

Класс `Product` — модель товара:

```TypeScript
class Product {
  /**
   * Конструктор класса Product
   * @param id — идентификатор товара
   * @param image — ссылка на картинку товара
   * @param category — категория товара
   * @param title — наименование товара
   * @param description — описание товара
   * @param price — стоимость товара
   */
  constructor(
    public id: string,
    public image: string,
    public category: string,
    public title: string,
    public description: string,
    public price: TPrice
  ) {}
}
```

Класс `ProductList` — коллекция товаров:

```TypeScript
class ProductList {
  /**
   * Массив товаров
   */
  products: Product[];

  /**
   * Конструктор класса ProductList
   * @param products — массив товаров (по умолчанию пустой)
   */
  constructor(products: Product[] = []);

  /**
   * Устанавливает список товаров
   * @param items — массив товаров для установки
   */
  setItems(items: Product[]): void;
}
```

Класс `Basket` — корзина покупок:

```TypeScript
class Basket {
  /**
   * Индекс товара в корзине
   */
  index: number;
  /**
   * Массив товаров в корзине
   */
  products: Product[];
  /**
   * Общая стоимость товаров
   */
  totalPrice: TPrice;

  /**
   * Конструктор класса Basket
   * @param products — массив товаров (по умолчанию пустой)
   */
  constructor(products: Product[] = []);

  /**
   * Добавляет товар в корзину
   * @param product — товар для добавления
   */
  addItem(product: Product): void;

  /**
   * Удаляет товар из корзины по id
   * @param id — идентификатор товара
   */
  removeItem(id: string): void;

  /**
   * Очищает корзину
   */
  clear(): void;

  /**
   * Вычисляет общую стоимость товаров
   * @returns общая стоимость (TPrice)
   */
  calculateTotalPrice(): TPrice;

  /**
   * Получает товар по id
   * @param id — идентификатор товара
   * @returns найденный товар или undefined
   */
  getItemById(id: string): Product | undefined;

  /**
   * Проверяет, есть ли товар в корзине
   * @param id — идентификатор товара
   * @returns true, если товар найден
   */
  contains(id: string): boolean;
}
```

Класс `OrderForm` — форма заказа:

```TypeScript
class OrderForm implements IUserData {
  /**
   * Способ оплаты
   */
  payment: TPaymentMethod;
  /**
   * Адрес доставки
   */
  deliveryAddress: string;
  /**
   * Email покупателя
   */
  email: string;
  /**
   * Телефон покупателя
   */
  phone: string;
  /**
   * Общая стоимость заказа
   */
  totalPrice: TPrice;

  /**
   * Конструктор класса OrderForm
   * @param payment — способ оплаты
   * @param deliveryAddress — адрес доставки
   * @param email — email покупателя
   * @param phone — телефон покупателя
   * @param totalPrice — общая стоимость заказа
   */
  constructor(payment: TPaymentMethod, deliveryAddress: string, email: string, phone: string, totalPrice: TPrice);

  /**
   * Устанавливает способ оплаты
   * @param method — способ оплаты
   */
  setPayment(method: TPaymentMethod): void;

  /**
   * Устанавливает адрес доставки
   * @param address — адрес доставки
   */
  setDeliveryAddress(address: string): void;

  /**
   * Устанавливает email покупателя
   * @param email — email
   */
  setEmail(email: string): void;

  /**
   * Устанавливает телефон покупателя
   * @param phone — телефон
   */
  setPhone(phone: string): void;

  /**
   * Устанавливает общую стоимость заказа
   * @param price — стоимость заказа
   */
  setTotalPrice(price: TPrice): void;

  /**
   * Проверяет валидность всей формы
   * @returns true, если форма валидна
   */
  validate(): boolean;

  /**
   * Проверяет валидность текущего шага
   * @returns true, если шаг валиден
   */
  validateStep(): boolean;

  /**
   * Проверяет валидность поля
   * @param field — название поля
   * @returns true, если поле валидно
   */
  validateField(field: keyof OrderForm): boolean;

  /**
   * Получает сообщение об ошибке валидации
   * @returns строка с ошибкой или null
   */
  getValidationError(): string | null;

  /**
   * Показать сообщение об ошибке
   * @param message — текст ошибки
   */
  showError(message: string): void;

  /**
   * Скрыть сообщение об ошибке
   */
  hideError(): void;

  /**
   * Получает данные формы
   * @returns объект с данными формы
   */
  getData(): OrderForm;

  /**
   * Очищает форму
   */
  clear(): void;
}
```

Класс `ApiResponse` — универсальный клиент для работы с API:

```TypeScript
class ApiResponse<T> {
  /**
   * Базовый URL для всех запросов
   */
  baseUrl: string;

  /**
   * Конструктор класса ApiResponse
   * @param baseUrl — базовый URL
   */
  constructor(baseUrl: string);

  /**
   * Выполняет GET-запрос
   * @param uri — адрес запроса
   * @param method — HTTP-метод (по умолчанию 'GET')
   * @returns промис с результатом
   */
  get<T>(uri: string, method?: TApiMethod): Promise<T>;

  /**
   * Выполняет POST-запрос
   * @param uri — адрес запроса
   * @param data — данные для отправки
   * @param method — HTTP-метод (по умолчанию 'POST')
   * @returns промис с результатом
   */
  post<T>(uri: string, data: object, method?: TApiMethod): Promise<T>;
}
```

Класс `View` — базовый класс для всех представлений:

```TypeScript
class View {
  /**
   * Конструктор класса View
   */
  constructor();

  /**
   * Отображает данные во View
   * @param data — данные для отображения (опционально)
   */
  render(data?: unknown): void;

  /**
   * Показывает View
   */
  show(): void;

  /**
   * Скрывает View
   */
  hide(): void;
}
```

Класс `PageView` — представление начальной страницы:

```TypeScript
class PageView extends View {
  /**
   * Конструктор класса PageView
   */
  constructor();

  /**
   * Отображает список товаров на странице
   * @param products — массив товаров
   */
  renderProductList(products: Product[]): void;

  /**
   * Устанавливает обработчик открытия корзины
   * @param callback — функция, вызываемая при клике на кнопку корзины
   */
  onBasketOpen(callback: () => void): void;

  /**
   * Отображает счетчик товаров в корзине
   * @param count — количество товаров
   */
  renderBasketCounter(count: number): void;
}
```

Класс `ProductCardView` — представление карточки товара:

```TypeScript
class ProductCardView extends View {
  /**
   * Конструктор класса ProductCardView
   */
  constructor();

  /**
   * Устанавливает обработчик клика по карточке
   * @param callback — функция, вызываемая при выборе товара (id товара)
   */
  onSelect(callback: (id: string) => void): void;
}
```

Класс `ProductModalView` — представление модального окна товара:

```TypeScript
class ProductModalView extends View {
  /**
   * Конструктор класса ProductModalView
   */
  constructor();

  /**
   * Устанавливает обработчик добавления товара в корзину
   * @param callback — функция, вызываемая при добавлении товара (id товара)
   */
  onBuy(callback: (id: string) => void): void;
}
```

Класс `BasketModalView` — представление модального окна корзины:

```TypeScript
class BasketModalView extends View {
  /**
   * Конструктор класса BasketModalView
   */
  constructor();

  /**
   * Устанавливает обработчик удаления товара из корзины
   * @param callback — функция, вызываемая при удалении товара (id товара)
   */
  onRemoveItem(callback: (id: string) => void): void;

  /**
   * Устанавливает обработчик перехода к оформлению заказа
   * @param callback — функция, вызываемая при переходе к оформлению
   */
  onCheckout(callback: () => void): void;
}
```

Класс `BasketItemView` — представление отдельного товара в корзине:

```TypeScript
class BasketItemView extends View {
  /**
   * Конструктор класса BasketItemView
   * @param index — индекс товара в корзине
   * @param product — товар
   */
  constructor(index: number, product: Product);

  /**
   * Устанавливает обработчик удаления товара
   * @param callback — функция, вызываемая при удалении
   */
  onRemove(callback: () => void): void;
}
```

Класс `OrderDeliveryView` — первый шаг оформления заказа:

```TypeScript
class OrderDeliveryView extends View {
  /**
   * Конструктор класса OrderDeliveryView
   */
  constructor();

  /**
   * Устанавливает обработчик перехода к следующему шагу
   * @param callback — функция, вызываемая при переходе (данные доставки)
   */
  onNext(callback: (data: { payment: TPaymentMethod; deliveryAddress: string }) => void): void;
}
```

Класс `OrderContactsView` — второй шаг оформления заказа:

```TypeScript
class OrderContactsView extends View {
  /**
   * Конструктор класса OrderContactsView
   */
  constructor();

  /**
   * Устанавливает обработчик отправки контактных данных
   * @param callback — функция, вызываемая при отправке (email и телефон)
   */
  onSubmit(callback: (data: { email: string; phone: string }) => void): void;
}
```

Класс `OrderSuccessView` — страница успешного заказа:

```TypeScript
class OrderSuccessView extends View {
  /**
   * Конструктор класса OrderSuccessView
   */
  constructor();

  /**
   * Отображает информацию об успешном заказе
   * @param totalPrice — стоимость заказа
   */
  render(totalPrice: TPrice): void;
}
```

Класс `Presenter` — базовый класс для всех презентеров:

```TypeScript
class Presenter {
  /**
   * Конструктор класса Presenter
   */
  constructor();

  /**
   * Инициализация презентера
   */
  init(): void;

  /**
   * Уничтожение презентера
   */
  destroy(): void;
}
```

Класс `ProductPresenter` — презентер для каталога товаров:

```TypeScript
class ProductPresenter extends Presenter {
  /**
   * Конструктор класса ProductPresenter
   * @param view — представление каталога
   * @param model — модель списка товаров
   */
  constructor(view: ProductView, model: ProductList);
}
```

Класс `BasketPresenter` — презентер для корзины:

```TypeScript
class BasketPresenter extends Presenter {
  /**
   * Конструктор класса BasketPresenter
   * @param view — представление корзины
   * @param model — модель корзины
   */
  constructor(view: BasketView, model: Basket);
}
```

Класс `OrderPresenter` — презентер для оформления заказа:

```TypeScript
class OrderPresenter extends Presenter {
  /**
   * Конструктор класса OrderPresenter
   * @param deliveryView — представление первого шага
   * @param contactsView — представление второго шага
   * @param model — модель заказа
   */
  constructor(deliveryView: OrderDeliveryView, contactsView: OrderContactsView, model: OrderForm);
}
```

Класс `EventEmitter` — брокер событий для взаимодействия между компонентами:

```TypeScript
class EventEmitter {
  /**
   * Конструктор класса EventEmitter
   */
  constructor();

  /**
   * Подписка на событие
   * @param event — имя события (строка или RegExp)
   * @param callback — функция-обработчик
   */
  on<T extends object>(event: TEventName, callback: (data: T) => void): void;

  /**
   * Вызов события
   * @param event — имя события
   * @param data — данные события (опционально)
   */
  emit<T extends object>(event: string, data?: T): void;

  /**
   * Генерирует функцию-триггер для события
   * @param event — имя события
   * @param context — контекст (опционально)
   * @returns функция, которую можно вызывать с данными события
   */
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

### Перечисление событий

Перечисление `Events` содержит все основные события, которые используются для взаимодействия между компонентами приложения через `EventEmitter`:

```TypeScript
enum Events {
  PRODUCTS_LOADED = 'products:loaded',                // Товары загружены
  PRODUCT_SELECTED = 'product:selected',              // Товар выбран

  PRODUCT_ADDED_TO_BASKET = 'product:added_to_basket',// Товар добавлен в корзину
  PRODUCT_REMOVED_FROM_BASKET = 'product:removed_from_basket', // Товар удалён из корзины

  BASKET_OPENED = 'basket:opened',                    // Корзина открыта
  BASKET_UPDATED = 'basket:updated',                  // Корзина обновлена
  BASKET_CLOSED = 'basket:closed',                    // Корзина закрыта

  ORDER_STEP_COMPLETED = 'order:step_completed',      // Шаг оформления заказа завершён
  ORDER_SUBMITTED = 'order:submitted',                // Заказ отправлен
  ORDER_SUCCESS = 'order:success',                    // Заказ успешно оформлен
  ORDER_ERROR = 'order:error',                        // Ошибка при оформлении заказа

  MODAL_OPENED = 'modal:opened',                      // Модальное окно открыто
  MODAL_CLOSED = 'modal:closed'                       // Модальное окно закрыто
}
```

**Назначение:**  
Это перечисление используется для стандартизации событий, которые могут возникать в приложении, чтобы компоненты могли реагировать на них через брокер событий `EventEmitter`.  
Каждое событие — это строковая константа, которую удобно использовать для подписки и публикации событий между слоями приложения.