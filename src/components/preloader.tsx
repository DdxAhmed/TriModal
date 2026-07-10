import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const bootLogs = [
    'SYSTEM BOOT INITIATED...',
    'CORE 0 [PRO_CPU]: ACTIVE // Xtensa LX6 @ 240MHz',
    'CORE 1 [APP_CPU]: ACTIVE // COMMUNICATIONS LAYER',
    'CALIBRATING TRI-MODAL SENSORS...',
    'MPU6050 [ACCELEROMETER/GYRO]: ONLINE',
    'INMP441 [MEMS MICROPHONE]: ONLINE',
    'A3144 [HALL EFFECT ARRAY]: ONLINE',
    'ESTABLISHING TRI-MODAL SENSOR FUSION MATRIX...',
    'LOADING INCREMENTAL K-MEANS TINYML MODEL...',
    'SETTING UP SAFE-FAIL INTERRUPTS < 5ms...',
    'BOOT SEQUENCE 100% COMPLETE. SYSTEM SECURE.'
  ];

  useEffect(() => {
    // Progress interval
    const duration = 2800; // 2.8 seconds boot
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const currentProgress = Math.min(Math.floor((stepCount / steps) * 100), 100);
      setProgress(currentProgress);

      // Trigger log lines at specific progress steps
      const logIdx = Math.floor((currentProgress / 100) * bootLogs.length);
      if (logIdx > logs.length && logIdx < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIdx - 1]]);
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        // Add final log
        setLogs(prev => [...prev, bootLogs[bootLogs.length - 1]]);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 600); // Allow fade-out animation to finish
        }, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-center font-mono p-6 select-none"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* CRT scanlines effect */}
          <div className="pointer-events-none absolute inset-0 z-50 animate-crt-scan bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] opacity-30" />
          
          <div className="max-w-xl w-full flex flex-col items-center">
            {/* Holographic glowing emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-24 h-24 mb-8 flex items-center justify-center border border-primary/30 rounded-lg bg-primary/5 shadow-[0_0_25px_rgba(0,255,65,0.15),inset_0_0_15px_rgba(0,255,65,0.05)]"
            >
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-lg border-2 border-primary/40 animate-ping opacity-35" />
              <Activity className="w-12 h-12 text-primary animate-pulse-fast shadow-[0_0_10px_hsl(var(--primary))]" />
            </motion.div>

            {/* Team/Project Name */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold font-mono tracking-widest text-primary glow-text uppercase mb-2"
              dir="ltr"
            >
              TRI-MODAL
            </motion.h1>
            <p className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-12" dir="ltr">
              PREDICTIVE MAINTENANCE SUITE
            </p>

            {/* Boot console log */}
            <div className="w-full h-36 bg-black/60 border border-primary/20 rounded p-4 mb-8 overflow-hidden flex flex-col justify-end text-[10px] text-primary/70 leading-relaxed" dir="ltr">
              <div className="flex-1 flex flex-col justify-end gap-1 overflow-y-auto scrollbar-none opacity-80">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-primary font-bold">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress percentage & bar */}
            <div className="w-full flex justify-between items-center text-xs text-primary/80 mb-3" dir="ltr">
              <span>SYSTEM DIAGNOSTICS</span>
              <span className="font-bold">{progress}%</span>
            </div>
            
            <div className="w-full h-2 bg-muted/30 border border-primary/20 rounded-full overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
