import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MdSave, MdClose } from "react-icons/md";

const CITIES = [
  "المنوفيه", "القاهره", "الإسكندرية", "الدقهلية",
  "الغربية", "الشرقية", "المنيا", "أسوان", "أسيوط", "قنا", "سوهاج",
];

const InfoTab = ({ nameInputRef, isEditing, onSave, onCancel, updating }) => {
  const { t } = useTranslation();
  const { user } = useSelector((s) => s.auth);
  const { profile } = useSelector((s) => s.customer);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    bio: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    if (user && profile) {
      setForm({
        fullName: user.fullName ?? "",
        phone: user.phone ?? "",
        bio: profile.bio ?? "",
        city: profile.location?.city ?? "",
        address: profile.location?.address ?? "",
      });
    }
  }, [user, profile]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-fadeIn">
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
          disabled={!isEditing}
        />
      </div>

      {/* ─── Email ──────────────────────────────────────────── */}
      <div className="space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">
          {t("profile.email")}
        </label>
        <input
          className="input-text opacity-60 cursor-not-allowed" // دي بس اللي باهتة لأنها دايماً مغلقة
          type="email"
          value={user?.email ?? ""}
          readOnly
          disabled
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
          disabled={!isEditing}
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
          disabled={!isEditing}
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
          disabled={!isEditing}
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
          disabled={!isEditing}
        />
      </div>

      {/* ─── Save & Cancel Buttons ──────────────────────────────────────── */}
      {isEditing && (
        <div className="md:col-span-2 flex justify-end gap-3 mt-6 border-t border-border-warm pt-6 animate-fadeInVShort">
       
          <button
            className="btn btn-primary px-12 flex items-center gap-2 disabled:opacity-60"
            onClick={() => onSave(form)}
            disabled={updating}
          >
            {updating ? (
              "جاري الحفظ..."
            ) : (
              <><MdSave /> {t("profile.save_changes")}</>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default InfoTab;