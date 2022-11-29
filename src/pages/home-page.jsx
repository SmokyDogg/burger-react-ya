import {BurgerConstructor} from '../components/burger-constructor/burger-constructor';
import {BurgerIngredients} from '../components/burger-ingredients/burger-ingredients';
import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PropTypes from "prop-types";

export function HomePage({openModalIngredient,openModalOrder}) {
	const ingredientsRequest = useSelector(store=>store.listIngredients.ingredientsRequest);
	const ingredientsFailed = useSelector(store=>store.listIngredients.ingredientsFailed);
  	return (
        <>
		{ (!ingredientsRequest && !ingredientsFailed) &&
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients openModalIngredient={openModalIngredient}></BurgerIngredients>
					<BurgerConstructor openModalOrder={openModalOrder}></BurgerConstructor>
				</DndProvider>
		}
		{ingredientsFailed &&
					<p>Ошибка получения данных с сервера</p>
		}
        </>
  	);
}
HomePage.propTypes = {
    openModalOrder: PropTypes.func.isRequired,
    openModalIngredient: PropTypes.func.isRequired,
};