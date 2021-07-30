import { wsSlice } from "./websocket";

const testDispatchFunction = () => {
  console.log("testDispatchFunction")
}

const initStore = {
  wsConnected: false,
  wsError: false,
  saveDataDispatch: () => {}
}

const {
  wsSetDataDispatch,
  wsConnectionStop,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed
} = wsSlice.actions

describe('tests for wsSlice', () => {

  it('should return the initial state', () => {
    expect(wsSlice.reducer(undefined, {}))
    .toEqual({
      ...initStore,
      saveDataDispatch: expect.any(Function)
    })
  })

  it('should set the stop state', () => {
    expect(wsSlice.reducer({
      ...initStore,
      wsConnected: true,
      wsError: true
    }, wsConnectionStop()))
    .toEqual({
      ...initStore
    })
  })

  it('should set the success state', () => {
    expect(wsSlice.reducer({
      ...initStore,
      wsError: true
    }, wsConnectionSuccess()))
    .toEqual({
      ...initStore,
      wsConnected: true
    })
  })

  it('should set the error state', () => {
    expect(wsSlice.reducer({
      ...initStore,
      wsConnected: true
    }, wsConnectionError()))
    .toEqual({
      ...initStore,
      wsError: true
    })
  })

  it('should set the closed state', () => {
    expect(wsSlice.reducer({
      ...initStore,
      wsConnected: true
    }, wsConnectionClosed()))
    .toEqual({
      ...initStore
    })
  })

  it('should set the data dispatch function', () => {
    expect(wsSlice.reducer({
      ...initStore
    }, wsSetDataDispatch(testDispatchFunction)))
    .toEqual({
      ...initStore,
      saveDataDispatch: testDispatchFunction
    })
  })
})
