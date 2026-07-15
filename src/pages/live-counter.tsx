import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Trash2, 
  Loader2, 
  Award,
  TrendingUp,
  Flame,
  Phone,
  Hash
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// -------------------------------------------------------------
// Web Audio API Synthesizer Beep
// -------------------------------------------------------------
const playSyntheticBeep = (freq = 880, duration = 0.15) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error('AudioContext initialization failed', e);
  }
};

// -------------------------------------------------------------
// Single Digit Rolling Component
// -------------------------------------------------------------
interface DigitProps {
  value: string;
}

function Digit({ value }: DigitProps) {
  const num = parseInt(value, 10);
  const isDigit = !isNaN(num);

  if (!isDigit) {
    return (
      <span className="text-primary px-1 font-mono text-5xl md:text-8xl animate-pulse">
        {value}
      </span>
    );
  }

  return (
    <div className="relative h-24 md:h-36 w-14 md:w-20 overflow-hidden bg-black/75 border-2 border-primary/30 rounded-lg shadow-[0_0_20px_rgba(0,255,65,0.15),inset_0_0_15px_rgba(0,255,65,0.1)] flex items-center justify-center font-mono font-bold text-5xl md:text-8xl text-primary glow-text">
      {/* Glossy Reflection overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none z-10" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/20 pointer-events-none z-10" />
      
      <div
        className="absolute top-0 flex flex-col transition-transform duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ transform: `translateY(-${num * 10}%)`, height: '1000%' }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div key={n} className="h-24 md:h-36 flex items-center justify-center select-none">
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

const API_BASE = import.meta.env.VITE_API_URL || 'https://trimodalserver-557162805103.europe-west1.run.app';

// -------------------------------------------------------------
// Live Counter Page
// -------------------------------------------------------------
export default function LiveCounter() {
  const { toast } = useToast();
  
  // UI and Votes state
  const [votesCount, setVotesCount] = useState<number>(0);
  const [inputPhone, setInputPhone] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Voting status state
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [savedPhoneNumber, setSavedPhoneNumber] = useState<string>('');
  
  // Audio state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Chart and history state
  const [historyData, setHistoryData] = useState<{ time: string; count: number }[]>([]);
  const prevVotesCountRef = useRef<number>(0);

  // Setup Document details
  useEffect(() => {
    document.title = "EdgeGuard AI - Live Motor Protection Votes Counter";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Track the real-time vote count for the EdgeGuard AI Motor Protection System live, YouTube-style!");
    }

    // Initialize saved phone number from localStorage
    const saved = localStorage.getItem('voted_phone_number');
    if (saved) {
      setSavedPhoneNumber(saved);
      setHasVoted(true);
      // Double check vote status with backend on load
      checkVoteOnBackend(saved);
    }

    // Prepopulate chart history with starting data points so the chart is filled immediately
    const now = new Date();
    const mockHistory = Array.from({ length: 10 }).map((_, i) => {
      const timeStr = new Date(now.getTime() - (10 - i) * 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      return { time: timeStr, count: 0 };
    });
    setHistoryData(mockHistory);
  }, []);

  // Hide/Show floating widget on mount/unmount using CSS injection for reliability
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'hide-poster-vote-widget-style';
    style.innerHTML = '#poster-vote-widget { display: none !important; }';
    document.head.appendChild(style);
    
    return () => {
      const el = document.getElementById('hide-poster-vote-widget-style');
      if (el) el.remove();
    };
  }, []);

  // Check if phone has voted on backend
  const checkVoteOnBackend = async (phone: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/vote/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone })
      });
      const data = await res.json();
      if (data.exists) {
        setHasVoted(true);
      } else {
        // Stale localStorage
        localStorage.removeItem('voted_phone_number');
        setSavedPhoneNumber('');
        setHasVoted(false);
      }
    } catch (e) {
      console.error('Error verifying vote:', e);
    }
  };

  // Poll Vote Count from API every 1.5 seconds
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/vote/count`);
        if (!res.ok) throw new Error("Backend response error");
        const data = await res.json();
        const currentCount = data.totalVotes ?? data.count ?? 0;
        
        // Play synthetic beep sound if vote increases
        if (prevVotesCountRef.current !== null && currentCount > prevVotesCountRef.current) {
          if (soundEnabled) {
            playSyntheticBeep(987.77, 0.12); // High beep
            setTimeout(() => playSyntheticBeep(1318.51, 0.2), 60); // Bouncy double-beep
          }
          toast({
            title: "System Update // تحديث النظام",
            description: `A new vote has been logged! Total: ${currentCount} // تم تسجيل صوت جديد! الإجمالي: ${currentCount}`,
            className: "border-primary text-primary bg-black/90 font-mono shadow-[0_0_15px_rgba(0,255,65,0.3)]",
          });
        } else if (prevVotesCountRef.current !== null && currentCount < prevVotesCountRef.current) {
          if (soundEnabled) {
            playSyntheticBeep(440, 0.2); // Low beep for unvote
          }
        }
        prevVotesCountRef.current = currentCount;
        setVotesCount(currentCount);

        // Add to history for chart
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setHistoryData((prevHist) => {
          const newHist = [...prevHist, { time: timeStr, count: currentCount }];
          if (newHist.length > 15) {
            newHist.shift(); // Keep last 15 ticks
          }
          return newHist;
        });
      } catch (err) {
        console.error('Error fetching live votes:', err);
      }
    };

    fetchCount(); // Initial fetch
    const interval = setInterval(fetchCount, 1500);
    return () => clearInterval(interval);
  }, [soundEnabled]);

  // Handle Vote submission
  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = inputPhone.trim();
    if (!phone) {
      toast({
        variant: "destructive",
        title: "Input Error // خطأ في الإدخال",
        description: "Please enter a valid mobile number. // يرجى إدخال رقم هاتف صالح.",
      });
      return;
    }

    // Permissive format check
    if (!/^\+?\d{8,20}$/.test(phone)) {
      toast({
        variant: "destructive",
        title: "Invalid Format // تنسيق غير صالح",
        description: "Mobile number should be between 8 and 20 digits. // يجب أن يتكون رقم الهاتف من 8 إلى 20 رقماً.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone })
      });
      
      const data = await res.json();
      setIsLoading(false);

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem('voted_phone_number', phone);
        setSavedPhoneNumber(phone);
        setHasVoted(true);
        setInputPhone('');
        
        toast({
          title: "Vote Confirmed // تم تأكيد التصويت",
          description: `Your vote has been recorded successfully for number ${phone}! // تم تسجيل تصويتك بنجاح للرقم ${phone}!`,
          className: "border-primary text-primary bg-black/90 font-mono shadow-[0_0_15px_rgba(0,255,65,0.4)]",
        });
        
        // Force refresh total count in state immediately
        const newCount = data.totalVotes ?? (votesCount + 1);
        setVotesCount(newCount);
        prevVotesCountRef.current = newCount;
      } else {
        toast({
          variant: "destructive",
          title: "Action Rejected // تم رفض العملية",
          description: data.message || data.error || "This number has already voted! // هذا الرقم قام بالتصويت بالفعل!",
        });
        
        // If they already voted, sync state
        if (res.status === 400 && (data.error?.includes("already voted") || data.message?.includes("already voted"))) {
          localStorage.setItem('voted_phone_number', phone);
          setSavedPhoneNumber(phone);
          setHasVoted(true);
          setInputPhone('');
        }
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Connection Failed // فشل الاتصال",
        description: "Could not reach the voting system server. // تعذر الاتصال بخادم نظام التصويت.",
      });
    }
  };

  // Handle Unvote submission
  const handleUnvoteSubmit = async () => {
    const phone = savedPhoneNumber;
    if (!phone) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/unvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone })
      });
      
      const data = await res.json();
      setIsLoading(false);

      if (res.status === 200) {
        localStorage.removeItem('voted_phone_number');
        setSavedPhoneNumber('');
        setHasVoted(false);
        setInputPhone('');
        
        toast({
          title: "Vote Revoked // تم إلغاء التصويت",
          description: "Your vote has been removed successfully. // تم حذف تصويتك بنجاح من النظام.",
          className: "border-destructive text-destructive bg-black/90 font-mono shadow-[0_0_15px_rgba(239,68,68,0.4)]",
        });
        
        // Force refresh total count in state immediately
        const newCount = data.totalVotes ?? Math.max(0, votesCount - 1);
        setVotesCount(newCount);
        prevVotesCountRef.current = newCount;
      } else {
        toast({
          variant: "destructive",
          title: "Revocation Failed // فشل إلغاء التصويت",
          description: data.message || data.error || "Could not complete request.",
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Connection Failed // فشل الاتصال",
        description: "Could not reach the server.",
      });
    }
  };

  // Pad the count string to at least 4 digits for YouTube live counter feel
  const countStr = votesCount.toString().padStart(4, '0');
  const digits = countStr.split('');

  return (
    <main className="min-h-screen bg-background text-foreground crt-overlay py-24 select-none selection:bg-primary/30 selection:text-primary" dir="ltr">
      <div className="pointer-events-none fixed inset-0 z-50 animate-crt-scan" />
      
      {/* Cybernetic grid background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,65,0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:opacity-80 transition-opacity group cursor-pointer">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK_TO_CORE_DASHBOARD</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="mb-10 text-center border-b border-border/20 pb-8 relative">
          <div className="absolute top-0 right-0 flex items-center gap-2 bg-black/60 border border-primary/20 rounded-md px-3 py-1.5 font-mono text-xs text-primary shadow-[0_0_10px_rgba(0,255,65,0.1)]">
            <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
            <span className="tracking-widest uppercase">LIVE FEED // بث مباشر</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-4 tracking-widest">
            <Award className="w-3.5 h-3.5 animate-bounce" />
            <span>EDGEGUARD_AI_UPVOTES</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tight mb-4 text-foreground glow-text">
            Motor Protection Upvote Live Counter
          </h1>
          
          <p className="text-base text-muted-foreground font-mono max-w-2xl mx-auto leading-relaxed">
            Real-time sub-second tracker for the next-generation predictive maintenance system.
            <br />
            <span className="text-primary/80">عداد تصويت حي لنظام حماية المحركات وحساب الأعطال الاستباقي.</span>
          </p>
        </header>

        {/* Main Live Counter Panel */}
        <section className="mb-10 flex flex-col items-center justify-center">
          <div className="w-full bg-black/40 border border-primary p-8 rounded-xl shadow-[0_0_35px_rgba(0,255,65,0.08),inset_0_0_20px_rgba(0,255,65,0.05)] relative overflow-hidden flex flex-col items-center justify-center">
            
            {/* Background design matrix */}
            <div className="absolute top-2 left-3 font-mono text-[9px] text-primary/40 tracking-wider">
              SYS_TELEMETRY // CLIENTS_CONNECTED
            </div>
            
            <button 
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playSyntheticBeep(1200, 0.08);
              }}
              className="absolute top-2 right-3 font-mono text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1.5 bg-black/50 border border-border px-2 py-1 rounded transition-colors"
              title={soundEnabled ? "Mute beep sound" : "Unmute beep sound"}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3 h-3 text-primary" />
                  <span className="text-primary font-bold text-[9px]">SFX: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 text-destructive" />
                  <span className="text-destructive font-bold text-[9px]">SFX: OFF</span>
                </>
              )}
            </button>

            {/* Sub Counter Header */}
            <span className="font-mono text-xs text-primary/80 tracking-[0.25em] uppercase mb-6 flex items-center gap-2">
              <Flame className="w-4 h-4 text-primary animate-pulse" />
              TOTAL MOTOR SECURITY UPVOTES // إجمالي الأصوات المسجلة
            </span>

            {/* Giant YouTube Live Counters */}
            <div className="flex gap-2 md:gap-3 py-6 px-10 bg-black/30 rounded-xl border border-primary/10 shadow-inner">
              {digits.map((digit, idx) => (
                <Digit key={idx} value={digit} />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Active Poll: 1500ms
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Hash className="w-3.5 h-3.5" />
                MongoDB Atlas Local
              </span>
              <span>•</span>
              <span className="text-primary font-bold">Auto-Sync Enabled</span>
            </div>
          </div>
        </section>

        {/* Voting & Unvoting Form Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Action Card (Vote or Unvote) */}
          <Card className="bg-black/30 border border-border hover:border-primary/40 transition-all duration-300 shadow-md">
            <CardHeader className="border-b border-border/20 pb-4">
              <CardTitle className="text-lg font-mono text-primary flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>[SUBMIT_VOTE_OR_CANCEL]</span>
              </CardTitle>
              <CardDescription className="text-xs font-sans text-muted-foreground">
                Vote with your mobile phone number to test the backend integration.
                <br />
                <span className="text-primary/70">قم بالتصويت برقم هاتفك للتحقق من الاتصال بقاعدة البيانات.</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              
              {!hasVoted ? (
                // Vote Form
                <form onSubmit={handleVoteSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      ENTER MOBILE NUMBER // رقم الهاتف المحمول:
                    </label>
                    <div className="relative">
                      <Input
                        type="tel"
                        placeholder="e.g. +201012345678"
                        value={inputPhone}
                        onChange={(e) => setInputPhone(e.target.value)}
                        className="bg-black/50 border-primary/40 text-primary focus:border-primary font-mono text-sm placeholder:text-muted-foreground/40 pr-10"
                        disabled={isLoading}
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-primary/40 font-mono">
                        TEL
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-muted-foreground/60 leading-normal">
                      Accepts digits only. Unique index on phone guarantees no duplicates.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/95 text-black font-mono font-bold tracking-wider text-xs py-5 uppercase cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        PROCESSING_VOTE...
                      </>
                    ) : (
                      "SUBMIT VOTE // إرسال التصويت"
                    )}
                  </Button>
                </form>
              ) : (
                // Already Voted / Unvote Card
                <div className="space-y-5 text-center py-2">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-left">
                    <div className="text-[10px] font-mono text-primary/70 mb-1">VOTING_RECORD_FOUND</div>
                    <div className="font-mono text-sm text-foreground flex justify-between items-center">
                      <span>PHONE: <strong className="text-primary">{savedPhoneNumber}</strong></span>
                      <Badge variant="outline" className="border-primary text-primary bg-primary/5 text-[9px] uppercase font-mono animate-pulse">
                        Registered
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground leading-relaxed text-left font-sans">
                    You have already voted from this device! You can cancel or clear your vote below to test the database delete command.
                    <br />
                    <span className="text-destructive/80 font-mono text-[11px]">لقد قمت بالتصويت بالفعل. يمكنك سحب صوتك لإعادة التجربة.</span>
                  </div>

                  <Button 
                    onClick={handleUnvoteSubmit}
                    variant="destructive"
                    className="w-full hover:bg-destructive/90 text-white font-mono font-bold tracking-wider text-xs py-5 uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        REMOVING_VOTE...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>CANCEL VOTE // إلغاء التصويت</span>
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Educational / Verification Card */}
          <Card className="bg-black/30 border border-border hover:border-primary/40 transition-all duration-300 shadow-md">
            <CardHeader className="border-b border-border/20 pb-4">
              <CardTitle className="text-lg font-mono text-primary flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>[VERIFICATION_SPECS]</span>
              </CardTitle>
              <CardDescription className="text-xs font-sans text-muted-foreground">
                How our voting backend prevents duplicates at the database layer.
                <br />
                <span className="text-primary/70">كيف يمنع السيرفر تكرار الأصوات على مستوى قاعدة البيانات.</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 font-mono text-[11px] text-muted-foreground space-y-4">
              <div>
                <span className="text-primary block font-bold mb-1">1. MongoDB Unique Index // الفهرس الفريد</span>
                <p className="leading-relaxed">
                  Both <code className="bg-black px-1 text-foreground">mobile</code> and <code className="bg-black px-1 text-foreground">phoneNumber</code> fields contain a <strong className="text-foreground">Unique Sparse Index</strong>. Duplicate records are blocked instantly at database-level.
                </p>
              </div>
              <div className="border-t border-border/10 pt-3">
                <span className="text-primary block font-bold mb-1">2. Endpoint Mappings // مسارات الـ API</span>
                <ul className="space-y-1 text-[10px]">
                  <li>• <strong className="text-foreground">POST /api/vote:</strong> Records unique number.</li>
                  <li>• <strong className="text-foreground">POST /api/unvote:</strong> Deletes voting number.</li>
                  <li>• <strong className="text-foreground">GET /api/vote/count:</strong> Pulls absolute counts.</li>
                </ul>
              </div>
              <div className="border-t border-border/10 pt-3">
                <span className="text-primary block font-bold mb-1">3. Live Telemetry Polling // التحديث الحي</span>
                <p className="leading-relaxed">
                  This interface uses active delta checking to pull statistics every 1.5s, allowing multiple users to vote and watch the counter live.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Real-time Trend Graph */}
        <section className="mb-8">
          <Card className="bg-black/40 border border-primary/20 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6 border-b border-border/20 pb-4">
              <div>
                <h3 className="text-lg font-mono text-primary flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>[VOTES_ACTIVITY_TREND]</span>
                </h3>
                <p className="text-xs text-muted-foreground font-sans mt-0.5">
                  Visual graph plotting incoming vote density over the last 15 ticks.
                </p>
              </div>
              <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 font-mono text-[9px] uppercase">
                REALTIME_FLOW
              </Badge>
            </div>
            
            <div className="h-64 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyData}>
                  <defs>
                    <linearGradient id="liveCounterColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    stroke="#444" 
                    fontSize={9} 
                    fontFamily="JetBrains Mono"
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#444" 
                    fontSize={9} 
                    fontFamily="JetBrains Mono"
                    tickLine={false}
                    domain={['dataMin - 1', 'dataMax + 1']}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(9, 9, 9, 0.95)', 
                      borderColor: 'hsl(var(--primary) / 0.3)', 
                      color: '#fff',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '11px',
                      boxShadow: '0 0 15px rgba(0, 255, 65, 0.15)'
                    }} 
                  />
                  <Area 
                    name="Upvotes Count" 
                    type="monotone" 
                    dataKey="count" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#liveCounterColor)" 
                    strokeWidth={2} 
                    activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--primary))" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Technical help section */}
        <section className="text-center font-mono text-[10px] text-muted-foreground/60 border-t border-border/10 pt-6">
          <span>EDGEGUARD_AI SYSTEM CONTROLLERS // BUILT FOR MICROSECOND RELIABILITY</span>
        </section>
      </div>
    </main>
  );
}
