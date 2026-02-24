function RecentOrders({ children }) {
  return (
    <div className="bg-bg-main rounded-2xl border border-border-warm shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border-warm flex justify-between items-center">
        <h3 className="text-lg font-bold text-text-main">أحدث الطلبات</h3>
        <a
          href="/seller/orders"
          className="text-sm font-bold text-primary hover:underline transition-colors"
        >
          عرض الكل
        </a>
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
          <tbody className="divide-y divide-border-warm">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;
