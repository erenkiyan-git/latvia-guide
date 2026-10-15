import React from 'react';

interface FooterProps {
  currentLang: string;
  subtitle: string;
  disclaimer: string;
  links: { href: string; label: string; isEmergency?: boolean }[];
}

export default function Footer({ currentLang, subtitle, disclaimer, links }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-base border-t border-slate-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Latvia Guide</h3>
            <p className="text-slate-600 max-w-md">{subtitle}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-800 mb-4">{currentLang === 'tr' ? 'Hızlı Bağlantılar' : 'Quick Links'}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`inline-block transition-colors ${
                      link.isEmergency 
                        ? 'text-accent-500 font-semibold hover:text-accent-400 hover:underline' 
                        : 'text-slate-600 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-300 pt-8 flex flex-col gap-6 text-center text-sm text-slate-500">
          <div className="bg-surface p-4 rounded-xl border border-slate-300 text-slate-600 max-w-4xl mx-auto">
            <strong className="font-semibold text-white mr-2">{currentLang === 'tr' ? 'Yasal Uyarı:' : 'Disclaimer:'}</strong> 
            {disclaimer}
          </div>
          <p>&copy; {currentYear} Latvia Guide. {currentLang === 'tr' ? 'Yabancılar tarafından, yabancılar için hazırlandı.' : 'Built for foreigners, by foreigners.'}</p>
        </div>
      </div>
    </footer>
  );
}
