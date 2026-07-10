import { useReveal } from '@/hooks/use-reveal';
import { Cpu, Server, Network } from 'lucide-react';

export function Intelligence() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="py-32 md:py-48 border-b border-border/30 bg-black relative">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 items-center ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
          
          <div>
            <h2 className="text-sm font-mono text-primary tracking-widest mb-4 border-s-2 border-primary ps-4">
              المعالجة // على_الجهاز
            </h2>
            <h3 className="text-4xl md:text-5xl font-sans font-bold mb-8 text-foreground">
              تكيّف مستمر دون سحابة
            </h3>
            
            <p className="text-muted-foreground text-xl mb-10 leading-relaxed font-sans">
              تكلف الرحلات السحابية أجزاء من الثانية ثمينة وتتطلب استقراراً في الشبكة. لقد تخلصنا منها. 
              كتلة التجميع التدريجي المستمر (<strong className="text-foreground" dir="ltr">Streaming Incremental K-Means</strong>) الخاصة بنا تعمل بالكامل داخل ذاكرة <span dir="ltr">SRAM</span> النشطة.
            </p>
            
            <ul className="space-y-6 font-mono text-sm md:text-base text-muted-foreground">
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 p-1 border border-primary/30 bg-primary/10">
                  <Network className="w-4 h-4 text-primary" />
                </div>
                <span>تطور مستمر للنموذج دون إعادة تدريب كاملة. يتكيف مع التآكل الميكانيكي على مدار سنوات من التشغيل.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 p-1 border border-primary/30 bg-primary/10">
                  <Server className="w-4 h-4 text-primary" />
                </div>
                <span>أمان تام بفضل التصميم المعزول. يحمي البنية التحتية الصناعية الحرجة من اختراقات الشبكة.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 p-1 border border-primary/30 bg-primary/10">
                  <Cpu className="w-4 h-4 text-primary" />
                </div>
                <span>بصمة ذاكرة ثابتة <span dir="ltr">O(1)</span> عبر تحديثات النقاط المركزية المتكررة. لا تنفد ذاكرة <span dir="ltr">SRAM</span> أبداً.</span>
              </li>
            </ul>
          </div>
          
          <div className="relative aspect-square md:aspect-video xl:aspect-square bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.06)_0%,transparent_70%)] border border-border flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(135,255,135,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(135,255,135,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
            
            <div className="absolute top-0 right-0 w-full h-[2px] bg-primary/50 shadow-[0_0_10px_hsl(var(--primary))] animate-crt-scan z-20 pointer-events-none" />
            
            <div className="relative z-10 w-4/5 h-4/5 border border-primary/30 bg-black/80 backdrop-blur-md p-8 flex flex-col justify-between" dir="ltr">
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-fast" />
                  <span className="font-mono text-xs text-primary">SRAM_ALLOCATION // ESP32</span>
                </div>
                <Cpu className="w-6 h-6 text-primary/50 group-hover:text-primary transition-colors duration-500" />
              </div>
              
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex-1 border border-border bg-black flex flex-col justify-center px-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  <div className="w-full flex justify-between items-center text-xs md:text-sm font-mono relative z-10">
                    <span className="text-muted-foreground">TENSOR_STREAM IN</span>
                    <span className="text-primary animate-pulse">0x8F9A...</span>
                  </div>
                </div>
                
                <div className="flex-[1.5] border border-primary/50 bg-primary/5 flex flex-col justify-center px-6 relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,255,65,0.05)]">
                  <div className="absolute inset-0 bg-primary/10 animate-pulse-fast" />
                  <div className="w-full flex justify-between items-center text-xs md:text-sm font-mono relative z-10">
                    <span className="text-primary font-bold">CENTROID_UPDATE (K-MEANS)</span>
                    <span className="text-foreground bg-primary/20 px-2 py-1 border border-primary/30">ACTIVE</span>
                  </div>
                  <div className="w-full mt-2 h-1 bg-black border border-primary/30 overflow-hidden relative z-10">
                    <div className="h-full bg-primary w-2/3 animate-[pulse_2s_infinite]" />
                  </div>
                </div>
                
                <div className="flex-1 border border-border bg-black flex flex-col justify-center px-6">
                  <div className="w-full flex justify-between items-center text-xs md:text-sm font-mono">
                    <span className="text-muted-foreground">ANOMALY_THRESHOLD</span>
                    <span className="text-muted-foreground bg-white/5 px-2 py-1 border border-border">STATIC_REF</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}