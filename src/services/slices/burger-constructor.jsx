import { createSlice } from '@reduxjs/toolkit'

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    bunItem: {},
    middleItems: [],
    totalPrice: 0
  },
  reducers: {
    setBunItem(state, action) {
      state.bunItem = action.payload;
    },
    addMiddleItem(state, action) {
      state.middleItems.push(action.payload);
    },
    sortMiddleItem(state, action) {
      state.middleItems.splice(action.payload.index, 0, action.payload.item);
    },
    deleteMiddleItem(state, action) {
      state.middleItems.splice(action.payload, 1);
    },
    clearMiddleItems(state) {
      state.middleItems = [];
    },
    calcTotalPrice(state) {
      !!state.bunItem.name ? (
        // buns can be only of one type so there are 2 buns:
        state.totalPrice = state.bunItem.price * 2 + state.middleItems.reduce(
          (acc, p) => acc + p.price, 0
        )
      ) : ( state.middleItems.length ? (
        state.totalPrice = state.middleItems.reduce((acc, p) => acc + p.price, 0)
        ) : (
          state.totalPrice = 0
        )
      );
    }
  }
}) 
