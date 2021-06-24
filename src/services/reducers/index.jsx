import { combineReducers } from "redux";
import { itemsReducer } from "./store";
import { constructorReducer } from "./store";
import { ingredientReducer } from "./store";
import { orderReducer } from "./store";

export const rootReducer = combineReducers({
  items: itemsReducer,
  constructor: constructorReducer,
  ingredient: ingredientReducer,
  order: orderReducer
});