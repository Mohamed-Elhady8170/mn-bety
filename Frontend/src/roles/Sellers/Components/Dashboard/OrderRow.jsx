import { useTranslation } from "react-i18next";

function OrderRow({ order }) {
  const { t } = useTranslation();

  const statusStyles = {
    pending: "bg-red-soft text-red-text",
    processing: "bg-icon-bg-orange text-primary",
    shipped: "bg-icon-bg-blue text-icon-blue",
    delivered: "bg-icon-bg-green text-icon-green",
    cancelled: "bg-gray-200 text-gray-700",
  };

  const statusLabelMap = {
    pending: t("seller.orders_management.status_pending"),
    processing: t("seller.orders_management.status_processing"),
    shipped: t("seller.orders_management.status_shipped"),
    delivered: t("seller.orders_management.status_delivered"),
    cancelled: t("seller.orders_management.status_cancelled"),
  };

  const statusLabel = statusLabelMap[order.status] || order.status;

  return (
    <tr className="hover:bg-bg-subtle/50 transition-colors duration-200">
      <td className="px-6 py-4 font-bold text-text-main">{order.id}</td>
      <td className="px-6 py-4 text-text-soft">{order.customer}</td>
      <td className="px-6 py-4 text-text-soft text-sm">{order.date}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[order.status] || "bg-icon-bg-green text-icon-green"}`}
        >
          {statusLabel}
        </span>
      </td>
      <td className="px-6 py-4 font-bold text-primary">{order.amount}</td>
    </tr>
  );
}

export default OrderRow;
