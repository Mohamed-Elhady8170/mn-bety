import { useTranslation } from "react-i18next";

function OrderTotal({ order }) {
  const { t } = useTranslation();
  
  // Get real order total price
  const totalCost = order?.totalPrice || 0;

  return (
    <div className="bg-bg-subtle p-6 border-t border-border-main space-y-3 rounded-b-xl">
      <div className="flex justify-between text-text-subtle">
        <span>{t('order_success.subtotal')}</span>
        <span>{totalCost.toLocaleString()} ج.م</span>
      </div>
      <div className="flex justify-between text-text-subtle">
        <span>{t('order_success.shipping_fee')}</span>
        <span>{t('order_success.free', 'مجاني')}</span>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-border-main mt-4">
        <h4 className="text-xl font-bold text-text-main">{t('order_success.total')}</h4>
        <span className="text-2xl font-black text-primary">{totalCost.toLocaleString()} ج.م</span>
      </div>
    </div>
  );
}

export default OrderTotal;