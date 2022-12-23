import {BurgerConstructor} from '../components/burger-constructor/burger-constructor';
import {BurgerIngredients} from '../components/burger-ingredients/burger-ingredients';
import { useSelector } from '../services/hooks/useSelector&Dispatch';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TIngredient } from '../services/types/data';
import { FC } from 'react'

type THomePageProps = {
	openModalIngredient: (ingredient: TIngredient)=>void;
	openModalOrder: ()=>void;
}

export const HomePage: FC<THomePageProps> = ({openModalIngredient,openModalOrder}) => {
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