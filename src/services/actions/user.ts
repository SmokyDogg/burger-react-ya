import {
  registrationUser,
  forgotPassword,
  resetPassword,
  autorizationUser,
  getAuthToken,
  logOut,
  getUserData,
  updateUserData,
} from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../types";
import { TUser } from "../types/data";
export const AUTH_REQUEST: 'AUTH_REQUEST' = "AUTH_REQUEST";
export const AUTH_SUCCESS: 'AUTH_SUCCESS' = "AUTH_SUCCESS";
export const AUTH_FAILED: 'AUTH_FAILED' = "AUTH_FAILED";

export const REGISTRATION_REQUEST: 'REGISTRATION_REQUEST' = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED: 'REGISTRATION_FAILED' = "REGISTRATION_FAILED";

export const UPDATE_TOKEN_REQUEST: 'UPDATE_TOKEN_REQUEST' = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: 'UPDATE_TOKEN_SUCCESS' = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: 'UPDATE_TOKEN_FAILED' = "UPDATE_TOKEN_FAILED";

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = "RESET_PASSWORD_FAILED";

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = "GET_USER_SUCCESS";
export const GET_USER_FAILED: 'GET_USER_FAILED' = "GET_USER_FAILED";

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = "UPDATE_USER_FAILED";

export const EXIT_REQUEST: 'EXIT_REQUEST' = "EXIT_REQUEST";
export const EXIT_SUCCESS: 'EXIT_SUCCESS' = "EXIT_SUCCESS";
export const EXIT_FAILED: 'EXIT_FAILED' = "EXIT_FAILED";

export interface IAuthRequest{
  readonly type: typeof AUTH_REQUEST;
}
export interface IAuthSuccess{
  readonly type: typeof AUTH_SUCCESS;
  readonly payload: TUser;
}
export interface IAuthFailed{
  readonly type: typeof AUTH_FAILED;
}
export interface IRegistrationRequest{
  readonly type: typeof REGISTRATION_REQUEST;
}
export interface IRegistrationSuccess{
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly payload: TUser;
}
export interface IRegistrationFailed{
  readonly type: typeof REGISTRATION_FAILED;
}
export interface IUpdateTokenRequest{
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}
export interface IUpdateTokenSuccess{
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}
export interface IUpdateTokenFailed{
  readonly type: typeof UPDATE_TOKEN_FAILED;
}
export interface IForgotPassRequest{
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPassSuccess{
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  readonly success: boolean;
}
export interface IForgotPassFailed{
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}
export interface IResetPassRequest{
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPassSuccess{
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly success: boolean;
}
export interface IResetPassFailed{
  readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface IGetUserRequest{
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccess{
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUser;
}
export interface IGetUserFailed{
  readonly type: typeof GET_USER_FAILED;
}
export interface IUpdateUserRequest{
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccess{
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TUser;
}
export interface IUpdateUserFailed{
  readonly type: typeof UPDATE_USER_FAILED;
}
export interface IExitRequest{
  readonly type: typeof EXIT_REQUEST;
}
export interface IExitSuccess{
  readonly type: typeof EXIT_SUCCESS;
}
export interface IExitFailed{
  readonly type: typeof EXIT_FAILED;
}

export type TUserActions = IAuthRequest | IAuthSuccess | IAuthFailed |
                            IExitRequest | IExitSuccess | IExitFailed |
                            IForgotPassRequest | IForgotPassSuccess | IForgotPassFailed |
                            IGetUserRequest | IGetUserSuccess | IGetUserFailed |
                            IRegistrationRequest | IRegistrationSuccess | IRegistrationFailed |
                            IResetPassRequest | IResetPassSuccess | IResetPassFailed |
                            IUpdateTokenRequest | IUpdateTokenSuccess | IUpdateTokenFailed |
                            IUpdateUserRequest | IUpdateUserSuccess | IUpdateUserFailed;

export const authUser: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: AUTH_REQUEST,
    });
    autorizationUser(email, password)
      .then((res) => {
        let authToken = res.accessToken.split("Bearer ")[1];
        let refreshToken = res.refreshToken;
        if (authToken) {
          setCookie("authToken", authToken);
        }
        if (refreshToken) {
          setCookie("refreshToken", refreshToken);
        }
        dispatch({
          type: AUTH_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: AUTH_FAILED,
        });
        console.log(err);
      });
  };
};

export const registerUser: AppThunk = (email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTRATION_REQUEST,
    });
    registrationUser(email, password, name)
      .then((res) => {
        let authToken = res.accessToken.split("Bearer ")[1];
        let refreshToken = res.refreshToken;
        if (authToken) {
          setCookie("authToken", authToken);
        }
        if (refreshToken) {
          setCookie("refreshToken", refreshToken);
        }
        dispatch({
          type: REGISTRATION_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTRATION_FAILED,
        });
        console.log(err);
      });
  };
};
export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserData()
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
        });
        console.log(err);
      });
  };
};
export const updateUser: AppThunk = (name: string, email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUserData(name, email, password)
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
        console.log(err);
      });
  };
};
export const updateToken: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    getAuthToken()
      .then((res) => {
        let authToken = res.accessToken.split("Bearer ")[1];
        let refreshToken = res.refreshToken;
        if (authToken) {
          setCookie("authToken", authToken);
        }
        if (refreshToken) {
          setCookie("refreshToken", refreshToken);
        }
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
          success: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
        console.log(err);
      });
  };
};
export const forgotPswUser: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    forgotPassword(email)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          success: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
        console.log(err);
      });
  };
};

export const resetPswUser: AppThunk = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPassword(password, token)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          success: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
        console.log(err);
      });
  };
};
export const exit: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: EXIT_REQUEST,
    });
    logOut()
      .then((res) => {
        dispatch({
          type: EXIT_SUCCESS,
          success: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: EXIT_FAILED,
        });
        console.log(err);
      });
  };
};