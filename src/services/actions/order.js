import { postOrderDetails } from "../../utils/api";
import { CLEAR_INGREDIENTS } from "../actions/currentIngredients";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const CLEAR_ORDER = "CLEAR_ORDER"

export const getOrder = (ingridientsIdArray) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    postOrderDetails(ingridientsIdArray)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res.order.number,
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