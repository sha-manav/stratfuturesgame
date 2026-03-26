import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { decisions } from '../content/decisions';
import ClassifiedBadge from '../components/ui/ClassifiedBadge';

const DECISION_ID = 'decision_1_1';

interface MetricBadgeProps {
  label: string;
  positive: boolean;
}

function MetricBadge({ label, positive }: MetricBadgeProps) {
  return (
    <span
      className="inline-block font-mono text-[9px] tracking-wide px-1.5 py-0.5 rounded-sm mr-1 mb-1"
      style={{
        color: positive ? '#34d399' : '#f87171',
        background: positive ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
        border: `1px solid ${positive ? 'rgba(52,211,153,0.25)' : 'rgba(248,113,113,0.25)'}`,
      }}
    >
      {label}
    </span>
  );
}

export default function DecisionPage() {
  const navigate = useGameStore((s) => s.navigate);
  const makeDecision = useGameStore((s) => s.makeDecision);
  const shouldReduce = useReducedMotion();

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const decision = decisions.find((d) => d.id === DECISION_ID);
  if (!decision) return null;

  const handleSelect = (choiceId: string) => {
    if (confirmed) return;
    setSelectedChoice(choiceId);
    setConfirming(false);
  };

  const handleConfirm = () => {
    if (!selectedChoice) return;
    if (!confirming) {
      setConfirming(true);
      return;
    }
    // Execute decision
    setConfirmed(true);
    makeDecision(DECISION_ID, selectedChoice);
    setTimeout(() => navigate(5), 900);
  };

  const selectedData = decision.choices.find((c) => c.id === selectedChoice);

  const choiceColors: Record<string, string> = {
    A: '#3B82F6',
    B: '#F59E0B',
    C: '#94A3B8',
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#080c14]">
      {/* Hero image */}
      <img
        src={decision.heroImage}
        alt="South China Sea crisis"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.80)' }} />
      <div className="absolute inset-0 scan-lines" />

      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full flex flex-col p-5 md:p-8 lg:p-10">
          {/* Top bar */}
          <motion.div
            className="flex items-center justify-between mb-4 flex-shrink-0"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.5 }}
          >
            <ClassifiedBadge size="sm" />
            <div
              className="font-mono text-[8px] tracking-[0.4em] uppercase"
              style={{ color: 'rgba(239,68,68,0.7)' }}
            >
              DECISION 1.1 — ACTIVE
            </div>
          </motion.div>

          {/* Decision header */}
          <motion.div
            className="text-center mb-6 flex-shrink-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 0.15 }}
          >
            <h2
              className="text-shadow-xl"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
                fontWeight: 700,
                color: '#f1f5f9',
              }}
            >
              Decision Point 1.1
            </h2>
            <p className="font-mono text-[10px] tracking-[0.35em] mt-1" style={{ color: 'rgba(59,130,246,0.7)' }}>
              SOUTH CHINA SEA — MUTUAL DEFENSE TREATY INVOKED
            </p>
          </motion.div>

          {/* Three-column layout */}
          <div className="flex-1 grid md:grid-cols-3 gap-4 mb-4">
            {/* Left column: context panels */}
            <motion.div
              className="space-y-3 md:col-span-1"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 0.2 }}
            >
              <div
                className="glass-panel rounded-sm p-4"
                style={{ borderLeft: '2px solid rgba(239,68,68,0.5)' }}
              >
                <div
                  className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2 font-bold"
                  style={{ color: 'rgba(239,68,68,0.7)' }}
                >
                  Situation
                </div>
                <p
                  className="font-ui text-[11px] leading-relaxed"
                  style={{ color: '#94a3b8', whiteSpace: 'pre-line' }}
                >
                  {decision.situationSummary}
                </p>
              </div>

              <div
                className="glass-panel rounded-sm p-4"
                style={{ borderLeft: '2px solid rgba(245,158,11,0.4)' }}
              >
                <div
                  className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2 font-bold"
                  style={{ color: 'rgba(245,158,11,0.7)' }}
                >
                  What's At Stake
                </div>
                <p className="font-ui text-[11px] leading-relaxed" style={{ color: '#94a3b8' }}>
                  {decision.whatAtStake}
                </p>
              </div>

              <div
                className="glass-panel rounded-sm p-4"
                style={{ borderLeft: '2px solid rgba(148,163,184,0.25)' }}
              >
                <div
                  className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2 font-bold"
                  style={{ color: 'rgba(148,163,184,0.5)' }}
                >
                  Previous Context
                </div>
                <p className="font-ui text-[11px] leading-relaxed" style={{ color: '#64748b' }}>
                  {decision.previousContext}
                </p>
              </div>
            </motion.div>

            {/* Right 2/3: choice cards */}
            <motion.div
              className="md:col-span-2 space-y-3"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 0.3 }}
            >
              <div
                className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2"
                style={{ color: 'rgba(148,163,184,0.5)' }}
              >
                SELECT YOUR RECOMMENDATION
              </div>

              {decision.choices.map((choice) => {
                const color = choiceColors[choice.id] ?? '#94A3B8';
                const isSelected = selectedChoice === choice.id;

                return (
                  <motion.button
                    key={choice.id}
                    onClick={() => handleSelect(choice.id)}
                    className="w-full text-left rounded-sm p-4 transition-all duration-200"
                    style={{
                      background: isSelected ? `${color}14` : 'rgba(8,12,20,0.72)',
                      border: isSelected
                        ? `1px solid ${color}60`
                        : '1px solid rgba(148,163,184,0.1)',
                      cursor: confirmed ? 'default' : 'pointer',
                      boxShadow: isSelected ? `0 0 20px ${color}18` : 'none',
                    }}
                    whileHover={shouldReduce || confirmed ? {} : { scale: 1.005 }}
                    whileTap={shouldReduce || confirmed ? {} : { scale: 0.998 }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Choice label */}
                      <div
                        className="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm mt-0.5"
                        style={{
                          background: isSelected ? color : 'rgba(148,163,184,0.1)',
                          color: isSelected ? '#0f172a' : color,
                          transition: 'all 0.2s',
                        }}
                      >
                        {choice.label}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div
                          className="font-ui font-bold text-sm mb-1.5"
                          style={{ color: isSelected ? '#f1f5f9' : '#94a3b8' }}
                        >
                          {choice.title}
                        </div>
                        <p
                          className="font-ui text-[11px] leading-relaxed mb-2.5"
                          style={{ color: '#64748b' }}
                        >
                          {choice.description}
                        </p>

                        {/* Impact badges */}
                        <div className="flex flex-wrap mb-2">
                          {choice.impactLabels.map((label) => (
                            <MetricBadge
                              key={label}
                              label={label}
                              positive={!label.includes('−')}
                            />
                          ))}
                        </div>

                        {/* Risk */}
                        <div className="flex items-start gap-1.5">
                          <span
                            className="font-mono text-[8px] tracking-widest uppercase mt-0.5 flex-shrink-0"
                            style={{ color: 'rgba(248,113,113,0.6)' }}
                          >
                            RISK:
                          </span>
                          <span
                            className="font-ui text-[10px] leading-snug"
                            style={{ color: 'rgba(248,113,113,0.6)' }}
                          >
                            {choice.risk}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Confirmation area */}
          <AnimatePresence>
            {selectedChoice && !confirmed && (
              <motion.div
                className="flex-shrink-0 flex items-center justify-between glass-panel rounded-sm px-5 py-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: shouldReduce ? 0 : 0.35 }}
              >
                <div>
                  {confirming ? (
                    <p className="font-ui text-sm" style={{ color: '#f1f5f9' }}>
                      Confirm recommendation:{' '}
                      <span
                        className="font-semibold"
                        style={{ color: choiceColors[selectedChoice] }}
                      >
                        Option {selectedChoice} — {selectedData?.title}
                      </span>
                      ? This cannot be undone.
                    </p>
                  ) : (
                    <p className="font-ui text-sm" style={{ color: '#94a3b8' }}>
                      Selected:{' '}
                      <span
                        className="font-semibold"
                        style={{ color: choiceColors[selectedChoice] }}
                      >
                        Option {selectedChoice} — {selectedData?.title}
                      </span>
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 ml-4">
                  {confirming && (
                    <button
                      onClick={() => setConfirming(false)}
                      className="font-ui text-xs tracking-wide px-4 py-2 rounded-sm"
                      style={{ color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(148,163,184,0.15)' }}
                    >
                      Reconsider
                    </button>
                  )}
                  <button
                    onClick={handleConfirm}
                    className="font-ui font-semibold text-xs tracking-[0.2em] uppercase px-5 py-2 rounded-sm transition-all"
                    style={{
                      background: confirming
                        ? `${choiceColors[selectedChoice]}25`
                        : 'rgba(59,130,246,0.12)',
                      border: `1px solid ${
                        confirming
                          ? `${choiceColors[selectedChoice]}60`
                          : 'rgba(59,130,246,0.4)'
                      }`,
                      color: confirming ? choiceColors[selectedChoice] : '#93c5fd',
                    }}
                  >
                    {confirming ? 'Confirm Decision →' : 'Proceed →'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back nav */}
          <div className="mt-3 flex-shrink-0">
            <button
              onClick={() => navigate(3)}
              className="font-ui text-xs tracking-widest"
              style={{ color: 'rgba(148,163,184,0.35)' }}
            >
              ← Review Briefing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
