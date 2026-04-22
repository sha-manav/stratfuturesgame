import { motion, useReducedMotion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export default function LandingPage() {
  const navigate = useGameStore((s) => s.navigate);
  const shouldReduce = useReducedMotion();

  const dur = (d: number) => (shouldReduce ? 0 : d);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#080c14]">
      {/* Hero image */}
      <img
        src="/assets/opening_hero_satellite_view.webp"
        alt="Satellite view of Earth at night, city lights visible"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 overlay-dark" />
      <div className="absolute inset-0 overlay-vignette" />
      <div className="absolute inset-0 scan-lines" />

      {/* Top classification bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #3B82F6 30%, #3B82F6 70%, transparent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: dur(1.2), delay: dur(0.5), ease: 'easeOut' }}
      />

      {/* Top UI bar */}
      <motion.div
        className="absolute top-6 left-8 right-8 flex justify-between items-center"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur(0.7), delay: dur(0.8) }}
      >
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(59,130,246,0.7)' }}>
          15 January 2029 — 0600 UTC
        </div>
        <div className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(148,163,184,0.4)' }}>
          SCENARIO · ACTIVE
        </div>
      </motion.div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.8), delay: dur(0.9) }}
        >
          <span
            className="font-mono text-[11px] tracking-[0.5em] uppercase"
            style={{ color: 'rgba(59,130,246,0.7)' }}
          >
            A Geopolitical Strategy Scenario
          </span>
        </motion.div>

        <motion.h1
          className="text-shadow-xl mb-3 leading-none"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 700,
            color: '#f1f5f9',
            letterSpacing: '-0.01em',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(1.0), delay: dur(1.1) }}
        >
          2029: CROSSROADS
          <br />
          <span style={{ color: '#3B82F6' }}>OF POWER</span>
        </motion.h1>

        <motion.div
          className="w-24 h-[1px] mx-auto mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: dur(0.8), delay: dur(1.5) }}
        />

        <motion.p
          className="text-shadow max-w-xl mx-auto text-slate-300 leading-relaxed mb-10"
          style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.8), delay: dur(1.6) }}
        >
          Five decision-makers. Five cities. One crisis that will determine whether
          the alliances built over eighty years hold — or splinter.
        </motion.p>

        <motion.button
          onClick={() => navigate(1)}
          className="relative group px-10 py-3.5 rounded-sm font-ui font-semibold text-sm tracking-widest uppercase overflow-hidden"
          style={{
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(59,130,246,0.5)',
            color: '#93c5fd',
            letterSpacing: '0.2em',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.7), delay: dur(1.9) }}
          whileHover={shouldReduce ? {} : { scale: 1.03 }}
          whileTap={shouldReduce ? {} : { scale: 0.97 }}
        >
          <span className="relative z-10">Begin Scenario</span>
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(59,130,246,0.1)' }}
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.p
          className="font-mono text-[9px] tracking-widest mt-6"
          style={{ color: 'rgba(148,163,184,0.35)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur(0.6), delay: dur(2.2) }}
        >
          CLICK TO NAVIGATE
        </motion.p>
      </div>

      {/* Bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3) 50%, transparent)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur(1), delay: dur(2) }}
      />
    </div>
  );
}
