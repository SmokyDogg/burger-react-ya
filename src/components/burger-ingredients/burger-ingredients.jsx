import React, { useContext, useMemo, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import {
    Tab,
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DataContext } from "../../services/dataContext";
import { Scrollbars } from "react-custom-scrollbars";

export const BurgerIngredients = ({openModalIngredient}) => {
    const {ingredients} = useContext(DataContext);
    const [current, setCurrent] = useState('bun');
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
    const tabClick = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth"});
    }

    const currentBun = () => {setCurrent('bun'); tabClick(bunRef);}
    const currentSauce = () => {setCurrent('sauce'); tabClick(sauceRef);}
    const currentMain = () => {setCurrent('main'); tabClick(mainRef);}

    const buns = useMemo(()=> 
        ingredients.filter((ingredient) => ingredient.type === 'bun'), [ingredients, openModalIngredient]);
    const sauces = useMemo(()=> 
        ingredients.filter((ingredient) => ingredient.type === 'sauce'), [ingredients, openModalIngredient]);
    const mains = useMemo(()=> 
        ingredients.filter((ingredient) => ingredient.type === 'main'), [ingredients, openModalIngredient]);
    
        return(
        <section className={`${styles.section}`}> 
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={`${styles.df} mb-10`}>
                <Tab value="bun" active={current === 'bun'} onClick={currentBun}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={currentSauce}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={currentMain}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.containerScroll}`}>
                <Scrollbars universal 
                     renderTrackVertical={props => <div {...props} className={styles.scrollTrack}/>}
                     renderThumbVertical={props => <div {...props} className={styles.scrollThumb}/>}> 
                    <div ref={bunRef} className={`${styles.containerTopping}`}>
                        <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Булки</h2>
                        <div className={`${styles.ingredients} mt-6 ml-4 mr-4 mb-10`}>
                            {   buns.map((ingredient) => (
                                    <div  key={ingredient._id} className={`${styles.ingredient}`} onClick={()=>{openModalIngredient(ingredient)}}>
                                        <Counter count={1} size="default" />
                                        <img src={ingredient.image} alt={ingredient.name}/>
                                        <div className='mt-2 mb-2'>
                                            <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                        <h3 className='text text_type_main-default'>
                                            {ingredient.name}
                                        </h3>
                                    </div>
                                ))
                                
                            }
                        </div>  
                    </div>
                    <div ref={sauceRef} className={`${styles.containerTopping}`}>
                        <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Соусы</h2>
                        <div className={`${styles.ingredients} mt-6 ml-4 mr-4 mb-10`}>
                            {   sauces.map((ingredient) => (
                                    <div  key={ingredient._id} className={`${styles.ingredient}`} onClick={()=>{openModalIngredient(ingredient)}}>
                                        <Counter count={1} size="default" />
                                        <img src={ingredient.image} alt={ingredient.name}/>
                                        <div className='mt-2 mb-2'>
                                            <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                        <h3 className='text text_type_main-default'>
                                            {ingredient.name}
                                        </h3>
                                    </div>
                                ))
                            }
                        </div>  
                    </div>
                    <div ref={mainRef} className={`${styles.containerTopping}`}>
                        <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Начинки</h2>
                        <div className={`${styles.ingredients} mt-6 ml-4 mr-4 mb-10`}>
                            {   mains.map((ingredient) => (
                                    <div  key={ingredient._id} className={`${styles.ingredient}`} onClick={()=>{openModalIngredient(ingredient)}}>
                                        <Counter count={1} size="default" />
                                        <img src={ingredient.image} alt={ingredient.name}/>
                                        <div className='mt-2 mb-2'>
                                            <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                        <h3 className='text text_type_main-default'>
                                            {ingredient.name}
                                        </h3>
                                    </div>
                                ))
                            }
                        </div>  
                    </div>
                </Scrollbars> 
            </div>
        </section>
    );
}
BurgerIngredients.propTypes = {
    openModalIngredient: PropTypes.func.isRequired,
}
export default BurgerIngredients;
