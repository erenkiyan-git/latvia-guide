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
              className="flex flex-col items-center justify-center text-center gap-3 p-6 bg-rose-950/30 border border-rose-900 rounded-2xl text-rose-400 font-semibold hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-900/20 hover:border-rose-700 transition-all group"
            >
              <Icon className="w-10 h-10 text-rose-500 group-hover:scale-110 transition-transform" />
              <span>{p.label}</span>
            </a>
          );
        }

        return (
          <a 
            key={p.id}
            href={p.href} 
            className="flex flex-col items-center justify-center text-center gap-3 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-300 font-semibold hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 hover:border-primary-700 transition-all group"
          >
            <Icon className="w-10 h-10 text-primary-600 group-hover:text-primary-500 group-hover:scale-110 transition-all" />
            <span className="group-hover:text-white transition-colors">{p.label}</span>
          </a>
        );
      })}
    </div>
  );
}
