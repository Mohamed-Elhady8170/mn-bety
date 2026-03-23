import React from 'react';
import { useTranslation } from 'react-i18next';

const AuthFooter = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-bg-main mt-auto font-cairo"
    >
      <div className="border-t border-border-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-subtle">
              <p>
                © {currentYear} {t('auth_footer.copyright')}
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="hover:font-medium transition-all duration-300 hover:text-primary"
                >
                  {t('auth_footer.privacy')}
                </a>
                <a
                  href="#"
                  className="hover:font-medium transition-all duration-300 hover:text-primary"
                >
                  {t('auth_footer.cookies')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;