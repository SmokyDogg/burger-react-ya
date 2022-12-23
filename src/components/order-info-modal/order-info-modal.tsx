import { useLocation, useParams } from "react-router-dom"
import Modal from "../modal/modal"
import { OrderInfo } from "../order-info/order-info";
import { useDispatch, useSelector } from '../../services/hooks/useSelector&Dispatch';
import { FC, useEffect } from 'react';
import { wsConnectionClosedAllOrders, wsConnectionOpenAllOrders } from "../../services/actions/wsAllOrders";
import { wsConnectionClosedUserOrders, wsConnectionOpenUserOrders } from "../../services/actions/wsUserOrders";
import { TLocation } from "../../services/types/data";

type TOrderInfoModalProps = {
    closeModalOrderInfo: () => void;
}

export const OrderInfoModal: FC<TOrderInfoModalProps> = ({closeModalOrderInfo}) =>{
    const {id} = useParams<{id: string}>();
    const location = useLocation<TLocation>();
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
        <Modal header={`#${curOrder?.number}`} styleHeader='text text_type_digits-default' onClose={closeModalOrderInfo}>
			<OrderInfo/>
		</Modal>
    )
}