import React, { useState, useEffect, useRef } from 'react';
import { useRoute, Link } from 'wouter';
import { getMotorBySlug } from '@/data/motors';
import { KaTeXFormula } from '@/components/katex-formula';
import { Footer } from '@/components/footer';
import { updateSeoMeta } from '@/lib/meta';
import {
  ArrowLeft,
  Cpu,
  ShieldAlert,
  Activity,
  CheckCircle2,
  BookOpen,
  Box,
  Binary,
  Layers,
} from 'lucide-react';

type TabType = 'overview' | 'failures' | 'sensors' | 'summary';

export default function MotorDetail() {
  const [, params] = useRoute('/motors/:slug');
  const slug = params?.slug || '';
  const motor = getMotorBySlug(slug);

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (motor) {
      updateSeoMeta({
        title: `${motor.name} - Research & Failure Modes | EdgeGuard AI`,
        description: motor.overview,
        url: `https://tri-modal.site/motors/${motor.slug}`,
      });
    } else {
      updateSeoMeta({
        title: "Motor Not Found | EdgeGuard AI",
        description: "Requested motor topology identifier does not exist in the research catalog.",
      });
    }
  }, [motor]);

  if (!motor) {
    return (
      <main className="min-h-screen bg-background text-foreground crt-overlay pt-32 pb-16 flex flex-col items-center justify-center">
        <div className="text-center font-mono p-8 bg-card/40 border border-border/40 rounded-xl max-w-md">
          <ShieldAlert className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">404: MOTOR_NOT_FOUND</h1>
          <p className="text-sm text-muted-foreground mb-6 font-sans">
            The requested motor topology identifier "{slug}" does not exist in the research catalog.
          </p>
          <Link
            href="/motors"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            RETURN TO MATRIX
          </Link>
        </div>
      </main>
    );
  }

  // Resolve related equation strings against keyEquations array
  const resolveEquation = (refStr: string) => {
    const match = motor.keyEquations.find(
      (eq) => eq.label === refStr || eq.latex === refStr
    );
    if (match) {
      return match;
    }
    return { label: '', latex: refStr, description: '' };
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview & Equations', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'failures', label: `Failure Modes (${motor.failureModes.length})`, icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'sensors', label: 'Sensor Fusion Plan', icon: <Activity className="w-4 h-4" /> },
    { id: 'summary', label: 'Key Takeaways', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  // Keyboard navigation for accessible tabs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== index) {
      e.preventDefault();
      setActiveTab(tabs[nextIndex].id);
      const targetBtn = tabListRef.current?.children[nextIndex] as HTMLButtonElement;
      targetBtn?.focus();
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground crt-overlay pt-24 pb-16 selection:bg-primary/30 selection:text-primary">
      <div className="pointer-events-none fixed inset-0 z-50 animate-crt-scan" />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Breadcrumbs & Back Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/motors"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>BACK_TO_RESEARCH_MATRIX</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span
              className={`px-2.5 py-0.5 rounded border ${
                motor.category === 'DC'
                  ? 'bg-cyan/10 text-cyan border-cyan/30'
                  : 'bg-primary/10 text-primary border-primary/30'
              }`}
            >
              {motor.category}
            </span>
            <span className="text-muted-foreground bg-white/5 border border-white/10 px-2.5 py-0.5 rounded">
              {motor.family}
            </span>
          </div>
        </div>

        {/* Top Header Card */}
        <div className="bg-card/60 border border-border/40 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-primary mb-2">
                <Cpu className="w-4 h-4" />
                <span>SPECIFICATION_SLUG: {motor.slug}</span>
              </div>
              <h1 className="font-mono text-3xl md:text-5xl font-extrabold text-foreground mb-4 glow-text">
                {motor.name}
              </h1>
              <p className="text-muted-foreground font-sans text-base md:text-lg max-w-3xl leading-relaxed">
                {motor.overview}
              </p>
            </div>
          </div>
        </div>

        {/* Keyboard-Accessible Tab Navigation */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Motor Details Navigation"
          className="flex border-b border-border/40 gap-2 overflow-x-auto mb-8 pb-1 scrollbar-none"
        >
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`flex items-center gap-2 font-mono text-xs md:text-sm px-5 py-3 rounded-t-xl border-t border-x transition-all whitespace-nowrap cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary ${
                  isActive
                    ? 'bg-card text-primary border-border/60 border-b-transparent shadow-[0_-2px_10px_rgba(0,0,0,0.5)] font-bold'
                    : 'bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}

        {/* PANEL 1: OVERVIEW & KEY EQUATIONS */}
        <div
          role="tabpanel"
          id="panel-overview"
          aria-labelledby="tab-overview"
          hidden={activeTab !== 'overview'}
          className="space-y-8"
        >
          <div className="bg-card/40 border border-border/40 backdrop-blur-md rounded-xl p-6 md:p-8">
            <h2 className="font-mono text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Binary className="w-5 h-5 text-primary" />
              <span>Core Physics & Governing Engineering Equations</span>
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {motor.keyEquations.map((eq, idx) => (
                <div
                  key={idx}
                  className="bg-background/80 border border-border/50 rounded-xl p-6 glow-border"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-border/30 pb-2">
                    <span className="font-mono text-sm font-semibold text-primary">
                      EQ.{idx + 1}: {eq.label}
                    </span>
                  </div>

                  {/* KaTeX Renderer */}
                  <div className="my-4 bg-black/40 border border-primary/20 rounded-lg p-4 text-center">
                    <KaTeXFormula latex={eq.latex} displayMode={true} />
                  </div>

                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {eq.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL 2: FAILURE MODES */}
        <div
          role="tabpanel"
          id="panel-failures"
          aria-labelledby="tab-failures"
          hidden={activeTab !== 'failures'}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6">
            {motor.failureModes.map((failure, idx) => (
              <div
                key={idx}
                className="bg-card/40 border border-border/40 backdrop-blur-md rounded-xl p-6 md:p-8 hover:border-amber/40 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Left Column: Details & Resolved Related Equations */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-amber font-bold bg-amber/10 border border-amber/30 px-2.5 py-1 rounded">
                        FAULT_MODE 0{idx + 1}
                      </span>
                      <h3 className="font-mono text-xl font-bold text-foreground">
                        {failure.title}
                      </h3>
                    </div>

                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {failure.description}
                    </p>

                    {/* Resolved Related Equations */}
                    {failure.relatedEquations.length > 0 && (
                      <div className="pt-4 border-t border-border/30">
                        <span className="font-mono text-xs text-muted-foreground block mb-3 font-semibold flex items-center gap-1.5">
                          <Binary className="w-3.5 h-3.5 text-primary" />
                          GOVERNING FORMULAS & EQUATIONS:
                        </span>
                        <div className="space-y-3">
                          {failure.relatedEquations.map((reqRef, rIdx) => {
                            const eq = resolveEquation(reqRef);
                            return (
                              <div
                                key={rIdx}
                                className="bg-black/50 border border-primary/20 rounded-lg p-3 text-sm"
                              >
                                {eq.label && (
                                  <div className="font-mono text-xs text-primary font-semibold mb-1 flex items-center justify-between">
                                    <span>{eq.label}</span>
                                  </div>
                                )}
                                <div className="py-1">
                                  <KaTeXFormula latex={eq.latex} displayMode={true} />
                                </div>
                                {eq.description && (
                                  <p className="font-sans text-xs text-muted-foreground mt-1 border-t border-white/5 pt-1 leading-relaxed">
                                    {eq.description}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: 3D Render Image Slot */}
                  <div className="w-full md:w-72 shrink-0">
                    <div className="font-mono text-xs text-muted-foreground mb-2 flex items-center justify-between">
                      <span>3D FAULT MODEL</span>
                      <Box className="w-3.5 h-3.5 text-primary" />
                    </div>

                    <div className="relative aspect-video md:aspect-square bg-black/60 border border-primary/30 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 text-center group">
                      {failure.image3d ? (
                        <img
                          src={failure.image3d}
                          alt={failure.title}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            // Fallback to stylized wireframe placeholder if asset image missing
                            e.currentTarget.style.display = 'none';
                            const sibling = e.currentTarget.nextElementSibling;
                            if (sibling) sibling.classList.remove('hidden');
                          }}
                        />
                      ) : null}

                      {/* 3D Wireframe Slot Fallback */}
                      <div className={`flex flex-col items-center justify-center ${failure.image3d ? 'hidden' : ''}`}>
                        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center mb-3 animate-pulse">
                          <Layers className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-mono text-xs font-bold text-foreground">3D RENDER SLOT</span>
                        <span className="font-mono text-[10px] text-muted-foreground mt-1 break-all max-w-[200px]">
                          {failure.image3d || 'CAD / Mesh Render Slot'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 3: SENSOR FUSION PLAN */}
        <div
          role="tabpanel"
          id="panel-sensors"
          aria-labelledby="tab-sensors"
          hidden={activeTab !== 'sensors'}
          className="space-y-6"
        >
          <div className="bg-card/40 border border-border/40 backdrop-blur-md rounded-xl p-6 md:p-8">
            <h2 className="font-mono text-xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan" />
              <span>EdgeGuard Tri-Modal Observation Matrix</span>
            </h2>
            <p className="font-sans text-sm text-muted-foreground mb-8">
              How Kinetic, Acoustic, and Stray Electromagnetic channels correlate real-time telemetry on the ESP32 bare-metal engine for this specific motor architecture.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {motor.sensorPlan.map((plan, idx) => (
                <div
                  key={idx}
                  className="bg-background/80 border border-border/50 rounded-xl p-6 flex flex-col justify-between hover:border-cyan/50 transition-colors shadow-md"
                >
                  <div>
                    <span className="font-mono text-xs text-cyan font-bold block mb-2">
                      MODALITY 0{idx + 1}
                    </span>
                    <h3 className="font-mono text-base font-bold text-foreground mb-3">
                      {plan.sensor}
                    </h3>
                    <div className="mb-4">
                      <span className="font-mono text-[11px] text-muted-foreground uppercase font-semibold block mb-1">
                        PURPOSE:
                      </span>
                      <p className="font-sans text-sm font-semibold text-primary">
                        {plan.purpose}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-muted-foreground uppercase font-semibold block mb-1">
                        MECHANISM & ALGORITHM:
                      </span>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                        {plan.howItWorks}
                      </p>
                    </div>
                  </div>

                  {plan.relatedEquation && (
                    <div className="mt-6 pt-4 border-t border-border/30">
                      <span className="font-mono text-[10px] text-muted-foreground block mb-1">
                        TARGET EQUATION:
                      </span>
                      <div className="bg-black/50 p-2 rounded text-xs">
                        <KaTeXFormula latex={plan.relatedEquation} displayMode={false} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL 4: KEY TAKEAWAYS */}
        <div
          role="tabpanel"
          id="panel-summary"
          aria-labelledby="tab-summary"
          hidden={activeTab !== 'summary'}
          className="space-y-6"
        >
          <div className="bg-card/40 border border-border/40 backdrop-blur-md rounded-xl p-6 md:p-8">
            <h2 className="font-mono text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Technical Summary & Diagnostics Checklist</span>
            </h2>

            <div className="space-y-4">
              {motor.summary.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-background/80 border border-border/40 rounded-xl"
                >
                  <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/40 text-primary font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    {idx + 1}
                  </span>
                  <p className="font-sans text-sm md:text-base text-foreground leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
