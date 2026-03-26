import { useGameStore } from '../../store/gameStore';
import { motion, useReducedMotion } from 'framer-motion';

interface MetricRowProps {
  label: string;
  value: number;
  color: string;
  trackColor: string;
  delay: number;
}

function MetricRow({ label, value, color, trackColor, delay }: MetricRowProps) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span
          className="font-ui text-[9px] font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(148,163,184,0.75)' }}
        >
          {label}
        </span>
        <span
          className="font-mono text-[9px] font-bold tabular-nums"
          style={{ color }}
        >
          {value}
        </span>
      </div>
      <div className="metric-track h-[3px] w-full" style={{ background: trackColor }}>
        <motion.div
          className="h-full rounded-sm"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={
            shouldReduce
              ? { duration: 0 }
              : { duration: 1.0, ease: 'easeOut', delay }
          }
        />
      </div>
    </div>
  );
}

const METRICS_CONFIG = [
  {
    key: 'allianceTrust' as const,
    label: 'Alliance Trust',
    color: '#3B82F6',
    trackColor: 'rgba(59,130,246,0.12)',
  },
  {
    key: 'techEdge' as const,
    label: 'Tech Edge',
    color: '#F59E0B',
    trackColor: 'rgba(245,158,11,0.12)',
  },
  {
    key: 'strategicCoherence' as const,
    label: 'Strat. Coherence',
    color: '#10B981',
    trackColor: 'rgba(16,185,129,0.12)',
  },
  {
    key: 'domesticResilience' as const,
    label: 'Dom. Resilience',
    color: '#94A3B8',
    trackColor: 'rgba(148,163,184,0.12)',
  },
];

export default function MetricHUD() {
  const metrics = useGameStore((s) => s.metrics);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="fixed bottom-6 right-4 z-50 pointer-events-none"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
    >
      <div
        className="glass-dark rounded border px-3 py-2.5 min-w-[168px]"
        style={{ borderColor: 'rgba(148,163,184,0.1)' }}
      >
        <div
          className="font-mono text-[8px] tracking-[0.25em] uppercase mb-2.5 pb-1.5"
          style={{
            color: 'rgba(148,163,184,0.5)',
            borderBottom: '1px solid rgba(148,163,184,0.08)',
          }}
        >
          Strategic Metrics
        </div>
        {METRICS_CONFIG.map((cfg, i) => (
          <MetricRow
            key={cfg.key}
            label={cfg.label}
            value={metrics[cfg.key]}
            color={cfg.color}
            trackColor={cfg.trackColor}
            delay={i * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
}
