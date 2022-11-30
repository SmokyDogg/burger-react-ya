import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { getOrder } from "../../services/actions/order";
import { getIngredients } from "../../services/actions/listIngredients";
import { CLEAR_INGREDIENT, GET_INGREDIENT } from "../../services/actions/ingredients";
import { HomePage } from "../../pages/home-page";
import { IngredientPage } from "../../pages/ingredient-page";
import { LoginPage } from "../../pages/login-page";
import { NotFound404Page } from "../../pages/not-found404-page";
import { UserOrdersPage } from "../../pages/user-orders-page";
import { OrderFeedPage } from "../../pages/order-feed-page";
import { ProfilePage } from "../../pages/profile-page";
import { RegisterPage } from "../../pages/register-page";
import { RepairPasswordPage } from "../../pages/repair-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page";
import { exit, getUser, updateToken } from "../../services/actions/user";
import { deleteCookie, getCookie } from "../../utils/cookie";
import { ProtectedRoute } from "../protected-route/protected-route";
import { OrderInfoPage } from "../../pages/order-info-page";
import { CLOSE_MODAL, OPEN_MODAL } from "../../services/actions/modal";
import { OrderInfoModal } from "../order-info-modal/order-info-modal";

const App = () => {
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
  const authToken = getCookie('authToken');
  const refreshToken = getCookie('refreshToken');
  const userFailed = useSelector(store => store.user.userFailed);
  const expiredToken = useSelector(store => store.user.expiredToken);
  const tokenFailed = useSelector(store => store.user.tokenFailed);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if(expiredToken && !tokenFailed){
      dispatch(updateToken());
    }
    if(expiredToken && tokenFailed){
      dispatch(exit());
      deleteCookie('authToken');
      deleteCookie('refreshToken')
    }
    if(userFailed && !expiredToken){
      dispatch(getUser())
    }
  }, [dispatch, expiredToken, userFailed]);

  useEffect(() => {
    if(!user && authToken && refreshToken) {
      dispatch(getUser())
    }
  }, [dispatch, user, authToken, refreshToken]);

  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state?.background;
  const order = useSelector(store => store.order.order);
  const orderRequest = useSelector(store => store.order.orderRequest);
  const orderFailed = useSelector(store => store.order.orderFailed);
  const isOpenModal = useSelector(store => store.modal.isOpened)

  const currentIngredients = useSelector(store => store.currentIngredients.currentIngredients);
  const currentBun = useSelector(store => store.currentIngredients.currentBun);

  const openModalIngredient = (ingredient) => {
    dispatch({type: GET_INGREDIENT, payload: ingredient});
    dispatch({type: OPEN_MODAL})
  }

  const closeModalIngredient = () => {
    dispatch({type: CLEAR_INGREDIENT})
    dispatch({type: CLOSE_MODAL});
    history.replace('/')
  }

  const getIdIngredients = useCallback(() => {
    return currentIngredients.map((ingredient) => ingredient.data._id).concat(currentBun._id).concat(currentBun._id).reverse()
  }, [currentBun, currentIngredients])

  const openModalOrder = () => {
    if(user){
      dispatch(getOrder(getIdIngredients()))
      dispatch({type: OPEN_MODAL})
    }
    else {
      history.push('/login')
    }
  }
  const closeModalOrder = () => {
    dispatch({type: CLOSE_MODAL})
    history.goBack()
  }

  const openModalOrderInfo = () => {
    dispatch({type: OPEN_MODAL})
  }
  const closeModalOrderInfo = () => {
    dispatch({type: CLOSE_MODAL});
    history.goBack()
  }


  return (
    <div className={styles.app_layout}>
			<AppHeader/>
			<main className={styles.main}>
			<Switch location={background || location}>
				<Route exact path="/login">
					<LoginPage />
				</Route>
				<Route exact path='/register'>
					<RegisterPage />
				</Route>
				<Route exact path='/forgot-password'>
					<RepairPasswordPage />
				</Route>
				<Route exact path='/reset-password'>
					<ResetPasswordPage/>
				</Route>
				<ProtectedRoute exact path='/profile'>
					<ProfilePage/>
				</ProtectedRoute>
        <Route exact path='/profile/orders'>
					<UserOrdersPage openModalOrderInfo={openModalOrderInfo}/>
				</Route>
        <Route exact path='/profile/orders/:id'>
					<div className="mt-30">
						<OrderInfoPage/>
					</div>
				</Route>
				<Route exact path='/ingredients/:id'>
					<IngredientPage />
				</Route>
        <Route exact path='/feed'>
					<OrderFeedPage openModalOrderInfo={openModalOrderInfo}/>
				</Route>
        <Route exact path='/feed/:id'>
					<div className="mt-30">
						<OrderInfoPage/>
					</div>
				</Route>
				<Route exact path="/">
					<HomePage openModalIngredient={openModalIngredient} openModalOrder={openModalOrder}/>
				</Route>
				<Route>
					<NotFound404Page/>
				</Route>
			</Switch>
			{background &&
        <Switch>
          <Route exact path="/ingredients/:id">
            <Modal header="Детали ингредиента" onClose={closeModalIngredient}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route exact path='/feed/:id'>
            <OrderInfoModal closeModalOrderInfo={closeModalOrderInfo}/>
          </Route>
          <Route exact path='/profile/orders/:id'>
            <OrderInfoModal closeModalOrderInfo={closeModalOrderInfo}/>
          </Route>
        </Switch>
			}
			{order && !orderRequest && isOpenModal &&
				<Modal onClose={closeModalOrder} header="">
					<OrderDetails order={order}/>
				</Modal>
			}
			{orderFailed && isOpenModal && 
				<Modal onClose={closeModalOrder} header="">
					<p>Ошибка получения номера заказа</p>
				</Modal>
			}
		</main>
	</div>
  )
};
export default App;
