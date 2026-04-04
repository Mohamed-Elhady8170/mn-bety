import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DollarSign, Package, ShoppingBag, TrendingUp, Inbox } from "lucide-react"; // أضفنا Inbox للشكل الجمالي

// Components
import WelcomeMsg from "../Components/Dashboard/WelcomeMsg";
import RecentOrders from "../Components/Dashboard/RecentOrders";
import OrderRow from "../Components/Dashboard/OrderRow";
import StatCard from "../Components/Dashboard/StatCard";

// Redux
import { fetchSellerStats, selectDashboardStats, selectStatsLoading } from "../Features/statSlice";
import { fetchSellerOrders } from "../../Users/Features/orderSlice";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState("all");

  const stats = useSelector(selectDashboardStats);
  const loading = useSelector(selectStatsLoading);
  const { sellerOrders = [] } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchSellerStats());
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  const filteredOrders = sellerOrders.filter(order => {
    if (statusFilter === "all") return true;
    return order.orderStatus === statusFilter;
  });

  const dashboardStatsUI = [
    { title: t("seller.dashboard.stats.total_sales"), value: `${stats.totalSales?.toLocaleString() || 0} ${t("common.egp")}`, icon: DollarSign, color: "bg-icon-bg-green text-icon-green" },
    { title: t("seller.dashboard.stats.new_orders"), value: stats.newOrders || 0, icon: ShoppingBag, color: "bg-icon-bg-blue text-icon-blue" },
    { title: t("seller.dashboard.stats.active_products"), value: stats.activeProducts || 0, icon: Package, color: "bg-icon-bg-orange text-primary" },
    { title: t("seller.dashboard.stats.growth_rate"), value: `${stats.growthRate || 0}%`, icon: TrendingUp, color: "bg-icon-bg-orange text-primary" },
  ];

  const filterTabs = [
    { id: "all", label: t("seller.dashboard.filters.all") },
    { id: "pending", label: t("seller.dashboard.filters.pending") },
    { id: "shipped", label: t("seller.dashboard.filters.shipped") },
    { id: "delivered", label: t("seller.dashboard.filters.delivered") },
    { id: "cancelled", label: t("seller.dashboard.filters.cancelled") },
  ];

  if (loading) return <div className="p-8 text-center text-primary animate-pulse">{t("seller.dashboard.loading")}</div>;

  return (
    <div className="p-4 md:p-6 text-right bg-bg-light min-h-screen relative z-0" dir="rtl">
      <WelcomeMsg />

      <section className="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {dashboardStatsUI.map((ele, idx) => {
          const { icon: Icon, ...stat } = ele;
          return (
            <StatCard key={idx} stat={stat}>
              <Icon size={20} />
            </StatCard>
          );
        })}
      </section>

      <section className="bg-white rounded-3xl shadow-sm border border-border-main overflow-hidden">

        <div className="p-6 border-b border-border-main flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <ShoppingBag size={22} />
            </div>
            <h3 className="text-xl font-bold text-text-main">{t("seller.recent_orders.title")}</h3>
          </div>

          <div className="flex gap-1.5 bg-bg-subtle p-1 rounded-2xl overflow-x-auto no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${statusFilter === tab.id
                  ? "bg-white text-primary shadow-sm scale-105"
                  : "text-text-subtle hover:text-text-main hover:bg-white/50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-2">
          {filteredOrders.length > 0 ? (
            <RecentOrders>
              {filteredOrders.slice(0, 5).map((order, idx) => (
                <OrderRow
                  key={order._id || idx}
                  order={{
                    id: order._id.slice(-6).toUpperCase(),
                    customer: order.user?.fullName || t("seller.orders_management.unknown_customer"),
                    date: new Date(order.createdAt).toLocaleDateString(i18n.language.startsWith("ar") ? "ar-EG" : "en-US"),
                    status: order.orderStatus,
                    amount: `${order.totalPrice} ${t("common.egp")}`
                  }}
                />
              ))}
            </RecentOrders>
          ) : (
            <div className="py-20 w-full flex flex-col items-center justify-center text-center gap-4 border-t border-gray-50">
              <div className="bg-gray-50 p-6 rounded-full flex items-center justify-center">
                <Inbox size={56} strokeWidth={1} className="text-gray-300" />
              </div>
              <div>
                <p className="text-lg font-bold text-text-main">
                  {t("seller.dashboard.empty_filtered")}
                </p>
                <p className="text-sm text-text-subtle mt-1">
                  {t("seller.dashboard.empty_hint")}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}