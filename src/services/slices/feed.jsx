import { createSlice } from '@reduxjs/toolkit';
import { wsSlice } from './websocket';
import { ALL_ORDERS_WS_URL } from '../constants';

export const startFeed = () => {
  return (dispatch) => {
    dispatch(wsSlice.actions.wsConnectionStart({ url: ALL_ORDERS_WS_URL }));
    dispatch(wsSlice.actions.wsSetDataDispatch(feedSlice.actions.setOrdersData));
    dispatch(feedSlice.actions.request());
  }
}

export const stopFeed = () => {
  return (dispatch) => {
    dispatch(wsSlice.actions.wsConnectionStop({ url: ALL_ORDERS_WS_URL }));
  }
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    orders: [],
    feedRequest: false,
    feedFailed: false,
    feedSuccess: false,
    ordersTotal: 0,
    ordersTotalToday: 0
  },
  reducers: {
    request(state) {
      state.feedRequest = true;
      state.feedFailed = false;
      state.feedSuccess = false;
    },
    failed(state) {
      state.feedFailed = true;
      state.feedRequest = false;
      state.feedSuccess = false;
    },
    success(state) {
      state.feedSuccess = true;
      state.feedRequest = false;
      state.feedFailed = false;
    },
    setOrdersData(state, action) {
      state.orders = action.payload.orders;
      state.ordersTotal = action.payload.total;
      state.ordersTotalToday = action.payload.totalToday;
    }
  }
}) 
