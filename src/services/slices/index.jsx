import { combineReducers } from '@reduxjs/toolkit'
import { itemsSlice } from "./items";
import { burgerConstructorSlice } from "./burger-constructor";
import { ingredientSlice } from "./ingredient";
import { orderSlice } from "./order";
import { userSlice } from "./user";

const rootReducer = combineReducers(
  {
    items: itemsSlice.reducer,
    ingredient: ingredientSlice.reducer,
    order: orderSlice.reducer,    
    burgerConstructor: burgerConstructorSlice.reducer,
    user: userSlice.reducer
  }
)

export default rootReducer
