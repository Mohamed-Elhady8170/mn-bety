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
    pending: "bg-red-100 text-red-700",
    processing: "bg-amber-100 text-amber-700",
    shipped: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700"
  };

  return (
    <div className="p-4 md:p-8 bg-[#f8f9fa] min-h-screen font-cairo text-right" dir="rtl">
  {/* Header Section */}
  <div className="mb-8">
    <h1 className="text-xl md:text-2xl font-black text-gray-900 flex items-center gap-2">
      <ShoppingBag className="text-[#ec4d18] shrink-0" size={28} /> 
      إدارة الطلبات
    </h1>
    <p className="text-gray-500 text-xs md:text-sm mt-1">تابع طلبات عملائك وقم بتحديث حالتها باستمرار</p>
  </div>

  {/* Main Container */}
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
      <table className="w-full text-right border-collapse min-w-200 lg:min-w-full">
        <thead className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
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
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">{order.id}</td>
              <td className="px-4 py-4 text-gray-600 font-medium whitespace-nowrap">{order.customer}</td>
              <td className="px-4 py-4 text-gray-600 text-center">{order.items}</td>
              <td className="px-4 py-4 font-bold text-[#ec4d18] whitespace-nowrap">{order.total} ج.م</td>
              <td className="px-4 py-4 text-gray-500 text-xs md:text-sm whitespace-nowrap">{order.date}</td>
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
                  className="text-gray-400 hover:text-[#ec4d18] transition-colors p-2 bg-gray-50 hover:bg-orange-50 rounded-lg inline-flex items-center"
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
    <p className="text-[10px] text-gray-400 italic">اسحب الجدول يميناً ويساراً لعرض كافة التفاصيل</p>
  </div>
</div>
  );
}