import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TrusMsg from "../Components/orderSuccess/TrusMsg";
import OrderActionsBtns from "../Components/orderSuccess/OrderActionsBtns";
import OrderInfo from "../Components/orderSuccess/OrderInfo";
import SuccessMsg from "../Components/orderSuccess/SuccessMsg";
import OrderItem from "../Components/orderSuccess/OrderItem";
import OrderTotal from "../Components/orderSuccess/OrderTotal";

function OrderSuccess() {
  const navigate = useNavigate();
  
  // 1. Get orders from the brain
  const { userOrders } = useSelector((state) => state.order);

  // 2. The most recent order is usually the first one in the array
  const latestOrder = userOrders?.[0];

  // 3. If someone types "/order-success" in the URL without buying anything, kick them out
  useEffect(() => {
    if (!latestOrder) {
      navigate("/user/products", { replace: true });
    }
  }, [latestOrder, navigate]);

  if (!latestOrder) return null; // Prevent crashes while redirecting

  // 4. Safely get items array depending on backend naming
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