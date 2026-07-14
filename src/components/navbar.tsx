import { Link, useLocation } from 'wouter';

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-md border-b border-border/30 font-mono text-sm py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 text-primary hover:opacity-85 transition-opacity cursor-pointer">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-fast shadow-[0_0_8px_hsl(var(--primary))]" />
          <span className="font-bold tracking-widest" dir="ltr">EDGEGUARD_AI</span>
        </Link>
        <div className="flex gap-8 font-sans">
          <Link
            href="/"
            className={`hover:text-primary transition-all duration-200 cursor-pointer ${location === '/'
                ? 'text-primary font-bold shadow-[0_2px_0_hsl(var(--primary))]'
                : 'text-muted-foreground'
              }`}
          >
            Home & Blog
          </Link>
          <Link
            href="/article"
            className={`hover:text-primary transition-all duration-200 cursor-pointer ${location.startsWith('/article')
                ? 'text-primary font-bold shadow-[0_2px_0_hsl(var(--primary))]'
                : 'text-muted-foreground'
              }`}
          >
            Articles & Technical Study
          </Link>
        </div>
      </div>
    </nav>
  );
}
