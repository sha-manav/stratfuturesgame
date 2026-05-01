import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

interface KeyFact {
  label: string;
  value: string;
}

interface ProtagonistData {
  id: string;
  name: string;
  role: string;
  location: string;
  age: number;
  caption: string;
  narration: string;
  biography: string[];
  arc: { from: string; to: string };
  personalStake: string;
  pressure: string;
  stakes: string;
  keyFacts: KeyFact[];
  thoughtBubble: string;
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
    role: 'Deputy National Security Advisor, United States',
    location: 'Washington DC — 05:30 EST',
    age: 42,
    caption: 'Deputy National Security Advisor Sarah Chen. 5:30 AM, Washington DC.',
    narration:
      "The intelligence brief landed at 5:15 AM. By 5:31, Sarah knew this wasn't just another day of managed decline.",
    biography: [
      "Chinese-American, born in San Francisco to parents who left Shanghai in the 1980s. Most of her extended family is still in Beijing — a fact she discloses on every clearance form and feels every time she walks into the Situation Room.",
      "Came up through the State Department as a tech policy expert before being recruited to the NSC to manage \"the China challenge\" — a portfolio that keeps expanding faster than her org chart. Three years into the administration's \"managed competition\" doctrine, she's the person who has to translate it into actual recommendations at 6 AM.",
      "Briefs the President in six hours with options that all look like less-bad ones. Philippines is on the line invoking the Mutual Defense Treaty. Tokyo wants coordination. Canberra wants reassurance. Congress wants details. Everyone is waiting on her.",
    ],
    arc: { from: 'Technocratic optimist', to: 'Strategic realist' },
    personalStake:
      "Identity and loyalty cut both ways. Her grandparents are in Beijing; her oath is to a country that increasingly treats their China as the adversary.",
    pressure: 'Allied expectations vs. domestic constraints',
    stakes: "Alliance credibility, presidential trust, the meaning of the word 'treaty'",
    keyFacts: [
      { label: 'Tenure', value: '14 years federal service' },
      { label: 'Prior role', value: 'State Dept. tech policy lead' },
      { label: 'Briefing window', value: '6 hours to POTUS' },
      { label: 'Allied calls today', value: 'Manila, Tokyo, Canberra' },
    ],
    thoughtBubble:
      "They call it \"strategic competition.\" But nothing about this feels strategic. Philippines invokes the treaty. Japan wants coordination. Australia needs reassurance. Congress wants details. And I have to brief the President in six hours with a recommendation that somehow threads every needle simultaneously. There are no good options. Only less-bad ones.",
    dialogue:
      '...Chinese Maritime Safety Administration vessels blocking Philippines resupply route to Second Thomas Shoal...',
    sceneImage: '/assets/page_two_sarah_chen.webp',
    color: '#3B82F6',
    glowClass: 'glow-blue',
  },
  {
    id: 'maya',
    name: 'Dr. Maya Patel',
    role: 'CEO & Founder, Sentinel AI',
    location: 'San Francisco — 02:30 PST',
    age: 38,
    caption: 'Dr. Maya Patel, CEO Sentinel AI. 2:30 AM, San Francisco.',
    narration:
      "Maya hadn't slept. The call from Tokyo came at 2:00 AM. By 2:30, she understood that her company's next decision would determine whether Silicon Valley led or followed.",
    biography: [
      "Immigrant success story: Mumbai → Stanford PhD in machine learning → Silicon Valley. Founded Sentinel AI seven years ago around a single thesis — that frontier AI could be built safely, democratically, and beneficially, and that someone had to prove it before someone else proved the opposite.",
      "Today Sentinel sits at $8 billion valuation, 2,400 employees, and the title of Pentagon's largest AI contractor. The company she built to keep AI out of weapons is now the company the Defense Department calls first. The founding charter and the cap table no longer point in the same direction.",
      "A Chinese sovereign wealth fund quietly holds 8% of her stock. The board reads the headlines. The Pentagon reads the capabilities roadmap. Her own engineers read the charter, and increasingly ask her which one is still binding.",
    ],
    arc: { from: 'Pure innovation focus', to: 'Geopolitical operator' },
    personalStake:
      "Built this company on a promise. Every board meeting tests how much of that promise survives the next quarter's earnings call.",
    pressure: 'Shareholder returns vs. strategic partnership',
    stakes: 'Company independence, allied tech coordination, the future of democratic AI',
    keyFacts: [
      { label: 'Valuation', value: '$8B' },
      { label: 'Employees', value: '2,400' },
      { label: 'PRC-linked stake', value: '8% (sovereign fund)' },
      { label: 'Largest customer', value: 'US Department of Defense' },
    ],
    thoughtBubble:
      "We were going to make AI safe. Democratic. Beneficial. Now the board wants to know why we're not licensing to Five Eyes fast enough. And the Pentagon wants capabilities we promised we'd never build. When did \"beneficial\" become negotiable?",
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
    age: 51,
    caption: 'James Nakamura, CEO Kōdo Robotics. 7:30 PM, Tokyo.',
    narration:
      "His father built this factory in 1985. His grandfather survived WWII to rebuild Japan. Now James faces a choice that will determine whether his children will have a company — or a country — to inherit.",
    biography: [
      "Third-generation industrialist. His grandfather survived the war and started Kōdo with a single lathe outside Yokohama, building agricultural machinery for a country trying to feed itself. His father turned the firm into one of Japan's quiet giants of industrial automation — \"robots that feed people,\" he liked to say.",
      "James is the first to take Kōdo into defense. His father went to his grave believing that decision had destroyed the family legacy. James has spent a decade not entirely sure his father was wrong.",
      "Tonight there are two contracts on his desk. A $2 billion guaranteed Chinese joint venture in industrial robotics — closes off AUKUS access permanently. Or an AUKUS partnership: $1.2B over five years, allied defense integration, but only potential. His CFO wants the certain money. His daughter just started at Tokyo University. Beijing is watching.",
    ],
    arc: { from: 'Cautious hedger', to: 'Active coalition-builder' },
    personalStake:
      "Japanese identity caught between Washington and Beijing. His children inherit both the company and the country it serves.",
    pressure: '$2B certain Chinese contract vs. uncertain AUKUS partnership',
    stakes: "Company future, father's legacy, Japan's strategic alignment",
    keyFacts: [
      { label: 'Founded', value: '1952 (grandfather)' },
      { label: 'On the table', value: '$2B PRC vs. $1.2B AUKUS' },
      { label: 'Workforce', value: '~9,000 across Japan' },
      { label: 'Signature line', value: 'Autonomous maritime systems' },
    ],
    thoughtBubble:
      "Father died thinking I'd destroyed his legacy. Took his agricultural company into defense. \"Robots that feed people,\" he said. Now we make robots that... what? Defend? Attack? The Chinese contract is worth $2 billion. AUKUS partnership is worth... what, exactly? Values? Father would have known which to choose. I don't.",
    dialogue: 'How quickly can we retool for military production?',
    sceneImage: '/assets/page_two_james_nakamura.webp',
    color: '#10B981',
    glowClass: 'glow-jade',
  },
  {
    id: 'lijian',
    name: 'Vice Minister Li Jian',
    role: 'Vice Minister, Ministry of Science & Technology',
    location: 'Beijing — 21:30 CST',
    age: 56,
    caption: 'Vice Minister Li Jian. 9:30 PM, Beijing.',
    narration:
      'The directive from the Central Committee is clear. Deploy the surveillance system to partner nations. Ensure compliance. Report success.',
    biography: [
      "Twenty-eight years in Party service. Engineering degree from Tsinghua, then a decade inside Huawei's international division before crossing into the state apparatus. He is one of the original architects of the Digital Silk Road — the man who turned a slogan into a deployable stack.",
      "Father of one daughter, currently reading computer science at Cambridge on a scholarship he helped quietly arrange. She used to call every Sunday. Lately the calls are shorter. Lately she doesn't ask what he's working on.",
      "He believes in China's technological future. He no longer believes in the methods being used to secure it. Tonight the Central Committee wants Southeast Asia online by June, with full surveillance features enabled — the order of deployment his ministry had explicitly recommended against. His deputy is watching to see how he answers.",
    ],
    arc: { from: 'Party discipline', to: 'Quiet resistance' },
    personalStake:
      "His daughter at Cambridge sees what the system does. He helped build that system. Her silence on their video calls is the only feedback loop he trusts.",
    pressure: 'Deploy surveillance systems on schedule or face career consequences',
    stakes: "Daughter's safety abroad, professional survival, moral compromise",
    keyFacts: [
      { label: 'Party tenure', value: '28 years' },
      { label: 'Prior posting', value: 'Huawei international' },
      { label: 'Portfolio', value: 'Digital Silk Road / AI' },
      { label: 'Daughter', value: 'Cambridge — Computer Science' },
    ],
    thoughtBubble:
      "The Party says we're building the future. But whose future? My daughter doesn't call anymore. She sees what our surveillance systems do. What I've helped build. And she stopped asking questions. That's when I knew.",
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
    role: 'Strategic Planner, Swedish Armed Forces',
    location: 'Stockholm — 20:30 CET',
    age: 45,
    caption: 'Colonel Anna Karlsson. 8:30 PM, Stockholm.',
    narration:
      'Sweden joined NATO to be safer. But safety, Anna is learning, means choices. And not all choices are between good and bad.',
    biography: [
      "Career officer in the Swedish Armed Forces. Strategic Planning Division, with the Baltic and Arctic portfolios on her wall. She spent twenty years preparing for threats that everyone assumed were distant. They are no longer distant.",
      "Joined the General Staff just as Sweden ended two centuries of formal non-alignment and entered NATO in 2024. Her job description changed overnight from \"Swedish defense\" to \"alliance contribution\" — and she's still working out what the second one actually requires.",
      "Mother of two. Lives with the arithmetic of a nation of 10 million people, GDP smaller than a single American technology company, suddenly expected to have a coherent China policy. Her playbook said: coordinate Nordic. Lead with Norway, Denmark, Finland. Don't get isolated. The playbook is fraying.",
    ],
    arc: { from: 'Institutional playbook', to: 'Creative coalition thinking' },
    personalStake:
      "Two children growing up in a small country whose security has always depended on someone else's commitments holding.",
    pressure: 'US security demands vs. Chinese economic leverage',
    stakes: 'Nordic coordination, national sovereignty, alliance credibility',
    keyFacts: [
      { label: 'NATO accession', value: '2024 (newest member)' },
      { label: 'Portfolio', value: 'Baltic & Arctic planning' },
      { label: 'Population to defend', value: '~10 million' },
      { label: 'Watching', value: 'PRC port investments, all theaters' },
    ],
    thoughtBubble:
      "We joined NATO for security. Now NATO allies ask: \"Will you exclude Chinese 5G equipment?\" Germany says yes. France says \"it's complicated.\" We're caught between US pressure and economic reality. Sweden. Population 10 million. GDP smaller than Apple. And somehow we're supposed to have a \"China policy.\"",
    dialogue: 'Show me the Chinese port investments. All of them. Baltic, Arctic, North Sea.',
    sceneImage: '/assets/page_two_anna_karlsson.webp',
    color: '#94A3B8',
    glowClass: 'glow-silver',
  },
];

function DossierLine({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <div
        className="font-mono text-[11px] tracking-[0.3em] uppercase flex-shrink-0 w-28"
        style={{ color: `${color}cc` }}
      >
        {label}
      </div>
      <div
        className="font-ui text-[14px] leading-snug"
        style={{ color: '#cbd5e1' }}
      >
        {value}
      </div>
    </div>
  );
}

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

          {/* Content — scrollable dossier panel anchored to bottom */}
          <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
            <motion.div
              className="pointer-events-auto px-6 md:px-14 pt-12 pb-28 md:pb-32 overflow-y-auto"
              style={{ maxHeight: '90vh' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduce ? 0 : 0.7, delay: shouldReduce ? 0 : 0.3 }}
            >
              <div className="max-w-2xl">
                {/* Location badge */}
                <div
                  className="font-mono text-[11px] tracking-[0.4em] uppercase mb-2 inline-block px-2 py-0.5 rounded-sm"
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
                  className="font-ui text-base tracking-wide mb-1"
                  style={{ color: 'rgba(148,163,184,0.75)' }}
                >
                  {data.role}
                </div>
                <div
                  className="font-mono text-[12px] tracking-[0.25em] uppercase mb-4"
                  style={{ color: 'rgba(148,163,184,0.45)' }}
                >
                  Age {data.age} · {data.arc.from} → {data.arc.to}
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
                      fontSize: 'clamp(1rem, 1.7vw, 1.12rem)',
                      color: '#cbd5e1',
                      fontStyle: 'italic',
                    }}
                  >
                    {data.narration}
                  </p>
                </div>

                {/* Biography paragraphs */}
                <div
                  className="glass-panel rounded-sm px-4 py-3 mb-3"
                  style={{
                    background: 'rgba(8,12,20,0.55)',
                    border: '1px solid rgba(148,163,184,0.12)',
                  }}
                >
                  <div
                    className="font-mono text-[11px] tracking-[0.35em] uppercase mb-2"
                    style={{ color: data.color }}
                  >
                    Dossier
                  </div>
                  <div className="space-y-2">
                    {data.biography.map((para, i) => (
                      <p
                        key={i}
                        className="leading-relaxed"
                        style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                          color: '#cbd5e1',
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Key facts grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {data.keyFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="px-3 py-2 rounded-sm"
                      style={{
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div
                        className="font-mono text-[10px] tracking-[0.25em] uppercase mb-0.5"
                        style={{ color: 'rgba(148,163,184,0.55)' }}
                      >
                        {fact.label}
                      </div>
                      <div
                        className="font-ui text-[14px]"
                        style={{ color: '#e2e8f0' }}
                      >
                        {fact.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pressure / Stakes / Stake */}
                <div className="space-y-1.5 mb-3">
                  <DossierLine label="Personal Stake" value={data.personalStake} color={data.color} />
                  <DossierLine label="Pressure" value={data.pressure} color={data.color} />
                  <DossierLine label="Stakes" value={data.stakes} color={data.color} />
                </div>

                {/* Thought bubble */}
                <div
                  className="rounded-sm px-4 py-3 mb-3"
                  style={{
                    background: `${data.color}0d`,
                    border: `1px solid ${data.color}26`,
                  }}
                >
                  <div
                    className="font-mono text-[11px] tracking-[0.35em] uppercase mb-1.5"
                    style={{ color: `${data.color}cc` }}
                  >
                    Inner Monologue
                  </div>
                  <p
                    className="leading-relaxed"
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                      color: '#d4dde8',
                      fontStyle: 'italic',
                    }}
                  >
                    "{data.thoughtBubble}"
                  </p>
                </div>

                {/* Dialogue or internal-flash monologue */}
                {data.internalMonologue && (
                  <div className="px-4 py-2 mb-2">
                    <p
                      className="font-mono text-[12px] tracking-wide"
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
                      className="font-mono text-[12px] tracking-widest mt-0.5 flex-shrink-0"
                      style={{ color: data.color }}
                    >
                      ▶
                    </span>
                    <p className="font-ui text-base" style={{ color: '#94a3b8' }}>
                      "{data.dialogue}"
                    </p>
                  </div>
                )}
              </div>
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
            className="inline-block px-5 py-2 rounded-sm mb-8 font-mono text-base tracking-[0.25em] uppercase"
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
              className="font-ui text-sm tracking-widest px-4 py-2 rounded-sm"
              style={{ color: 'rgba(148,163,184,0.45)', border: '1px solid rgba(148,163,184,0.15)' }}
            >
              ← Back
            </button>
            <button
              onClick={onContinue}
              className="font-ui font-semibold text-sm tracking-[0.25em] uppercase px-8 py-3 rounded-sm"
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
        <div className="font-mono text-[11px] tracking-[0.35em] uppercase" style={{ color: 'rgba(59,130,246,0.6)' }}>
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
            <span className="font-mono text-[11px] tracking-wide" style={{ color: 'rgba(148,163,184,0.45)' }}>
              {step + 1} of {protagonists.length}
            </span>
          </div>

          {/* Prev/Next */}
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              className="font-ui text-sm tracking-widest px-4 py-2 rounded-sm"
              style={{
                color: 'rgba(148,163,184,0.5)',
                border: '1px solid rgba(148,163,184,0.15)',
              }}
            >
              ← Back
            </button>
            <button
              onClick={() => navigate(4)}
              className="font-ui text-[12px] tracking-widest px-3 py-2 rounded-sm"
              style={{
                color: 'rgba(148,163,184,0.4)',
                border: '1px solid rgba(148,163,184,0.1)',
              }}
            >
              Skip to Crisis →
            </button>
            <button
              onClick={goNext}
              className="font-ui font-semibold text-sm tracking-[0.2em] uppercase px-5 py-2 rounded-sm"
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
        className="absolute top-6 right-4 md:right-8 font-mono text-[11px] tracking-widest"
        style={{ color: 'rgba(148,163,184,0.3)' }}
      >
        CHARACTER BIO · {step + 1} / {protagonists.length}
      </div>
    </div>
  );
}
