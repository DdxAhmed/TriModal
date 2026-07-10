import { Hero } from '@/components/hero';
import { Impact } from '@/components/impact';
import { TriModal } from '@/components/tri-modal';
import { Intelligence } from '@/components/intelligence';
import { Simulator } from '@/components/simulator';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground crt-overlay selection:bg-primary/30 selection:text-primary">
      <div className="pointer-events-none fixed inset-0 z-50 animate-crt-scan" />
      <Hero />
      <Impact />
      <TriModal />
      <Intelligence />
      <Simulator />
      <Footer />
    </main>
  );
}
