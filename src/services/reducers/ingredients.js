import { GET_INGREDIENT, CLEAR_INGREDIENT } from "../actions/ingredients";
// Исходное состояние
const initialState = {
  currentIngredient: null,
};
export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case CLEAR_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
