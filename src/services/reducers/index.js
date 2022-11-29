import { combineReducers } from "redux";
import { currentIngredientsReducer } from "./currentIngredients";
import { ingredientReducer } from "./ingredients";
import { listIngredientReducer } from "./listIngredients";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { modalReducer } from "./modal";
import { wsAllOrdersReducer } from "./wsAllOrders";
import { wsUserOrdersReducer } from "./wsUserOrders";

export const rootReducer = combineReducers({
  listIngredients: listIngredientReducer,
  currentIngredients: currentIngredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  user: userReducer,
  modal: modalReducer,
  wsAllOrders: wsAllOrdersReducer,
  wsUserOrders: wsUserOrdersReducer
})