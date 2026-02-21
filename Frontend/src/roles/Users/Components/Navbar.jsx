import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, Search, Leaf, Moon, Sun, Heart, LogOut, Globe } from 'lucide-react';
import logo from '../../../assets/Logos/logo02.png';
import { Link , useNavigate} from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const navigate = useNavigate();
  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Handle logout
  const handleLogout = () => {
    console.log('Logging out...');
  };

  const navLinks = [
    { name: 'الرئيسية', href: '/user/', active: true },
    { name: 'التصنيفات', href: '/user/products', active: false },
    { name: 'البائعون', href: '/user/contact', active: false },
    { name: 'عن السوق', href: '/user/about', active: false },
    // { name: 'التعريف', href: '/landing', active: false }
  ];

  const orangeColor = '#ec5e0c';

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 font-cairo ${isScrolled
          ? 'bg-white/95 dark:bg-bg-footer/95 backdrop-blur-md shadow-lg'
          : 'bg-white dark:bg-bg-footer'
        } border-b border-border-warm dark:border-border-dark px-4 sm:px-6 lg:px-20 h-16 md:h-20 py-4`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-4 h-full">
            <a href="/" className="flex items-center h-full">
              <img
                src={logo}
                alt="من بيتي"
                className="h-16 sm:h-24 w-auto object-contain -my-4"
              />
            </a>


            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-8 mr-4 h-full">
              {navLinks.map((link) => {
                const isActive = activePath === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-bold transition-all duration-300 relative group ${isActive
                        ? 'text-[#ec4d18]'
                        : 'text-gray-600 dark:text-white hover:text-[#ec4d18]'
                      }`}
                    onClick={() => setActivePath(link.href)}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-2 left-0 w-full h-0.5 rounded-full transition-all duration-300 ${isActive
                          ? 'bg-[#ec4d18] scale-x-100'
                          : 'bg-[#ec4d18] scale-x-0 group-hover:scale-x-100'
                        }`}
                      style={{ backgroundColor: orangeColor }}
                    />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="ابحث عن قطعة فريدة..."
                className="w-full pr-10 pl-4 py-2.5 bg-[#f3ece8] dark:bg-white/10 border-2 border-transparent rounded-2xl focus:ring-2 text-sm transition-all duration-300 dark:text-white dark:placeholder:text-white/50"
                style={{
                  '--tw-ring-color': `${orangeColor}20`,
                  '--tw-ring-offset-shadow': `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
                  '--tw-ring-shadow': `var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) ${orangeColor}20`,
                  boxShadow: `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)`,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = orangeColor;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'transparent';
                }}
                dir="rtl"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 dark:text-white/70"
                style={{ color: '#956b50' }}
              />
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-2 sm:gap-3 h-full">
            {/* Desktop: Favorite Icon */}
            <button
              className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#f3ece8] dark:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${orangeColor}10`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              onClick={()=> navigate('/user/wishlist')}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 hover:scale-110" />
            </button>

            {/* Desktop: Language Button */}
            <button
              className="hidden sm:flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-[#f3ece8] dark:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:text-white text-sm font-bold"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${orangeColor}10`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
            >
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>

            {/* Desktop: Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#f3ece8] dark:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${orangeColor}10`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
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
              className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#f3ece8] dark:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${orangeColor}10`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              onClick={()=> navigate('/user/cart')}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 hover:rotate-6" />
              <span
                className="absolute -top-1 -right-1 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce"
                style={{ backgroundColor: orangeColor }}
              >
                3
              </span>
            </button>

            {/* Profile Image - Last item */}
            <div className="relative group h-full flex items-center">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-cover bg-center border-2 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAI-YHQqJvazrcBvQB3QCcBiJnaU4gAkErk5nBSJ3S1j8pGv_Jej0WpJdoOzY3hbewvNWrYJHQiSHKypQup4DO6A9mBVKjScf0Tqvd09eHL8Z77BzRVN855np1BuVKNV3tgF2XIAPwBuGTIILg81vchAXMT3XZFGMznqkOMAmCa8K7xNdrYMgUvb_KkoPrd6y1Z8cPtScb2KZfWRGxGlMCGGy-aSSpPf0vuWFDOkdDgu5qbltW3t7gGSuNUTK22bf3L0mSghO9p-rgi')",
                  borderColor: `${orangeColor}30`
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = orangeColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = `${orangeColor}30`}
              />

              {/* Profile Dropdown Menu */}
              <div className="absolute left-0 top-full mt-2 w-48 bg-white  dark:bg-bg-dark rounded-xl shadow-lg border border-border-warm dark:border-border-dark opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ">
                <div className="p-2">
                  <Link
                    to="/user/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-[#f3ece8] dark:hover:bg-white/10 rounded-lg transition-colors"
                  >
                    ملفي الشخصي
                  </Link>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-[#f3ece8] dark:hover:bg-white/10 rounded-lg transition-colors">
                    طلباتي
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-[#f3ece8] dark:hover:bg-white/10 rounded-lg transition-colors">
                    الإعدادات
                  </a>
                  <div className="border-t border-border-warm dark:border-border-dark my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#f3ece8] dark:bg-white/10 transition-all duration-300 hover:scale-110 dark:text-white"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${orangeColor}10`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
            >
              {isOpen ? (
                <X className="w-5 h-5 rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-96 mt-4 opacity-100 animate-slide-down' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="bg-[#f3ece8] dark:bg-bg-dark rounded-2xl p-4 space-y-3 border border-border-warm dark:border-border-dark">
            {/* Mobile Search */}
            <div className="relative w-full mb-4">
              <input
                type="text"
                placeholder="ابحث عن قطعة فريدة..."
                className="w-full pr-10 pl-4 py-2.5 bg-white dark:bg-bg-darker border-2 border-transparent rounded-xl focus:ring-2 text-sm transition-all duration-300 dark:text-white dark:placeholder:text-white/50"
                style={{
                  '--tw-ring-color': `${orangeColor}20`,
                  '--tw-ring-offset-shadow': `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
                  '--tw-ring-shadow': `var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) ${orangeColor}20`,
                  boxShadow: `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)`,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = orangeColor;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'transparent';
                }}
                dir="rtl"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-white/70"
                style={{ color: '#956b50' }}
              />
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activePath === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${isActive
                        ? 'text-white shadow-lg'
                        : 'text-gray-600 dark:text-white hover:bg-[#ec4d18]/10'
                      }`}
                    style={{
                      backgroundColor: isActive ? orangeColor : '',
                    }}
                    onClick={() => {
                      setActivePath(link.href);
                      setIsOpen(false);
                    }}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Actions - Grid of icons with animations */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-border-warm dark:border-border-dark">
              {/* Favorite Icon - Mobile */}
              <button className="flex items-center justify-center p-2 rounded-xl bg-white dark:bg-bg-darker border border-border-warm dark:border-border-dark transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white group">
                <Heart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#ec4d18]" />
              </button>

              {/* Dark Mode Icon - Mobile   */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center p-2 rounded-xl bg-white dark:bg-bg-darker border border-border-warm dark:border-border-dark transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white group"
              >
                <div className="relative">
                  {isDark ? (
                    <Sun className="w-5 h-5 transition-all duration-500 group-hover:rotate-90 group-hover:scale-110 group-hover:text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-[#ec4d18]" />
                  )}
                </div>
              </button>

              {/* Language Icon - Mobile */}
              <button className="flex items-center justify-center p-2 rounded-xl bg-white dark:bg-bg-darker border border-border-warm dark:border-border-dark transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white group">
                <Globe className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#ec4d18]" />
              </button>

              {/* Logout Icon - Mobile */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center p-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              >
                <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-red-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;