import { useState, useEffect } from 'react';
import { MdShoppingBag } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyOrders } from '../../../Features/orderSlice';
import { Link } from 'react-router-dom';
import OrderItem from '../shared/OrderItem';

const OrdersTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  // 1. Pull real orders from Redux
  const { userOrders, isLoading } = useSelector((state) => state.order);
  const [visibleOrders, setVisibleOrders] = useState(3);

  // 2. Fetch orders if they haven't been loaded yet
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-primary font-bold animate-pulse">جاري تحميل طلباتك...</div>;
  }

  // 3. Fallback if no orders exist
  if (!userOrders || userOrders.length === 0) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
          <MdShoppingBag /> {t('profile.my_purchases')}
        </h3>
        <p className="text-text-subtle text-sm">لا توجد طلبات سابقة حتى الآن.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
        <MdShoppingBag /> {t('profile.my_purchases')}
      </h3>
      
      <div className="grid gap-4">
        {userOrders.slice(0, visibleOrders).map((order) => {
          // Calculate item count safely
          const itemsCount = order.cartItems?.length || order.items?.length || 0;
          
          return (
            /* Wrapped the item in a Link to navigate to the order details */
            <Link 
              to={`/customer/seeorderdetails/${order._id}`} 
              key={order._id}
              className="block hover:scale-[1.01] transition-transform duration-200"
            >
              <OrderItem 
                id={order._id.slice(-6).toUpperCase()} // Shorten the MongoDB ID
                date={new Date(order.createdAt).toLocaleDateString("ar-EG")}
                items={itemsCount}
                price={order.totalPrice}
                status={order.orderStatus} // THE FIX: Changed to orderStatus
              />
            </Link>
          );
        })}
      </div>

      {/* Pagination / Show More Buttons */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {visibleOrders < userOrders.length && (
          <button 
            onClick={() => setVisibleOrders((v) => v + 3)}
            className="text-primary font-bold hover:underline"
          >
            {t('profile.show_more', 'عرض المزيد')}
          </button>
        )}
        {visibleOrders > 3 && (
          <button 
            onClick={() => setVisibleOrders((v) => v - 3)}
            className="text-text-subtle text-sm hover:underline"
          >
            {t('profile.show_less', 'عرض أقل')}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrdersTab;