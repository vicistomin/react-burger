import { burgerConstructorSlice } from "./burger-constructor";
import configureMockStore from 'redux-mock-store'
import rootReducer from './';
import thunk from 'redux-thunk';

const testBunItem = {
  _id: 123,
  name: "Тестовая булка"
};

const testMiddleItem = {
  _id: 456,
  name: "Тестовый ингредиент"
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
  clearMiddleItems,
  setBunItem
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
    .toEqual(storeWithMiddleItem)
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
    .toEqual(storeWithBun)
  })

  it('should remove the bun', () => {
    expect(burgerConstructorSlice.reducer(
      store.getState(),
      setBunItem({})
    ))
    .toEqual(initStore)
  })
})
