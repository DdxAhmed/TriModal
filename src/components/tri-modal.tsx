import { useReveal } from '@/hooks/use-reveal';
import { Waves, Activity, Magnet } from 'lucide-react';

export function TriModal() {
  const { ref, isVisible } = useReveal();

  const modalities = [
    {
      title: "البُعد الحركي والميكانيكي",
      sensor: "MPU6050",
      icon: <Activity className="w-10 h-10 text-primary" />,
      desc: "اكتشاف عدم اتزان الدوار وعدم المحاذاة باستخدام التردد الأساسي (1X) وقوى الطرد المركزي.",
      math: "F_c = m · ω² · r"
    },
    {
      title: "البُعد الصوتي والمجهري",
      sensor: "INMP441",
      icon: <Waves className="w-10 h-10 text-primary" />,
      desc: "اكتشاف التدهور المبكر للمحامل وفشل التزييت عبر نقرات الاحتكاك فوق الصوتية باستخدام بروتوكول الصوت الرقمي I²S.",
      math: "f_BPFO = (n/2) · (f_r) · [1 - (d/D)cosα]"
    },
    {
      title: "البُعد الكهرومغناطيسي",
      sensor: "A3144 Hall",
      icon: <Magnet className="w-10 h-10 text-primary" />,
      desc: "اكتشاف القصر الداخلي للملفات الذي يشوه مجال التدفق المغناطيسي الشارد، يقاس بأمان دون قطع الأسلاك باستخدام الممانعة المغناطيسية.",
      math: "ℜ = g / (μ·A)"
    }
  ];

  return (
    <section className="py-32 md:py-48 border-b border-border/30 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_100%_50%,rgba(0,255,65,0.03)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24">
          <h2 className="text-sm font-mono text-primary tracking-widest mb-4 border-s-2 border-primary ps-4">
            بنية_النظام // دمج_المستشعرات
          </h2>
          <h3 className="text-4xl md:text-5xl font-sans font-bold text-foreground">الاستشعار النشط ثلاثي الأبعاد</h3>
        </div>
        
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
          {modalities.map((mod, i) => (
            <div 
              key={i}
              className="group relative border border-border bg-card/30 backdrop-blur-sm p-8 hover:bg-black transition-all duration-500 hover:border-primary/60 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-primary/0 to-transparent group-hover:via-primary group-hover:shadow-[0_0_15px_hsl(var(--primary))] transition-all duration-700" />
              
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm group-hover:bg-primary/20 transition-colors">
                  {mod.icon}
                </div>
                <span className="font-mono text-xs text-muted-foreground border border-border px-3 py-1.5 bg-black" dir="ltr">
                  {mod.sensor}
                </span>
              </div>
              
              <h4 className="text-2xl font-bold mb-4 font-sans text-foreground">{mod.title}</h4>
              <p className="text-muted-foreground mb-12 text-base leading-relaxed min-h-[5rem]">
                {mod.desc}
              </p>
              
              <div className="pt-6 border-t border-border/50 group-hover:border-primary/30 transition-colors">
                <span className="font-mono text-[10px] text-primary/70 block mb-3 tracking-widest">معادلة النطاق</span>
                <code className="font-mono text-sm md:text-base text-foreground bg-black px-4 py-3 border border-border block group-hover:border-primary/50 group-hover:text-primary transition-colors shadow-inner" dir="ltr">
                  {mod.math}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}