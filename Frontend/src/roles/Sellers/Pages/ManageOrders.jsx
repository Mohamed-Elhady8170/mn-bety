import React, { useEffect } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerOrders, updateOrderStatusThunk } from '../../Users/Features/orderSlice';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function ManageOrders() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  
  // 1. Pull the real seller orders from the Redux Brain
  const { sellerOrders, isLoading } = useSelector((state) => state.order);

  // 2. Fetch the orders when the page loads
  useEffect(() => {
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  // 3. Handle Status Change hitting the Backend
  const handleUpdateStatus = (orderId, newStatus) => {
    dispatch(updateOrderStatusThunk({ orderId, status: newStatus }))
      .unwrap()
      .then(() => toast.success(t("seller.orders_management.update_success")))
      .catch((err) => toast.error(err || t("seller.orders_management.update_error")));
  };

  const statusStyles = {
    pending: "bg-red-soft text-red-text",
    processing: "bg-amber-500/10 text-amber-700",
    shipped: "bg-blue-500/10 text-blue-700",
    delivered: "bg-green-500/10 text-green-700",
    cancelled: "bg-gray-200 text-gray-700"
  };

  return (
    <div className="p-4 md:p-8 bg-bg-main min-h-screen font-cairo text-right" dir="rtl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-black text-text-main flex items-center gap-2">
          <ShoppingBag className="text-primary shrink-0" size={28} /> 
          {t("seller.orders_management.title")}
        </h1>
        <p className="text-text-soft text-xs md:text-sm mt-1">{t("seller.orders_management.subtitle")}</p>
      </div>

      {/* Main Container */}
      <div className="bg-bg-main rounded-2xl border border-border-warm shadow-sm overflow-hidden">
        
        {isLoading ? (
          <div className="p-10 text-center font-bold text-primary animate-pulse">
            {t("seller.orders_management.loading")}
          </div>
        ) : !sellerOrders || sellerOrders.length === 0 ? (
          <div className="p-10 text-center text-text-soft">
            {t("seller.orders_management.empty")}
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-border-warm">
            <table className="w-full text-right border-collapse min-w-200 lg:min-w-full">
              <thead className="bg-bg-subtle text-text-soft text-sm border-b border-border-warm">
                <tr>
                  <th className="px-4 py-4 font-bold">{t("seller.orders_management.order_id")}</th>
                  <th className="px-4 py-4 font-bold">{t("seller.orders_management.customer")}</th>
                  <th className="px-4 py-4 font-bold text-center">{t("seller.orders_management.items")}</th>
                  <th className="px-4 py-4 font-bold">{t("seller.orders_management.total")}</th>
                  <th className="px-4 py-4 font-bold">{t("seller.orders_management.date")}</th>
                  <th className="px-4 py-4 font-bold">{t("seller.orders_management.status")}</th>
                  <th className="px-4 py-4 font-bold text-center">{t("seller.orders_management.action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-warm">
                {sellerOrders.map((order) => {
                  const itemsCount = order.cartItems?.length || order.items?.length || 0;
                  
                  return (
                    <tr key={order._id} className="hover:bg-bg-subtle transition-colors duration-200">
                      <td className="px-4 py-4 font-bold text-text-main whitespace-nowrap">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-4 py-4 text-text-soft font-medium whitespace-nowrap">
                        {order.user?.fullName || t("seller.orders_management.unknown_customer")}
                      </td>
                      <td className="px-4 py-4 text-text-soft text-center">
                        {itemsCount}
                      </td>
                      <td className="px-4 py-4 font-bold text-primary whitespace-nowrap">
                        {order.totalPrice?.toLocaleString() || 0} {t("common.egp")}
                      </td>
                      <td className="px-4 py-4 text-text-soft text-xs md:text-sm whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString(i18n.language.startsWith("ar") ? "ar-EG" : "en-US")}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                          disabled={order.orderStatus === 'cancelled' || order.orderStatus === 'delivered'}
                          className={`text-xs font-bold px-2 py-1.5 rounded-xl border-0 outline-none cursor-pointer w-32 disabled:opacity-50 disabled:cursor-not-allowed ${statusStyles[order.orderStatus] || statusStyles.pending}`}
                        >
                          <option value="pending">{t("seller.orders_management.status_pending")}</option>
                          <option value="processing">{t("seller.orders_management.status_processing")}</option>
                          <option value="shipped">{t("seller.orders_management.status_shipped")}</option>
                          <option value="delivered">{t("seller.orders_management.status_delivered")}</option>
                          {order.orderStatus === 'cancelled' && <option value="cancelled">{t("seller.orders_management.status_cancelled")}</option>}
                        </select>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Link
                          to={`/seller/seeorderdetails/${order._id}`}
                          className="text-text-soft hover:text-primary transition-colors p-2 bg-bg-subtle hover:bg-primary/10 rounded-lg inline-flex items-center"
                        >
                          <Eye size={18} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Mobile Note */}
      <div className="mt-4 md:hidden text-center">
        <p className="text-[10px] text-text-soft italic">{t("seller.orders_management.mobile_note")}</p>
      </div>
    </div>
  );
}