// VerifyCode.jsx
import React, { useState, useRef } from 'react';
import { Mail, ArrowRight, Sparkles, Award, Shield, Truck } from 'lucide-react';
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

const VerifyCode = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <main className="flex-1 flex items-center justify-center p-4 md:p-6 bg-gray-50 dark:bg-[#1a1a1a] font-cairo min-h-[calc(100vh-80px)] relative overflow-hidden">

            {/* Animated Background Elements */}
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

            <div className="w-full max-w-120 bg-white dark:bg-bg-footer rounded-2xl shadow-xl shadow-[#ec4d18]/5 border border-[#e7d5cf] dark:border-[#3d2a24] relative z-10 backdrop-blur-sm overflow-hidden">

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#ec4d18]/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#ec4d18]/10 rounded-full blur-xl animate-pulse delay-700"></div>

                <div className="p-6 md:p-8 flex flex-col gap-6">

                    {/* Header Section */}
                    <div className="text-center animate-fadeIn">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ec4d18]/10 rounded-full mb-4">
                            <Mail className="text-[#ec4d18] w-8 h-8" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-text-main dark:text-white mb-2">تحقق من الرمز</h2>
                        <p className="text-[#956b50] dark:text-[#e7d5cf] text-sm md:text-base leading-relaxed">
                            أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك الإلكتروني
                        </p>
                    </div>

                    {/* OTP Input Form */}
                    <div className="space-y-6">
                        <div className="flex justify-between gap-2 sm:gap-4" dir="ltr">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    value={digit}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        handleChange(index, value);
                                    }}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-full aspect-square text-center text-xl md:text-2xl font-bold border-0 border-b-2 border-[#e7d5cf] dark:border-[#3d2a24] focus:border-[#ec4d18] focus:ring-0 bg-transparent transition-all dark:text-white outline-none"
                                    maxLength="1"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\d*"
                                />
                            ))}
                        </div>

                        {/* Action Button */}
                        <Link to="/auth/reset-password" className="w-full block mb-4"> 
                            <button className="w-full h-12 bg-[#ec4d18] hover:bg-[#d43d0a] text-white rounded-xl text-base font-bold transition-all shadow-lg shadow-[#ec4d18]/20 hover:shadow-xl hover:shadow-[#ec4d18]/30 active:scale-[0.98] flex items-center justify-center gap-2">
                                <span>تحقق</span>
                            </button>
                        </Link>

                        {/* Footer Links */}
                        <div className="text-center space-y-3 animate-fadeIn delay-200">
                            <p className="text-[#956b50] dark:text-[#e7d5cf] text-sm">
                                لم يصلك الرمز؟
                                <a href="#" className="text-[#ec4d18] font-bold hover:underline mr-1 transition-all hover:scale-105 inline-block">إعادة إرسال الرمز</a>
                            </p>
                            <Link to="/auth/login" className="inline-flex items-center gap-1 text-sm text-text-main dark:text-white font-medium hover:text-[#ec4d18] transition-colors group">
                                <span className="group-hover:translate-x-1 transition-transform">العودة إلى تسجيل الدخول</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default VerifyCode;