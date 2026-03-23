import React, { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Home } from 'lucide-react';
import logo from '../../assets/Logos/logo02.png';
import { Link } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';

const AuthNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-500 font-cairo ${
                isScrolled
                    ? 'bg-bg-main/95 backdrop-blur-md shadow-lg'
                    : 'bg-bg-main'
            } border-b border-border-warm px-4 sm:px-6 lg:px-20 h-16 md:h-20 py-4`}
        >
            <div className="max-w-7xl mx-auto h-full">
                <div className="flex items-center justify-between gap-4 lg:gap-8 h-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center h-full">
                        <img
                            src={logo}
                            alt={t('common.home')}
                            className="h-16 sm:h-24 w-auto object-contain -my-4"
                        />
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3 h-full">
                        {/* Desktop: Home Button */}
                        <Link
                            to="/"
                            className="hidden sm:flex items-center gap-1 px-4 py-2 text-sm font-bold text-primary border border-primary rounded-xl hover:bg-primary hover:text-white transition-all"
                        >
                            <Home className="w-4 h-4" />
                            <span>{t('common.home')}</span>
                        </Link>

                        {/* Desktop: Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ec5e0c10'}
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

                        {/* Desktop: Language Button */}
                        <button
                            onClick={toggleLanguage}
                            className="hidden sm:flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-105 hover:shadow-lg text-text-main text-sm font-bold"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ec5e0c10'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            <Globe className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 hover:scale-110" />
                            <span>{currentLang.startsWith('ar') ? 'EN' : 'AR'}</span>
                        </button>

                        {/* Mobile: Home Icon */}
                        <Link
                            to="/"
                            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ec5e0c10'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            <Home className="w-5 h-5" />
                        </Link>

                        {/* Mobile: Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ec5e0c10'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5 transition-all duration-500 hover:rotate-90" />
                            ) : (
                                <Moon className="w-5 h-5 transition-all duration-500 hover:-rotate-12" />
                            )}
                        </button>

                        {/* Mobile: Language Button */}
                        <button
                            onClick={toggleLanguage}
                            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-bg-subtle transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-main"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ec5e0c10'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            <Globe className="w-5 h-5 transition-all duration-500 hover:scale-110" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AuthNavbar;