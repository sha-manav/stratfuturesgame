import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import MetricHUD from './components/ui/MetricHUD';
import LandingPage from './pages/LandingPage';
import OpeningPage from './pages/OpeningPage';
import ProtagonistsPage from './pages/ProtagonistsPage';
import CrisisBuildup from './pages/CrisisBuildup';
import ChapterDecisionPage from './pages/ChapterDecisionPage';
import EndingPage from './pages/EndingPage';

// Page 4 = Chapter 1 (decisions 1.1-1.3)
// Page 5 = Chapter 2 (decisions 2.1-2.3)
// Page 6 = Chapter 3 Manila Incident (decisions 3.1-3.5)
// Page 7 = Chapters 5/6 (decisions 5.1, 5.2, 6.1, 6.2)
// Page 8 = Ending

function Ch1() { return <ChapterDecisionPage chapterIndex={0} />; }
function Ch2() { return <ChapterDecisionPage chapterIndex={1} />; }
function Ch3() { return <ChapterDecisionPage chapterIndex={2} />; }
function Ch56() { return <ChapterDecisionPage chapterIndex={3} />; }

const PAGE_MAP: Record<number, React.ComponentType> = {
  0: LandingPage,
  1: OpeningPage,
  2: ProtagonistsPage,
  3: CrisisBuildup,
  4: Ch1,
  5: Ch2,
  6: Ch3,
  7: Ch56,
  8: EndingPage,
};

const MAX_PAGE = 8;

// Pages that display MetricHUD
const HUD_PAGES = new Set([4, 5, 6, 7, 8]);

// All pages after the landing page handle their own internal navigation
const INTERNAL_NAV_PAGES = new Set([1, 2, 3, 4, 5, 6, 7, 8]);

function PageTransition({ children, pageKey }: { children: React.ReactNode; pageKey: number }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      key={pageKey}
      style={{ position: 'absolute', inset: 0 }}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
      transition={{ duration: shouldReduce ? 0 : 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const currentPage = useGameStore((s) => s.currentPage);
  const navigate = useGameStore((s) => s.navigate);
  const loadFromStorage = useGameStore((s) => s.loadFromStorage);
  const shouldReduce = useReducedMotion();

  useEffect(() => { loadFromStorage(); }, [loadFromStorage]);

  // Keyboard nav — only for linear narrative pages
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (INTERNAL_NAV_PAGES.has(currentPage)) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        const next = currentPage + 1;
        if (next <= MAX_PAGE) navigate(next);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = currentPage - 1;
        if (prev >= 0) navigate(prev);
      }
    },
    [currentPage, navigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const PageComponent = PAGE_MAP[currentPage];
  const showHUD = HUD_PAGES.has(currentPage);
  const showBack = currentPage > 0 && !INTERNAL_NAV_PAGES.has(currentPage);
  const showNext = currentPage < MAX_PAGE && !INTERNAL_NAV_PAGES.has(currentPage) && currentPage > 0;

  if (!PageComponent) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#080c14]">
        <div className="text-center">
          <p className="font-ui text-slate-400 mb-4">Page not found.</p>
          <button onClick={() => navigate(0)} className="font-ui text-sm px-4 py-2" style={{ color: '#93c5fd' }}>
            Return to Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#080c14]">
      {/* Page layer */}
      <div className="relative w-full h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <PageTransition key={currentPage} pageKey={currentPage}>
            <PageComponent />
          </PageTransition>
        </AnimatePresence>
      </div>

      {/* Metric HUD — LEFT side, never overlaps nav buttons */}
      <AnimatePresence>
        {showHUD && (
          <motion.div
            key="hud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.4 }}
          >
            <MetricHUD />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent nav bar for LINEAR pages (1-3) — back + next, bottom-center */}
      {(showBack || showNext) && (
        <div
          className="fixed bottom-5 left-1/2 z-50 flex items-center gap-3"
          style={{ transform: 'translateX(-50%)' }}
        >
          {showBack && (
            <button
              onClick={() => navigate(currentPage - 1)}
              className="font-ui text-xs tracking-widest uppercase px-4 py-2 rounded-sm"
              style={{
                color: 'rgba(148,163,184,0.55)',
                background: 'rgba(8,12,20,0.85)',
                border: '1px solid rgba(148,163,184,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              ← Back
            </button>
          )}
          {/* Progress dots */}
          <div className="flex gap-1.5 items-center">
            {Array.from({ length: MAX_PAGE }, (_, i) => i + 1).map((pg) => (
              <div
                key={pg}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: pg === currentPage ? '14px' : '4px',
                  height: '4px',
                  background:
                    pg === currentPage
                      ? 'rgba(59,130,246,0.7)'
                      : pg < currentPage
                      ? 'rgba(59,130,246,0.28)'
                      : 'rgba(148,163,184,0.13)',
                }}
              />
            ))}
          </div>
          {showNext && (
            <button
              onClick={() => navigate(currentPage + 1)}
              className="font-ui font-semibold text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-sm"
              style={{
                color: '#93c5fd',
                background: 'rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.35)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Next →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
