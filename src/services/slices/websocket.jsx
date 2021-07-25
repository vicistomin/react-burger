import { createSlice } from '@reduxjs/toolkit';

export const wsSlice = createSlice({
  name: 'ws',
  initialState: {
    wsConnected: false,
    wsError: false,
    saveDataDispatch: () => {},
  },
  reducers: {
    wsSetDataDispatch(state, action) {
      state.saveDataDispatch = action.payload;
    },

    wsConnectionStart() {},

    wsConnectionStop(state) {
      state.wsConnected = false;
      state.wsError = false;
    },

    wsConnectionSuccess(state) {
      state.wsConnected = true;
      state.wsError = false;
      
    },

    wsConnectionError(state) {
      state.wsConnected = false;
      state.wsError = true;
    },

    wsConnectionClosed(state) {
      state.wsConnected = false;
      state.wsError = false;
    }
  }
}) 
