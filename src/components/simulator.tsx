import { useState, useEffect, useRef } from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const NUM_POINTS = 100;

function generatePath(points: number[], width: number, height: number, yRange: number) {
  if (!points.length) return '';
  const xStep = width / (NUM_POINTS - 1);
  return points
    .map((p, i) => {
      const x = i * xStep;
      const y = height - ((p + yRange) / (yRange * 2)) * height;
      return `${x},${y}`;
    })
    .join(' ');
}

export function Simulator() {
  const { ref, isVisible } = useReveal();
  const [isFault, setIsFault] = useState(false);
  const [kinData, setKinData] = useState<number[]>(Array(NUM_POINTS).fill(0));
  const [acoData, setAcoData] = useState<number[]>(Array(NUM_POINTS).fill(0));
  const [magData, setMagData] = useState<number[]>(Array(NUM_POINTS).fill(0));
  
  const frameRef = useRef(0);
  const isFaultRef = useRef(isFault);
  isFaultRef.current = isFault;

  useEffect(() => {
    let animationId: number;

    setKinData(Array.from({length: NUM_POINTS}, (_, i) => Math.sin(i * 0.1) * 20));
    setAcoData(Array.from({length: NUM_POINTS}, () => Math.random() * 20 - 10));
    setMagData(Array.from({length: NUM_POINTS}, (_, i) => Math.sin(i * 0.2) * 40));

    const tick = () => {
      frameRef.current += 1;
      const t = frameRef.current;
      const isFaultNow = isFaultRef.current;

      setKinData(prev => {
        const next = prev.slice(1);
        let val = Math.sin(t * 0.1) * 20 + (Math.random() * 10 - 5);
        if (isFaultNow) {
          val = Math.sin(t * 0.1) * 80 + (Math.random() * 20 - 10);
        }
        next.push(val);
        return next;
      });

      setAcoData(prev => {
        const next = prev.slice(1);
        let val = Math.random() * 20 - 10;
        if (isFaultNow) {
          val = (t % 12 < 2) ? 80 + Math.random() * 20 : Math.random() * 40 - 20;
        }
        next.push(val);
        return next;
      });

      setMagData(prev => {
        const next = prev.slice(1);
        let val = Math.sin(t * 0.2) * 40;
        if (isFaultNow) {
          val = Math.sin(t * 0.2) * 40 + Math.sin(t * 0.7) * 60;
        }
        next.push(val);
        return next;
      });

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className={`py-32 md:py-48 relative transition-colors duration-500 border-b border-border/30 ${isFault ? 'bg-destructive/5' : 'bg-background'}`}>
      <div className="container mx-auto px-6">
        <div ref={ref} className={`max-w-6xl mx-auto ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
            <div>
              <h2 className="text-sm font-mono tracking-widest mb-4 border-s-2 ps-4 transition-colors duration-300 flex items-center gap-3" style={{
                borderColor: isFault ? 'hsl(var(--destructive))' : 'hsl(var(--primary))',
                color: isFault ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'
              }}>
                <div className={`w-2 h-2 rounded-full ${isFault ? 'bg-destructive' : 'bg-primary'} animate-pulse-fast`} />
                <span dir="ltr">LIVE_TELEMETRY // ESP32_STREAM</span>
              </h2>
              <h3 className="text-4xl md:text-5xl font-sans font-bold text-foreground">محاكي أعطال المحرك اللحظي</h3>
            </div>
            
            <div className="flex gap-4">
              {!isFault ? (
                <button 
                  onClick={() => setIsFault(true)}
                  className="px-6 py-4 font-mono text-sm md:text-base border bg-destructive/5 border-destructive/50 text-destructive hover:bg-destructive/20 hover:border-destructive glow-border-destructive transition-all flex items-center gap-3 cursor-pointer"
                >
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  حقن خلل مغناطيسي مفاجئ (تجربة الفصل الحتمي)
                </button>
              ) : (
                <button 
                  onClick={() => setIsFault(false)}
                  className="px-6 py-4 font-mono text-sm md:text-base border bg-primary/10 border-primary/50 text-primary hover:bg-primary/20 hover:border-primary glow-border transition-all flex items-center gap-3 cursor-pointer"
                >
                  <RefreshCw className="w-5 h-5 shrink-0" />
                  إعادة التعيين إلى التشغيل الطبيعي
                </button>
              )}
            </div>
          </div>

          <div className={`border-2 p-1 md:p-2 mb-12 transition-colors duration-300 relative ${isFault ? 'border-destructive glow-border-destructive' : 'border-border bg-card'}`}>
            
            {isFault && (
              <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div className="bg-destructive text-destructive-foreground font-bold font-sans text-xl md:text-4xl px-8 py-6 border-4 border-black animate-pulse shadow-2xl text-center">
                  خطر حرج: تم عزل المحرك ميكانيكياً في أقل من 5 ملي ثانية
                </div>
              </div>
            )}
            
            <div className={`bg-black p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 relative overflow-hidden ${isFault ? 'animate-glitch' : ''}`}>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              
              {/* Kinetic */}
              <div className="border border-border bg-background/50 p-5 relative z-10" dir="ltr">
                <div className="flex justify-between items-center font-mono text-xs mb-6">
                  <span className="text-muted-foreground">KINETIC [MPU6050]</span>
                  <span className={isFault ? "text-destructive font-bold animate-pulse" : "text-primary"}>
                    {isFault ? "ERR_UNBALANCE" : "NOMINAL"}
                  </span>
                </div>
                <div className="h-40 w-full border border-border bg-black/80 shadow-inner">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline 
                      points={generatePath(kinData, 100, 100, 100)} 
                      fill="none" 
                      stroke={isFault ? "hsl(var(--destructive))" : "hsl(var(--primary))"} 
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      className="transition-colors duration-300"
                    />
                  </svg>
                </div>
                <div className="mt-4 font-mono text-[10px] text-muted-foreground flex justify-between tracking-wider">
                  <span>1X FUNDAMENTAL</span>
                  <span>±100 mg</span>
                </div>
              </div>

              {/* Acoustic */}
              <div className="border border-border bg-background/50 p-5 relative z-10" dir="ltr">
                <div className="flex justify-between items-center font-mono text-xs mb-6">
                  <span className="text-muted-foreground">ACOUSTIC [INMP441]</span>
                  <span className={isFault ? "text-destructive font-bold animate-pulse" : "text-primary"}>
                    {isFault ? "ERR_LUBRICATION" : "NOMINAL"}
                  </span>
                </div>
                <div className="h-40 w-full border border-border bg-black/80 shadow-inner">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline 
                      points={generatePath(acoData, 100, 100, 100)} 
                      fill="none" 
                      stroke={isFault ? "hsl(var(--destructive))" : "hsl(var(--primary))"} 
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      className="transition-colors duration-300"
                    />
                  </svg>
                </div>
                <div className="mt-4 font-mono text-[10px] text-muted-foreground flex justify-between tracking-wider">
                  <span>ULTRASONIC BPFO</span>
                  <span>40 kHz</span>
                </div>
              </div>

              {/* Magnetic */}
              <div className="border border-border bg-background/50 p-5 relative z-10" dir="ltr">
                <div className="flex justify-between items-center font-mono text-xs mb-6">
                  <span className="text-muted-foreground">MAG_FLUX [A3144]</span>
                  <span className={isFault ? "text-destructive font-bold animate-pulse" : "text-primary"}>
                    {isFault ? "ERR_SHORT" : "NOMINAL"}
                  </span>
                </div>
                <div className="h-40 w-full border border-border bg-black/80 shadow-inner">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline 
                      points={generatePath(magData, 100, 100, 100)} 
                      fill="none" 
                      stroke={isFault ? "hsl(var(--destructive))" : "hsl(var(--primary))"} 
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      className="transition-colors duration-300"
                    />
                  </svg>
                </div>
                <div className="mt-4 font-mono text-[10px] text-muted-foreground flex justify-between tracking-wider">
                  <span>STRAY FIELD</span>
                  <span>±50 G</span>
                </div>
              </div>

            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 font-mono text-xs text-muted-foreground" dir="ltr">
            <div className={`border p-3 md:p-4 flex flex-col justify-between h-20 transition-colors ${isFault ? 'border-destructive/30 bg-destructive/5' : 'border-border bg-card/50'}`}>
              <span className="opacity-70">LATENCY (FAULT TO CUT)</span>
              <span className={`text-lg md:text-xl font-bold ${isFault ? "text-destructive" : "text-foreground"}`}>2.4 ms</span>
            </div>
            <div className="border border-border bg-card/50 p-3 md:p-4 flex flex-col justify-between h-20">
              <span className="opacity-70">SRAM_USAGE</span>
              <span className="text-lg md:text-xl font-bold text-foreground">18.4 KB</span>
            </div>
            <div className="border border-border bg-card/50 p-3 md:p-4 flex flex-col justify-between h-20">
              <span className="opacity-70">CLASSIFIER</span>
              <span className="text-lg md:text-xl font-bold text-primary">K-MEANS [STREAM]</span>
            </div>
            <div className="border border-border bg-card/50 p-3 md:p-4 flex flex-col justify-between h-20">
              <span className="opacity-70">MCU CLOCK</span>
              <span className="text-lg md:text-xl font-bold text-foreground">240 MHz</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}