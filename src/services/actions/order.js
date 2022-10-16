import { postOrderDetails } from "../../utils/api";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const getOrder = (ingredientIdArray) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    postOrderDetails(ingredientIdArray)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res.order.number,
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
