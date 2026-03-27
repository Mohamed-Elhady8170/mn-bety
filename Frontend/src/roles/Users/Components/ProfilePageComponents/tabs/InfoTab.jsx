import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const InfoTab = ({ nameInputRef }) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
      <div className="space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">{t('profile.full_name')}</label>
        <input ref={nameInputRef} className="input-text" defaultValue={user?.fullName || ''} />
      </div>
      <div className="space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">{t('profile.email')}</label>
        <input className="input-text" type="email" defaultValue={user?.email || ''} readOnly />
      </div>
      <div className="space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">{t('profile.phone')}</label>
        <input className="input-text" dir="ltr" defaultValue={user?.phone || ''} />
      </div>
      <div className="space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">{t('profile.city')}</label>
        <select className="input-text appearance-none">
          {['المنوفيه','القاهره','الإسكندرية','الدقهلية','الغربية','الشرقية','المنيا','أسوان','أسيوط','قنا','سوهاج']
            .map((city) => <option key={city}>{city}</option>)}
        </select>
      </div>
      <div className="md:col-span-2 space-y-2 text-start">
        <label className="text-sm font-bold text-text-subtle block">{t('profile.address')}</label>
        <textarea className="input-text h-24 pt-3" defaultValue="قويسنا - المنوفيه" />
      </div>
      <div className="md:col-span-2 flex justify-start mt-4">
        <button className="btn btn-primary w-full md:w-auto px-12">{t('profile.save_changes')}</button>
      </div>
    </div>
  );
};

export default InfoTab;