import styles from "./order-info.module.css";
import { Scrollbars } from "react-custom-scrollbars";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useParams } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { statusName } from "../../utils/statusOrder";
import { useCallback, useEffect, useMemo, FC } from "react";
import { useDispatch, useSelector } from '../../services/hooks/useSelector&Dispatch';
import {
  wsConnectionClosedAllOrders,
  wsConnectionOpenAllOrders,
} from "../../services/actions/wsAllOrders";
import {
  wsConnectionClosedUserOrders,
  wsConnectionOpenUserOrders,
} from "../../services/actions/wsUserOrders";
import { TIngredient, TLocation } from "../../services/types/data";

export const OrderInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation<TLocation>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionOpenUserOrders());
    dispatch(wsConnectionOpenAllOrders());
    return () => {
      dispatch(wsConnectionClosedUserOrders());
      dispatch(wsConnectionClosedAllOrders());
    };
  }, [dispatch]);
  let order;
  const wsConnectionAll = useSelector((store) => store.wsAllOrders.wsConnected);
  const wsConnectionUser = useSelector(
    (store) => store.wsUserOrders.wsUserConnected
  );
  const orders = useSelector((store) => store.wsAllOrders.orders);
  const userOrders = useSelector((store) => store.wsUserOrders.userOrders);
  if (wsConnectionAll && wsConnectionUser) {
    if (orders?.find((el) => el._id === id)) {
      order = orders?.find((el) => el._id === id);
    } else if (userOrders?.find((el) => el._id === id)) {
      order = userOrders?.find((el) => el._id === id);
    }
  } else if (wsConnectionAll) {
    order = orders?.find((el) => el._id === id);
  } else if (wsConnectionUser) {
    order = userOrders?.find((el) => el._id === id);
  }

  const orderIngredients = order?.ingredients;
  const allIngredients = useSelector(
    (store) => store.listIngredients.ingredients
  );

  const filterIngredients = useMemo(() => {
    return orderIngredients?.map((ingredient) => {
      return allIngredients.find((ingr) => ingredient === ingr._id);
    });
  }, [orderIngredients, allIngredients]);

  const arrayIngredients = useMemo(() => {
    return filterIngredients?.map((el) => {
      return el;
    });
  }, [filterIngredients]);

  const validIngredients = useMemo(() => {
    const valideArr: Array<TIngredient> = [];
    arrayIngredients?.forEach((ingredient) => {
      if (ingredient) {
        valideArr.push(ingredient);
      }
    });
    return valideArr;
  }, [arrayIngredients]);

  const amountIngredient = useCallback(
    (ingredient: TIngredient) => {
      let amount = 0;
      validIngredients?.forEach((ingr) => {
        if (ingr._id === ingredient._id) {
          amount++;
        }
      });
      return amount;
    },
    [validIngredients]
  );

  const isIngredient = (
    arr: Array<{ data: TIngredient }>,
    ingredient: TIngredient
  ) => {
    return arr?.some((obj) => obj.data._id === ingredient._id);
  };

  const arrayIngredientsAndAmount = useMemo(() => {
    const newArr: Array<{ data: TIngredient; amount: number }> = [];
    validIngredients?.forEach((ingredient) => {
      if (!isIngredient(newArr, ingredient)) {
        newArr.push({ data: ingredient, amount: amountIngredient(ingredient) });
      }
    });
    return newArr;
  }, [validIngredients, amountIngredient]);

  const totalPrice = useCallback(() => {
    return validIngredients?.reduce((acc, ingr) => acc + ingr.price, 0);
  }, [validIngredients]);
  return (
    <>
      {order && (
        <div className={`${styles.section}`}>
          {!location.state && (
            <h1
              className={`${styles.number} text text_type_digits-default`}
            >{`#${order.number}`}</h1>
          )}
          <h2 className="text text_type_main-medium mt-10 mb-3">
            {order.name}
          </h2>
          <p
            className={`${
              order.status === "done" ? styles.doneColor : ""
            } text text_type_main-default`}
          >
            {statusName(order.status)}
          </p>
          <h3 className="text text_type_main-medium mb-6 mt-15">Состав:</h3>
          <div className={`${styles.containerScroll}`}>
            <Scrollbars
              universal
              renderTrackVertical={(props) => (
                <div {...props} className={styles.scrollTrack} />
              )}
              renderThumbVertical={(props) => (
                <div {...props} className={styles.scrollThumb} />
              )}
            >
              {arrayIngredientsAndAmount &&
                arrayIngredientsAndAmount.map((ingredient) => (
                  <div
                    key={ingredient.data._id}
                    className={`${styles.ingredient} mr-8`}
                  >
                    <div className={`${styles.wrapper}`}>
                      <img
                        className={`${styles.image}`}
                        src={ingredient.data.image}
                        alt={`${ingredient.data.name}`}
                      />
                      <p className="text text_type_main-default ml-4 mr-4">{`${ingredient.data.name}`}</p>
                    </div>
                    <div className={`${styles.total}`}>
                      <p
                        className={`${styles.cost} text text_type_digits-default`}
                      >{`${ingredient.amount} x ${ingredient.data.price}`}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                ))}
            </Scrollbars>
          </div>
          <div className={`${styles.info} mt-10`}>
            <p className="text text_type_main-default text_color_inactive">
              {formatDate(order.createdAt)}
            </p>
            <div className={`${styles.total}`}>
              <p className={`${styles.cost} text text_type_digits-default`}>
                {totalPrice()}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
