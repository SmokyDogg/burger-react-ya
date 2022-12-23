import { OPEN_MODAL, CLOSE_MODAL, TModalActions } from "../actions/modal";

type TInitialState = {
  isOpened: boolean;
};
const initialState: TInitialState = {
  isOpened: false,
};
export const modalReducer = (state = initialState, action: TModalActions) : TInitialState => {
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
