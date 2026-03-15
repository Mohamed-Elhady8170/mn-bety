import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  Moon,
  Sun,
  Heart,
  LogOut,
  Globe,
} from "lucide-react";
import logo from "../../../assets/Logos/logo02.png";
import { Link, useNavigate } from "react-router-dom";
import useDarkMode from "../../../hooks/useDarkMode";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../../Auth/Features/authThunks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDark, toggleDarkMode] = useDarkMode();

  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateActivePath = () => {
      const currentPath = window.location.pathname;
      if (currentPath !== activePath) {
        setActivePath(currentPath);
      }
    };
    const timer = setTimeout(updateActivePath, 0);
    return () => clearTimeout(timer);
  }, [activePath]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    // replace: true> back button
    navigate('/auth/login', { replace: true });
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const navLinks = [
    { name: "الرئيسية", href: "/user/" },
    { name: "التصنيفات", href: "/user/products" },
    { name: "البائعون", href: "/user/contact" },
    { name: "عن السوق", href: "/user/about" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 font-cairo ${isScrolled
        ? "bg-bg-main/95 backdrop-blur-md shadow-lg"
        : "bg-bg-main"
        } border-b border-border-warm px-4 sm:px-6 lg:px-20 h-16 md:h-20 py-4`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-4 h-full">
            <Link to="/" className="flex items-center h-full">
              <img
                src={logo}
                alt="من بيتي"
                className="h-16 sm:h-24 w-auto object-contain -my-4"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-8 mr-4 h-full">
              {navLinks.map((link) => {
                const isActive = activePath === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-sm whitespace-nowrap font-bold transition-all duration-300 relative group ${isActive
                      ? "text-primary"
                      : "text-text-navbar hover:text-primary"
                      }`}
                    onClick={() => setActivePath(link.href)}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full transition-all duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ابحث عن قطعة فريدة..."
                className="w-full pr-10 pl-4 py-2.5 bg-bg-subtle border-2 border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 text-sm transition-all duration-300 text-text-main placeholder:text-text-subtle"
                onFocus={(e) => {
                  e.target.style.borderColor = "#ec5e0c";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "transparent";
                }}
                dir="rtl"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-2 sm:gap-3 h-full">
            {/* Favorite Icon */}
            <button
              className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main"
              onClick={() => navigate("/user/wishlist")}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 hover:scale-110" />
            </button>

            {/* Language Button */}
            <button
              className="hidden sm:flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-105 hover:shadow-lg text-text-main text-sm font-bold"
            >
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main"
            >
              <div className="relative">
                {isDark ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 hover:rotate-90 hover:scale-110" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 hover:-rotate-12 hover:scale-110" />
                )}
              </div>
            </button>

            {/* Cart Icon */}
            <button
              className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main"
              onClick={() => navigate("/user/cart")}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 hover:rotate-6" />
              <span className="absolute -top-1 -right-1 text-white text-[10px] font-bold px-1.5 py-0.5 bg-primary rounded-full animate-bounce">
                3
              </span>
            </button>

            {/* Profile */}
            <div className="relative profile-menu-container  group h-full flex items-center">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-cover bg-center border-2 border-primary/30 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-primary"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAI-YHQqJvazrcBvQB3QCcBiJnaU4gAkErk5nBSJ3S1j8pGv_Jej0WpJdoOzY3hbewvNWrYJHQiSHKypQup4DO6A9mBVKjScf0Tqvd09eHL8Z77BzRVN855np1BuVKNV3tgF2XIAPwBuGTIILg81vchAXMT3XZFGMznqkOMAmCa8K7xNdrYMgUvb_KkoPrd6y1Z8cPtScb2KZfWRGxGlMCGGy-aSSpPf0vuWFDOkdDgu5qbltW3t7gGSuNUTK22bf3L0mSghO9p-rgi')",
                }}
                onClick={toggleProfileMenu}
              />

              {/* Dropdown Menu */}
              <div className={`absolute left-0 top-full mt-2 w-48 bg-bg-main rounded-xl shadow-lg border border-border-warm transition-all duration-300 z-50 ${isProfileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                <div className="p-2">
                  {/* اسم اليوزر */}
                  {user && (
                    <div className="px-4 py-2 text-sm font-bold text-text-main border-b border-border-warm mb-1">
                      👋 {user.fullName}
                    </div>
                  )}
                  <Link
                    to="/user/profile"
                    className="block px-4 py-2 text-sm text-text-main hover:bg-bg-subtle rounded-lg transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    ملفي الشخصي
                  </Link>
                  <Link
                    to="/user/my-orders"
                    className="block px-4 py-2 text-sm text-text-main hover:bg-bg-subtle rounded-lg transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    طلباتي
                  </Link>
                  <div className="border-t border-border-warm my-1"></div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileMenuOpen(false);
                    }}
                    disabled={isLoading}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-text hover:bg-red-soft rounded-lg transition-colors disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isLoading ? 'جاري الخروج...' : 'تسجيل الخروج'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-110 text-text-main"
            >
              {isOpen ? (
                <X className="w-5 h-5 rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="bg-bg-mobile-menu rounded-2xl p-4 space-y-3 border border-border-warm">
              {/* Mobile Search */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="ابحث عن قطعة فريدة..."
                  className="w-full pr-10 pl-4 py-2.5 bg-bg-mobile-actions border-2 border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 text-sm text-text-main placeholder:text-text-subtle"
                  dir="rtl"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = activePath === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${isActive
                        ? "bg-primary text-white shadow-lg"
                        : "text-text-main hover:bg-primary/10"
                        }`}
                      onClick={() => {
                        setActivePath(link.href);
                        setIsOpen(false);
                      }}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Actions */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-border-warm">
                <button className="flex items-center justify-center p-2 rounded-xl bg-bg-mobile-actions border border-border-warm transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main group"
                  onClick={() => {
                    navigate("/user/wishlist");
                    setIsOpen(false);
                  }}>
                  <Heart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
                </button>

                <button
                  onClick={toggleDarkMode}
                  className="flex items-center justify-center p-2 rounded-xl bg-bg-mobile-actions border border-border-warm transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main group"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 transition-all duration-500 group-hover:rotate-90 group-hover:scale-110 group-hover:text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-primary" />
                  )}
                </button>

                <button className="flex items-center justify-center p-2 rounded-xl bg-bg-mobile-actions border border-border-warm transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main group">
                  <Globe className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  disabled={isLoading}
                  className="flex items-center justify-center p-2 rounded-xl bg-red-soft text-red-text border border-red-200 transition-all duration-300 hover:scale-110 hover:shadow-lg group disabled:opacity-50"
                >
                  <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;