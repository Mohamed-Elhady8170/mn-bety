import React from 'react';
import { Mail, Phone, MapPin, Camera, Share2, Globe } from 'lucide-react';
import logo from '../../../assets/Logos/logo02.png';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const quickLinks = [
    { name: t('footer.quick_links.about_store'), href: '#' },
    { name: t('footer.quick_links.join_seller'), href: '#' },
    { name: t('footer.quick_links.shipping_policy'), href: '#' },
    { name: t('footer.quick_links.faq'), href: '#' },
  ];

  const supportLinks = [
    { name: t('auth_footer.privacy'), href: '#' },
    { name: t('auth.signup.terms_link'), href: '#' },
    { name: t('footer.support_links.contact_us'), href: '#' },
    { name: t('footer.support_links.track_shipment'), href: '#' },
  ];

  const socialLinks = [
    { icon: Camera, href: '#', label: t('footer.social.instagram') },
    { icon: Globe, href: '#', label: t('footer.social.facebook') },
    { icon: Share2, href: '#', label: t('footer.social.twitter') },
  ];

  return (
    <footer className="print:hidden bg-bg-main border-t border-border-warm mt-auto font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
          {/* Vertical Dividers */}
          <div className="absolute top-0 bottom-0 hidden lg:block w-px bg-linear-to-b from-transparent via-primary/30 to-transparent" style={{ insetInlineEnd: '25%' }}></div>
          <div className="absolute top-0 bottom-0 hidden lg:block w-px bg-linear-to-b from-transparent via-primary/30 to-transparent" style={{ insetInlineEnd: '50%' }}></div>
          <div className="absolute top-0 bottom-0 hidden lg:block w-px bg-linear-to-b from-transparent via-primary/30 to-transparent" style={{ insetInlineEnd: '75%' }}></div>

          {/* About Section */}
          <div className="space-y-4 pb-6 md:pb-0 border-b md:border-b-0 border-primary/20 last:border-b-0 md:pe-6 lg:pe-8">

            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt={t('common.home')} className="h-20 w-auto object-contain" />
            </a>
            <p className="text-sm text-text-subtle leading-relaxed">
              {t('footer.about_description')}
            </p>

            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-bg-subtle flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg text-text-subtle hover:text-white"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ec5e0c'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}
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
            <h3 className="text-lg font-bold text-text-main">{t('footer.quick_links.title')}</h3>
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
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4 py-6 md:py-0 border-b md:border-b-0 border-primary/20 last:border-b-0 md:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-text-main">{t('footer.support_links.title')}</h3>
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
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4 pt-6 md:pt-0 md:ps-6 lg:ps-8">
            <h3 className="text-lg font-bold text-text-main">{t('footer.contact.title')}</h3>
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
                <span>{t('footer.contact.location')}</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-sm font-bold text-text-main mb-3">{t('footer.newsletter.title')}</h4>
              <p className="text-xs text-text-subtle mb-3">{t('footer.newsletter.subtitle')}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-1 px-3 py-2 bg-bg-subtle border-2 border-transparent rounded-xl text-xs focus:outline-none transition-all duration-300 text-text-main placeholder:text-text-subtle"
                  onFocus={(e) => { e.target.style.borderColor = '#ec5e0c'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'transparent'; }}
                />
                <button
                  className="px-4 py-2 rounded-xl text-white text-xs font-bold bg-primary transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d43d0a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ec5e0c'}
                >
                  {t('footer.newsletter.subscribe_btn')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-warm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-subtle">
            <p>© {currentYear} {t('auth_footer.copyright')}</p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="hover:font-medium transition-all duration-300"
                onMouseEnter={(e) => e.currentTarget.style.color = '#ec5e0c'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                {t('auth_footer.privacy')}
              </a>
              <a
                href="#"
                className="hover:font-medium transition-all duration-300"
                onMouseEnter={(e) => e.currentTarget.style.color = '#ec5e0c'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                {t('auth_footer.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;