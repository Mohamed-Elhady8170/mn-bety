import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import logo from "../../assets/Logos/logo02.png";
import { Link } from "react-router-dom";
import useDarkMode from "../../hooks/useDarkMode";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePath, setActivePath] = useState("/");

  // use dark mode state and toggle function
  const [isDark, toggleDarkMode] = useDarkMode();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;

    const toggleLanguage = () => {
    const newLang = currentLang.startsWith('ar') ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    localStorage.setItem('preferred-language', newLang);
  };
  
  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = [
        { id: "home", path: "/" },
        { id: "categories", path: "/#categories" },
        { id: "about", path: "/#about" },
        { id: "sell", path: "/#sell" },
      ];

      if (window.scrollY < 100) {
        setActivePath("/");
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

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

   const navLinks = [
    { name: t('common.home'), href: "/" },
    { name: t('common.categories'), href: "/#categories" },
    { name: t('common.about'), href: "/#about" },
    { name: t('common.start_selling'), href: "/#sell" },
  ];

  // Handle smooth scroll for anchor links
  const handleAnchorClick = (e, href) => {
    e.preventDefault();

    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActivePath("/");
    } else if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
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
          ? "bg-bg-main/95 backdrop-blur-md shadow-lg"
          : "bg-bg-main"
      } border-b border-border-warm px-4 sm:px-6 lg:px-20 h-16 md:h-20 py-4`}
    
    >
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-4 h-full shrink-0">
            <Link
              to="/"
              className="flex items-center h-full"
              onClick={(e) => {
                e.preventDefault();
                handleAnchorClick(e, "/");
              }}
            >
              <img
                src={logo}
                alt={t('common.home')}
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
                    className={`text-xs lg:text-sm font-bold transition-all duration-300 relative group cursor-pointer ${
                      isActive
                        ? "text-primary"
                        : "text-text-navbar hover:text-primary"
                    }`}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full transition-all duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Icons Section  */}
          <div className="flex items-center gap-2 sm:gap-3 h-full ">
            {/* Desktop: Language Button */}
            <button
              onClick={toggleLanguage} 
              className="hidden sm:flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-105 hover:shadow-lg text-text-main text-sm font-bold"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#ec5e0c10")
              }
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            >
              <Globe className="w-4 h-4" />
               <span>{currentLang.startsWith('ar') ? 'EN' : 'AR'}</span> 
            </button>

            {/* Desktop: Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#ec5e0c10")
              }
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
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
            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                to="/auth/login"
                className="hidden sm:block px-2 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm whitespace-nowrap font-bold text-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
              >
                {t('common.login')}
              </Link>
              <Link
                to="/auth/signup"
                className="hidden sm:block px-2 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm whitespace-nowrap font-bold text-white bg-primary rounded-xl hover:bg-[#d35400] transition-all duration-300"
              >
                   {t('common.signup')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-110 text-text-main"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#ec5e0c10")
              }
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
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
            isOpen
              ? "max-h-96 mt-4 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-bg-mobile-menu rounded-2xl p-4 space-y-3 border border-border-warm">
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
                        ? "bg-primary text-white shadow-lg"
                        : "text-text-main hover:bg-primary/10"
                    }`}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            <div className="flex flex-col gap-2 pt-2 border-t border-border-warm">
              <Link
                to="/auth/login"
                className="w-full text-center px-4 py-2.5 text-xs lg:text-sm whitespace-nowrap font-bold text-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                  {t('common.login')}
              </Link>
              <Link
                to="/auth/signup"
                className="w-full text-center px-4 py-2.5 text-xs lg:text-sm whitespace-nowrapfont-bold text-white bg-primary rounded-xl hover:bg-[#d35400] transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                   {t('common.signup')}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-warm">
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center gap-2 p-2 rounded-xl bg-bg-mobile-actions border border-border-warm transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main group"
              >
                <div className="relative">
                  {isDark ? (
                    <Sun className="w-5 h-5 transition-all duration-500 group-hover:rotate-90 group-hover:scale-110 group-hover:text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-primary" />
                  )}
                </div>
                <span className="text-sm">{isDark ?  t('common.light_mode') : t('common.dark_mode')}</span>
              </button>

              <button onClick={toggleLanguage} className="flex items-center justify-center gap-2 p-2 rounded-xl bg-bg-mobile-actions border border-border-warm transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main group">
                <Globe className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
                <span className="text-sm">{currentLang.startsWith('ar') ? 'EN' : 'AR'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;