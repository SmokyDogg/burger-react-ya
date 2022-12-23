import { useCallback, useMemo } from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbars } from "react-custom-scrollbars";
import uuid from "react-uuid";
import image from "../../images/bun.png";
import {
  ADD_BUN,
  ADD_INGREDIENT,
} from "../../services/actions/currentIngredients";
import { IngredientConstructor } from "../ingredient-constructor/ingredient-constructor";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from '../../services/hooks/useSelector&Dispatch';
import { TIngredient } from "../../services/types/data";
import { FC } from "react";

type TBurgerConstructorProps = {
  openModalOrder: () => void;
};

export const BurgerConstructor: FC<TBurgerConstructorProps> = ({
  openModalOrder,
}) => {
  const ingredients = useSelector(
    (store) => store.currentIngredients.currentIngredients
  );
  const bun = useSelector((store) => store.currentIngredients.currentBun);
  const dispatch = useDispatch();
  const priceCounting = useCallback(() => {
    return (
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((acc, topping) => acc + topping.data.price, 0)
    );
  }, [ingredients, bun]);

  const bunRender = (position: string) => {
    let currentType: "bottom" | "top" | undefined = undefined;
    if (position === "(низ)") {
      currentType = "bottom";
    } else {
      currentType = "top";
    }
    if (bun) {
      return (
        <ConstructorElement
          type={`${currentType}`}
          isLocked={true}
          text={`${bun.name} ${position}`}
          price={bun.price}
          thumbnail={bun.image}
        />
      );
    } else {
      return (
        <ConstructorElement
          type={`${currentType}`}
          isLocked={true}
          text="Булка не выбрана, выберите ее из списка"
          price={0}
          thumbnail={image}
        />
      );
    }
  };
  const isDisabledButton = useMemo<boolean>(() => {
    if (ingredients.length > 0 && bun) return false;
    else return true;
  }, [ingredients, bun]);

  const addBun = (item: TIngredient) => {
    dispatch({ type: ADD_BUN, payload: item });
  };
  const addIngredient = (item: TIngredient) => {
    const updateItem = { ...item, uid: uuid() };
    dispatch({ type: ADD_INGREDIENT, payload: updateItem });
  };

  const [{ isHover }, dropTarget] = useDrop<
    { ingredient: TIngredient },
    void,
    { isHover: boolean }
  >({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      if (item.ingredient.type === "bun") {
        addBun(item.ingredient);
      } else {
        addIngredient(item.ingredient);
      }
    },
  });

  return (
    <section
      className={`${styles.section} ${isHover ? styles.onHover : ""} pt-25`}
      ref={dropTarget}
    >
      <div className="mr-4 ml-4 mb-4 pl-8">{bunRender("(верх)")}</div>
      <div className={`${styles.containerScroll} `}>
        <Scrollbars
          universal
          renderTrackVertical={(props) => (
            <div {...props} className={styles.scrollTrack} />
          )}
          renderThumbVertical={(props) => (
            <div {...props} className={styles.scrollThumb} />
          )}
        >
          {useMemo(
            () =>
              ingredients
                .filter((ingredient) => ingredient.data.type !== "bun")
                .map((ingredient, index) => (
                  <IngredientConstructor
                    key={ingredient.data.uid}
                    ingredient={ingredient}
                    index={index}
                  />
                )),
            [ingredients]
          )}
          {ingredients.length === 0 && (
            <div className={`${styles.ingredient} pl-4 pr-4 pb-4`}>
              <p className="text text_type_main-default pl-10">
                Выберите ингредиенты
              </p>
            </div>
          )}
        </Scrollbars>
      </div>
      <div className="mr-4 ml-4 mt-4 pl-8">{bunRender("(низ)")}</div>
      <div className={`${styles.wrapperPrice} mt-10 mr-4`}>
        <div className={`${styles.containePrice} mr-10`}>
          <p className="text text_type_digits-medium">{priceCounting()}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          disabled={isDisabledButton}
          size="large"
          onClick={openModalOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
