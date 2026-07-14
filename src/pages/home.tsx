import { useEffect } from 'react';
import { Hero } from '@/components/hero';
import { BlogSection } from '@/components/blog-section';
import { Impact } from '@/components/impact';
import { TriModal } from '@/components/tri-modal';
import { Intelligence } from '@/components/intelligence';
import { TeamSection } from '@/components/team-section';
import { MentionsSection } from '@/components/mentions-section';
import { Footer } from '@/components/footer';

export default function Home() {
  useEffect(() => {
    document.title = "Tri-Modal Edge Predictive Maintenance Suite | Home & Blog";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore in-depth technical blogs and research on bare-metal multi-physics sensor fusion and edge AI anomaly detection on ESP32 microcontrollers.");
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground crt-overlay selection:bg-primary/30 selection:text-primary">
      <div className="pointer-events-none fixed inset-0 z-50 animate-crt-scan" />
      <Hero />
      <BlogSection />
      <Impact />
      <TriModal />
      <Intelligence />
      <TeamSection />
      <MentionsSection />
      <Footer />
    </main>
  );
}
