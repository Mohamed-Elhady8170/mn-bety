import React from 'react';
import { TrendingUp, Package, ShoppingBag, DollarSign } from 'lucide-react';

export default function SellerPage() {
  const stats = [
    { title: "إجمالي المبيعات", value: "12,450 ج.م", icon: DollarSign, color: "bg-icon-bg-green text-icon-green" },
    { title: "الطلبات الجديدة", value: "8", icon: ShoppingBag, color: "bg-icon-bg-blue text-icon-blue" },
    { title: "المنتجات النشطة", value: "24", icon: Package, color: "bg-icon-bg-orange text-primary" },
    { title: "معدل النمو", value: "+15%", icon: TrendingUp, color: "bg-icon-bg-orange text-primary" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "أحمد محمد", date: "24 أكتوبر 2023", status: "قيد التجهيز", amount: "450 ج.م" },
    { id: "ORD-002", customer: "سارة خالد", date: "23 أكتوبر 2023", status: "تم الشحن", amount: "120 ج.م" },
    { id: "ORD-003", customer: "منى علي", date: "21 أكتوبر 2023", status: "تم التوصيل", amount: "890 ج.م" },
  ];

  return (
    <div className="p-4 md:p-8 bg-bg-body min-h-screen font-cairo text-right" dir="rtl">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-text-main">نظرة عامة على المتجر</h1>
        <p className="text-text-soft mt-1">إليك ملخص سريع لأداء متجرك هذا الأسبوع.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-bg-main p-6 rounded-2xl border border-border-warm shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-text-soft font-bold mb-1">{stat.title}</p>
                <h3 className="text-2xl font-black text-text-main">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-bg-main rounded-2xl border border-border-warm shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-warm flex justify-between items-center">
          <h3 className="text-lg font-bold text-text-main">أحدث الطلبات</h3>
          <a href="/seller/orders" className="text-sm font-bold text-primary hover:underline transition-colors">عرض الكل</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-bg-subtle text-text-soft text-sm">
              <tr>
                <th className="px-6 py-4 font-bold">رقم الطلب</th>
                <th className="px-6 py-4 font-bold">العميل</th>
                <th className="px-6 py-4 font-bold">التاريخ</th>
                <th className="px-6 py-4 font-bold">الحالة</th>
                <th className="px-6 py-4 font-bold">المبلغ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-warm">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-bg-subtle/50 transition-colors duration-200">
                  <td className="px-6 py-4 font-bold text-text-main">{order.id}</td>
                  <td className="px-6 py-4 text-text-soft">{order.customer}</td>
                  <td className="px-6 py-4 text-text-soft text-sm">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'قيد التجهيز' ? 'bg-icon-bg-orange text-primary' :
                      order.status === 'تم الشحن' ? 'bg-icon-bg-blue text-icon-blue' :
                      'bg-icon-bg-green text-icon-green'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-primary">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}