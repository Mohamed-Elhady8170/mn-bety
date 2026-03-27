import { useState } from "react";
import { MdShoppingBag } from "react-icons/md";
import { useTranslation } from "react-i18next";
import OrderItem from "../shared/OrderItem";

// TODO: استبدل بـ useSelector من orderSlice لما يكون جاهز
const ALL_ORDERS = [
  { id: "77421", date: "24 أكتوبر 2023",  items: "3", price: "450.00",  status: "delivered" },
  { id: "88210", date: "02 نوفمبر 2023",  items: "1", price: "125.50",  status: "pending"   },
  { id: "65129", date: "15 سبتمبر 2023",  items: "5", price: "890.00",  status: "delivered" },
  { id: "99201", date: "10 أغسطس 2023",   items: "2", price: "210.00",  status: "delivered" },
  { id: "11204", date: "05 أغسطس 2023",   items: "1", price: "55.00",   status: "pending"   },
  { id: "44302", date: "01 يوليو 2023",   items: "4", price: "600.00",  status: "delivered" },
  { id: "55603", date: "20 يونيو 2023",   items: "2", price: "320.00",  status: "delivered" },
  { id: "22109", date: "10 مايو 2023",    items: "1", price: "150.00",  status: "pending"   },
  { id: "33405", date: "05 أبريل 2023",   items: "3", price: "420.00",  status: "delivered" },
];

const OrdersTab = () => {
  const { t } = useTranslation();
  const [visibleOrders, setVisibleOrders] = useState(3);

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
        <MdShoppingBag /> {t("profile.my_purchases")}
      </h3>

      <div className="grid gap-4">
        {ALL_ORDERS.slice(0, visibleOrders).map((order) => (
          <OrderItem key={order.id} {...order} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        {visibleOrders < ALL_ORDERS.length && (
          <button
            onClick={() => setVisibleOrders((v) => v + 3)}
            className="text-primary font-bold hover:underline"
          >
            {t("profile.show_more")}
          </button>
        )}
        {visibleOrders > 3 && (
          <button
            onClick={() => setVisibleOrders((v) => v - 3)}
            className="text-text-subtle text-sm hover:underline"
          >
            {t("profile.show_less")}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrdersTab;