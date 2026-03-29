import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";

// Components
import WelcomeMsg from "../Components/Dashboard/WelcomeMsg";
import RecentOrders from "../Components/Dashboard/RecentOrders";
import OrderRow from "../Components/Dashboard/OrderRow";
import StatCard from "../Components/Dashboard/StatCard";

// Redux Actions & Selectors
import { fetchSellerStats, selectDashboardStats, selectStatsLoading } from "../Features/statSlice";
import { fetchSellerOrders } from "../../Users/Features/orderSlice"; // To make Recent Orders dynamic too

export default function Dashboard() {
  const dispatch = useDispatch();
  
  const stats = useSelector(selectDashboardStats);
  const loading = useSelector(selectStatsLoading);
  const { sellerOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchSellerStats());
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  // Transform dynamic data for the UI
  const dashboardStatsUI = [
    {
      title: "إجمالي المبيعات",
      value: `${stats.totalSales?.toLocaleString() || 0} ج.م`,
      icon: DollarSign,
      color: "bg-icon-bg-green text-icon-green",
    },
    {
      title: "الطلبات الجديدة",
      value: stats.newOrders || 0,
      icon: ShoppingBag,
      color: "bg-icon-bg-blue text-icon-blue",
    },
    {
      title: "المنتجات النشطة",
      value: stats.activeProducts || 0,
      icon: Package,
      color: "bg-icon-bg-orange text-primary",
    },
    {
      title: "معدل النمو",
      value: `${stats.growthRate || 0}%`,
      icon: TrendingUp,
      color: "bg-icon-bg-orange text-primary",
    },
  ];

  if (loading) return <div className="p-8 text-center">جاري تحميل البيانات...</div>;

  return (
    <div className="p-2 text-right" dir="rtl">
      <WelcomeMsg />
      
      <section className="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
        {dashboardStatsUI.map((ele, idx) => {
          const { icon: Icon, ...stat } = ele;
          return (
            <StatCard key={idx} stat={stat}>
              <Icon size={18} />
            </StatCard>
          );
        })}
      </section>

      <RecentOrders>
        {/* Taking only the last 5 orders for the recent view */}
        {sellerOrders.slice(0, 5).map((order, idx) => (
          <OrderRow key={order._id || idx} order={{
            id: order._id.slice(-6).toUpperCase(),
            customer: order.user?.fullName || "عميل",
            date: new Date(order.createdAt).toLocaleDateString("ar-EG"),
            status: order.orderStatus,
            amount: `${order.totalPrice} ج.م`
          }} />
        ))}
      </RecentOrders>
    </div>
  );
}