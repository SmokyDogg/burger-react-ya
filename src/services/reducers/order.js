import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions/order";

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.payload,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        order: null,
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};