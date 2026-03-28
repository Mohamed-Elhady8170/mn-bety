import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector }    from "react-redux";
import { useTranslation }              from "react-i18next";
import { fetchMyProfile, updateMyProfile, updateMyAvatar } from "../../../Features/customerSlice";
import { updateMe }                    from "../../../../../Auth/Features/authThunks";  // ← FIXED IMPORT
import { showSuccess, showError }      from "../../../../../lib/toast";
import useEmailVerification            from "../../../../../hooks/useEmailVerification";

const CITIES = [
  "المنوفيه","القاهره","الإسكندرية","الدقهلية",
  "الغربية","الشرقية","المنيا","أسوان","أسيوط","قنا","سوهاج",
];

const InfoTab = ({ nameInputRef }) => {
  const { t }        = useTranslation();
  const dispatch     = useDispatch();
  const { checkVerified } = useEmailVerification();

  const { user }                   = useSelector((s) => s.auth);
  const { profile, updating }      = useSelector((s) => s.customer);

  const avatarInputRef = useRef(null);

  const [form, setForm] = useState({
    fullName: "",
    phone:    "",
    bio:      "",
    city:     "",
    address:  "",
  });

  // ─── fetch customer profile on mount ─────────────────────────────────────
  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  // ─── sync form with user + customer profile ───────────────────────────────
  useEffect(() => {
    setForm({
      fullName: user?.fullName             ?? "",
      phone:    user?.phone                ?? "",
      bio:      profile?.bio               ?? "",
      city:     profile?.location?.city    ?? "",
      address:  profile?.location?.address ?? "",
    });
  }, [user, profile]);

  // ─── handle input change ──────────────────────────────────────────────────
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ─── handle avatar upload ─────────────────────────────────────────────────
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ok = await checkVerified();
    if (!ok) return;

    const result = await dispatch(updateMyAvatar(file));
    if (updateMyAvatar.fulfilled.match(result)) {
      showSuccess("تم تحديث الصورة الشخصية بنجاح!");
    } else {
      showError(result.payload || "حدث خطأ أثناء رفع الصورة");
    }
  };

  // ─── handle save ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    const ok = await checkVerified();
    if (!ok) return;

    // 1. update user (fullName, phone) via PATCH /auth/me — only if changed
    const nameOrPhoneChanged =
      form.fullName !== user?.fullName || form.phone !== user?.phone;

    if (nameOrPhoneChanged) {
      const authResult = await dispatch(
        updateMe({ fullName: form.fullName, phone: form.phone })
      );
      if (updateMe.rejected.match(authResult)) {
        showError(authResult.payload || "حدث خطأ أثناء تحديث البيانات");
        return;
      }
    }

    // 2. update customer profile (bio, city, address) via PUT /customers/me
    const profileResult = await dispatch(
      updateMyProfile({
        bio:     form.bio,
        city:    form.city,
        address: form.address,
      })
    );

    if (updateMyProfile.fulfilled.match(profileResult)) {
      showSuccess("تم حفظ التغييرات بنجاح!");
    } else {
      showError(profileResult.payload || "حدث خطأ أثناء الحفظ");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">

      {/* ─── Avatar ─────────────────────────────────────────────────────── */}
      <div className="md:col-span-2 flex items-center gap-4">
        <div
          className="w-20 h-20 rounded-full bg-bg-subtle border-4 border-primary/20 overflow-hidden cursor-pointer relative"
          onClick={() => avatarInputRef.current?.click()}
        >
          {profile?.avatar?.url ? (
            <img
              src={profile.avatar.url}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary text-3xl">
              👤
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full text-white text-xs font-bold">
            تغيير
          </div>
        </div>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
        <div>
          <p className="font-bold text-text-main">الصورة الشخصية</p>
          <p className="text-xs text-text-subtle">اضغط على الصورة لتغييرها</p>
        </div>
      </div>

      {/* ─── Full Name ──────────────────────────────────────────────────── */}
      <div className="space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">
          {t("profile.full_name")}
        </label>
        <input
          ref={nameInputRef}
          name="fullName"
          className="input-text"
          value={form.fullName}
          onChange={handleChange}
        />
      </div>

      {/* ─── Email (read only) ──────────────────────────────────────────── */}
      <div className="space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">
          {t("profile.email")}
        </label>
        <input
          className="input-text opacity-60 cursor-not-allowed"
          type="email"
          value={user?.email ?? ""}
          readOnly
        />
      </div>

      {/* ─── Phone ──────────────────────────────────────────────────────── */}
      <div className="space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">
          {t("profile.phone")}
        </label>
        <input
          name="phone"
          className="input-text"
          dir="ltr"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      {/* ─── City ───────────────────────────────────────────────────────── */}
      <div className="space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">
          {t("profile.city")}
        </label>
        <select
          name="city"
          className="input-text appearance-none"
          value={form.city}
          onChange={handleChange}
        >
          <option value="">اختر المدينة</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* ─── Bio ────────────────────────────────────────────────────────── */}
      <div className="md:col-span-2 space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">نبذة عنك</label>
        <textarea
          name="bio"
          className="input-text h-20 pt-3"
          value={form.bio}
          onChange={handleChange}
          placeholder="اكتب نبذة قصيرة عنك..."
        />
      </div>

      {/* ─── Address ────────────────────────────────────────────────────── */}
      <div className="md:col-span-2 space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">
          {t("profile.address")}
        </label>
        <textarea
          name="address"
          className="input-text h-24 pt-3"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      {/* ─── Save Button ─────────────────────────────────────────────────── */}
      <div className="md:col-span-2 flex justify-start mt-4">
        <button
          className="btn btn-primary w-full md:w-auto px-12 disabled:opacity-60"
          onClick={handleSave}
          disabled={updating}
        >
          {updating ? "جاري الحفظ..." : t("profile.save_changes")}
        </button>
      </div>
    </div>
  );
};

export default InfoTab;