import React from "react";
import { data } from "../../utils/data";
import styles from './burgerIngredients.module.css'

import {
    Tab,
    Counter,
    CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

const getItems = (data, type) => {
    return (
        <ul className={styles.list_ingredients}>
            {data
                .filter((item) => item.type === type)
                .map((item) => (
                    <li className={styles.card} key={item._id}>
                        <Counter count={1} size="default" />
                        <img src={item.image} />
                        <div className={`${styles.price} mt-2 mb-2`}>
                            <p className="text text_type_digits-default mr-2">{item.price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <h4 className={`${styles.name} text text_type_main-default`}>
                            {item.name}
                        </h4>
                    </li>
                ))
            }
        </ul>
    )
}

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('bun');
    return (
        <section className={styles.ingredients}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={`${styles.tab__bar} mb-10`}>
                <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === "main"} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <ul className={`${styles.list_types} pl-2`}>
                <li>
                    <h3 className="text text_type_main-medium mb-6">Булки</h3>
                    {getItems(data, "bun")}
                </li>
                <li>
                    <h3 className="text text_type_main-medium mt-10 mb-6">Соусы</h3>
                    {getItems(data, "sauce")}
                </li>
                <li>
                    <h3 className="text text_type_main-medium mt-10 mb-6">Начинки</h3>
                    {getItems(data, "main")}
                </li>
            </ul>
        </section>
    )
}

export default BurgerIngredients