import OrderFeed from "../components/order-feed/order-feed";
import PropTypes from "prop-types";

export function OrderFeedPage({openModalOrderInfo}) {
    return (
        <OrderFeed openModalOrderInfo={openModalOrderInfo}/>
    )
}
OrderFeedPage.propTypes = {
    openModalOrderInfo: PropTypes.func.isRequired,
};