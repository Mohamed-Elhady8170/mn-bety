import { useState } from 'react';
import { MdLock } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordThunk } from '../../../../../Auth/Features/authThunks';
import useEmailVerification from '../../../../../hooks/useEmailVerification';
import { showSuccess, showError } from '../../../../../lib/toast';
import PasswordField from './PasswordField';

const getPasswordStrength = (pwd) => {
  if (!pwd) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^\w\s]/.test(pwd)) score++;
  if (score <= 2) return { score, label: 'ضعيفة', color: 'bg-red-500' };
  if (score === 3) return { score, label: 'متوسطة', color: 'bg-amber-500' };
  if (score === 4) return { score, label: 'جيدة', color: 'bg-blue-500' };
  return { score, label: 'قوية جداً', color: 'bg-green-500' };
};

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { checkVerified } = useEmailVerification();

  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const strength = getPasswordStrength(form.newPassword);

  const validate = () => {
    const errs = {};
    if (!form.currentPassword) errs.currentPassword = 'كلمة المرور الحالية مطلوبة';
    if (!form.newPassword) {
      errs.newPassword = 'كلمة المرور الجديدة مطلوبة';
    } else if (form.newPassword.length < 8) {
      errs.newPassword = 'يجب أن تكون 8 أحرف على الأقل';
    } else if (!/[a-z]/.test(form.newPassword)) {
      errs.newPassword = 'يجب أن تحتوي على حرف صغير';
    } else if (!/[A-Z]/.test(form.newPassword)) {
      errs.newPassword = 'يجب أن تحتوي على حرف كبير';
    } else if (!/\d/.test(form.newPassword)) {
      errs.newPassword = 'يجب أن تحتوي على رقم';
    } else if (!/[^\w\s]/.test(form.newPassword)) {
      errs.newPassword = 'يجب أن تحتوي على رمز خاص';
    }
    if (!form.confirmPassword) {
      errs.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (form.confirmPassword !== form.newPassword) {
      errs.confirmPassword = 'كلمتا المرور غير متطابقتين';
    }
    return errs;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate();
    if (errs[field]) setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ currentPassword: true, newPassword: true, confirmPassword: true });
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const ok = await checkVerified();
    if (!ok) return;

    const result = await dispatch(changePasswordThunk({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    }));

    if (changePasswordThunk.fulfilled.match(result)) {
      showSuccess('تم تغيير كلمة المرور بنجاح! سيتم تسجيل خروجك من الأجهزة الأخرى.');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTouched({});
      setErrors({});
    } else {
      showError(result.payload || 'حدث خطأ أثناء تغيير كلمة المرور');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-300 text-sm text-right">
        💡 بعد تغيير كلمة المرور، ستنتهي جلسات جميع الأجهزة الأخرى تلقائياً.
      </div>

      <PasswordField
        label="كلمة المرور الحالية"
        value={form.currentPassword}
        show={show.current}
        onShow={() => setShow((s) => ({ ...s, current: !s.current }))}
        onChange={handleChange('currentPassword')}
        onBlur={handleBlur('currentPassword')}
        error={touched.currentPassword && errors.currentPassword}
        placeholder="••••••••"
      />

      <div className="space-y-2">
        <PasswordField
          label="كلمة المرور الجديدة"
          value={form.newPassword}
          show={show.new}
          onShow={() => setShow((s) => ({ ...s, new: !s.new }))}
          onChange={handleChange('newPassword')}
          onBlur={handleBlur('newPassword')}
          error={touched.newPassword && errors.newPassword}
          placeholder="••••••••"
        />
        {form.newPassword && (
          <div className="space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i <= strength.score ? strength.color : 'bg-border-warm'
                }`} />
              ))}
            </div>
            <p className="text-xs text-text-subtle text-right">
              قوة كلمة المرور: <span className="font-bold text-text-main">{strength.label}</span>
            </p>
          </div>
        )}
        <div className="p-3 rounded-xl bg-bg-subtle border border-border-warm space-y-1">
          <p className="text-xs font-bold text-text-subtle mb-2">متطلبات كلمة المرور:</p>
          {[
            { check: form.newPassword.length >= 8, label: '8 أحرف على الأقل' },
            { check: /[a-z]/.test(form.newPassword), label: 'حرف صغير (a-z)' },
            { check: /[A-Z]/.test(form.newPassword), label: 'حرف كبير (A-Z)' },
            { check: /\d/.test(form.newPassword), label: 'رقم (0-9)' },
            { check: /[^\w\s]/.test(form.newPassword), label: 'رمز خاص (!@#...)' },
          ].map(({ check, label }) => (
            <p key={label} className={`text-xs flex items-center gap-2 ${
              check ? 'text-green-600 dark:text-green-400' : 'text-text-subtle'
            }`}>
              <span>{check ? '✓' : '○'}</span>
              <span>{label}</span>
            </p>
          ))}
        </div>
      </div>

      <PasswordField
        label="تأكيد كلمة المرور الجديدة"
        value={form.confirmPassword}
        show={show.confirm}
        onShow={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
        onChange={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        error={touched.confirmPassword && errors.confirmPassword}
        placeholder="••••••••"
      />

      <button type="submit" disabled={isLoading}
        className="w-full h-12 bg-primary hover:bg-[#d43d0a] text-white rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
        {isLoading ? <span>جاري الحفظ...</span> : (
          <><MdLock className="text-lg" /><span>تغيير كلمة المرور</span></>
        )}
      </button>
    </form>
  );
};

export default ChangePasswordForm;