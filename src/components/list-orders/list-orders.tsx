import styles from './list-orders.module.css';
import { Scrollbars } from 'react-custom-scrollbars';
import CardOrder from '../card-order/card-order';
import { useSelector } from '../../services/hooks/useSelector&Dispatch';
import { useMemo, FC} from 'react';

type TListOrderProps = {
    openModalOrderInfo: () => void;
}
const ListOrders: FC<TListOrderProps> = ({openModalOrderInfo}) => {
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

export default ListOrders