import { Link } from 'wouter';
import { articles } from '@/data/articles';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowRight, Calendar, Clock } from 'lucide-react';
import { useReveal } from '@/hooks/use-reveal';

export function BlogSection() {
  const { ref, isVisible } = useReveal();

  // First article is featured
  const featuredArticle = articles[0];
  // Rest of the articles
  const otherArticles = articles.slice(1);

  return (
    <section className="py-24 md:py-32 border-b border-border/30 bg-background relative overflow-hidden" dir="ltr">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,65,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary tracking-widest mb-4 border-s-2 border-primary ps-4">
            PUBLICATIONS // DETAILED_PROJECT_BLOG
          </h2>
          <h3 className="text-4xl md:text-5xl font-sans font-bold text-foreground">
            Technical Publications & Case Studies
          </h3>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl font-sans">
            In-depth technical explanations covering all engineering aspects of the project, from wiring and hardware integration to TinyML algorithms and real-time task scheduling.
          </p>
        </div>

        <div ref={ref} className={`space-y-12 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}>

          {/* Featured Article Card */}
          {featuredArticle && (
            <Card className="border-2 border-primary/30 bg-card/20 hover:bg-black/40 hover:border-primary/60 transition-all duration-500 overflow-hidden shadow-2xl relative group">
              <div className="absolute top-0 right-0 w-full h-[2px] bg-linear-to-l from-transparent via-primary/50 to-transparent group-hover:via-primary transition-all duration-700" />
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                  {/* Text details */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-primary">
                      <Badge className="bg-primary/20 border-primary text-primary hover:bg-primary/30 font-mono">
                        {featuredArticle.category}
                      </Badge>
                      <span className="text-muted-foreground">•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featuredArticle.date}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featuredArticle.readTime}</span>
                    </div>

                    <h4 className="text-2xl md:text-4xl font-bold font-sans text-foreground leading-[1.3] group-hover:text-primary transition-colors duration-300">
                      <Link href={`/article/${featuredArticle.id}`} className="hover:underline cursor-pointer">
                        {featuredArticle.title}
                      </Link>
                    </h4>

                    <p className="text-muted-foreground text-base md:text-lg font-sans leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>

                    <div>
                      <Link
                        href={`/article/${featuredArticle.id}`}
                        className="inline-flex items-center gap-2 font-mono text-sm text-primary border border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10 px-5 py-3 transition-all duration-300 group/btn cursor-pointer shadow-[inset_0_0_10px_rgba(0,255,65,0.02)]"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Read Full Research Paper</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Visual mockup of the article theme */}
                  <div className="lg:col-span-4 border border-border bg-black/80 p-6 font-mono text-[10px] text-muted-foreground leading-relaxed shadow-inner hidden lg:block relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.01)_1px,transparent_1px)] bg-size-[15px_15px] pointer-events-none" />
                    <div className="absolute top-0 right-0 w-full h-px bg-primary/20 animate-crt-scan" />

                    <div className="flex justify-between border-b border-border pb-1 mb-2 text-primary font-bold">
                      <span>ARTICLE_LOADER_v1.0</span>
                      <span>OK</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-foreground">// EXECUTIVE_SUMMARY</span>
                      <p className="text-[9px] line-clamp-4">
                        This paper demonstrates that low-cost edge computing utilizing microcontrollers can predict electrical motor failures before they occur by fusing kinetic, acoustic and magnetic data streams...
                      </p>
                    </div>
                    <div className="border-t border-border mt-3 pt-3 flex justify-between items-center text-[9px] text-primary">
                      <span>SYSTEM: READY</span>
                      <span>PAGE: 01/12</span>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          )}

          {/* Sub-articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            {otherArticles.map((art) => (
              <Card
                key={art.id}
                className="border border-border/50 bg-card/10 hover:bg-black/30 hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col justify-between group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-full h-px bg-linear-to-l from-transparent via-primary/0 to-transparent group-hover:via-primary/55 transition-all duration-500" />
                <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full space-y-6">

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-primary">
                      <Badge variant="outline" className="border-primary/30 text-primary font-mono text-[9px] py-0 px-2 bg-primary/5">
                        {art.category.split(' // ')[0]}
                      </Badge>
                      <span className="text-muted-foreground">•</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h4 className="text-xl font-bold font-sans text-foreground leading-[1.4] group-hover:text-primary transition-colors duration-300">
                      <Link href={`/article/${art.id}`} className="hover:underline cursor-pointer">
                        {art.title}
                      </Link>
                    </h4>

                    <p className="text-muted-foreground text-sm font-sans leading-relaxed line-clamp-4">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/20">
                    <Link
                      href={`/article/${art.id}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:opacity-80 transition-opacity cursor-pointer group/link"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
