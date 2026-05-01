import { motion, useReducedMotion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

interface Domain {
  label: string;
  title: string;
  body: string;
  color: string;
}

const DOMAINS: Domain[] = [
  {
    label: 'Maritime',
    title: 'The Indo-Pacific Edge',
    body: 'Beijing has spent a decade testing alliance treaties through "salami-slicing" — coast guard standoffs, artificial islands, energy deals with US partners. Manila, Tokyo, Canberra are all watching to see what an American security guarantee is still worth.',
    color: '#3B82F6',
  },
  {
    label: 'AI & Frontier Tech',
    title: 'The Capabilities Race',
    body: 'Frontier AI has crossed thresholds the policy world is still catching up to. Export controls, talent flows, and licensing decisions made in Silicon Valley boardrooms now carry the same weight as treaty negotiations.',
    color: '#F59E0B',
  },
  {
    label: 'Digital Silk Road',
    title: 'Infrastructure as Influence',
    body: 'China has been quietly bundling 5G, surveillance, payments and logistics into a deployable stack — exported to Belt and Road partners across Southeast Asia, Africa, and the Gulf. Each deployment locks in standards, data flows, and political leverage.',
    color: '#DC2626',
  },
  {
    label: 'Alliance System',
    title: 'An 80-Year Bet, Reopened',
    body: 'NATO, AUKUS, the Quad, the bilateral treaties with Japan, Korea, the Philippines — the post-1945 alliance system was built for a different world. New members like Sweden are still working out what "burden-sharing" means. Older ones are quietly hedging.',
    color: '#94A3B8',
  },
];

const METRICS = [
  {
    name: 'Alliance Trust',
    desc: 'Whether partners believe US commitments still hold',
    color: '#3B82F6',
  },
  {
    name: 'Tech Edge',
    desc: 'Frontier AI, semiconductors, autonomous systems',
    color: '#F59E0B',
  },
  {
    name: 'Strategic Coherence',
    desc: 'Whether your moves add up to a strategy or contradict each other',
    color: '#10B981',
  },
  {
    name: 'Domestic Resilience',
    desc: 'Political legitimacy and fiscal headroom at home',
    color: '#94A3B8',
  },
];

export default function ScenarioBriefing() {
  const navigate = useGameStore((s) => s.navigate);
  const shouldReduce = useReducedMotion();

  const dur = (d: number) => (shouldReduce ? 0 : d);
  const del = (d: number) => (shouldReduce ? 0 : d);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#080c14]">
      {/* Background */}
      <img
        src="/assets/page_six_global.webp"
        alt="Global overview"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        loading="eager"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.78)' }} />
      <div className="absolute inset-0 scan-lines" />

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(59,130,246,0.6), rgba(245,158,11,0.5), rgba(220,38,38,0.6), rgba(148,163,184,0.4))',
        }}
      />

      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full flex items-start justify-center px-5 md:px-10 py-12 md:py-16">
          <motion.div
            className="w-full max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.7) }}
          >
            {/* Header */}
            <div className="mb-8">
              <div
                className="font-mono text-[12px] tracking-[0.4em] uppercase mb-2"
                style={{ color: 'rgba(59,130,246,0.7)' }}
              >
                Briefing · The World in 2029
              </div>
              <h1
                className="text-shadow-xl mb-3 leading-tight"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)',
                  fontWeight: 700,
                  color: '#f1f5f9',
                }}
              >
                Before the crisis — the world they're living in.
              </h1>
              <div
                className="font-mono text-[11px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(148,163,184,0.45)' }}
              >
                15 January 2029 · 0530 EST · Pre-incident
              </div>
            </div>

            {/* The Setup */}
            <motion.section
              className="mb-8"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.7), delay: del(0.15) }}
            >
              <SectionLabel>The Setup</SectionLabel>
              <div className="space-y-3">
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(1.05rem, 1.85vw, 1.18rem)',
                    color: '#cbd5e1',
                  }}
                >
                  It's been three years of what Washington calls "managed competition" with China —
                  and what most of the rest of the world calls <em>managed decay</em>. The two largest
                  economies are too entangled to decouple, too rivalrous to cooperate. Allies have
                  stopped picking sides loudly and started hedging quietly.
                </p>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(1.05rem, 1.85vw, 1.18rem)',
                    color: '#cbd5e1',
                  }}
                >
                  Three forces are converging at once: frontier AI capabilities advancing faster
                  than any export control regime can keep up with, US fiscal and political bandwidth
                  narrowing year over year, and Beijing testing red lines more often — and getting
                  bolder when nobody pushes back. Nothing has broken yet. Everything is bending.
                </p>
              </div>
            </motion.section>

            {/* Four Domains */}
            <motion.section
              className="mb-8"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.7), delay: del(0.3) }}
            >
              <SectionLabel>Four Domains in Tension</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DOMAINS.map((d, i) => (
                  <motion.div
                    key={d.label}
                    className="px-4 py-3.5 rounded-sm"
                    style={{
                      background: 'rgba(8,12,20,0.7)',
                      border: '1px solid rgba(148,163,184,0.12)',
                      borderLeft: `2px solid ${d.color}80`,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: dur(0.5), delay: del(0.4 + i * 0.08) }}
                  >
                    <div
                      className="font-mono text-[11px] tracking-[0.3em] uppercase mb-1.5"
                      style={{ color: d.color }}
                    >
                      {d.label}
                    </div>
                    <div
                      className="mb-1.5"
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '1.12rem',
                        fontWeight: 700,
                        color: '#e2e8f0',
                      }}
                    >
                      {d.title}
                    </div>
                    <p
                      className="leading-relaxed"
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '0.98rem',
                        color: '#94a3b8',
                      }}
                    >
                      {d.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Metrics primer */}
            <motion.section
              className="mb-8"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.7), delay: del(0.55) }}
            >
              <SectionLabel>What You'll Be Tracking</SectionLabel>
              <p
                className="mb-3 leading-relaxed"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.08rem',
                  color: '#94a3b8',
                  fontStyle: 'italic',
                }}
              >
                Every choice in this scenario moves four numbers. They're never independent —
                pulling one usually costs another.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {METRICS.map((m) => (
                  <div
                    key={m.name}
                    className="px-3 py-2.5 rounded-sm flex items-start gap-3"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      className="w-1 self-stretch rounded-sm flex-shrink-0"
                      style={{ background: m.color, boxShadow: `0 0 6px ${m.color}80` }}
                    />
                    <div>
                      <div
                        className="font-ui font-semibold text-[14px]"
                        style={{ color: '#e2e8f0' }}
                      >
                        {m.name}
                      </div>
                      <div
                        className="font-ui text-[13px] leading-snug"
                        style={{ color: 'rgba(148,163,184,0.7)' }}
                      >
                        {m.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* What you're about to do */}
            <motion.section
              className="mb-10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.7), delay: del(0.75) }}
            >
              <SectionLabel>What's About to Happen</SectionLabel>
              <div
                className="px-5 py-4 rounded-sm"
                style={{
                  background: 'rgba(239,68,68,0.05)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderLeft: '3px solid rgba(239,68,68,0.5)',
                }}
              >
                <p
                  className="leading-relaxed mb-2"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(1.05rem, 1.85vw, 1.18rem)',
                    color: '#cbd5e1',
                  }}
                >
                  In a few hours, Chinese coast guard vessels will move into a position they have
                  not held before — blocking a Philippines resupply mission to Second Thomas Shoal.
                  Manila will invoke its Mutual Defense Treaty with Washington. The next 90 days
                  will run through five capitals.
                </p>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(1.05rem, 1.75vw, 1.15rem)',
                    color: '#94a3b8',
                    fontStyle: 'italic',
                  }}
                >
                  You'll see it from inside each of them. Your decisions stack. Four very different
                  futures are still on the table.
                </p>
              </div>
            </motion.section>

            {/* Nav */}
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: dur(0.5), delay: del(0.95) }}
            >
              <button
                onClick={() => navigate(2)}
                className="font-ui text-sm tracking-widest px-4 py-2 rounded-sm"
                style={{
                  color: 'rgba(148,163,184,0.5)',
                  border: '1px solid rgba(148,163,184,0.15)',
                }}
              >
                ← Back to Players
              </button>
              <button
                onClick={() => navigate(4)}
                className="font-ui font-semibold text-sm tracking-[0.25em] uppercase px-6 py-3 rounded-sm"
                style={{
                  background: 'rgba(59,130,246,0.14)',
                  border: '1px solid rgba(59,130,246,0.45)',
                  color: '#93c5fd',
                }}
              >
                Into the Crisis →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono text-[12px] tracking-[0.35em] uppercase mb-3 pb-1.5"
      style={{
        color: 'rgba(148,163,184,0.7)',
        borderBottom: '1px solid rgba(148,163,184,0.15)',
      }}
    >
      {children}
    </div>
  );
}
