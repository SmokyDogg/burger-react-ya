import { TIngredient } from "../types/data";

export const GET_INGREDIENT: 'GET_INGREDIENT' = "GET_INGREDIENT";
export const CLEAR_INGREDIENT: 'CLEAR_INGREDIENT' = "CLEAR_INGREDIENT";

export interface IGetIngredient{
    readonly type: typeof GET_INGREDIENT;
    readonly payload: TIngredient;
}
export interface IClearIngredient{
    readonly type: typeof CLEAR_INGREDIENT;
}
export type TIngredientActions = IGetIngredient | IClearIngredient;