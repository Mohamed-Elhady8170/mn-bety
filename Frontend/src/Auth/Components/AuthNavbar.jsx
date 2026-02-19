import React, { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Home } from 'lucide-react';
import logo from '../../assets/Logos/logo02.png';
import { Link } from 'react-router-dom';

const AuthNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const orangeColor = '#ec5e0c';

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
                    {/* Logo - كبير زي الأول */}
                    <Link to="/" className="flex items-center h-full">
                        <img
                            src={logo}
                            alt="من بيتي"
                            className="h-16 sm:h-24 w-auto object-contain -my-4"
                        />
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3 h-full">
                      <Link
                            to="/"
                            className="hidden sm:flex items-center gap-1 px-4 py-2 text-sm font-bold text-[#ec4d18] border border-[#ec4d18] rounded-xl hover:bg-[#ec4d18] hover:text-white transition-all"
                        >
                            <Home className="w-4 h-4" />
                            <span>الرئيسية</span>
                        </Link>

                        {/* Desktop: Dark Mode Toggle  */}
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

                        {/* Desktop: Language Button  */}
                        <button
                            className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#f3ece8] dark:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${orangeColor}10`}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            <Globe className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 hover:scale-110" />
                        </button>

                        {/* Mobile: Home Icon */}
                        <Link
                            to="/"
                            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#f3ece8] dark:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${orangeColor}10`}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            <Home className="w-5 h-5" />
                        </Link>

                        {/* Mobile: Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#f3ece8] dark:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${orangeColor}10`}
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
                            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#f3ece8] dark:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg dark:text-white"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${orangeColor}10`}
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