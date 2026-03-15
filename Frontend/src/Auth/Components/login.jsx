import React, { useState } from 'react';
import { Mail, Eye, EyeOff, LogIn, Sparkles, Shield, Truck, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
// 1. Import Hook Form and Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../Features/authThunks';

// 2. Define the Validation Schema
const loginSchema = z.object({
    email: z.string()
        .min(1, 'البريد الإلكتروني مطلوب')
        .email('البريد الإلكتروني غير صالح (مثال: name@domain.com)'),
    password: z.string()
        .min(1, 'كلمة المرور مطلوبة')
        .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
        .regex(/[a-z]/, 'كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل')
        .regex(/[A-Z]/, 'كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل')
        .regex(/\d/, 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل'),
});

const floatingIcons = [
    { Icon: Sparkles, delay: 0, size: 20, left: 10, top: 20, duration: 15 },
    { Icon: Award, delay: 2, size: 18, left: 30, top: 40, duration: 18 },
    { Icon: Shield, delay: 4, size: 16, left: 70, top: 60, duration: 20 },
    { Icon: Truck, delay: 1, size: 22, left: 50, top: 80, duration: 16 },
    { Icon: Sparkles, delay: 3, size: 14, left: 80, top: 30, duration: 22 },
    { Icon: Award, delay: 5, size: 20, left: 20, top: 70, duration: 17 },
];

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // جيب الـ loading والـ error من الـ store
    const { isLoading, error } = useSelector((state) => state.auth);

    // 3. Initialize useForm
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    // 4. Submit Handler
    const onSubmit = async (data) => {
        const result = await dispatch(loginThunk(data));

        if (loginThunk.fulfilled.match(result)) {
            const roles = result.payload.user.roles;
               if (roles.includes('seller') && !roles.includes('user')) {
                navigate('/seller');
            } else {
                navigate('/user');
            }
        }
    };

    return (
        <main className="flex-1 flex items-center justify-center p-5 bg-bg-light font-cairo min-h-[calc(100vh-80px)] relative overflow-hidden">

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

            <div className="w-full max-w-237.5 overflow-hidden rounded-3xl bg-bg-main shadow-xl shadow-primary/5 border border-border-warm relative z-10 backdrop-blur-sm flex flex-col md:flex-row-reverse">

                {/* Left Side: Image/Branding */}
                <div className="hidden md:block w-1/2 relative bg-linear-to-br from-primary/10 to-primary/5 overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out z-20"></div>

                    <img
                        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 transition-transform duration-700 group-hover:scale-110"
                        alt="Beautifully crafted handmade pottery on a wooden table"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIp0OemRRelVXHBIsQmtRdOunmsGjt2SzMILa77imPWHWAAlJYkn9tm8_0L2xDwQjmIugSkOMAxw_sxPJ_-DTP7o5u1aWSkOpywUUIwTseVHwWEfXQ_09KhCJPMxH6QgKSsIqOPU32MA9-c8Q-M8kAjXxXl2_9fxKEESEh7cI1PsiioV3LQl-oL5KoAAyXqLM54ywjYsOyw62my6W_I7DkGAhXnRVRGbh4-d5R4G_VBze2byyCMKvMfuYjScul7SECpbI0rry4nDor"
                    />

                    <div className="absolute bottom-8 right-8 left-8 z-30 text-white transform transition-transform duration-500 group-hover:-translate-y-1.25">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur shadow-xl">
                            <span className="text-white w-6 h-6"><Sparkles /></span>
                        </div>
                        <h3 className="text-2xl font-black mb-3 leading-tight drop-shadow-lg">
                            ادعم الحرفيين المحليين وجمّل منزلك بقطع فريدة.
                        </h3>
                        <p className="text-base opacity-90 drop-shadow">
                            سوق الحرف هو وجهتك الأولى لكل ما هو مصنوع يدوياً وبحب.
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-2">
                            <div className="rounded-lg bg-white/20 backdrop-blur p-2 text-center border border-white/40">
                                <Shield className="w-4 h-4 mx-auto mb-1 text-white" />
                                <h4 className="font-bold text-xs text-white">بائعون موثوقون</h4>
                            </div>
                            <div className="rounded-lg bg-white/20 backdrop-blur p-2 text-center border border-white/40">
                                <Truck className="w-4 h-4 mx-auto mb-1 text-white" />
                                <h4 className="font-bold text-xs text-white">شحن لكل المناطق</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 p-8 lg:p-10 flex flex-col relative">
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse delay-700"></div>

                    <div className="mb-6 text-right relative">
                        <h2 className="text-3xl lg:text-4xl font-black text-text-main mb-2 animate-fadeIn">
                            مرحباً بك مجدداً
                        </h2>
                        <p className="text-base text-text-subtle animate-fadeIn delay-100">
                            سجل دخولك للوصول إلى عالم الحرف اليدوية
                        </p>
                    </div>

                    {/* Server Error Message */}
                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-red-soft border border-red-200 text-red-text text-sm text-right animate-fadeIn">
                            {error}
                        </div>
                    )}

                    {/* Use handleSubmit from Hook Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative">

                        {/* Email Input */}
                        <div className="space-y-1.5 group">
                            <label className="block text-sm font-semibold text-text-main mr-1 transition-colors group-focus-within:text-primary">
                                البريد الإلكتروني
                            </label>
                            <div className="relative">
                                <input
                                    {...register('email')}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none text-right text-base text-text-main placeholder:text-text-subtle group-focus-within:shadow-lg group-focus-within:shadow-primary/10`}
                                    placeholder="example@mail.com"
                                    style={{ direction: 'ltr' }}
                                    type="text"
                                />
                                <Mail
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${errors.email ? 'text-red-text' : 'text-text-subtle opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary'}`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-text text-xs pr-1 mt-1 bg-red-soft p-2 rounded-lg border border-red-200">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5 group">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-semibold text-text-main transition-colors group-focus-within:text-primary">
                                    كلمة المرور
                                </label>
                                <Link
                                    to="/auth/forgot-password"
                                    className="text-sm font-medium text-primary hover:underline transition-all hover:scale-105 inline-block"
                                >
                                    نسيت كلمة المرور؟
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    {...register('password')}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none text-right text-base text-text-main placeholder:text-text-subtle group-focus-within:shadow-lg group-focus-within:shadow-primary/10`}
                                    placeholder="********"
                                    style={{ direction: 'ltr' }}
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle hover:text-primary transition-all duration-300 hover:scale-110"
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

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-primary text-white font-bold text-base rounded-xl hover:bg-[#d43d0a] shadow-lg shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2 hover:gap-3 hover:shadow-xl hover:shadow-primary/30 active:scale-95 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span>جاري تسجيل الدخول...</span>
                            ) : (
                                <>
                                    <span>تسجيل الدخول</span>
                                    <LogIn className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer / Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border-warm"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-bg-main text-text-subtle relative overflow-hidden group">
                                أو
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </span>
                        </div>
                    </div>

                    <div className="text-center animate-fadeIn delay-200">
                        <p className="text-base text-text-subtle">
                            ليس لديك حساب؟
                            <Link
                                to="/auth/signup"
                                className="text-primary font-bold hover:underline mr-1.5 inline-block transition-all hover:scale-105 hover:mr-2"
                            >
                                إنشاء حساب جديد
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;