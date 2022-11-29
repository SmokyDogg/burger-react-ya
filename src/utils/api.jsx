import { BASE_API_URL } from "./constants";
import {getCookie} from './cookie';

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`Ошибка: ${res.status}`)
    );
  };

  export const getData = async() => {
    return fetch(`${BASE_API_URL}/ingredients`, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    }).then((res) => {return checkResponse(res)});
  };

  export const postOrderDetails = async(ingridientsIdArray) => {
    return fetch(`${BASE_API_URL}/orders`, {
      method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken')},
        body: JSON.stringify({
            ingredients: ingridientsIdArray,
        }),
    })
    .then((res)=>checkResponse(res))
  }

  export const autorizationUser = async(email, password) =>{
    return fetch (`${BASE_API_URL}/auth/login`, {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'email': email,
            'password': password
        }),
      })
      .then((res)=>checkResponse(res))
  }

  export const registrationUser = async(email, password, name) =>{
    return fetch (`${BASE_API_URL}/auth/register`, {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'email': email,
            'password': password,
            'name': name
        }),
      })
      .then((res)=>checkResponse(res))
  }

  export const getAuthToken = async() =>{
    return fetch (`${BASE_API_URL}/auth/token`, {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "token": getCookie("refreshToken"),
        }),
      })
      .then((res)=>checkResponse(res))
  }

  export const forgotPassword = async(email) =>{
    return fetch (`${BASE_API_URL}/password-reset`, {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'email': email,
        }),
      })
      .then((res)=>checkResponse(res))
  }

  export const resetPassword = async(password, token) =>{
    return fetch (`${BASE_API_URL}/password-reset/reset`, {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'password': password,
            'token': token
        }),
      })
      .then((res)=>checkResponse(res))
  }

  export const getUserData = async() =>{
    return fetch (`${BASE_API_URL}/auth/user`, {
      method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
        
      })
      .then((res)=>checkResponse(res))
  }

  export const updateUserData = async(name, email, password) =>{
    return fetch (`${BASE_API_URL}/auth/user`, {
      method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getCookie('authToken') },
        body: JSON.stringify({
          'name': name,
          'email': email,
          'password': password,
      }),
      })
      .then((res)=>checkResponse(res))
  }

  export const logOut = async() => {
    return fetch(`${BASE_API_URL}/auth/logout`, {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "token": getCookie("refreshToken"),
        }),
      })
      .then((res)=>checkResponse(res))
  }