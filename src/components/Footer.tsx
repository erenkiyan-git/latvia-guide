import React from 'react';

interface FooterLink {
  href: string;
  label: string;
  isEmergency?: boolean;
}

interface FooterProps {
  currentLang: string;
  subtitle: string;
  disclaimer: string;
  links: FooterLink[];
  legalLinks?: FooterLink[];
  legalHeading?: string;
  quickLinksHeading?: string;
}

export default function Footer({
  currentLang,
  subtitle,
  disclaimer,
  links,
  legalLinks = [],
  legalHeading,
  quickLinksHeading
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-base border-t border-slate-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Latvia Guide</h3>
            <p className="text-slate-600 max-w-md">{subtitle}</p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              {currentLang === 'tr'
                ? 'Latvia Guide bağımsız bir bilgi projesidir; Letonya Cumhuriyeti resmi devlet kurumu değildir.'
                : 'Latvia Guide is an independent informational project and is not an official government website.'}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-800 mb-4">
              {quickLinksHeading || (currentLang === 'tr' ? 'Hızlı Bağlantılar' : 'Quick Links')}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`inline-block transition-colors text-sm ${
                      link.isEmergency 
                        ? 'text-primary-400 font-semibold hover:text-primary-300 hover:underline' 
                        : 'text-slate-600 hover:text-primary-400'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-4">
              {legalHeading || (currentLang === 'tr' ? 'Yasal ve Güven' : 'Legal & Trust')}
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block text-sm text-slate-600 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
        
        <div className="border-t border-slate-300 pt-8 flex flex-col gap-6 text-center text-sm text-slate-500">
          <div className="bg-surface p-4 rounded-xl border border-slate-300 text-slate-600 max-w-4xl mx-auto text-xs leading-relaxed">
            <strong className="font-semibold text-slate-900 mr-2">{currentLang === 'tr' ? 'Yasal Uyarı:' : 'Disclaimer:'}</strong> 
            {disclaimer}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>&copy; {currentYear} Latvia Guide. {currentLang === 'tr' ? 'Yabancılar tarafından, yabancılar için hazırlandı.' : 'Built for foreigners, by foreigners.'}</p>
            <p className="inline-flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {currentLang === 'tr' ? '100% Çerezsiz & Gizlilik Odaklı' : '100% Cookieless · Privacy-First'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

