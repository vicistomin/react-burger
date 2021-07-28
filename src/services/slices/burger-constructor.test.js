import { burgerConstructorSlice } from "./burger-constructor";
import configureMockStore from 'redux-mock-store'
import rootReducer from './services/slices';
import thunk from 'redux-thunk';

const testBunItem = {
  _id: 123,
  name: "Тестовая булка"
};

const initStore = {
  bunItem: {},
  middleItems: [],
  totalPrice: 0
}

const storeWithBun = {
  ...initStore,
  bunItem: testBunItem
}


const { reducer } = burgerConstructorSlice;

describe('tests for burgerConstructor reducers', () => {

  const mockStore = configureMockStore({
    reducer: rootReducer,
    middleware: [thunk]
  })

  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual(initStore)
  })

  it('should add the bun in the store', () => {
    const {getState} = mockStore
    expect(getState.dispatch.setBunItem(testBunItem))
    .toEqual(storeWithBun)
  })
})
