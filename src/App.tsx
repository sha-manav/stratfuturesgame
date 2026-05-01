import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import MetricHUD from './components/ui/MetricHUD';
import LandingPage from './pages/LandingPage';
import OpeningPage from './pages/OpeningPage';
import ProtagonistsPage from './pages/ProtagonistsPage';
import ScenarioBriefing from './pages/ScenarioBriefing';
import CrisisBuildup from './pages/CrisisBuildup';
import ChapterDecisionPage from './pages/ChapterDecisionPage';
import EndingPage from './pages/EndingPage';

// Page 3 = Scenario briefing (world setup before the crisis)
// Page 4 = CrisisBuildup (intel assessment + lead-in)
// Page 5 = Chapter 1 (decisions 1.1-1.3)
// Page 6 = Chapter 2 (decisions 2.1-2.3)
// Page 7 = Chapter 3 Manila Incident (decisions 3.1-3.5)
// Page 8 = Chapters 5/6 (decisions 5.1, 5.2, 6.1, 6.2)
// Page 9 = Ending

function Ch1() { return <ChapterDecisionPage chapterIndex={0} />; }
function Ch2() { return <ChapterDecisionPage chapterIndex={1} />; }
function Ch3() { return <ChapterDecisionPage chapterIndex={2} />; }
function Ch56() { return <ChapterDecisionPage chapterIndex={3} />; }

const PAGE_MAP: Record<number, React.ComponentType> = {
  0: LandingPage,
  1: OpeningPage,
  2: ProtagonistsPage,
  3: ScenarioBriefing,
  4: CrisisBuildup,
  5: Ch1,
  6: Ch2,
  7: Ch3,
  8: Ch56,
  9: EndingPage,
};

const MAX_PAGE = 9;

// Pages that display MetricHUD
const HUD_PAGES = new Set([5, 6, 7, 8, 9]);

// All pages after the landing page handle their own internal navigation
const INTERNAL_NAV_PAGES = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

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

  if (!PageComponent) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#080c14]">
        <div className="text-center">
          <p className="font-ui text-slate-400 mb-4">Page not found.</p>
          <button onClick={() => navigate(0)} className="font-ui text-base px-4 py-2" style={{ color: '#93c5fd' }}>
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

      {/* Metric HUD — top-right, collapsed by default */}
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

    </div>
  );
}
