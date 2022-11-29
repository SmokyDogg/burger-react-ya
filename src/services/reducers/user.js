import {
    REGISTRATION_FAILED,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILED,
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED,
    EXIT_REQUEST,
    EXIT_SUCCESS,
    EXIT_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
  } from "../actions/user";
  
  const initialState = {
    user: null,
  
    authRequest: false,
    authSuccess: false,
    authFailed: false,
  
    registerRequest: false,
    registerSuccess: false,
    registerFailed: false,
  
    userRequest: false,
    userSuccess: false,
    userFailed: false,
  
    updateRequest: false,
    updateSuccess: false,
    updateFailed: false,
  
    tokenRequest: false,
    tokenSuccess: false,
    tokenFailed: false,
  
    forgotPswRequest: false,
    forgotPswFailed: false,
    forgotPswSuccess: false,
  
    resetPswRequest: false,
    resetPswFailed: false,
    resetPswSuccess: false,
  
    exitRequest: false,
    exitSuccess: false,
    exitFailed: false,
  
    expiredToken: false,
  };
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_REQUEST: {
        return {
          ...state,
          authRequest: true,
        };
      }
      case AUTH_SUCCESS: {
        return {
          ...state,
          authRequest: false,
          authSuccess: true,
          authFailed: false,
          user: action.payload,
        };
      }
      case AUTH_FAILED: {
        return {
          ...state,
          authRequest: false,
          authFailed: true,
        };
      }
      case REGISTRATION_REQUEST: {
        return {
          ...state,
          registerRequest: true,
        };
      }
      case REGISTRATION_SUCCESS: {
        return {
          ...state,
          registerRequest: false,
          registerSuccess: true,
          registerFailed: false,
          user: action.payload,
        };
      }
      case REGISTRATION_FAILED: {
        return {
          ...state,
          registerRequest: false,
          registerFailed: true,
        };
      }
      case GET_USER_REQUEST: {
        return {
          ...state,
          userRequest: true,
        };
      }
      case GET_USER_SUCCESS: {
        return {
          ...state,
          userRequest: false,
          userSuccess: true,
          userFailed: false,
          user: action.payload,
        };
      }
      case GET_USER_FAILED: {
        return {
          ...state,
          userRequest: false,
          userFailed: true,
          expiredToken: true,
        };
      }
      case UPDATE_USER_REQUEST: {
        return {
          ...state,
          updateRequest: true,
        };
      }
      case UPDATE_USER_SUCCESS: {
        return {
          ...state,
          updateRequest: false,
          updateSuccess: true,
          updateFailed: false,
          user: action.payload,
        };
      }
      case UPDATE_USER_FAILED: {
        return {
          ...state,
          updateRequest: false,
          updateFailed: true,
          expiredToken: true,
        };
      }
      case UPDATE_TOKEN_REQUEST: {
        return {
          ...state,
          tokenRequest: true,
        };
      }
      case UPDATE_TOKEN_SUCCESS: {
        return {
          ...state,
          tokenRequest: false,
          tokenSuccess: true,
          tokenFailed: false,
          expiredToken: false,
        };
      }
      case UPDATE_TOKEN_FAILED: {
        return {
          ...state,
          tokenRequest: false,
          tokenFailed: true,
          expiredToken: false,
        };
      }
      case FORGOT_PASSWORD_REQUEST: {
        return {
          ...state,
          forgotPswRequest: true,
        };
      }
      case FORGOT_PASSWORD_SUCCESS: {
        return {
          ...state,
          forgotPswFailed: false,
          forgotPswRequest: false,
          forgotPswSuccess: action.payload,
        };
      }
      case FORGOT_PASSWORD_FAILED: {
        return {
          ...state,
          forgotPswFailed: true,
          forgotPswRequest: false,
        };
      }
      case RESET_PASSWORD_REQUEST: {
        return {
          ...state,
          resetPswRequest: true,
        };
      }
      case RESET_PASSWORD_SUCCESS: {
        return {
          ...state,
          resetPswFailed: false,
          resetPswRequest: false,
          resetPswSuccess: action.payload,
        };
      }
      case RESET_PASSWORD_FAILED: {
        return {
          ...state,
          resetPswFailed: true,
          resetPswRequest: false,
        };
      }
      case EXIT_REQUEST: {
        return {
          ...state,
          exitRequest: true,
        };
      }
      case EXIT_SUCCESS: {
        return {
          ...state,
          exitRequest: false,
          exitSuccess: true,
          exitFailed: false,
          user: null,
        };
      }
      case EXIT_FAILED: {
        return {
          ...state,
          exitRequest: false,
          exitFailed: true,
        };
      }
      default: {
        return state;
      }
    }
  };