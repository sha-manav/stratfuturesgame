import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { CHAPTERS, type DecisionNode, type DecisionChoice, DECISION_1_1_FULL_CONSEQUENCES } from '../content/decisions';
import { getCharacterByDecisionId } from '../content/characters';


const CHARACTER_COLORS: Record<string, string> = {
  sarah_chen: '#3B82F6',
  maya_patel: '#F59E0B',
  james_nakamura: '#10B981',
  li_jian: '#DC2626',
  anna_karlsson: '#94A3B8',
  all_five: '#8B5CF6',
  allied_four: '#5B8DEF',
};

const CHARACTER_LABELS: Record<string, string> = {
  sarah_chen: 'Sarah Chen',
  maya_patel: 'Dr. Maya Patel',
  james_nakamura: 'James Nakamura',
  li_jian: 'Li Jian',
  anna_karlsson: 'Anna Karlsson',
  all_five: 'All Five Protagonists',
  allied_four: 'US & Allied Decision-Makers',
};

function MetricBadge({ label }: { label: string }) {
  const positive = !label.includes('−');
  return (
    <span
      className="inline-block font-mono text-[11px] tracking-wide px-1.5 py-0.5 rounded-sm mr-1 mb-1"
      style={{
        color: positive ? '#34d399' : '#f87171',
        background: positive ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
        border: `1px solid ${positive ? 'rgba(52,211,153,0.22)' : 'rgba(248,113,113,0.22)'}`,
      }}
    >
      {label}
    </span>
  );
}

// ────────────────────────────────────────────────
// Full narrative consequence panel (Decision 1.1 only)
// ────────────────────────────────────────────────
function FullConsequencePanel({ choiceId, onNext, onBack }: { choiceId: string; onNext: () => void; onBack: () => void }) {
  const data = DECISION_1_1_FULL_CONSEQUENCES[choiceId as 'A' | 'B' | 'C'];
  if (!data) return null;
  const shouldReduce = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-y-auto">
      <div className="min-h-full flex flex-col p-4 pt-6 md:p-8 md:pt-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5 }}
          className="flex-shrink-0 mb-6"
        >
          <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(245,158,11,0.7)' }}>
            CONSEQUENCES — 48–96 HOURS LATER
          </div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 700, color: '#f1f5f9' }}>
            {data.title}
          </h2>
          <p className="font-mono text-[11px] tracking-widest mt-1" style={{ color: 'rgba(148,163,184,0.6)' }}>
            {data.subtitle}
          </p>
        </motion.div>

        {/* Effects grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-3 mb-5 flex-shrink-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.15 }}
        >
          {data.effects.map((effect, i) => (
            <div
              key={i}
              className="glass-panel rounded-sm p-4"
              style={{ borderLeft: `2px solid ${effect.positive ? 'rgba(52,211,153,0.4)' : 'rgba(248,113,113,0.4)'}` }}
            >
              <div className="font-mono text-[11px] tracking-widest mb-1.5 font-bold"
                style={{ color: effect.positive ? '#34d399' : '#f87171' }}>
                {effect.label}
              </div>
              <p className="font-ui text-[13px] leading-relaxed" style={{ color: '#94a3b8' }}>
                {effect.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Beijing response */}
        <motion.div
          className="glass-panel rounded-sm p-4 mb-5 flex-shrink-0"
          style={{ borderLeft: '2px solid rgba(220,38,38,0.35)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.25 }}
        >
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(220,38,38,0.7)' }}>
            Beijing Response
          </div>
          <p className="font-ui text-[13px] leading-relaxed italic" style={{ color: '#94a3b8' }}>
            {data.chineseResponse}
          </p>
        </motion.div>

        {/* Character panels */}
        <motion.div
          className="grid md:grid-cols-3 gap-3 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.35 }}
        >
          {data.characters.map((char) => (
            <div key={char.characterId} className="relative rounded-sm overflow-hidden" style={{ minHeight: '220px' }}>
              <img
                src={char.image}
                alt={char.characterId}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,12,20,0.97) 0%, rgba(8,12,20,0.6) 50%, rgba(8,12,20,0.2) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-serif text-[13px] leading-relaxed mb-2 text-shadow" style={{ color: '#cbd5e1' }}>
                  {char.story}
                </p>
                <p className="font-serif italic text-[12px] text-shadow" style={{ color: 'rgba(148,163,184,0.7)' }}>
                  "{char.dialogue}"
                </p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Fixed bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 px-3 py-3 md:px-6 md:py-4"
        style={{
          background: 'rgba(8,12,20,0.95)',
          borderTop: '1px solid rgba(148,163,184,0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="font-ui text-sm tracking-widest px-3 py-2 rounded-sm"
            style={{ color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(148,163,184,0.15)' }}
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-5 py-2 rounded-sm"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd' }}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Brief consequence (all other decisions)
// ────────────────────────────────────────────────
function BriefConsequencePanel({
  decision,
  choiceId,
  onNext,
  onBack,
}: {
  decision: DecisionNode;
  choiceId: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const choice = decision.choices.find((c) => c.id === choiceId);
  const shouldReduce = useReducedMotion();
  if (!choice) return null;
  const color = CHARACTER_COLORS[decision.characterId] ?? '#94A3B8';

  return (
    <div className="absolute inset-0 overflow-y-auto">
      <div className="min-h-full flex flex-col p-4 pt-6 md:p-8 md:pt-8 pb-24 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5 }}
          className="flex-shrink-0 mb-6"
        >
          <div
            className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-sm inline-flex"
            style={{
              background: `${color}12`,
              border: `1px solid ${color}30`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
            />
            <span className="font-ui text-[13px] font-semibold tracking-wide" style={{ color }}>
              {CHARACTER_LABELS[decision.characterId] ?? decision.characterName}
            </span>
          </div>
          <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(245,158,11,0.6)' }}>
            OUTCOME — Decision {decision.id}
          </div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.1rem,2.5vw,1.6rem)', fontWeight: 700, color: '#f1f5f9' }}>
            {choice.consequence.headline}
          </h3>
        </motion.div>

        <motion.div
          className="glass-panel rounded-sm p-5 mb-6"
          style={{ borderLeft: `2px solid ${color}60` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.15 }}
        >
          <p className="font-serif text-base leading-[1.85]" style={{ color: '#cbd5e1' }}>
            {choice.consequence.body}
          </p>
        </motion.div>

        {/* Impact tags */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduce ? 0 : 0.4, delay: shouldReduce ? 0 : 0.25 }}
        >
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(148,163,184,0.45)' }}>
            Strategic Impact
          </div>
          <div className="flex flex-wrap">
            {choice.impactLabels.map((label) => (
              <MetricBadge key={label} label={label} />
            ))}
          </div>
        </motion.div>

      </div>

      {/* Fixed bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 px-3 py-3 md:px-6 md:py-4"
        style={{
          background: 'rgba(8,12,20,0.95)',
          borderTop: '1px solid rgba(148,163,184,0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="font-ui text-sm tracking-widest px-3 py-2 rounded-sm"
            style={{ color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(148,163,184,0.15)' }}
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-5 py-2 rounded-sm"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd' }}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Chapter complete screen
// ────────────────────────────────────────────────
function ChapterCompletePanel({ chapter, onNext, onBack, isLast }: { chapter: typeof CHAPTERS[0]; onNext: () => void; onBack: () => void; isLast: boolean }) {
  const shouldReduce = useReducedMotion();
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduce ? 0 : 0.6 }}
        className="max-w-lg"
      >
        <div className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(148,163,184,0.45)' }}>
          Chapter {chapter.number} Complete
        </div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.75rem' }}>
          {chapter.name}
        </h2>
        <p className="font-serif text-base leading-relaxed mb-8" style={{ color: '#94a3b8' }}>
          {isLast
            ? 'All decisions made. The trajectory of the next decade has been set. The ending is determined by the choices you made.'
            : `The decisions of ${chapter.subtitle} are complete. The next chapter awaits.`}
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onBack}
            className="font-ui text-sm tracking-widest px-4 py-2 rounded-sm"
            style={{ color: 'rgba(148,163,184,0.45)', border: '1px solid rgba(148,163,184,0.15)' }}
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            className="font-ui font-semibold text-sm tracking-[0.25em] uppercase px-8 py-3.5 rounded-sm transition-all"
            style={{
              background: isLast ? 'rgba(139,92,246,0.15)' : 'rgba(59,130,246,0.12)',
              border: `1px solid ${isLast ? 'rgba(139,92,246,0.5)' : 'rgba(59,130,246,0.4)'}`,
              color: isLast ? '#a78bfa' : '#93c5fd',
            }}
          >
            {isLast ? 'See Outcome →' : 'Next Chapter →'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Single decision panel
// ────────────────────────────────────────────────
function DecisionPanel({
  decision,
  onDecide,
  onBack,
  decisionIndex,
  totalInChapter,
}: {
  decision: DecisionNode;
  onDecide: (choiceId: string, choice: DecisionChoice) => void;
  onBack: () => void;
  decisionIndex: number;
  totalInChapter: number;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const shouldReduce = useReducedMotion();
  const color = CHARACTER_COLORS[decision.characterId] ?? '#94A3B8';
  const existingDecision = useGameStore((s) => s.decisions[decision.id]);

  // Pre-select if already decided
  useEffect(() => {
    if (existingDecision) setSelected(existingDecision);
  }, [existingDecision]);

  const selectedChoice = decision.choices.find((c) => c.id === selected);
  const alreadyDecided = !!existingDecision;

  const handleConfirm = () => {
    if (!selected) return;
    if (!confirming && !alreadyDecided) { setConfirming(true); return; }
    const choice = decision.choices.find((c) => c.id === selected)!;
    onDecide(selected, choice);
  };

  return (
    <div className="absolute inset-0 overflow-y-auto">
      <div className="min-h-full flex flex-col p-4 pt-6 md:p-8 md:pt-8" style={{ paddingBottom: '5rem' }}>

        {/* Top bar — left-aligned to avoid MetricHUD overlap in top-right */}
        <motion.div
          className="flex items-center gap-3 mb-4 flex-shrink-0 flex-wrap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.4 }}
        >
          {decision.critical && (
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase px-2 py-1 rounded-sm"
              style={{ color: 'rgba(239,68,68,0.9)', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
              CRITICAL
            </span>
          )}
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(148,163,184,0.45)' }}>
            {decisionIndex + 1} / {totalInChapter}
          </span>
        </motion.div>

        {/* Character decision-maker banner + decision header */}
        <motion.div
          className="mb-5 flex-shrink-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.1 }}
        >
          {/* Prominent "whose decision" banner */}
          <div
            className="flex items-center gap-3 mb-3 px-4 py-2.5 rounded-sm"
            style={{
              background: `${color}12`,
              border: `1px solid ${color}35`,
              borderLeft: `3px solid ${color}`,
            }}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: color, boxShadow: `0 0 8px ${color}80` }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-ui text-base font-bold" style={{ color }}>
                {decision.characterId === 'all_five'
                  ? 'ALL FIVE PROTAGONISTS\u2019 DECISION'
                  : decision.characterId === 'allied_four'
                  ? 'US & ALLIED DECISION'
                  : `${CHARACTER_LABELS[decision.characterId]?.toUpperCase() ?? decision.characterName.toUpperCase()}\u2019S DECISION`}
              </div>
              <div className="font-mono text-[11px] tracking-wide" style={{ color: 'rgba(148,163,184,0.6)' }}>
                {decision.characterId === 'all_five'
                  ? 'A collective choice by all five decision-makers'
                  : decision.characterId === 'allied_four'
                  ? 'A collective choice by US and allied decision-makers'
                  : (() => {
                      const char = getCharacterByDecisionId(decision.characterId);
                      return char ? `${char.role} · ${char.location}` : decision.characterName;
                    })()}
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-3 mb-1 flex-wrap">
            <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: `${color}90` }}>
              Decision {decision.id}
            </div>
            {decision.date && (
              <div className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(148,163,184,0.55)' }}>
                {decision.date}
              </div>
            )}
          </div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.2rem,2.8vw,1.9rem)', fontWeight: 700, color: '#f1f5f9' }}>
            {decision.decisionTitle}
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex-1 grid md:grid-cols-3 gap-4">

          {/* Left: context */}
          <motion.div
            className="md:col-span-1 space-y-3"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.15 }}
          >
            <div className="glass-panel rounded-sm p-4" style={{ borderLeft: `2px solid ${color}50` }}>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2 font-bold"
                style={{ color: `${color}80` }}>
                Situation
              </div>
              <p className="font-ui text-[13px] leading-relaxed" style={{ color: '#94a3b8', whiteSpace: 'pre-line' }}>
                {decision.context}
              </p>
            </div>
            <div className="glass-panel rounded-sm p-4" style={{ borderLeft: '2px solid rgba(245,158,11,0.35)' }}>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2 font-bold"
                style={{ color: 'rgba(245,158,11,0.65)' }}>
                Decision Required
              </div>
              <p className="font-serif italic text-[13px] leading-relaxed" style={{ color: '#94a3b8' }}>
                {decision.question}
              </p>
            </div>
          </motion.div>

          {/* Right: choices */}
          <motion.div
            className="md:col-span-2 space-y-3"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.2 }}
          >
            <div className="font-mono text-[11px] tracking-[0.35em] uppercase mb-1"
              style={{ color: 'rgba(148,163,184,0.4)' }}>
              {decision.characterId === 'all_five'
                ? 'CHOOSE THE COLLECTIVE APPROACH'
                : decision.characterId === 'allied_four'
                ? 'CHOOSE THE ALLIED RESPONSE'
                : `ADVISE ${(CHARACTER_LABELS[decision.characterId] ?? decision.characterName).toUpperCase()}`}
            </div>

            {decision.choices.map((choice) => {
              const isSelected = selected === choice.id;
              return (
                <motion.button
                  key={choice.id}
                  onClick={() => { if (!alreadyDecided) { setSelected(choice.id); setConfirming(false); } }}
                  className="w-full text-left rounded-sm p-4 transition-all duration-200"
                  style={{
                    background: isSelected ? `${color}12` : 'rgba(8,12,20,0.72)',
                    border: isSelected ? `1px solid ${color}55` : '1px solid rgba(148,163,184,0.1)',
                    cursor: alreadyDecided ? 'default' : 'pointer',
                    boxShadow: isSelected ? `0 0 18px ${color}14` : 'none',
                  }}
                  whileHover={shouldReduce || alreadyDecided ? {} : { scale: 1.003 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0 font-mono font-bold text-base mt-0.5"
                      style={{
                        background: isSelected ? color : 'rgba(148,163,184,0.1)',
                        color: isSelected ? '#0f172a' : color,
                        transition: 'all 0.2s',
                      }}
                    >
                      {choice.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-ui font-bold text-base mb-1.5"
                        style={{ color: isSelected ? '#f1f5f9' : '#94a3b8' }}>
                        {choice.title}
                      </div>
                      <p className="font-ui text-[13px] leading-relaxed mb-2.5" style={{ color: '#64748b' }}>
                        {choice.description}
                      </p>
                      {choice.financialContext && (
                        <div
                          className="flex items-start gap-1.5 mb-2.5 px-2 py-1.5 rounded-sm"
                          style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}
                        >
                          <span className="font-mono text-[10px] tracking-wide uppercase mt-0.5 flex-shrink-0" style={{ color: 'rgba(245,158,11,0.7)' }}>
                            $
                          </span>
                          <span className="font-ui text-[12px] leading-snug" style={{ color: 'rgba(245,158,11,0.65)' }}>
                            {choice.financialContext}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-wrap mb-2">
                        {choice.impactLabels.map((label) => (
                          <MetricBadge key={label} label={label} />
                        ))}
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="font-mono text-[10px] tracking-widest uppercase mt-0.5 flex-shrink-0"
                          style={{ color: 'rgba(248,113,113,0.55)' }}>
                          RISK:
                        </span>
                        <span className="font-ui text-[12px] leading-snug"
                          style={{ color: 'rgba(248,113,113,0.55)' }}>
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

        {/* Bottom action bar — fixed at bottom, safe from overlaps */}
        <div
          className="fixed bottom-0 left-0 right-0 z-40 px-3 py-3 md:px-6 md:py-4"
          style={{
            background: 'rgba(8,12,20,0.95)',
            borderTop: '1px solid rgba(148,163,184,0.1)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Back — always visible on left */}
            <button
              onClick={onBack}
              className="font-ui text-sm tracking-widest px-3 py-2 rounded-sm flex-shrink-0"
              style={{ color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(148,163,184,0.15)' }}
            >
              ← Back
            </button>

            {/* Right side — status + action */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {!selected && !alreadyDecided && (
                <span className="font-mono text-[11px] tracking-wide uppercase hidden sm:inline" style={{ color: 'rgba(148,163,184,0.4)' }}>
                  Select an option
                </span>
              )}
              {selected && !alreadyDecided && !confirming && (
                <>
                  <span className="font-ui text-sm hidden sm:inline" style={{ color: '#94a3b8' }}>
                    <span className="font-semibold" style={{ color }}>{selectedChoice?.title}</span>
                  </span>
                  <button
                    onClick={handleConfirm}
                    className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-5 py-2 rounded-sm"
                    style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd' }}
                  >
                    Proceed →
                  </button>
                </>
              )}
              {selected && !alreadyDecided && confirming && (
                <>
                  <span className="font-ui text-sm hidden sm:inline" style={{ color: '#f1f5f9' }}>
                    Confirm <span className="font-semibold" style={{ color }}>{selectedChoice?.title}</span>?
                  </span>
                  <button
                    onClick={() => setConfirming(false)}
                    className="font-ui text-sm tracking-wide px-3 py-2 rounded-sm"
                    style={{ color: 'rgba(148,163,184,0.5)', border: '1px solid rgba(148,163,184,0.15)' }}
                  >
                    Reconsider
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-5 py-2 rounded-sm"
                    style={{ background: `${color}22`, border: `1px solid ${color}55`, color }}
                  >
                    Confirm →
                  </button>
                </>
              )}
              {alreadyDecided && selected && (
                <button
                  onClick={() => onDecide(selected, decision.choices.find(c => c.id === selected)!)}
                  className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-5 py-2 rounded-sm"
                  style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd' }}
                >
                  Continue →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Chapter intro screen
// ────────────────────────────────────────────────
function ChapterIntroPanel({ chapter, onStart, onBack }: { chapter: typeof CHAPTERS[0]; onStart: () => void; onBack: () => void }) {
  const shouldReduce = useReducedMotion();
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduce ? 0 : 0.6 }}
        className="max-w-xl text-center"
      >
        <div className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(148,163,184,0.4)' }}>
          Chapter {chapter.number}
        </div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>
          {chapter.name}
        </h2>
        <div className="font-mono text-[11px] tracking-[0.3em] uppercase mb-5" style={{ color: 'rgba(148,163,184,0.5)' }}>
          {chapter.subtitle}
        </div>
        <p className="font-serif text-base leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
          {chapter.description}
        </p>
        <div className="mb-5 glass-panel rounded-sm px-4 py-3 inline-block">
          <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'rgba(148,163,184,0.45)' }}>
            {chapter.decisions.length} Decision{chapter.decisions.length !== 1 ? 's' : ''} —&nbsp;
          </span>
          <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'rgba(148,163,184,0.45)' }}>
            {chapter.decisions.map(d => CHARACTER_LABELS[d.characterId] ?? d.characterId).join(' · ')}
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onBack}
            className="font-ui text-sm tracking-widest px-4 py-2 rounded-sm"
            style={{ color: 'rgba(148,163,184,0.45)', border: '1px solid rgba(148,163,184,0.15)' }}
          >
            ← Back
          </button>
          <button
            onClick={onStart}
            className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-6 py-3 rounded-sm"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd' }}
          >
            Begin Chapter →
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────
export default function ChapterDecisionPage({ chapterIndex }: { chapterIndex: number }) {
  const chapter = CHAPTERS[chapterIndex];
  const navigate = useGameStore((s) => s.navigate);
  const makeDecision = useGameStore((s) => s.makeDecision);
  const navigateToChapter = useGameStore((s) => s.navigateToChapter);
  const existingDecisions = useGameStore((s) => s.decisions);

  type InnerPhase = 'intro' | 'decision' | 'consequence' | 'chapter-complete';
  // Chapter 1 already had its banner shown inside CrisisBuildup, so skip the intro phase there.
  const [innerPhase, setInnerPhase] = useState<InnerPhase>(chapterIndex === 0 ? 'decision' : 'intro');
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [lastChoiceId, setLastChoiceId] = useState<string | null>(null);

  const isLastChapter = chapterIndex === CHAPTERS.length - 1;
  const decision = chapter?.decisions[decisionIndex];

  if (!chapter) return null;

  // If we already have decisions for this chapter, auto-advance through them to the first undecided
  useEffect(() => {
    let firstUndecided = 0;
    for (let i = 0; i < chapter.decisions.length; i++) {
      if (existingDecisions[chapter.decisions[i].id]) {
        firstUndecided = i + 1;
      } else break;
    }
    if (firstUndecided > 0 && firstUndecided < chapter.decisions.length) {
      setDecisionIndex(firstUndecided);
      setInnerPhase('decision');
    } else if (firstUndecided >= chapter.decisions.length) {
      // All done
      setInnerPhase('chapter-complete');
    }
  }, []); // only on mount

  const handleDecide = (choiceId: string, choice: DecisionChoice) => {
    if (!existingDecisions[decision.id]) {
      makeDecision(decision.id, choiceId, choice.metrics, choice.trajectory);
    }
    setLastChoiceId(choiceId);
    setInnerPhase('consequence');
    navigateToChapter(chapterIndex, decisionIndex);
  };

  const handleAfterConsequence = () => {
    const next = decisionIndex + 1;
    if (next < chapter.decisions.length) {
      setDecisionIndex(next);
      setInnerPhase('decision');
      setLastChoiceId(null);
    } else {
      setInnerPhase('chapter-complete');
    }
  };

  const handleChapterComplete = () => {
    const nextChapterPage = 5 + chapterIndex + 1; // page 5 = chapter0, page 6 = chapter1, etc.
    if (isLastChapter) {
      navigate(9); // ending
    } else {
      navigate(nextChapterPage);
    }
  };

  const handleBack = () => {
    if (innerPhase === 'consequence') {
      setInnerPhase('decision');
    } else if (innerPhase === 'decision' && decisionIndex > 0) {
      setDecisionIndex(decisionIndex - 1);
      setInnerPhase('decision');
    } else if (innerPhase === 'decision') {
      // chapterIndex 0 has no intro phase — back from decision 0 returns to CrisisBuildup.
      if (chapterIndex === 0) {
        navigate(4);
      } else {
        setInnerPhase('intro');
      }
    } else if (innerPhase === 'intro') {
      navigate(chapterIndex === 0 ? 4 : 4 + chapterIndex); // back to previous page (CrisisBuildup or prior chapter)
    } else if (innerPhase === 'chapter-complete') {
      const lastIdx = chapter.decisions.length - 1;
      setDecisionIndex(lastIdx);
      setInnerPhase('decision');
    }
  };

  // Background image
  const bgImage = decision?.heroImage ?? chapter.backgroundImage;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#080c14]">
      {/* Background */}
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(8,12,20,0.82)' }} />
      <div className="absolute inset-0 scan-lines" />

      <AnimatePresence mode="wait">
        {innerPhase === 'intro' && (
          <motion.div
            key="intro"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ChapterIntroPanel
              chapter={chapter}
              onStart={() => setInnerPhase('decision')}
              onBack={handleBack}
            />
          </motion.div>
        )}

        {innerPhase === 'decision' && decision && (
          <motion.div
            key={`decision-${decision.id}`}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
          >
            <DecisionPanel
              decision={decision}
              onDecide={handleDecide}
              onBack={handleBack}
              decisionIndex={decisionIndex}
              totalInChapter={chapter.decisions.length}
            />
          </motion.div>
        )}

        {innerPhase === 'consequence' && decision && lastChoiceId && (
          <motion.div
            key={`consequence-${decision.id}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {decision.id === '1.1' ? (
              <FullConsequencePanel choiceId={lastChoiceId} onNext={handleAfterConsequence} onBack={handleBack} />
            ) : (
              <BriefConsequencePanel decision={decision} choiceId={lastChoiceId} onNext={handleAfterConsequence} onBack={handleBack} />
            )}
          </motion.div>
        )}

        {innerPhase === 'chapter-complete' && (
          <motion.div
            key="chapter-complete"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ChapterCompletePanel
              chapter={chapter}
              onNext={handleChapterComplete}
              onBack={handleBack}
              isLast={isLastChapter}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
