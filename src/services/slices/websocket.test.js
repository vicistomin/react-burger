import { wsSlice } from "./websocket";

const initStore = {
  wsConnected: false,
  wsError: false
}

const {
  wsConnectionStop,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed
} = wsSlice.actions

describe('tests for wsSlice', () => {

  it('should return the initial state', () => {
    expect(wsSlice.reducer(undefined, {}))
    .toEqual({
      ...initStore
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
})
