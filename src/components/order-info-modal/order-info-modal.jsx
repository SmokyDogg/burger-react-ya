import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom"
import Modal from "../modal/modal"
import { OrderInfo } from "../order-info/order-info";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { wsConnectionClosedAllOrders, wsConnectionOpenAllOrders } from "../../services/actions/wsAllOrders";
import { wsConnectionClosedUserOrders, wsConnectionOpenUserOrders } from "../../services/actions/wsUserOrders";

export const OrderInfoModal = ({closeModalOrderInfo}) =>{
    const {id} = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(wsConnectionOpenUserOrders())
        dispatch(wsConnectionOpenAllOrders())
        return () => {
            dispatch(wsConnectionClosedUserOrders())
            dispatch(wsConnectionClosedAllOrders())
        }
    }, [dispatch])
    let curOrder;
    const orders = useSelector(store=>store.wsAllOrders.orders);
    const userOrders = useSelector(store=>store.wsUserOrders.userOrders);
    if(location.state.background.pathname === '/feed'){
        curOrder = orders.find((el)=>el._id === id) 
    }
    else{
        curOrder = userOrders.find((el)=>el._id === id)
    }
    return (
        <Modal header={`#${curOrder?.number}`} styleTitle='text text_type_digits-default' onClose={closeModalOrderInfo}>
			<OrderInfo/>
		</Modal>
    )
}
OrderInfoModal.propTypes = {
    closeModalOrderInfo: PropTypes.func.isRequired,
};