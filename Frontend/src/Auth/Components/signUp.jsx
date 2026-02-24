
import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Sparkles, Truck, Shield, Award, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 1. Validation Schema using Zod
const signUpSchema = z.object({
    fullName: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
    email: z.string().email('البريد الإلكتروني غير صالح (مثال: name@domain.com)'),
    phone: z.string().regex(/^[\d+\-\s]{10,}$/, 'رقم الهاتف غير صالح (مثال: +966 50 000 0000)'),
    password: z.string()
        .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
        .regex(/[a-z]/, 'يجب أن تحتوي على حرف صغير واحد على الأقل')
        .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير واحد على الأقل')
        .regex(/\d/, 'يجب أن تحتوي على رقم واحد على الأقل'),
    terms: z.literal(true, {
        errorMap: () => ({ message: 'يجب الموافقة على الشروط والأحكام' }),
    }),
});

// Floating icons data for background animation
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
    const navigate = useNavigate();

    // 2. React Hook Form Setup
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            terms: false
        }
    });

    // Watch password for real-time requirement list coloring
    const passwordValue = watch("password", "");

    const onSubmit = (data) => {
        // Here we combine the form data with the manually selected role
        console.log('SignUp successful', { ...data, role: selectedRole });
        navigate('/auth/login');
    };

    return (
        <main className="flex-1 flex items-center justify-center p-4 md:p-6 bg-bg-light font-cairo min-h-[calc(100vh-80px)] relative overflow-hidden">

            {/* Animated Background Elements - EXACTLY AS PROVIDED */}
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

            <div className="flex w-full max-w-275 max-h-[96vh] overflow-hidden rounded-3xl bg-bg-main shadow-xl shadow-primary/5 border border-border-warm relative z-10 backdrop-blur-sm">

                {/* Registration Form Section */}
                <div className="flex w-full flex-col p-6 md:p-10 lg:w-1/2 relative">

                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse delay-700"></div>

                    <div className="mb-6 animate-fadeIn">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-text-main mb-2">إنشاء حساب جديد</h1>
                        <p className="text-text-subtle text-sm md:text-base">انضم إلى أكبر مجتمع للحرفيين والمبدعين في المنطقة</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        {/* Role Selector */}
                        <div className="flex flex-col gap-2 animate-fadeIn delay-100">
                            <span className="text-text-main text-sm font-semibold">نوع الحساب</span>
                            <div className="flex h-11 w-full items-center justify-center rounded-xl bg-bg-subtle p-1">
                                <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-bold transition-all duration-300 ${selectedRole === 'buyer' ? 'bg-bg-main shadow-sm text-primary' : 'text-text-subtle hover:text-primary'}`}>
                                    <span className="truncate">مشتري (تسوق)</span>
                                    <input checked={selectedRole === 'buyer'} onChange={() => setSelectedRole('buyer')} className="invisible w-0" name="role" type="radio" value="buyer" />
                                </label>
                                <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-bold transition-all duration-300 ${selectedRole === 'seller' ? 'bg-bg-main shadow-sm text-primary' : 'text-text-subtle hover:text-primary'}`}>
                                    <span className="truncate">بائع (حرفي)</span>
                                    <input checked={selectedRole === 'seller'} onChange={() => setSelectedRole('seller')} className="invisible w-0" name="role" type="radio" value="seller" />
                                </label>
                            </div>
                        </div>

                        {/* Inputs Grid */}
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {/* Full Name */}
                            <div className="flex flex-col gap-1 md:col-span-2 group">
                                <span className="text-text-main text-sm font-semibold transition-colors group-focus-within:text-primary">الاسم الكامل</span>
                                <div className="relative">
                                    <User className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${errors.fullName ? 'text-red-text' : 'text-text-subtle opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary'}`} />
                                    <input
                                        {...register('fullName')}
                                        className={`w-full rounded-xl border ${errors.fullName ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle py-2.5 pr-10 pl-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none text-text-main placeholder:text-text-subtle group-focus-within:shadow-lg group-focus-within:shadow-primary/10`}
                                        placeholder="أدخل اسمك بالكامل"
                                        type="text"
                                    />
                                </div>
                                {errors.fullName && (
                                    <p className="text-red-text text-xs pr-1 mt-1 bg-red-soft p-2 rounded-lg border border-red-200">
                                        {errors.fullName.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-1 group">
                                <span className="text-text-main text-sm font-semibold transition-colors group-focus-within:text-primary">البريد الإلكتروني</span>
                                <div className="relative">
                                    <Mail className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${errors.email ? 'text-red-text' : 'text-text-subtle opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary'}`} />
                                    <input
                                        {...register('email')}
                                        className={`w-full rounded-xl border ${errors.email ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle py-2.5 pr-10 pl-3 text-sm transition-all duration-300 outline-none text-text-main placeholder:text-text-subtle group-focus-within:shadow-lg group-focus-within:shadow-primary/10`}
                                        placeholder="example@domain.com"
                                        type="email"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-text text-xs pr-1 mt-1 bg-red-soft p-2 rounded-lg border border-red-200">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-1 group">
                                <span className="text-text-main text-sm font-semibold transition-colors group-focus-within:text-primary">رقم الهاتف</span>
                                <div className="relative">
                                    <Phone className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${errors.phone ? 'text-red-text' : 'text-text-subtle opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary'}`} />
                                    <input
                                        {...register('phone')}
                                        className={`w-full rounded-xl border ${errors.phone ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle py-2.5 pr-10 pl-3 text-sm text-right transition-all duration-300 outline-none text-text-main placeholder:text-text-subtle group-focus-within:shadow-lg group-focus-within:shadow-primary/10`}
                                        dir="ltr"
                                        placeholder="+966 50 000 0000"
                                        type="tel"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-red-text text-xs pr-1 mt-1 bg-red-soft p-2 rounded-lg border border-red-200">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1 md:col-span-2 group">
                                <span className="text-text-main text-sm font-semibold transition-colors group-focus-within:text-primary">كلمة المرور</span>
                                <div className="relative">
                                    <Lock className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${errors.password ? 'text-red-text' : 'text-text-subtle opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary'}`} />
                                    <input
                                        {...register('password')}
                                        className={`w-full rounded-xl border ${errors.password ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle py-2.5 pr-10 pl-9 text-sm transition-all duration-300 outline-none text-text-main placeholder:text-text-subtle group-focus-within:shadow-lg group-focus-within:shadow-primary/10`}
                                        placeholder="********"
                                        type={showPassword ? "text" : "password"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-primary transition-all duration-300 hover:scale-110"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-text text-xs pr-1 mt-1 bg-red-soft p-2 rounded-lg border border-red-200">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Password Requirements Hint */}
                        <div className="text-xs text-text-subtle pr-1 space-y-1 bg-bg-subtle/50 p-3 rounded-lg border border-border-warm">
                            <p className="font-semibold mb-1">متطلبات كلمة المرور:</p>
                            <ul className="list-disc list-inside mr-2 space-y-1">
                                <li className={passwordValue.length >= 8 ? 'text-green-600 dark:text-green-400' : ''}>• 8 أحرف على الأقل</li>
                                <li className={/[a-z]/.test(passwordValue) ? 'text-green-600 dark:text-green-400' : ''}>• حرف صغير واحد على الأقل (a-z)</li>
                                <li className={/[A-Z]/.test(passwordValue) ? 'text-green-600 dark:text-green-400' : ''}>• حرف كبير واحد على الأقل (A-Z)</li>
                                <li className={/\d/.test(passwordValue) ? 'text-green-600 dark:text-green-400' : ''}>• رقم واحد على الأقل (0-9)</li>
                            </ul>
                        </div>

                        {/* Terms */}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-start gap-2 py-1 animate-fadeIn delay-200">
                                <input
                                    {...register('terms')}
                                    className="mt-1 h-4 w-4 rounded border-border-warm text-primary focus:ring-primary/20 transition-all"
                                    id="terms"
                                    type="checkbox"
                                />
                                <label className="text-xs sm:text-sm text-text-subtle leading-relaxed" htmlFor="terms">
                                    أوافق على <Link to="#" className="text-primary font-bold hover:underline underline-offset-4 transition-all">الشروط والأحكام</Link> و <Link to="#" className="text-primary font-bold hover:underline underline-offset-4 transition-all">سياسة الخصوصية</Link> الخاصة بسوق الحرف.
                                </label>
                            </div>
                            {errors.terms && (
                                <p className="text-red-text text-xs pr-1 bg-red-soft p-2 rounded-lg border border-red-200">
                                    {errors.terms.message}
                                </p>
                            )}
                        </div>

                        {/* CTA */}
                        <button
                            type="submit"
                            className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary py-3 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#d43d0a] hover:scale-[1.01] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] gap-2 group"
                        >
                            <span>إنشاء الحساب</span>
                            <Check className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                        </button>

                        <div className="mt-2 text-center animate-fadeIn delay-300">
                            <p className="text-text-subtle text-sm">
                                لديك حساب بالفعل؟
                                <Link to="/auth/login" className="text-primary font-bold hover:underline mr-1 transition-all hover:mr-2">
                                    تسجيل الدخول
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Visual Brand Section - EXACTLY AS PROVIDED */}
                <div className="hidden lg:relative lg:flex lg:w-1/2 items-center justify-center bg-bg-subtle p-8 overflow-hidden group">
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="Traditional pottery workshop"
                            className="h-full w-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-110"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrg3vmm_s7yWM-S_43O8Ekj7z58lRjJbDgo7-SL0WJgK_YEok1McylNMrtzxdVo8J1mO1AwkAPJcV2W6FTMZwo2tZKeZZmb_we5_ilHznfP4qYKGFb5HiksyhcbTdiETzdje5VTU7AKcCNYvq2s9tOU63eZMr1GUSoabxZSb3a59Jy_N2oxup43QCTD4PzLqhSztka8Jp3JJNkFjUlTlahUeW0fyG1TPC6VYt8bIB_97eH45c-3K76KSBvGLD4lX85vGTA6WL8LmiG"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-bg-subtle via-transparent to-transparent"></div>
                    </div>

                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 animate-pulse"></div>
                    <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-primary/5 animate-pulse delay-700"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-bg-main shadow-xl shadow-primary/10 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                            <Sparkles className="text-3xl text-primary w-8 h-8" />
                        </div>

                        <h3 className="text-xl font-bold text-text-main mb-3 transition-transform duration-500 group-hover:-translate-y-0.75">احترافية، جودة، وأصالة</h3>
                        <p className="max-w-md text-text-subtle text-sm leading-relaxed mb-8">
                            انضم إلينا لنحيي التراث العربي من خلال دعم الحرفيين المبدعين وتسهيل وصول منتجاتهم الفريدة لكل بيت.
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-bg-main/80 backdrop-blur p-3 border border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <Shield className="text-primary mb-1 w-5 h-5 mx-auto" />
                                <h4 className="font-bold text-xs text-text-main">بائعون موثوقون</h4>
                            </div>
                            <div className="rounded-xl bg-bg-main/80 backdrop-blur p-3 border border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <Truck className="text-primary mb-1 w-5 h-5 mx-auto" />
                                <h4 className="font-bold text-xs text-text-main">شحن لكل المناطق</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignUp;