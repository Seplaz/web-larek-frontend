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

Для стоимости товара есть отдельный тип `Price`, который может быть `number` или `null`
(если цена товара отсутствует, например: бесценно):

``` TypeScript
type Price = number | null;
```

Тип для способа оплаты `PaymentMethod`, который может принимать два значения:
- `online` - оплата онлайн
- `upon_receipt` - оплата при получении

``` TypeScript
type PaymentMethod = 'online' | 'upon_receipt';
```

Тип для названия события `EventName`, который может быть строкой или регулярным выражением:
- `string` - точное название события (например: `product:selected`, `basket:updated`)
- `RegExp` - шаблон для подписки на несколько событий (например: `/^product:/` для всех событий карточек)

``` TypeScript
type EventName = string | RegExp;
```

### Базовые классы

Класс `Product` это сам товар:

``` TypeScript
class IProduct {
  // Идентификатор товара
  id: string;

  // Ссылка на картинку товара
  image: string;

  // Категория товара
  category: string;

  // Наименование товара
  title: string;

  // Описание товара
  description: string;

  // Стоимость товара
  price: Price;
}
```

Класс `ProductList` это список товаров на странице:

``` TypeScript
class ProductList {
  // Массив со списком товаров
  products: IProduct[];

  // Устанавливает список товаров после загрузки из API
  // Принимает: items — массив товаров для установки
  // Возвращает: void
  setItems(items: IProduct[]): void;

  // Получает товар по идентификатору
  // Принимает: id — уникальный идентификатор товара
  // Возвращает: IProduct — найденный товар или undefined, если товар не найден
  getItemById(id: string): IProduct | undefined;
}
```

Класс `Basket` является корзиной с товарами:

``` TypeScript
class Basket {
  // Индекс товара в корзине (1, 2, 3...)
  index: number;

  // Массив с товарами в корзине
  products: IProduct[];

  // Общая стоимость товаров
  totalPrice: Price;

  // Добавляет товар в корзину
  // Принимает: product — товар для добавления в корзину
  // Возвращает: void
  addItem(product: IProduct): void;

  // Удаляет товар из корзины по идентификатору
  // Принимает: id — уникальный идентификатор товара для удаления
  // Возвращает: void
  removeItem(id: string): void;

  // Очищает корзину от всех товаров
  // Возвращает: void
  clear(): void;

  // Вычисляет общую стоимость товаров в корзине
  // Возвращает: Price — общая стоимость всех товаров в корзине (number или null)
  calculateTotalPrice(): Price;

  // Получает товар по идентификатору
  // Принимает: id — уникальный идентификатор товара
  // Возвращает: IProduct | undefined — найденный товар или undefined, если товар не найден
  getItemById(id: string): IProduct | undefined;

  // Проверяет, есть ли товар в корзине
  // Принимает: id — уникальный идентификатор товара для проверки
  // Возвращает: boolean — true, если товар найден в корзине, false — если нет
  contains(id: string): boolean;
}
```

Класс `OrderForm` представляет форму заказа:

``` TypeScript
class OrderForm {
  // Способ оплаты (онлайн или при получении)
  payment: PaymentMethod;

  // Адрес доставки
  deliveryAddress: string;

  // Email покупателя
  email: string;

  // Телефон покупателя
  phone: string;

  // Общая стоимость заказа
  totalPrice: Price;

  // Устанавливает способ оплаты
  // Принимает: method — способ оплаты ('online' или 'upon_receipt')
  // Возвращает: void
  setPayment(method: PaymentMethod): void;

  // Устанавливает адрес доставки
  // Принимает: address — строка с адресом доставки
  // Возвращает: void
  setDeliveryAddress(address: string): void;

  // Устанавливает email покупателя
  // Принимает: email — строка с email адресом
  // Возвращает: void
  setEmail(email: string): void;

  // Устанавливает телефон покупателя
  // Принимает: phone — строка с номером телефона
  // Возвращает: void
  setPhone(phone: string): void;

  // Устанавливает общую стоимость заказа
  // Принимает: price — стоимость заказа (number или null)
  // Возвращает: void
  setTotalPrice(price: Price): void;

  // Проверяет валидность всей формы заказа
  // Возвращает: boolean — true, если все поля формы валидны, false — если есть ошибки
  validate(): boolean;

  // Метод для валидации текущего шага формы
  // Возвращает: boolean (true, если текущий шаг формы валиден, false - если есть ошибки)
  validateStep(): boolean;

  // Метод для валидации конкретного поля формы
  // Принимает: field — название поля для валидации
  // Возвращает: boolean (true, если поле валидно, false - если есть ошибки)
  validateField(field: keyof IOrderForm): boolean;

  // Метод для получения сообщения об ошибке валидации
  // Возвращает: string | null (строка с ошибкой, если есть; null — если ошибок нет)
  getValidationError(): string | null;

  // Показать сообщение об ошибке
  // Принимает: message — текст ошибки
  // Возвращает: void
  showError(message: string): void;

  // Скрыть сообщение об ошибке
  // Возвращает: void
  hideError(): void;

  // Получает данные формы в виде объекта
  // Возвращает: IOrderForm — объект с данными формы заказа
  getData(): IOrderForm;

  // Очищает форму заказа, сбрасывая все поля в начальное состояние
  // Возвращает: void
  clear(): void;
}
```

Класс `EventEmitter` является брокером событий для связи между компонентами:

``` TypeScript
class EventEmitter {
  // Карта событий и их обработчиков
  _events: Map<EventName, Set<Subscriber>>;

  // Устанавливает обработчик на событие
  // Принимает: eventName — название события (строка или RegExp), callback — функция-обработчик
  // Возвращает: void
  on<T extends object>(eventName: EventName, callback: (data: T) => void): void;

  // Снимает обработчик с события
  // Принимает: eventName — название события, callback — функция-обработчик для удаления
  // Возвращает: void
  off(eventName: EventName, callback: (data: unknown) => void): void;

  // Инициирует событие с данными
  // Принимает: eventName — название события, data — данные для передачи в обработчик
  // Возвращает: void
  emit<T extends object>(eventName: string, data?: T): void;

  // Создает триггер для события с контекстом
  // Принимает: eventName — название события, context — контекстные данные
  // Возвращает: Function — функцию-триггер, которая при вызове генерирует событие
  trigger<T extends object>(eventName: string, context?: Partial<T>): (data: T) => void;

  // Устанавливает обработчик на все события
  // Принимает: callback — функция-обработчик для всех событий
  // Возвращает: void
  onAll(callback: (event: { eventName: string, data: unknown }) => void): void;

  // Сбрасывает все обработчики событий
  // Возвращает: void
  offAll(): void;
}
```

## События (Events)

В системе используется брокер событий для связи между компонентами архитектуры MVP. События позволяют компонентам общаться друг с другом без прямых зависимостей.

### Основные события

#### События товаров (Product Events)
``` TypeScript
// Товар выбран пользователем
'product:selected' — событие выбора товара
// Данные: { product: IProduct }

// Товар добавлен в корзину
'product:added' — событие добавления товара в корзину
// Данные: { product: IProduct }

// Товар удален из корзины
'product:removed' — событие удаления товара из корзины
// Данные: { productId: string }
```

#### События корзины (Basket Events)
``` TypeScript
// Корзина обновлена
'basket:updated' — событие обновления корзины
// Данные: { basket: IBasket }

// Корзина очищена
'basket:cleared' — событие очистки корзины
// Данные: { }

// Изменено количество товаров в корзине
'basket:itemCountChanged' — событие изменения количества товаров
// Данные: { itemCount: number }
```

#### События заказа (Order Events)
``` TypeScript
// Форма заказа отправлена
'order:submitted' — событие отправки формы заказа
// Данные: { order: IOrderForm }

// Заказ успешно создан
'order:success' — событие успешного создания заказа
// Данные: { orderId: string, order: IOrderForm }

// Ошибка при создании заказа
'order:error' — событие ошибки при создании заказа
// Данные: { error: string }
```

#### События модальных окон (Modal Events)
``` TypeScript
// Модальное окно открыто
'modal:opened' — событие открытия модального окна
// Данные: { modalId: string }

// Модальное окно закрыто
'modal:closed' — событие закрытия модального окна
// Данные: { modalId: string }
```

#### События валидации (Validation Events)
``` TypeScript
// Ошибка валидации
'validation:error' — событие ошибки валидации
// Данные: { field: string, message: string }

// Успешная валидация
'validation:success' — событие успешной валидации
// Данные: { field: string }
```
