import React from 'react';
import { TrendingUp, Package, ShoppingBag, DollarSign } from 'lucide-react';

export default function SellerPage() {
  const stats = [
    { title: "إجمالي المبيعات", value: "12,450 ج.م", icon: DollarSign, color: "bg-emerald-100 text-emerald-600" },
    { title: "الطلبات الجديدة", value: "8", icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
    { title: "المنتجات النشطة", value: "24", icon: Package, color: "bg-purple-100 text-purple-600" },
    { title: "معدل النمو", value: "+15%", icon: TrendingUp, color: "bg-orange-100 text-[#ec4d18]" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "أحمد محمد", date: "24 أكتوبر 2023", status: "قيد التجهيز", amount: "450 ج.م" },
    { id: "ORD-002", customer: "سارة خالد", date: "23 أكتوبر 2023", status: "تم الشحن", amount: "120 ج.م" },
    { id: "ORD-003", customer: "منى علي", date: "21 أكتوبر 2023", status: "تم التوصيل", amount: "890 ج.م" },
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">نظرة عامة على المتجر</h1>
        <p className="text-gray-500 mt-1">إليك ملخص سريع لأداء متجرك هذا الأسبوع.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-bold mb-1">{stat.title}</p>
                <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">أحدث الطلبات</h3>
          <a href="/seller/orders" className="text-sm font-bold text-[#ec4d18] hover:underline">عرض الكل</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-bold">رقم الطلب</th>
                <th className="px-6 py-4 font-bold">العميل</th>
                <th className="px-6 py-4 font-bold">التاريخ</th>
                <th className="px-6 py-4 font-bold">الحالة</th>
                <th className="px-6 py-4 font-bold">المبلغ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'قيد التجهيز' ? 'bg-amber-100 text-amber-700' :
                      order.status === 'تم الشحن' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#ec4d18]">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}