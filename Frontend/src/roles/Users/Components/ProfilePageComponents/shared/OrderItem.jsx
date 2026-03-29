import { 
  MdInventory2, 
  MdLocalShipping, 
  MdCheckCircle, 
  MdPending, 
  MdChevronLeft, 
  MdCancel, 
  MdAutorenew 
} from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const OrderItem = ({ id, date, items, price, status }) => {
  const { t } = useTranslation();

  // Dynamic status mapping for colors, text, and icons!
  const getStatusProps = (currentStatus) => {
    switch (currentStatus) {
      case 'pending':
        return { color: 'bg-amber-100 text-amber-700', text: 'قيد المراجعة', icon: <MdPending /> };
      case 'processing':
        return { color: 'bg-primary/10 text-primary', text: 'جاري التجهيز', icon: <MdAutorenew /> };
      case 'shipped':
        return { color: 'bg-blue-500/10 text-blue-500', text: 'تم الشحن', icon: <MdLocalShipping /> };
      case 'delivered':
        return { color: 'bg-success-green/10 text-success-green', text: 'تم التوصيل', icon: <MdCheckCircle /> };
      case 'cancelled':
        return { color: 'bg-red-100 text-red-700', text: 'تم الإلغاء', icon: <MdCancel /> };
      default:
        return { color: 'bg-gray-100 text-gray-700', text: currentStatus || 'غير معروف', icon: <MdPending /> };
    }
  };

  const statusProps = getStatusProps(status);
  
  // Choose the big left icon based on the state
  const isDeliveredOrShipped = status === 'delivered' || status === 'shipped';

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-5 border border-border-main rounded-2xl hover:bg-bg-subtle transition-all group card-hover">
      
      <div className="flex items-center gap-5 w-full md:w-auto">
        <div className={`flex-center h-16 w-16 shrink-0 bg-bg-subtle rounded-xl shadow-sm group-hover:bg-bg-main transition-colors ${status === 'cancelled' ? 'text-red-500' : 'text-primary'}`}>
          {isDeliveredOrShipped ? <MdInventory2 size={32} /> : <MdLocalShipping size={32} />}
        </div>
        <div className="text-start">
          <p className="font-bold text-lg">{t('profile.order')} #{id}</p>
          <p className="text-text-subtle text-sm">{date} • {items} {t('profile.items')}</p>
        </div>
      </div>

      <div className="mt-4 md:mt-0 flex items-center justify-between w-full md:w-auto gap-10">
        <div className="text-left md:text-start">
          <p className="font-black text-xl text-primary">{price?.toLocaleString()} ج.م</p>
          
          {/* Apply the dynamic badge styling here */}
          <span className={`badge mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${statusProps.color}`}>
            {statusProps.icon}
            {statusProps.text}
          </span>

        </div>
        <MdChevronLeft className="text-3xl text-text-subtle group-hover:text-primary transition-transform group-hover:-translate-x-1" />
      </div>

    </div>
  );
};

export default OrderItem;