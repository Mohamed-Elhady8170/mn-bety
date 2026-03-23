import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectTotalCartPrice } from "../../Features/cartSlice";

function OrderTotal() {
  const { t } = useTranslation();
  
  // get cart total price & shipping cost
  const totalCartPrice = useSelector(selectTotalCartPrice);
  const shippingCost = 0;
  // sum all cost
  const totalCost = totalCartPrice + shippingCost;

  return (
    <div className="bg-bg-main/25 p-6 border-t border-primary/10 space-y-3">
      <div className="flex-between text-text-muted">
        <span>{t('order_success.subtotal')}</span>
        <span>{totalCartPrice + " $"}</span>
      </div>
      <div className="flex-between text-text-muted">
        <span>{t('order_success.shipping_fee')}</span>
        <span>{shippingCost + " $"}</span>
      </div>
      <div className="flex-between text-xl font-bold text-text-main pt-3 border-t border-primary/10">
        <h4>{t('order_success.total')}</h4>
        <span className="text-primary">{totalCost + " $"}</span>
      </div>
    </div>
  );
}

export default OrderTotal;