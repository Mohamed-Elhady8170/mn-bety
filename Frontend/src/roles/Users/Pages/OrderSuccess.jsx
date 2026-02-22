import TrusMsg from "../Components/orderSuccess/TrusMsg";
import OrderActionsBtns from "../Components/orderSuccess/OrderActionsBtns";
import SuccessSummary from "../Components/orderSuccess/SuccessSummary";
import OrderInfo from "../Components/orderSuccess/OrderInfo";
import SuccessMsg from "../Components/orderSuccess/SuccessMsg";
import OrderItem from "../Components/orderSuccess/OrderItem";

function OrderSuccess() {
  const cartItems = JSON.parse(localStorage.getItem("mn-bety-cart")) || [];

  return (
    <div className="order-success-page container py-5">
      <section>
        <SuccessMsg />
        <OrderInfo />
        <SuccessSummary>
          {cartItems.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </SuccessSummary>
        <OrderActionsBtns />
        <TrusMsg />
      </section>
    </div>
  );
}

export default OrderSuccess;
