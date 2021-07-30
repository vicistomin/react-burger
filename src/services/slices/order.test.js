import { orderSlice } from "./order";

const testOrder = {
  name: 'Тестовый заказ',
  id: '123',
  success: true
};

const initStore = {
  orderData: {},
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,
  isOrderModalOpen: false
}

const {
  request,
  failed,
  success,
  openOrderModal,
  closeOrderModal
} = orderSlice.actions

describe('tests for orderSlice', () => {

  it('should return the initial state', () => {
    expect(orderSlice.reducer(undefined, {}))
    .toEqual(initStore)
  })

  it('should set the request state and reset order data', () => {
    expect(orderSlice.reducer({
      ...initStore,
      orderSuccess: true,
      orderData: testOrder
    }, request()))
    .toEqual({
      ...initStore,
      orderRequest: true,
      orderData: {}
    })
  })

  it('should set the failed state', () => {
    expect(orderSlice.reducer({
      ...initStore,
      orderRequest: true,
      orderData: testOrder
    }, failed()))
    .toEqual({
      ...initStore,
      orderFailed: true,
      orderData: { success: false }
    })
  })

  it('should set the success state and set order data', () => {
    expect(orderSlice.reducer({
      ...initStore,
      orderRequest: true
    }, success({
      name: testOrder.name,
      number: testOrder.id,
      success: testOrder.success
    })))
    .toEqual({
      ...initStore,
      orderSuccess: true,
      orderData: testOrder
    })
  })

  it('should open the OrderModal', () => {
    expect(orderSlice.reducer({
      ...initStore
    }, openOrderModal()))
    .toEqual({
      ...initStore,
      isOrderModalOpen: true
    })
  })

  it('should close the OrderModal', () => {
    expect(orderSlice.reducer({
      ...initStore,
      isOrderModalOpen: true
    }, closeOrderModal()))
    .toEqual({
      ...initStore
    })
  })
})
