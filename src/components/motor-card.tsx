import React from 'react';
import { Link } from 'wouter';
import { MotorType } from '@/types/motor';
import { Cpu, ShieldAlert, Activity, ArrowRight } from 'lucide-react';

interface MotorCardProps {
  motor: MotorType;
}

export const MotorCard: React.FC<MotorCardProps> = ({ motor }) => {
  const isDC = motor.category === 'DC';

  return (
    <Link
      href={`/motors/${motor.slug}`}
      className="group relative block bg-card/60 hover:bg-card/90 border border-border/40 hover:border-primary/50 rounded-xl p-6 transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top ambient glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header Badges */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-md border ${
              isDC
                ? 'bg-cyan/10 text-cyan border-cyan/30 glow-border-cyan'
                : 'bg-primary/10 text-primary border-primary/30 glow-border'
            }`}
          >
            {motor.category} MOTOR
          </span>
          <span className="font-mono text-xs text-muted-foreground bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
            {motor.family}
          </span>
        </div>
        <Cpu className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      {/* Motor Name */}
      <h3 className="font-mono text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 flex items-center justify-between">
        <span>{motor.name}</span>
      </h3>

      {/* Overview preview */}
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-6 font-sans">
        {motor.overview}
      </p>

      {/* Metrics & Action Bar */}
      <div className="pt-4 border-t border-border/30 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5" title="Failure Modes">
            <ShieldAlert className="w-3.5 h-3.5 text-amber" />
            <span>{motor.failureModes.length} Faults</span>
          </span>
          <span className="flex items-center gap-1.5" title="Sensor Fusion Modalities">
            <Activity className="w-3.5 h-3.5 text-cyan" />
            <span>{motor.sensorPlan.length} Sensors</span>
          </span>
        </div>

        <span className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform font-semibold">
          ANALYZE
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};
