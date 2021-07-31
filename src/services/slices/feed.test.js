import { feedSlice } from "./feed";

const testOrder = {
  _id: 123,
  name: "Тестовый заказ",
  updatedAt: "2021-07-29T17:07:35.495Z"
};

const testOrder2 = {
  _id: 234,
  name: "Тестовый заказ 2",
  updatedAt: "2021-07-25T14:07:35.495Z"
};

const testOrder3 = {
  _id: 345,
  name: "Тестовый заказ 3",
  updatedAt: "2021-07-19T13:07:35.495Z"
};

const testTotal = 100;
const testTotalToday = 10;

const initStore = {
  orders: [],
  feedRequest: false,
  feedFailed: false,
  feedSuccess: false,
  ordersTotal: 0,
  ordersTotalToday: 0
}

const {
  request,
  failed,
  success,
  setOrdersData
} = feedSlice.actions

describe('tests for feedSlice', () => {

  it('should return the initial state', () => {
    expect(feedSlice.reducer(undefined, {}))
    .toEqual(initStore)
  })

  it('should set the request state', () => {
    expect(feedSlice.reducer({
      ...initStore,
      feedSuccess: true
    }, request()))
    .toEqual({
      ...initStore,
      feedRequest: true
    })
  })

  it('should set the failed state', () => {
    expect(feedSlice.reducer({
      ...initStore,
      feedRequest: true
    }, failed()))
    .toEqual({
      ...initStore,
      feedFailed: true
    })
  })

  it('should set the success state', () => {
    expect(feedSlice.reducer({
      ...initStore,
      feedRequest: true
    }, success()))
    .toEqual({
      ...initStore,
      feedSuccess: true
    })
  })

  it('should sort orders by time and set its data to the state', () => {
    expect(feedSlice.reducer({
      ...initStore
    }, setOrdersData({
      orders: [
        testOrder3,
        testOrder2,
        testOrder
      ],
      total: testTotal,
      totalToday: testTotalToday
    })))
    .toEqual({
      ...initStore,
      orders: [
        testOrder,
        testOrder2,
        testOrder3
      ],
      ordersTotal: testTotal,
      ordersTotalToday: testTotalToday
    })
  })
})
