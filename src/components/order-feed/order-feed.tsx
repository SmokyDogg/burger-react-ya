import { FC, useEffect } from "react"
import { useDispatch } from '../../services/hooks/useSelector&Dispatch';
import { wsConnectionClosedAllOrders, wsConnectionOpenAllOrders } from "../../services/actions/wsAllOrders"
import ListOrders from "../list-orders/list-orders"
import { WorkOrders } from "../work-orders/work-orders"
import styles from './order-feed.module.css';

type TOrderFeedProps = {
    openModalOrderInfo: () => void;
}

const OrderFeed: FC<TOrderFeedProps> = ({openModalOrderInfo}) => {
    const dispatch = useDispatch();
        useEffect(() => {
        dispatch(wsConnectionOpenAllOrders())
        return () => {
            dispatch(wsConnectionClosedAllOrders())
        }
    }, [dispatch])
    return (
        <section className={`${styles.section}`}>
            <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
            <main className={`${styles.main}`}>
                <ListOrders openModalOrderInfo={openModalOrderInfo}/>
                <WorkOrders/>
            </main>
        </section>
    )
}


export default OrderFeed;