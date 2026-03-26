import { create } from 'zustand';

export interface Metrics {
  allianceTrust: number;
  techEdge: number;
  strategicCoherence: number;
  domesticResilience: number;
}

interface GameState {
  currentPage: number;
  metrics: Metrics;
  decisions: Record<string, string>;
  multilateralChosen: boolean;
  currentEnding: string | null;

  navigate: (page: number) => void;
  makeDecision: (decisionId: string, choiceId: string) => void;
  updateMetrics: (delta: Partial<Metrics>) => void;
  computeEnding: () => string;
  saveToStorage: () => void;
  loadFromStorage: () => void;
  resetGame: () => void;
}

const STORAGE_KEY = 'stratfutures_save_v1';

const clamp = (val: number, min = 0, max = 100) => Math.max(min, Math.min(max, val));

const initialMetrics: Metrics = {
  allianceTrust: 50,
  techEdge: 70,
  strategicCoherence: 45,
  domesticResilience: 60,
};

const computeEndingFromState = (
  metrics: Metrics,
  decisions: Record<string, string>,
  multilateralChosen: boolean
): string => {
  const { allianceTrust, techEdge, strategicCoherence } = metrics;

  // Ending D: tech-forward + multilateral
  if (techEdge >= 80 && multilateralChosen) {
    return 'D';
  }

  // Ending A: strong alliance trust + coherence
  if (allianceTrust >= 65 && strategicCoherence >= 55) {
    return 'A';
  }

  // Ending C: confrontational / low trust but some coherence
  if (allianceTrust <= 30 && strategicCoherence >= 40) {
    return 'C';
  }

  // Ending B: default / drift
  if (allianceTrust <= 30) {
    // Check if choice C (restraint) was taken — leads to Crucible if coherence is low
    const d1Choice = decisions['decision_1_1'];
    if (d1Choice === 'A') {
      // Aggressive but trust still fell — crucible scenario
      return 'C';
    }
    return 'B';
  }

  return 'B';
};

export const useGameStore = create<GameState>((set, get) => ({
  currentPage: 0,
  metrics: { ...initialMetrics },
  decisions: {},
  multilateralChosen: false,
  currentEnding: null,

  navigate: (page: number) => {
    set({ currentPage: page });
    get().saveToStorage();
  },

  makeDecision: (decisionId: string, choiceId: string) => {
    const { decisions, metrics, multilateralChosen } = get();

    // Apply metric deltas based on choice
    let delta: Partial<Metrics> = {};
    let newMultilateral = multilateralChosen;

    if (decisionId === 'decision_1_1') {
      if (choiceId === 'A') {
        delta = { allianceTrust: 20, domesticResilience: -10 };
      } else if (choiceId === 'B') {
        delta = { allianceTrust: 10, strategicCoherence: 15, techEdge: -5 };
        newMultilateral = true;
      } else if (choiceId === 'C') {
        delta = { allianceTrust: -25, techEdge: 15, domesticResilience: 10 };
      }
    }

    const updatedMetrics: Metrics = {
      allianceTrust: clamp(metrics.allianceTrust + (delta.allianceTrust ?? 0)),
      techEdge: clamp(metrics.techEdge + (delta.techEdge ?? 0)),
      strategicCoherence: clamp(metrics.strategicCoherence + (delta.strategicCoherence ?? 0)),
      domesticResilience: clamp(metrics.domesticResilience + (delta.domesticResilience ?? 0)),
    };

    const updatedDecisions = { ...decisions, [decisionId]: choiceId };
    const ending = computeEndingFromState(updatedMetrics, updatedDecisions, newMultilateral);

    set({
      decisions: updatedDecisions,
      metrics: updatedMetrics,
      multilateralChosen: newMultilateral,
      currentEnding: ending,
    });

    get().saveToStorage();
  },

  updateMetrics: (delta: Partial<Metrics>) => {
    const { metrics } = get();
    set({
      metrics: {
        allianceTrust: clamp(metrics.allianceTrust + (delta.allianceTrust ?? 0)),
        techEdge: clamp(metrics.techEdge + (delta.techEdge ?? 0)),
        strategicCoherence: clamp(metrics.strategicCoherence + (delta.strategicCoherence ?? 0)),
        domesticResilience: clamp(metrics.domesticResilience + (delta.domesticResilience ?? 0)),
      },
    });
    get().saveToStorage();
  },

  computeEnding: () => {
    const { metrics, decisions, multilateralChosen } = get();
    const ending = computeEndingFromState(metrics, decisions, multilateralChosen);
    set({ currentEnding: ending });
    get().saveToStorage();
    return ending;
  },

  saveToStorage: () => {
    try {
      const { currentPage, metrics, decisions, multilateralChosen, currentEnding } = get();
      const data = { currentPage, metrics, decisions, multilateralChosen, currentEnding };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage may be unavailable
    }
  },

  loadFromStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      set({
        currentPage: data.currentPage ?? 0,
        metrics: data.metrics ?? { ...initialMetrics },
        decisions: data.decisions ?? {},
        multilateralChosen: data.multilateralChosen ?? false,
        currentEnding: data.currentEnding ?? null,
      });
    } catch {
      // corrupted data — ignore
    }
  },

  resetGame: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    set({
      currentPage: 0,
      metrics: { ...initialMetrics },
      decisions: {},
      multilateralChosen: false,
      currentEnding: null,
    });
  },
}));
