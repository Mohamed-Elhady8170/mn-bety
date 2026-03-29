import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, Save, Edit3, X, CheckCircle, MapPin, Trash2, Building2, CreditCard, Hash, Landmark } from "lucide-react";
import {
  fetchMySellerProfile,
  updateSellerProfile,
  updateSellerLogo,
  deleteSellerAccount,
  clearSellerError,
} from "../Features/sallerProfileSlice";
import { showSuccess, showError } from "../../../lib/toast";
import useEmailVerification from "../../../hooks/useEmailVerification";
import { useNavigate } from "react-router-dom";

export default function StoreProfile() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { checkVerified } = useEmailVerification();
  const { user } = useSelector((s) => s.auth);
  const { profile, loading, updating, error } = useSelector((s) => s.sellerProfile);
  const hasRequestedProfileRef = useRef(false);

  const [isEditing, setIsEditing]               = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [form, setForm] = useState({
    description:   "",
    country:       "",
    city:          "",
    address:       "",
    bankName:      "",
    accountName:   "",
    accountNumber: "",
    iban:          "",
  });

  const logoInputRef = useRef(null);

  // ─── fetch seller profile on mount ───────────────────────────────────────
  useEffect(() => {
    const isSeller = user?.roles?.includes("seller");

    if (!isSeller) {
      navigate("/customer/upgrade-to-seller", { replace: true });
      return;
    }

    // Prevent duplicate requests in React StrictMode during development.
    if (hasRequestedProfileRef.current) return;
    hasRequestedProfileRef.current = true;
    dispatch(fetchMySellerProfile());
  }, [dispatch, navigate, user?.roles]);

  // ─── sync form with profile ───────────────────────────────────────────────
  useEffect(() => {
    if (profile) {
      setForm({
        description:   profile.description            ?? "",
        country:       profile.location?.country      ?? "",
        city:          profile.location?.city         ?? "",
        address:       profile.location?.address      ?? "",
        bankName:      profile.bankInfo?.bankName     ?? "",
        accountName:   profile.bankInfo?.accountName  ?? "",
        accountNumber: profile.bankInfo?.accountNumber ?? "",
        iban:          profile.bankInfo?.iban         ?? "",
      });
    }
  }, [profile]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ─── handle logo upload ───────────────────────────────────────────────────
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ok = await checkVerified();
    if (!ok) return;
    const result = await dispatch(updateSellerLogo(file));
    if (updateSellerLogo.fulfilled.match(result)) {
      showSuccess("تم تحديث اللوجو بنجاح!");
    } else {
      showError(result.payload || "حدث خطأ أثناء رفع اللوجو");
    }
  };

  // ─── handle save ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    const ok = await checkVerified();
    if (!ok) return;
    const result = await dispatch(
      updateSellerProfile({
        description: form.description,
        location: {
          country: form.country,
          city:    form.city,
          address: form.address,
        },
        bankInfo: {
          bankName:      form.bankName,
          accountName:   form.accountName,
          accountNumber: form.accountNumber,
          iban:          form.iban,
        },
      })
    );
    if (updateSellerProfile.fulfilled.match(result)) {
      showSuccess("تم حفظ التغييرات بنجاح!");
      setIsEditing(false);
    } else {
      showError(result.payload || "حدث خطأ أثناء الحفظ");
    }
  };

  // ─── handle delete seller account ────────────────────────────────────────
  const handleDeleteSeller = async () => {
    const ok = await checkVerified();
    if (!ok) return;
    const result = await dispatch(deleteSellerAccount());
    if (deleteSellerAccount.fulfilled.match(result)) {
      showSuccess("تم حذف حساب البائع بنجاح. أنت الآن عميل فقط.");
      navigate("/customer");
    } else {
      showError(result.payload || "حدث خطأ أثناء الحذف");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-text-soft font-bold">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-bg-body min-h-screen font-cairo text-right" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="bg-bg-main rounded-3xl md:rounded-[2.5rem] shadow-sm border border-border-warm overflow-hidden">

          {/* Cover */}
          <div className="h-40 md:h-64 relative">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Cover"
            />
          </div>

          <div className="px-4 md:px-12 pb-8 md:pb-12 relative">

            {/* Logo + Edit Button */}
            <div className="relative -mt-12 md:-mt-16 mb-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
              <div
                className="w-32 h-32 rounded-full border-4 border-bg-main shadow-md relative cursor-pointer bg-bg-main"
                onClick={() => isEditing && logoInputRef.current?.click()}
              >
                {profile?.logo?.url ? (
                  <img
                    src={profile.logo.url}
                    className="w-full h-full rounded-full object-cover"
                    alt="Logo"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-bg-subtle flex items-center justify-center text-primary">
                    <Building2 size={36} />
                  </div>
                )}
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
                    <Camera className="text-white" size={24} />
                  </div>
                )}
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>

              <button
                onClick={() => { setIsEditing(!isEditing); dispatch(clearSellerError()); }}
                className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all text-sm md:text-base ${
                  isEditing
                    ? "bg-bg-subtle text-text-soft hover:bg-bg-subtle/80"
                    : "bg-primary-10 text-primary hover:bg-primary-20"
                }`}
              >
                {isEditing ? <><X size={18} /> إلغاء</> : <><Edit3 size={18} /> تحديث الملف</>}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-bold">
                {error}
              </div>
            )}

            {/* Content */}
            <div className="mt-4 md:mt-8">
              {!isEditing ? (

                // ─── View Mode ─────────────────────────────────────────────
                <div className="space-y-8 animate-in fade-in duration-500">

                  {/* Description */}
                  <div>
                    <p className="text-xs font-black text-text-muted uppercase tracking-wider mb-2">نبذة عن المتجر</p>
                    <p className="text-text-soft leading-relaxed text-sm md:text-base">
                      {profile?.description || "لا يوجد وصف بعد"}
                    </p>
                  </div>

                  {/* Status + Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Account Status */}
                    <div className="flex items-center gap-4 bg-bg-body p-4 rounded-2xl border border-border-warm/50">
                      <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center shadow-sm text-primary shrink-0">
                        <CheckCircle size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">حالة الحساب</p>
                        <p className={`font-bold text-sm ${profile?.isApproved ? "text-green-600" : "text-amber-500"}`}>
                          {profile?.isApproved ? "✓ معتمد" : "⏳ قيد المراجعة"}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-4 bg-bg-body p-4 rounded-2xl border border-border-warm/50">
                      <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center shadow-sm text-primary shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">الموقع</p>
                        <p className="font-bold text-text-main text-sm truncate">
                          {[profile?.location?.country, profile?.location?.city, profile?.location?.address]
                            .filter(Boolean)
                            .join("، ") || "لم يتم التحديد"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bank Info */}
                  <div>
                    <p className="text-xs font-black text-text-muted uppercase tracking-wider mb-3">البيانات البنكية</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      {/* Bank Name */}
                      <div className="flex items-center gap-4 bg-bg-body p-4 rounded-2xl border border-border-warm/50">
                        <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center shadow-sm text-primary shrink-0">
                          <Landmark size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">اسم البنك</p>
                          <p className="font-bold text-text-main text-sm truncate">
                            {profile?.bankInfo?.bankName || "—"}
                          </p>
                        </div>
                      </div>

                      {/* Account Name */}
                      <div className="flex items-center gap-4 bg-bg-body p-4 rounded-2xl border border-border-warm/50">
                        <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center shadow-sm text-primary shrink-0">
                          <Building2 size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">اسم الحساب</p>
                          <p className="font-bold text-text-main text-sm truncate">
                            {profile?.bankInfo?.accountName || "—"}
                          </p>
                        </div>
                      </div>

                      {/* Account Number */}
                      <div className="flex items-center gap-4 bg-bg-body p-4 rounded-2xl border border-border-warm/50">
                        <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center shadow-sm text-primary shrink-0">
                          <Hash size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">رقم الحساب</p>
                          <p className="font-bold text-text-main text-sm truncate" dir="ltr">
                            {profile?.bankInfo?.accountNumber || "—"}
                          </p>
                        </div>
                      </div>

                      {/* IBAN */}
                      <div className="flex items-center gap-4 bg-bg-body p-4 rounded-2xl border border-border-warm/50">
                        <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center shadow-sm text-primary shrink-0">
                          <CreditCard size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">IBAN</p>
                          <p className="font-bold text-text-main text-sm truncate" dir="ltr">
                            {profile?.bankInfo?.iban || "—"}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              ) : (

                // ─── Edit Mode ─────────────────────────────────────────────
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-500">

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs md:text-sm font-black text-text-main">نبذة عن المتجر</label>
                    <textarea
                      rows="3"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full bg-bg-body border-2 border-border-warm rounded-xl py-3 px-4 focus:border-primary outline-none font-medium resize-none text-sm text-text-main"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-text-main">الدولة</label>
                    <input name="country" value={form.country} onChange={handleChange}
                      className="w-full bg-bg-body border-2 border-border-warm rounded-xl py-3 px-4 focus:border-primary outline-none font-bold text-sm text-text-main" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-text-main">المدينة</label>
                    <input name="city" value={form.city} onChange={handleChange}
                      className="w-full bg-bg-body border-2 border-border-warm rounded-xl py-3 px-4 focus:border-primary outline-none font-bold text-sm text-text-main" />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-black text-text-main">العنوان التفصيلي</label>
                    <input name="address" value={form.address} onChange={handleChange}
                      className="w-full bg-bg-body border-2 border-border-warm rounded-xl py-3 px-4 focus:border-primary outline-none font-bold text-sm text-text-main" />
                  </div>

                  {/* Bank Info */}
                  <div className="md:col-span-2 mt-2">
                    <p className="text-sm font-black text-text-main mb-3">البيانات البنكية</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: "bankName",      label: "اسم البنك" },
                        { name: "accountName",   label: "اسم الحساب" },
                        { name: "accountNumber", label: "رقم الحساب" },
                        { name: "iban",          label: "IBAN" },
                      ].map(({ name, label }) => (
                        <div key={name} className="space-y-1.5">
                          <label className="text-xs font-black text-text-main">{label}</label>
                          <input
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            dir="ltr"
                            className="w-full bg-bg-body border-2 border-border-warm rounded-xl py-3 px-4 focus:border-primary outline-none font-bold text-sm text-text-main"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save */}
                  <div className="md:col-span-2 flex justify-end mt-2">
                    <button
                      onClick={handleSave}
                      disabled={updating}
                      className="w-full md:w-auto bg-primary text-white px-10 py-3 rounded-xl font-black shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <Save size={20} />
                      {updating ? "جاري الحفظ..." : "حفظ التغييرات"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete Seller Account */}
        {!showDeleteConfirm ? (
          <button
            className="flex items-center gap-2 mx-auto text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-all mt-6 font-bold"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 size={18} /> حذف حساب البائع
          </button>
        ) : (
          <div className="mt-6 p-4 border border-red-200 rounded-xl bg-red-50 text-center space-y-3">
            <p className="font-bold text-red-600">هل تريد حذف حساب البائع؟ ستفقد كل بياناتك كبائع.</p>
            <p className="text-sm text-text-subtle">ستبقى عميلاً ويمكنك الترقية مرة أخرى لاحقاً.</p>
            <div className="flex gap-3 justify-center">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-bold disabled:opacity-60"
                onClick={handleDeleteSeller}
                disabled={loading}
              >
                {loading ? "جاري الحذف..." : "نعم، احذف حساب البائع"}
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold"
                onClick={() => setShowDeleteConfirm(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}