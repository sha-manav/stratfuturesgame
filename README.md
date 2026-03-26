# 2029: Crossroads of Power

A premium, cinematic interactive geopolitical strategy scenario built for policymakers, strategists, and think tank audiences.

## Overview

*2029: Crossroads of Power* is an interactive graphic novel / strategic decision simulator set in the South China Sea crisis of 2029. Five protagonists across Washington DC, San Francisco, Tokyo, Beijing, and Stockholm face interconnected choices that will shape the next decade of geopolitics.

## Running Locally

```bash
# Install dependencies
npm install

# Development server (hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Open `http://localhost:5173` in your browser.

## Project Structure

```
src/
├── content/                   # All authored text — DO NOT EDIT without author approval
│   ├── characters.ts          # 5 protagonist definitions with color identities
│   ├── decisions.ts           # Decision tree with authored choices, impacts, consequences
│   ├── endings.ts             # 4 possible endings with full body text
│   └── pages.ts               # Page definitions and HUD visibility flags
├── store/
│   └── gameStore.ts           # Zustand state (metrics, decisions, save/resume)
├── components/ui/
│   ├── MetricHUD.tsx          # Fixed overlay: 4 animated strategic metrics
│   ├── ClassifiedBadge.tsx    # "TOP SECRET // NOFORN" stamp component
│   └── CharacterPip.tsx       # Character identity color pip
├── pages/
│   ├── LandingPage.tsx        # Title sequence (satellite hero)
│   ├── OpeningPage.tsx        # Chapter 1 opening narration
│   ├── ProtagonistsPage.tsx   # All 5 protagonist introductions
│   ├── CrisisBuildup.tsx      # Pages 4–8: Intel → Office → Montage → Clock → Approach
│   ├── DecisionPage.tsx       # Decision 1.1: South China Sea response
│   ├── ConsequencePage.tsx    # Dynamic consequences based on choice
│   └── EndingPage.tsx         # One of 4 endings + replay
├── App.tsx                    # AnimatePresence transitions, keyboard nav, HUD overlay
└── index.css                  # Global styles + Tailwind v4
```

## Asset Mapping

All 51 image assets are in `public/assets/`. Full mapping:

| Page | Asset | Usage |
|------|-------|-------|
| Landing | `opening_hero_satellite_view.webp` | Full-screen cinematic hero |
| Opening | `page_one_opening.webp` | Chapter 1 backplate |
| Protagonists | `page_two_sarah_chen.webp` | Sarah intro scene |
| Protagonists | `page_two_maya_patel.webp` | Maya intro scene |
| Protagonists | `page_two_james_nakamura.webp` | James intro scene |
| Protagonists | `page_two_li_jian.webp` | Li Jian intro scene |
| Protagonists | `page_two_anna_karlsson.webp` | Anna intro scene |
| Protagonists | `montage_all_five_characters.webp` | Five-character connection screen |
| Page 4 (Intel) | `page_four_map.webp` | Tactical map background |
| Page 5 (Sarah) | `page_five_sarah_chen_office.webp` | Sarah's 5:30 AM office |
| Page 6 (Montage) | `page_six_DC.webp` | Washington DC panel |
| Page 6 (Montage) | `page_six_SF.webp` | San Francisco panel |
| Page 6 (Montage) | `page_six_tokyo.webp` | Tokyo panel |
| Page 6 (Montage) | `page_six_beijing.webp` | Beijing panel |
| Page 6 (Montage) | `page_six_europe.webp` | Stockholm/Europe panel |
| Page 6 (Montage) | `page_six_global.webp` | Global markets panel |
| Page 7 (Clock) | `page_seven_sarah_chen_call.webp` | Sarah crisis panel |
| Page 7 (Clock) | `page_seven_maya_patel.webp` | Maya crisis panel |
| Page 7 (Clock) | `page_seven_james_nakamura.webp` | James crisis panel |
| Page 7 (Clock) | `page_seven_li_jian.webp` | Li Jian crisis panel |
| Page 7 (Clock) | `page_seven_anna_karlsson.webp` | Anna crisis panel |
| Page 8 (Approach) | `strategic_pressure_plate.webp` | Decision approach background |
| Page 9 (Decision) | `page_nine_south_china_sea_crisis.webp` | Decision hero image |
| Page 10 (Consequences) | `page_ten_sarah_chen_office.webp` | Sarah consequence panel |
| Page 10 (Consequences) | `page_ten_maya_patel_call.webp` | Maya consequence panel |
| Page 10 (Consequences) | `page_ten_james_nakamura.webp` | James consequence panel |
| Ending A | `new_bases_cooperation_ending.webp` | Ending hero |
| Ending B | `trundling_along_ending.webp` | Ending hero |
| Ending C | `the_crucible_ending.webp` | Ending hero |
| Ending D | `strategic_judo_ending.webp` | Ending hero |
| Portraits | `*_portrait.webp` | Character dossier use |
| Locations | `situation_room_interior.webp` etc. | Location atmosphere |
| Backplates | `maritime_escalation_backplate.webp` etc. | Section atmosphere |
| Symbolic | `resilient_coalition_plate.webp` etc. | Transition layers |
| Texture | `paper_texture.webp` | Texture overlays |

## Decision System

**Decision 1.1 — Sarah Chen, Philippines Crisis:**

| Choice | Alliance Trust | Tech Edge | Strategic Coherence | Domestic Resilience |
|--------|---------------|-----------|--------------------|--------------------|
| A: Aggressive Counter-Offer | +20 | — | — | −10 |
| B: Japan-Led Coalition | +10 | −5 | +15 | — |
| C: Strategic Restraint | −25 | +15 | — | +10 |

**Ending Logic:**
- **Ending D (Strategic Judo)**: Tech Edge ≥ 80 AND multilateral choice made
- **Ending A (New Bases of Cooperation)**: Alliance Trust ≥ 65 AND Strategic Coherence ≥ 55
- **Ending C (The Crucible)**: Alliance Trust ≤ 30 AND Strategic Coherence ≥ 40
- **Ending B (Trundling Along)**: Default / persistent drift

## Character Color Identities

| Character | Color | Hex |
|-----------|-------|-----|
| Sarah Chen | Steel Blue | `#3B82F6` |
| Maya Patel | Warm Amber | `#F59E0B` |
| James Nakamura | Deep Crimson | `#DC2626` |
| Li Jian | Jade Green | `#10B981` |
| Anna Karlsson | Nordic Silver | `#94A3B8` |

## Navigation

- **Click**: All navigation buttons
- **Arrow Right / Space**: Advance (disabled on decision page)
- **Arrow Left**: Go back
- Save state persists automatically via `localStorage`

## Tech Stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **Framer Motion** — all page transitions, metric animations, entrance effects
- **Zustand** — global state (metrics, decisions, page, save/resume)
- `localStorage` — automatic save/resume

## Content Preservation

All authored text is centralized in `src/content/`. No text has been paraphrased, shortened, or modified from the original source material. Any future edits to story content should be made exclusively in these files.
