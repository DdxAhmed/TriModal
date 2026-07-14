import { Linkedin, ShieldCheck } from 'lucide-react';
import { useReveal } from '@/hooks/use-reveal';

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  linkedin: string;
  specialty: string;
}

export function TeamSection() {
  const { ref, isVisible } = useReveal();

  const team: TeamMember[] = [
    {
      name: "Ahmed Salmona",
      role: "Embedded Systems Architect",
      initials: "AS",
      specialty: "Bare-Metal firmware & Dual-Core ESP32 execution",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Ahmed%20Salmona"
    },
    {
      name: "Souad Mostafa",
      role: "TinyML Research Lead",
      initials: "SM",
      specialty: "Online Incremental K-Means & Feature extraction",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Souad%20Mostafa"
    },
    {
      name: "Haneen Yasser",
      role: "DSP & Signal Processing Eng.",
      initials: "HY",
      specialty: "Fast Fourier Transforms (FFT) & Noise filters",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Haneen%20Yasser"
    },
    {
      name: "Maryam Mahmoud",
      role: "UI & Multithreading Developer",
      initials: "MM",
      specialty: "FreeRTOS queues, task scheduling & WebSockets",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Maryam%20Mahmoud"
    }
  ];

  return (
    <section className="py-24 md:py-32 border-b border-border/30 bg-black/40 relative overflow-hidden" dir="ltr" aria-labelledby="team-heading">
      {/* Background neon effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,255,65,0.02)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="mb-16 text-center">
          <span className="text-sm font-mono text-primary tracking-widest mb-4 uppercase block">
            // DEVELOPERS_AND_ENGINEERS
          </span>
          <h2 id="team-heading" className="text-4xl md:text-5xl font-sans font-bold text-foreground">
            Project Development Team
          </h2>
          <p className="text-muted-foreground mt-4 text-base max-w-xl mx-auto font-sans">
            The engineering minds behind the multi-physics sensor fusion and edge AI processing models on the ESP32 microcontroller.
          </p>
        </div>

        {/* Team Grid */}
        <div 
          ref={ref} 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ${
            isVisible ? 'reveal-visible' : 'reveal-hidden'
          }`}
        >
          {team.map((member, index) => (
            <a 
              key={index}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative border border-border bg-card/20 p-6 flex flex-col items-center text-center hover:bg-black hover:border-primary/55 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,255,65,0.03)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-xl"
              aria-label={`Visit ${member.name}'s LinkedIn profile`}
            >
              {/* Glowing top line */}
              <div className="absolute top-0 right-0 w-full h-px bg-linear-to-l from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
              
              {/* Holographic scanning avatar box */}
              <div className="relative w-full aspect-square bg-black border border-border/40 mb-6 flex flex-col items-center justify-center overflow-hidden group-hover:border-primary/45 transition-colors duration-500 rounded-lg">
                {/* HUD bracket decorations */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-primary/20 group-hover:border-primary/60 transition-colors" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-primary/20 group-hover:border-primary/60 transition-colors" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-primary/20 group-hover:border-primary/60 transition-colors" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-primary/20 group-hover:border-primary/60 transition-colors" />

                {/* Laser scan line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/40 shadow-[0_0_8px_hsl(var(--primary))] opacity-0 group-hover:opacity-100 group-hover:animate-crt-scan" />
                
                {/* Tech grid mesh */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.015)_1px,transparent_1px)] bg-size-[10px_10px] pointer-events-none" />

                {/* Initials Hologram */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center mb-3 group-hover:scale-105 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 relative">
                    {/* Inner spinning ring */}
                    <div className="absolute inset-0 rounded-full border-t border-b border-primary/40 animate-spin opacity-0 group-hover:opacity-60" style={{ animationDuration: '4s' }} />
                    
                    <span className="font-mono text-3xl font-bold text-primary/70 group-hover:text-primary glow-text transition-colors">
                      {member.initials}
                    </span>
                  </div>
                  
                  {/* Status Indicator */}
                  <span className="font-mono text-[9px] text-muted-foreground bg-white/5 border border-border/30 px-2 py-0.5 rounded-full flex items-center gap-1.5 group-hover:border-primary/30 group-hover:text-primary transition-all duration-300">
                    <ShieldCheck className="w-2.5 h-2.5" aria-hidden="true" />
                    <span>SYS_ACTIVE</span>
                  </span>
                </div>

                {/* LinkedIn Floating Hover Overlay */}
                <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-3 bg-primary text-black rounded-full shadow-[0_0_15px_hsl(var(--primary))] scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Linkedin className="w-6 h-6 fill-current" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Name & Credentials */}
              <div className="space-y-2 relative z-10">
                <h3 className="text-xl font-bold font-sans text-foreground group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-primary font-mono text-xs uppercase tracking-wide">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-xs font-sans leading-relaxed pt-2 border-t border-border/20 max-w-[200px] mx-auto">
                  {member.specialty}
                </p>
              </div>

            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
