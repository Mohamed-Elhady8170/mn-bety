import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Check, ArrowRight, Sparkles, Award, Shield, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const navigate = useNavigate();
    const { t } = useTranslation();

    const getPasswordErrorMessage = (password) => {
        if (!password) return t('auth.validation.password_required');
        if (password.length < 8) return t('auth.validation.password_min');
        if (!/[a-z]/.test(password)) return t('auth.validation.password_lowercase');
        if (!/[A-Z]/.test(password)) return t('auth.validation.password_uppercase');
        if (!/\d/.test(password)) return t('auth.validation.password_number');
        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        const passwordError = getPasswordErrorMessage(password);
        if (passwordError) {
            newErrors.password = passwordError;
            isValid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = t('auth.validation.confirm_password_required');
            isValid = false;
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = t('auth.validation.confirm_password_mismatch');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors(prev => ({ ...prev, password: '' }));
        }
        if (confirmPassword && e.target.value === confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (errors.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        
        if (field === 'password') {
            const passwordError = getPasswordErrorMessage(password);
            if (passwordError) {
                setErrors(prev => ({ ...prev, password: passwordError }));
            }
        } else if (field === 'confirmPassword') {
            if (!confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: t('auth.validation.confirm_password_required') }));
            } else if (confirmPassword !== password) {
                setErrors(prev => ({ ...prev, confirmPassword: t('auth.validation.confirm_password_mismatch') }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setTouched({
            password: true,
            confirmPassword: true
        });

        if (validateForm()) {
            console.log('Password reset successful', { password });
            navigate('/auth/login');
        }
    };

    return (
        <main className="flex-1 flex items-center justify-center p-4 md:p-6 bg-bg-light font-cairo min-h-[calc(100vh-80px)] relative overflow-hidden">

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

            <div className="w-full max-w-120 bg-bg-main rounded-2xl shadow-xl shadow-primary/5 border border-border-warm relative z-10 backdrop-blur-sm overflow-hidden">

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse delay-700"></div>

                <div className="p-6 md:p-8 flex flex-col gap-6">

                    {/* Header Section */}
                    <div className="text-center animate-fadeIn">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                            <Lock className="text-primary w-8 h-8" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-text-main mb-2">{t('auth.reset_password.title')}</h2>
                        <p className="text-text-subtle text-sm md:text-base">{t('auth.reset_password.subtitle')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* New Password Field */}
                        <div className="space-y-2 group">
                            <label className="block text-sm font-semibold text-text-main transition-colors group-focus-within:text-primary">
                                {t('auth.reset_password.new_password')}
                            </label>
                            <div className="relative">
                                <Lock className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${touched.password && errors.password ? 'text-red-text' : 'text-text-subtle opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary group-focus-within:scale-110'}`} />
                                <input
                                    className={`w-full rounded-xl border ${touched.password && errors.password ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle py-3 pr-10 pl-10 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none text-text-main placeholder:text-text-subtle group-focus-within:shadow-lg group-focus-within:shadow-primary/10`}
                                    placeholder={t('auth.reset_password.new_password_placeholder')}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onBlur={() => handleBlur('password')}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-primary transition-all duration-300 hover:scale-110"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {touched.password && errors.password && (
                                <p className="text-red-text text-xs pr-1 mt-1 bg-red-soft p-2 rounded-lg border border-red-200">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2 group">
                            <label className="block text-sm font-semibold text-text-main transition-colors group-focus-within:text-primary">
                                {t('auth.reset_password.confirm_password')}
                            </label>
                            <div className="relative">
                                <Lock className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${touched.confirmPassword && errors.confirmPassword ? 'text-red-text' : 'text-text-subtle opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary group-focus-within:scale-110'}`} />
                                <input
                                    className={`w-full rounded-xl border ${touched.confirmPassword && errors.confirmPassword ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle py-3 pr-10 pl-10 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none text-text-main placeholder:text-text-subtle group-focus-within:shadow-lg group-focus-within:shadow-primary/10`}
                                    placeholder={t('auth.reset_password.confirm_password_placeholder')}
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    onBlur={() => handleBlur('confirmPassword')}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-primary transition-all duration-300 hover:scale-110"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {touched.confirmPassword && errors.confirmPassword && (
                                <p className="text-red-text text-xs pr-1 mt-1 bg-red-soft p-2 rounded-lg border border-red-200">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Password requirements hint */}
                        {touched.password && (
                            <div className="text-xs text-text-subtle pr-1 space-y-1 bg-bg-subtle/50 p-3 rounded-lg border border-border-warm">
                                <p className="font-semibold mb-1">{t('auth.password_requirements.title')}</p>
                                <ul className="list-disc list-inside mr-2 space-y-1">
                                    <li className={password.length >= 8 ? 'text-green-600 dark:text-green-400' : ''}>
                                        • {t('auth.password_requirements.min_chars')}
                                    </li>
                                    <li className={/[a-z]/.test(password) ? 'text-green-600 dark:text-green-400' : ''}>
                                        • {t('auth.password_requirements.lowercase')}
                                    </li>
                                    <li className={/[A-Z]/.test(password) ? 'text-green-600 dark:text-green-400' : ''}>
                                        • {t('auth.password_requirements.uppercase')}
                                    </li>
                                    <li className={/\d/.test(password) ? 'text-green-600 dark:text-green-400' : ''}>
                                        • {t('auth.password_requirements.number')}
                                    </li>
                                </ul>
                            </div>
                        )}

                        {/* Action Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full h-12 bg-primary hover:bg-[#d43d0a] text-white rounded-xl text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                            >
                                <span>{t('auth.reset_password.save_btn')}</span>
                                <Check className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                            </button>
                        </div>

                        {/* Secondary Link */}
                        <div className="text-center pt-2 animate-fadeIn delay-200">
                            <Link to="/auth/login" className="inline-flex items-center gap-1 text-sm text-text-main font-medium hover:text-primary transition-colors group">
                                <span className="group-hover:translate-x-1 transition-transform">{t('auth.back_to_login')}</span>
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