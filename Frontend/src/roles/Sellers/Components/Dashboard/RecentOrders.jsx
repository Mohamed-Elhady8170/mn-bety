import { useTranslation } from "react-i18next";

function RecentOrders({ children }) {
  const { t } = useTranslation();

  return (
    <div className="bg-bg-main rounded-2xl border border-border-warm shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border-warm flex justify-between items-center">
        <h3 className="text-lg font-bold text-text-main">{t("seller.recent_orders.title")}</h3>
        <a
          href="/seller/orders"
          className="text-sm font-bold text-primary hover:underline transition-colors"
        >
          {t("seller.recent_orders.view_all")}
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-bg-subtle text-text-soft text-sm">
            <tr>
              <th className="px-6 py-4 font-bold">{t("seller.recent_orders.order_id")}</th>
              <th className="px-6 py-4 font-bold">{t("seller.recent_orders.customer")}</th>
              <th className="px-6 py-4 font-bold">{t("seller.recent_orders.date")}</th>
              <th className="px-6 py-4 font-bold">{t("seller.recent_orders.status")}</th>
              <th className="px-6 py-4 font-bold">{t("seller.recent_orders.amount")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-warm">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;
