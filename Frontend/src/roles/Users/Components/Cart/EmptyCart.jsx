import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function EmptyCart() {
  const { t } = useTranslation();
  
  return (
    <section className="empty-cart layout-container flex-center flex-col py-20">
      <div className="w-24 h-24 bg-beige-soft rounded-full flex-center mb-6">
        <span className="text-4xl text-clay">
          <AiOutlineShopping />
        </span>
      </div>
      <h2 className="text-2xl mb-4">{t('cart.empty.title')}</h2>
      <p className="text-clay mb-8">
        {t('cart.empty.message')}
      </p>
      <Link to="/products">
        <button className="btn btn-primary">{t('cart.empty.start_shopping_btn')}</button>
      </Link>
    </section>
  );
}

export default EmptyCart;