import { useState, useRef } from 'react';
import { MdDelete } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import ProfileHeader from '../Components/ProfilePageComponents/ProfileHeader';
import InfoTab from '../Components/ProfilePageComponents/tabs/InfoTab';
import OrdersTab from '../Components/ProfilePageComponents/tabs/OrdersTab';
import SecurityTab from '../Components/ProfilePageComponents/tabs/SecurityTab';

const TABS = { INFO: 'info', ORDERS: 'orders', SECURITY: 'security' };

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(TABS.INFO);
  const nameInputRef = useRef(null);
  const { t } = useTranslation();

  const handleEditClick = () => {
    setActiveTab(TABS.INFO);
    setTimeout(() => nameInputRef.current?.focus(), 100);
  };

  const tabs = [
    { id: TABS.INFO, label: t('profile.personal_info') },
    { id: TABS.ORDERS, label: t('profile.orders_history') },
    { id: TABS.SECURITY, label: 'الأمان' },
  ];

  return (
    <div className="min-h-screen bg-bg-main text-text-main py-10 px-4 md:px-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        <ProfileHeader onEditClick={handleEditClick} />

        <div className="card p-0! overflow-hidden shadow-lg animate-fadeIn delay-100">
          {/* Tabs Navigation */}
          <div className="flex border-b border-border-main bg-bg-subtle/30 px-6 overflow-x-auto">
            {tabs.map(({ id, label }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 py-5 px-6 font-bold transition-all whitespace-nowrap ${
                  activeTab === id
                    ? 'text-primary border-b-4 border-primary'
                    : 'text-text-subtle hover:text-primary'
                }`}>
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-10">
            {activeTab === TABS.INFO && <InfoTab nameInputRef={nameInputRef} />}
            {activeTab === TABS.ORDERS && <OrdersTab />}
            {activeTab === TABS.SECURITY && <SecurityTab />}
          </div>
        </div>

        <button className="flex items-center gap-2 mx-auto text-red-text hover:bg-red-soft px-4 py-2 rounded-lg transition-all mt-6 font-bold">
          <MdDelete className="text-lg" /> {t('profile.delete_account')}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;