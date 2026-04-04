import { useTranslation } from "react-i18next";

function WelcomeMsg() {
  const { t } = useTranslation();

  return (
    <div className="dashboard-header mb-8">
      <h1 className="text-2xl text-text-main">
        {t("seller.welcome.title")}
      </h1>
      <p className="text-text-subtle mt-1">
        {t("seller.welcome.subtitle")}
      </p>
    </div>
  );
}

export default WelcomeMsg;
