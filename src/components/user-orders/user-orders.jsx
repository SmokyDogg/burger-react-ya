import styles from './user-orders.module.css'
import { Scrollbars } from 'react-custom-scrollbars'
import CardOrder from '../card-order/card-order';
import NavProfile from '../nav-profile/nav-profile';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { wsConnectionClosedUserOrders, wsConnectionOpenUserOrders } from '../../services/actions/wsUserOrders';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";

export const UserOrders = ({openModalOrderInfo}) =>{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(wsConnectionOpenUserOrders())
        return () => {
            dispatch(wsConnectionClosedUserOrders())
        }
    }, [dispatch])
    const orders = useSelector(store=>store.wsUserOrders.userOrders);
    return (
        <section className={`${styles.container}`}>
            <div className={`${styles.nav}`}>
                <NavProfile/>
            </div>
            
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                    renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                    renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}>
                    {
                        useMemo(()=>
                            orders?.map((order)=>(
                                <CardOrder key={order._id} openModalOrderInfo={openModalOrderInfo} order={order} status={true}/>
                            )).reverse(),[orders, openModalOrderInfo])
                    }
                    {
                        orders?.length === 0 && 
                            <p className='text text_type_main-default pl-10'>Нет заказов</p>
                        
                    }                    
                    
                </Scrollbars>
            </div>
        </section>
    )
}
UserOrders.propTypes = {
    openModalOrderInfo: PropTypes.func.isRequired,
};