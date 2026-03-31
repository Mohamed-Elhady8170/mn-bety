import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Search,
  Menu,
  Home,
  Moon,
  Sun,
  Globe,
  LogOut,
} from "lucide-react";
import useDarkMode from "../../../hooks/useDarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../../Auth/Features/authThunks";
import { fetchMySellerProfile } from "../Features/sallerProfileSlice";
import { markNotificationRead } from "../../Users/Features/notificationSlice";

export default function SellerHeader({ onMenuClick }) {
  const [isDark, toggleDarkMode] = useDarkMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.sellerProfile);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { items: notifications, unreadCount } = useSelector((state) => state.notifications);
  const notifRef = useRef(null);

  useEffect(() => {
    
    const isSeller = user?.roles?.includes("seller");
    if (isSeller && !profile) {
      dispatch(fetchMySellerProfile());
    }
  }, [dispatch, user?.roles, profile]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const profileImage =
    profile?.logo?.url ||
    user?.avatar?.url ||
    user?.avatar ||
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop";

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/auth/login", { replace: true });
  };

  const searchableRoutes = useMemo(
    () => [
      { label: "لوحة التحكم", path: "/seller" },
      { label: "إدارة المنتجات", path: "/seller/products" },
      { label: "إضافة منتج", path: "/seller/addProduct" },
      { label: "إدارة الطلبات", path: "/seller/orders" },
      { label: "ملف المتجر", path: "/seller/profile" },
      { label: "الرئيسية", path: "/customer/" },
      { label: "المنتجات", path: "/customer/products" },
    ],
    [],
  );

  const filteredRoutes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return searchableRoutes;

    return searchableRoutes.filter(
      (route) =>
        route.label.toLowerCase().includes(term) ||
        route.path.toLowerCase().includes(term),
    );
  }, [searchTerm, searchableRoutes]);

  const handleRouteSelect = (path) => {
    setSearchTerm("");
    setIsSearchOpen(false);
    navigate(path);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && filteredRoutes.length > 0) {
      handleRouteSelect(filteredRoutes[0].path);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-10 w-full bg-bg-main/95 backdrop-blur-md border-b border-border-warm h-20">
      <div className="h-full px-4 md:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Left side - Menu button and Search */}
          <div className="flex items-center gap-4 flex-1">
            {/* Menu button for mobile */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-xl bg-bg-subtle hover:bg-bg-warm transition-all text-text-main"
            >
              <Menu size={20} />
            </button>

            {/* Search */}
            <div
              className="relative w-full max-w-md hidden sm:block"
              ref={searchRef}
            >
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-soft"
                size={20}
              />
              <input
                type="text"
                placeholder="ابحث في لوحة التحكم..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleSearchKeyDown}
                className="w-full bg-bg-subtle border border-border-warm rounded-xl py-2 pr-10 pl-4 focus:outline-none focus:border-primary text-text-main placeholder-text-soft/70"
              />

              {isSearchOpen && (
                <div className="absolute top-[110%] w-full bg-bg-main border border-border-warm rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto">
                  {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route) => (
                      <button
                        key={route.path}
                        type="button"
                        onClick={() => handleRouteSelect(route.path)}
                        className="w-full text-right px-4 py-2.5 hover:bg-bg-subtle transition-colors"
                      >
                        <p className="text-sm font-bold text-text-main">
                          {route.label}
                        </p>
                        <p className="text-xs text-text-soft" dir="ltr">
                          {route.path}
                        </p>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-text-soft">
                      لا توجد نتائج
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center gap-2 sm:gap-3 mr-4 md:mr-8">
            {/* Home Button */}
            <Link
              to="/"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-bg-subtle hover:bg-bg-warm transition-all text-text-main"
            >
              <Home size={18} />
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle hover:bg-bg-warm transition-all text-text-main"
            >
              <div className="relative">
                {isDark ? (
                  <Sun
                    size={16}
                    className="sm:w-4.5 sm:h-4.5 transition-all duration-500 hover:rotate-90"
                  />
                ) : (
                  <Moon
                    size={16}
                    className="sm:w-4.5 sm:h-4.5 transition-all duration-500 hover:-rotate-12"
                  />
                )}
              </div>
            </button>

            {/* Language Button */}
            <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle hover:bg-bg-warm transition-all text-text-main">
              <Globe size={16} className="sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle hover:bg-bg-warm transition-all text-text-main"
              >
                <Bell size={16} className="sm:w-4.5 sm:h-4.5" />

                {/* The Dynamic Red Badge! */}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 flex items-center justify-center min-w-4 h-4 sm:min-w-5 sm:h-5 text-[10px] sm:text-xs font-bold text-white bg-red-500 border-2 border-bg-main rounded-full animate-bounce px-1">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              {/* The Dropdown Menu */}
              <div
                className={`absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-72 sm:w-80 bg-bg-main rounded-xl shadow-lg border border-border-warm transition-all duration-300 z-50 overflow-hidden ${isNotifOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
              >
                {/* Header */}
                <div className="p-3 border-b border-border-warm flex justify-between items-center bg-bg-subtle">
                  <h3 className="font-bold text-text-main text-sm">
                    الإشعارات
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-primary font-bold">
                      {unreadCount} غير مقروء
                    </span>
                  )}
                </div>

                {/* Notification List */}
                <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-border-warm">
                  {!notifications || notifications.length === 0 ? (
                    <div className="p-6 text-center text-text-subtle text-sm font-medium">
                      لا توجد إشعارات حتى الآن
                    </div>
                  ) : (
                    notifications.slice(0, 10).map((notif) => (
                      <div
                        key={notif._id}
                        onClick={() => {
                          if (!notif.isRead)
                            dispatch(markNotificationRead(notif._id));
                          setIsNotifOpen(false);
                          navigate(`/seller/orders`)
                          // You can also add navigation here later! e.g., navigate(`/seller/orders/${notif.relatedId}`)
                        }}
                        className={`p-3 border-b border-border-warm hover:bg-bg-subtle cursor-pointer transition-colors flex gap-3 ${!notif.isRead ? "bg-primary/5" : ""}`}
                      >
                        <div
                          className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!notif.isRead ? "bg-primary" : "bg-transparent"}`}
                        ></div>
                        <div>
                          <p
                            className={`text-sm ${!notif.isRead ? "font-bold text-text-main" : "font-medium text-text-soft"}`}
                          >
                            {notif.title}
                          </p>
                          <p className="text-xs text-text-subtle mt-1 leading-relaxed">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-text-subtle mt-2 block dir-ltr w-fit font-medium">
                            {new Date(notif.createdAt).toLocaleDateString(
                              "ar-EG",
                              {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 pr-4 mr-2 border-r border-border-warm">
              <img
                src={profileImage}
                alt="Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-primary"
              />
              <div className="hidden lg:block text-right">
                {/* اسم اليوزر من الـ store */}
                <p className="text-sm font-bold text-text-main leading-tight">
                  {user?.fullName || "مشغل نورة"}
                </p>
                <p className="text-xs text-text-soft">حرفي معتمد</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-red-soft hover:bg-red-100 transition-all text-red-text"
              title="تسجيل الخروج"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
