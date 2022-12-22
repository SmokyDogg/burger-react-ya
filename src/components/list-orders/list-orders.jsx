import styles from './list-orders.module.css';
import { Scrollbars } from 'react-custom-scrollbars';
import CardOrder from '../card-order/card-order';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import PropTypes from 'prop-types'

const ListOrders = ({openModalOrderInfo}) => {
    const orders = useSelector(store => store.wsAllOrders.orders);
    return(
        <section className={`${styles.section}`}>
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                    renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                    renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}>
                    {
                        useMemo(()=>
                            orders.map((order)=>(
                                <CardOrder key={order._id} openModalOrderInfo={openModalOrderInfo} status={false} order={order} />
                            )),[orders, openModalOrderInfo])
                    }

                </Scrollbars>
            </div>
        </section>
    )
}
ListOrders.propTypes = {
    openModalOrderInfo: PropTypes.func.isRequired,
};
export default ListOrders