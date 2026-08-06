import { Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useReveal } from '@/hooks/use-reveal';
import { Badge } from '@/components/ui/badge';
import { articles } from '@/data/articles';

export function BlogSection() {
  const { ref, isVisible } = useReveal();

  const featuredArticle = articles.find(a => a.id === 'edge-prognostics-main');
  const otherArticles = articles.filter(a => a.id !== 'edge-prognostics-main');

  return (
    <section className="py-24 md:py-32 border-b border-border/30 bg-background relative overflow-hidden" dir="ltr" aria-labelledby="publications-heading">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,65,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="mb-16">
          <span className="text-sm font-mono text-primary tracking-widest mb-4 border-s-2 border-primary ps-4 block">
            PUBLICATIONS // DETAILED_PROJECT_BLOG
          </span>
          <h2 id="publications-heading" className="text-4xl md:text-5xl font-sans font-bold text-foreground">
            Technical Publications & Case Studies
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl font-sans">
            In-depth technical explanations covering all engineering aspects of the project, from wiring and hardware integration to TinyML algorithms and real-time task scheduling.
          </p>
        </div>

        <div ref={ref} className={`space-y-12 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>

          {/* Featured Article Card (Research Paper - Blue) */}
          {featuredArticle && (
            <article className="border-2 border-blue-500/40 bg-card/40 hover:bg-black/40 hover:border-blue-500/80 transition-all duration-500 overflow-hidden shadow-2xl relative group rounded-xl glow-border-blue">
              <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent group-hover:via-blue-400 transition-all duration-700" />
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                  {/* Text details */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-blue-400">
                      <Badge className="bg-blue-500/20 border-blue-500/60 text-blue-400 hover:bg-blue-500/30 font-mono">
                        {featuredArticle.category}
                      </Badge>
                      <span className="text-muted-foreground">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        {featuredArticle.date}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-bold font-sans text-foreground leading-[1.3] group-hover:text-blue-400 transition-colors duration-300">
                      <Link href={`/article/${featuredArticle.id}`} className="hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded-sm">
                        {featuredArticle.title}
                      </Link>
                    </h3>

                    <p className="text-muted-foreground text-base md:text-lg font-sans leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>

                    <div>
                      <Link
                        href={`/article/${featuredArticle.id}`}
                        className="inline-flex items-center gap-2 font-mono text-sm text-blue-400 border border-blue-500/40 hover:border-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-5 py-3 transition-all duration-300 group/btn cursor-pointer rounded-lg shadow-[inset_0_0_10px_rgba(59,130,246,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <BookOpen className="w-4 h-4" aria-hidden="true" />
                        <span>Read Full Research Paper</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  {/* Visual mockup of the article theme */}
                  <div className="lg:col-span-4 border border-blue-500/30 bg-black/80 p-6 font-mono text-[10px] text-muted-foreground leading-relaxed shadow-inner hidden lg:block relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-size-[15px_15px] pointer-events-none" />
                    <div className="absolute top-0 right-0 w-full h-px bg-blue-400/40 animate-crt-scan" />

                    <div className="flex justify-between border-b border-blue-500/30 pb-1 mb-2 text-blue-400 font-bold">
                      <span>RESEARCH_PAPER_v1.0</span>
                      <span>PEER_REVIEWED</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-foreground">// EXECUTIVE_SUMMARY</span>
                      <p className="text-[9px] line-clamp-4">
                        This paper demonstrates that low-cost edge computing utilizing microcontrollers can predict electrical motor failures before they occur by fusing kinetic, acoustic and magnetic data streams...
                      </p>
                    </div>
                    <div className="border-t border-blue-500/30 mt-3 pt-3 flex justify-between items-center text-[9px] text-blue-400">
                      <span>STATUS: PUBLISHED</span>
                      <span>PAGE: 01/12</span>
                    </div>
                  </div>

                </div>
              </div>
            </article>
          )}

          {/* Sub-articles grid with 3 distinct colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            {otherArticles.map((art, index) => {
              // Map index to specific colors:
              // Index 0 (Hardware Guide) -> Emerald Green (#10b981)
              // Index 1 (TinyML Algorithms) -> Amber/Orange (#f59e0b)
              // Index 2 (FreeRTOS Scheduling) -> Violet/Purple (#8b5cf6)
              const colorSchemes = [
                {
                  border: 'border-emerald-500/40 hover:border-emerald-400',
                  bgHover: 'hover:bg-emerald-950/20',
                  glow: 'glow-border-emerald',
                  topLine: 'via-emerald-400',
                  badge: 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400',
                  textHover: 'group-hover:text-emerald-400',
                  linkText: 'text-emerald-400'
                },
                {
                  border: 'border-amber-500/40 hover:border-amber-400',
                  bgHover: 'hover:bg-amber-950/20',
                  glow: 'glow-border-amber',
                  topLine: 'via-amber-400',
                  badge: 'bg-amber-500/15 border-amber-500/50 text-amber-400',
                  textHover: 'group-hover:text-amber-400',
                  linkText: 'text-amber-400'
                },
                {
                  border: 'border-purple-500/40 hover:border-purple-400',
                  bgHover: 'hover:bg-purple-950/20',
                  glow: 'glow-border-purple',
                  topLine: 'via-purple-400',
                  badge: 'bg-purple-500/15 border-purple-500/50 text-purple-400',
                  textHover: 'group-hover:text-purple-400',
                  linkText: 'text-purple-400'
                }
              ];
              const scheme = colorSchemes[index % colorSchemes.length];

              return (
                <article
                  key={art.id}
                  className={`border ${scheme.border} bg-card/30 ${scheme.bgHover} hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col justify-between group overflow-hidden relative rounded-xl ${scheme.glow}`}
                >
                  <div className={`absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent ${scheme.topLine} to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                  <div className="p-6 md:p-8 flex flex-col justify-between h-full space-y-6">

                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono">
                        <Badge variant="outline" className={`${scheme.badge} font-mono text-[9px] py-0.5 px-2.5`}>
                          {art.category.split(' // ')[0]}
                        </Badge>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{art.readTime}</span>
                      </div>

                      <h3 className={`text-xl font-bold font-sans text-foreground leading-[1.4] ${scheme.textHover} transition-colors duration-300`}>
                        <Link href={`/article/${art.id}`} className="hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm">
                          {art.title}
                        </Link>
                      </h3>

                      <p className="text-muted-foreground text-sm font-sans leading-relaxed line-clamp-4">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/30">
                      <Link
                        href={`/article/${art.id}`}
                        className={`inline-flex items-center gap-1.5 font-mono text-xs ${scheme.linkText} hover:opacity-80 transition-opacity cursor-pointer group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm`}
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
