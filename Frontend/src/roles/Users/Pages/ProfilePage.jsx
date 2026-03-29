import { useState, useRef, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import ProfileHeader from "../Components/ProfilePageComponents/ProfileHeader";
import InfoTab from "../Components/ProfilePageComponents/tabs/InfoTab";
import OrdersTab from "../Components/ProfilePageComponents/tabs/OrdersTab";
import SecurityTab from "../Components/ProfilePageComponents/tabs/SecurityTab";

// Thunks & Hooks & Lib
import { deleteMyAccount, fetchMyProfile, updateMyProfile } from "../Features/customerSlice";
import { updateMe } from "../../../Auth/Features/authThunks";
import { showSuccess, showError } from "../../../lib/toast";
import useEmailVerification from "../../../hooks/useEmailVerification";

const TABS = { INFO: "info", ORDERS: "orders", SECURITY: "security" };

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkVerified } = useEmailVerification();
  const nameInputRef = useRef(null);

  // Redux State
  const { user } = useSelector((s) => s.auth);
  const { loading, updating } = useSelector((state) => state.customer);

  // Local State
  const [activeTab, setActiveTab] = useState(TABS.INFO);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // ─── التعديل السادس: State لإدارة وضع التعديل ───
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  // ─── التعديل السابع: تحسين handleEditClick ───
  const handleEditClick = () => {
    setActiveTab(TABS.INFO); // الذهاب لتاب المعلومات
    setIsEditing(true); // تفعيل وضع التعديل
    // عمل focus بعد قليل لضمان ظهور المدخلات
    setTimeout(() => nameInputRef.current?.focus(), 150);
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // إلغاء وضع التعديل
    // سيقوم الـ InfoTab تلقائياً بإعادة تعيين الفورم من الـ Redux
  };

  // ─── التعديل الثامن: نقل منطق الحفظ إلى هنا ───
  const handleSaveProfileChanges = async (formData) => {
    const ok = await checkVerified();
    if (!ok) return;

    let hasError = false;

    // 1. update user (fullName, phone) via PATCH /auth/me — only if changed
    const nameOrPhoneChanged =
      formData.fullName !== user?.fullName || formData.phone !== user?.phone;

    if (nameOrPhoneChanged) {
      const authResult = await dispatch(
        updateMe({ fullName: formData.fullName, phone: formData.phone })
      );
      if (updateMe.rejected.match(authResult)) {
        showError(authResult.payload || "حدث خطأ أثناء تحديث بيانات الحساب");
        hasError = true;
      }
    }

    if (hasError) return;

    // 2. update customer profile (bio, city, address) via PUT /customers/me
    const profileResult = await dispatch(
      updateMyProfile({
        bio: formData.bio,
        city: formData.city,
        address: formData.address,
      })
    );

    if (updateMyProfile.fulfilled.match(profileResult)) {
      showSuccess("تم حفظ التغييرات بنجاح!");
      setIsEditing(false); // الخروج من وضع التعديل بعد النجاح
    } else {
      showError(profileResult.payload || "حدث خطأ أثناء حفظ الملف الشخصي");
    }
  };

  // ─── delete account ───────────────────────────────────────────────────────
  const handleDeleteAccount = async () => {
    const ok = await checkVerified();
    if (!ok) return;

    const result = await dispatch(deleteMyAccount());
    if (deleteMyAccount.fulfilled.match(result)) {
      showSuccess("تم حذف حسابك بنجاح.");
      navigate("/");
    } else {
      showError(result.payload || "حدث خطأ أثناء حذف الحساب");
    }
  };

  const tabs = [
    { id: TABS.INFO, label: t("profile.personal_info") },
    { id: TABS.ORDERS, label: t("profile.orders_history") },
    { id: TABS.SECURITY, label: "الأمان" },
  ];

  return (
    <div className="min-h-screen bg-bg-main text-text-main py-10 px-4 md:px-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        {/* نمرر الـ states الجديدة للهيدر */}
        <ProfileHeader 
          onEditClick={handleEditClick} 
          isEditing={isEditing}
          onCancelEdit={handleCancelEdit}
        />

        <div className="card p-0! overflow-hidden shadow-lg animate-fadeIn delay-100">
          {/* Tabs Navigation */}
          <div className="flex border-b border-border-main bg-bg-subtle/30 px-6 overflow-x-auto">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  if (id !== TABS.INFO) setIsEditing(false); // إغلاق التعديل إذا انتقل لتاب آخر
                }}
                className={`flex items-center gap-2 py-5 px-6 font-bold transition-all whitespace-nowrap ${
                  activeTab === id
                    ? "text-primary border-b-4 border-primary"
                    : "text-text-subtle hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-10">
            {activeTab === TABS.INFO && (
              <InfoTab 
                nameInputRef={nameInputRef} 
                isEditing={isEditing}
                onSave={handleSaveProfileChanges}
                onCancel={handleCancelEdit}
                updating={updating}
              />
            )}
            {activeTab === TABS.ORDERS && <OrdersTab />}
            {activeTab === TABS.SECURITY && <SecurityTab />}
          </div>
        </div>

        {/* Delete Account */}
        {!showDeleteConfirm ? (
          <button
            className="flex items-center gap-2 mx-auto text-red-text hover:bg-red-soft px-4 py-2 rounded-lg transition-all mt-6 font-bold"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <MdDelete className="text-lg" /> {t("profile.delete_account")}
          </button>
        ) : (
          <div className="mt-6 p-4 border border-red-200 rounded-xl bg-red-soft text-center space-y-3 animate-fadeIn">
            <p className="font-bold text-red-text">هل أنت متأكد من حذف حسابك نهائياً؟</p>
            <p className="text-sm text-text-subtle">لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3 justify-center">
              <button
                className="btn btn-primary bg-red-500 hover:bg-red-600 px-6"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                {loading ? "جاري الحذف..." : "نعم، احذف حسابي"}
              </button>
              <button
                className="btn btn-gray px-6"
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
};

export default ProfilePage;