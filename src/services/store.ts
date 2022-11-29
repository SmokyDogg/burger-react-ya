import { rootReducer } from '../services/reducers/index';
import { compose, applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { ALL_ORDER_WS_CONNECTION_START,
    ALL_ORDER_WS_CONNECTION_SUCCESS,
    ALL_ORDER_WS_CONNECTION_ERROR,
    ALL_ORDER_WS_CONNECTION_CLOSED,
    ALL_ORDER_WS_GET_MESSAGE,
    ALL_ORDER_WS_SEND_MESSAGE } from './actions/wsAllOrders';
import { USER_ORDER_WS_CONNECTION_START,
        USER_ORDER_WS_CONNECTION_SUCCESS,
        USER_ORDER_WS_CONNECTION_ERROR,
        USER_ORDER_WS_CONNECTION_CLOSED,
        USER_ORDER_WS_GET_MESSAGE,
        USER_ORDER_WS_SEND_MESSAGE } from './actions/wsUserOrders';
import { socketMiddleware } from './middleware/socketMiddleware';
import { WS_BASE_URL } from '../utils/constants';
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const wsAllOrdersActions = {
    wsInit: ALL_ORDER_WS_CONNECTION_START, 
    wsSendMessage: ALL_ORDER_WS_SEND_MESSAGE, 
    onOpen: ALL_ORDER_WS_CONNECTION_SUCCESS, 
    onClose :ALL_ORDER_WS_CONNECTION_CLOSED, 
    onError: ALL_ORDER_WS_CONNECTION_ERROR, 
    onMessage: ALL_ORDER_WS_GET_MESSAGE
}
const wsUserOrdersActions = {
    wsInitUser: USER_ORDER_WS_CONNECTION_START, 
    wsSendMessage: USER_ORDER_WS_SEND_MESSAGE, 
    onOpen: USER_ORDER_WS_CONNECTION_SUCCESS, 
    onClose :USER_ORDER_WS_CONNECTION_CLOSED, 
    onError: USER_ORDER_WS_CONNECTION_ERROR, 
    onMessage: USER_ORDER_WS_GET_MESSAGE
}
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(`${WS_BASE_URL}/orders/all`, wsAllOrdersActions), socketMiddleware(`${WS_BASE_URL}/orders`, wsUserOrdersActions)));     
export const store = createStore(rootReducer, enhancer); 