import { useTranslation } from "react-i18next";
import OrderTotal from "./OrderTotal";

function SuccessSummary({children}) {
  const { t } = useTranslation();
  
  return (
    <div className="card mb-8">
      <div className="border-b border-primary/5">
        <h2 className="text-text-main text-xl font-bold">{t('order_success.order_summary_title')}</h2>
      </div>
        {children}
      <OrderTotal />
    </div>
  );
}
export default SuccessSummary;