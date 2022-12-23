import { postOrderDetails } from "../../utils/api";
import { AppDispatch, AppThunk } from "../types";
import { TIngridientsIdArray } from "../types/data";
import { CLEAR_INGREDIENTS } from "./currentIngredients";
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = "GET_ORDER_FAILED";
export const CLEAR_ORDER: 'CLEAR_ORDER' = "CLEAR_ORDER";

export interface IGetOrderRequest{
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess{
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: number;
}
export interface IGetOrderFailed{
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IClearOrder{
  readonly type: typeof CLEAR_ORDER;
}

export type TOrderActions = IGetOrderRequest | IGetOrderSuccess | IGetOrderFailed | IClearOrder;

export const getOrder: AppThunk = (ingridientsIdArray: TIngridientsIdArray) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    postOrderDetails(ingridientsIdArray)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order.number,
        });
        dispatch({
          type: CLEAR_INGREDIENTS,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        console.log(err);
      });
  };
};