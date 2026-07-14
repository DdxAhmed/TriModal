import { Hero } from '@/components/hero';
import { BlogSection } from '@/components/blog-section';
import { Impact } from '@/components/impact';
import { TriModal } from '@/components/tri-modal';
import { Intelligence } from '@/components/intelligence';
import { TeamSection } from '@/components/team-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground crt-overlay selection:bg-primary/30 selection:text-primary">
      <div className="pointer-events-none fixed inset-0 z-50 animate-crt-scan" />
      <Hero />
      <BlogSection />
      <Impact />
      <TriModal />
      <Intelligence />
      <TeamSection />
      <Footer />
    </main>
  );
}

