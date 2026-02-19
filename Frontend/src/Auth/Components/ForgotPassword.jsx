// ForgotPassword.jsx
import React, { useState } from 'react';
import { Mail, ArrowRight, HelpCircle, Sparkles, Award, Shield, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Floating icons data
const floatingIcons = [
    { Icon: Sparkles, delay: 0, size: 20, left: 10, top: 20, duration: 15 },
    { Icon: Award, delay: 2, size: 18, left: 30, top: 40, duration: 18 },
    { Icon: Shield, delay: 4, size: 16, left: 70, top: 60, duration: 20 },
    { Icon: Truck, delay: 1, size: 22, left: 50, top: 80, duration: 16 },
    { Icon: Sparkles, delay: 3, size: 14, left: 80, top: 30, duration: 22 },
    { Icon: Award, delay: 5, size: 20, left: 20, top: 70, duration: 17 },
];

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    const getEmailErrorMessage = (email) => {
        if (!email) return 'البريد الإلكتروني مطلوب';
        if (!validateEmail(email)) return 'البريد الإلكتروني غير صالح (مثال: name@domain.com)';
        return '';
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
        if (touched) {
            const errorMsg = getEmailErrorMessage(e.target.value);
            setError(errorMsg);
        }
    };

    const handleBlur = () => {
        setTouched(true);
        const errorMsg = getEmailErrorMessage(email);
        setError(errorMsg);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched(true);
        
        const errorMsg = getEmailErrorMessage(email);
        setError(errorMsg);

        if (!errorMsg) {
            console.log('Reset password requested for:', email);
            navigate('/auth/verify-code');
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

            <div className="w-full max-w-120 bg-white dark:bg-bg-footer rounded-2xl shadow-xl shadow-[#ec4d18]/5 border border-border-warm dark:border-border-dark relative z-10 backdrop-blur-sm overflow-hidden">

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#ec4d18]/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#ec4d18]/10 rounded-full blur-xl animate-pulse delay-700"></div>

                <div className="p-6 md:p-8 flex flex-col gap-6">

                    {/* Text Section */}
                    <div className="flex flex-col gap-3 text-right animate-fadeIn">
                        <h1 className="text-text-main dark:text-white text-2xl md:text-3xl font-black leading-tight">
                            نسيت كلمة المرور؟
                        </h1>
                        <p className="text-[#956b50] dark:text-border-warm text-sm md:text-base font-normal leading-relaxed">
                            لا تقلق، أدخل بريدك الإلكتروني وسنرسل لك رمزاً لإعادة تعيين كلمة المرور الخاصة بك فوراً.
                        </p>
                    </div>

                    {/* Input Section */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2 group">
                            <label className="text-text-main dark:text-white text-sm font-semibold px-1 transition-colors group-focus-within:text-[#ec4d18]">
                                البريد الإلكتروني
                            </label>
                            <div className="relative">
                                <Mail className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${error && touched ? 'text-red-500' : 'text-[#956b50] dark:text-border-warm opacity-50 group-focus-within:opacity-100 group-focus-within:text-[#ec4d18]'}`} />
                                <input
                                    className={`w-full rounded-xl border ${error && touched ? 'border-red-500' : 'border-border-warm dark:border-border-dark'} bg-[#f3ece8] dark:bg-white/5 py-3.5 pr-12 pl-4 text-sm focus:ring-2 focus:ring-[#ec4d18]/20 focus:border-[#ec4d18] transition-all duration-300 outline-none dark:text-white dark:placeholder:text-white/50 group-focus-within:shadow-lg group-focus-within:shadow-[#ec4d18]/10`}
                                    placeholder="example@domain.com"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {error && touched && (
                                <p className="text-red-500 text-xs pr-1 mt-1 bg-red-50 dark:bg-red-500/10 p-2 rounded-lg border border-red-200 dark:border-red-500/20">
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Action Button */}
                        <button
                            type="submit"
                            className="flex w-full cursor-pointer items-center justify-center rounded-xl h-12 bg-[#ec4d18] hover:bg-[#d43d0a] text-white text-base font-bold transition-all shadow-lg shadow-[#ec4d18]/20 hover:shadow-xl hover:shadow-[#ec4d18]/30 active:scale-[0.98] gap-2 group"
                        >
                            <span>إرسال رمز التحقق</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </form>

                    {/* Decorative Divider */}
                    <div className="flex items-center gap-4 py-2">
                        <div className="h-px grow bg-border-warm dark:bg-border-dark"></div>
                        <span className="text-[#956b50] dark:text-border-warm text-xs uppercase tracking-widest font-bold">أو</span>
                        <div className="h-px grow bg-border-warm dark:bg-border-dark"></div>
                    </div>

                    {/* Support Link */}
                    <div className="text-center animate-fadeIn delay-200">
                        <p className="text-[#956b50] dark:text-border-warm text-sm">
                            تواجه مشكلة؟ <a href="#" className="text-[#ec4d18] font-bold hover:underline mr-1 transition-all hover:scale-105 inline-block">تواصل مع الدعم الفني</a>
                        </p>
                    </div>

                    {/* Back to Login */}
                    <div className="text-center">
                        <Link to="/auth/login" className="inline-flex items-center gap-1 text-sm text-text-main dark:text-white font-medium hover:text-[#ec4d18] transition-colors group">
                            <span className="group-hover:translate-x-1 transition-transform">العودة إلى تسجيل الدخول</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ForgotPassword;