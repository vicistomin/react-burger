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
    setMiddleItems(state, action) {
      state.middleItems = action.payload;
    },
    calcTotalPrice(state) {
      // buns can be only of one type so there are 2 buns:
      state.totalPrice = state.bunItem.price * 2 + state.middleItems.reduce(
        (acc, p) => acc + p.price, 0
      )
    }
  }
}) 
