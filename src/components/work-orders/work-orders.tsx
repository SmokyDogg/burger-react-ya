import { FC, useMemo } from 'react';
import { useSelector } from '../../services/hooks/useSelector&Dispatch';
import styles from './work-orders.module.css'
export const WorkOrders: FC = () =>{
    const orders = useSelector(store=>store.wsAllOrders.orders);
    const total = useSelector(store=>store.wsAllOrders.total);
    const totalToday = useSelector(store=>store.wsAllOrders.totalToday);
    const statusDone = orders.filter(order=>order.status === 'done').slice(0,10);
    const statusWait = orders.filter(order=>order.status !== 'done').slice(0,10);
    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.ordersList} mb-15`}>
                <div className={`${styles.readyOrders} mr-9`}>
                    <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Готовы:</h2>
                        <ul className={`${styles.list}`}>
                            {
                                useMemo(()=>
                                statusDone.map(order=>(
                                    <li key={order._id} className={`${styles.item} text text_type_digits-default`}>{order.number}</li>
                                )),[statusDone])
                            }                    
                        </ul>
                </div>
                <div className={`${styles.inWorkOrders}`}>
                    <h2 className={`${styles.title} text text_type_main-medium mb-6`}>В работе:</h2>
                        <ul className={`${styles.list}`}>
                            {
                                useMemo(()=>
                                statusWait.map(order=>(
                                    <li key={order._id} className={`${styles.item} text text_type_digits-default`}>{order.number}</li>
                                )),[statusWait])
                            }  
                        </ul>
                </div>
            </div>
            <h2 className={`${styles.title} text text_type_main-medium`}>Выполнено за все время:</h2>
            <p className={`${styles.count} text text_type_digits-large mb-15`}>{total}</p>
            <h2 className={`${styles.title} text text_type_main-medium`}>Выполнено за сегодня:</h2>
            <p className={`${styles.count} text text_type_digits-large`}>{totalToday}</p>
        </div>
    )
}