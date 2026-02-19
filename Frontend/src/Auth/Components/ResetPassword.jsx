// ResetPassword.jsx
import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Check, ArrowRight, Sparkles, Award, Shield, Truck } from 'lucide-react';
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

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

            <div className="w-full max-w-[480px] bg-white dark:bg-[#211711] rounded-2xl shadow-xl shadow-[#ec4d18]/5 border border-[#e7d5cf] dark:border-[#3d2a24] relative z-10 backdrop-blur-sm bg-white/95 dark:bg-[#211711]/95 overflow-hidden">

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#ec4d18]/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#ec4d18]/10 rounded-full blur-xl animate-pulse delay-700"></div>

                <div className="p-6 md:p-8 flex flex-col gap-6">

                    {/* Header Section */}
                    <div className="text-center animate-fadeIn">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ec4d18]/10 rounded-full mb-4">
                            <Lock className="text-[#ec4d18] w-8 h-8" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-[#1b130e] dark:text-white mb-2">تعيين كلمة مرور جديدة</h2>
                        <p className="text-[#956b50] dark:text-[#e7d5cf] text-sm md:text-base">يرجى إدخال كلمة المرور الجديدة أدناه لتأمين حسابك في سوق الحرف.</p>
                    </div>

                    <form className="space-y-4">
                        {/* New Password Field */}
                        <div className="space-y-2 group">
                            <label className="block text-sm font-semibold text-[#1b130e] dark:text-white transition-colors group-focus-within:text-[#ec4d18]">
                                كلمة المرور الجديدة
                            </label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#956b50] dark:text-[#e7d5cf] opacity-50 transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-[#ec4d18] group-focus-within:scale-110" />
                                <input
                                    className="w-full rounded-xl border border-[#e7d5cf] dark:border-[#3d2a24] bg-[#f3ece8] dark:bg-white/5 py-3 pr-10 pl-10 text-sm focus:ring-2 focus:ring-[#ec4d18]/20 focus:border-[#ec4d18] transition-all duration-300 outline-none dark:text-white dark:placeholder:text-white/50 group-focus-within:shadow-lg group-focus-within:shadow-[#ec4d18]/10"
                                    placeholder="أدخل كلمة المرور الجديدة"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#956b50] dark:text-[#e7d5cf] hover:text-[#ec4d18] transition-all duration-300 hover:scale-110"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <p className="text-xs text-[#956b50] dark:text-[#e7d5cf] pr-1 flex items-center gap-1">
                                <span className="text-sm">ℹ️</span>
                                يجب أن تتكون من 8 أحرف على الأقل
                            </p>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2 group">
                            <label className="block text-sm font-semibold text-[#1b130e] dark:text-white transition-colors group-focus-within:text-[#ec4d18]">
                                تأكيد كلمة المرور
                            </label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#956b50] dark:text-[#e7d5cf] opacity-50 transition-all duration-300 group-focus-within:opacity-100 group-focus-within:text-[#ec4d18] group-focus-within:scale-110" />
                                <input
                                    className="w-full rounded-xl border border-[#e7d5cf] dark:border-[#3d2a24] bg-[#f3ece8] dark:bg-white/5 py-3 pr-10 pl-10 text-sm focus:ring-2 focus:ring-[#ec4d18]/20 focus:border-[#ec4d18] transition-all duration-300 outline-none dark:text-white dark:placeholder:text-white/50 group-focus-within:shadow-lg group-focus-within:shadow-[#ec4d18]/10"
                                    placeholder="أعد إدخال كلمة المرور"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#956b50] dark:text-[#e7d5cf] hover:text-[#ec4d18] transition-all duration-300 hover:scale-110"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-2">
                            <Link to="/auth/login" className="w-full block">
                                <button className="w-full h-12 bg-[#ec4d18] hover:bg-[#d43d0a] text-white rounded-xl text-base font-bold shadow-lg shadow-[#ec4d18]/20 hover:shadow-xl hover:shadow-[#ec4d18]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                                    <span>حفظ وتغيير كلمة المرور</span>
                                    <Check className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                </button>
                            </Link>
                        </div>

                        {/* Secondary Link */}
                        <div className="text-center pt-2 animate-fadeIn delay-200">
                            <Link to="/auth/login" className="inline-flex items-center gap-1 text-sm text-[#1b130e] dark:text-white font-medium hover:text-[#ec4d18] transition-colors group">
                                <span className="group-hover:translate-x-1 transition-transform">العودة إلى تسجيل الدخول</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ResetPassword;