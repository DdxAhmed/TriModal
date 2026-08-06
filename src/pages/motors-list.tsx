import { useState, useMemo, useEffect } from 'react';
import { motorsData, getUniqueCategories, getUniqueFamilies } from '@/data/motors';
import { MotorCard } from '@/components/motor-card';
import { Footer } from '@/components/footer';
import { updateSeoMeta } from '@/lib/meta';
import { Filter, Database, Cpu, Search } from 'lucide-react';

export default function MotorsList() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    updateSeoMeta({
      title: "Motor Research Matrix & Knowledge Base | EdgeGuard AI",
      description: "Engineering reference repository detailing AC & DC electric motor topologies, mathematical failure mechanics, and EdgeGuard tri-modal sensor fusion detection protocols.",
      url: "https://tri-modal.site/motors"
    });
  }, []);

  const categories = useMemo(() => ['All', ...getUniqueCategories()], []);
  const families = useMemo(() => ['All', ...getUniqueFamilies()], []);

  const filteredMotors = useMemo(() => {
    return motorsData.filter((motor) => {
      const matchCategory =
        selectedCategory === 'All' || motor.category === selectedCategory;
      const matchFamily =
        selectedFamily === 'All' || motor.family === selectedFamily;
      const matchSearch =
        searchQuery === '' ||
        motor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        motor.overview.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchFamily && matchSearch;
    });
  }, [selectedCategory, selectedFamily, searchQuery]);

  return (
    <main className="min-h-screen bg-background text-foreground crt-overlay pt-24 pb-16 selection:bg-primary/30 selection:text-primary">
      <div className="pointer-events-none fixed inset-0 z-50 animate-crt-scan" />

      <div className="container mx-auto px-6">
        {/* Top Header Banner */}
        <section className="mb-12 border-b border-border/30 pb-8">
          <div className="flex items-center gap-3 text-xs font-mono text-primary mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>KNOWLEDGE_BASE // MULTI-PHYSICS_MOTOR_TAXONOMY</span>
          </div>

          <h1 className="font-mono text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 glow-text">
            Motor Research Matrix
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-3xl font-sans leading-relaxed">
            Engineering reference repository detailing AC & DC electric motor topologies, mathematical failure mechanics, and EdgeGuard tri-modal sensor fusion detection protocols.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-muted-foreground">
            <div className="bg-card/40 border border-border/40 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-cyan" />
              <span>Cataloged Topologies: <strong className="text-foreground">{motorsData.length}</strong></span>
            </div>
            <div className="bg-card/40 border border-border/40 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-primary" />
              <span>Sensor Fusion Rules: <strong className="text-foreground">Tri-Modal (Kinetic + Acoustic + Magnetic)</strong></span>
            </div>
          </div>
        </section>

        {/* Filters & Search Control Bar */}
        <section className="mb-8 flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center glass-card p-4 sm:p-5 rounded-xl">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground mr-1.5 flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-primary" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer hover-lift ${
                  selectedCategory === cat
                    ? 'bg-blue-500 text-black border-blue-500 font-bold shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                    : 'bg-white/5 hover:bg-white/10 text-muted-foreground border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Family & Search Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Family Select */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label htmlFor="family-filter" className="font-mono text-xs text-muted-foreground shrink-0">Family:</label>
              <select
                id="family-filter"
                value={selectedFamily}
                onChange={(e) => setSelectedFamily(e.target.value)}
                className="bg-black/70 border border-white/15 text-foreground font-mono text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 cursor-pointer w-full sm:w-auto"
              >
                {families.map((fam) => (
                  <option key={fam} value={fam}>
                    {fam} {fam === 'All' ? 'Families' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search motor topology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/70 border border-white/15 text-foreground font-mono text-xs rounded-lg pl-8 pr-3 py-2 w-full focus:outline-none focus:border-blue-400 placeholder:text-muted-foreground/60"
              />
            </div>
          </div>
        </section>

        {/* Motor Cards Grid */}
        {filteredMotors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredMotors.map((motor) => (
              <MotorCard key={motor.slug} motor={motor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card/20 border border-border/30 rounded-xl mb-16">
            <p className="font-mono text-sm text-muted-foreground mb-2">
              NO_MOTOR_ENTRIES_MATCHED
            </p>
            <p className="text-xs text-muted-foreground">
              Try adjusting your category or family filter parameters.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
