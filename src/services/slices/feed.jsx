import { createSlice } from '@reduxjs/toolkit'
import { fakeFeedData } from '../feed-data';

export const getFeed = () => {
  return dispatch => {
    dispatch(feedSlice.actions.request());
    // getting data from fake API
    setTimeout(() => {  
    if (!!fakeFeedData)
      dispatch(feedSlice.actions.success(fakeFeedData));
    else
      dispatch(feedSlice.actions.failed());
    }, 1000);
  }
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    orders: [],
    feedRequest: false,
    feedFailed: false,
    feedSuccess: false,
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
      state.orders = action.payload;
    }
  }
}) 
