import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";

const initialState = {
  isOpened: false,
};
export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isOpened: true,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isOpened: false,
      };
    }
    default: {
      return state;
    }
  }
};
