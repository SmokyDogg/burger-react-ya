import { combineReducers } from "redux";
import { currentIngredientsReducer } from "./currentIngredients";
import { ingredientReducer } from "./ingredients";
import { listIngredientReducer } from "./listIngredients";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  listIngredients: listIngredientReducer,
  currentIngredients: currentIngredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
})