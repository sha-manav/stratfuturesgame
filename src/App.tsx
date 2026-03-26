import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import MetricHUD from './components/ui/MetricHUD';
import LandingPage from './pages/LandingPage';
import OpeningPage from './pages/OpeningPage';
import ProtagonistsPage from './pages/ProtagonistsPage';
import CrisisBuildup from './pages/CrisisBuildup';
import DecisionPage from './pages/DecisionPage';
import ConsequencePage from './pages/ConsequencePage';
import EndingPage from './pages/EndingPage';

const PAGE_MAP: Record<number, React.ComponentType> = {
  0: LandingPage,
  1: OpeningPage,
  2: ProtagonistsPage,
  3: CrisisBuildup,
  4: DecisionPage,
  5: ConsequencePage,
  6: EndingPage,
};

// Pages that show the MetricHUD
const HUD_PAGES = new Set([3, 4, 5]);

function PageTransition({ children, pageKey }: { children: React.ReactNode; pageKey: number }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      key={pageKey}
      className="w-full h-full"
      initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
      transition={{ duration: shouldReduce ? 0 : 0.45, ease: 'easeInOut' }}
      style={{ position: 'absolute', inset: 0 }}
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

  // Load saved state on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't navigate on decision page with keyboard to avoid accidental skips
      if (currentPage === 4) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        const next = currentPage + 1;
        if (next in PAGE_MAP) navigate(next);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = currentPage - 1;
        if (prev >= 0 && prev in PAGE_MAP) navigate(prev);
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
          <button
            onClick={() => navigate(0)}
            className="font-ui text-sm px-4 py-2"
            style={{ color: '#93c5fd' }}
          >
            Return to Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#080c14] overflow-hidden">
      {/* Page content with AnimatePresence transitions */}
      <div className="relative w-full h-screen">
        <AnimatePresence mode="wait">
          <PageTransition key={currentPage} pageKey={currentPage}>
            <PageComponent />
          </PageTransition>
        </AnimatePresence>
      </div>

      {/* Metric HUD overlay */}
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

      {/* Page progress dots indicator */}
      {currentPage > 0 && (
        <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
          <div className="flex gap-1.5 items-center">
            {Object.keys(PAGE_MAP).map((key) => {
              const pg = parseInt(key);
              if (pg === 0) return null;
              return (
                <div
                  key={pg}
                  className="transition-all duration-300"
                  style={{
                    width: pg === currentPage ? '14px' : '4px',
                    height: '4px',
                    borderRadius: '2px',
                    background:
                      pg === currentPage
                        ? 'rgba(59,130,246,0.6)'
                        : pg < currentPage
                        ? 'rgba(59,130,246,0.25)'
                        : 'rgba(148,163,184,0.15)',
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
