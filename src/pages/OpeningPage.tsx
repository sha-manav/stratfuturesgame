import { motion, useReducedMotion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export default function OpeningPage() {
  const navigate = useGameStore((s) => s.navigate);
  const shouldReduce = useReducedMotion();

  const dur = (d: number) => (shouldReduce ? 0 : d);
  const del = (d: number) => (shouldReduce ? 0 : d);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#080c14]">
      {/* Background image */}
      <img
        src="/assets/page_one_opening.webp"
        alt="Cinematic opening scene — global perspective"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Layered overlays */}
      <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.55)' }} />
      <div className="absolute inset-0 overlay-dark" />
      <div className="absolute inset-0 scan-lines" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-14">
        {/* Top section: timestamp + classification */}
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.7), delay: del(0.3) }}
        >
          <div className="font-mono text-[12px] tracking-[0.35em] uppercase" style={{ color: 'rgba(59,130,246,0.65)' }}>
            15 January 2029 — 0600 UTC
          </div>
          <div className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(148,163,184,0.3)' }}>
            SCENARIO · ACTIVE
          </div>
        </motion.div>

        {/* Center: title treatment */}
        <div className="flex flex-col items-start max-w-3xl">
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: dur(0.8), delay: del(0.5) }}
          >
            <span
              className="font-mono text-[12px] tracking-[0.45em] uppercase block mb-1"
              style={{ color: 'rgba(59,130,246,0.6)' }}
            >
              Chapter 1
            </span>
            <h2
              className="text-shadow-xl"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                fontWeight: 700,
                color: 'rgba(226,232,240,0.9)',
                letterSpacing: '0.05em',
              }}
            >
              The Long Drift
            </h2>
            <div
              className="mt-2 font-mono text-[13px] tracking-[0.3em] uppercase"
              style={{ color: 'rgba(148,163,184,0.5)' }}
            >
              2029: CROSSROADS OF POWER
            </div>
          </motion.div>
        </div>

        {/* Bottom section: narration boxes */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <motion.div
            className="glass-panel rounded-sm px-5 py-4"
            style={{ borderLeft: '2px solid rgba(59,130,246,0.5)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.8), delay: del(0.7) }}
          >
            <p
              className="text-shadow leading-relaxed"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1rem, 1.95vw, 1.18rem)',
                color: '#cbd5e1',
                fontStyle: 'italic',
              }}
            >
              "Three years ago, the world chose drift over decision. Comfort over challenge.
              The question was never whether the future would arrive. Only whether we'd be ready for it."
            </p>
          </motion.div>

          <motion.div
            className="glass-panel rounded-sm px-5 py-4"
            style={{ borderLeft: '2px solid rgba(148,163,184,0.3)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.8), delay: del(1.0) }}
          >
            <p
              className="text-shadow leading-relaxed"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1rem, 1.95vw, 1.18rem)',
                color: '#94a3b8',
                fontStyle: 'italic',
              }}
            >
              "This is the story of five people who tried to be ready. And the choices
              that determined whether ready was enough."
            </p>
          </motion.div>

          {/* Continue buttons — clear choice between bios and jumping ahead */}
          <motion.div
            className="flex flex-col gap-3 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: dur(0.6), delay: del(1.5) }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                onClick={() => navigate(2)}
                className="font-ui font-semibold text-sm tracking-[0.25em] uppercase px-6 py-2.5 rounded-sm"
                style={{
                  background: 'rgba(59,130,246,0.12)',
                  border: '1px solid rgba(59,130,246,0.4)',
                  color: '#93c5fd',
                }}
              >
                Meet the Players →
              </button>
              <button
                onClick={() => navigate(4)}
                className="font-ui text-sm tracking-[0.15em] uppercase px-5 py-2.5 rounded-sm"
                style={{
                  background: 'rgba(148,163,184,0.06)',
                  border: '1px solid rgba(148,163,184,0.15)',
                  color: 'rgba(148,163,184,0.55)',
                }}
              >
                Skip to the Crisis →
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(0)}
                className="font-ui text-sm tracking-widest"
                style={{ color: 'rgba(148,163,184,0.4)' }}
              >
                ← Back
              </button>
              <span className="font-mono text-[10px] tracking-wide" style={{ color: 'rgba(148,163,184,0.25)' }}>
                Meet the Players introduces the five decision-makers
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
