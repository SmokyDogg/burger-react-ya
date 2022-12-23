import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_ORDER,
  TOrderActions
} from "../actions/order";

type TInitialState = {
  order: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState: TInitialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};
export const orderReducer = (state = initialState, action: TOrderActions): TInitialState => {
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
        order: action.order,
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
    case CLEAR_ORDER: {
      return {
        ...state,
        order: null,
      };
    }
    default: {
      return state;
    }
  }
};