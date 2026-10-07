import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface ChecklistPreviewProps {
  lang: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export function ChecklistPreview({ lang, title, subtitle, buttonText }: ChecklistPreviewProps) {
  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl p-8 sm:p-10 shadow-xl shadow-primary-900/20 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-black/20 blur-3xl"></div>
      
      <div className="relative z-10">
        <CheckCircle2 className="w-12 h-12 text-white/90 mx-auto mb-4" />
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-primary-100 text-lg mb-8 max-w-md mx-auto">{subtitle}</p>
        
        {/* Fake Progress Bar */}
        <div className="w-full h-3 bg-black/20 rounded-full mb-8 overflow-hidden backdrop-blur-sm border border-white/10">
          <div className="h-full bg-emerald-400 w-[15%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
        </div>
        
        <Button href={`/${lang}/checklist/`} className="bg-white text-primary-800 hover:bg-zinc-100 font-bold border-none px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto">
          {buttonText}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
