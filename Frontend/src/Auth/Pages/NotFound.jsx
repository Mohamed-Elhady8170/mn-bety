import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle, Sparkles, Award, Shield, Truck } from 'lucide-react';

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
  return (
    <main className="flex-1 flex items-center justify-center p-4 md:p-6 bg-gray-50 dark:bg-[#1a1a1a] font-cairo min-h-[calc(100vh-80px)] relative overflow-hidden">
      
      {/* Animated Background Elements   */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#ec4d18]/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#ec4d18]/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#ec4d18]/10 rounded-full animate-pulse delay-700"></div>
        
        {floatingIcons.map((item, index) => {
          const Icon = item.Icon;
          return (
            <div
              key={index}
              className="absolute text-[#ec4d18]/30 dark:text-[#ec4d18]/20"
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

        <svg className="absolute top-0 right-0 w-64 h-64 text-[#ec4d18]/20" viewBox="0 0 200 200">
          <path d="M0,100 Q50,50 100,100 T200,100" stroke="currentColor" fill="none" strokeWidth="2">
            <animate attributeName="d" dur="10s" values="M0,100 Q50,50 100,100 T200,100; M0,100 Q50,150 100,100 T200,100; M0,100 Q50,50 100,100 T200,100" repeatCount="indefinite" />
          </path>
        </svg>
        
        <svg className="absolute bottom-0 left-0 w-56 h-56 text-[#ec4d18]/20" viewBox="0 0 200 200">
          <path d="M0,100 Q50,150 100,100 T200,100" stroke="currentColor" fill="none" strokeWidth="2">
            <animate attributeName="d" dur="12s" values="M0,100 Q50,150 100,100 T200,100; M0,100 Q50,50 100,100 T200,100; M0,100 Q50,150 100,100 T200,100" repeatCount="indefinite" />
          </path>
        </svg>

        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#ec4d18]/50 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#ec4d18]/50 rounded-full animate-ping delay-300"></div>
        <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-[#ec4d18]/50 rounded-full animate-ping delay-700"></div>
      </div>

      <div className="w-full max-w-150 bg-white dark:bg-bg-footer rounded-2xl shadow-xl shadow-[#ec4d18]/5 border border-[#e7d5cf] dark:border-[#3d2a24] relative z-10 backdrop-blur-sm overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#ec4d18]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#ec4d18]/10 rounded-full blur-xl animate-pulse delay-700"></div>

        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          
          {/* 404 Number with Animation */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#ec4d18]/20 blur-3xl rounded-full"></div>
            <h1 className="text-8xl md:text-9xl font-black text-[#ec4d18] relative animate-pulse">404</h1>
          </div>

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#ec4d18]/10 rounded-full mb-6">
            <AlertTriangle className="text-[#ec4d18] w-10 h-10" />
          </div>

          {/* Text Content */}
          <h2 className="text-3xl md:text-4xl font-black text-text-main dark:text-white mb-3 animate-fadeIn">
            الصفحة غير موجودة
          </h2>
          
          <p className="text-[#956b50] dark:text-[e7d5cf] text-base md:text-lg mb-8 max-w-md animate-fadeIn delay-100">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها. تحقق من الرابط أو عد إلى الصفحة الرئيسية.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full animate-fadeIn delay-200">
            <Link to="/" className="flex-1">
              <button className="w-full h-12 bg-[#ec4d18] hover:bg-[#d43d0a] text-white rounded-xl text-base font-bold transition-all shadow-lg shadow-[#ec4d18]/20 hover:shadow-xl hover:shadow-[#ec4d18]/30 active:scale-[0.98] flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                <span>الصفحة الرئيسية</span>
              </button>
            </Link>
            
            <Link to="/auth/login" className="flex-1">
              <button className="w-full h-12 border-2 border-[#ec4d18] text-[#ec4d18] hover:bg-[#ec4d18] hover:text-white rounded-xl text-base font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <span>تسجيل الدخول</span>
              </button>
            </Link>
          </div>

          {/* Help Text */}
          <p className="mt-8 text-sm text-[#956b50] dark:text-[#e7d5cf]">
            أو يمكنك{" "}
            <a href="#" className="text-[#ec4d18] font-bold hover:underline">
              التواصل مع الدعم الفني
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;