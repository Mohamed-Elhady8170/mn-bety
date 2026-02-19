import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";

function EmptyCart() {
  return (
    <section className="empty-cart container flex-center flex-col py-20">
      <div className="w-24 h-24 bg-beige-soft rounded-full flex-center mb-6">
        <span className="text-4xl text-clay">
          <AiOutlineShopping />
        </span>
      </div>
      <h2 className="text-2xl mb-4">Your cart is empty</h2>
      <p className="text-clay mb-8">
        Looks like you haven't added any unique pieces yet.
      </p>
      <Link to="/products">
        <button className="btn btn-primary">Start Shopping</button>
      </Link>
    </section>
  );
}

export default EmptyCart;
