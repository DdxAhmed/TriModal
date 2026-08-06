import { useEffect } from 'react';
import { ParticleBackground } from '@/components/ui/particle-background';
import { Hero } from '@/components/hero';
import { Impact } from '@/components/impact';
import { TriModal } from '@/components/tri-modal';
import { Simulator } from '@/components/simulator';
import { Intelligence } from '@/components/intelligence';
import { TeamSection } from '@/components/team-section';
import { MentionsSection } from '@/components/mentions-section';
import { Footer } from '@/components/footer';

export default function Home() {
  useEffect(() => {
    document.title = "EdgeGuard AI - Tri-Modal Predictive Maintenance & Edge AI Motor Protection";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "EdgeGuard AI: A bare-metal ESP32 predictive maintenance platform. Fusing kinetic, acoustic, and magnetic data with on-device TinyML for sub-5ms motor protection.");
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground crt-overlay selection:bg-primary/30 selection:text-primary relative overflow-hidden">
      <ParticleBackground />
      <div className="pointer-events-none fixed inset-0 z-50 animate-crt-scan" />
      <Hero />
      <TriModal />
      <Simulator />
      <Intelligence />
      <Impact />
      <TeamSection />
      <MentionsSection />
      <Footer />
    </main>
  );
}
