import { useState, useEffect } from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { useLanguage } from '@/hooks/use-language';
import { Cpu, Zap, Signal, Activity, ShieldCheck, Info } from 'lucide-react';

export function Intelligence() {
  const { ref, isVisible } = useReveal();
  const { language, t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [scatterPoints, setScatterPoints] = useState<{x: number, y: number, cluster: number}[]>([]);
  const [liveDot, setLiveDot] = useState({ x: 120, y: 110, distance: 12.5, isAnomaly: false });

  // Generate mock K-Means clustering scatter points
  useEffect(() => {
    const points = [];
    // Cluster 0 (Nominal Vibration)
    for (let i = 0; i < 15; i++) {
      points.push({
        x: 80 + Math.random() * 40,
        y: 80 + Math.random() * 40,
        cluster: 0
      });
    }
    // Cluster 1 (Bearing Friction)
    for (let i = 0; i < 15; i++) {
      points.push({
        x: 220 + Math.random() * 40,
        y: 70 + Math.random() * 40,
        cluster: 1
      });
    }
    setScatterPoints(points);
  }, []);

  // Animate the live diagnostic vector moving in 2D space
  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.05;
      
      // If we are showing nominal (steps 1-3), live dot circles cluster 0
      // If step 4 (anomaly detection) or 5 (trip), let's simulate a fault shift
      if (activeStep < 3) {
        const dx = 100 + Math.sin(angle) * 15;
        const dy = 100 + Math.cos(angle * 1.5) * 15;
        setLiveDot({
          x: dx,
          y: dy,
          distance: parseFloat((Math.sqrt(Math.pow(dx - 100, 2) + Math.pow(dy - 100, 2)) / 5).toFixed(2)),
          isAnomaly: false
        });
      } else if (activeStep === 3) {
        // Move towards anomalous cluster 1
        const dx = 180 + Math.sin(angle * 0.5) * 40;
        const dy = 130 + Math.cos(angle * 0.8) * 30;
        const distToCluster0 = Math.sqrt(Math.pow(dx - 100, 2) + Math.pow(dy - 100, 2));
        const distToCluster1 = Math.sqrt(Math.pow(dx - 240, 2) + Math.pow(dy - 90, 2));
        const minDistance = Math.min(distToCluster0, distToCluster1) / 5;
        
        setLiveDot({
          x: dx,
          y: dy,
          distance: parseFloat(minDistance.toFixed(2)),
          isAnomaly: dx > 150
        });
      } else {
        // Step 5: Critical Outlier Trip state
        const dx = 290 + Math.sin(angle * 0.2) * 20;
        const dy = 210 + Math.cos(angle * 0.2) * 20;
        setLiveDot({
          x: dx,
          y: dy,
          distance: parseFloat((Math.sqrt(Math.pow(dx - 100, 2) + Math.pow(dy - 100, 2)) / 5).toFixed(2)),
          isAnomaly: true
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [activeStep]);

  const pipelineSteps = [
    {
      title: language === 'en' ? "Real-Time Sensor Sampling" : "أخذ عينات المستشعرات اللحظية",
      subtitle: language === 'en' ? "HIGH-FREQUENCY MULTI-BUS ISR" : "مقاطعة عالية التردد عبر النواقل",
      icon: <Signal className="w-5 h-5 text-primary" aria-hidden="true" />,
      desc: language === 'en' 
        ? "Hardware interrupts collect continuous streams from the sensors. Digital MEMS microphone data arrives on I2S at 16kHz, while the accelerometer coordinates sync via high-speed 400kHz I2C."
        : "تجمع مقاطعات العتاد المباشر تدفقات مستمرة من المستشعرات. تصل بيانات ميكروفون MEMS الرقمي عبر منفذ I2S بتردد 16 كيلوهرتز، بينما تتم مزامنة مستشعر التسارع عبر I2C بسرعة 400 كيلوهرتز.",
      telemetry: "BUFFER_SIZE: 512 samples // SAMPLING_OK"
    },
    {
      title: language === 'en' ? "Digital Signal Filtering (DSP)" : "تصفية الإشارات الرقمية (DSP)",
      subtitle: language === 'en' ? "RADIX-4 FFT SPECTRAL RESOLUTION" : "تحليل طيف التردد بنظام Radix-4 FFT",
      icon: <Activity className="w-5 h-5 text-cyan" aria-hidden="true" />,
      desc: language === 'en'
        ? "Raw signals go through Hanning windowing to eliminate edge distortions. A hard-coded Radix-4 Fast Fourier Transform (FFT) converts time-domain waves to 256 frequency bins in 0.85 milliseconds."
        : "تمر الإشارات الخام بنافذة Hanning لإزالة تشوهات الحواف. يقوم تحويل فورير السريع (FFT) المدمج بتحويل الموجات الزمنية إلى 256 حزمة ترددية في غضون 0.85 ملي ثانية.",
      telemetry: "FFT_LATENCY: 852 µs // BIN_COUNT: 256"
    },
    {
      title: language === 'en' ? "High-Yield Feature Extraction" : "استخراج الميزات المتقدمة",
      subtitle: language === 'en' ? "DIMENSIONALITY REDUCTION" : "ضغط وتقليل أبعاد المتجهات",
      icon: <Cpu className="w-5 h-5 text-indigo-400" aria-hidden="true" />,
      desc: language === 'en'
        ? "Calculates critical statistical parameters: Root Mean Square (RMS) for energy, Crest Factor for spikes, and Kurtosis for bearing shocks. Condenses 512 raw points into a simple 3D vector."
        : "يتم حساب المحددات الإحصائية الهامة: الجذر المتوسط المربع (RMS) لقياس الطاقة، وعامل القمة (Crest Factor) للارتفاعات الحادة، والتفرطح (Kurtosis) لصدمات المحامل. يختزل 512 نقطة خام في متجه ثلاثي الأبعاد بسيط.",
      telemetry: "VECTOR_3D: [RMS, CREST_F, KURTOSIS]"
    },
    {
      title: language === 'en' ? "TinyML Clustering & Inference" : "استدلال وتصنيف TinyML المحلي",
      subtitle: language === 'en' ? "STREAMING INCREMENTAL K-MEANS" : "خوارزمية K-Means التدريجية المتدفقة",
      icon: <Zap className="w-5 h-5 text-amber" aria-hidden="true" />,
      desc: language === 'en'
        ? "Computes the Euclidean distance between the live vector and nominal centroids in active SRAM. Avoids high-latency deep learning models, utilizing only 2KB of RAM with O(K * D) complexity."
        : "تحسب المسافة الإقليدية بين المتجه المباشر والمراكز الطبيعية في ذاكرة SRAM النشطة. تتجنب النماذج العميقة بطيئة الاستجابة، وتستهلك 2 كيلوبايت فقط من الذاكرة العشوائية.",
      telemetry: "CENTROIDS: 2 // ANOMALY_SCORE: "
    },
    {
      title: language === 'en' ? "Direct Hardware Trip Interrupt" : "مقاطعة عتادية مباشرة للفصل الفوري",
      subtitle: language === 'en' ? "SOLID-STATE TRIP ACTION < 5ms" : "ريلاي الحالة الصلبة في أقل من 5 ملي ثانية",
      icon: <ShieldCheck className="w-5 h-5 text-red-500" aria-hidden="true" />,
      desc: language === 'en'
        ? "If the Euclidean distance exceeds the safety boundary for 3 consecutive frames, Core 0 fires a direct GPIO hardware interrupt. A physical solid-state relay cuts motor power under 5ms."
        : "إذا تجاوزت المسافة الإقليدية حدود الأمان لثلاث إطارات متتالية، تطلق النواة 0 مقاطعة GPIO عتادية مباشرة. يقطع ريلاي الحالة الصلبة الفيزيائي طاقة المحرك في أقل من 5 ملي ثانية.",
      telemetry: "ACTUATOR_PIN: GPIO_04 // TRIP_COMMAND: "
    }
  ];

  return (
    <section className="py-24 md:py-36 border-b border-border/30 bg-background relative overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'} aria-labelledby="intelligence-heading">
      {/* Background visual components */}
      <div className="absolute inset-0 tech-grid-cyan pointer-events-none opacity-20" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[radial-gradient(circle_at_0%_100%,rgba(0,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-20">
          <span className="text-sm font-mono text-cyan tracking-widest mb-4 border-s-2 border-cyan ps-4 block">
            {t('intel_tag')}
          </span>
          <h2 id="intelligence-heading" className="text-4xl md:text-5xl font-sans font-bold text-foreground">
            {t('intel_title')}
          </h2>
          <p className="text-muted-foreground mt-4 text-lg font-sans leading-relaxed">
            {t('intel_desc')}
          </p>
        </div>

        {/* Diagnostic Dashboard grid */}
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>
          
          {/* Left Column: Flow Stepper */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase mb-2">
              {language === 'en' ? 'Pipeline Stages (Select to view active telemetry)' : 'مراحل خط معالجة البيانات (اضغط لعرض القياسات)'}
            </span>
            
            {pipelineSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`text-start border p-5 rounded-xl transition-all duration-300 flex items-start gap-4 cursor-pointer group ${
                  activeStep === idx
                    ? 'border-cyan bg-cyan/5 shadow-[0_0_15px_rgba(6,182,212,0.1),inset_0_0_10px_rgba(6,182,212,0.05)]'
                    : 'border-border/60 bg-card/20 hover:border-border hover:bg-card/45'
                }`}
              >
                <div className={`p-2 border rounded-md transition-colors ${
                  activeStep === idx 
                    ? 'border-cyan bg-cyan/10' 
                    : 'border-border bg-black/40 text-muted-foreground group-hover:text-foreground'
                }`}>
                  {step.icon}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${
                      activeStep === idx 
                        ? 'border-cyan/50 text-cyan bg-cyan/5' 
                        : 'border-border text-muted-foreground'
                    }`}>
                      STAGE_0{idx + 1}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground tracking-wider">
                      {step.subtitle}
                    </span>
                  </div>
                  <h3 className={`text-base font-bold font-sans ${activeStep === idx ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {step.title}
                  </h3>
                  {activeStep === idx && (
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed mt-3 pt-3 border-t border-cyan/20 animate-reveal-up">
                      {step.desc}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Visual Telemetry Sandbox */}
          <div className="lg:col-span-6 glass-card hover-lift rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl" dir="ltr">
            
            {/* Hologram Header info */}
            <div className="flex justify-between items-center mb-6 font-mono text-[9px] text-muted-foreground border-b border-border/20 pb-3">
              <span>[ACTIVE_PIPELINE_MONITOR]</span>
              <span className="text-cyan font-bold">CORE_0: ACTIVE_INFERENCE</span>
            </div>

            {/* Simulation Canvas */}
            <div className="flex-1 flex flex-col justify-center items-center relative min-h-[300px]">
              
              {/* Overlay CRT gridlines */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan/5 to-transparent h-full w-full pointer-events-none opacity-20" />
              
              {/* Stepper dynamic graphic panels */}
              {activeStep === 0 && (
                <div className="w-full text-center space-y-6 font-mono text-xs max-w-sm">
                  <div className="border border-border/60 bg-black/80 p-5 rounded-lg text-left space-y-3">
                    <div className="flex justify-between border-b border-border/30 pb-2">
                      <span className="text-muted-foreground">BUS_PROTOCOL</span>
                      <span className="text-primary font-bold">I2S_DMA_DOUBLE_BUFFER</span>
                    </div>
                    <div className="flex justify-between border-b border-border/30 pb-2">
                      <span className="text-muted-foreground">SAMPLE_DEPTH</span>
                      <span className="text-foreground">24-Bit Linear PCM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">STREAM_INTEGRITY</span>
                      <span className="text-primary font-bold">100% OK // NO_DROPS</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-1.5 h-12 items-end">
                    {[3, 8, 4, 10, 5, 2, 8, 12, 6, 4, 9, 11, 4, 2, 7, 3, 5, 8, 4].map((h, i) => (
                      <div 
                        key={i} 
                        className="w-2 bg-primary/70 rounded-t" 
                        style={{ 
                          height: `${h * 3}px`,
                          animation: `pulse 1s ease-in-out infinite`,
                          animationDelay: `${i * 0.05}s`
                        }} 
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground">Continuous direct memory access (DMA) sampling telemetry</p>
                </div>
              )}

              {activeStep === 1 && (
                <div className="w-full text-center space-y-6 font-mono text-xs max-w-sm">
                  <div className="border border-border/60 bg-black/80 p-5 rounded-lg text-left space-y-3">
                    <div className="flex justify-between border-b border-border/30 pb-2">
                      <span className="text-muted-foreground">DSP_WINDOW</span>
                      <span className="text-cyan font-bold">HANNING_COEFFICIENTS</span>
                    </div>
                    <div className="flex justify-between border-b border-border/30 pb-2">
                      <span className="text-muted-foreground">FFT_ALGORITHM</span>
                      <span className="text-foreground">Radix-4 Complex Float</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CALCULATION_TIME</span>
                      <span className="text-cyan font-bold">852 microseconds</span>
                    </div>
                  </div>
                  
                  {/* Spectrum graph */}
                  <div className="h-24 w-full bg-black/80 border border-border/30 rounded-lg p-2 relative overflow-hidden flex items-end">
                    <div className="absolute top-1 left-2 text-[8px] text-muted-foreground">dB Level</div>
                    <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                      <path 
                        d="M 0,80 Q 20,40 40,80 T 80,60 T 120,70 T 160,20 T 200,80" 
                        fill="none" 
                        stroke="hsl(var(--cyan))" 
                        strokeWidth="2" 
                      />
                      <line x1="160" y1="20" x2="160" y2="80" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
                      <text x="145" y="15" fill="hsl(var(--destructive))" fontSize="6">BPFO PEAK</text>
                    </svg>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="w-full text-center space-y-6 font-mono text-xs max-w-sm">
                  <div className="border border-border/60 bg-black/80 p-5 rounded-lg text-left space-y-3">
                    <div className="text-muted-foreground text-[10px] uppercase tracking-wider mb-2">EXTRACTED VECTOR COEFFICIENTS:</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-card/40 p-2 border border-border rounded text-center">
                        <span className="text-[8px] text-muted-foreground block">RMS</span>
                        <span className="text-[11px] text-foreground font-bold font-mono">1.24 mg</span>
                      </div>
                      <div className="bg-card/40 p-2 border border-border rounded text-center">
                        <span className="text-[8px] text-muted-foreground block">CREST_F</span>
                        <span className="text-[11px] text-foreground font-bold font-mono">3.45</span>
                      </div>
                      <div className="bg-card/40 p-2 border border-border rounded text-center">
                        <span className="text-[8px] text-muted-foreground block">KURTOSIS</span>
                        <span className="text-[11px] text-foreground font-bold font-mono">2.88 mg</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-around items-center bg-black/40 border border-border/30 p-4 rounded-lg">
                    <div className="text-center">
                      <span className="text-[9px] text-muted-foreground block">RAW DATAPOINTS</span>
                      <span className="text-xl font-bold text-foreground">512</span>
                    </div>
                    <span className="text-cyan text-lg">➔</span>
                    <div className="text-center">
                      <span className="text-[9px] text-muted-foreground block">FEATURE VECTOR</span>
                      <span className="text-xl font-bold text-cyan">1x3</span>
                    </div>
                  </div>
                </div>
              )}

              {(activeStep === 3 || activeStep === 4) && (
                <div className="w-full flex flex-col items-center space-y-4">
                  
                  {/* Dynamic 2D Scatter Plot for K-Means */}
                  <div className="w-full max-w-[280px] aspect-square border border-border/60 bg-black/90 rounded-lg p-2 relative shadow-inner">
                    <div className="absolute top-1 left-2 text-[8px] text-muted-foreground">Feature A (RMS)</div>
                    <div className="absolute bottom-1 right-2 text-[8px] text-muted-foreground">Feature B (Kurtosis)</div>
                    
                    <svg className="w-full h-full" viewBox="0 0 320 320">
                      {/* Grid background lines */}
                      <line x1="0" y1="160" x2="320" y2="160" stroke="#1e293b" strokeWidth="0.5" />
                      <line x1="160" y1="0" x2="160" y2="320" stroke="#1e293b" strokeWidth="0.5" />

                      {/* Cluster 0 (Nominal) bounding sphere */}
                      <circle cx="100" cy="100" r="45" fill="rgba(0, 255, 65, 0.03)" stroke="rgba(0, 255, 65, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="100" cy="100" r="3" fill="hsl(var(--primary))" />
                      <text x="110" y="98" fill="hsl(var(--primary))" fontSize="7" fontFamily="JetBrains Mono">Centroid 0 (Nominal)</text>

                      {/* Cluster 1 (Friction) bounding sphere */}
                      <circle cx="240" cy="90" r="45" fill="rgba(6, 182, 212, 0.03)" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="240" cy="90" r="3" fill="hsl(var(--cyan))" />
                      <text x="180" y="80" fill="hsl(var(--cyan))" fontSize="7" fontFamily="JetBrains Mono">Centroid 1 (Friction)</text>

                      {/* Static cluster points */}
                      {scatterPoints.map((pt, i) => (
                        <circle 
                          key={i} 
                          cx={pt.x} 
                          cy={pt.y} 
                          r="1.8" 
                          fill={pt.cluster === 0 ? "rgba(0, 255, 65, 0.3)" : "rgba(6, 182, 212, 0.3)"} 
                        />
                      ))}

                      {/* Active diagnostic vector (live point moving) */}
                      <circle 
                        cx={liveDot.x} 
                        cy={liveDot.y} 
                        r="5.5" 
                        fill={liveDot.isAnomaly ? "hsl(var(--destructive))" : "hsl(var(--primary))"} 
                        stroke="#fff" 
                        strokeWidth="1.5" 
                        className="transition-all duration-100 animate-pulse"
                      />
                      <line 
                        x1="100" 
                        y1="100" 
                        x2={liveDot.x} 
                        y2={liveDot.y} 
                        stroke={liveDot.isAnomaly ? "rgba(239, 68, 68, 0.5)" : "rgba(0, 255, 65, 0.4)"} 
                        strokeWidth="1" 
                        strokeDasharray="2 2" 
                      />
                    </svg>
                  </div>

                  <p className="text-[10px] text-muted-foreground font-mono text-center">
                    Cluster Distance: <span className="text-cyan font-bold">{liveDot.distance} σ</span> // Status: <span className={liveDot.isAnomaly ? "text-destructive font-bold" : "text-primary font-bold"}>{liveDot.isAnomaly ? "ANOMALY_DETECTED" : "NOMINAL"}</span>
                  </p>
                </div>
              )}

            </div>

            {/* Stepper info footer with detailed telemetry */}
            <div className="mt-6 font-mono text-[9px] text-muted-foreground flex justify-between border-t border-border/20 pt-3">
              <span className="flex items-center gap-2">
                <Info className="w-3 h-3 text-cyan" />
                <span>{pipelineSteps[activeStep].telemetry}</span>
                {activeStep === 3 && (
                  <span className="text-cyan font-bold animate-pulse">{liveDot.distance} σ</span>
                )}
                {activeStep === 4 && (
                  <span className="text-red-500 font-bold animate-ping">CRITICAL_STOP</span>
                )}
              </span>
              <span className="text-cyan">ESP32 // CORE0</span>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}