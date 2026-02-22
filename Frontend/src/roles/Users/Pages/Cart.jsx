import { useSelector } from "react-redux";
import { selectAllCartItems } from "../Features/cartSlice";
import EmptyCart from "../Components/Cart/EmptyCart";
import ItemRow from "../Components/Cart/ItemRow";
import OrderSummary from "../Components/Cart/OrderSummary";

function Cart() {
  const cartItems = useSelector(selectAllCartItems);
  if (cartItems?.length <= 0) return <EmptyCart />;

  return (
    <div className="container px-6 lg:px-20 py-12">
      <h1 className="text-3xl font-bold mb-8">
        السلة {`(${cartItems.length})`}
      </h1>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {cartItems.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
        <OrderSummary />
      </section>
    </div>
  );
}

export default Cart;
