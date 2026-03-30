import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { upgradeToSellerThunk } from '../../../Auth/Features/authThunks';
import { updateUserRoles } from '../../../Auth/Features/authSlice';
import useEmailVerification from '../../../hooks/useEmailVerification';
import { Store, MapPin, CreditCard, ArrowRight } from 'lucide-react';

const COUNTRY_CITIES = {
  Egypt: ['المنوفيه', 'أسوان', 'ألاقصر', 'البحر الأحمر','الاسماعيلية', 'بنها', 'العريش', 'بورسعيد', 'الفيوم', 'القاهرة',  'المنيا', 'الجيزة', 'الإسكندرية', 'المنصورة', 'طنطا', 'أسيوط'],
  SaudiArabia: ['الرياض', 'جدة', 'مكة', 'الدمام', 'المدينة المنورة'],
  UAE: ['دبي', 'أبو ظبي', 'الشارقة', 'العين', 'عجمان'],
};

const BANK_OPTIONS = {
  Egypt: ['البنك الأهلي المصري', 'بنك مصر', 'CIB', 'QNB الأهلي', 'بنك الإسكندرية'],
  SaudiArabia: ['الراجحي', 'الأهلي السعودي', 'بنك الرياض', 'بنك البلاد', 'الإنماء'],
  UAE: ['Emirates NBD', 'ADCB', 'FAB', 'Mashreq', 'RAKBANK'],
};

const countryKeys = Object.keys(COUNTRY_CITIES);
const allBanks = [...new Set(Object.values(BANK_OPTIONS).flat())];
const onlyDigitsRegex = /^\d+$/;
const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;

const upgradeSchema = z.object({
  description: z
    .string({ required_error: 'وصف المتجر مطلوب' })
    .trim()
    .min(10, 'الوصف يجب أن يكون على الأقل 10 أحرف')
    .max(1000, 'الوصف يجب ألا يزيد عن 1000 حرف'),
  location: z.object({
    country: z.string().refine((value) => countryKeys.includes(value), {
      message: 'اختاري دولة من القائمة',
    }),
    city: z.string().trim().min(1, 'المدينة مطلوبة'),
    address: z.string().trim().optional(),
  }),
  bankInfo: z.object({
    bankName: z.string().trim().min(1, 'اسم البنك مطلوب'),
    accountName: z
      .string({ required_error: 'اسم صاحب الحساب مطلوب' })
      .trim()
      .min(2, 'اسم صاحب الحساب مطلوب'),
    accountNumber: z
      .string({ required_error: 'رقم الحساب مطلوب' })
      .trim()
      .min(8, 'رقم الحساب يجب أن يكون على الأقل 8 أرقام')
      .max(30, 'رقم الحساب يجب ألا يزيد عن 30 رقم')
      .regex(onlyDigitsRegex, 'رقم الحساب يجب أن يحتوي على أرقام فقط'),
    iban: z
      .string()
      .trim()
      .transform((value) => value.toUpperCase())
      .refine((value) => value === '' || ibanRegex.test(value), {
        message: 'صيغة IBAN غير صحيحة',
      })
      .optional(),
  }),
}).superRefine((data, ctx) => {
  const allowedCities = COUNTRY_CITIES[data.location.country] || [];
  if (!allowedCities.includes(data.location.city)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['location', 'city'],
      message: 'اختاري مدينة من القائمة',
    });
  }

  const allowedBanks = BANK_OPTIONS[data.location.country] || allBanks;
  if (!allowedBanks.includes(data.bankInfo.bankName)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['bankInfo', 'bankName'],
      message: 'اختاري بنك من القائمة',
    });
  }
});

const UpgradeToSeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const { checkVerified } = useEmailVerification();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(upgradeSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const selectedCountry = watch('location.country');
  const cityOptions = COUNTRY_CITIES[selectedCountry] || [];
  const bankOptions = BANK_OPTIONS[selectedCountry] || allBanks;

  const onSubmit = async (data) => {
    // ✅ Check email verification BEFORE upgrading
    const ok = await checkVerified();
    if (!ok) return; // toast shown by hook

    const result = await dispatch(upgradeToSellerThunk(data));
    if (upgradeToSellerThunk.fulfilled.match(result)) {
      // Keep UI in sync immediately in case any stale state exists.
      const currentRoles = user?.roles || [];
      const nextRoles = currentRoles.includes('seller')
        ? currentRoles
        : [...currentRoles, 'seller'];
      dispatch(updateUserRoles(nextRoles));

      navigate('/seller');
    }
  };

  return (
    <main className="min-h-screen bg-bg-light font-cairo py-10 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Store className="text-primary w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-text-main mb-2">أنشئ حساب البائع</h1>
          <p className="text-text-subtle">أكمل بياناتك لتبدأ البيع على منصتنا</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-soft border border-red-200 text-red-text text-sm text-right">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Description */}
          <div className="bg-bg-main rounded-2xl p-6 border border-border-warm shadow-sm">
            <h2 className="text-lg font-black text-text-main mb-4 flex items-center gap-2">
              <Store className="w-5 h-5 text-primary" /> نبذة عن متجرك
            </h2>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-text-main">وصف المتجر</label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder="اكتب وصفاً لمتجرك والمنتجات التي تبيعها..."
                className={`w-full rounded-xl border ${
                  errors.description ? 'border-red-text' : 'border-border-warm'
                } bg-bg-subtle p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-main placeholder:text-text-subtle resize-none`}
              />
              {errors.description && (
                <p className="text-red-text text-xs bg-red-soft p-2 rounded-lg border border-red-200">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="bg-bg-main rounded-2xl p-6 border border-border-warm shadow-sm">
            <h2 className="text-lg font-black text-text-main mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> الموقع
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-text-main">الدولة</label>
                <select
                  {...register('location.country')}
                  onChange={(e) => {
                    const nextCountry = e.target.value;
                    setValue('location.country', nextCountry, { shouldValidate: true });
                    setValue('location.city', '', { shouldValidate: true });
                    setValue('bankInfo.bankName', '', { shouldValidate: true });
                  }}
                  className={`w-full rounded-xl border ${
                    errors.location?.country ? 'border-red-text' : 'border-border-warm'
                  } bg-bg-subtle p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-main`}
                >
                  <option value="">اختاري الدولة</option>
                  <option value="Egypt">مصر</option>
                  <option value="SaudiArabia">السعودية</option>
                  <option value="UAE">الإمارات</option>
                </select>
                {errors.location?.country && (
                  <p className="text-red-text text-xs bg-red-soft p-2 rounded-lg border border-red-200">
                    {errors.location.country.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-text-main">المدينة</label>
                <select
                  {...register('location.city')}
                  disabled={!selectedCountry}
                  className={`w-full rounded-xl border ${
                    errors.location?.city ? 'border-red-text' : 'border-border-warm'
                  } bg-bg-subtle p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-main disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  <option value="">{selectedCountry ? 'اختاري المدينة' : 'اختاري الدولة أولاً'}</option>
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.location?.city && (
                  <p className="text-red-text text-xs bg-red-soft p-2 rounded-lg border border-red-200">
                    {errors.location.city.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-semibold text-text-main">العنوان (اختياري)</label>
                <input
                  {...register('location.address')}
                  placeholder="شارع التحرير، ميدان التحرير"
                  className="w-full rounded-xl border border-border-warm bg-bg-subtle p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-main"
                />
              </div>
            </div>
          </div>

          {/* Bank Info */}
          <div className="bg-bg-main rounded-2xl p-6 border border-border-warm shadow-sm">
            <h2 className="text-lg font-black text-text-main mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" /> البيانات البنكية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-text-main">اسم البنك</label>
                <select
                  {...register('bankInfo.bankName')}
                  disabled={!selectedCountry}
                  className={`w-full rounded-xl border ${
                    errors.bankInfo?.bankName ? 'border-red-text' : 'border-border-warm'
                  } bg-bg-subtle p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-main disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  <option value="">{selectedCountry ? 'اختاري البنك' : 'اختاري الدولة أولاً'}</option>
                  {bankOptions.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
                {errors.bankInfo?.bankName && (
                  <p className="text-red-text text-xs bg-red-soft p-2 rounded-lg border border-red-200">
                    {errors.bankInfo.bankName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-text-main">اسم صاحب الحساب</label>
                <input
                  {...register('bankInfo.accountName')}
                  placeholder="محمد أحمد"
                  className={`w-full rounded-xl border ${
                    errors.bankInfo?.accountName ? 'border-red-text' : 'border-border-warm'
                  } bg-bg-subtle p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-main`}
                />
                {errors.bankInfo?.accountName && (
                  <p className="text-red-text text-xs bg-red-soft p-2 rounded-lg border border-red-200">
                    {errors.bankInfo.accountName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-text-main">رقم الحساب</label>
                <input
                  {...register('bankInfo.accountNumber')}
                  placeholder="1234567890"
                  dir="ltr"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={`w-full rounded-xl border ${
                    errors.bankInfo?.accountNumber ? 'border-red-text' : 'border-border-warm'
                  } bg-bg-subtle p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-main`}
                />
                {errors.bankInfo?.accountNumber && (
                  <p className="text-red-text text-xs bg-red-soft p-2 rounded-lg border border-red-200">
                    {errors.bankInfo.accountNumber.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-text-main">IBAN (اختياري)</label>
                <input
                  {...register('bankInfo.iban', {
                    setValueAs: (value) => (typeof value === 'string' ? value.toUpperCase() : value),
                  })}
                  placeholder="EG000000000000000000000000"
                  dir="ltr"
                  className="w-full rounded-xl border border-border-warm bg-bg-subtle p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-main"
                />
                {errors.bankInfo?.iban && (
                  <p className="text-red-text text-xs bg-red-soft p-2 rounded-lg border border-red-200">
                    {errors.bankInfo.iban.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-primary hover:bg-[#d43d0a] text-white rounded-2xl text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span>جاري الإنشاء...</span>
            ) : (
              <>
                <span>إنشاء حساب البائع</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpgradeToSeller;