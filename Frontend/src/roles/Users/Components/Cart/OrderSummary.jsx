import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTotalCartPrice } from "../../Features/cartSlice";

function OrderSummary() {
  const totalPrice = useSelector(selectTotalCartPrice);
  
  return (
    <div className="lg:col-span-4 h-fit sticky top-28">
      <div className="bg-bg-subtle p-6 rounded-2xl">
        <h3 className="font-bold text-xl mb-6">Order Summary</h3>
        <div className="flex-between mb-4 text-clay">
          <span>Subtotal</span>
          <span>{totalPrice} $</span>
        </div>
        <div className="flex-between mb-4 text-clay">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="border-t border-clay/20 my-4"></div>
        <div className="flex-between mb-8 font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">{totalPrice}</span>
        </div>
        <Link to="./order-success" replace>
          <button className="btn btn-primary w-full h-12">Checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSummary;
