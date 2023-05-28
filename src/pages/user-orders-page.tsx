import { UserOrders } from "../components/user-orders/user-orders";
import { FC } from "react";

type TUserOrdersPageProps ={
    openModalOrderInfo: ()=>void;
}

export const UserOrdersPage: FC<TUserOrdersPageProps> = ({openModalOrderInfo}) => {
    return (
        <UserOrders openModalOrderInfo={openModalOrderInfo}/>
    )
}