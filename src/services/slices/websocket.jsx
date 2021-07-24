import { createSlice } from '@reduxjs/toolkit';

export const wsSlice = createSlice({
  name: 'ws',
  initialState: {
    wsConnected: false,
    saveDataDispatch: () => {},
  },
  reducers: {
    wsSetDataDispatch(state, action) {
      state.saveDataDispatch = action.payload;
    },

    wsConnectionStart() {},

    wsConnectionSuccess(state) {
      state.wsConnected = true;
    },

    wsConnectionError(state) {
      state.wsConnected = false;
    },

    wsConnectionClosed(state) {
      state.wsConnected = false;
    },
  }
}) 
