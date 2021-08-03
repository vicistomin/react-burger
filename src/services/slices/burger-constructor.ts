import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IIngredient {
  name?: string,
  price?: number
}

interface burgerConstructorState {
  bunItem: IIngredient,
  middleItems: Array<IIngredient>,
  totalPrice: number
}

// Define the initial state using that type
const initialState: burgerConstructorState = {
  bunItem: {},
  middleItems: [],
  totalPrice: 0
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBunItem(state, action: PayloadAction<IIngredient>) {
      state.bunItem = action.payload;
    },
    addMiddleItem(state, action: PayloadAction<IIngredient>) {
      state.middleItems.push(action.payload);
    },
    moveMiddleItem(state, action: PayloadAction<{ oldIndex: number, newIndex: number }>) {
      const movedItem = state.middleItems.splice(action.payload.oldIndex, 1);
      state.middleItems.splice(action.payload.newIndex, 0, movedItem[0]);
    },
    deleteMiddleItem(state, action: PayloadAction<number>) {
      state.middleItems.splice(action.payload, 1);
    },
    clearMiddleItems(state) {
      state.middleItems = [];
    },
    calcTotalPrice(state) {
      !!state.bunItem.name && !!state.bunItem.price ? (
        // buns can be only of one type so there are 2 buns:
        state.totalPrice = state.bunItem.price * 2 + state.middleItems.reduce(
          (acc, p) => acc + (p.price || 0), 0
        )
      ) : ( state.middleItems.length ? (
        state.totalPrice = state.middleItems.reduce((acc, p) => acc + (p.price || 0), 0)
        ) : (
          state.totalPrice = 0
        )
      );
    }
  }
}) 
