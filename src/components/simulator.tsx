import { useState, useEffect, useRef } from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { useLanguage } from '@/hooks/use-language';
import { AlertTriangle, RefreshCw, ShieldAlert, CheckCircle2 } from 'lucide-react';

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
  const { language, t } = useLanguage();
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
      const tNum = frameRef.current;
      const isFaultNow = isFaultRef.current;

      setKinData(prev => {
        const next = prev.slice(1);
        let val = Math.sin(tNum * 0.1) * 15 + (Math.random() * 8 - 4);
        if (isFaultNow) {
          // Centrifugal instability (high amplitude chaotic wobble)
          val = Math.sin(tNum * 0.25) * 75 + (Math.random() * 25 - 12.5);
        }
        next.push(val);
        return next;
      });

      setAcoData(prev => {
        const next = prev.slice(1);
        let val = Math.random() * 16 - 8;
        if (isFaultNow) {
          // Ball pass frequency outer outer-race clicks
          val = (tNum % 8 < 2) ? 75 + Math.random() * 15 : Math.random() * 30 - 15;
        }
        next.push(val);
        return next;
      });

      setMagData(prev => {
        const next = prev.slice(1);
        let val = Math.sin(tNum * 0.15) * 35;
        if (isFaultNow) {
          // Airgap deformation (high harmonic distortion)
          val = Math.sin(tNum * 0.15) * 35 + Math.sin(tNum * 0.6) * 55;
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
    <section 
      id="simulator-heading" 
      className={`py-24 md:py-36 relative transition-colors duration-500 border-b border-border/30 ${
        isFault ? 'bg-destructive/5' : 'bg-background'
      }`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-25" />

      <div className="container mx-auto px-6">
        <div ref={ref} className={`max-w-6xl mx-auto ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
          
          {/* Header Dashboard section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`flex h-2.5 w-2.5 rounded-full ${isFault ? 'bg-destructive animate-ping' : 'bg-primary animate-pulse'} shadow-[0_0_8px_currentColor]`} />
                <span className={`font-mono text-xs tracking-widest ${isFault ? 'text-destructive font-bold' : 'text-primary'}`}>
                  {isFault 
                    ? (language === 'en' ? 'ALARM: TRIP_INTERRUPT_ACTIVE' : 'إنذار: مقاطعة الفصل الفوري نشطة')
                    : t('sim_tag')
                  }
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-foreground">
                {t('sim_title')}
              </h2>
              <p className="text-muted-foreground text-xs font-mono">
                {language === 'en' 
                  ? 'Interactive predictive protection test bench'
                  : 'منصة اختبار تفاعلية متقدمة لتقييم حماية المحرك التنبؤية'
                }
              </p>
            </div>
            
            <div className="flex gap-4">
              {!isFault ? (
                <button 
                  onClick={() => setIsFault(true)}
                  className="px-6 py-4 font-mono text-xs md:text-sm border bg-destructive/5 border-destructive/50 text-destructive hover:bg-destructive/15 hover:border-destructive hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-300 flex items-center gap-3 cursor-pointer rounded-md uppercase tracking-wider font-bold"
                >
                  <AlertTriangle className="w-4 h-4 animate-bounce" />
                  <span>{t('sim_btn_inject')}</span>
                </button>
              ) : (
                <button 
                  onClick={() => setIsFault(false)}
                  className="px-6 py-4 font-mono text-xs md:text-sm border bg-primary/10 border-primary/50 text-primary hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all duration-300 flex items-center gap-3 cursor-pointer rounded-md uppercase tracking-wider font-bold"
                >
                  <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>{t('sim_btn_reset')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Simulator Telemetry Board */}
          <div className={`p-1.5 md:p-3 mb-12 transition-all duration-500 relative rounded-2xl ${
            isFault 
              ? 'border border-destructive bg-destructive/10 shadow-[0_0_40px_rgba(239,68,68,0.15)]' 
              : 'glass-card hover-lift'
          }`}>
            
            {/* Alarm Overlay on Trip */}
            {isFault && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/85 backdrop-blur-xs rounded-2xl border border-destructive/40 animate-reveal-up p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div className="max-w-md text-center space-y-4 border border-destructive/50 bg-destructive/10 p-8 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <ShieldAlert className="w-16 h-16 text-destructive mx-auto animate-pulse" />
                  <h3 className="text-xl md:text-2xl font-mono font-bold text-destructive tracking-widest uppercase">
                    {t('sim_trip_sent')}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    {t('sim_trip_desc')}
                  </p>
                  <div className="border border-destructive/30 bg-black/90 p-4 rounded text-left font-mono text-[10px] space-y-2 text-destructive/80" dir="ltr">
                    <div className="flex justify-between">
                      <span>• LATENCY:</span>
                      <span className="text-foreground font-bold">1.84 milliseconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• ANOMALY SCORE:</span>
                      <span className="text-foreground font-bold">18.42 σ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• RELAY STATE:</span>
                      <span className="text-foreground font-bold">OPEN (DE-ENERGIZED)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsFault(false)}
                    className="w-full py-2.5 font-mono text-xs font-bold border border-primary/50 text-primary bg-primary/10 hover:bg-primary/20 transition-all rounded cursor-pointer"
                  >
                    {language === 'en' ? 'DISMISS & RESET OVERRIDE' : 'تجاهل وإعادة تشغيل النظام'}
                  </button>
                </div>
              </div>
            )}
            
            {/* Main grid panels */}
            <div className={`p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 relative overflow-hidden ${
              isFault ? 'animate-glitch opacity-30' : ''
            }`} dir="ltr">
              <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />
              
              {/* Kinetic Modality Panel */}
              <div className="border border-border/40 bg-black/60 p-5 rounded-xl relative z-10 shadow-inner flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center font-mono text-[10px] mb-6">
                    <span className="text-muted-foreground uppercase">CH_01: Kinetic (vibe)</span>
                    <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${
                      isFault 
                        ? "border-destructive text-destructive bg-destructive/10 animate-pulse" 
                        : "border-primary text-primary bg-primary/5"
                    }`}>
                      {isFault ? (language === 'en' ? "ANOMALY // OUT_OF_BOUNDS" : "خلل // خارج الحدود") : (language === 'en' ? "NOMINAL" : "طبيعي")}
                    </span>
                  </div>
                  
                  <div className="h-36 w-full border border-border/20 bg-black rounded-lg relative overflow-hidden flex items-end">
                    <div className="absolute inset-0 tech-grid opacity-5" />
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
                </div>

                <div className="mt-6 pt-4 border-t border-border/20 font-mono text-[9px] text-muted-foreground flex justify-between tracking-wider">
                  <span>FUNDAMENTAL F: 1X</span>
                  <span className="text-foreground">MAX PEAK: ±80mg</span>
                </div>
              </div>

              {/* Acoustic Modality Panel */}
              <div className="border border-border/40 bg-black/60 p-5 rounded-xl relative z-10 shadow-inner flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center font-mono text-[10px] mb-6">
                    <span className="text-muted-foreground uppercase">CH_02: Acoustic (clicks)</span>
                    <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${
                      isFault 
                        ? "border-destructive text-destructive bg-destructive/10 animate-pulse" 
                        : "border-primary text-cyan bg-cyan/5"
                    }`}>
                      {isFault ? (language === 'en' ? "WARNING // IMPACT_PEAKS" : "تحذير // ذروة موجية") : (language === 'en' ? "NOMINAL" : "طبيعي")}
                    </span>
                  </div>
                  
                  <div className="h-36 w-full border border-border/20 bg-black rounded-lg relative overflow-hidden flex items-end">
                    <div className="absolute inset-0 tech-grid opacity-5" />
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polyline 
                        points={generatePath(acoData, 100, 100, 100)} 
                        fill="none" 
                        stroke={isFault ? "hsl(var(--destructive))" : "hsl(var(--cyan))"} 
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        className="transition-colors duration-300"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/20 font-mono text-[9px] text-muted-foreground flex justify-between tracking-wider">
                  <span>SPECTRUM: 16.0kHz</span>
                  <span className="text-foreground">BANDWIDTH: BPFO</span>
                </div>
              </div>

              {/* Magnetic Modality Panel */}
              <div className="border border-border/40 bg-black/60 p-5 rounded-xl relative z-10 shadow-inner flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center font-mono text-[10px] mb-6">
                    <span className="text-muted-foreground uppercase">CH_03: Stray Flux (reluctance)</span>
                    <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${
                      isFault 
                        ? "border-destructive text-destructive bg-destructive/10 animate-pulse" 
                        : "border-primary text-amber bg-amber/5"
                    }`}>
                      {isFault ? (language === 'en' ? "CRITICAL // HARMONIC_DIST" : "حرج // تشوه توافقي") : (language === 'en' ? "NOMINAL" : "طبيعي")}
                    </span>
                  </div>
                  
                  <div className="h-36 w-full border border-border/20 bg-black rounded-lg relative overflow-hidden flex items-end">
                    <div className="absolute inset-0 tech-grid opacity-5" />
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polyline 
                        points={generatePath(magData, 100, 100, 100)} 
                        fill="none" 
                        stroke={isFault ? "hsl(var(--destructive))" : "hsl(var(--amber))"} 
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        className="transition-colors duration-300"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/20 font-mono text-[9px] text-muted-foreground flex justify-between tracking-wider">
                  <span>COIL REF: STATED</span>
                  <span className="text-foreground">DAMPING: NOMINAL</span>
                </div>
              </div>

            </div>
          </div>
          
          {/* Dashboard Summary Readouts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 font-mono text-xs text-muted-foreground">
            <div className={`border p-4 flex flex-col justify-between h-24 rounded-xl transition-all duration-300 ${
              isFault 
                ? 'border-destructive/40 bg-destructive/5 text-destructive' 
                : 'border-border/60 bg-card/30 hover:border-primary/30'
            }`}>
              <span className="text-[10px] tracking-wider uppercase opacity-75">
                {language === 'en' ? 'ADC Interrupt Latency' : 'زمن استجابة مقاطعة الـ ADC'}
              </span>
              <span className="text-2xl font-bold text-foreground">1.8 ms</span>
            </div>
            
            <div className="border border-border/60 bg-card/30 p-4 flex flex-col justify-between h-24 rounded-xl hover:border-primary/30 transition-all">
              <span className="text-[10px] tracking-wider uppercase opacity-75">
                {language === 'en' ? 'TinyML RAM Overhead' : 'استهلاك ذاكرة RAM للمحرك'}
              </span>
              <span className="text-2xl font-bold text-cyan">2.0 KB</span>
            </div>

            <div className="border border-border/60 bg-card/30 p-4 flex flex-col justify-between h-24 rounded-xl hover:border-primary/30 transition-all">
              <span className="text-[10px] tracking-wider uppercase opacity-75">
                {language === 'en' ? 'Centroid Threshold' : 'حد انحراف متجه الكلاستر'}
              </span>
              <span className="text-2xl font-bold text-amber">4.2 σ</span>
            </div>

            <div className="border border-border/60 bg-card/30 p-4 flex flex-col justify-between h-24 rounded-xl hover:border-primary/30 transition-all">
              <span className="text-[10px] tracking-wider uppercase opacity-75">
                {language === 'en' ? 'SRAM Safe Sandboxing' : 'حظر وعزل ذاكرة SRAM'}
              </span>
              <span className="text-2xl font-bold text-primary flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span>{language === 'en' ? 'SECURE' : 'آمن'}</span>
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}