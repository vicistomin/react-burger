import { combineReducers } from '@reduxjs/toolkit'
import { itemsSlice } from "./items";
import { constructorSlice } from "./constructor";
import { ingredientSlice } from "./ingredient";
import { orderSlice } from "./order";

const rootReducer = combineReducers(
  {
    items: itemsSlice.reducer,
    constructor: constructorSlice.reducer,
    ingredient: ingredientSlice.reducer,
    order: orderSlice.reducer
  }
)

export default rootReducer
