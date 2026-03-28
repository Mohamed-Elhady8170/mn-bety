import { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../Components/ProfilePageComponents/ProfileHeader";
import InfoTab       from "../Components/ProfilePageComponents/tabs/InfoTab";
import OrdersTab     from "../Components/ProfilePageComponents/tabs/OrdersTab";
import SecurityTab   from "../Components/ProfilePageComponents/tabs/SecurityTab";
import { deleteMyAccount } from "../Features/customerSlice";
import { showSuccess, showError } from "../../../lib/toast";
import useEmailVerification from "../../../hooks/useEmailVerification";
const TABS = { INFO: "info", ORDERS: "orders", SECURITY: "security" };

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(TABS.INFO);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const nameInputRef = useRef(null);
  const { t }        = useTranslation();
  const dispatch     = useDispatch();
  const navigate     = useNavigate();
  const { checkVerified }  = useEmailVerification();
  const { loading }  = useSelector((state) => state.customer);

  const handleEditClick = () => {
    setActiveTab(TABS.INFO);
    setTimeout(() => nameInputRef.current?.focus(), 100);
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
    { id: TABS.INFO,     label: t("profile.personal_info") },
    { id: TABS.ORDERS,   label: t("profile.orders_history") },
    { id: TABS.SECURITY, label: "الأمان" },
  ];

  return (
    <div className="min-h-screen bg-bg-main text-text-main py-10 px-4 md:px-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        <ProfileHeader onEditClick={handleEditClick} />

        <div className="card p-0! overflow-hidden shadow-lg animate-fadeIn delay-100">
          {/* Tabs Navigation */}
          <div className="flex border-b border-border-main bg-bg-subtle/30 px-6 overflow-x-auto">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
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
            {activeTab === TABS.INFO     && <InfoTab nameInputRef={nameInputRef} />}
            {activeTab === TABS.ORDERS   && <OrdersTab />}
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
          <div className="mt-6 p-4 border border-red-200 rounded-xl bg-red-soft text-center space-y-3">
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