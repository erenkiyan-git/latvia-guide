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
    <footer className="mt-auto bg-zinc-950 border-t border-zinc-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Latvia Guide</h3>
            <p className="text-zinc-400 max-w-md">{subtitle}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-zinc-200 mb-4">Links</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`inline-block transition-colors ${
                      link.isEmergency 
                        ? 'text-rose-500 font-semibold hover:text-rose-400 hover:underline' 
                        : 'text-zinc-400 hover:text-primary-400'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 flex flex-col gap-6 text-center text-sm text-zinc-500">
          <div className="bg-zinc-900 p-4 rounded-xl border border-amber-900/30 text-zinc-400 max-w-4xl mx-auto">
            <strong className="font-semibold text-zinc-300 mr-2">Disclaimer:</strong> 
            {disclaimer}
          </div>
          <p>&copy; {currentYear} Latvia Guide. Built for foreigners, by foreigners.</p>
        </div>
      </div>
    </footer>
  );
}
