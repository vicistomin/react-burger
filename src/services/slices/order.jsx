import { createSlice } from '@reduxjs/toolkit'
import { ORDER_API_URL } from "../constants";
import { burgerConstructorSlice } from './burger-constructor';

export const placeOrder = (items) => {
  return dispatch => {
    dispatch(orderSlice.actions.request());
    // get new order ID from API:
    fetch(ORDER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": items
      })
    })
      .then(res => {
        if (!res.ok && res.status !== 400) {
          throw Error(res.statusText);
          }
        return res.json();
        })
      .then((data) => {
        if (data.success)
          dispatch(orderSlice.actions.success({
            name: data.name,
            number: data.order.number,
            success: data.success
          }))
        else {
          dispatch(orderSlice.actions.failed())
          throw Error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      // show modal only after fetch is done so it won't show old data if it's open again:
      // in case of error we'll show OrderDetail modal to user anyway to let him see the error message in it
      .finally(() => {
        dispatch(orderSlice.actions.openOrderModal())
        // clearing ordered ingredients from BurgerConstructor
        dispatch(burgerConstructorSlice.actions.setBunItem({}));
        dispatch(burgerConstructorSlice.actions.clearMiddleItems([]));
      })
  }
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderData: {},
    orderRequest: false,
    orderFailed: false,
    orderSuccess: false,
    isOrderModalOpen: false,
  },
  reducers: {
    request(state) {
      state.orderRequest = true;
      state.orderFailed = false;
      state.orderSuccess = false;
    },
    failed(state) {
      state.orderFailed = true;
      state.orderRequest = false;
      state.orderSuccess = false;
      state.orderData = {
        success: false
      }
    },
    success(state, action) {
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
