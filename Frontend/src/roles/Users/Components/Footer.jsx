import React from 'react';
import { Mail, Phone, MapPin, Camera, Share2, Globe } from 'lucide-react';
import logo from '../../../assets/Logos/logo02.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'عن المتجر', href: '#' },
    { name: 'انضم كبائع', href: '#' },
    { name: 'سياسة الشحن', href: '#' },
    { name: 'الأسئلة الشائعة', href: '#' },
  ];

  const supportLinks = [
    { name: 'سياسة الخصوصية', href: '#' },
    { name: 'الشروط والأحكام', href: '#' },
    { name: 'تواصل معنا', href: '#' },
    { name: 'تتبع الشحنة', href: '#' },
  ];

  const socialLinks = [
    { icon: Camera, href: '#', label: 'انستغرام' },
    { icon: Globe, href: '#', label: 'فيسبوك' },
    { icon: Share2, href: '#', label: 'تويتر' },
  ];

  return (
    <footer
      className="bg-bg-main border-t border-border-warm mt-auto font-cairo"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
          {/* Vertical Dividers */}
          <div className="absolute top-0 bottom-0 right-1/4 hidden lg:block w-px bg-linear-to-b from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-2/4 hidden lg:block w-px bg-linear-to-b from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-3/4 hidden lg:block w-px bg-linear-to-b from-transparent via-primary/30 to-transparent"></div>

          {/* About Section */}
          <div className="space-y-4 pb-6 md:pb-0 border-b md:border-b-0 border-primary/20 last:border-b-0 md:pl-6 lg:pl-8">
            <a href="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="من بيتي"
                className="h-20 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-text-subtle leading-relaxed">
              منصة متخصصة في دعم الحرفيين العرب وربطهم بمحبي الفنون اليدوية حول العالم.
              كل قطعة لدينا تحكي قصة من تراثنا الأصيل.
            </p>

            {/* Social Links  */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-bg-subtle flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-subtle hover:text-white"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ec5e0c';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 py-6 md:py-0 border-b md:border-b-0 border-primary/20 last:border-b-0 md:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-text-main">
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-text-subtle hover:font-medium transition-all duration-300 relative group inline-block"
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ec5e0c'}
                    onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  >
                    {link.name}
                    <span
                      className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4 py-6 md:py-0 border-b md:border-b-0 border-primary/20 last:border-b-0 md:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-text-main">
              خدمة العملاء
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-text-subtle hover:font-medium transition-all duration-300 relative group inline-block"
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ec5e0c'}
                    onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  >
                    {link.name}
                    <span
                      className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4 pt-6 md:pt-0 md:pr-6 lg:pr-8">
            <h3 className="text-lg font-bold text-text-main">
              تواصل معنا
            </h3>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-text-subtle">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@mnbety.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-subtle">
                <Phone className="w-4 h-4 text-primary" />
                <span>+20 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-subtle">
                <MapPin className="w-4 h-4 text-primary" />
                <span>القاهرة، مصر</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-sm font-bold text-text-main mb-3">
                النشرة البريدية
              </h4>
              <p className="text-xs text-text-subtle mb-3">
                كن أول من يعرف عن القطع الجديدة والحصرية
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-3 py-2 bg-bg-subtle border-2 border-transparent rounded-xl text-xs focus:outline-none transition-all duration-300 text-text-main placeholder:text-text-subtle"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ec5e0c';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'transparent';
                  }}
                />
                <button
                  className="px-4 py-2 rounded-xl text-white text-xs font-bold bg-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#d43d0a]"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d43d0a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ec5e0c'}
                >
                  اشترك
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-warm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-subtle">
            <p>
              © {currentYear} من بيتي. جميع الحقوق محفوظة. صنع بكل حب في مصر
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="hover:font-medium transition-all duration-300"
                onMouseEnter={(e) => e.currentTarget.style.color = '#ec5e0c'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                بيان الخصوصية
              </a>
              <a
                href="#"
                className="hover:font-medium transition-all duration-300"
                onMouseEnter={(e) => e.currentTarget.style.color = '#ec5e0c'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;