function OrderRow({ order }) {
  return (
    <tr className="hover:bg-bg-subtle/50 transition-colors duration-200">
      <td className="px-6 py-4 font-bold text-text-main">{order.id}</td>
      <td className="px-6 py-4 text-text-soft">{order.customer}</td>
      <td className="px-6 py-4 text-text-soft text-sm">{order.date}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            order.status === "قيد التجهيز"
              ? "bg-icon-bg-orange text-primary"
              : order.status === "تم الشحن"
              ? "bg-icon-bg-blue text-icon-blue"
              : "bg-icon-bg-green text-icon-green"
          }`}
        >
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4 font-bold text-primary">{order.amount}</td>
    </tr>
  );
}

export default OrderRow;
