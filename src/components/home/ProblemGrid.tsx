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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {problems.map((p) => {
        const Icon = p.icon;
        
        if (p.isEmergency) {
          return (
            <a 
              key={p.id}
              href={p.href} 
              className="flex flex-col items-center justify-center text-center gap-3 p-6 bg-accent-50 border border-accent-200 rounded-2xl text-accent-700 font-semibold hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-100 hover:border-accent-300 transition-all group shadow-sm"
            >
              <Icon className="w-10 h-10 text-accent-600 group-hover:scale-110 transition-transform" />
              <span>{p.label}</span>
            </a>
          );
        }

        return (
          <a 
            key={p.id}
            href={p.href} 
            className="flex flex-col items-center justify-center text-center gap-3 p-6 bg-surface border border-slate-300 rounded-2xl text-slate-700 font-semibold hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200 hover:border-slate-400 transition-all group shadow-sm"
          >
            <Icon className="w-10 h-10 text-primary-400 group-hover:text-primary-700 group-hover:scale-110 transition-all" />
            <span className="group-hover:text-slate-900 transition-colors">{p.label}</span>
          </a>
        );
      })}
    </div>
  );
}
