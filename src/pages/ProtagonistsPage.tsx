import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

interface ProtagonistData {
  id: string;
  name: string;
  role: string;
  location: string;
  caption: string;
  narration: string;
  dialogue: string;
  internalMonologue?: string;
  sceneImage: string;
  color: string;
  glowClass: string;
}

const protagonists: ProtagonistData[] = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Deputy National Security Advisor',
    location: 'Washington DC — 05:30 EST',
    caption: 'Deputy National Security Advisor Sarah Chen. 5:30 AM, Washington DC.',
    narration:
      'The intelligence brief landed at 5:15 AM. By 5:31, Sarah knew this wasn\'t just another day of managed decline.',
    dialogue:
      '...Chinese Maritime Safety Administration vessels blocking Philippines resupply route to Second Thomas Shoal...',
    sceneImage: '/assets/page_two_sarah_chen.webp',
    color: '#3B82F6',
    glowClass: 'glow-blue',
  },
  {
    id: 'maya',
    name: 'Dr. Maya Patel',
    role: 'CEO, Sentinel AI',
    location: 'San Francisco — 02:30 PST',
    caption: 'Dr. Maya Patel, CEO Sentinel AI. 2:30 AM, San Francisco.',
    narration:
      "Maya hadn't slept. The call from Tokyo came at 2:00 AM. By 2:30, she understood that her company's next decision would determine whether Silicon Valley led or followed.",
    dialogue: 'The board meets in six hours. They want an answer on the licensing deal.',
    sceneImage: '/assets/page_two_maya_patel.webp',
    color: '#F59E0B',
    glowClass: 'glow-amber',
  },
  {
    id: 'james',
    name: 'James Nakamura',
    role: 'CEO, Kōdo Robotics',
    location: 'Tokyo — 19:30 JST',
    caption: 'James Nakamura, CEO Kōdo Robotics. 7:30 PM, Tokyo.',
    narration:
      'His father built this factory in 1985. His grandfather survived WWII to rebuild Japan. Now James faced a choice that would determine whether his children would have a company—or a country—to inherit.',
    dialogue: 'How quickly can we retool for military production?',
    sceneImage: '/assets/page_two_james_nakamura.webp',
    color: '#10B981',
    glowClass: 'glow-jade',
  },
  {
    id: 'lijian',
    name: 'Vice Minister Li Jian',
    role: 'Vice Minister',
    location: 'Beijing — 21:30 CST',
    caption: 'Vice Minister Li Jian. 9:30 PM, Beijing.',
    narration:
      'The directive from the Central Committee was clear. Deploy the surveillance system to partner nations. Ensure compliance. Report success.',
    internalMonologue:
      "But what my daughter sees from Cambridge... what she doesn't say in our video calls... tells me more than any intelligence report.",
    dialogue: '',
    sceneImage: '/assets/page_two_li_jian.webp',
    color: '#DC2626',
    glowClass: 'glow-crimson',
  },
  {
    id: 'anna',
    name: 'Colonel Anna Karlsson',
    role: 'Swedish Armed Forces',
    location: 'Stockholm — 20:30 CET',
    caption: 'Colonel Anna Karlsson. 8:30 PM, Stockholm.',
    narration:
      'Sweden joined NATO to be safer. But safety, Anna was learning, meant choices. And not all choices were between good and bad.',
    dialogue: 'Show me the Chinese port investments. All of them. Baltic, Arctic, North Sea.',
    sceneImage: '/assets/page_two_anna_karlsson.webp',
    color: '#94A3B8',
    glowClass: 'glow-silver',
  },
];

function ProtagonistPanel({
  data,
  visible,
}: {
  data: ProtagonistData;
  visible: boolean;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={data.id}
          className="relative w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6 }}
        >
          {/* Scene image */}
          <img
            src={data.sceneImage}
            alt={`${data.name} scene`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 overlay-dark" />
          <div className="absolute inset-0 overlay-left" />
          <div className="absolute inset-0 scan-lines" />

          {/* Character color accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, ${data.color}, transparent)`,
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
            <motion.div
              className="max-w-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduce ? 0 : 0.7, delay: shouldReduce ? 0 : 0.3 }}
            >
              {/* Location badge */}
              <div
                className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2 inline-block px-2 py-0.5 rounded-sm"
                style={{
                  color: data.color,
                  background: `${data.color}14`,
                  border: `1px solid ${data.color}30`,
                }}
              >
                {data.location}
              </div>

              {/* Character name */}
              <h2
                className="text-shadow-xl mb-1 leading-tight"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                  fontWeight: 700,
                  color: '#f1f5f9',
                }}
              >
                {data.name}
              </h2>
              <div
                className="font-ui text-sm tracking-wide mb-4"
                style={{ color: 'rgba(148,163,184,0.7)' }}
              >
                {data.role}
              </div>

              {/* Narration */}
              <div
                className="glass-panel rounded-sm px-4 py-3 mb-3"
                style={{ borderLeft: `2px solid ${data.color}60` }}
              >
                <p
                  className="text-shadow leading-relaxed"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(0.85rem, 1.6vw, 0.98rem)',
                    color: '#cbd5e1',
                    fontStyle: 'italic',
                  }}
                >
                  {data.narration}
                </p>
              </div>

              {/* Dialogue or internal monologue */}
              {data.internalMonologue && (
                <div className="px-4 py-2 mb-2">
                  <p
                    className="font-mono text-[10px] tracking-wide"
                    style={{ color: `${data.color}aa` }}
                  >
                    [INTERNAL] "{data.internalMonologue}"
                  </p>
                </div>
              )}

              {data.dialogue && (
                <div
                  className="flex items-start gap-2 px-4 py-2"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '2px',
                  }}
                >
                  <span
                    className="font-mono text-[10px] tracking-widest mt-0.5 flex-shrink-0"
                    style={{ color: data.color }}
                  >
                    ▶
                  </span>
                  <p
                    className="font-ui text-sm"
                    style={{ color: '#94a3b8' }}
                  >
                    "{data.dialogue}"
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ConnectionScreen({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#080c14]">
      <img
        src="/assets/montage_all_five_characters.webp"
        alt="All five protagonists"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.7)' }} />
      <div className="absolute inset-0 scan-lines" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.9 }}
        >
          {/* Character color pips */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {['#3B82F6', '#F59E0B', '#10B981', '#DC2626', '#94A3B8'].map((color, i) => (
              <motion.div
                key={color}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: color, boxShadow: `0 0 10px ${color}80` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: shouldReduce ? 0 : 0.4, delay: shouldReduce ? 0 : i * 0.1 }}
              />
            ))}
          </div>

          <p
            className="text-shadow-xl leading-relaxed mb-6"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
              color: '#e2e8f0',
              fontStyle: 'italic',
            }}
          >
            "Five people. Five cities. Five choices. What none of them knew yet:
            their decisions were already connected. And in three months, they would change everything."
          </p>

          <div
            className="inline-block px-5 py-2 rounded-sm mb-8 font-mono text-sm tracking-[0.25em] uppercase"
            style={{
              color: '#ef4444',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.3)',
            }}
          >
            MANILA INCIDENT: T-MINUS 90 DAYS
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onBack}
              className="font-ui text-xs tracking-widest px-4 py-2 rounded-sm"
              style={{ color: 'rgba(148,163,184,0.45)', border: '1px solid rgba(148,163,184,0.15)' }}
            >
              ← Back
            </button>
            <button
              onClick={onContinue}
              className="font-ui font-semibold text-xs tracking-[0.25em] uppercase px-8 py-3 rounded-sm"
              style={{
                background: 'rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.4)',
                color: '#93c5fd',
              }}
            >
              The Crisis Begins →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProtagonistsPage() {
  const navigate = useGameStore((s) => s.navigate);
  const [step, setStep] = useState(0); // 0-4: protagonists, 5: connection screen

  const goNext = () => {
    if (step < protagonists.length) {
      setStep(step + 1);
    }
  };

  const goPrev = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate(1);
    }
  };

  if (step === protagonists.length) {
    return (
      <div className="w-full h-screen">
        <ConnectionScreen onContinue={() => navigate(3)} onBack={() => setStep(protagonists.length - 1)} />
      </div>
    );
  }

  const current = protagonists[step];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#080c14]">
      <ProtagonistPanel data={current} visible={true} />

      {/* Top header — makes it clear this is a character bio section */}
      <div
        className="absolute top-0 left-0 right-0 z-30 px-4 py-3 md:px-8 flex items-center justify-between"
        style={{
          background: 'linear-gradient(to bottom, rgba(8,12,20,0.9) 0%, transparent 100%)',
        }}
      >
        <div className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(59,130,246,0.6)' }}>
          MEET THE PLAYERS
        </div>
      </div>

      {/* Navigation — fixed bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 px-4 py-4 md:px-8"
        style={{
          background: 'linear-gradient(to top, rgba(8,12,20,0.95) 0%, rgba(8,12,20,0.8) 60%, transparent 100%)',
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Progress dots + character name */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {protagonists.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setStep(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === step ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i === step ? current.color : 'rgba(148,163,184,0.3)',
                    boxShadow: i === step ? `0 0 8px ${current.color}80` : 'none',
                  }}
                />
              ))}
            </div>
            <span className="font-mono text-[9px] tracking-wide" style={{ color: 'rgba(148,163,184,0.45)' }}>
              {step + 1} of {protagonists.length}
            </span>
          </div>

          {/* Prev/Next */}
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              className="font-ui text-xs tracking-widest px-4 py-2 rounded-sm"
              style={{
                color: 'rgba(148,163,184,0.5)',
                border: '1px solid rgba(148,163,184,0.15)',
              }}
            >
              ← Back
            </button>
            <button
              onClick={() => navigate(3)}
              className="font-ui text-[10px] tracking-widest px-3 py-2 rounded-sm"
              style={{
                color: 'rgba(148,163,184,0.4)',
                border: '1px solid rgba(148,163,184,0.1)',
              }}
            >
              Skip to Crisis →
            </button>
            <button
              onClick={goNext}
              className="font-ui font-semibold text-xs tracking-[0.2em] uppercase px-5 py-2 rounded-sm"
              style={{
                background: `${current.color}18`,
                border: `1px solid ${current.color}50`,
                color: current.color,
              }}
            >
              {step < protagonists.length - 1 ? 'Next →' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>

      {/* Character label */}
      <div
        className="absolute top-6 right-4 md:right-8 font-mono text-[9px] tracking-widest"
        style={{ color: 'rgba(148,163,184,0.3)' }}
      >
        CHARACTER BIO · {step + 1} / {protagonists.length}
      </div>
    </div>
  );
}
