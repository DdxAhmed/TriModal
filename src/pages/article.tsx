import { Link } from 'wouter';
import { 
  ArrowLeft, 
  BookOpen,
  ArrowUpRight,
  Calendar,
  Clock,
  User
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { articles } from '@/data/articles';

// Sample data comparing traditional vs predictive detection timelines
const timelineData = [
  { day: 'Day 1', predictiveScore: 5, traditionalAlert: 0, currentAmp: 10 },
  { day: 'Day 5', predictiveScore: 12, traditionalAlert: 0, currentAmp: 10 },
  { day: 'Day 10', predictiveScore: 25, traditionalAlert: 0, currentAmp: 10.2 },
  { day: 'Day 15', predictiveScore: 40, traditionalAlert: 0, currentAmp: 10.5 },
  { day: 'Day 20', predictiveScore: 68, traditionalAlert: 0, currentAmp: 11 },
  { day: 'Day 22', predictiveScore: 85, traditionalAlert: 0, currentAmp: 12 },
  { day: 'Day 24', predictiveScore: 98, traditionalAlert: 80, currentAmp: 45 }, // Sudden motor failure/burn
];

interface ArticleProps {
  params: {
    id?: string;
  };
}

export default function Article({ params }: ArticleProps) {
  const currentId = params?.id || 'edge-prognostics-main';
  const article = articles.find(a => a.id === currentId) || articles[0];

  return (
    <main className="min-h-screen bg-background text-foreground crt-overlay py-24 select-none selection:bg-primary/30 selection:text-primary" dir="ltr">
      <div className="pointer-events-none fixed inset-0 z-50 animate-crt-scan" />
      
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,65,0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Back Link */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:opacity-80 transition-opacity group cursor-pointer">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK_TO_HOME</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12 border-b border-border/20 pb-10">
          <div className="flex flex-wrap items-center gap-4 text-primary font-mono text-xs md:text-sm tracking-wider mb-6">
            <Badge variant="outline" className="border-primary/50 text-primary font-mono bg-primary/5">
              {article.category}
            </Badge>
            <span className="text-muted-foreground">•</span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <User className="w-3.5 h-3.5" />
              {article.author}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-sans tracking-tight mb-6 leading-[1.3] text-foreground glow-text">
            {article.title}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-sans leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Dynamic content rendering */}
        <article className="min-h-[400px]">
          {/* If it is the main article, render the full rich layout containing the interactive chart/tables */}
          {article.id === 'edge-prognostics-main' ? (
            <div className="space-y-12">
              {/* Infographic Embed */}
              <section>
                <div className="border border-border/40 p-2 bg-black/50 relative overflow-hidden rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                  <div className="absolute top-2 left-2 z-20 bg-black/80 text-primary font-mono text-[10px] px-2 py-1 border border-primary/20">
                    SYS_SCHEMATIC_v1
                  </div>
                  <div className="aspect-video w-full bg-card/20 flex flex-col items-center justify-center p-6 border border-border/20 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.04)_0%,transparent_70%)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.01)_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none" />
                    
                    {/* Retro UI visualization for System Design */}
                    <div className="w-full max-w-lg border border-primary/30 bg-black p-4 font-mono text-[10px] sm:text-xs text-primary leading-relaxed relative z-10">
                      <div className="flex justify-between border-b border-primary/30 pb-2 mb-3">
                        <span>[ESP32_MULTISENSOR_FUSION_SCHEMATIC]</span>
                        <span className="animate-pulse">ONLINE</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center mb-4">
                        <div className="border border-primary/20 p-2 bg-primary/5">
                          <div className="font-bold mb-1">MPU6050</div>
                          <div className="text-[9px] text-muted-foreground">Vibration (I2C)</div>
                        </div>
                        <div className="border border-primary/20 p-2 bg-primary/5">
                          <div className="font-bold mb-1">INMP441</div>
                          <div className="text-[9px] text-muted-foreground">Acoustic (I2S)</div>
                        </div>
                        <div className="border border-primary/20 p-2 bg-primary/5">
                          <div className="font-bold mb-1">A3144</div>
                          <div className="text-[9px] text-muted-foreground">Flux (ADC)</div>
                        </div>
                      </div>
                      <div className="flex justify-center mb-3">
                        <div className="px-4 py-2 border border-primary font-bold bg-primary/10 animate-pulse">
                          ESP32 DUAL CORE (FreeRTOS)
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="border border-primary/20 p-1.5 bg-black/50">
                          <div className="text-foreground">Core 0: TinyML Inference</div>
                          <div className="text-[9px] text-muted-foreground">K-Means // Fault Isolator</div>
                        </div>
                        <div className="border border-primary/20 p-1.5 bg-black/50">
                          <div className="text-foreground">Core 1: Wi-Fi Stream</div>
                          <div className="text-[9px] text-muted-foreground">WebSockets // Dashboard</div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="p-4 bg-card/80 border-t border-border/20">
                    <p className="text-sm text-muted-foreground text-center font-sans">
                      Figure 1: Integrated schematic of the proposed system - combining vibration, acoustic, and stray electromagnetic flux sensors on an ESP32 microcontroller.
                    </p>
                  </div>
                </div>
              </section>

              {/* The dynamic rich content defined in articles.tsx */}
              {article.content}

              {/* Section 2 Details with interactive Recharts graph */}
              <section className="mt-8 border-t border-border/20 pt-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Real Motor Degradation Curve: Predictive Maintenance vs Traditional Protection</h3>
                <Card className="bg-black/40 border-border/30 p-6 mb-8">
                  <CardContent className="p-0">
                    <div className="h-72 w-full" dir="ltr">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timelineData}>
                          <defs>
                            <linearGradient id="colorPredictive" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorTraditional" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="day" stroke="#666" fontSize={11} />
                          <YAxis stroke="#666" fontSize={11} />
                          <Tooltip contentStyle={{ backgroundColor: '#090909', borderColor: 'hsl(var(--border))', color: '#fff' }} />
                          <Legend />
                          <Area name="Anomaly Score (Predictive)" type="monotone" dataKey="predictiveScore" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorPredictive)" strokeWidth={2} />
                          <Area name="Load Current (Traditional)" type="monotone" dataKey="currentAmp" stroke="hsl(var(--destructive))" fillOpacity={0.2} fill="url(#colorTraditional)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center font-sans">
                      Figure 2: Comparison of the predictive anomaly score against traditional load current during bearing degradation.
                    </p>
                  </CardContent>
                </Card>

                <h3 className="text-xl font-sans font-bold text-foreground mb-4">System Comparison Matrix</h3>
                <div className="overflow-x-auto border border-border/30 rounded-lg">
                  <table className="w-full text-sm font-sans text-left">
                    <thead className="bg-muted text-foreground uppercase border-b border-border/30 text-xs">
                      <tr>
                        <th className="p-4">Comparison Metric</th>
                        <th className="p-4">Traditional Protection (Relay & Fuse)</th>
                        <th className="p-4 text-primary font-bold">Proposed System (Multi-Physics Fusion)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20 text-muted-foreground">
                      <tr className="hover:bg-muted/10">
                        <td className="p-4 font-bold text-foreground">Protection Nature</td>
                        <td className="p-4">Reactive (Post-failure)</td>
                        <td className="p-4 text-primary">Predictive / Proactive (Weeks before failure)</td>
                      </tr>
                      <tr className="hover:bg-muted/10">
                        <td className="p-4 font-bold text-foreground">Targeted Indicators</td>
                        <td className="p-4">Overload current & cable temperature</td>
                        <td className="p-4 text-primary">Vibration, ultrasonic acoustic waves, stray magnetic flux</td>
                      </tr>
                      <tr className="hover:bg-muted/10">
                        <td className="p-4 font-bold text-foreground">Autonomy & Trip Latency</td>
                        <td className="p-4">Slow mechanical response</td>
                        <td className="p-4 text-primary">Instant edge inference, trip decision under 5ms</td>
                      </tr>
                      <tr className="hover:bg-muted/10">
                        <td className="p-4 font-bold text-foreground">Bearing Defects</td>
                        <td className="p-4">Undetected until total motor seizure/locking</td>
                        <td className="p-4 text-primary">Detects micro-shock bearing waves in early stages</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          ) : (
            // For other sub-articles, just render the rich ReactNodes from the database
            <div className="space-y-6">
              {article.content}
            </div>
          )}
        </article>

        {/* Sources Section */}
        <section className="border-t border-border/30 mt-16 pt-12">
          <h3 className="text-lg font-mono text-primary flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5" />
            <span>[REFERENCES_AND_SOURCES]</span>
          </h3>
          <ul className="space-y-3 font-sans text-sm text-muted-foreground">
            <li>
              • Siemens and Aberdeen Research Downtime Reports: 
              <a href="https://reliamag.com/articles/cost-unplanned-downtime-manufacturing/" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 ml-2">
                Siemens/Aberdeen Research Downtime Report <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
            <li>
              • Vibration Analysis and Bearing Defects Studies: 
              <a href="https://acoem.us/blog/vibration-analysis/bearing-fault-frequencies/" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 ml-2">
                Bearing Fault Frequencies Explained <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
            <li>
              • ESP32 Dual-Core Architecture & FreeRTOS Manual: 
              <a href="https://randomnerdtutorials.com/esp32-freertos-arduino-tasks/" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 ml-2">
                Multitasking with ESP32 & FreeRTOS <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
