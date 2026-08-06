import { useReveal } from '@/hooks/use-reveal';
import { useLanguage } from '@/hooks/use-language';

export function Impact() {
  const { ref, isVisible } = useReveal();
  const { language } = useLanguage();
  
  return (
    <section className="py-32 md:py-48 border-b border-border/30 bg-background relative overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_0%_0%,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_100%_100%,rgba(139,92,246,0.06)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref} className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
          
          <div className="flex-1 w-full relative">
            <div className="relative group">
              <div className="text-5xl md:text-[5rem] lg:text-[6rem] font-bold font-sans tracking-tight bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent glow-text-blue mb-4 leading-none">
                {language === 'en' ? (
                  <>$<span dir="ltr">50</span> BILLION</>
                ) : (
                  <><span dir="ltr">50</span> مليار $</>
                )}
              </div>
              <div className="absolute top-0 right-0 text-5xl md:text-[5rem] lg:text-[6rem] font-bold font-sans tracking-tight text-destructive/50 leading-none opacity-0 group-hover:opacity-100 group-hover:animate-glitch pointer-events-none">
                {language === 'en' ? (
                  <>$<span dir="ltr">50</span> BILLION</>
                ) : (
                  <><span dir="ltr">50</span> مليار $</>
                )}
              </div>
            </div>
            
            <div className="h-px w-full bg-border mb-6 relative">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-linear-to-r from-blue-500 to-purple-500" />
            </div>
            
            <p className="font-mono text-xs md:text-sm text-blue-400 tracking-widest max-w-sm">
              {language === 'en' 
                ? 'ANNUAL LOSSES DUE TO UNPLANNED DOWNTIME'
                : 'الخسائر السنوية الناجمة عن التعطل غير المخطط له'
              }
            </p>
          </div>
          
          <div className="flex-1 space-y-8 text-xl md:text-2xl text-muted-foreground border-s border-blue-500/30 ps-8 lg:ps-12">
            <p className="font-sans leading-relaxed">
              {language === 'en' ? (
                <>Traditional motor protection relies on thermal relays. They are <strong className="text-foreground font-bold">structurally blind</strong>.</>
              ) : (
                <>تعتمد حماية المحركات التقليدية على المرحلات الحرارية. إنها <strong className="text-foreground font-bold">عمياء هيكلياً</strong>.</>
              )}
            </p>
            <p className="font-sans leading-relaxed text-lg md:text-xl">
              {language === 'en' ? (
                <>A thermal relay only responds to heat (Joule heating <span dir="ltr" className="inline-block font-mono text-primary/80">P=I²R</span>). By the time it detects the failure, the insulation has melted, the windings have burned, and the production line has halted.</>
              ) : (
                <>المرحل الحراري يستجيب فقط للحرارة المتولدة (مفعول جول الحركي <span dir="ltr" className="inline-block font-mono text-primary/80">P=I²R</span>). وبحلول الوقت الذي يكتشف فيه الخلل، يكون العازل قد انصهر، واحترقت الملفات، وتوقفت خطوط الإنتاج بالكامل.</>
              )}
            </p>
            <div className="mt-8 pt-8 border-t border-border/30">
              <p className="text-primary font-mono text-sm tracking-wider flex items-center gap-2">
                <span dir="ltr" className="inline-block">&gt;</span>
                <span>
                  {language === 'en' 
                    ? 'We transition predictive diagnostics to the microsecond level.'
                    : 'ننقل التشخيصات التنبؤية إلى مستوى الميكروثانية الفائق.'
                  }
                </span>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}