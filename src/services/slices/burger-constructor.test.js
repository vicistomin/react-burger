import { burgerConstructorSlice } from "./burger-constructor";
import configureMockStore from 'redux-mock-store'
import rootReducer from './';
import thunk from 'redux-thunk';

const testBunItem = {
  _id: 123,
  name: "Тестовая булка",
  price: 100
};

const testBunItem2 = {
  _id: 234,
  name: "Тестовая булка 2",
  price: 200
};

const testMiddleItem = {
  _id: 345,
  name: "Тестовый ингредиент 1",
  price: 300
};

const testMiddleItem2 = {
  _id: 456,
  name: "Тестовый ингредиент 2",
  price: 400
};
const testMiddleItem3 = {
  _id: 567,
  name: "Тестовый ингредиент 3",
  price: 500
};

const initStore = {
  bunItem: {},
  middleItems: [],
  totalPrice: 0
}

const storeWithMiddleItem = {
  ...initStore,
  middleItems: [testMiddleItem]
}

const storeWithBun = {
  ...initStore,
  bunItem: testBunItem
}

const {
  addMiddleItem,
  moveMiddleItem,
  deleteMiddleItem,
  clearMiddleItems,
  setBunItem,
  calcTotalPrice
} = burgerConstructorSlice.actions

describe('tests for burgerConstructorSlice reducers', () => {

  const mockStore = configureMockStore({
    reducer: rootReducer,
    middleware: [thunk]
  })
  const store = mockStore(initStore)

  it('should return the initial state', () => {
    expect(burgerConstructorSlice.reducer(undefined, {}))
    .toEqual(initStore)
  })

  it('should add the middle item', () => {
    expect(burgerConstructorSlice.reducer(
      store.getState(),
      addMiddleItem(testMiddleItem)
    )) 
    .toEqual({
      ...initStore,
      middleItems: [testMiddleItem]
    })
  })

  it('should add another middle item', () => {
    expect(burgerConstructorSlice.reducer(
      {
        ...initStore,
        middleItems: [
          testMiddleItem
        ]
      },
      addMiddleItem(testMiddleItem2)
    )) 
    .toEqual({
      ...initStore,
      middleItems: [
        testMiddleItem,
        testMiddleItem2
      ]
    })
  })

  it('should add third middle item', () => {
    expect(burgerConstructorSlice.reducer(
      {
        ...initStore,
        middleItems: [
          testMiddleItem,
          testMiddleItem2
        ]
      },
      addMiddleItem(testMiddleItem3)
    )) 
    .toEqual({
      ...initStore,
      middleItems: [
        testMiddleItem,
        testMiddleItem2,
        testMiddleItem3
      ]
    })
  })

  it('should move first middle item to make it last', () => {
    expect(burgerConstructorSlice.reducer(
      {
        ...initStore,
        middleItems: [
          testMiddleItem,
          testMiddleItem2,
          testMiddleItem3
        ]
      },
      moveMiddleItem(0, 2)
    )) 
    .toEqual({
      ...initStore,
      middleItems: [
        testMiddleItem,
        testMiddleItem2,
        testMiddleItem3
      ]
    })
  })

  it('should clear the middle items', () => {
    expect(burgerConstructorSlice.reducer(
      store.getState(),
      clearMiddleItems()
    )) 
    .toEqual(initStore)
  })

  it('should add the bun', () => {
    expect(burgerConstructorSlice.reducer(
      store.getState(),
      setBunItem(testBunItem)
    ))
    .toEqual({
      ...initStore,
      bunItem: testBunItem
    })
  })

  it('should remove the bun', () => {
    expect(burgerConstructorSlice.reducer(
      store.getState(),
      setBunItem({})
    ))
    .toEqual(initStore)
  })

  it('should calculate the total price', () => {
    expect(burgerConstructorSlice.reducer(
      {
        ...initStore,
        middleItems: [
          testMiddleItem,
          testMiddleItem2
        ]
      },
      calcTotalPrice()
    ))
    .toEqual({
      ...initStore,
      middleItems: [
        testMiddleItem,
        testMiddleItem2
      ],
      totalPrice: 700
    })
  })
})
