import { MdInventory2, MdLocalShipping, MdCheckCircle, MdPending, MdChevronLeft } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const OrderItem = ({ id, date, items, price, status }) => {
  const { t } = useTranslation();
  const isDelivered = status === 'delivered';

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-5 border border-border-main rounded-2xl hover:bg-bg-subtle transition-all group card-hover">
      <div className="flex items-center gap-5 w-full md:w-auto">
        <div className="flex-center h-16 w-16 shrink-0 bg-bg-subtle rounded-xl shadow-sm group-hover:bg-bg-main transition-colors text-primary">
          {isDelivered ? <MdInventory2 size={32} /> : <MdLocalShipping size={32} />}
        </div>
        <div className="text-start">
          <p className="font-bold text-lg">{t('profile.order')} #{id}</p>
          <p className="text-text-subtle text-sm">{date} • {items} {t('profile.items')}</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex items-center justify-between w-full md:w-auto gap-10">
        <div className="text-left md:text-start">
          <p className="font-black text-xl text-primary">{price} ج.م</p>
          <span className={`badge mt-1 inline-flex items-center gap-1 ${
            isDelivered ? 'bg-success-green/10 text-success-green' : 'bg-primary/10 text-primary'
          }`}>
            {isDelivered ? <MdCheckCircle /> : <MdPending />}
            {isDelivered ? t('profile.status_delivered') : t('profile.status_pending')}
          </span>
        </div>
        <MdChevronLeft className="text-3xl text-text-subtle group-hover:text-primary transition-transform group-hover:-translate-x-1" />
      </div>
    </div>
  );
};

export default OrderItem;