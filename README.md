# Save the Animal Kingdom — MVP v1.0

A browser-based educational escape-room adventure for primary-school learners.

## Features
- Illustrated, responsive interface
- Intro story and five habitat levels
- Sequential level unlocking
- Quiz, ocean clean-up sorting, and habitat matching challenges
- Score, lives, rescued animals, and five nature crystals
- Final boss challenge
- Progress saved in browser LocalStorage

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/Challenge.tsx
  data/levels.ts
  hooks/useGameState.ts
  types/game.ts
  App.tsx
  main.tsx
  styles.css
```

## Notes
- This MVP uses emoji-based illustrations so it runs immediately without a separate image asset pack.
- Progress is stored in the current browser using LocalStorage.
- The matching challenge currently uses a simple tap-to-complete interaction. A full drag-and-drop matching board, richer animations, audio, accessibility refinements, and backend persistence are suitable next iterations.
