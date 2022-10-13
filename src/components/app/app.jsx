import { useEffect, useState, useReducer, useMemo } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { BASE_API_URL } from "../../utils/constants";
import { DataContext } from "../../services/dataContext";
import { BunContext } from "../../services/bunContext";
import { PriceContext } from "../../services/priceContext";

const priceInitialState = {price: null};
function reducer(state, action){
  switch(action.type){
    case 'counting':
      return {price: action.payload};
    case 'reset': 
      return priceInitialState;
    default: 
      throw new Error(`Type: ${action.type}`)
  }
}

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsError, setingredientsError] = useState('');
  const [bun, setBun] = useState({});
  const [priceState, priceDispatcher] = useReducer(reducer, priceInitialState, undefined);
  const [order, setOrder] = useState(null);
  const [orderError, setOrderError] = useState('');
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  const [openIngredientDetails, setOpenIngredientDetails] = useState(false);
  const [ingredientModal, setIngredientModal] = useState({});

  const checkResponse = (res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  const getIngredientData = () => {
    fetch(`${BASE_API_URL}/ingredients`)
    .then((res) => checkResponse(res))
    .then((resData) => {
      setIngredients(resData.data)})
    .catch(err => {
      setingredientsError(err)})
  }

  const postOrderDetails = (ingredientsIdArray) => {
    fetch(`${BASE_API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ingredients: ingredientsIdArray
      }),
    })
    .then((res) => checkResponse(res))
    .then((resData) => {
      setOrder(resData.order.number)})
    .catch(err => {
      setOrderError(err)})
  }

  useEffect(() => {
    getIngredientData()
  }, [])

  const closeModals = () => {
    setOpenOrderDetails(false);
    setOpenIngredientDetails(false);
  };

  const openModalIngredient = (ingredient) => {
    setIngredientModal(ingredient);
    setOpenIngredientDetails(true);
  };
  const listIngredientId = useMemo(() => ingredients.map((ingredient) => ingredient._id), [ingredients])

  const openModalOrder = () => {
    postOrderDetails(listIngredientId);
    setOpenOrderDetails(true);
  };

  return (
    <div className={styles.app__layout}>
      <AppHeader />
      <main className={styles.main}>
        { (ingredients.length && !ingredientsError) && 
          <DataContext.Provider value={{ingredients}}>
            <BunContext.Provider value={{bun, setBun}}>
              <PriceContext.Provider value={{priceState, priceDispatcher}}>
                <BurgerIngredients openModalIngredient={openModalIngredient}></BurgerIngredients>
                <BurgerConstructor openModalOrder={openModalOrder}></BurgerConstructor>
              </PriceContext.Provider>
            </BunContext.Provider>
          </DataContext.Provider>
        }
        {ingredientsError &&
            <p>Ошибка получения данных с сервера</p>
        }
      </main>
        { (openOrderDetails && order) && (
          <Modal onClose={closeModals} title=''>
            <OrderDetails order={order}/>
          </Modal>
        )}
        { (openOrderDetails && orderError) && (
          <Modal onClose={closeModals} title=''>
            <p>Ошибка получения номера заказа</p>
          </Modal>
        )}
        {openIngredientDetails && (
          <Modal title="Детали ингридиента" onClose={closeModals}>
            <IngredientDetails ingredient={ingredientModal}/>
          </Modal>
        )}
    </div>
  );
};

export default App;
