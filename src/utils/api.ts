import { TChangePassAndLogout, TGetIngredients, TGetUser, TPostOrder, TUserInfo } from "../services/types/data";
import { BASE_API_URL } from "./constants";
import {getCookie} from './cookie';

const checkResponse = <T>(res: Response):Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    new Error(`Ошибка ${res.status}`)
  );
};

const request = <T>(url: string, options: RequestInit): Promise<T> => {
  return fetch(url, options).then(res => checkResponse<T>(res))
}

export const getData = async() => {
  return request<TGetIngredients>(`${BASE_API_URL}/ingredients`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
};

export const postOrderDetails = async(ingridientsIdArray: Array<string>) => {
  return request<TPostOrder>(`${BASE_API_URL}/orders`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
      body: JSON.stringify({
          ingredients: ingridientsIdArray,
      }),
  })
}

export const autorizationUser = async(email: string, password: string) =>{
  return request<TUserInfo>(`${BASE_API_URL}/auth/login`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
          'password': password
      }),
    })
}

export const registrationUser = async(email: string, password: string, name: string) =>{
  return request<TUserInfo>(`${BASE_API_URL}/auth/register`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
          'password': password,
          'name': name
      }),
    })
}

export const getAuthToken = async() =>{
  return request<TUserInfo>(`${BASE_API_URL}/auth/token`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "token": getCookie("refreshToken"),
      }),
    })
}

export const forgotPassword = async(email: string) =>{
  return request<TChangePassAndLogout>(`${BASE_API_URL}/password-reset`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'email': email,
      }),
    })
}

export const resetPassword = async(password: string, token: string) =>{
  return request<TChangePassAndLogout>(`${BASE_API_URL}/password-reset/reset`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'password': password,
          'token': token
      }),
    })
}

export const getUserData = async() =>{
  return request<TGetUser>(`${BASE_API_URL}/auth/user`, {
    method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
      
    })
}

export const updateUserData = async(name: string, email: string, password: string) =>{
  return request<TGetUser>(`${BASE_API_URL}/auth/user`, {
    method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password,
    }),
    })
}

export const logOut = async() => {
  return request<TChangePassAndLogout>(`${BASE_API_URL}/auth/logout`, {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "token": getCookie("refreshToken"),
      }),
    })
}