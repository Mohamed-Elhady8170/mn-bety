import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectAllCartItems, selectCartLoading, fetchCart } from "../Features/cartSlice"; 
import EmptyCart from "../Components/Cart/EmptyCart";
import ItemRow from "../Components/Cart/ItemRow";
import OrderSummary from "../Components/Cart/OrderSummary";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectAllCartItems);
  const isLoading = useSelector(selectCartLoading); 
  
  useEffect(() => {
    dispatch(fetchCart()); 
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-primary animate-pulse">جاري تحميل السلة...</h2>
      </div>
    );
  }

  if (!cartItems || cartItems.length <= 0) return <EmptyCart />;

  return (
    <div className="layout-container py-12" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">
        السلة {`(${cartItems.length})`}
      </h1>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {cartItems.map((item, index) => (
            <ItemRow key={item.product?._id || index} item={item} />
          ))}
        </div>
        <OrderSummary />
      </section>
    </div>
  );
}

export default Cart;