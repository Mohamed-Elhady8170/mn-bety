import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../Features/orderSlice";

import TrusMsg from "../Components/orderSuccess/TrusMsg";
import OrderActionsBtns from "../Components/orderSuccess/OrderActionsBtns";
import OrderInfo from "../Components/orderSuccess/OrderInfo";
import SuccessMsg from "../Components/orderSuccess/SuccessMsg";
import OrderItem from "../Components/orderSuccess/OrderItem";
import OrderTotal from "../Components/orderSuccess/OrderTotal";

function OrderSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userOrders, isLoading } = useSelector((state) => state.order);

  // Ask the backend for the fresh list of orders the second this page opens
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const latestOrder = userOrders?.[0];

  // While waiting for the database, show a loading message instead of kicking them out!
  if (isLoading || !userOrders) {
    return <div className="min-h-[50vh] flex items-center justify-center text-2xl font-bold text-primary animate-pulse">جاري تجهيز الفاتورة...</div>;
  }

  // Only kick them out if it finished loading and they TRULY have 0 orders
  if (!latestOrder) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">لا يوجد طلبات حالية</h2>
        <button onClick={() => navigate("/customer/products")} className="btn btn-primary">العودة للتسوق</button>
      </div>
    );
  }

  const items = latestOrder.cartItems || latestOrder.items || [];

  return (
    <div className="order-success-page min-h-screen bg-bg-main py-12" dir="rtl">
      <section className="max-w-3xl mx-auto px-4">
        <SuccessMsg />
        <OrderInfo order={latestOrder} />
        
        <div className="card mb-8 bg-bg-main border border-border-main rounded-xl shadow-sm">
          <div className="border-b border-border-main p-4">
            <h2 className="text-text-main text-xl font-bold">ملخص الطلب</h2>
          </div>
          
          <div className="p-4">
            {items.map((item) => (
              <OrderItem key={item._id} item={item} />
            ))}
          </div>
          
          <OrderTotal order={latestOrder} />
        </div>

        <OrderActionsBtns />
        <TrusMsg />
      </section>
    </div>
  );
}

export default OrderSuccess;