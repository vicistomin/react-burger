import { combineReducers } from '@reduxjs/toolkit'
import { itemsSlice } from "./items";
import { burgerConstructorSlice } from "./burger-constructor";
import { ingredientSlice } from "./ingredient";
import { orderSlice } from "./order";
import { userSlice } from "./user";
import { feedSlice } from "./feed";

const rootReducer = combineReducers(
  {
    items: itemsSlice.reducer,
    ingredient: ingredientSlice.reducer,
    order: orderSlice.reducer,    
    burgerConstructor: burgerConstructorSlice.reducer,
    user: userSlice.reducer,
    feed: feedSlice.reducer
  }
)

export default rootReducer
