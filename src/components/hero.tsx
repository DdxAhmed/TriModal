import { useState, useEffect } from 'react';
import { useReveal } from '@/hooks/use-reveal';
import { useLanguage } from '@/hooks/use-language';
import { Activity, Cpu, Magnet, Waves, AlertCircle, RefreshCw } from 'lucide-react';

export function Hero() {
  const { ref, isVisible } = useReveal();
  const { language, t } = useLanguage();
  const [isAnomaly, setIsAnomaly] = useState(false);
  const [telemetry, setTelemetry] = useState({
    vibe: 12.4,
    acoustic: 3.2,
    magnetic: 0.85,
    latency: '2.4ms',
    status: 'SYSTEM_SAFE'
  });

  // Mock telemetry fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnomaly) {
        setTelemetry({
          vibe: parseFloat((12.0 + Math.random() * 0.8).toFixed(2)),
          acoustic: parseFloat((3.0 + Math.random() * 0.4).toFixed(2)),
          magnetic: parseFloat((0.8 + Math.random() * 0.1).toFixed(2)),
          latency: '2.4 ms',
          status: t('hero_lbl_safe')
        });
      } else {
        setTelemetry({
          vibe: parseFloat((78.5 + Math.random() * 5.0).toFixed(2)),
          acoustic: parseFloat((82.1 + Math.random() * 8.0).toFixed(2)),
          magnetic: parseFloat((4.3 + Math.random() * 0.6).toFixed(2)),
          latency: '< 1.8 ms',
          status: t('hero_lbl_tripped')
        });
      }
    }, 800);
    return () => clearInterval(interval);
  }, [isAnomaly, language]);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden border-b border-border/30 bg-background">
      {/* Abstract physics overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.04)_0%,transparent_50%)]" />
      
      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid-blue pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Technical Narrative & Actions */}
          <div
            ref={ref}
            className={`lg:col-span-7 flex flex-col justify-center ${
              isVisible ? 'reveal-visible' : 'reveal-hidden'
            }`}
          >
            {/* Status indicator bar */}
            <div className="flex items-center gap-3 mb-6 font-mono text-xs tracking-widest text-primary border-s border-primary/30 ps-3">
              <span className={`flex h-2 w-2 rounded-full ${isAnomaly ? 'bg-destructive animate-ping' : 'bg-primary animate-pulse-fast'} shadow-[0_0_8px_currentColor]`} />
              <span className={isAnomaly ? 'text-destructive font-bold' : 'text-primary'}>
                {isAnomaly 
                  ? (language === 'en' ? 'ALARM: FAULT_DETECTION_STATE' : 'إنذار: كشف عطل في المحرك') 
                  : (language === 'en' ? 'STATUS: NOMINAL // EDGE_MONITORING' : 'الحالة: طبيعية // مراقبة مستمرة')
                }
              </span>
            </div>

            {/* Core Message / Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans tracking-tight mb-6 text-foreground leading-[1.1]">
              {language === 'en' ? (
                <>
                  <span className="text-foreground">Traditional protection</span><br />
                  <span className="text-muted-foreground">waits for failure.</span><br />
                  <span className="text-primary glow-text-blue">TRI-MODAL</span> <span className="text-foreground">looks before.</span>
                </>
              ) : (
                <>
                  <span className="text-foreground">الحماية التقليدية</span><br />
                  <span className="text-muted-foreground">تنتظر وقوع العطل.</span><br />
                  <span className="text-primary glow-text-blue">TRI-MODAL</span> <span className="text-foreground">يتنبأ به قبلها.</span>
                </>
              )}
            </h1>

            {/* Scientific explanation paragraph */}
            <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed mb-10">
              {language === 'en' ? (
                <>
                  Windings burn in microseconds, but mechanical failure leaves physical footprints weeks in advance. We fuse <span className="text-foreground font-bold">vibration</span>, <span className="text-foreground font-bold">acoustic clicks</span>, and <span className="text-foreground font-bold font-mono">stray magnetic fields</span> on-device using a bare-metal ESP32 to prevent catastrophic damage.
                </>
              ) : (
                <>
                  تحترق الملفات الكهربائية في أجزاء من الثانية، لكن الأعطال الميكانيكية تترك آثاراً ملموسة قبل أسابيع. نحن ندمج قياسات <span className="text-foreground font-bold">الاهتزاز</span>، و<span className="text-foreground font-bold">الانبعاثات الصوتية</span>، و<span className="text-foreground font-bold font-mono">الحقول المغناطيسية الشاردة</span> محلياً على متحكم ESP32 لتفادي الأضرار الكارثية.
                </>
              )}
            </p>

            {/* Micro-instrument readouts */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mb-10 text-xs glass-card-blue p-5 rounded-xl relative overflow-hidden hover-lift">
              <div className="absolute top-0 right-0 w-24 h-[1px] bg-blue-500/40" />
              <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-blue-500/40" />
              <div>
                <span className="text-muted-foreground block text-[10px] font-mono uppercase tracking-wider mb-1">
                  {language === 'en' ? 'OBSERVATION' : 'قنوات القياس'}
                </span>
                <span className="text-xs text-foreground font-sans font-bold">
                  {language === 'en' ? 'Multi-Physics' : 'دمج متعدد فيزيائي'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] font-mono uppercase tracking-wider mb-1">
                  {language === 'en' ? 'LATENCY' : 'زمن الاستجابة'}
                </span>
                <span className={`text-xs font-mono font-bold ${isAnomaly ? 'text-destructive' : 'text-blue-400'}`}>{telemetry.latency}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] font-mono uppercase tracking-wider mb-1">
                  {language === 'en' ? 'DECISION PATH' : 'مسار اتخاذ القرار'}
                </span>
                <span className="text-xs text-foreground font-sans font-bold">
                  {language === 'en' ? '100% Cloudless' : '100% محلي بالكامل'}
                </span>
              </div>
            </div>

            {/* Interactive Control Buttons */}
            <div className="flex flex-wrap gap-4 font-sans text-sm">
              {!isAnomaly ? (
                <button
                  onClick={() => setIsAnomaly(true)}
                  className="px-6 py-4 border border-destructive/60 bg-destructive/10 text-destructive hover:bg-destructive/25 hover:border-destructive hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] cursor-pointer transition-all duration-300 flex items-center gap-3 rounded-xl font-bold hover-lift"
                >
                  <AlertCircle className="w-4 h-4 animate-bounce" />
                  <span>{t('hero_btn_fault')}</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsAnomaly(false)}
                  className="px-6 py-4 border border-blue-500/60 bg-blue-500/15 text-blue-400 hover:bg-blue-500/30 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] cursor-pointer transition-all duration-300 flex items-center gap-3 rounded-xl font-bold hover-lift"
                >
                  <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>{t('hero_btn_reset')}</span>
                </button>
              )}
              
              <a
                href="#simulator-heading"
                className="px-6 py-4 border border-blue-500/30 bg-card/60 hover:bg-blue-500/15 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] cursor-pointer transition-all duration-300 flex items-center gap-2 rounded-xl text-foreground font-semibold hover-lift"
              >
                <span>{language === 'en' ? 'RUN LAB SIMULATION' : 'تشغيل محاكاة المختبر'}</span>
                <span className="text-blue-400 font-mono font-bold">&gt;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Holographic Physical System Visualization */}
          <div className="lg:col-span-5 flex justify-center items-center relative min-h-[350px] lg:min-h-[500px]">
            {/* Hologram base circle overlay */}
            <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] rounded-full animate-pulse-fast pointer-events-none" />
            
            <div className="relative w-full max-w-[420px] aspect-square glass-card-blue rounded-2xl p-6 shadow-2xl overflow-hidden group hover-lift">
              <div className="absolute top-2 left-3 font-mono text-[9px] text-muted-foreground/60 tracking-wider">
                HOLOGRAPHIC_SYS_MONITOR // V_1.0
              </div>
              <div className="absolute top-2 right-3 font-mono text-[9px] text-blue-400">
                CORE_0_LOAD: 42%
              </div>

              {/* Animated crosshair ticks */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-primary/20" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-primary/20" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-primary/20" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-primary/20" />

              {/* Interactive SVG Diagram representing the motor & sensors */}
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Embedded Grid mesh */}
                <rect width="400" height="400" fill="url(#hex-hex-grid)" opacity="0.5" />

                {/* Sensor nodes and connection lines to ESP32 */}
                {/* Core lines */}
                <g stroke={isAnomaly ? "hsl(var(--destructive)/0.3)" : "hsl(var(--primary)/0.2)"} strokeWidth="1.5" strokeDasharray="4 4" fill="none">
                  {/* Vibration to ESP32 */}
                  <line x1="80" y1="120" x2="200" y2="200" />
                  {/* Acoustic to ESP32 */}
                  <line x1="320" y1="120" x2="200" y2="200" />
                  {/* Magnetic to ESP32 */}
                  <line x1="200" y1="320" x2="200" y2="200" />
                </g>

                {/* Laser signal pulses traveling along connection paths */}
                <g stroke={isAnomaly ? "hsl(var(--destructive))" : "hsl(var(--primary))"} strokeWidth="2.5" fill="none">
                  <path d="M 80 120 L 200 200" strokeDasharray="30 150" strokeDashoffset={isAnomaly ? "-15" : "-50"}>
                    <animate attributeName="strokeDashoffset" values="0;180" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M 320 120 L 200 200" strokeDasharray="30 150" strokeDashoffset={isAnomaly ? "-10" : "-30"}>
                    <animate attributeName="strokeDashoffset" values="0;180" dur="1.5s" repeatCount="indefinite" />
                  </path>
                  <path d="M 200 320 L 200 200" strokeDasharray="30 150" strokeDashoffset={isAnomaly ? "-20" : "-60"}>
                    <animate attributeName="strokeDashoffset" values="0;120" dur="1.2s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* Central Motor Structure */}
                <g transform="translate(200, 200)">
                  {/* Outer magnetic field rotating vector */}
                  <circle cx="0" cy="0" r="75" stroke={isAnomaly ? "rgba(239, 68, 68, 0.15)" : "rgba(0, 255, 65, 0.08)"} strokeWidth="1" fill="none" />
                  <circle cx="0" cy="0" r="60" stroke={isAnomaly ? "rgba(239, 68, 68, 0.2)" : "rgba(0, 255, 65, 0.1)"} strokeWidth="1.5" fill="none" strokeDasharray="20 10">
                    <animateTransform attributeName="transform" type="rotate" from="0" to={isAnomaly ? "360" : "-360"} dur="6s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Magnetic flux lines - show distorted in anomaly */}
                  <path 
                    d={isAnomaly 
                      ? "M -55,-25 Q -10,-45 50,-10 T -50,45" 
                      : "M -50,0 Q 0,-35 50,0 T -50,0"
                    } 
                    stroke={isAnomaly ? "hsl(var(--destructive)/0.5)" : "hsl(var(--cyan)/0.3)"} 
                    strokeWidth="1.5" 
                    fill="none" 
                    className="transition-all duration-500"
                  />

                  {/* Motor Shaft rotor representation */}
                  <circle cx="0" cy="0" r="45" fill="rgba(15, 20, 28, 0.95)" stroke={isAnomaly ? "hsl(var(--destructive))" : "hsl(var(--primary)/0.6)"} strokeWidth="2" />
                  
                  {/* Mechanical fan blades spinning inside */}
                  <g className="transition-all duration-500">
                    <path d="M 0,0 L 0,-35 M 0,0 L 30,17 M 0,0 L -30,17" stroke={isAnomaly ? "hsl(var(--destructive)/0.7)" : "hsl(var(--primary)/0.5)"} strokeWidth="3" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur={isAnomaly ? "0.3s" : "1.8s"} repeatCount="indefinite" />
                    </path>
                  </g>
                  
                  {/* Microcontroller core overlay in center */}
                  <rect x="-18" y="-18" width="36" height="36" rx="4" fill="#080B10" stroke={isAnomaly ? "hsl(var(--destructive))" : "hsl(var(--primary))"} strokeWidth="1.5" />
                  <Cpu className={`w-5 h-5 absolute -translate-x-1/2 -translate-y-1/2 ${isAnomaly ? 'text-destructive animate-pulse' : 'text-primary'}`} style={{ left: '0', top: '0' }} />
                </g>

                {/* SENSOR 1: Kinetic Node (Top Left) */}
                <g transform="translate(80, 120)" className="group/node cursor-pointer">
                  <circle cx="0" cy="0" r="28" fill="#080B10" stroke={isAnomaly ? "hsl(var(--destructive))" : "hsl(var(--border))"} strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="24" fill={isAnomaly ? "rgba(239, 68, 68, 0.05)" : "rgba(0, 255, 65, 0.03)"} />
                  <Activity className={`w-5 h-5 absolute -translate-x-1/2 -translate-y-1/2 ${isAnomaly ? 'text-destructive' : 'text-primary'}`} style={{ left: '0', top: '0' }} />
                  <text x="0" y="42" textAnchor="middle" fill="#94a3b8" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold">
                    {t('hero_lbl_vibe').toUpperCase()}
                  </text>
                  <text x="0" y="52" textAnchor="middle" fill={isAnomaly ? "hsl(var(--destructive))" : "hsl(var(--primary))"} fontFamily="JetBrains Mono" fontSize="8">
                    {telemetry.vibe} mg
                  </text>
                </g>

                {/* SENSOR 2: Acoustic Node (Top Right) */}
                <g transform="translate(320, 120)" className="group/node cursor-pointer">
                  <circle cx="0" cy="0" r="28" fill="#080B10" stroke={isAnomaly ? "hsl(var(--destructive))" : "hsl(var(--border))"} strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="24" fill={isAnomaly ? "rgba(239, 68, 68, 0.05)" : "rgba(0, 255, 65, 0.03)"} />
                  <Waves className={`w-5 h-5 absolute -translate-x-1/2 -translate-y-1/2 ${isAnomaly ? 'text-destructive' : 'text-cyan'}`} style={{ left: '0', top: '0' }} />
                  <text x="0" y="42" textAnchor="middle" fill="#94a3b8" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold">
                    {t('hero_lbl_acoustic').toUpperCase()}
                  </text>
                  <text x="0" y="52" textAnchor="middle" fill={isAnomaly ? "hsl(var(--destructive))" : "hsl(var(--cyan))"} fontFamily="JetBrains Mono" fontSize="8">
                    {telemetry.acoustic} kHz
                  </text>
                </g>

                {/* SENSOR 3: Stray Flux Node (Bottom Center) */}
                <g transform="translate(200, 320)" className="group/node cursor-pointer">
                  <circle cx="0" cy="0" r="28" fill="#080B10" stroke={isAnomaly ? "hsl(var(--destructive))" : "hsl(var(--border))"} strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="24" fill={isAnomaly ? "rgba(239, 68, 68, 0.05)" : "rgba(0, 255, 65, 0.03)"} />
                  <Magnet className={`w-5 h-5 absolute -translate-x-1/2 -translate-y-1/2 ${isAnomaly ? 'text-destructive' : 'text-amber'}`} style={{ left: '0', top: '0' }} />
                  <text x="0" y="-38" textAnchor="middle" fill="#94a3b8" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold">
                    {t('hero_lbl_magnetic').toUpperCase()}
                  </text>
                  <text x="0" y="-48" textAnchor="middle" fill={isAnomaly ? "hsl(var(--destructive))" : "hsl(var(--amber))"} fontFamily="JetBrains Mono" fontSize="8">
                    {telemetry.magnetic} G
                  </text>
                </g>
              </svg>

              {/* Holographic Diagnostic readouts on bottom of card */}
              <div className="absolute bottom-4 left-6 right-6 font-mono text-[10px] bg-black/80 border border-border/40 p-3 rounded flex justify-between items-center">
                <div>
                  <span className="text-muted-foreground block text-[8px] uppercase">
                    {language === 'en' ? 'STATE' : 'الحالة'}
                  </span>
                  <span className={`font-bold ${isAnomaly ? 'text-destructive animate-pulse' : 'text-primary'}`}>
                    {telemetry.status}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground block text-[8px] uppercase">
                    {language === 'en' ? 'RESPONSE' : 'الاستجابة'}
                  </span>
                  <span className="text-foreground font-bold">
                    {isAnomaly 
                      ? (language === 'en' ? '< 1.8ms TRIP' : 'فصل < 1.8ms') 
                      : (language === 'en' ? '5ms TRIP HOLD' : 'فصل خلال 5ms')
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}