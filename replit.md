# 2029: Crossroads of Power

A cinematic, interactive geopolitical strategy simulator / graphic novel built with React, TypeScript, Vite, and Tailwind CSS.

## Project Overview

Players navigate a fictional South China Sea crisis in 2029 through the perspectives of five protagonists. Choices affect four strategic metrics and lead to one of four distinct endings.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Package Manager:** npm

## Project Structure

- `src/content/` — Story data: characters, decisions, endings, pages
- `src/pages/` — View components (LandingPage, DecisionPage, EndingPage, etc.)
- `src/components/ui/` — Reusable UI elements (MetricHUD, ClassifiedBadge, CharacterPip)
- `src/store/gameStore.ts` — Global game state via Zustand
- `public/assets/` — WebP image assets for backgrounds and portraits

## Running Locally

```bash
npm install
npm run dev
```

Runs on port 5000 at `0.0.0.0`.

## Deployment

Configured as a static site deployment:
- **Build:** `npm run build`
- **Public directory:** `dist`
