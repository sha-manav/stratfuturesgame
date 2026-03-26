import { motion, useReducedMotion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { getConsequence } from '../content/decisions';
import { characters } from '../content/characters';

const DECISION_ID = 'decision_1_1';

export default function ConsequencePage() {
  const navigate = useGameStore((s) => s.navigate);
  const decisions = useGameStore((s) => s.decisions);
  const metrics = useGameStore((s) => s.metrics);
  const shouldReduce = useReducedMotion();

  const choiceId = decisions[DECISION_ID];
  const consequence = choiceId ? getConsequence(DECISION_ID, choiceId) : null;

  if (!consequence) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#080c14]">
        <div className="text-center">
          <p className="font-ui text-slate-400 mb-4">No decision recorded.</p>
          <button
            onClick={() => navigate(4)}
            className="font-ui text-sm px-4 py-2"
            style={{ color: '#93c5fd' }}
          >
            ← Go to Decision
          </button>
        </div>
      </div>
    );
  }

  const choiceColors: Record<string, string> = {
    A: '#3B82F6',
    B: '#F59E0B',
    C: '#94A3B8',
  };
  const choiceColor = choiceColors[choiceId] ?? '#3B82F6';

  return (
    <div className="relative w-full min-h-screen bg-[#080c14]">
      {/* Background based on choice */}
      <img
        src={
          choiceId === 'A'
            ? '/assets/resilient_coalition_plate.webp'
            : choiceId === 'B'
            ? '/assets/alliance_network_map.webp'
            : '/assets/fractured_alliance_plate.webp'
        }
        alt="Consequence scene"
        className="fixed inset-0 w-full h-full object-cover opacity-10"
        loading="eager"
      />
      <div className="fixed inset-0 scan-lines pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 py-10">
        {/* Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7 }}
        >
          <div
            className="inline-block font-mono text-[9px] tracking-[0.4em] uppercase px-3 py-1 rounded-sm mb-3"
            style={{
              color: choiceColor,
              background: `${choiceColor}12`,
              border: `1px solid ${choiceColor}35`,
            }}
          >
            {consequence.subtitle}
          </div>

          <h2
            className="text-shadow-xl"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              fontWeight: 700,
              color: '#f1f5f9',
              lineHeight: 1.2,
            }}
          >
            {consequence.title}
          </h2>
        </motion.div>

        {/* Metric effects */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 0.2 }}
        >
          <div
            className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3"
            style={{ color: 'rgba(148,163,184,0.5)' }}
          >
            STRATEGIC EFFECTS
          </div>
          <div className="space-y-2">
            {consequence.effects.map((effect, i) => (
              <motion.div
                key={i}
                className="rounded-sm p-4"
                style={{
                  background: effect.positive ? 'rgba(52,211,153,0.05)' : 'rgba(248,113,113,0.05)',
                  border: effect.positive
                    ? '1px solid rgba(52,211,153,0.2)'
                    : '1px solid rgba(248,113,113,0.2)',
                  borderLeft: effect.positive
                    ? '3px solid rgba(52,211,153,0.5)'
                    : '3px solid rgba(248,113,113,0.5)',
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.3 + i * 0.1 }}
              >
                <div
                  className="font-mono text-[10px] font-bold tracking-wide mb-1.5"
                  style={{ color: effect.positive ? '#34d399' : '#f87171' }}
                >
                  {effect.label}
                </div>
                <p className="font-ui text-[11px] leading-relaxed" style={{ color: '#94a3b8' }}>
                  {effect.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chinese response */}
        <motion.div
          className="mb-6 rounded-sm p-4"
          style={{
            background: 'rgba(16,185,129,0.05)',
            border: '1px solid rgba(16,185,129,0.18)',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 0.55 }}
        >
          <div
            className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2 font-bold"
            style={{ color: 'rgba(16,185,129,0.7)' }}
          >
            BEIJING RESPONSE
          </div>
          <p className="font-ui text-[11px] leading-relaxed" style={{ color: '#94a3b8' }}>
            {consequence.chineseResponse}
          </p>
        </motion.div>

        {/* Updated metrics display */}
        <motion.div
          className="mb-6 rounded-sm p-4"
          style={{
            background: 'rgba(8,12,20,0.8)',
            border: '1px solid rgba(148,163,184,0.1)',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 0.65 }}
        >
          <div
            className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3"
            style={{ color: 'rgba(148,163,184,0.4)' }}
          >
            CURRENT STRATEGIC METRICS
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Alliance Trust', value: metrics.allianceTrust, color: '#3B82F6' },
              { label: 'Tech Edge', value: metrics.techEdge, color: '#F59E0B' },
              { label: 'Strategic Coherence', value: metrics.strategicCoherence, color: '#10B981' },
              { label: 'Domestic Resilience', value: metrics.domesticResilience, color: '#94A3B8' },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between mb-1">
                  <span className="font-ui text-[10px]" style={{ color: 'rgba(148,163,184,0.6)' }}>
                    {m.label}
                  </span>
                  <span className="font-mono text-[10px] font-bold" style={{ color: m.color }}>
                    {m.value}
                  </span>
                </div>
                <div className="metric-track h-[3px]">
                  <motion.div
                    className="h-full"
                    style={{ background: m.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: shouldReduce ? 0 : 0.9, delay: shouldReduce ? 0 : 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Character consequence panels */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7, delay: shouldReduce ? 0 : 0.75 }}
        >
          <div
            className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3"
            style={{ color: 'rgba(148,163,184,0.5)' }}
          >
            CHARACTER REACTIONS
          </div>
          <div className="space-y-3">
            {consequence.characters.map((charConseq, i) => {
              const char = characters.find((c) => c.id === charConseq.characterId);
              if (!char) return null;

              return (
                <motion.div
                  key={charConseq.characterId}
                  className="relative rounded-sm overflow-hidden"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.85 + i * 0.12 }}
                >
                  <div className="flex">
                    {/* Image */}
                    <div className="relative w-24 md:w-36 flex-shrink-0">
                      <img
                        src={charConseq.image}
                        alt={char.name}
                        className="w-full h-full object-cover"
                        style={{ minHeight: '120px' }}
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(to right, transparent, rgba(8,12,20,0.4))',
                        }}
                      />
                      {/* Character color bar */}
                      <div
                        className="absolute top-0 bottom-0 left-0 w-0.5"
                        style={{ background: char.color }}
                      />
                    </div>

                    {/* Content */}
                    <div
                      className="flex-1 px-4 py-3"
                      style={{
                        background: `${char.color}08`,
                        border: `1px solid ${char.color}18`,
                        borderLeft: 'none',
                      }}
                    >
                      <div
                        className="font-ui text-[10px] font-semibold mb-1.5"
                        style={{ color: char.color }}
                      >
                        {char.name}
                      </div>
                      <p
                        className="font-ui text-[11px] leading-relaxed mb-2"
                        style={{ color: '#94a3b8', fontStyle: 'italic' }}
                      >
                        {charConseq.story}
                      </p>
                      {charConseq.dialogue && (
                        <div className="flex items-start gap-1.5">
                          <span
                            className="font-mono text-[9px] flex-shrink-0 mt-0.5"
                            style={{ color: char.color }}
                          >
                            ▶
                          </span>
                          <span
                            className="font-ui text-[11px]"
                            style={{ color: 'rgba(203,213,225,0.8)' }}
                          >
                            "{charConseq.dialogue}"
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 1.2 }}
        >
          <button
            onClick={() => navigate(6)}
            className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-sm"
            style={{
              background: `${choiceColor}15`,
              border: `1px solid ${choiceColor}50`,
              color: choiceColor,
            }}
          >
            See How This Ends →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
