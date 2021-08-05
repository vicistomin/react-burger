import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch } from '../hooks'
import { IIngredient, INewOrder } from '../types'
import { ORDER_API_URL } from "../constants";
import { burgerConstructorSlice } from './burger-constructor';
import { itemsSlice } from './items';
import { setCookie, getCookie } from '../utils';
import { refreshToken } from './user';

export const placeOrder = (items: Array<IIngredient>) => {
  return (dispatch = useAppDispatch()) => {
    dispatch(orderSlice.actions.request());

    // show modal right from request start to show loader
    dispatch(orderSlice.actions.openOrderModal());
    
    // get new order ID from API:
    fetch(ORDER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken')
      },
      body: JSON.stringify({
        "ingredients": items
      })
    })
      .then(res => {
        if (!res.ok && res.status >= 500) {
          throw Error(res.statusText);
          }
        return res.json();
        })
      .then((data) => {
        if (data.success) {
          dispatch(orderSlice.actions.success({
            name: data.name,
            number: data.order.number,
            success: data.success
          }))
        }
        // if accessToken has gone stale we're need to refresh it first
        else if (data.message && data.message === 'jwt expired') {
          dispatch(orderSlice.actions.request());
          refreshToken()
          .then((refresh_res) => {
            if (!refresh_res.ok && refresh_res.status >= 500) {
              throw Error(refresh_res.statusText);
            }
            return refresh_res.json();
          })
          .then((refresh_data) => {
            if (refresh_data.success === true) {
              setCookie('accessToken', refresh_data.accessToken, { path: '/' });
              setCookie('refreshToken', refresh_data.refreshToken, { path: '/' });
              dispatch(orderSlice.actions.request());
              fetch(ORDER_API_URL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: getCookie('accessToken')
                },
                body: JSON.stringify({
                  "ingredients": items
                })
              })
              .then(res => {
                if (!res.ok && res.status >= 500) {
                  throw Error(res.statusText);
                  }
                return res.json();
                })
              .then((data) => {
                if (data.success) {
                  dispatch(orderSlice.actions.success({
                    name: data.name,
                    number: data.order.number,
                    success: data.success
                  }))
                }
                else {
                  throw Error(data.message);
                }
              })
              .catch((error) => {
                dispatch(orderSlice.actions.failed());
                console.log(error);
              })
            }
            else {
              throw Error(refresh_data.message);
            }
          })
          .catch((error) => {
            dispatch(orderSlice.actions.failed());
            console.log(error);
          });
        }
        else {
          throw Error(data.message);
        }
      })
      .catch((error) => {
        dispatch(orderSlice.actions.failed());
        console.log(error);
      })
     .finally(() => {
        // clearing ordered ingredients from BurgerConstructor
        dispatch(burgerConstructorSlice.actions.setBunItem({}));
        dispatch(burgerConstructorSlice.actions.clearMiddleItems());
        dispatch(itemsSlice.actions.clearValues());
      })
  }
}

interface orderState {
  orderData: INewOrder,
  orderRequest: boolean,
  orderFailed: boolean,
  orderSuccess: boolean,
  isOrderModalOpen: boolean,
}

const initialState: orderState = {
  orderData: {},
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,
  isOrderModalOpen: false,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    request(state) {
      state.orderRequest = true;
      state.orderFailed = false;
      state.orderSuccess = false;
      state.orderData = {};
    },
    failed(state) {
      state.orderFailed = true;
      state.orderRequest = false;
      state.orderSuccess = false;
      state.orderData = {
        success: false
      }
    },
    success(state, action: PayloadAction<INewOrder>) {
      state.orderSuccess = true;
      state.orderRequest = false;
      state.orderFailed = false;
      state.orderData = {
        name: action.payload.name,
        id: action.payload.number,
        success: action.payload.success
      }
    },
    openOrderModal(state) {
      state.isOrderModalOpen = true;
    },
    closeOrderModal(state) {
      state.isOrderModalOpen = false;
    }
  }
}) 
