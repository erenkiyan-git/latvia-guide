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
    <div className="max-w-2xl mx-auto bg-white border border-slate-300 rounded-2xl p-8 sm:p-10 shadow-lg text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-slate-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-slate-100 blur-3xl"></div>
      
      <div className="relative z-10">
        <CheckCircle2 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">{title}</h3>
        <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">{subtitle}</p>
        
        {/* Fake Progress Bar */}
        <div className="w-full h-3 bg-slate-200 rounded-full mb-8 overflow-hidden border border-slate-300">
          <div className="h-full bg-primary-600 w-[15%] rounded-full"></div>
        </div>
        
        <Button href={`/${lang}/checklist/`} className="bg-primary-600 text-white hover:bg-primary-700 font-bold border-none px-8 py-3 rounded-xl shadow-sm hover:shadow-md transition-all w-full sm:w-auto">
          {buttonText}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
