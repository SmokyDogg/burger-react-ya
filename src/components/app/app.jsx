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
import { CLOSE_MODAL, OPEN_MODAL } from "../../services/actions/ingredients";
import { HomePage } from "../../pages/home-page";
import { IngredientPage } from "../../pages/ingredient-page";
import { LoginPage } from "../../pages/login-page";
import { NotFound404Page } from "../../pages/not-found404-page";
import { ProfilePage } from "../../pages/profile-page";
import { RegisterPage } from "../../pages/register-page";
import { RepairPasswordPage } from "../../pages/repair-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page";
import { exit, getUser, updateToken } from "../../services/actions/user";
import { deleteCookie, getCookie } from "../../utils/cookie";
import { ProtectedRoute } from "../protected-route/protected-route";


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
  const currentIngredients = useSelector(store => store.currentIngredients.currentIngredients);
  const currentBun = useSelector(store => store.currentIngredients.currentBun);

  const openModalIngredient = (ingredient) => {
    dispatch({type: OPEN_MODAL, payload: ingredient})
  }

  const getIdIngredients = useCallback(() => {
    return currentIngredients.map((ingredient) => ingredient._id).concat(currentBun._id)
  }, [currentBun, currentIngredients])

  const openModalOrder = () => {
    if(user){
      dispatch(getOrder(getIdIngredients()))
      setShowOrderDetails(true)
    }
    else {
      history.push('/login')
    }
  }
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const closeModalIngredient = () => {
    dispatch({type: CLOSE_MODAL});
    history.replace('/')
  }
  
  const closeModalOrder = () => {
    setShowOrderDetails(false);
    history.replace('/')
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
				<Route exact path='/ingredients/:id'>
					<IngredientPage />
				</Route>
				<Route exact path="/">
					<HomePage openModalIngredient={openModalIngredient} openModalOrder={openModalOrder}/>
				</Route>
				<Route>
					<NotFound404Page/>
				</Route>
			</Switch>
			{background &&
				<Route exact path="/ingredients/:id">
					<Modal header="Детали ингредиента" onClose={closeModalIngredient}>
						<IngredientDetails />
					</Modal>
				</Route>
			}
			{ (showOrderDetails && order && !orderRequest) && (
				<Modal onClose={closeModalOrder} header="">
					<OrderDetails order={order}/>
				</Modal>
			)}
			{ (showOrderDetails && !order && !orderRequest) && (
				<Modal onClose={closeModalOrder} header="">
					<p>Ошибка получения номера заказа</p>
				</Modal>
			)}
		</main>
	</div>
  )
};
export default App;
