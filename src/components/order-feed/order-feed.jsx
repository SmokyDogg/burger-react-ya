import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { wsConnectionClosedAllOrders, wsConnectionOpenAllOrders } from "../../services/actions/wsAllOrders"
import ListOrders from "../list-orders/list-orders"
import { WorkOrders } from "../work-orders/work-orders"
import styles from './order-feed.module.css';
import PropTypes from 'prop-types';

const OrderFeed = ({openModalOrderInfo}) => {
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
OrderFeed.propTypes = {
    openModalOrderInfo: PropTypes.func.isRequired,
};

export default OrderFeed;