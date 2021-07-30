import { itemsSlice } from "./items";

const testItem = {
  _id: '123',
  name: "Тестовый ингредиент 1",
  __v: 0
};

const testItem2 = {
  _id: '234',
  name: "Тестовый ингредиент 2",
  __v: 3
};
const testItem3 = {
  _id: '345',
  name: "Тестовый ингредиент 3",
  __v: 2
};

const initStore = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  itemsSuccess: false
}

const {
  request,
  failed,
  success,
  increaseQuantityValue,
  decreaseQuantityValue,
  clearValues
} = itemsSlice.actions

describe('tests for burgerConstructorSlice', () => {

  it('should return the initial state', () => {
    expect(itemsSlice.reducer(undefined, {}))
    .toEqual(initStore)
  })

  it('should set the request state', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      itemsSuccess: true
    }, request()))
    .toEqual({
      ...initStore,
      itemsRequest: true
    })
  })

  it('should set the failed state', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      itemsRequest: true
    }, failed()))
    .toEqual({
      ...initStore,
      itemsFailed: true
    })
  })

  it('should set the success state and set the items data', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      itemsRequest: true
    }, success([
      testItem,
      testItem2,
      testItem3
    ])))
    .toEqual({
      ...initStore,
      itemsSuccess: true,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    })
  })

  it('should increase the qty by 1 of item with id 123', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    }, increaseQuantityValue('123')))
    .toEqual({
      ...initStore,
      items: [
        {
          ...testItem,
          __v : 1
        },
        testItem2,
        testItem3
      ]
    })
  })

  it('should decrease the qty by 1 of item with id 123', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    }, decreaseQuantityValue('234')))
    .toEqual({
      ...initStore,
      items: [
        testItem,
        {
          ...testItem2,
          __v : 2
        },
        testItem3
      ]
    })
  })
  
  it('should clear qty of all items in store', () => {
    expect(itemsSlice.reducer({
      ...initStore,
      items: [
        testItem,
        testItem2,
        testItem3
      ]
    }, clearValues()))
    .toEqual({
      ...initStore,
      items: [
        {
          ...testItem,
          __v : 0
        },
        {
          ...testItem2,
          __v : 0
        },
        {
          ...testItem3,
          __v : 0
        }
      ]
    })
  })
})
