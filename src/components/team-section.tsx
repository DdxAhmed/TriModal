import { Linkedin, ShieldCheck } from 'lucide-react';
import { useReveal } from '@/hooks/use-reveal';
import { useLanguage } from '@/hooks/use-language';

interface TeamMember {
  name: string;
  initials: string;
  linkedin: string;

}

export function TeamSection() {
  const { ref, isVisible } = useReveal();
  const { language } = useLanguage();

  const team: TeamMember[] = [
    {
      name: "Ahmed Salmona",
      initials: "AS",
      linkedin: "linkedin.com/in/ahmed-salmona/"
    },
    {
      name: "Souad Mostafa",
      initials: "SM",
      linkedin: "https://www.linkedin.com/in/souad-mostafa-1193212a4 "
    },
    {
      name: "Haneen Yasser",
      initials: "HY",
      linkedin: "https://www.linkedin.com/in/haneen-yasser0/"
    },
    {
      name: "Maryam Mahmoud",
      initials: "MM",
      linkedin: "https://www.linkedin.com/in/maryam-mahmoud-69a14a290/"
    }
  ];

  return (
    <section className="py-24 md:py-32 border-b border-border/30 bg-black/40 relative overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'} aria-labelledby="team-heading">
      {/* Background neon effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,255,65,0.02)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="mb-16 text-center">
          <span className="text-sm font-mono text-primary tracking-widest mb-4 uppercase block">
            {language === 'en' ? '// DEVELOPERS_AND_ENGINEERS' : '// المطورون والمهندسون'}
          </span>
          <h2 id="team-heading" className="text-4xl md:text-5xl font-sans font-bold text-foreground">
            {language === 'en' ? 'Project Development Team' : 'فريق عمل المشروع'}
          </h2>
        </div>

        {/* Team Grid */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ${isVisible ? 'reveal-visible' : 'reveal-hidden'
            }`}
        >
          {team.map((member, index) => {
            const memberSchemes = [
              {
                glassClass: 'glass-card-blue',
                topLine: 'bg-blue-400',
                hudBorder: 'border-blue-500/30 group-hover:border-blue-400',
                avatarBg: 'bg-blue-500/15 border-blue-500/40 group-hover:border-blue-400',
                initialsText: 'text-blue-400 glow-text-blue',
                badgeText: 'text-blue-400 border-blue-500/40',
                nameGradient: 'group-hover:text-gradient-blue',
                linkedInBg: 'bg-blue-500 text-black shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              },
              {
                glassClass: 'glass-card-purple',
                topLine: 'bg-purple-400',
                hudBorder: 'border-purple-500/30 group-hover:border-purple-400',
                avatarBg: 'bg-purple-500/15 border-purple-500/40 group-hover:border-purple-400',
                initialsText: 'text-purple-400 glow-text-purple',
                badgeText: 'text-purple-400 border-purple-500/40',
                nameGradient: 'group-hover:text-gradient-purple',
                linkedInBg: 'bg-purple-500 text-black shadow-[0_0_15px_rgba(139,92,246,0.5)]'
              },
              {
                glassClass: 'glass-card-emerald',
                topLine: 'bg-emerald-400',
                hudBorder: 'border-emerald-500/30 group-hover:border-emerald-400',
                avatarBg: 'bg-emerald-500/15 border-emerald-500/40 group-hover:border-emerald-400',
                initialsText: 'text-emerald-400 glow-text-emerald',
                badgeText: 'text-emerald-400 border-emerald-500/40',
                nameGradient: 'group-hover:text-gradient-emerald',
                linkedInBg: 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
              },
              {
                glassClass: 'glass-card-amber',
                topLine: 'bg-amber-400',
                hudBorder: 'border-amber-500/30 group-hover:border-amber-400',
                avatarBg: 'bg-amber-500/15 border-amber-500/40 group-hover:border-amber-400',
                initialsText: 'text-amber-400 glow-text-amber',
                badgeText: 'text-amber-400 border-amber-500/40',
                nameGradient: 'group-hover:text-gradient-amber',
                linkedInBg: 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
              }
            ];
            const ms = memberSchemes[index % memberSchemes.length];

            return (
              <a
                key={index}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative ${ms.glassClass} hover-lift p-6 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl cursor-pointer rounded-2xl`}
                aria-label={`Visit ${member.name}'s LinkedIn profile`}
              >
                {/* Glowing top line */}
                <div className={`absolute top-0 right-0 w-full h-[2px] ${ms.topLine} opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                {/* Holographic scanning avatar box */}
                <div className="relative w-full aspect-square bg-black/70 border border-white/10 mb-6 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 rounded-xl">
                  {/* HUD bracket decorations */}
                  <div className={`absolute top-2 left-2 w-3.5 h-3.5 border-t border-l ${ms.hudBorder} transition-colors`} />
                  <div className={`absolute top-2 right-2 w-3.5 h-3.5 border-t border-r ${ms.hudBorder} transition-colors`} />
                  <div className={`absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l ${ms.hudBorder} transition-colors`} />
                  <div className={`absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r ${ms.hudBorder} transition-colors`} />

                  {/* Laser scan line */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-400/60 opacity-0 group-hover:opacity-100 group-hover:animate-crt-scan" />

                  {/* Tech grid mesh */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[10px_10px] pointer-events-none" />

                  {/* Initials Hologram */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className={`w-20 h-20 rounded-full border ${ms.avatarBg} flex items-center justify-center mb-3 group-hover:scale-105 transition-all duration-500 relative`}>
                      {/* Inner spinning ring */}
                      <div className="absolute inset-0 rounded-full border-t border-b border-current animate-spin opacity-0 group-hover:opacity-60" style={{ animationDuration: '4s' }} />

                      <span className={`font-mono text-2xl font-bold ${ms.initialsText} transition-colors`} dir="ltr">
                        {member.initials}
                      </span>
                    </div>

                    {/* Status Indicator */}
                    <span className={`font-mono text-[9px] bg-black/70 border ${ms.badgeText} px-2.5 py-0.5 rounded-full flex items-center gap-1.5 transition-all duration-300`}>
                      <ShieldCheck className="w-2.5 h-2.5" aria-hidden="true" />
                      <span>{language === 'en' ? 'ENGINEER' : 'مهندس'}</span>
                    </span>
                  </div>

                  {/* LinkedIn Floating Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`p-3.5 ${ms.linkedInBg} rounded-full scale-90 group-hover:scale-100 transition-transform duration-300`}>
                      <Linkedin className="w-6 h-6 fill-current" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Name & Credentials */}
                <div className="space-y-2 relative z-10">
                  <h3 className={`text-xl font-bold font-sans text-foreground ${ms.nameGradient} transition-all duration-300`}>
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-xs font-sans leading-relaxed pt-2 border-t border-white/10 max-w-50 mx-auto">
                    {member.specialty}
                  </p>
                </div>

              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
