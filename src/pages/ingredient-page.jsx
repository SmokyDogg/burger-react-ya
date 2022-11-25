import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from './ingredient-page.module.css'
export function IngredientPage() {
    return (
        <div className='pt-30'>
            <h1 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h1>
            <IngredientDetails/>
        </div>
        
    )
}