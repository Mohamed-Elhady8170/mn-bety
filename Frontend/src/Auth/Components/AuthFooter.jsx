import React from 'react';

const AuthFooter = () => {
  const currentYear = new Date().getFullYear();
  const orangeColor = '#ec4d18';

  return (
    <footer
      className="bg-white dark:bg-bg-footer mt-auto font-cairo"
      dir="rtl"
    >
      {/* <div className="pt-12"></div> */}

      <div className="border-t border-[#e7d5cf] dark:border-[#3d2a24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#956b50] dark:text-[#e7d5cf]">
              <p>
                © {currentYear} من بيتي. جميع الحقوق محفوظة. صنع بكل حب في مصر
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="hover:font-medium transition-all duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.color = orangeColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  بيان الخصوصية
                </a>
                <a
                  href="#"
                  className="hover:font-medium transition-all duration-300"
                  onMouseEnter={(e) => e.currentTarget.style.color = orangeColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
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