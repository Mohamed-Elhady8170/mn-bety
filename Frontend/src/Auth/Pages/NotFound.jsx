import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle, Sparkles, Award, Shield, Truck } from 'lucide-react';
import useDarkMode from '../../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';

// Floating icons data  
const floatingIcons = [
  { Icon: Sparkles, delay: 0, size: 20, left: 10, top: 20, duration: 15 },
  { Icon: Award, delay: 2, size: 18, left: 30, top: 40, duration: 18 },
  { Icon: Shield, delay: 4, size: 16, left: 70, top: 60, duration: 20 },
  { Icon: Truck, delay: 1, size: 22, left: 50, top: 80, duration: 16 },
  { Icon: Sparkles, delay: 3, size: 14, left: 80, top: 30, duration: 22 },
  { Icon: Award, delay: 5, size: 20, left: 20, top: 70, duration: 17 },
];

const NotFound = () => {
  useDarkMode();
  const { t } = useTranslation();

  return (
    <main className="flex-1 flex items-center justify-center p-4 md:p-6 bg-bg-light font-cairo min-h-screen relative overflow-hidden">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/10 rounded-full animate-pulse delay-700"></div>

        {floatingIcons.map((item, index) => {
          const Icon = item.Icon;
          return (
            <div
              key={index}
              className="absolute text-primary/30"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                animation: `floatBg ${item.duration}s ease-in-out ${item.delay}s infinite`,
              }}
            >
              <Icon size={item.size} />
            </div>
          );
        })}

        <svg className="absolute top-0 right-0 w-64 h-64 text-primary/20" viewBox="0 0 200 200">
          <path d="M0,100 Q50,50 100,100 T200,100" stroke="currentColor" fill="none" strokeWidth="2">
            <animate attributeName="d" dur="10s" values="M0,100 Q50,50 100,100 T200,100; M0,100 Q50,150 100,100 T200,100; M0,100 Q50,50 100,100 T200,100" repeatCount="indefinite" />
          </path>
        </svg>

        <svg className="absolute bottom-0 left-0 w-56 h-56 text-primary/20" viewBox="0 0 200 200">
          <path d="M0,100 Q50,150 100,100 T200,100" stroke="currentColor" fill="none" strokeWidth="2">
            <animate attributeName="d" dur="12s" values="M0,100 Q50,150 100,100 T200,100; M0,100 Q50,50 100,100 T200,100; M0,100 Q50,150 100,100 T200,100" repeatCount="indefinite" />
          </path>
        </svg>

        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary/50 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/50 rounded-full animate-ping delay-300"></div>
        <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-primary/50 rounded-full animate-ping delay-700"></div>
      </div>

      <div className="w-full max-w-150 bg-bg-main rounded-2xl shadow-xl shadow-primary/5 border border-border-warm relative z-10 backdrop-blur-sm overflow-hidden">

        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse delay-700"></div>

        <div className="p-8 md:p-12 flex flex-col items-center text-center">

          {/* 404 Number with Animation */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <h1 className="text-8xl md:text-9xl font-black text-primary relative animate-pulse">404</h1>
          </div>

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <AlertTriangle className="text-primary w-10 h-10" />
          </div>

          {/* Text Content */}
          <h2 className="text-3xl md:text-4xl font-black text-text-main mb-3 animate-fadeIn">
            {t('not_found.title')}
          </h2>

          <p className="text-text-subtle text-base md:text-lg mb-8 max-w-md animate-fadeIn delay-100">
            {t('not_found.subtitle')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full animate-fadeIn delay-200">
            <Link to="/" className="flex-1">
              <button className="w-full h-12 bg-primary hover:bg-[#d43d0a] text-white rounded-xl text-base font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                <span>{t('common.home')}</span>
              </button>
            </Link>

            <Link to="/auth/login" className="flex-1">
              <button className="w-full h-12 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl text-base font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <span>{t('common.login')}</span>
              </button>
            </Link>
          </div>

          {/* Help Text */}
          <p className="mt-8 text-sm text-text-subtle">
            {t('not_found.or_you_can')}{" "}
            <a href="#" className="text-primary font-bold hover:underline">
              {t('auth.contact_support')}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;