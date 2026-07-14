import { Facebook, Link2, ExternalLink } from 'lucide-react';
import { useReveal } from '@/hooks/use-reveal';

interface Mention {
  source: string;
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

export function MentionsSection() {
  const { ref, isVisible } = useReveal();

  const mentions: Mention[] = [
    {
      source: "Facebook Showcase",
      title: "Embedded Systems Community Spotlight",
      description: "Our tri-modal predictive maintenance prototype was featured in the community, showcasing the hardware integration and ESP32 multi-threading performance.",
      url: "https://www.facebook.com/share/p/192trKKWo5/",
      icon: <Facebook className="w-5 h-5 text-primary" aria-hidden="true" />
    }
  ];

  return (
    <section className="py-20 border-b border-border/30 bg-black/60 relative overflow-hidden" dir="ltr" aria-labelledby="mentions-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.015)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12">
          <span className="text-sm font-mono text-primary tracking-widest mb-3 uppercase block">
            // PUBLICITY_AND_MENTIONS
          </span>
          <h2 id="mentions-heading" className="text-3xl font-sans font-bold text-foreground">Featured In & Mentions</h2>
        </div>

        <div 
          ref={ref} 
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
            isVisible ? 'reveal-visible' : 'reveal-hidden'
          }`}
        >
          {mentions.map((mention, i) => (
            <a
              key={i}
              href={mention.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border border-border bg-card/10 p-6 hover:bg-black hover:border-primary/50 transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-xl"
              aria-label={`Read post at ${mention.source}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-primary bg-primary/5 border border-primary/20 px-2.5 py-1 rounded-sm flex items-center gap-2">
                    {mention.icon}
                    {mention.source}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                </div>
                
                <h3 className="text-xl font-bold font-sans text-foreground group-hover:text-primary transition-colors">
                  {mention.title}
                </h3>
                
                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  {mention.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/20 flex items-center gap-2 text-xs font-mono text-primary/70 group-hover:text-primary transition-colors">
                <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="truncate max-w-xs">{mention.url}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
