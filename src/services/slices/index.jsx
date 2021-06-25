import { combineReducers } from '@reduxjs/toolkit'
import { itemsSlice } from "./items";
import { burgerConstructorSlice } from "./burger-constructor";
import { ingredientSlice } from "./ingredient";
import { orderSlice } from "./order";

const rootReducer = combineReducers(
  {
    items: itemsSlice.reducer,
    ingredient: ingredientSlice.reducer,
    order: orderSlice.reducer,    
    burgerConstructor: burgerConstructorSlice.reducer
  }
)

export default rootReducer
