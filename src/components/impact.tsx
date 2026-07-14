import { useReveal } from '@/hooks/use-reveal';

export function Impact() {
  const { ref, isVisible } = useReveal();
  
  return (
    <section className="py-32 md:py-48 border-b border-border/30 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_0%_0%,rgba(0,255,65,0.04)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref} className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
          
          <div className="flex-1 w-full relative">
            <div className="relative group">
              <div className="text-5xl md:text-[5rem] lg:text-[6rem] font-bold font-sans tracking-tight text-primary/90 glow-text mb-4 leading-none">
                $<span dir="ltr">50</span> BILLION
              </div>
              <div className="absolute top-0 right-0 text-5xl md:text-[5rem] lg:text-[6rem] font-bold font-sans tracking-tight text-destructive/50 leading-none opacity-0 group-hover:opacity-100 group-hover:animate-glitch pointer-events-none">
                $<span dir="ltr">50</span> BILLION
              </div>
            </div>
            
            <div className="h-px w-full bg-border mb-6 relative">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-primary" />
            </div>
            
            <p className="font-mono text-xs md:text-sm text-primary tracking-widest max-w-sm">
              ANNUAL LOSSES DUE TO UNPLANNED DOWNTIME
            </p>
          </div>
          
          <div className="flex-1 space-y-8 text-xl md:text-2xl text-muted-foreground border-s border-primary/20 ps-8 lg:ps-12" dir="ltr">
            <p className="font-sans leading-relaxed">
              Traditional motor protection relies on thermal relays. They are <strong className="text-foreground font-bold">structurally blind</strong>.
            </p>
            <p className="font-sans leading-relaxed text-lg md:text-xl">
              A thermal relay only responds to heat (Joule heating <span dir="ltr" className="inline-block font-mono text-primary/80">P=I²R</span>). By the time it detects the failure, the insulation has melted, the windings have burned, and the production line has halted.
            </p>
            <div className="mt-8 pt-8 border-t border-border/30">
              <p className="text-primary font-mono text-sm tracking-wider flex items-center gap-2">
                <span dir="ltr" className="inline-block">&gt;</span>
                <span>We transition predictive diagnostics to the microsecond level.</span>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}