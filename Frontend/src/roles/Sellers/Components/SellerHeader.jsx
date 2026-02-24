import React from 'react';
import { Bell, Search, Menu, Home, Moon, Sun, Globe } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import { Link } from 'react-router-dom';

export default function SellerHeader({ onMenuClick }) {
  const [isDark, toggleDarkMode] = useDarkMode();

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
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-text-soft" size={20} />
              <input 
                type="text" 
                placeholder="ابحث في لوحة التحكم..." 
                className="w-full bg-bg-subtle border border-border-warm rounded-xl py-2 pr-10 pl-4 focus:outline-none focus:border-primary text-text-main placeholder-text-soft/70"
              />
            </div>
          </div>

          {/* Right side - Icons - زودت المسافة هنا بين القسمين */}
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
                  <Sun size={16} className="sm:w-4.5 sm:h-4.5 transition-all duration-500 hover:rotate-90" />
                ) : (
                  <Moon size={16} className="sm:w-4.5 sm:h-4.5 transition-all duration-500 hover:-rotate-12" />
                )}
              </div>
            </button>

            {/* Language Button */}
            <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle hover:bg-bg-warm transition-all text-text-main">
              <Globe size={16} className="sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Notifications */}
            <button className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-bg-subtle hover:bg-bg-warm transition-all text-text-main">
              <Bell size={16} className="sm:w-4.5 sm:h-4.5" />
              <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-main"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pr-4 mr-2 border-r border-border-warm">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" 
                alt="Profile" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-primary" 
              />
              <div className="hidden lg:block text-right">
                <p className="text-sm font-bold text-text-main leading-tight">مشغل نورة</p>
                <p className="text-xs text-text-soft">حرفي معتمد</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}