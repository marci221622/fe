## Виджеты корзины

Типичный виджет переиспользует компоненты вида

```jsx
  <AddressStub device="mobile" />
  <Recipient device="mobile" />
  <DeliveryDetails checkout={clickCollectCheckout} withEmptyStub />
```

Все эти компоненты работают с одной логикой + чекаут, отличие только в коде для запросов ($temporaryCartCode).
В котором так же находитс яинформация о типы заказа, отсюда можно по моделям сделать реакции с фильтром вида

```js
isClickcolect(checkout)
isQuickbyCheckout(checkout)
```
