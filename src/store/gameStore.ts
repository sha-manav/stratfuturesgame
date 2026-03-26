import { create } from 'zustand';
import { CHAPTERS, type TrajectoryDelta, type MetricDelta } from '../content/decisions';

export interface Metrics {
  allianceTrust: number;
  techEdge: number;
  strategicCoherence: number;
  domesticResilience: number;
}

export interface Trajectory {
  alliance_path: number;
  tech_path: number;
  escalation_path: number;
  restraint_path: number;
}

interface GameState {
  currentPage: number;
  // Current chapter index (0-3 for chapters 1,2,3,5/6) + decision index within chapter
  currentChapterIndex: number;
  currentDecisionIndex: number;
  metrics: Metrics;
  trajectory: Trajectory;
  decisions: Record<string, string>; // decisionId -> choiceId
  currentEnding: string | null;

  navigate: (page: number) => void;
  navigateToChapter: (chapterIndex: number, decisionIndex?: number) => void;
  makeDecision: (decisionId: string, choiceId: string, metrics: MetricDelta, traj: TrajectoryDelta) => void;
  computeEnding: () => string;
  saveToStorage: () => void;
  loadFromStorage: () => void;
  resetGame: () => void;
}

const STORAGE_KEY = 'stratfutures_save_v2';
const clamp = (val: number, min = 0, max = 100) => Math.max(min, Math.min(max, val));

const initialMetrics: Metrics = {
  allianceTrust: 50,
  techEdge: 70,
  strategicCoherence: 45,
  domesticResilience: 60,
};

const initialTrajectory: Trajectory = {
  alliance_path: 0,
  tech_path: 0,
  escalation_path: 0,
  restraint_path: 0,
};

/**
 * Ending logic from decision_tree_v2_fixed_endings.html:
 *
 * Priority order (checked top to bottom):
 * 1. escalation_path >= 15 AND dominant === escalation  → Crucible
 * 2. alliance_path >= 20 AND escalation_path >= 12       → Crucible (coordinated confrontation)
 * 3. dominant === alliance AND tech_path >= 10 AND escalation_path < 10 → Judo
 * 4. dominant === alliance AND alliance_path >= 20 AND escalation_path < 10 → Cooperation
 * 5. dominant === restraint                              → Trundling
 * 6. dominant === escalation                             → Crucible
 * 7. dominant === alliance                               → Cooperation
 * 8. fallback                                            → Trundling
 */
function computeEndingFromState(trajectory: Trajectory): string {
  const { alliance_path, tech_path, escalation_path, restraint_path } = trajectory;

  // Find dominant path
  const paths = { alliance_path, tech_path, escalation_path, restraint_path };
  let maxScore = -Infinity;
  let dominant = 'restraint_path';
  for (const [key, val] of Object.entries(paths)) {
    if (val > maxScore) { maxScore = val; dominant = key; }
  }
  const dom = dominant.replace('_path', '');

  // 1. High escalation, escalation dominant → Crucible
  if (escalation_path >= 15 && dom === 'escalation') return 'C';

  // 2. High alliance + high escalation → Crucible (confrontation)
  if (alliance_path >= 20 && escalation_path >= 12) return 'C';

  // 3. Alliance dominant + tech + low escalation → Judo
  if (dom === 'alliance' && tech_path >= 10 && escalation_path < 10) return 'D';

  // 4. Alliance dominant + high alliance + low escalation → Cooperation
  if (dom === 'alliance' && alliance_path >= 20 && escalation_path < 10) return 'A';

  // 5. Restraint dominant → Trundling
  if (dom === 'restraint') return 'B';

  // 6-7. Fallback by dominant
  if (dom === 'escalation') return 'C';
  if (dom === 'alliance') return 'A';

  return 'B'; // default: Trundling
}

export const useGameStore = create<GameState>((set, get) => ({
  currentPage: 0,
  currentChapterIndex: 0,
  currentDecisionIndex: 0,
  metrics: { ...initialMetrics },
  trajectory: { ...initialTrajectory },
  decisions: {},
  currentEnding: null,

  navigate: (page: number) => {
    set({ currentPage: page });
    get().saveToStorage();
  },

  navigateToChapter: (chapterIndex: number, decisionIndex = 0) => {
    set({ currentChapterIndex: chapterIndex, currentDecisionIndex: decisionIndex });
    get().saveToStorage();
  },

  makeDecision: (decisionId, choiceId, metricsDelta, trajDelta) => {
    const { metrics, trajectory, decisions } = get();

    const updatedMetrics: Metrics = {
      allianceTrust: clamp(metrics.allianceTrust + (metricsDelta.allianceTrust ?? 0)),
      techEdge: clamp(metrics.techEdge + (metricsDelta.techEdge ?? 0)),
      strategicCoherence: clamp(metrics.strategicCoherence + (metricsDelta.strategicCoherence ?? 0)),
      domesticResilience: clamp(metrics.domesticResilience + (metricsDelta.domesticResilience ?? 0)),
    };

    const updatedTrajectory: Trajectory = {
      alliance_path: trajectory.alliance_path + (trajDelta.alliance_path ?? 0),
      tech_path: trajectory.tech_path + (trajDelta.tech_path ?? 0),
      escalation_path: trajectory.escalation_path + (trajDelta.escalation_path ?? 0),
      restraint_path: trajectory.restraint_path + (trajDelta.restraint_path ?? 0),
    };

    const updatedDecisions = { ...decisions, [decisionId]: choiceId };
    const ending = computeEndingFromState(updatedTrajectory);

    set({
      metrics: updatedMetrics,
      trajectory: updatedTrajectory,
      decisions: updatedDecisions,
      currentEnding: ending,
    });

    get().saveToStorage();
  },

  computeEnding: () => {
    const { trajectory } = get();
    const ending = computeEndingFromState(trajectory);
    set({ currentEnding: ending });
    get().saveToStorage();
    return ending;
  },

  saveToStorage: () => {
    try {
      const { currentPage, currentChapterIndex, currentDecisionIndex, metrics, trajectory, decisions, currentEnding } = get();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentPage, currentChapterIndex, currentDecisionIndex,
        metrics, trajectory, decisions, currentEnding,
      }));
    } catch { /* localStorage may be unavailable */ }
  },

  loadFromStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      set({
        currentPage: data.currentPage ?? 0,
        currentChapterIndex: data.currentChapterIndex ?? 0,
        currentDecisionIndex: data.currentDecisionIndex ?? 0,
        metrics: data.metrics ?? { ...initialMetrics },
        trajectory: data.trajectory ?? { ...initialTrajectory },
        decisions: data.decisions ?? {},
        currentEnding: data.currentEnding ?? null,
      });
    } catch { /* corrupted data */ }
  },

  resetGame: () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    set({
      currentPage: 0,
      currentChapterIndex: 0,
      currentDecisionIndex: 0,
      metrics: { ...initialMetrics },
      trajectory: { ...initialTrajectory },
      decisions: {},
      currentEnding: null,
    });
  },
}));

// Helper: total decisions made
export const selectDecisionCount = (decisions: Record<string, string>) =>
  Object.keys(decisions).length;

// Helper: total decisions available
export const TOTAL_DECISIONS = CHAPTERS.reduce((sum, ch) => sum + ch.decisions.length, 0);
