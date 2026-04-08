import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

const METRICS = [
  { key: 'allianceTrust' as const, label: 'Alliance Trust', color: '#3B82F6', short: 'AT' },
  { key: 'techEdge' as const, label: 'Tech Edge', color: '#F59E0B', short: 'TE' },
  { key: 'strategicCoherence' as const, label: 'Strategic Coherence', color: '#10B981', short: 'SC' },
  { key: 'domesticResilience' as const, label: 'Domestic Resilience', color: '#8B5CF6', short: 'DR' },
];

export default function MetricHUD() {
  const metrics = useGameStore((s) => s.metrics);
  const shouldReduce = useReducedMotion();
  const [collapsed, setCollapsed] = useState(false);

  // Auto-collapse on small screens
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setCollapsed(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCollapsed(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div
      className="fixed left-2 top-14 z-40"
      style={{ pointerEvents: 'auto' }}
    >
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: shouldReduce ? 0 : 0.4 }}
      >
        {/* Toggle button — always visible */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-sm px-2 py-1.5 mb-1 flex items-center gap-1.5 transition-all"
          style={{
            background: 'rgba(8,12,20,0.9)',
            border: '1px solid rgba(148,163,184,0.12)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(148,163,184,0.5)' }}>
            {collapsed ? '▶' : '◀'} Scores
          </span>
          {/* Mini inline metrics when collapsed */}
          {collapsed && (
            <span className="flex items-center gap-1 ml-1">
              {METRICS.map((m) => (
                <span key={m.key} className="font-mono text-[8px] font-bold tabular-nums" style={{ color: m.color }}>
                  {metrics[m.key]}
                </span>
              ))}
            </span>
          )}
        </button>

        {/* Expanded panel */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: shouldReduce ? 0 : 0.3 }}
              className="overflow-hidden"
            >
              <div
                className="rounded-sm p-3"
                style={{
                  minWidth: '140px',
                  border: '1px solid rgba(148,163,184,0.1)',
                  background: 'rgba(8,12,20,0.92)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Header */}
                <div
                  className="font-mono text-[7px] tracking-[0.35em] uppercase mb-3 pb-2 text-center"
                  style={{ color: 'rgba(148,163,184,0.45)', borderBottom: '1px solid rgba(148,163,184,0.08)' }}
                >
                  Strategic Index
                </div>

                {/* Metrics */}
                <div className="space-y-2.5">
                  {METRICS.map((m) => {
                    const value = metrics[m.key];
                    const pct = `${value}%`;
                    return (
                      <div key={m.key}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[8px] tracking-wide" style={{ color: 'rgba(148,163,184,0.55)' }}>
                            {m.label}
                          </span>
                          <span className="font-mono text-[9px] font-bold tabular-nums" style={{ color: m.color }}>
                            {value}
                          </span>
                        </div>
                        <div className="metric-track h-[2px] rounded-full">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: m.color, width: pct }}
                            initial={{ width: 0 }}
                            animate={{ width: pct }}
                            transition={{ duration: shouldReduce ? 0 : 0.6, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Trajectory hint */}
                <div
                  className="font-mono text-[6px] tracking-[0.2em] uppercase mt-3 pt-2 text-center"
                  style={{ color: 'rgba(148,163,184,0.28)', borderTop: '1px solid rgba(148,163,184,0.06)' }}
                >
                  Live · Updates with decisions
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
