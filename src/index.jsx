import React from 'react';
import ReactDOM from 'react-dom';

import './index.module.css';
import App from './app';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './services/slices';
import { BrowserRouter } from 'react-router-dom';
import { wsMiddleware } from './services/middleware';

// import reportWebVitals from './reportWebVitals';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, wsMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  }); 
    
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
