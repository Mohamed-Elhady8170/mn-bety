import React, { useEffect } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerOrders, updateOrderStatusThunk } from '../../Users/Features/orderSlice';
import toast from 'react-hot-toast';

export default function ManageOrders() {
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
      .then(() => toast.success("تم تحديث حالة الطلب بنجاح"))
      .catch((err) => toast.error(err || "حدث خطأ أثناء تحديث الحالة"));
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
          إدارة الطلبات
        </h1>
        <p className="text-text-soft text-xs md:text-sm mt-1">تابع طلبات عملائك وقم بتحديث حالتها باستمرار</p>
      </div>

      {/* Main Container */}
      <div className="bg-bg-main rounded-2xl border border-border-warm shadow-sm overflow-hidden">
        
        {isLoading ? (
          <div className="p-10 text-center font-bold text-primary animate-pulse">
            جاري تحميل الطلبات...
          </div>
        ) : !sellerOrders || sellerOrders.length === 0 ? (
          <div className="p-10 text-center text-text-soft">
            لا توجد طلبات لمنتجاتك حتى الآن.
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-border-warm">
            <table className="w-full text-right border-collapse min-w-200 lg:min-w-full">
              <thead className="bg-bg-subtle text-text-soft text-sm border-b border-border-warm">
                <tr>
                  <th className="px-4 py-4 font-bold">رقم الطلب</th>
                  <th className="px-4 py-4 font-bold">اسم العميل</th>
                  <th className="px-4 py-4 font-bold text-center">القطع</th>
                  <th className="px-4 py-4 font-bold">الإجمالي</th>
                  <th className="px-4 py-4 font-bold">التاريخ</th>
                  <th className="px-4 py-4 font-bold">الحالة</th>
                  <th className="px-4 py-4 font-bold text-center">الإجراء</th>
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
                        {order.user?.fullName || "عميل غير معروف"}
                      </td>
                      <td className="px-4 py-4 text-text-soft text-center">
                        {itemsCount}
                      </td>
                      <td className="px-4 py-4 font-bold text-primary whitespace-nowrap">
                        {order.totalPrice?.toLocaleString() || 0} ج.م
                      </td>
                      <td className="px-4 py-4 text-text-soft text-xs md:text-sm whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                          disabled={order.orderStatus === 'cancelled' || order.orderStatus === 'delivered'}
                          className={`text-xs font-bold px-2 py-1.5 rounded-xl border-0 outline-none cursor-pointer w-32 disabled:opacity-50 disabled:cursor-not-allowed ${statusStyles[order.orderStatus] || statusStyles.pending}`}
                        >
                          <option value="pending">قيد المراجعة</option>
                          <option value="processing">قيد التجهيز</option>
                          <option value="shipped">تم الشحن</option>
                          <option value="delivered">تم التوصيل</option>
                          {order.orderStatus === 'cancelled' && <option value="cancelled">تم الإلغاء</option>}
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
        <p className="text-[10px] text-text-soft italic">اسحب الجدول يميناً ويساراً لعرض كافة التفاصيل</p>
      </div>
    </div>
  );
}