import { useTranslation } from "react-i18next";
import { MdOutlineConfirmationNumber, MdLocalShipping } from "react-icons/md";

function OrderInfo({ order }) {
  const { t } = useTranslation();
  
  // Use the last 6 characters of MongoDB ID as the order number
  const orderNumber = order ? `#${order._id.slice(-6).toUpperCase()}` : "---";
  
  // Format the real creation date
  const shippingDate = order ? new Date(order.createdAt).toLocaleDateString("ar-EG") : "---";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="card flex items-center gap-4 bg-bg-subtle p-4 rounded-xl border border-border-main">
        <div className="bg-primary/10 p-3 rounded-lg text-primary">
          <MdOutlineConfirmationNumber size={24} />
        </div>
        <div>
          <p className="text-sm text-text-subtle font-medium">{t('order_success.order_number_label')}</p>
          <p className="text-xl font-bold text-text-main">{orderNumber}</p>
        </div>
      </div>
      <div className="card flex items-center gap-4 bg-bg-subtle p-4 rounded-xl border border-border-main">
        <div className="bg-primary/10 p-3 rounded-lg text-primary">
          <MdLocalShipping size={24} />
        </div>
        <div>
          <p className="text-sm text-text-subtle font-medium">
            {t('order_success.expected_delivery_label', 'تاريخ الطلب')}
          </p>
          <p className="text-xl font-bold text-text-main">{shippingDate}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;