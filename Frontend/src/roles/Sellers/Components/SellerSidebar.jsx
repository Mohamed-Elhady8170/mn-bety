import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  Store,
  X,
  Menu,
  RefreshCw
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/Logos/logo02.png';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../../Auth/Features/authThunks';
import { useTranslation } from 'react-i18next';

export default function SellerSidebar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { sellerOrders } = useSelector((state) => state.order);
  // Calculate how many orders are specifically "pending" (قيد المراجعة)
  const pendingOrdersCount = sellerOrders?.filter(o => o.orderStatus === 'pending')?.length || 0;
  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate('/auth/login', { replace: true });
  };

  const navLinks = [
    { name: t("seller.sidebar.dashboard"), path: "/seller", icon: LayoutDashboard },
    { name: t("seller.sidebar.products"), path: "/seller/products", icon: Package },
    { name: t("seller.sidebar.orders"), path: "/seller/orders", icon: ShoppingBag, badge: pendingOrdersCount > 0 ? pendingOrdersCount : null },
    { name: t("seller.sidebar.store_profile"), path: "/seller/profile", icon: Store },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-5 right-4 z-50 p-2 rounded-xl bg-bg-main/95 backdrop-blur-md border border-border-warm shadow-lg text-text-main"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky md:top-0 top-0 right-0 z-50 md:self-start
        w-64 bg-bg-main border-l border-border-warm
        flex-col h-screen md:h-screen overflow-hidden
        ${isOpen ? 'flex' : 'hidden'} md:flex
      `}>
        {/* Brand */}
        <div className="h-20 flex items-center justify-center px-4 border-b border-border-warm">
          <Link to="/seller" className="flex items-center justify-center">
            <img
              src={logo}
              alt="من بيتي"
              className="h-24 w-auto object-contain -my-6"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden absolute left-4 p-2 rounded-xl bg-bg-subtle hover:bg-bg-warm transition-all text-text-main"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 min-h-0 p-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${isActive
                    ? "bg-primary/10 text-primary"
                    : "text-text-soft hover:bg-bg-subtle hover:text-text-main"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-auto border-t border-border-warm p-4 space-y-2">
          {/* Switch to Customer */}
          <button
            onClick={() => navigate('/customer')}
            className="flex items-center gap-3 px-4 py-3 text-primary hover:bg-primary/10 w-full rounded-xl  transition-all"
          >
            <RefreshCw size={20} />
            <span>{t("seller.sidebar.switch_to_customer")}</span>
          </button>

          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 w-full rounded-xl font-bold transition-all disabled:opacity-50"
          >
            <LogOut size={20} />
            <span>
              {isLoading
                ? t("seller.sidebar.logging_out")
                : t("seller.sidebar.logout")}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}