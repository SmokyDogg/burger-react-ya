import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientsLink } from "../../utils/constants";
import Modal from "../modal/modal";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientModal, setIngredientModal] = useState({});
  const [status, setDownloadStatus] = useState({
    isLoading: true,
    hasError: false,
    error: "",
  });
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const [openIngredientDetails, setOpenIngredientDetails] = useState(false);

  const apiRequest = async () => {
    const res = await fetch(`${ingredientsLink.url}`);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
  };

  const closeModals = () => {
    setOpenOrderDetails(false);
    setOpenIngredientDetails(false);
  };

  const openModalIngredient = (ingredient) => {
    setIngredientModal(ingredient);
    setOpenIngredientDetails(true);
  };

  const openModalOrder = () => {
    setOpenOrderDetails(true);
  };

  const getProductData = () => {
    apiRequest()
      .then((res) => {
        setIngredients(res.data);
        setDownloadStatus({
          ...status,
          isLoading: false,
        });
      })
      .catch((err) => {
        setDownloadStatus({
          ...status,
          isLoading: false,
          hasError: true,
          error: err,
        });
      });
  };
  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className={styles.app__layout}>
      <AppHeader />
      <main className={styles.main}>
        {status.hasError && <p>Ошибка получения данных с сервера</p>}
        {ingredients.length && !status.hasError && (
          <BurgerIngredients
            data={ingredients}
            openModalIngredient={openModalIngredient}
          />
        )}
        {ingredients.length && !status.hasError && (
          <BurgerConstructor
            data={ingredients}
            openModalOrder={openModalOrder}
          />
        )}
      </main>
      {openIngredientDetails && (
        <Modal header="Детали ингредиента" onClose={closeModals}>
          <IngredientDetails ingredient={ingredientModal} />
        </Modal>
      )}
      {openOrderDetails && (
        <Modal onClose={closeModals} header="">
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default App;
