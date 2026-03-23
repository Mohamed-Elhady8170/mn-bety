import { useTranslation } from "react-i18next";
import { MdTrackChanges } from "react-icons/md";
import { CiShoppingBasket } from "react-icons/ci";
import { Link } from "react-router-dom";

function OrderActionsBtns() {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-125 mx-auto flex flex-col sm:flex-row sm:justify-center gap-4">
      <button className="btn btn-primary flex-center gap-2 flex-1">
        <MdTrackChanges />
        {t('order_success.track_order_btn')}
      </button>
      <Link to="/user/products" className="btn btn-outline flex-center gap-2 flex-1">
        <CiShoppingBasket />
        {t('order_success.continue_shopping_btn')}
      </Link>
    </div>
  );
}

export default OrderActionsBtns;