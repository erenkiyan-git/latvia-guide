import React from 'react';
import { PlaneLanding, Home, Stethoscope, Briefcase, GraduationCap, FileText, Bus, Siren } from 'lucide-react';

interface ProblemGridProps {
  lang: string;
  translations: Record<string, string>;
}

export function ProblemGrid({ lang, translations }: ProblemGridProps) {
  const problems = [
    { id: 'arrived', icon: PlaneLanding, href: `/${lang}/guides/new-to-latvia/`, label: translations['home.problem.arrived'] },
    { id: 'housing', icon: Home, href: `/${lang}/guides/housing/`, label: translations['home.problem.housing'] },
    { id: 'doctor', icon: Stethoscope, href: `/${lang}/guides/healthcare/`, label: translations['home.problem.doctor'] },
    { id: 'job', icon: Briefcase, href: `/${lang}/guides/work/`, label: translations['home.problem.job'] },
    { id: 'student', icon: GraduationCap, href: `/${lang}/guides/students/`, label: translations['home.problem.student'] },
    { id: 'permit', icon: FileText, href: `/${lang}/guides/documents/`, label: translations['home.problem.permit'] },
    { id: 'transport', icon: Bus, href: `/${lang}/guides/transport/`, label: translations['home.problem.transport'] },
    { id: 'emergency', icon: Siren, href: `/${lang}/emergency/`, label: translations['home.problem.emergency'], isEmergency: true }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {problems.map((p) => {
        const Icon = p.icon;
        
        if (p.isEmergency) {
          return (
            <a 
              key={p.id}
              href={p.href} 
              className="flex flex-col items-center justify-center text-center gap-2 sm:gap-3 p-3.5 sm:p-5 md:p-6 bg-primary-950/40 border border-primary-500/50 rounded-2xl text-primary-300 font-semibold hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-900/40 hover:border-primary-400 transition-all group shadow-sm"
            >
              <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm leading-snug">{p.label}</span>
            </a>
          );
        }

        return (
          <a 
            key={p.id}
            href={p.href} 
            className="flex flex-col items-center justify-center text-center gap-2 sm:gap-3 p-3.5 sm:p-5 md:p-6 bg-surface border border-slate-300 rounded-2xl text-slate-700 font-semibold hover:-translate-y-1 hover:shadow-lg hover:border-primary-500/60 transition-all group shadow-sm"
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-400 group-hover:text-primary-300 group-hover:scale-110 transition-all" />
            <span className="text-xs sm:text-sm leading-snug group-hover:text-slate-900 transition-colors">{p.label}</span>
          </a>
        );
      })}
    </div>
  );
}
