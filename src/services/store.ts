import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices';
import { wsMiddleware } from './middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, wsMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  }); 

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch