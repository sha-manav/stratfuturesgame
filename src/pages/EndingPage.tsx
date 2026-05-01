import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useGameStore, TOTAL_DECISIONS } from '../store/gameStore';
import { endings } from '../content/endings';
import { CHAPTERS } from '../content/decisions';

const ENDING_COLORS: Record<string, string> = {
  A: '#10B981', // jade — cooperation
  B: '#94A3B8', // silver — trundling
  C: '#DC2626', // crimson — crucible
  D: '#F59E0B', // amber — strategic judo
};

const ENDING_ICONS: Record<string, string> = {
  A: '🤝',
  B: '📉',
  C: '⚔️',
  D: '🥋',
};

// ── Sweden (2.2) port paragraph variants for Trundling Along (B) ──
const SWEDEN_PARAGRAPHS: Record<string, string> = {
  A: "Anna Karlsson's blanket restriction on non-allied port infrastructure held the perimeter but squeezed Sweden's transit economy. Gothenburg throughput fell 18%. Rotterdam and Antwerp — less cautious — absorbed the rerouted volume. \"We were safe,\" Anna says. \"We were also smaller. The politicians who wanted the savings now want the traffic back.\"",
  B: "Anna Karlsson's hybrid approach to port infrastructure failed to hold the line. A remote-maintenance session on a terminal operating system pivoted laterally through a shared identity provider into naval logistics databases. Forty-seven connection points, the auditors counted. \"We thought we could have both efficiency and control,\" Anna says. \"We were wrong about the seams.\"",
  C: "Anna Karlsson's monitoring-only posture generated more telemetry than Sweden had analysts to read. An anomalous firmware push on ship-to-shore cranes was flagged eleven months after deployment. \"We saw everything,\" Anna says. \"We understood almost none of it in time.\"",
};

// ── Sentinel (1.2) paragraph variants for Trundling Along (B) ──
const SENTINEL_PARAGRAPHS: Record<string, string> = {
  A: "Maya Patel's Sentinel-7 runs inside Five Eyes national security systems — and almost nowhere else that matters. The licensing revenue is stable. But every allied country that wasn't Five Eyes built a parallel AI stack rather than depend on a system they couldn't audit. \"We're the standard for five governments,\" Maya tells the board. \"The other hundred and ninety are using something else.\"",
  B: "Maya Patel's Sentinel AI is profitable. Revenue: $4.2B. But allied sales are down 60%. The UK, Japan, EU, and Israel have all built independent, incompatible AI ecosystems. \"We own 100% of a fragmenting market,\" Maya tells the board. The stock is fine. The strategy is bankrupt.",
  C: "Maya Patel's consortium became a committee. Governance rules that took four governments to approve took sixteen to maintain. Product velocity collapsed while Chinese alternatives shipped weekly. \"We optimized for legitimacy,\" Maya tells the board. \"We optimized away our speed.\"",
};

const ORIGINAL_SWEDEN_PARA = "Anna Karlsson's hybrid 5G approach failed. Chinese malware detected in the civilian network migrated to military systems through 47 connection points. 'We saved 200 million krona,' the politicians said. 'It cost us...' Anna pauses. 'We'll never know what it cost us.'";
const ORIGINAL_SENTINEL_PARA = "Maya Patel's Sentinel AI is profitable. Revenue: $4.2B. But allied sales are down 60%. The UK, Japan, EU, and Israel have all built independent, incompatible AI ecosystems. 'We own 100% of a fragmenting market,' Maya tells the board. The stock is fine. The strategy is bankrupt.";

function buildEndingBody(endingId: string, originalBody: string, decisions: Record<string, string>): string {
  if (endingId !== 'B') return originalBody;
  let body = originalBody;

  const swedenChoice = decisions['2.2'];
  if (swedenChoice && SWEDEN_PARAGRAPHS[swedenChoice]) {
    body = body.replace(ORIGINAL_SWEDEN_PARA, SWEDEN_PARAGRAPHS[swedenChoice]);
  }

  const sentinelChoice = decisions['1.2'];
  if (sentinelChoice && SENTINEL_PARAGRAPHS[sentinelChoice] && sentinelChoice !== 'B') {
    body = body.replace(ORIGINAL_SENTINEL_PARA, SENTINEL_PARAGRAPHS[sentinelChoice]);
  }

  return body;
}

export default function EndingPage() {
  const navigate = useGameStore((s) => s.navigate);
  const computeEnding = useGameStore((s) => s.computeEnding);
  const currentEnding = useGameStore((s) => s.currentEnding);
  const resetGame = useGameStore((s) => s.resetGame);
  const decisions = useGameStore((s) => s.decisions);
  const metrics = useGameStore((s) => s.metrics);
  const trajectory = useGameStore((s) => s.trajectory);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    computeEnding();
  }, [computeEnding]);

  const endingId = currentEnding ?? 'B';
  const ending = endings.find((e) => e.id === endingId);
  const color = ENDING_COLORS[endingId] ?? '#94A3B8';
  const icon = ENDING_ICONS[endingId] ?? '📋';

  if (!ending) return null;

  const decisionsCount = Object.keys(decisions).length;
  const body = buildEndingBody(endingId, ending.body, decisions);
  const paragraphs = body.split('\n\n').filter(Boolean);

  const handleReplay = () => {
    resetGame();
    navigate(0);
  };

  // All 4 endings for the comparison strip
  const allEndings = endings;

  return (
    <div className="relative w-full h-full overflow-y-auto bg-[#080c14]">
      {/* Hero image */}
      <div className="relative w-full" style={{ height: 'min(65vh, 520px)' }}>
        <img
          src={ending.image}
          alt={ending.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 overlay-dark" />

        {/* Title overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.7 }}
          >
            <div className="text-4xl mb-4">{icon}</div>
            <div className="font-mono text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: `${color}90` }}>
              Spring 2031 · Ending {endingId}
            </div>
            <h1
              className="text-shadow-xl mb-2"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.8rem,4.5vw,3.2rem)',
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: '#f8fafc',
              }}
            >
              {ending.title}
            </h1>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-shadow" style={{ color: 'rgba(203,213,225,0.7)' }}>
              {ending.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content section */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Main narrative */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 0.3 }}
          className="mb-8"
        >
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-serif leading-[1.95] mb-5 text-shadow"
              style={{
                fontSize: 'clamp(1rem,1.7vw,1.18rem)',
                color: i === 0 ? '#e2e8f0' : '#94a3b8',
              }}
            >
              {para}
            </p>
          ))}
        </motion.div>

        {/* Achieved through */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.45 }}
          className="glass-panel rounded-sm p-5 mb-8"
          style={{ borderLeft: `2px solid ${color}55` }}
        >
          <div className="font-mono text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: `${color}80` }}>
            {endingId === 'B' ? 'Result Of' : 'Achieved Through'}
          </div>
          <p className="font-ui text-base leading-relaxed" style={{ color: '#94a3b8' }}>
            {ending.achievedThrough}
          </p>
        </motion.div>

        {/* Strategic trajectory summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.5 }}
          className="mb-8"
        >
          <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(148,163,184,0.4)' }}>
            Your Strategic Trajectory
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Alliance Path', value: trajectory.alliance_path, color: '#3B82F6', inverted: false },
              { label: 'Tech Path', value: trajectory.tech_path, color: '#F59E0B', inverted: false },
              { label: 'Escalation Path', value: trajectory.escalation_path, color: '#DC2626', inverted: true },
              { label: 'Restraint Path', value: trajectory.restraint_path, color: '#94A3B8', inverted: false },
            ].map((t) => {
              // For escalation: positive = redder (danger), negative = green (de-escalation).
              // For others: positive = own color, negative = red (lost ground).
              const displayColor = t.inverted
                ? (t.value > 0 ? '#DC2626' : t.value < 0 ? '#10B981' : 'rgba(148,163,184,0.7)')
                : (t.value >= 0 ? t.color : 'rgba(248,113,113,0.8)');
              return (
                <div key={t.label} className="glass-panel rounded-sm p-3 text-center">
                  <div className="font-mono text-[9px] tracking-wide uppercase mb-1" style={{ color: 'rgba(148,163,184,0.4)' }}>
                    {t.label}
                  </div>
                  <div
                    className="font-mono text-xl font-bold"
                    style={{ color: displayColor }}
                  >
                    {t.value >= 0 ? '+' : ''}{t.value}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Final metrics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.55 }}
          className="mb-8"
        >
          <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(148,163,184,0.4)' }}>
            Final State — {decisionsCount} of {TOTAL_DECISIONS} Decisions Made
          </div>
          <div className="space-y-3">
            {[
              { label: 'Alliance Trust', value: metrics.allianceTrust, color: '#3B82F6' },
              { label: 'Tech Edge', value: metrics.techEdge, color: '#F59E0B' },
              { label: 'Strategic Coherence', value: metrics.strategicCoherence, color: '#10B981' },
              { label: 'Domestic Resilience', value: metrics.domesticResilience, color: '#8B5CF6' },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] tracking-wide" style={{ color: 'rgba(148,163,184,0.6)' }}>
                    {m.label}
                  </span>
                  <span className="font-mono text-[12px] font-bold" style={{ color: m.color }}>
                    {m.value}
                  </span>
                </div>
                <div className="metric-track h-[3px] rounded-full">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: m.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: shouldReduce ? 0 : 0.8, ease: 'easeOut', delay: 0.6 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* All 4 endings comparison */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.65 }}
          className="mb-10"
        >
          <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(148,163,184,0.4)' }}>
            Four Possible Endings
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allEndings.map((e) => {
              const eColor = ENDING_COLORS[e.id] ?? '#94A3B8';
              const isThis = e.id === endingId;
              return (
                <div
                  key={e.id}
                  className="glass-panel rounded-sm p-3 text-center transition-all"
                  style={{
                    borderColor: isThis ? `${eColor}50` : 'rgba(148,163,184,0.08)',
                    border: `1px solid ${isThis ? eColor + '50' : 'rgba(148,163,184,0.08)'}`,
                    background: isThis ? `${eColor}08` : 'rgba(15,22,35,0.6)',
                  }}
                >
                  <div className="text-lg mb-1">{ENDING_ICONS[e.id]}</div>
                  <div className="font-mono text-[9px] tracking-wide uppercase" style={{ color: isThis ? eColor : 'rgba(148,163,184,0.35)' }}>
                    {e.id === 'A' ? 'Cooperation' : e.id === 'B' ? 'Trundling' : e.id === 'C' ? 'Crucible' : 'Judo'}
                  </div>
                  {isThis && (
                    <div className="font-mono text-[8px] tracking-widest uppercase mt-1" style={{ color: eColor }}>
                      YOUR PATH
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Decisions recap */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.7 }}
          className="mb-10"
        >
          <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(148,163,184,0.4)' }}>
            Decision Log
          </div>
          <div className="space-y-2">
            {CHAPTERS.map((chapter) =>
              chapter.decisions.map((decision) => {
                const choiceId = decisions[decision.id];
                const choice = decision.choices.find((c) => c.id === choiceId);
                return (
                  <div
                    key={decision.id}
                    className="flex items-start gap-3 glass-panel rounded-sm px-4 py-3"
                    style={{ opacity: choice ? 1 : 0.35 }}
                  >
                    <div className="font-mono text-[10px] tracking-wide flex-shrink-0 mt-0.5"
                      style={{ color: 'rgba(148,163,184,0.4)', minWidth: '32px' }}>
                      {decision.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-ui text-[13px] font-medium mb-0.5" style={{ color: '#94a3b8' }}>
                        {decision.decisionTitle}
                      </div>
                      {choice ? (
                        <div className="font-mono text-[11px]" style={{ color: 'rgba(148,163,184,0.5)' }}>
                          Option {choiceId}: {choice.title}
                        </div>
                      ) : (
                        <div className="font-mono text-[11px]" style={{ color: 'rgba(148,163,184,0.25)' }}>
                          Not reached
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.8 }}
          className="flex flex-wrap gap-3 pb-16"
        >
          <button
            onClick={handleReplay}
            className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-6 py-3 rounded-sm transition-all"
            style={{
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.4)',
              color: '#93c5fd',
            }}
          >
            Replay from Start →
          </button>
          <button
            onClick={() => navigate(5)}
            className="font-ui text-sm tracking-[0.2em] uppercase px-6 py-3 rounded-sm transition-all"
            style={{
              background: 'rgba(148,163,184,0.06)',
              border: '1px solid rgba(148,163,184,0.15)',
              color: 'rgba(148,163,184,0.6)',
            }}
          >
            Revisit Decisions
          </button>
        </motion.div>
      </div>
    </div>
  );
}
