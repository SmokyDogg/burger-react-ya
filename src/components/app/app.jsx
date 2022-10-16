import { useEffect, useState, useCallback } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { getOrder } from "../../services/actions/order";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/listIngredients";
import { CLOSE_MODAL, OPEN_MODAL } from "../../services/actions/ingredients";

const App = () => {
  const ingredientsRequest = useSelector((store) => store.listIngredients.ingredientsRequest);
  const ingredientsFailed = useSelector((store) => store.listIngredients.ingredientsFailed);
  const order = useSelector((store) => store.order.order);
  const orderRequest = useSelector((store) => store.order.orderRequest);
  const currentIngredient = useSelector((store) => store.ingredient.currentIngredient);
  const currentIngredients = useSelector((store) => store.currentIngredients.currentIngredients);
  const currentBun = useSelector((store) => store.currentIngredients.currentBun);
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeModalIngredient = () => {
    dispatch({ type: CLOSE_MODAL });
  };
  const closeModalOrder = () => {
    setOpenOrderDetails(false);
  };

  const openModalIngredient = (ingredient) => {
    dispatch({ type: OPEN_MODAL, payload: ingredient });
  };
  const getIdIngredients = useCallback(() => {
    return currentIngredients
      .map((ingredient) => ingredient._id)
      .concat(currentBun._id);
  }, [currentBun, currentIngredients]);
  const openModalOrder = () => {
    dispatch(getOrder(getIdIngredients));
    setOpenOrderDetails(true);
  };

  return (
    <div className={styles.app__layout}>
      <AppHeader />
      { (!ingredientsRequest && !ingredientsFailed) &&
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients openModalIngredient={openModalIngredient}></BurgerIngredients> 
            <BurgerConstructor openModalOrder={openModalOrder}></BurgerConstructor>
          </DndProvider>
        </main>
      }
      {ingredientsFailed && 
        <p>Ошибка получения данных с сервера</p>
      }
      { (openOrderDetails && order && !orderRequest) && (
          <Modal onClose={closeModalOrder} title="">
            <OrderDetails order={order} />
          </Modal>
      )}
      {(openOrderDetails && order && !orderRequest) && (
        <Modal onClose={closeModalOrder} title="">
          <p>Ошибка получения номера заказа</p>
        </Modal>
      )}
      {currentIngredient && (
        <Modal title="Детали ингридиента" onClose={closeModalIngredient}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </div>
  );
};

export default App;
