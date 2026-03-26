import { motion, useReducedMotion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { getEnding } from '../content/endings';

const endingColors: Record<string, string> = {
  A: '#3B82F6',
  B: '#94A3B8',
  C: '#ef4444',
  D: '#F59E0B',
};

const endingSubColors: Record<string, string> = {
  A: 'rgba(59,130,246,0.7)',
  B: 'rgba(148,163,184,0.5)',
  C: 'rgba(239,68,68,0.7)',
  D: 'rgba(245,158,11,0.7)',
};

export default function EndingPage() {
  const currentEnding = useGameStore((s) => s.currentEnding);
  const resetGame = useGameStore((s) => s.resetGame);
  const navigate = useGameStore((s) => s.navigate);
  const shouldReduce = useReducedMotion();

  const endingId = currentEnding ?? 'B';
  const ending = getEnding(endingId);

  if (!ending) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#080c14]">
        <p className="font-ui text-slate-400">Ending not found.</p>
      </div>
    );
  }

  const color = endingColors[endingId] ?? '#94A3B8';
  const subColor = endingSubColors[endingId] ?? 'rgba(148,163,184,0.5)';

  const handleReplay = () => {
    resetGame();
    navigate(0);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#080c14]">
      {/* Full-screen hero */}
      <div className="relative h-screen overflow-hidden">
        <img
          src={ending.image}
          alt={ending.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(8,12,20,0.3) 0%, rgba(8,12,20,0.15) 40%, rgba(8,12,20,0.85) 75%, rgba(8,12,20,1) 100%)`,
          }}
        />
        <div className="absolute inset-0 scan-lines" />

        {/* Ending label */}
        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7 }}
        >
          <div
            className="font-mono text-[9px] tracking-[0.5em] uppercase px-4 py-1.5 rounded-sm"
            style={{
              color,
              background: `${color}10`,
              border: `1px solid ${color}30`,
            }}
          >
            EPILOGUE — SPRING 2031
          </div>
        </motion.div>

        {/* Hero text */}
        <motion.div
          className="absolute bottom-16 left-0 right-0 text-center px-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.9, delay: shouldReduce ? 0 : 0.3 }}
        >
          <h1
            className="text-shadow-xl mb-3"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              fontWeight: 700,
              color: '#f1f5f9',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
            }}
          >
            {ending.title}
          </h1>
          <p
            className="font-mono text-sm tracking-[0.3em]"
            style={{ color: subColor }}
          >
            {ending.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Ending body */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-8 py-12">
        {/* Divider */}
        <motion.div
          className="w-16 h-[1px] mx-auto mb-8"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: shouldReduce ? 0 : 0.8, delay: shouldReduce ? 0 : 0.2 }}
        />

        {/* Body text */}
        <motion.div
          className="space-y-5 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.8, delay: shouldReduce ? 0 : 0.4 }}
        >
          {ending.body.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="leading-relaxed text-shadow"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(0.95rem, 1.9vw, 1.1rem)',
                color: i === 0 ? '#e2e8f0' : '#94a3b8',
                fontStyle: 'italic',
              }}
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Achieved through */}
        <motion.div
          className="rounded-sm px-5 py-4 mb-10"
          style={{
            background: `${color}08`,
            border: `1px solid ${color}20`,
            borderLeft: `3px solid ${color}50`,
          }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7, delay: shouldReduce ? 0 : 0.7 }}
        >
          <div
            className="font-mono text-[8px] tracking-[0.4em] uppercase mb-2"
            style={{ color: subColor }}
          >
            ACHIEVED THROUGH
          </div>
          <p className="font-ui text-sm" style={{ color: '#94a3b8' }}>
            {ending.achievedThrough}
          </p>
        </motion.div>

        {/* All endings indicator */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 0.9 }}
        >
          <div
            className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3 text-center"
            style={{ color: 'rgba(148,163,184,0.4)' }}
          >
            POSSIBLE ENDINGS
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'A', label: 'New Bases\nof Cooperation', color: '#3B82F6' },
              { id: 'B', label: 'Trundling\nAlong', color: '#94A3B8' },
              { id: 'C', label: 'The\nCrucible', color: '#ef4444' },
              { id: 'D', label: 'Strategic\nJudo', color: '#F59E0B' },
            ].map((e) => (
              <div
                key={e.id}
                className="text-center p-2 rounded-sm"
                style={{
                  background: e.id === endingId ? `${e.color}15` : 'rgba(8,12,20,0.5)',
                  border: `1px solid ${e.id === endingId ? `${e.color}40` : 'rgba(148,163,184,0.08)'}`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mx-auto mb-1.5"
                  style={{
                    background: e.id === endingId ? e.color : 'rgba(148,163,184,0.3)',
                    boxShadow: e.id === endingId ? `0 0 8px ${e.color}80` : 'none',
                  }}
                />
                <p
                  className="font-ui text-[9px] leading-snug whitespace-pre-line"
                  style={{ color: e.id === endingId ? e.color : 'rgba(148,163,184,0.4)' }}
                >
                  {e.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Replay CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 1.1 }}
        >
          <button
            onClick={handleReplay}
            className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-8 py-3 rounded-sm mr-3"
            style={{
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.4)',
              color: '#93c5fd',
            }}
          >
            Play Again
          </button>
          <button
            onClick={() => navigate(4)}
            className="font-ui text-sm tracking-wide px-6 py-3 rounded-sm"
            style={{
              color: 'rgba(148,163,184,0.5)',
              border: '1px solid rgba(148,163,184,0.15)',
            }}
          >
            ← Revisit Decision
          </button>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p
            className="font-mono text-[8px] tracking-[0.4em] uppercase"
            style={{ color: 'rgba(148,163,184,0.25)' }}
          >
            2029: CROSSROADS OF POWER — SCENARIO COMPLETE
          </p>
        </div>
      </div>
    </div>
  );
}
