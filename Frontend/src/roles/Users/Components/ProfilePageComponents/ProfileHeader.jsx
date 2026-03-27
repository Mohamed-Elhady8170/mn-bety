import { MdEdit, MdCalendarToday, MdPerson, MdCheckCircle } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ProfileHeader = ({ onEditClick }) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="card mb-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-center h-32 w-32 rounded-full bg-bg-subtle border-4 border-primary/20 shadow-xl text-primary relative">
            <MdPerson size={64} />
            {user?.emailVerified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-bg-main"
                   title="البريد الإلكتروني مُتحقق منه">
                <MdCheckCircle className="text-white text-sm" />
              </div>
            )}
          </div>
          <div className="text-center sm:text-start">
            <h1 className="text-3xl font-bold mb-1">{user?.fullName || 'المستخدم'}</h1>
            <p className="text-text-subtle flex items-center justify-center sm:justify-start gap-2">
              <MdCalendarToday className="text-primary" />
              {t('profile.member_since')} يناير 2026
            </p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="badge bg-primary/10 text-primary">
                {t('profile.premium_customer')}
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
        <button onClick={onEditClick} className="btn btn-gray flex items-center gap-2">
          <MdEdit /> {t('profile.edit_profile')}
        </button>
      </div>
    </section>
  );
};

export default ProfileHeader;