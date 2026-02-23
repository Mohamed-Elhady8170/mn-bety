import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Store
} from 'lucide-react';

export default function SellerSidebar() {
  // Using window.location to safely get the path in preview environments without a Router wrapper
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/seller';

  const navLinks = [
    { name: "الرئيسية", path: "/seller", icon: LayoutDashboard },
    { name: "منتجاتي", path: "/seller/products", icon: Package },
    { name: "الطلبات", path: "/seller/orders", icon: ShoppingBag, badge: 3 },
    { name: "ملف المتجر", path: "/seller/profile", icon: Store },
  ];

  return (
    <aside className="w-64 bg-white border-l border-gray-200 hidden md:flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="h-20 flex items-center justify-center border-b border-gray-100">
        <h2 className="text-2xl font-black text-[#ec4d18]">لوحة التاجر</h2>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navLinks.map((link) => {
          // Defaulting the active state to the dashboard home when rendering in isolated preview
          const isActive = pathname === link.path || (pathname === '/' && link.path === '/seller');
          
          // Must assign the icon to a capitalized variable so JSX renders it as a React Component instead of an object/html-tag
          const Icon = link.icon; 

          return (
            <a 
              key={link.name}
              href={link.path} 
              className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${
                isActive 
                  ? "bg-[#ec4d18]/10 text-[#ec4d18]" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
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
            </a>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <a href="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl font-bold transition-colors">
          <LogOut size={20} /> 
          <span>تسجيل الخروج</span>
        </a>
      </div>
    </aside>
  );
}