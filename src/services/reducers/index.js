import { combineReducers } from "redux";
import { currentIngredientsReducer } from "./currentIngredients";
import { ingredientReducer } from "./ingredients";
import { listIngredientReducer } from "./listIngredients";
import { orderReducer } from "./order";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  listIngredients: listIngredientReducer,
  currentIngredients: currentIngredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  user: userReducer
})