import { useTranslation } from "react-i18next";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function TrusMsg() {
  const { t } = useTranslation();
  
  return (
    <div className="order-action-btns mt-12 text-center space-y-4">
      <div className="flex-center gap-2 text-primary/60">
        <RiVerifiedBadgeFill className="text-success-green" />
        <span className="text-sm font-medium">{t('order_success.quality_guarantee')}</span>
      </div>
      <p className="text-gray-400 text-sm">
        {t('order_success.have_question')}
        <Link className="text-primary underline mx-1" href="#">
          {t('order_success.contact_support')}
        </Link>
      </p>
    </div>
  );
}

export default TrusMsg;