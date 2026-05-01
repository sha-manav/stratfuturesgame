import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

type CrisisStep =
  | 'chapter-banner'
  | 'intel'
  | 'sarah-office'
  | 'clock'
  | 'global-montage'
  | 'decision-approach';

const STEPS: CrisisStep[] = [
  'chapter-banner',
  'intel',
  'sarah-office',
  'clock',
  'global-montage',
  'decision-approach',
];

// ─── CHAPTER 1 BANNER ───
function ChapterBanner({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const shouldReduce = useReducedMotion();
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#080c14]">
      <img
        src="/assets/page_nine_south_china_sea_crisis.webp"
        alt="South China Sea backdrop"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        loading="eager"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.78)' }} />
      <div className="absolute inset-0 scan-lines" />

      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.7), transparent)' }}
      />

      <div className="absolute inset-0 overflow-y-auto flex items-center justify-center px-6 md:px-10">
        <motion.div
          className="w-full max-w-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7 }}
        >
          <div
            className="font-mono text-[11px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'rgba(59,130,246,0.7)' }}
          >
            Chapter 1
          </div>
          <h2
            className="text-shadow-xl mb-2 leading-tight"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#f1f5f9',
              letterSpacing: '0.02em',
            }}
          >
            The Long Drift
          </h2>
          <div
            className="font-mono text-[12px] tracking-[0.35em] uppercase mb-6"
            style={{ color: 'rgba(148,163,184,0.55)' }}
          >
            January 2029
          </div>
          <p
            className="leading-relaxed mb-8"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.05rem, 1.85vw, 1.18rem)',
              color: '#cbd5e1',
            }}
          >
            Three years into "managed decline." A crisis in the South China Sea forces the first
            real test of allied cohesion. Three protagonists face defining choices about commitment,
            risk, and strategic priorities.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onPrev}
              className="font-ui text-sm tracking-widest px-4 py-2 rounded-sm"
              style={{
                color: 'rgba(148,163,184,0.5)',
                border: '1px solid rgba(148,163,184,0.15)',
              }}
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              className="font-ui font-semibold text-sm tracking-[0.25em] uppercase px-6 py-3 rounded-sm"
              style={{
                background: 'rgba(59,130,246,0.14)',
                border: '1px solid rgba(59,130,246,0.45)',
                color: '#93c5fd',
              }}
            >
              Begin Chapter →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── INTEL ASSESSMENT PAGE ───
function IntelAssessment({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const shouldReduce = useReducedMotion();
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src="/assets/page_four_map.webp"
        alt="South China Sea strategic map"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.82)' }} />
      <div className="absolute inset-0 scan-lines" />

      <div className="absolute inset-0 overflow-y-auto flex items-start justify-center p-6 md:p-10">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7 }}
        >
          {/* Document header */}
          <div
            className="px-5 py-4 mb-1 rounded-sm animate-intel-flicker"
            style={{
              background: 'rgba(8,12,20,0.92)',
              border: '1px solid rgba(148,163,184,0.12)',
              fontFamily: 'Courier New, monospace',
            }}
          >
            <h3
              className="font-mono font-bold text-center mb-2"
              style={{ color: '#e2e8f0', fontSize: '1.08rem', letterSpacing: '0.05em' }}
            >
              Intelligence Assessment: South China Sea Escalation
            </h3>
            <div
              className="font-mono text-[10px] text-center"
              style={{ color: 'rgba(148,163,184,0.5)', letterSpacing: '0.2em' }}
            >
              15 JANUARY 2029 · 0530 EST
            </div>
          </div>

          {/* Document body */}
          <div
            className="px-5 py-5 rounded-sm space-y-4"
            style={{
              background: 'rgba(8,12,20,0.88)',
              border: '1px solid rgba(148,163,184,0.08)',
              borderTop: 'none',
            }}
          >
            <IntelSection
              label="KEY DEVELOPMENTS"
              text="Chinese Maritime Safety Administration (CMSA) vessels have established blocking position at Second Thomas Shoal. Philippines Coast Guard resupply mission to BRP Sierra Madre effectively halted."
            />
            <IntelSection
              label="ASSESSMENT"
              text="Beijing testing US commitment to Mutual Defense Treaty. Pattern consistent with 'salami-slicing' strategy. Philippines invoking treaty obligations within 48 hours (high confidence)."
              accent="#F59E0B"
            />
            <IntelSection
              label="ALLIED RESPONSE"
              text="Japan monitoring closely. Australia expressing concern. Allied capitals awaiting US position. Window for coordinated response: 72 hours."
            />
            <IntelSection
              label="RECOMMENDED ACTION"
              text="NSC Deputies Committee convene within 6 hours. Options ranging from diplomatic protest to freedom of navigation operation require POTUS decision by 1800 EST."
              accent="#ef4444"
            />
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={onPrev}
              className="font-ui text-sm tracking-widest px-4 py-2 rounded-sm"
              style={{ color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(148,163,184,0.15)' }}
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-6 py-2.5 rounded-sm"
              style={{
                background: 'rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.4)',
                color: '#93c5fd',
              }}
            >
              Continue →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function IntelSection({
  label,
  text,
  accent = '#3B82F6',
}: {
  label: string;
  text: string;
  accent?: string;
}) {
  return (
    <div>
      <div
        className="font-mono text-[11px] tracking-[0.3em] uppercase mb-1.5 font-bold"
        style={{ color: accent }}
      >
        {label}:
      </div>
      <p
        className="font-mono text-[13px] leading-relaxed"
        style={{ color: 'rgba(203,213,225,0.85)' }}
      >
        {text}
      </p>
    </div>
  );
}

// ─── SARAH'S INTERNAL STRUGGLE ───
function SarahOffice({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const shouldReduce = useReducedMotion();

  const messages = [
    {
      time: '05:42 AM',
      text: "Tokyo wants to know our position before they commit assets. We're running out of time to coordinate.",
      sender: 'NSC Tokyo',
    },
    {
      time: '05:43 AM',
      text: "Canberra same. PM won't move without US commitment. They all remember Afghanistan.",
      sender: 'NSC Canberra',
    },
    {
      time: '05:45 AM',
      text: "Sarah, if we don't lead on this, they'll start cutting their own deals. That's what Beijing is counting on.",
      sender: 'SecDef Office',
    },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src="/assets/page_five_sarah_chen_office.webp"
        alt="Sarah Chen in her office at 5:30 AM"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.75)' }} />
      <div className="absolute inset-0 overlay-left" />
      <div className="absolute inset-0 scan-lines" />

      {/* Blue character accent */}
      <div
        className="absolute top-0 left-0 w-0.5 h-full"
        style={{ background: 'linear-gradient(to bottom, #3B82F6, transparent)' }}
      />

      <div className="absolute inset-0 overflow-y-auto flex items-center p-8 md:p-14">
        <motion.div
          className="max-w-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7 }}
        >
          {/* Character badge */}
          <div
            className="font-mono text-[11px] tracking-[0.4em] uppercase mb-3 inline-block px-2 py-0.5 rounded-sm"
            style={{ color: '#3B82F6', background: '#3B82F614', border: '1px solid #3B82F630' }}
          >
            Washington DC — 05:30 EST
          </div>

          {/* Thought block */}
          <div
            className="glass-panel rounded-sm px-5 py-4 mb-5"
            style={{ borderLeft: '2px solid rgba(59,130,246,0.5)' }}
          >
            <p
              className="leading-relaxed"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1rem, 1.85vw, 1.12rem)',
                color: '#cbd5e1',
                fontStyle: 'italic',
              }}
            >
              "Three years of 'managed decline.' Three years of hoping drift wouldn't become disaster.
              Sarah had warned them. The allies were hedging. Every intelligence brief showed it—bilateral
              deals with Beijing, quiet accommodations, anticipatory compliance."
            </p>
          </div>

          {/* Message feed */}
          <div className="space-y-2 mb-5">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className="flex gap-3 items-start"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : i * 0.15 }}
              >
                <div
                  className="font-mono text-[10px] tracking-widest mt-1 flex-shrink-0"
                  style={{ color: 'rgba(59,130,246,0.6)' }}
                >
                  {msg.time}
                </div>
                <div
                  className="flex-1 px-3 py-2 rounded-sm"
                  style={{
                    background: 'rgba(59,130,246,0.06)',
                    border: '1px solid rgba(59,130,246,0.15)',
                  }}
                >
                  <div
                    className="font-mono text-[10px] tracking-widest mb-1 font-bold"
                    style={{ color: 'rgba(59,130,246,0.7)' }}
                  >
                    {msg.sender}
                  </div>
                  <p className="font-ui text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
                    {msg.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reflection */}
          <div
            className="glass-panel rounded-sm px-5 py-4 mb-4"
            style={{ borderLeft: '2px solid rgba(148,163,184,0.3)' }}
          >
            <p
              className="leading-relaxed"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.05rem, 1.85vw, 1.18rem)',
                color: '#94a3b8',
                fontStyle: 'italic',
              }}
            >
              "This was the choice that mattered. Not the crisis itself—those would keep coming. But
              whether America's word still meant something. Whether the network of alliances built over
              80 years would hold. Whether 'managed decline' was just another word for giving up."
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onPrev}
              className="font-ui text-sm tracking-widest px-4 py-2 rounded-sm"
              style={{ color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(148,163,184,0.15)' }}
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-5 py-2 rounded-sm"
              style={{
                background: 'rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.4)',
                color: '#93c5fd',
              }}
            >
              The Clock is Ticking →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── GLOBAL MONTAGE ───
const globalPanels = [
  {
    image: '/assets/page_six_DC.webp',
    city: 'Washington DC',
    text: 'White House press briefing scheduled for 1400 hours. No statement prepared yet.',
  },
  {
    image: '/assets/page_six_SF.webp',
    city: 'San Francisco',
    text: 'Tech stocks volatile on geopolitical uncertainty. Sentinel AI board emergency meeting called.',
  },
  {
    image: '/assets/page_six_tokyo.webp',
    city: 'Tokyo',
    text: "Prime Minister's office: 'Japan stands with Philippines, awaits coordinated allied response.'",
  },
  {
    image: '/assets/page_six_beijing.webp',
    city: 'Beijing',
    text: "Foreign Ministry spokesman: 'China exercising sovereign rights in Chinese waters.'",
  },
  {
    image: '/assets/page_six_europe.webp',
    city: 'Stockholm',
    text: 'Three member states request Article 4 consultations — the alliance mechanism for coordinated consultation, intelligence-sharing, and defensive signaling when members feel their security is threatened. Not Article 5.',
  },
  {
    image: '/assets/page_six_global.webp',
    city: 'Global Markets',
    text: "Financial markets opening in 2 hours. Gold up 3.2%. Defense stocks surging.",
  },
];

function GlobalMontage({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#080c14]">
      {/* Background */}
      <img
        src="/assets/page_six_global.webp"
        alt="Global overview"
        className="absolute inset-0 w-full h-full object-cover opacity-15"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.7)' }} />
      <div className="absolute inset-0 scan-lines" />

      <div className="absolute inset-0 overflow-y-auto flex flex-col p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6 }}
        >
          {/* Caption */}
          <p
            className="text-center text-shadow mb-6 max-w-2xl mx-auto"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1rem, 1.95vw, 1.18rem)',
              color: '#94a3b8',
              fontStyle: 'italic',
            }}
          >
            "In the next 72 hours, five people would make decisions that would shape the next decade.
            They didn't know each other yet. But their choices were already connected."
          </p>

          {/* Grid of city panels */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {globalPanels.map((panel, i) => (
              <motion.div
                key={panel.city}
                className="relative rounded-sm overflow-hidden"
                style={{ height: '160px' }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : i * 0.08 }}
              >
                <img
                  src={panel.image}
                  alt={panel.city}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.6)' }} />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(8,12,20,0.92) 0%, transparent 60%)',
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <div
                    className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1 font-bold"
                    style={{ color: 'rgba(59,130,246,0.8)' }}
                  >
                    {panel.city}
                  </div>
                  <p className="font-ui text-[12px] leading-snug" style={{ color: '#94a3b8' }}>
                    {panel.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ticker bar */}
          <div
            className="w-full overflow-hidden mb-6 py-1.5"
            style={{
              background: 'rgba(59,130,246,0.06)',
              border: '1px solid rgba(59,130,246,0.15)',
            }}
          >
            <div className="animate-ticker whitespace-nowrap font-mono text-[11px] tracking-widest" style={{ color: 'rgba(59,130,246,0.7)' }}>
              BREAKING: CMSA VESSELS MAINTAIN POSITION AT SECOND THOMAS SHOAL &nbsp;&nbsp;|&nbsp;&nbsp; MANILA INVOKES MUTUAL DEFENSE TREATY &nbsp;&nbsp;|&nbsp;&nbsp; GOLD UP 3.2% &nbsp;&nbsp;|&nbsp;&nbsp; DEFENSE STOCKS SURGE &nbsp;&nbsp;|&nbsp;&nbsp; NATO ARTICLE 4 CONSULTATIONS (NOT ARTICLE 5) REQUESTED &nbsp;&nbsp;|&nbsp;&nbsp; TOKYO MARKETS DOWN 4.1% &nbsp;&nbsp;|&nbsp;&nbsp; BEIJING: "CHINA EXERCISING SOVEREIGN RIGHTS" &nbsp;&nbsp;|&nbsp;&nbsp; BREAKING: CMSA VESSELS MAINTAIN POSITION AT SECOND THOMAS SHOAL &nbsp;&nbsp;|&nbsp;&nbsp; MANILA INVOKES MUTUAL DEFENSE TREATY &nbsp;&nbsp;|&nbsp;&nbsp; GOLD UP 3.2% &nbsp;&nbsp;|&nbsp;&nbsp; DEFENSE STOCKS SURGE &nbsp;&nbsp;
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={onPrev}
              className="font-ui text-sm tracking-widest px-4 py-2 rounded-sm"
              style={{ color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(148,163,184,0.15)' }}
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-5 py-2 rounded-sm"
              style={{
                background: 'rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.4)',
                color: '#93c5fd',
              }}
            >
              Decision Approaches →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── CLOCK IS TICKING ───
const crisisPanels = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    image: '/assets/page_seven_sarah_chen_call.webp',
    color: '#3B82F6',
    update:
      "receives call from Japanese NSC counterpart. 'Is America still committed to the region?'",
  },
  {
    id: 'maya',
    name: 'Dr. Maya Patel',
    image: '/assets/page_seven_maya_patel.webp',
    color: '#F59E0B',
    update:
      'AI models detect unusual Chinese social media patterns. Something bigger coming?',
  },
  {
    id: 'james',
    name: 'James Nakamura',
    image: '/assets/page_seven_james_nakamura.webp',
    color: '#10B981',
    update:
      'watches Nikkei plunge 4% on opening. Defense Ministry calling about accelerated drone delivery.',
  },
  {
    id: 'lijian',
    name: 'Vice Minister Li Jian',
    image: '/assets/page_seven_li_jian.webp',
    color: '#DC2626',
    update: "in emergency video conference. Hardliners arguing for 'decisive action.'",
  },
  {
    id: 'anna',
    name: 'Col. Anna Karlsson',
    image: '/assets/page_seven_anna_karlsson.webp',
    color: '#94A3B8',
    update: "briefs Swedish PM. 'This is the first real test of our NATO membership.'",
  },
];

function ClockTicking({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#080c14]">
      <img
        src="/assets/maritime_escalation_backplate.webp"
        alt="Maritime escalation"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.75)' }} />
      <div className="absolute inset-0 scan-lines" />

      <div className="absolute inset-0 overflow-y-auto flex flex-col p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduce ? 0 : 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div
              className="inline-block px-5 py-2 rounded-sm mb-3 font-mono tracking-[0.35em] uppercase font-bold animate-crisis-pulse"
              style={{
                color: '#ef4444',
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.4)',
                fontSize: '1.08rem',
              }}
            >
              THE CLOCK IS TICKING
            </div>
            <div
              className="font-mono text-[11px] tracking-[0.4em]"
              style={{ color: 'rgba(148,163,184,0.4)' }}
            >
              T-MINUS 72 HOURS — COORDINATED RESPONSE WINDOW CLOSING
            </div>
          </div>

          {/* Crisis panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {crisisPanels.map((panel, i) => (
              <motion.div
                key={panel.id}
                className="relative rounded-sm overflow-hidden"
                style={{ height: '180px' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : i * 0.1 }}
              >
                <img
                  src={panel.image}
                  alt={panel.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(8,12,20,0.65)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, rgba(8,12,20,0.95) 0%, transparent 50%)`,
                  }}
                />
                {/* Character color bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${panel.color}, transparent)` }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div
                    className="font-ui text-[12px] font-semibold mb-1"
                    style={{ color: panel.color }}
                  >
                    {panel.name}
                  </div>
                  <p
                    className="font-ui text-[12px] leading-snug"
                    style={{ color: '#94a3b8' }}
                  >
                    {panel.update}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={onPrev}
              className="font-ui text-sm tracking-widest px-4 py-2 rounded-sm"
              style={{ color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(148,163,184,0.15)' }}
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-5 py-2 rounded-sm"
              style={{
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.4)',
                color: '#fca5a5',
              }}
            >
              Global Reactions →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── DECISION APPROACH ───
function DecisionApproach({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const shouldReduce = useReducedMotion();

  const situation = [
    'Chinese vessels maintain blockade position',
    'Philippines formally invokes Mutual Defense Treaty',
    'Japan, Australia awaiting US coordination',
    'European allies watching closely',
    "Beijing spokesperson calls US response a 'test of credibility'",
    'Global media coverage intensifying',
  ];

  const whatHappens = [
    'NSC Deputies Committee meeting at 1400 EST',
    'Sarah Chen must recommend course of action to National Security Advisor',
    'Decision will signal US posture for next decade',
    'Allied responses depend on US leadership',
    'Window for coordinated action closes in 72 hours',
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src="/assets/strategic_pressure_plate.webp"
        alt="Strategic pressure visualization"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.85)' }} />
      <div className="absolute inset-0 scan-lines" />

      <div className="absolute inset-0 overflow-y-auto flex items-start justify-center p-6 md:p-10">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7 }}
        >
          {/* Header */}
          <div
            className="text-center py-3 mb-6 rounded-sm"
            style={{
              background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.25)',
            }}
          >
            <div
              className="font-mono font-bold tracking-[0.3em] uppercase"
              style={{ color: '#ef4444', fontSize: '0.98rem' }}
            >
              DECISION POINT | 1200 EST | 72 HOURS REMAINING
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            {/* Situation */}
            <div
              className="px-4 py-4 rounded-sm"
              style={{
                background: 'rgba(8,12,20,0.88)',
                border: '1px solid rgba(148,163,184,0.1)',
              }}
            >
              <div
                className="font-mono text-[11px] tracking-[0.3em] uppercase mb-3 font-bold"
                style={{ color: 'rgba(239,68,68,0.7)' }}
              >
                SITUATION
              </div>
              <ul className="space-y-2">
                {situation.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-[12px] mt-0.5 flex-shrink-0" style={{ color: 'rgba(239,68,68,0.6)' }}>
                      {i + 1}.
                    </span>
                    <span className="font-ui text-[13px] leading-snug" style={{ color: '#94a3b8' }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What happens next */}
            <div
              className="px-4 py-4 rounded-sm"
              style={{
                background: 'rgba(8,12,20,0.88)',
                border: '1px solid rgba(59,130,246,0.12)',
              }}
            >
              <div
                className="font-mono text-[11px] tracking-[0.3em] uppercase mb-3 font-bold"
                style={{ color: 'rgba(59,130,246,0.7)' }}
              >
                WHAT HAPPENS NEXT
              </div>
              <ul className="space-y-2">
                {whatHappens.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-[12px] mt-0.5 flex-shrink-0" style={{ color: 'rgba(59,130,246,0.6)' }}>
                      {i + 1}.
                    </span>
                    <span className="font-ui text-[13px] leading-snug" style={{ color: '#94a3b8' }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA text */}
          <div
            className="px-5 py-4 rounded-sm mb-5"
            style={{
              background: 'rgba(59,130,246,0.06)',
              border: '1px solid rgba(59,130,246,0.18)',
              borderLeft: '3px solid rgba(59,130,246,0.5)',
            }}
          >
            <p
              className="leading-relaxed"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1rem, 1.85vw, 1.12rem)',
                color: '#cbd5e1',
                fontStyle: 'italic',
              }}
            >
              Sarah Chen needs to recommend a response. The choice she makes now will determine
              whether allies coordinate or fragment, whether deterrence holds or fails, whether
              'managed decline' becomes irreversible.
            </p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={onPrev}
              className="font-ui text-sm tracking-widest px-4 py-2 rounded-sm"
              style={{ color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(148,163,184,0.15)' }}
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-6 py-2.5 rounded-sm"
              style={{
                background: 'rgba(59,130,246,0.15)',
                border: '1px solid rgba(59,130,246,0.5)',
                color: '#93c5fd',
              }}
            >
              Make Your Decision →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───
export default function CrisisBuildup() {
  const navigate = useGameStore((s) => s.navigate);
  const [stepIndex, setStepIndex] = useState(0);

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      navigate(5);
    }
  };

  const goPrev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else {
      navigate(3);
    }
  };

  const currentStep = STEPS[stepIndex];

  return (
    <div className="w-full h-screen overflow-hidden bg-[#080c14]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {currentStep === 'chapter-banner' && <ChapterBanner onNext={goNext} onPrev={goPrev} />}
          {currentStep === 'intel' && <IntelAssessment onNext={goNext} onPrev={goPrev} />}
          {currentStep === 'sarah-office' && <SarahOffice onNext={goNext} onPrev={goPrev} />}
          {currentStep === 'clock' && <ClockTicking onNext={goNext} onPrev={goPrev} />}
          {currentStep === 'global-montage' && <GlobalMontage onNext={goNext} onPrev={goPrev} />}
          {currentStep === 'decision-approach' && (
            <DecisionApproach onNext={goNext} onPrev={goPrev} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Step progress indicator — safe from button overlap */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-50 px-3 py-1.5 rounded-full"
        style={{ background: 'rgba(8,12,20,0.6)', backdropFilter: 'blur(8px)' }}>
        {STEPS.map((_, i) => (
          <div
            key={i}
            className="transition-all duration-300"
            style={{
              width: i === stepIndex ? '18px' : '5px',
              height: '5px',
              borderRadius: '2.5px',
              background:
                i === stepIndex
                  ? 'rgba(59,130,246,0.8)'
                  : i < stepIndex
                  ? 'rgba(59,130,246,0.35)'
                  : 'rgba(148,163,184,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
