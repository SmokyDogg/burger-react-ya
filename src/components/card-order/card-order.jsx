import styles from './card-order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { formatDate } from '../../utils/formatDate';
import { statusName } from '../../utils/statusOrder';
import PropTypes from 'prop-types';
import { orderType } from '../../utils/types';
import uuid from 'react-uuid';

const CardOrder = ({openModalOrderInfo, status, order}) => {
    const location = useLocation();
    const orderIngredients = order.ingredients;
    const allIngredients = useSelector(store => store.listIngredients.ingredients);

    const filterIngredients = useMemo(() => {
        return orderIngredients.map((ingredient) => {
            return allIngredients.find((ingr) => ingredient === ingr._id)
        })
    }, [orderIngredients, allIngredients]);
    const arrayIngredients = useMemo(() => {
        return filterIngredients.map((el) => {return el})
    }, [filterIngredients]);
    const validIngredients = useMemo(() => {
        const valideArr = [];
        arrayIngredients.forEach((ingredient) => {
        if(ingredient){
            valideArr.push({...ingredient, key: uuid()})
        }
        })
        return valideArr;
    }, [arrayIngredients]);

    let isVisibleCounter = false;
    let deltaCounter = 0;

    const visibleIngredients = useMemo(() => {
        if(validIngredients.length > 6){
            deltaCounter = validIngredients.length - 6;
            isVisibleCounter = true;
            return validIngredients.splice(0,6);
        }
        else{
            return validIngredients
        }
    }, [validIngredients])

    const totalPrice = useCallback(() => {
        return (validIngredients.reduce((acc, ingr) => acc + ingr.price, 0));
    }, [validIngredients]);

    return (
        <Link className={`${styles.link}`} to={{
            pathname: `${location.pathname}/${order._id}`,
            state: { background: location }
        }}>
        <div className={`${styles.order} p-6 mr-4`} onClick={() => {openModalOrderInfo()}}>
            <div className={`${styles.serviceInfo} mb-6`}>
                <p className={`${styles.number} text text_type_digits-default`}>{`#${order.number}`}</p>
                <p className={`${styles.data} text text_type_main-default text_color_inactive`}>{formatDate(order.createdAt)}</p>
            </div>
            <h2 className={`${styles.name} text text_type_main-medium`}>{order.name}</h2>
            {status && <p className={`${order.status === 'done' ? styles.doneColor : ''} text text_type_main-default mt-2`}>{statusName(order.status)}</p>}
            <div className={`${styles.detailInfo} mt-6`}>
                <div className={`${styles.ingredients} mr-6`}>
                    { visibleIngredients &&
                        visibleIngredients.map((ingredient)=>(
                            <img key={ingredient.key} className={`${styles.ingredient}`} src={ingredient.image} alt={`${ingredient.name}`}/>))
                    }
                    {isVisibleCounter &&
                        <div className={`${styles.counter}`}>
                            <p className={`${styles.textCounter} text text_type_main-default`}>{`+${deltaCounter}`}</p>
                        </div>
                    }                                                                  
                </div>
                <div className={`${styles.total}`}>
                    <p className={`${styles.cost} text text_type_digits-default`}>{totalPrice()}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
        </Link>
    )
}
CardOrder.propTypes = {
    openModalOrderInfo: PropTypes.func.isRequired,
    status: PropTypes.bool.isRequired,
    order: orderType.isRequired,
};

export default CardOrder;