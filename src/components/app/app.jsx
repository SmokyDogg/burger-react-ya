import React from "react";
import { ReactDOM } from "react-dom";
import styles from './app.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";

const App = () => {
    return (
        <div className={styles.app__layout}>
            <AppHeader/>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </div>
    )
}

export default App