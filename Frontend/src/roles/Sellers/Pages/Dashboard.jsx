import WelcomeMsg from "../Components/Dashboard/WelcomeMsg";
import RecentOrders from "../Components/Dashboard/RecentOrders";
import OrderRow from "../Components/Dashboard/OrderRow";
import StatCard from "../Components/Dashboard/StatCard";
import { DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";

// static data for test
const dashboardStats = [
  {
    title: "إجمالي المبيعات",
    value: "12,450 ج.م",
    icon: DollarSign,
    color: "bg-icon-bg-green text-icon-green",
  },
  {
    title: "الطلبات الجديدة",
    value: "8",
    icon: ShoppingBag,
    color: "bg-icon-bg-blue text-icon-blue",
  },
  {
    title: "المنتجات النشطة",
    value: "24",
    icon: Package,
    color: "bg-icon-bg-orange text-primary",
  },
  {
    title: "معدل النمو",
    value: "+15%",
    icon: TrendingUp,
    color: "bg-icon-bg-orange text-primary",
  },
];
const recentOrders = [
  {
    id: "ORD-001",
    customer: "أحمد محمد",
    date: "24 أكتوبر 2023",
    status: "قيد التجهيز",
    amount: "450 ج.م",
  },
  {
    id: "ORD-002",
    customer: "سارة خالد",
    date: "23 أكتوبر 2023",
    status: "تم الشحن",
    amount: "120 ج.م",
  },
  {
    id: "ORD-003",
    customer: "منى علي",
    date: "21 أكتوبر 2023",
    status: "تم التوصيل",
    amount: "890 ج.م",
  },
];

export default function Dashboard() {
  return (
    <div className="p-2 text-right" dir="rtl">
      <WelcomeMsg />
      <section className="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
        {dashboardStats.map((ele, idx) => {
          const { icon: Icon, ...stat } = ele;
          return (
            <StatCard key={idx} stat={stat}>
              <Icon size={18} />
            </StatCard>
          );
        })}
      </section>
      <RecentOrders>
        {recentOrders.map((order, idx) => (
          <OrderRow key={idx} order={order} />
        ))}
      </RecentOrders>
    </div>
  );
}
