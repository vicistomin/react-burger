import { burgerConstructorSlice } from "./burger-constructor";

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

const {
  addMiddleItem,
  moveMiddleItem,
  deleteMiddleItem,
  clearMiddleItems,
  setBunItem,
  calcTotalPrice
} = burgerConstructorSlice.actions

describe('tests for burgerConstructorSlice', () => {

  it('should return the initial state', () => {
    expect(burgerConstructorSlice.reducer(undefined, {}))
    .toEqual(initStore)
  })

  it('should add the middle item', () => {
    expect(burgerConstructorSlice.reducer(
      initStore,
      addMiddleItem(testMiddleItem)
    )) 
    .toEqual({
      ...initStore,
      middleItems: [testMiddleItem]
    })
  })

  it('should add another middle item', () => {
    expect(burgerConstructorSlice.reducer({
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
    expect(burgerConstructorSlice.reducer({
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
    expect(burgerConstructorSlice.reducer({
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

  it('should remove the second middle item', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        middleItems: [
          testMiddleItem,
          testMiddleItem2,
          testMiddleItem3
        ]
      },
      deleteMiddleItem(1)
    )) 
    .toEqual({
      ...initStore,
      middleItems: [
        testMiddleItem,
        testMiddleItem3
      ]
    })
  })

  it('should clear all middle items', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        middleItems: [
          testMiddleItem,          
          testMiddleItem2,
          testMiddleItem3
        ]
      },
      clearMiddleItems()
    )) 
    .toEqual(initStore)
  })

  it('should add the bun', () => {
    expect(burgerConstructorSlice.reducer(
      initStore,
      setBunItem(testBunItem)
    ))
    .toEqual({
      ...initStore,
      bunItem: testBunItem
    })
  })

  it('should replace the bun', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        bunItem: testBunItem
      },
      setBunItem(testBunItem2)
    ))
    .toEqual({
      ...initStore,
      bunItem: testBunItem2
    })
  })

  it('should remove the bun', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        bunItem: testBunItem
      },
      setBunItem({})
    ))
    .toEqual(initStore)
  })

  it('should calculate the total price', () => {
    expect(burgerConstructorSlice.reducer({
        ...initStore,
        bunItem: testBunItem,
        middleItems: [
          testMiddleItem,
          testMiddleItem2
        ]
      },
      calcTotalPrice()
    ))
    .toEqual({
      ...initStore,
      bunItem: testBunItem,
      middleItems: [
        testMiddleItem,
        testMiddleItem2
      ],
      // 2x the bun price
      totalPrice: 900
    })
  })
})
