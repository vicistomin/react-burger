import { createSlice } from '@reduxjs/toolkit';
import { wsSlice } from './websocket';

export const getFeed = () => {
  return (dispatch, getState) => {
    dispatch(wsSlice.actions.wsSetDataDispatch(feedSlice.actions.setOrdersData));
    dispatch(feedSlice.actions.request());
    if (getState())
      dispatch(feedSlice.actions.success());
    else
      dispatch(feedSlice.actions.failed());
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
    success(state, action) {
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
