# Mahjong Higher or Lower

A modern React-based frontend and Node.js backend for the Mahjong Higher or Lower betting game. 

## Tech Stack Used

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript (strict mode enabled)
- **Server State Management**: `@tanstack/react-query`
- **Client State Management**: Zustand
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
- **Testing**: Vitest + React Testing Library
- **Linting/Code Quality**: ESLint (including `eslint-plugin-jsx-a11y` for ARIA compliance)

### Backend

- **Framework**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: SQLite (persisting leaderboard scores)
- **Testing**: Jest + Supertest

---

## Setup Instructions

### Prerequisites

- Node.js (v20+ recommended)

### 1. How to Run the Backend

The backend serves as a BFF (Backend-for-Frontend) layer to persist the global leaderboard.

```bash
cd mahjong-backend
npm install
npm run dev
```

The backend will run on `http://localhost:3001` and automatically create the SQLite database file on startup.

### 2. How to Run the Frontend

In a new terminal window, navigate to the frontend directory:

```bash
cd mahjong-frontend
npm install --legacy-peer-deps
cp .env.example .env
```

Update the `.env` file with the correct backend URL (e.g., `VITE_API_URL=http://localhost:3001/api`).

```bash
npm run dev
```

*(Note: `--legacy-peer-deps` is required to install correctly alongside our strict ESLint peer dependencies).*

The frontend will run on `http://localhost:5173`. Open this URL in your browser to play the game!

---

## Game Rules & Assumptions

### Configurability

- **Everything is Configurable**: The game rules, tile distributions, scoring thresholds, and game over conditions are entirely driven by configuration files. You can easily tweak the core gameplay experience by modifying `GAME_CONFIG` (in `src/features/game/config/game.config.ts`) and `TILE_CONFIG` (in `src/features/game/config/tiles.config.ts`).

### Tiles-per-hand Decision

- I chose **5 tiles per hand**.
- A full Mahjong hand is usually 13/14 tiles, but for a fast-paced "higher or lower" mini-game, 5 tiles are easier for the user to mentally sum up on the fly and keep the gameplay engaging without cognitive overload.

### Scoring Rule Chosen

- **Correct Bet**: You gain the sum total value of the drawn (new) hand.
- **Incorrect Bet**: You lose the sum total value of the drawn (new) hand.
- **Tie**: If the total value of the next hand exactly equals the current hand, it is treated as an **incorrect bet**. The player loses the points.
- The minimum score is bounded at `0` (you cannot have negative points).

### General Game Mechanics

- **Tile Set**: A customized 64-tile deck is used.
  - Number tiles (1-9, 4 of each) have a fixed value corresponding to their face value.
  - Dragon tiles (Red, Green, White, 4 of each) start with a value of 5.
  - Wind tiles (East, South, West, North, 4 of each) start with a value of 5.
- **Dynamic Tile Values**: 
  - Every time a player makes a correct guess, any Dragon or Wind tiles present in the newly drawn hand **permanently gain +1** value for the rest of the game session.
  - If the player makes an incorrect guess, any Dragon or Wind tiles present in the newly drawn hand **lose -1** value.
- **Game Over Conditions**:
  1. The draw pile is exhausted 3 times (the deck is automatically reshuffled twice).
  2. Any dynamic tile's value falls to `0`.
  3. Any dynamic tile's value reaches `10`.

---

## What was Handwritten vs AI Generated

- **Handwritten / User Authored**:
  - The core architecture, database schema, React component structure, and custom game logic/scoring algorithms were entirely conceptualized and authored by me.
  - I established and drove the project's engineering standards, including the enforcement of strict TypeScript compliance, the architectural decision to use Zustand alongside TanStack Query, and the strict integration of ARIA accessibility (`jsx-a11y`) guidelines.
  - All high-level system constraints, environment configurations, and deployment pipelines (GitHub Actions) were authored and managed by me.

- **AI Assistance (Antigravity/Gemini)**:
  - Used strictly as an intelligent pair-programming copilot to accelerate boilerplate generation (such as CSS scaffolding and basic Express routing) and to execute granular refactoring commands under my explicit instruction and review.
