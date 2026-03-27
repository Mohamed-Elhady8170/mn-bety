import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Sparkles, Truck, Shield, Award, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../Features/authThunks';
import { useTranslation } from 'react-i18next';
import { showRegisterSuccessToast } from '../../lib/toast';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isLoading, error } = useSelector((state) => state.auth);

  const signUpSchema = z.object({
    fullName: z.string().min(3, t('auth.validation.full_name_min')),
    email: z.string().email(t('auth.validation.email_invalid')),
    phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, t('auth.validation.phone_invalid')),
    password: z
      .string()
      .min(8, t('auth.validation.password_min'))
      .regex(/[a-z]/, t('auth.validation.password_lowercase'))
      .regex(/[A-Z]/, t('auth.validation.password_uppercase'))
      .regex(/\d/, t('auth.validation.password_number'))
      .regex(/[^\w\s]/, t('auth.validation.password_special')),
    terms: z.literal(true, {
      errorMap: () => ({ message: t('auth.validation.terms_required') }),
    }),
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: '', email: '', phone: '', password: '', terms: false },
  });

  const passwordValue = watch('password', '');

  const onSubmit = async (data) => {
    const { terms: _terms, ...userData } = data;
    const result = await dispatch(registerThunk(userData));

    if (registerThunk.fulfilled.match(result)) {
      // ✅ Show rich verification toast using unified utility
      showRegisterSuccessToast(data.email);
      navigate('/customer');
    }
    // Error is handled by Redux state (error variable above)
  };

  return (
    <main className="flex-1 flex items-center justify-center p-4 md:p-6 bg-bg-light font-cairo min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/10 rounded-full animate-pulse delay-700" />
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
      </div>

      <div className="flex w-full max-w-275 overflow-hidden rounded-3xl bg-bg-main shadow-xl shadow-primary/5 border border-border-warm relative z-10 backdrop-blur-sm">
        <div className="flex w-full flex-col p-6 md:p-10 lg:w-1/2 relative">
          <div className="mb-6 animate-fadeIn">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-text-main mb-2">
              {t('auth.signup.title')}
            </h1>
            <p className="text-text-subtle text-sm md:text-base">{t('auth.signup.subtitle')}</p>
          </div>

          {/* Server Error from Redux */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-soft border border-red-200 text-red-text text-sm text-right animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Full Name */}
              <div className="flex flex-col gap-1 md:col-span-2 group">
                <span className="text-text-main text-sm font-semibold transition-colors group-focus-within:text-primary">
                  {t('auth.fields.full_name')}
                </span>
                <div className="relative">
                  <User className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${errors.fullName ? 'text-red-text' : 'text-text-subtle opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary'}`} />
                  <input
                    {...register('fullName')}
                    className={`w-full rounded-xl border ${errors.fullName ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle py-2.5 pr-10 pl-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none text-text-main placeholder:text-text-subtle`}
                    placeholder={t('auth.fields.full_name_placeholder')}
                    type="text"
                  />
                </div>
                {errors.fullName && <p className="text-red-text text-xs pr-1 mt-1 bg-red-soft p-2 rounded-lg border border-red-200">{errors.fullName.message}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-1 group">
                <span className="text-text-main text-sm font-semibold transition-colors group-focus-within:text-primary">
                  {t('auth.fields.email')}
                </span>
                <div className="relative">
                  <Mail className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${errors.email ? 'text-red-text' : 'text-text-subtle opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary'}`} />
                  <input
                    {...register('email')}
                    className={`w-full rounded-xl border ${errors.email ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle py-2.5 pr-10 pl-3 text-sm transition-all duration-300 outline-none text-text-main placeholder:text-text-subtle`}
                    placeholder="example@domain.com"
                    type="email"
                  />
                </div>
                {errors.email && <p className="text-red-text text-xs pr-1 mt-1 bg-red-soft p-2 rounded-lg border border-red-200">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-1 group">
                <span className="text-text-main text-sm font-semibold transition-colors group-focus-within:text-primary">
                  {t('auth.fields.phone')}
                </span>
                <div className="relative">
                  <Phone className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${errors.phone ? 'text-red-text' : 'text-text-subtle opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary'}`} />
                  <input
                    {...register('phone')}
                    className={`w-full rounded-xl border ${errors.phone ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle py-2.5 pr-10 pl-3 text-sm text-right transition-all duration-300 outline-none text-text-main placeholder:text-text-subtle`}
                    dir="ltr"
                    placeholder="+20 10 0000 0000"
                    type="tel"
                  />
                </div>
                {errors.phone && <p className="text-red-text text-xs pr-1 mt-1 bg-red-soft p-2 rounded-lg border border-red-200">{errors.phone.message}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1 md:col-span-2 group">
                <span className="text-text-main text-sm font-semibold transition-colors group-focus-within:text-primary">
                  {t('auth.fields.password')}
                </span>
                <div className="relative">
                  <Lock className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${errors.password ? 'text-red-text' : 'text-text-subtle opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary'}`} />
                  <input
                    {...register('password')}
                    className={`w-full rounded-xl border ${errors.password ? 'border-red-text' : 'border-border-warm'} bg-bg-subtle py-2.5 pr-10 pl-9 text-sm transition-all duration-300 outline-none text-text-main placeholder:text-text-subtle`}
                    placeholder="********"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-text text-xs pr-1 mt-1 bg-red-soft p-2 rounded-lg border border-red-200">{errors.password.message}</p>}
              </div>
            </div>

            {/* Password Requirements */}
            <div className="text-xs text-text-subtle pr-1 space-y-1 bg-bg-subtle/50 p-3 rounded-lg border border-border-warm">
              <p className="font-semibold mb-1">{t('auth.password_requirements.title')}</p>
              <ul className="list-inside mr-2 space-y-1">
                <li className={passwordValue.length >= 8 ? 'text-green-600 dark:text-green-400' : ''}>• {t('auth.password_requirements.min_chars')}</li>
                <li className={/[a-z]/.test(passwordValue) ? 'text-green-600 dark:text-green-400' : ''}>• {t('auth.password_requirements.lowercase')}</li>
                <li className={/[A-Z]/.test(passwordValue) ? 'text-green-600 dark:text-green-400' : ''}>• {t('auth.password_requirements.uppercase')}</li>
                <li className={/\d/.test(passwordValue) ? 'text-green-600 dark:text-green-400' : ''}>• {t('auth.password_requirements.number')}</li>
                <li className={/[^\w\s]/.test(passwordValue) ? 'text-green-600 dark:text-green-400' : ''}>• رمز خاص (!@#$%...)</li>
              </ul>
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-2 py-1">
                <input
                  {...register('terms')}
                  className="mt-1 h-4 w-4 rounded border-border-warm text-primary focus:ring-primary/20"
                  id="terms"
                  type="checkbox"
                />
                <label className="text-xs sm:text-sm text-text-subtle leading-relaxed" htmlFor="terms">
                  {t('auth.signup.terms_prefix')}{' '}
                  <Link to="#" className="text-primary font-bold hover:underline">{t('auth.signup.terms_link')}</Link>
                  {' '}{t('auth.signup.terms_and')}{' '}
                  <Link to="#" className="text-primary font-bold hover:underline">{t('auth.signup.privacy_link')}</Link>
                  {' '}{t('auth.signup.terms_suffix')}
                </label>
              </div>
              {errors.terms && <p className="text-red-text text-xs pr-1 bg-red-soft p-2 rounded-lg border border-red-200">{errors.terms.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary py-3 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#d43d0a] hover:scale-[1.01] hover:shadow-xl active:scale-[0.98] gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>{t('auth.signup.loading')}</span>
              ) : (
                <>
                  <span>{t('common.signup')}</span>
                  <Check className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                </>
              )}
            </button>

            <div className="mt-2 text-center">
              <p className="text-text-subtle text-sm">
                {t('auth.signup.have_account')}
                <Link to="/auth/login" className="text-primary font-bold hover:underline mr-1 transition-all">
                  {t('common.login')}
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Visual Brand Section */}
        <div className="hidden lg:relative lg:flex lg:w-1/2 items-center justify-center bg-bg-subtle p-8 overflow-hidden group">
          <div className="absolute inset-0 z-0">
            <img
              alt="Traditional pottery workshop"
              className="h-full w-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrg3vmm_s7yWM-S_43O8Ekj7z58lRjJbDgo7-SL0WJgK_YEok1McylNMrtzxdVo8J1mO1AwkAPJcV2W6FTMZwo2tZKeZZmb_we5_ilHznfP4qYKGFb5HiksyhcbTdiETzdje5VTU7AKcCNYvq2s9tOU63eZMr1GUSoabxZSb3a59Jy_N2oxup43QCTD4PzLqhSztka8Jp3JJNkFjUlTlahUeW0fyG1TPC6VYt8bIB_97eH45c-3K76KSBvGLD4lX85vGTA6WL8LmiG"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-bg-main shadow-xl">
              <Sparkles className="text-3xl text-primary w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-3">{t('auth.signup.branding_title')}</h3>
            <p className="max-w-md text-text-subtle text-sm leading-relaxed mb-8">{t('auth.signup.branding_subtitle')}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-bg-main/80 backdrop-blur p-3 border border-white/40">
                <Shield className="text-primary mb-1 w-5 h-5 mx-auto" />
                <h4 className="font-bold text-xs text-text-main">{t('auth.trusted_sellers')}</h4>
              </div>
              <div className="rounded-xl bg-bg-main/80 backdrop-blur p-3 border border-white/40">
                <Truck className="text-primary mb-1 w-5 h-5 mx-auto" />
                <h4 className="font-bold text-xs text-text-main">{t('auth.nationwide_shipping')}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;