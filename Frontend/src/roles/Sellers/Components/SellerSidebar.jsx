import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  LogOut,
  Store,
  X,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function SellerSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const navLinks = [
    { name: "الرئيسية", path: "/seller", icon: LayoutDashboard },
    { name: "منتجاتي", path: "/seller/products", icon: Package },
    { name: "الطلبات", path: "/seller/orders", icon: ShoppingBag, badge: 3 },
    { name: "ملف المتجر", path: "/seller/profile", icon: Store },
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
        fixed md:sticky top-0 right-0 z-50
        w-64 bg-bg-main border-l border-border-warm 
        flex flex-col h-screen transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-border-warm">
          <h2 className="text-2xl font-black text-primary">لوحة التاجر</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-xl bg-bg-subtle hover:bg-bg-warm transition-all text-text-main"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            const Icon = link.icon;

            return (
              <Link 
                key={link.name}
                to={link.path} 
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive 
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
        <div className="p-4 border-t border-border-warm">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 w-full rounded-xl font-bold transition-all"
          >
            <LogOut size={20} /> 
            <span>تسجيل الخروج</span>
          </Link>
        </div>
      </aside>
    </>
  );
}