import ChangePasswordForm from '../shared/ChangePasswordForm';

const SecurityTab = () => (
  <div className="animate-fadeIn">
    <div className="mb-6">
      <h3 className="text-xl font-bold text-text-main mb-1">تغيير كلمة المرور</h3>
      <p className="text-sm text-text-subtle">
        أدخل كلمة مرورك الحالية ثم اختر كلمة مرور جديدة قوية.
      </p>
    </div>
    <ChangePasswordForm />
  </div>
);

export default SecurityTab;