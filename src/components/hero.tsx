import { useReveal } from '@/hooks/use-reveal';
import { Activity, ShieldAlert, Zap } from 'lucide-react';

export function Hero() {
  const { ref, isVisible } = useReveal();
  
  return (
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden border-b border-border/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,65,0.08)_0%,transparent_70%)]" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={ref} 
          className={`max-w-4xl ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
        >
          <div className="flex items-center gap-4 mb-8 text-primary font-mono text-xs md:text-sm tracking-wider">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse-fast shadow-[0_0_8px_hsl(var(--primary))]" />
            <span dir="ltr">STATUS: ACTIVE // BARE-METAL ESP32 PROGNOSTICS</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-sans tracking-tight mb-8 text-foreground glow-text leading-[1.2]">
            كسر قالب الحماية<br />التقليدية.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-3xl leading-relaxed mb-12">
            الانتقال من انتظار احتراق ملفات المحرك إلى التشخيص اللحظي لأعطال الأجهزة في نطاق الميكروثانية باستخدام دمج متعدد الفيزياء يعمل بالكامل على متحكم <span dir="ltr" className="font-mono">ESP32</span>.
          </p>
          
          <div className="flex flex-wrap gap-4 font-mono text-sm">
            <div className="flex items-center gap-3 border border-primary/30 bg-primary/5 px-4 py-3 shadow-[inset_0_0_20px_rgba(0,255,65,0.05)]">
              <Zap className="text-primary w-5 h-5" />
              <span className="text-foreground">بدون خوادم سحابية</span>
            </div>
            <div className="flex items-center gap-3 border border-primary/30 bg-primary/5 px-4 py-3 shadow-[inset_0_0_20px_rgba(0,255,65,0.05)]">
              <Activity className="text-primary w-5 h-5" />
              <span className="text-foreground">دمج متعدد الفيزياء</span>
            </div>
            <div className="flex items-center gap-3 border border-primary/30 bg-primary/5 px-4 py-3 shadow-[inset_0_0_20px_rgba(0,255,65,0.05)]">
              <ShieldAlert className="text-primary w-5 h-5 animate-pulse-fast" />
              <span className="text-foreground font-bold">عزل في أقل من 5 ملي ثانية</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}