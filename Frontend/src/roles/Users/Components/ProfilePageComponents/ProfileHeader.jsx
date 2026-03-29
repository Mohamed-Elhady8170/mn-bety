import { useRef } from "react";
import { MdEdit, MdCalendarToday, MdPerson, MdCheckCircle, MdClose, MdCameraAlt } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

// استدعاء الدوال الخاصة بتغيير الصورة (تأكدي من مسارات الـ import حسب مشروعك)
import { updateMyAvatar } from "../../Features/customerSlice";
import { showSuccess, showError } from "../../../../lib/toast";
import useEmailVerification from "../../../../hooks/useEmailVerification";

const ProfileHeader = ({ onEditClick, isEditing, onCancelEdit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const avatarInputRef = useRef(null);
  const { checkVerified } = useEmailVerification();

  const { user } = useSelector((state) => state.auth);
  const { profile, updating } = useSelector((state) => state.customer);

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("ar-EG", {
        month: "long",
        year: "numeric",
      })
    : "يناير 2026";

  // ─── دالة التعامل مع تغيير الصورة ───
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // التأكد من تفعيل الإيميل الأول (اختياري حسب ما تفضلي)
    const ok = await checkVerified();
    if (!ok) return;

    const result = await dispatch(updateMyAvatar(file));
    if (updateMyAvatar.fulfilled.match(result)) {
      showSuccess("تم تحديث الصورة الشخصية بنجاح!");
    } else {
      showError(result.payload || "حدث خطأ أثناء رفع الصورة");
    }
  };

  return (
    <section className="card mb-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          
          {/* الحاوية الرئيسية للصورة: 
            أضفنا group عشان تأثير الـ hover يشتغل على الكاميرا 
          */}
          <div className="flex-center h-32 w-32 rounded-full bg-bg-subtle border-4 border-primary/20 shadow-xl text-primary relative group">
            
            {/* Input المخفي الخاص برفع الصورة */}
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            {/* الجزء الخاص بالصورة اللي هيتم الضغط عليه */}
            <div 
              className={`w-full h-full rounded-full relative overflow-hidden ${updating ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
              onClick={() => !updating && avatarInputRef.current?.click()}
            >
              {profile?.avatar?.url ? (
                <img
                  src={profile.avatar.url}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <MdPerson size={64} />
                </div>
              )}

              {/* طبقة الكاميرا الشفافة اللي بتظهر عند الـ Hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <MdCameraAlt className="text-white text-3xl" />
              </div>
            </div>

            {/* علامة الصح بره الـ overflow-hidden عشان متتقصش */}
            {user?.emailVerified && (
              <div
                className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-bg-main pointer-events-none z-10"
                title="البريد الإلكتروني مُتحقق منه"
              >
                <MdCheckCircle className="text-white text-sm" />
              </div>
            )}
          </div>

          {/* باقي معلومات الهيدر */}
          <div className="text-center sm:text-start">
            <h1 className="text-3xl font-bold mb-1">
              {user?.fullName || "المستخدم"}
            </h1>
            <p className="text-text-subtle flex items-center justify-center sm:justify-start gap-2">
              <MdCalendarToday className="text-primary" />
              {t("profile.member_since")} {joinDate}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="badge bg-primary/10 text-primary">
                {t("profile.premium_customer")}
              </span>
              {user?.emailVerified ? (
                <span className="badge bg-green-500/10 text-green-600 dark:text-green-400">
                  ✓ بريد إلكتروني مُفعَّل
                </span>
              ) : (
                <span className="badge bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  ⚠️ يحتاج تفعيل
                </span>
              )}
            </div>
          </div>
        </div>

        {!isEditing ? (
          <button onClick={onEditClick} className="btn btn-gray flex items-center gap-2">
            <MdEdit /> {t("profile.edit_profile")}
          </button>
        ) : (
          <button onClick={onCancelEdit} className="btn btn-gray flex items-center gap-3" disabled={updating}>
            <MdClose  /> إلغاء التعديل
          </button>
        )}
      </div>
    </section>
  );
};

export default ProfileHeader;