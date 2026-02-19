import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import logo from '../../assets/Logos/logo02.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activePath, setActivePath] = useState('/');

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
    const handleScrollSpy = () => {
      const sections = [
        { id: 'home', path: '/' },
        { id: 'categories', path: '/#categories' },
        { id: 'about', path: '/#about' },
        { id: 'sell', path: '/#sell' }
      ];

    
      if (window.scrollY < 100) {
        setActivePath('/');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActivePath(section.path);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'الرئيسية', href: '/', active: true },
    { name: 'التصنيفات', href: '/#categories', active: false },
    { name: 'من نحن', href: '/#about', active: false },
    { name: 'ابدأ البيع', href: '/#sell', active: false }
  ];

  const orangeColor = '#ec5e0c';

  // Handle smooth scroll for anchor links
  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActivePath('/');
    } else if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setActivePath(href);
    }
    
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 font-cairo ${
        isScrolled
          ? 'bg-white/95 dark:bg-bg-footer/95 backdrop-blur-md shadow-lg'
          : 'bg-white dark:bg-bg-footer'
      } border-b border-[#e7d5cf] dark:border-[#3d2a24] px-4 sm:px-6 lg:px-20 h-16 md:h-20 py-4`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-4 h-full">
            <Link 
              to="/" 
              className="flex items-center h-full" 
              onClick={(e) => {
                e.preventDefault();
                handleAnchorClick(e, '/');
              }}
            >
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
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-bold transition-all duration-300 relative group cursor-pointer ${
                      isActive
                        ? 'text-[#ec4d18]'
                        : 'text-gray-600 dark:text-white hover:text-[#ec4d18]'
                    }`}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-2 left-0 w-full h-0.5 rounded-full transition-all duration-300 ${
                        isActive
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

          {/* Icons Section  */}
          <div className="flex items-center gap-2 sm:gap-3 h-full">
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

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to="/auth/login"
                className="hidden sm:block px-4 py-2 text-sm font-bold text-[#ec4d18] border-2 border-[#ec4d18] rounded-xl hover:bg-[#ec4d18] hover:text-white transition-all duration-300"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/auth/signup"
                className="hidden sm:block px-4 py-2 text-sm font-bold text-white bg-[#ec4d18] rounded-xl hover:bg-[#d35400] transition-all duration-300"
              >
                إنشاء حساب
              </Link>
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

        {/* Mobile Menu Dropdown  */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-96 mt-4 opacity-100 animate-slide-down' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#f3ece8] dark:bg-[#2d2d2d] rounded-2xl p-4 space-y-3 border border-[#e7d5cf] dark:border-[#3d2a24]">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activePath === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'text-white shadow-lg'
                        : 'text-gray-600 dark:text-white hover:bg-[#ec4d18]/10'
                    }`}
                    style={{
                      backgroundColor: isActive ? orangeColor : '',
                    }}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#e7d5cf] dark:border-[#3d2a24]">
              <Link
                to="/auth/login"
                className="w-full text-center px-4 py-2.5 text-sm font-bold text-[#ec4d18] border-2 border-[#ec4d18] rounded-xl hover:bg-[#ec4d18] hover:text-white transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/auth/signup"
                className="w-full text-center px-4 py-2.5 text-sm font-bold text-white bg-[#ec4d18] rounded-xl hover:bg-[#d35400] transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                إنشاء حساب
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#e7d5cf] dark:border-[#3d2a24]">
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white dark:bg-[#3d3d3d] border border-[#e7d5cf] dark:border-[#3d2a24] transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white group"
              >
                <div className="relative">
                  {isDark ? (
                    <Sun className="w-5 h-5 transition-all duration-500 group-hover:rotate-90 group-hover:scale-110 group-hover:text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-[#ec4d18]" />
                  )}
                </div>
                <span className="text-sm">{isDark ? 'فاتح' : 'داكن'}</span>
              </button>

              <button className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white dark:bg-[#3d3d3d] border border-[#e7d5cf] dark:border-[#3d2a24] transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white group">
                <Globe className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#ec4d18]" />
                <span className="text-sm">EN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;