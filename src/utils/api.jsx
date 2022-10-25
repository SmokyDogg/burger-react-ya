import { BASE_API_URL } from "./constants";

const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(
        new Error(`Ошибка: ${res.status}`)
    )
}
export const getData = async() => {
    return fetch(`${BASE_API_URL}/ingredients`, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
    }).then((res) => {return checkResponse(res)})
}

export const postOrderDetails = async(ingredientsIdArray) => {
    return fetch(`${BASE_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ingredients: ingredientsIdArray,
        })
    })
    .then((res) => checkResponse(res))
}