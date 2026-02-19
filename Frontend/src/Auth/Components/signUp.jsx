import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Sparkles, Truck, Shield, Award, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Floating icons data
const floatingIcons = [
  { Icon: Sparkles, delay: 0, size: 20, left: 10, top: 20, duration: 15 },
  { Icon: Award, delay: 2, size: 18, left: 30, top: 40, duration: 18 },
  { Icon: Shield, delay: 4, size: 16, left: 70, top: 60, duration: 20 },
  { Icon: Truck, delay: 1, size: 22, left: 50, top: 80, duration: 16 },
  { Icon: Sparkles, delay: 3, size: 14, left: 80, top: 30, duration: 22 },
  { Icon: Award, delay: 5, size: 20, left: 20, top: 70, duration: 17 },
];

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('buyer');


  return (
    <main className="flex-1 flex items-center justify-center p-4 md:p-6 bg-gray-50 dark:bg-[#1a1a1a] font-cairo min-h-[calc(100vh-80px)] relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#ec4d18]/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#ec4d18]/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#ec4d18]/10 rounded-full animate-pulse delay-700"></div>
        
        {/* Floating icons */}
        {floatingIcons.map((item, index) => {
          const Icon = item.Icon;
          return (
            <div
              key={index}
              className="absolute text-[#ec4d18]/30 dark:text-[#ec4d18]/20"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                animation: `floatBg  ${item.duration}s ease-in-out ${item.delay}s infinite`,
              }}
            >
              <Icon size={item.size} />
            </div>
          );
        })}

        {/* Animated lines */}
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

        {/* Floating particles */}
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#ec4d18]/50 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#ec4d18]/50 rounded-full animate-ping delay-300"></div>
        <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-[#ec4d18]/50 rounded-full animate-ping delay-700"></div>
      </div>

      <div className="flex w-full max-w-[1100px] overflow-hidden rounded-3xl bg-white dark:bg-[#211711] shadow-xl shadow-[#ec4d18]/5 border border-[#e7d5cf] dark:border-[#3d2a24] relative z-10 backdrop-blur-sm bg-white/95 dark:bg-[#211711]/95">
        
        {/* Registration Form Section */}
        <div className="flex w-full flex-col p-6 md:p-10 lg:w-1/2 relative">
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#ec4d18]/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#ec4d18]/10 rounded-full blur-xl animate-pulse delay-700"></div>

          <div className="mb-6 animate-fadeIn">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1b130e] dark:text-white mb-2">إنشاء حساب جديد</h1>
            <p className="text-[#956b50] dark:text-[#e7d5cf] text-sm md:text-base">انضم إلى أكبر مجتمع للحرفيين والمبدعين في المنطقة</p>
          </div>

          <form className="flex flex-col gap-4">
            {/* Role Selector */}
            <div className="flex flex-col gap-2 animate-fadeIn delay-100">
              <span className="text-[#1b130e] dark:text-white text-sm font-semibold">نوع الحساب</span>
              <div className="flex h-11 w-full items-center justify-center rounded-xl bg-[#f3ece8] dark:bg-white/5 p-1">
                <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-bold transition-all duration-300 ${selectedRole === 'buyer' ? 'bg-white dark:bg-[#211711] shadow-sm text-[#ec4d18]' : 'text-[#956b50] dark:text-[#e7d5cf] hover:text-[#ec4d18]'}`}>
                  <span className="truncate">مشتري (تسوق)</span>
                  <input 
                    checked={selectedRole === 'buyer'} 
                    onChange={() => setSelectedRole('buyer')}
                    className="invisible w-0" 
                    name="role" 
                    type="radio" 
                    value="buyer"
                  />
                </label>
                <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-bold transition-all duration-300 ${selectedRole === 'seller' ? 'bg-white dark:bg-[#211711] shadow-sm text-[#ec4d18]' : 'text-[#956b50] dark:text-[#e7d5cf] hover:text-[#ec4d18]'}`}>
                  <span className="truncate">بائع (حرفي)</span>
                  <input 
                    checked={selectedRole === 'seller'} 
                    onChange={() => setSelectedRole('seller')}
                    className="invisible w-0" 
                    name="role" 
                    type="radio" 
                    value="seller"
                  />
                </label>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Full Name */}
              <div className="flex flex-col gap-1 md:col-span-2 group">
                <span className="text-[#1b130e] dark:text-white text-sm font-semibold transition-colors group-focus-within:text-[#ec4d18]">الاسم الكامل</span>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#956b50] dark:text-[#e7d5cf] opacity-50 transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-[#ec4d18] group-focus-within:scale-110" />
                  <input 
                    className="w-full rounded-xl border border-[#e7d5cf] dark:border-[#3d2a24] bg-[#f3ece8] dark:bg-white/5 py-2.5 pr-10 pl-3 text-sm focus:ring-2 focus:ring-[#ec4d18]/20 focus:border-[#ec4d18] transition-all duration-300 outline-none dark:text-white dark:placeholder:text-white/50 group-focus-within:shadow-lg group-focus-within:shadow-[#ec4d18]/10" 
                    placeholder="أدخل اسمك بالكامل" 
                    type="text"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-1 group">
                <span className="text-[#1b130e] dark:text-white text-sm font-semibold transition-colors group-focus-within:text-[#ec4d18]">البريد الإلكتروني</span>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#956b50] dark:text-[#e7d5cf] opacity-50 transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-[#ec4d18] group-focus-within:scale-110" />
                  <input 
                    className="w-full rounded-xl border border-[#e7d5cf] dark:border-[#3d2a24] bg-[#f3ece8] dark:bg-white/5 py-2.5 pr-10 pl-3 text-sm transition-all duration-300 outline-none dark:text-white dark:placeholder:text-white/50 group-focus-within:shadow-lg group-focus-within:shadow-[#ec4d18]/10" 
                    placeholder="example@domain.com" 
                    type="email"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-1 group">
                <span className="text-[#1b130e] dark:text-white text-sm font-semibold transition-colors group-focus-within:text-[#ec4d18]">رقم الهاتف</span>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#956b50] dark:text-[#e7d5cf] opacity-50 transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-[#ec4d18] group-focus-within:scale-110" />
                  <input 
                    className="w-full rounded-xl border border-[#e7d5cf] dark:border-[#3d2a24] bg-[#f3ece8] dark:bg-white/5 py-2.5 pr-10 pl-3 text-sm text-right transition-all duration-300 outline-none dark:text-white dark:placeholder:text-white/50 group-focus-within:shadow-lg group-focus-within:shadow-[#ec4d18]/10" 
                    dir="ltr" 
                    placeholder="+966 50 000 0000" 
                    type="tel"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1 md:col-span-2 group">
                <span className="text-[#1b130e] dark:text-white text-sm font-semibold transition-colors group-focus-within:text-[#ec4d18]">كلمة المرور</span>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#956b50] dark:text-[#e7d5cf] opacity-50 transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-[#ec4d18] group-focus-within:scale-110" />
                  <input 
                    className="w-full rounded-xl border border-[#e7d5cf] dark:border-[#3d2a24] bg-[#f3ece8] dark:bg-white/5 py-2.5 pr-10 pl-9 text-sm transition-all duration-300 outline-none dark:text-white dark:placeholder:text-white/50 group-focus-within:shadow-lg group-focus-within:shadow-[#ec4d18]/10" 
                    placeholder="********" 
                    type={showPassword ? "text" : "password"}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#956b50] dark:text-[#e7d5cf] hover:text-[#ec4d18] transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 py-1 animate-fadeIn delay-200">
              <input 
                className="mt-1 h-4 w-4 rounded border-[#e7d5cf] text-[#ec4d18] focus:ring-[#ec4d18]/20 transition-all" 
                id="terms" 
                type="checkbox"
              />
              <label className="text-xs sm:text-sm text-[#956b50] dark:text-[#e7d5cf] leading-relaxed" htmlFor="terms">
                أوافق على <Link to="#" className="text-[#ec4d18] font-bold hover:underline underline-offset-4 transition-all">الشروط والأحكام</Link> و <Link to="#" className="text-[#ec4d18] font-bold hover:underline underline-offset-4 transition-all">سياسة الخصوصية</Link> الخاصة بسوق الحرف.
              </label>
            </div>

            {/* CTA */}
            <button className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#ec4d18] py-3 text-base font-bold text-white shadow-lg shadow-[#ec4d18]/20 transition-all duration-300 hover:bg-[#d43d0a] hover:scale-[1.01] hover:shadow-xl hover:shadow-[#ec4d18]/30 active:scale-[0.98] gap-2 group">
              <span>إنشاء الحساب</span>
              <Check className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            </button>

            <div className="mt-2 text-center animate-fadeIn delay-300">
              <p className="text-[#956b50] dark:text-[#e7d5cf] text-sm">
                لديك حساب بالفعل؟ 
                <Link to="/auth/login" className="text-[#ec4d18] font-bold hover:underline mr-1 transition-all hover:mr-2">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Visual Brand Section */}
        <div className="hidden lg:relative lg:flex lg:w-1/2 items-center justify-center bg-[#f3ece8] dark:bg-[#2d2d2d] p-8 overflow-hidden group">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Traditional pottery workshop" 
              className="h-full w-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrg3vmm_s7yWM-S_43O8Ekj7z58lRjJbDgo7-SL0WJgK_YEok1McylNMrtzxdVo8J1mO1AwkAPJcV2W6FTMZwo2tZKeZZmb_we5_ilHznfP4qYKGFb5HiksyhcbTdiETzdje5VTU7AKcCNYvq2s9tOU63eZMr1GUSoabxZSb3a59Jy_N2oxup43QCTD4PzLqhSztka8Jp3JJNkFjUlTlahUeW0fyG1TPC6VYt8bIB_97eH45c-3K76KSBvGLD4lX85vGTA6WL8LmiG"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f3ece8] dark:from-[#2d2d2d] via-transparent to-transparent"></div>
          </div>

          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#ec4d18]/10 animate-pulse"></div>
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[#ec4d18]/5 animate-pulse delay-700"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-[#211711] shadow-xl shadow-[#ec4d18]/10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Sparkles className="text-3xl text-[#ec4d18] w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-[#1b130e] dark:text-white mb-3 transition-transform duration-500 group-hover:translate-y-[-3px]">احترافية، جودة، وأصالة</h3>
            <p className="max-w-md text-[#956b50] dark:text-[#e7d5cf] text-sm leading-relaxed mb-8">
              انضم إلينا لنحيي التراث العربي من خلال دعم الحرفيين المبدعين وتسهيل وصول منتجاتهم الفريدة لكل بيت.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/80 dark:bg-[#211711]/80 backdrop-blur p-3 border border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Shield className="text-[#ec4d18] mb-1 w-5 h-5 mx-auto" />
                <h4 className="font-bold text-xs text-[#1b130e] dark:text-white">بائعون موثوقون</h4>
              </div>
              <div className="rounded-xl bg-white/80 dark:bg-[#211711]/80 backdrop-blur p-3 border border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Truck className="text-[#ec4d18] mb-1 w-5 h-5 mx-auto" />
                <h4 className="font-bold text-xs text-[#1b130e] dark:text-white">شحن لكل المناطق</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;