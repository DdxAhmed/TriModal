import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/hooks/use-language';
import { Globe, Menu, X } from 'lucide-react';

export function Navbar() {
  const [location] = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0e17]/85 backdrop-blur-md border-b border-border/40 font-mono text-sm py-4 shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link 
          href="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 text-primary hover:opacity-85 transition-opacity cursor-pointer"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse-fast shadow-[0_0_10px_#3b82f6]" />
          <span className="font-bold tracking-widest text-foreground glow-text-blue" dir="ltr">EDGEGUARD_AI</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-sans">
          <div className="flex gap-6">
            <Link
              href="/"
              className={`hover:text-primary transition-all duration-200 cursor-pointer ${location === '/'
                  ? 'text-primary font-bold shadow-[0_2px_0_hsl(var(--primary))]'
                  : 'text-muted-foreground'
                }`}
            >
              {t('nav_home')}
            </Link>
            <Link
              href="/motors"
              className={`hover:text-primary transition-all duration-200 cursor-pointer ${location.startsWith('/motors')
                  ? 'text-primary font-bold shadow-[0_2px_0_hsl(var(--primary))]'
                  : 'text-muted-foreground'
                }`}
            >
              {t('nav_motors')}
            </Link>
            <Link
              href="/live"
              className={`hover:text-primary transition-all duration-200 cursor-pointer ${location === '/live'
                  ? 'text-primary font-bold shadow-[0_2px_0_hsl(var(--primary))]'
                  : 'text-muted-foreground'
                }`}
            >
              {t('nav_live')}
            </Link>
          </div>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 border border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10 text-primary font-mono text-xs cursor-pointer rounded-lg transition-all select-none"
            aria-label="Switch Language / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Language Toggle Button on Mobile */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-primary/30 bg-primary/5 text-primary font-mono text-xs cursor-pointer rounded-lg transition-all"
            aria-label="Switch Language / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          {/* Mobile Hamburger Menu Trigger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-white/10 bg-white/5 text-foreground hover:bg-white/10 rounded-lg transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphism Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0e17]/95 backdrop-blur-xl px-6 py-6 font-sans space-y-4 shadow-2xl animate-reveal-up">
          <div className="flex flex-col space-y-3 font-medium text-base">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                location === '/'
                  ? 'bg-primary/10 text-primary border-primary/40 font-bold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5 border-transparent'
              }`}
            >
              {t('nav_home')}
            </Link>

            <Link
              href="/motors"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                location.startsWith('/motors')
                  ? 'bg-primary/10 text-primary border-primary/40 font-bold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5 border-transparent'
              }`}
            >
              {t('nav_motors')}
            </Link>

            <Link
              href="/live"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                location === '/live'
                  ? 'bg-primary/10 text-primary border-primary/40 font-bold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5 border-transparent'
              }`}
            >
              {t('nav_live')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
