import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../Features/orderSlice'; 

const OrderHistory = () => {
  const dispatch = useDispatch();
  
  // 1. Pull the real orders from your Redux Brain
  const { userOrders, isLoading } = useSelector((state) => state.order);

  // 2. Fetch them when the page loads
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  // 3. Dynamic status colors based on your backend
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'processing': return 'bg-primary/10 text-primary';
      case 'shipped': return 'bg-blue-500/10 text-blue-500';
      case 'delivered': return 'bg-success-green/10 text-success-green';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-text-muted/10 text-text-muted';
    }
  };

  // 4. Translate backend English status to Arabic
  const translateStatus = (status) => {
    switch (status) {
      case 'pending': return 'قيد المراجعة';
      case 'processing': return 'جاري التجهيز';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التوصيل';
      case 'cancelled': return 'تم الإلغاء';
      default: return 'تحت المعالجة';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <div className="text-xl font-bold text-primary animate-pulse">جاري تحميل طلباتك...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main text-text-main py-12 px-4 transition-colors duration-300" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/*/////////////// Header/////////////// */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-text-main">طلباتي</h1>
            <p className="mt-2 text-text-subtle font-medium">تابع حالة طلباتك الأخيرة وإدارة مشترياتك.</p>
          </div>
          <Link to="/customer/products" className="btn btn-primary w-fit px-6 py-2 rounded-xl text-white">
            العودة للتسوق
          </Link>
        </div>

        {/*//////// Orders List ///////////*/}
        <div className="grid grid-cols-1 gap-6">
          {!userOrders || userOrders.length === 0 ? (
            <div className="text-center py-20 bg-bg-subtle rounded-2xl border border-border-main">
              <p className="text-xl text-text-subtle mb-4">لا توجد لديك طلبات سابقة حتى الآن.</p>
              <Link to="/customer/products" className="text-primary font-bold hover:underline">ابدأ التسوق الآن</Link>
            </div>
          ) : (
            userOrders.map((order, index) => {
              // Try to get the image of the first item in the order, or use a placeholder
              const orderImage = order.cartItems?.[0]?.product?.images?.[0]?.url 
                                || order.items?.[0]?.product?.images?.[0]?.url 
                                || "https://via.placeholder.com/150";
              
              // Count total items
              const itemsCount = order.cartItems?.length || order.items?.length || 0;

              return (
                <div 
                  key={order._id} 
                  className={`card hover:shadow-lg transition-all duration-300 animate-fadeIn bg-bg-subtle p-4 rounded-2xl border border-border-main`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    
                    <div className="img-container w-full sm:w-32 h-32 shrink-0 rounded-xl overflow-hidden border border-border-warm">
                      <img 
                        src={orderImage} 
                        alt={`Order ${order._id}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>

                    {/* ///////////Details ////////////*/}
                    <div className="flex-1 w-full space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-text-main">
                          طلب #{order._id.slice(-6).toUpperCase()}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(order.status)}`}>
                          {translateStatus(order.status)}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-text-subtle">
                        <p>التاريخ: <span className="text-text-main font-semibold">
                          {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                        </span></p>
                        <p>المنتجات: <span className="text-text-main font-semibold">{itemsCount} منتجات</span></p>
                        <p>طريقة الدفع: <span className="text-text-main font-semibold">
                          {order.paymentMethod === 'COD' ? 'عند الاستلام' : 'بطاقة ائتمان'}  
                        </span></p>
                      </div>

                      <div className="pt-3 flex justify-between items-center border-t border-border-main">
                        <div>
                          <span className="text-xs text-text-subtle">إجمالي المبلغ:</span>
                          <p className="text-xl font-black text-primary">
                            {order.totalPrice?.toLocaleString() || 0} ج.م
                          </p>
                        </div>
                        <Link to={`/user/orders/${order._id}`} className="text-primary font-bold hover:text-primary/80 transition-colors">
                          عرض التفاصيل &larr;
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;