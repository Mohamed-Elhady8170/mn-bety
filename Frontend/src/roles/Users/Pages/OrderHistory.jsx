
import React from 'react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const orders = [
    { id: '77421', date: '24 Oct 2023', items: 3, price: '450.00', status: 'Delivered', img: '' },
    { id: '88210', date: '12 Nov 2022', items: 6, price: '725.50', status: 'Processing', img: '' },
    { id: '65129', date: '15 Sep 2024', items: 5, price: '890.00', status: 'Shipped', img: '' },
    { id: '12321', date: '24 June 2023', items: 3, price: '450.00', status: 'Delivered', img: '' },
    { id: '82589', date: '02 Nov 2023', items: 4, price: '650.50', status: 'Processing', img: '' },
    { id: '64890', date: '45 oct 2023', items: 5, price: '890.00', status: 'Shipped', img: '' },
    
  ];
     
 {/* //////////الحاله اللي هعتمد عليها في المنتج بتاعي////////////*/}
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-success-green/10 text-success-green';
      case 'Processing': return 'bg-primary/10 text-primary';
      case 'Shipped': return 'bg-blue-500/10 text-blue-500';
      default: return 'bg-text-muted/10 text-text-muted';
    }
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-main py-12 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/*/////////////// Header/////////////// */}
        <div className="flex flex-col md:flex-between mb-10 gap-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl text-text-main">طلباتي</h1>
            <p className="mt-2 text-text-subtle font-medium">تابع حالة طلباتك الأخيرة وإدارة مشترياتك.</p>
          </div>
          <Link to="/" className="btn btn-primary w-fit">
            العودة للتسوق
          </Link>
        </div>

        {/*//////// Orders List ///////////*/}
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order, index) => (
            <div 
              key={order.id} 
              className={`card card-hover animate-fadeIn`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                
            
                <div className="img-container w-full sm:w-32 h-32 shrink-0">
                  <img 
                    src={order.img} 
                    alt={`Order ${order.id}`}
                    className="transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* ///////////Details ////////////*/}
                <div className="flex-1 w-full space-y-3">
                  <div className="flex-between">
                    <h3 className="text-lg text-text-main">طلب #{order.id}</h3>
                    <span className={`badge ${getStatusBadge(order.status)}`}>
                      {order.status === 'Delivered' ? 'تم التوصيل' : 'تحت المعالجة'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-text-subtle">
                    <p>التاريخ: <span className="text-text-main font-semibold">{order.date}</span></p>
                    <p>المنتجات: <span className="text-text-main font-semibold">{order.items} منتجات</span></p>
                  </div>

                  <div className="pt-3 flex-between border-t border-border-main">
                    <div>
                      <span className="text-xs text-text-muted">إجمالي المبلغ:</span>
                      <p className="text-xl font-black text-primary">{order.price} ج.م</p>
                    </div>
                    <button className="text-clay font-bold hover:text-primary transition-colors">
                      عرض التفاصيل &larr;
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;