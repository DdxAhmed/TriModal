import { Link } from 'wouter';
import { 
  ArrowRight, 
  Cpu, 
  Volume2, 
  CheckCircle2, 
  AlertTriangle,
  BookOpen,
  ArrowUpRight
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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data comparing traditional vs predictive detection timelines
const timelineData = [
  { day: 'يوم 1', predictiveScore: 5, traditionalAlert: 0, currentAmp: 10 },
  { day: 'يوم 5', predictiveScore: 12, traditionalAlert: 0, currentAmp: 10 },
  { day: 'يوم 10', predictiveScore: 25, traditionalAlert: 0, currentAmp: 10.2 },
  { day: 'يوم 15', predictiveScore: 40, traditionalAlert: 0, currentAmp: 10.5 },
  { day: 'يوم 20', predictiveScore: 68, traditionalAlert: 0, currentAmp: 11 },
  { day: 'يوم 22', predictiveScore: 85, traditionalAlert: 0, currentAmp: 12 },
  { day: 'يوم 24', predictiveScore: 98, traditionalAlert: 80, currentAmp: 45 }, // Sudden motor failure/burn
];

export default function Article() {
  return (
    <main className="min-h-screen bg-background text-foreground crt-overlay py-24 select-none selection:bg-primary/30 selection:text-primary">
      <div className="pointer-events-none fixed inset-0 z-50 animate-crt-scan" />
      
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,65,0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        {/* Back Link */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:opacity-80 transition-opacity group cursor-pointer">
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            <span>العودة للمحاكي اللحظي // BACK_TO_DASHBOARD</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-primary font-mono text-xs md:text-sm tracking-wider mb-6">
            <Badge variant="outline" className="border-primary/50 text-primary font-mono bg-primary/5">RESEARCH_PAPER // v1.0.0</Badge>
            <span>•</span>
            <span>تاريخ النشر: 10 يوليو 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-sans tracking-tight mb-8 leading-[1.3] text-foreground glow-text">
            حرّاس المصانع الصامتون: كيف تقود معالجة الحافة (Edge Computing) والذكاء الاصطناعي ثورة الصيانة التنبؤية؟
          </h1>
          
          <p className="text-xl text-muted-foreground font-sans leading-relaxed max-w-4xl">
            دراسة فنية معمقة حول كيفية الانتقال من أنظمة الحماية التفاعلية التقليدية إلى التنبؤ المسبق بأعطال المحركات الكهربائية قبل حدوثها بأيام باستخدام دمج الحساسات متعدد الفيزياء على معالجات منخفضة التكلفة.
          </p>
        </header>

        {/* Infographic Embed */}
        <section className="mb-16">
          <div className="border border-border/40 p-2 bg-black/50 relative overflow-hidden rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div className="absolute top-2 left-2 z-20 bg-black/80 text-primary font-mono text-[10px] px-2 py-1 border border-primary/20">
              SYS_SCHEMATIC_v1
            </div>
            <img 
              src="/predictive_maintenance_schematic.png" 
              alt="المخطط التوضيحي لنظام الصيانة التنبؤية متعدد الفيزياء" 
              className="w-full h-auto object-cover border border-border/20 rounded-md"
            />
            <div className="p-4 bg-card/80 border-t border-border/20">
              <p className="text-sm text-muted-foreground text-center font-sans">
                الشكل 1: المخطط التكاملي للنظام المقترح - دمج حساسات الاهتزاز والصدى والفيض الكهرومغناطيسي على معالج ESP32
              </p>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-sans font-bold mb-6 text-foreground border-r-4 pr-4 border-primary">
            1️⃣ المشكلة الاقتصادية: مليارات تُحرق في عتمة الأعطال المفاجئة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card/40 border-border/30 shadow-md">
              <CardContent className="pt-6">
                <span className="text-xs font-mono text-muted-foreground block mb-2" dir="ltr">US ANNUAL LOSS</span>
                <span className="text-4xl md:text-5xl font-bold text-destructive font-mono glow-text-destructive">50B$+</span>
                <p className="text-xs text-muted-foreground mt-4 font-sans leading-relaxed">
                  خسائر التوقف المفاجئ في المصانع الأمريكية سنوياً حسب Aberdeen Research.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-border/30 shadow-md">
              <CardContent className="pt-6">
                <span className="text-xs font-mono text-muted-foreground block mb-2" dir="ltr">GLOBAL DOWNTIME COST</span>
                <span className="text-4xl md:text-5xl font-bold text-destructive font-mono glow-text-destructive">1.5T$</span>
                <p className="text-xs text-muted-foreground mt-4 font-sans leading-relaxed">
                  الخسارة السنوية لأكبر 500 شركة عالمياً نتيجة توقف المعدات غير المخطط له (Siemens).
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-border/30 shadow-md">
              <CardContent className="pt-6">
                <span className="text-xs font-mono text-muted-foreground block mb-2" dir="ltr">REVENUE DEDUCTION</span>
                <span className="text-4xl md:text-5xl font-bold text-destructive font-mono glow-text-destructive">11%</span>
                <p className="text-xs text-muted-foreground mt-4 font-sans leading-relaxed">
                  متوسط النسبة المقتطعة من إجمالي إيرادات الشركات الكبرى بسبب التوقف غير المخطط له.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-invert prose-primary max-w-none text-muted-foreground font-sans leading-relaxed space-y-6">
            <p>
              المحركات الكهربائية ليست مجرد قطعة غيار، بل هي **نقطة الفشل الفردية (Single Point of Failure)** التي لو وقفت، خط الإنتاج كله بيقف وراها. إن توقف الماكينات المفاجئ يمثل تهديداً مباشراً لاستدامة العمليات الصناعية.
            </p>
            <p>
              وهنا تكمن الشرعية الاقتصادية لمشروعات الصيانة التنبؤية: نحن لا نحل مشكلة هامشية، بل نهاجم أكبر سبب منفرد لخسارة الإنتاجية في المصانع الحديثة عبر استباق تطور الأعطال وتصليحها بتكلفة رمزية مقارنة بتكلفة انهيار الماكينة بالكامل.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-sans font-bold mb-6 text-foreground border-r-4 pr-4 border-primary">
            2️⃣ ليه المنطق التقليدي "عمياء فيزيائياً"؟
          </h2>
          
          <div className="bg-destructive/5 border border-destructive/30 p-6 mb-8 rounded-lg flex gap-4 items-start">
            <AlertTriangle className="text-destructive w-6 h-6 shrink-0 mt-1" />
            <div className="font-sans">
              <h4 className="text-destructive font-bold mb-2">قصور المعادلة الحرارية وقانون جول</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                تعتمد الأجهزة التقليدية مثل الفيوز والريلاي على معادلة الحرارة الناشئة عن تيار الحمل: <code dir="ltr" className="font-mono text-xs text-foreground bg-destructive/10 px-1 py-0.5 rounded">$P = I^2R$</code>. المشكلة أن الحرارة وتيار الحمل هما <strong>أعراض نهائية</strong> للعطل الميكانيكي الحاصل، مما يعني أن نظام الحماية يتدخل فقط <strong>بعد</strong> حدوث التلف الفيزيائي الفعلي للموتور.
              </p>
            </div>
          </div>

          {/* Interactive Chart comparing detection timelines */}
          <Card className="bg-black/40 border-border/30 p-6 mb-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-lg font-sans text-foreground">منحنى التدهور الفعلي للمحرك: الصيانة التنبؤية مقابل الحماية التقليدية</CardTitle>
            </CardHeader>
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
                    <Area name="مؤشر الشذوذ (التنبؤي)" type="monotone" dataKey="predictiveScore" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorPredictive)" strokeWidth={2} />
                    <Area name="تيار الحمل (التقليدي)" type="monotone" dataKey="currentAmp" stroke="hsl(var(--destructive))" fillOpacity={0.2} fill="url(#colorTraditional)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center font-sans">
                يوضح الرسم البياني كيف يقفز مؤشر الشذوذ (التنبؤي) مبكراً بينما يظل تيار الموتور طبيعياً حتى لحظة الانهيار المفاجئ للبيرنج.
              </p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-sans font-bold text-foreground mb-4">جدول مقارنة الأنظمة</h3>
          <div className="overflow-x-auto border border-border/30 rounded-lg">
            <table className="w-full text-sm font-sans text-right">
              <thead className="bg-muted text-foreground uppercase border-b border-border/30 text-xs">
                <tr>
                  <th className="p-4">وجه المقارنة</th>
                  <th className="p-4">الحماية التقليدية (الريلاي والفيوز)</th>
                  <th className="p-4 text-primary font-bold">النظام المقترح (دمج متعدد الفيزياء)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 text-muted-foreground">
                <tr className="hover:bg-muted/10">
                  <td className="p-4 font-bold text-foreground">طبيعة الحماية</td>
                  <td className="p-4">تفاعلية (بعد وقوع المشكلة)</td>
                  <td className="p-4 text-primary">تنبؤية استباقية (قبل وقوع العطل بأسابيع)</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4 font-bold text-foreground">المؤشرات المستهدفة</td>
                  <td className="p-4">الحمل الكهربائي الزائد وحرارة الكابلات</td>
                  <td className="p-4 text-primary">الاهتزاز، الصوت فوق الصوتي، الفيض الكهرومغناطيسي</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4 font-bold text-foreground">الاستقلالية وسرعة الاستجابة</td>
                  <td className="p-4">ميكانيكية بطيئة نسبياً</td>
                  <td className="p-4 text-primary">تحليل فوري للحافة وبث لاسلكي بأقل من 5 مللي ثانية</td>
                </tr>
                <tr className="hover:bg-muted/10">
                  <td className="p-4 font-bold text-foreground">أعطال البيرنج (المحامل)</td>
                  <td className="p-4">لا يستطيع اكتشافها إلا بعد القفشة التامة للمحرك</td>
                  <td className="p-4 text-primary">رصد ذبذبات صدمات الكرات الدقيقة في البداية المبكرة</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-sans font-bold mb-6 text-foreground border-r-4 pr-4 border-primary">
            3️⃣ العقل المفكر: معمارية ESP32 ثنائية النواة
          </h2>
          
          <p className="text-muted-foreground font-sans leading-relaxed mb-8">
            معالج ESP32 معالج رخيص جداً (3-8 دولار) ولكنه يحتوي على **نواتين معالجة (Xtensa LX6)** تعمل بتردد 240 ميجاهرتز. تم تصميم المعمارية بالاعتماد على نظام التشغيل الفوري **FreeRTOS** لتوزيع الأعباء الحيوية:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Core 0 */}
            <div className="border border-border/40 bg-black/40 p-6 rounded-lg relative overflow-hidden">
              <div className="absolute top-4 left-4 text-primary opacity-20">
                <Cpu className="w-16 h-16" />
              </div>
              <Badge className="bg-primary/20 border-primary text-primary font-mono mb-4">CORE 0 // SAFETY_CRITICAL</Badge>
              <h4 className="text-lg font-sans font-bold text-foreground mb-3">نواة الأمان والقرار اللحظي</h4>
              <ul className="space-y-3 font-sans text-sm text-muted-foreground list-disc list-inside">
                <li>معزولة بالكامل عن بروتوكولات الشبكة اللاسلكية والـ Wi-Fi.</li>
                <li>تغذي خوارزمية نموذج الذكاء الاصطناعي بشكل فوري دون أي تجميد.</li>
                <li>تستخدم مقاطعة عتادية (Hardware ISR) لضمان استجابة أقل من 5 ملي ثانية.</li>
                <li>مستقلة تماماً، مما يضمن ثبات السلامة الميكانيكية بغض النظر عن مشاكل الاتصال.</li>
              </ul>
            </div>

            {/* Core 1 */}
            <div className="border border-border/40 bg-black/40 p-6 rounded-lg relative overflow-hidden">
              <div className="absolute top-4 left-4 text-primary opacity-20">
                <Volume2 className="w-16 h-16" />
              </div>
              <Badge className="bg-primary/5 border-primary/40 text-primary font-mono mb-4" variant="outline">CORE 1 // COMMUNICATIONS</Badge>
              <h4 className="text-lg font-sans font-bold text-foreground mb-3">نواة البث والمتابعة اللاسلكية</h4>
              <ul className="space-y-3 font-sans text-sm text-muted-foreground list-disc list-inside">
                <li>مسؤولة عن بث البيانات اللحظية كل 15 ملي ثانية عبر بروتوكول WebSockets.</li>
                <li>تقوم بتحديث مؤشرات لوحة التحكم والتطبيقات السحابية.</li>
                <li>تمنع تراكم البيانات الكبيرة أو ضياع الإطارات على النواة الأساسية.</li>
                <li>تتولى إدارة بروتوكولات الاتصال (Wi-Fi/Bluetooth) بكفاءة كاملة.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-sans font-bold mb-6 text-foreground border-r-4 pr-4 border-primary">
            4️⃣ الاندماج الحسي ثلاثي الأبعاد (Tri-Modal Sensor Fusion)
          </h2>
          
          <p className="text-muted-foreground font-sans leading-relaxed mb-8">
            يكمن الابتكار الأساسي في المشروع في رصد المحرك من 3 أبعاد فيزيائية مختلفة في نفس اللحظة. كل حساس يغطي نوع عطل فيزيائي منفصل لضمان استجابة شاملة وموثوقة بنسبة 100%:
          </p>

          <Tabs defaultValue="vibration" className="w-full font-sans">
            <TabsList className="grid w-full grid-cols-3 bg-muted border border-border/30">
              <TabsTrigger value="vibration" className="cursor-pointer">MPU6050 (حركي)</TabsTrigger>
              <TabsTrigger value="acoustic" className="cursor-pointer">INMP441 (صوتي)</TabsTrigger>
              <TabsTrigger value="magnetic" className="cursor-pointer">A3144 (مغناطيسي)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vibration" className="p-6 border border-border/20 bg-card/20 rounded-b-md">
              <h3 className="text-xl font-bold text-primary mb-3">MPU6050: البُعد الحركي والميكانيكي</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                مستشعر قياس تسارع وذبذبات خماسية الأبعاد يتواصل عبر بروتوكول I2C. يستهدف كشف حالات عدم اتزان المروحة والجسم الدوار وميل المحاور (Rotor Unbalance & Misalignment).
              </p>
              <div className="bg-black/60 p-4 border border-border/20 rounded font-mono text-xs mb-4 text-foreground" dir="ltr">
                <span className="text-primary">// Centrifugal Unbalance Force Formula:</span><br />
                Fc = m * (w^2) * r
              </div>
              <p className="text-xs text-muted-foreground">
                * ملاحظة: يظهر عدم الاتزان في التحليل الترددي (FFT) كقمة حادة عند التردد الأساسي للدوران (1X Frequency).
              </p>
            </TabsContent>
            
            <TabsContent value="acoustic" className="p-6 border border-border/20 bg-card/20 rounded-b-md">
              <h3 className="text-xl font-bold text-primary mb-3">INMP441: البُعد الصوتي والمجهري</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                ميكروفون MEMS عالي الحساسية يعمل بنظام I2S الرقمي. يستطيع التقاط الاحتكاكات الميكانيكية المبكرة للبيرنج (Bearings) وجفاف شحم التزييت.
              </p>
              <div className="bg-black/60 p-4 border border-border/20 rounded font-mono text-xs mb-4 text-foreground" dir="ltr">
                <span className="text-primary">// Bearing defect characteristic frequencies:</span><br />
                BPFO, BPFI, BSF, FTF
              </div>
              <p className="text-xs text-muted-foreground">
                * يمثل عطل المجرى الخارجي (BPFO) وحده ما يقرب من 40% من مشاكل محامل الحركة الميكانيكية للمحركات.
              </p>
            </TabsContent>
            
            <TabsContent value="magnetic" className="p-6 border border-border/20 bg-card/20 rounded-b-md">
              <h3 className="text-xl font-bold text-primary mb-3">A3144: البُعد المغناطيسي (Stray Flux)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                مصفوفة مغناطيسية تعتمد على تأثير هول (Hall Effect) لمراقبة الفيض المغناطيسي المتسرب حول الموتور بشكل غير جراحي (Non-Invasive) بالكامل وبدون تلامس.
              </p>
              <div className="bg-black/60 p-4 border border-border/20 rounded font-mono text-xs mb-4 text-foreground" dir="ltr">
                <span className="text-primary">// Air-Gap Reluctance Formula:</span><br />
                Reluctance (R) = g / (u * A)
              </div>
              <p className="text-xs text-muted-foreground">
                * أي انحراف في العمود الدوراني يغير المسافة (g) مما يغير المجال المغناطيسي المتسرب بشكل مباشر ويكشف أعطال الملفات الداخلية فورا.
              </p>
            </TabsContent>
          </Tabs>
        </section>

        {/* Section 5 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-sans font-bold mb-6 text-foreground border-r-4 pr-4 border-primary">
            5️⃣ الذكاء الاصطناعي المدمج (Streaming TinyML)
          </h2>
          
          <div className="prose prose-invert prose-primary max-w-none text-muted-foreground font-sans leading-relaxed space-y-6">
            <p>
              بدل الاعتماد على شروط عتبة ثابتة (Static Thresholds)، والتي تفشل نتيجة اختلاف طبيعة عمل أو قدرة المحركات أو تذبذب الجهد، يعتمد النظام على خوارزميات **Streaming Incremental Clustering (K-Means)** الذكية محلياً على ESP32 بمساعدة Edge Impulse.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="border border-border/30 bg-muted/20 p-5 rounded">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-4">١</div>
              <h5 className="font-bold text-foreground mb-2">مرحلة التعلم والتهيئة</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                في أول 60 ثانية، يستكشف النظام بصمة التشغيل الطبيعية للمحرك الحالي ويقوم بعزل ضوضاء المصنع المحيطة تماماً (Wavelet Subtraction).
              </p>
            </div>

            <div className="border border-border/30 bg-muted/20 p-5 rounded">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-4">٢</div>
              <h5 className="font-bold text-foreground mb-2">المراقبة المستمرة</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                مع كل دورة دوران للمحرك، يتم حساب مسافة انحراف السلوك والأنماط الترددية عن البصمة المستقرة التي تم تخزينها بالذاكرة.
              </p>
            </div>

            <div className="border border-border/30 bg-muted/20 p-5 rounded">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-4">٣</div>
              <h5 className="font-bold text-foreground mb-2">اتخاذ قرار الفصل الآمن</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                في حالة رصد قفزة مستمرة وتراكمية في مؤشر الانحراف (Anomaly Score)، يتم تنشيط الفصل الإلكتروني الآمن لحماية الماكينة.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-sans font-bold mb-6 text-foreground border-r-4 pr-4 border-primary">
            6️⃣ الجدوى الاقتصادية وعائد الاستثمار
          </h2>
          
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg font-sans">
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="text-primary w-6 h-6 shrink-0 mt-1" />
              <div>
                <h4 className="text-primary font-bold mb-2">إحصاءات وزارة الطاقة الأمريكية (DOE) لنتائج برامج الصيانة التنبؤية</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="border-r border-primary/20 pr-4">
                    <span className="text-3xl font-bold text-foreground block">70%-75%</span>
                    <span className="text-xs text-muted-foreground">تقليص نسبة الأعطال الكلية المفاجئة</span>
                  </div>
                  <div className="border-r border-primary/20 pr-4">
                    <span className="text-3xl font-bold text-foreground block">35%-45%</span>
                    <span className="text-xs text-muted-foreground">تقليص فترات التوقف غير المخطط لها</span>
                  </div>
                  <div className="border-r border-primary/20 pr-4">
                    <span className="text-3xl font-bold text-foreground block">10x</span>
                    <span className="text-xs text-muted-foreground">عائد استثماري مضاعف مقارنة بالتكلفة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sources Section */}
        <section className="border-t border-border/30 pt-12">
          <h3 className="text-lg font-mono text-primary flex items-center gap-2 mb-6" dir="ltr">
            <BookOpen className="w-5 h-5" />
            <span>[REFERENCES_AND_SOURCES]</span>
          </h3>
          <ul className="space-y-3 font-sans text-sm text-muted-foreground">
            <li>
              • تقارير سيمنس وتكاليف الأعطال الصناعية: 
              <a href="https://reliamag.com/articles/cost-unplanned-downtime-manufacturing/" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 ml-2" dir="ltr">
                Siemens/Aberdeen Research Downtime Report <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
            <li>
              • دراسات الاهتزاز وعيوب محامل المحركات: 
              <a href="https://acoem.us/blog/vibration-analysis/bearing-fault-frequencies/" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 ml-2" dir="ltr">
                Bearing Fault Frequencies Explained <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
            <li>
              • دليل معمارية النواة المزدوجة لمعالج ESP32: 
              <a href="https://randomnerdtutorials.com/esp32-freertos-arduino-tasks/" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 ml-2" dir="ltr">
                Multitasking with ESP32 & FreeRTOS <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
            <li>
              • تشخيص الفيض الكهروكهرومغناطيسي للمحركات: 
              <a href="https://digital-library.theiet.org/doi/full/10.1049/elp2.12157" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 ml-2" dir="ltr">
                IET Stray Flux Diagnostics Paper <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
