import React, { useState } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ManageOrders() {
  const [orders, setOrders] = useState([
    { id: "ORD-1042", customer: "أحمد علي", items: 2, total: 570, date: "2023-10-24", status: "pending" },
    { id: "ORD-1041", customer: "سارة محمد", items: 1, total: 150, date: "2023-10-23", status: "processing" },
    { id: "ORD-1040", customer: "نورة فهد", items: 4, total: 1200, date: "2023-10-21", status: "shipped" },
    { id: "ORD-1039", customer: "محمود حسن", items: 1, total: 280, date: "2023-10-19", status: "delivered" },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  const statusStyles = {
    pending: "bg-red-soft text-red-text",
    processing: "bg-amber-500/10 text-amber-700",
    shipped: "bg-blue-500/10 text-blue-700",
    delivered: "bg-green-500/10 text-green-700"
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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-bg-subtle transition-colors duration-200">
                  <td className="px-4 py-4 font-bold text-text-main whitespace-nowrap">{order.id}</td>
                  <td className="px-4 py-4 text-text-soft font-medium whitespace-nowrap">{order.customer}</td>
                  <td className="px-4 py-4 text-text-soft text-center">{order.items}</td>
                  <td className="px-4 py-4 font-bold text-primary whitespace-nowrap">{order.total} ج.م</td>
                  <td className="px-4 py-4 text-text-soft text-xs md:text-sm whitespace-nowrap">{order.date}</td>
                  <td className="px-4 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`text-xs font-bold px-2 py-1.5 rounded-xl border-0 outline-none cursor-pointer w-32 ${statusStyles[order.status]}`}
                    >
                      <option value="pending">قيد المراجعة</option>
                      <option value="processing">قيد التجهيز</option>
                      <option value="shipped">تم الشحن</option>
                      <option value="delivered">تم التوصيل</option>
                    </select>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Link
                      to="/seller/seeorderdetails"
                      className="text-text-soft hover:text-primary transition-colors p-2 bg-bg-subtle hover:bg-primary-10 rounded-lg inline-flex items-center"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Mobile Note */}
      <div className="mt-4 md:hidden text-center">
        <p className="text-[10px] text-text-soft italic">اسحب الجدول يميناً ويساراً لعرض كافة التفاصيل</p>
      </div>
    </div>
  );
}