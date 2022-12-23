import OrderFeed from "../components/order-feed/order-feed";
import { FC } from "react";

type TOrderFeedPageProps = {
    openModalOrderInfo: ()=>void;
}
export const OrderFeedPage:FC<TOrderFeedPageProps> = ({openModalOrderInfo}) => {
    return (
        <OrderFeed openModalOrderInfo={openModalOrderInfo}/>
    )
}