import styles from "./order-details.module.css";
import done from "../../images/done.png";
import { FC } from 'react';

const OrderDetails: FC<{order: number}> = ({order}) => {
    return (
        <div className={`${styles.container} pb-20 pt-4`}>
            <ul className={`${styles.list_id}`}>
                <li className={`${styles.item} ${styles.order} pb-8`}>
                    <h2 className="text text_type_digits-large">{`${order}`}</h2>
                </li>
                <li className={`${styles.item}`}>
                    <p className={`${styles.id_text} text text_type_main-medium`}>
                        идентификатор заказа
                    </p>
                </li>
                <li className={`${styles.item} pb-15 pt-15`}>
                    <img src={`${done}`} alt="готово" />
                </li>
                <li className={`${styles.item} pb-2`}>
                    <p className={`${styles.id_text} text text_type_main-default`}>
                        Ваш заказ начали готовить
                    </p>
                </li>
                <li className={`${styles.item}`}>
                    <p
                        className={`${styles.id_text} text text_type_main-default text_color_inactive`}
                    >
                        Дождитесь готовности на орбитальной станции
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default OrderDetails;