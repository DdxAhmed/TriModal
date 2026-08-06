import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground crt-overlay relative p-6" dir="ltr">
      <div className="pointer-events-none fixed inset-0 z-50 animate-crt-scan" />
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-20" />
      
      <Card className="w-full max-w-md bg-card/40 border border-primary/30 shadow-[0_0_30px_rgba(0,255,65,0.05)] backdrop-blur-md rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/25" />
        <CardContent className="pt-8 pb-8 px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <AlertCircle className="h-8 w-8 text-primary animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-mono font-bold text-foreground tracking-widest">
              404 // NOT_FOUND
            </h1>
            <p className="text-xs font-mono text-muted-foreground">
              ERROR_CODE: PAGE_UNRESOLVED_BY_ROUTER
            </p>
          </div>

          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            The requested technical coordinate does not exist. The sensor channel has been disconnected.
          </p>

          <div className="pt-4 border-t border-border/40">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-primary border border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10 px-4 py-2.5 rounded transition-all cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN_TO_CONTROL_ROOM</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
