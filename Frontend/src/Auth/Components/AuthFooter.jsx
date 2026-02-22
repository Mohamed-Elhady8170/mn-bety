import React from 'react';

const AuthFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-bg-main mt-auto font-cairo"
      dir="rtl"
    >
      <div className="border-t border-border-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-subtle">
              <p>
                © {currentYear} من بيتي. جميع الحقوق محفوظة. صنع بكل حب في مصر
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="hover:font-medium transition-all duration-300 hover:text-primary"
                >
                  بيان الخصوصية
                </a>
                <a
                  href="#"
                  className="hover:font-medium transition-all duration-300 hover:text-primary"
                >
                  ملفات تعريف الارتباط
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