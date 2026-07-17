# Mahjong Higher or Lower - Frontend

A modern React-based frontend for the Mahjong Higher or Lower betting game. Built with Vite, React, TypeScript, and TanStack Query.

## Features

- **Interactive Gameplay**: Play rounds guessing if the next hand's total value will be higher or lower than your current hand.
- **Dynamic Scoring**: Real-time tile value evaluation and dynamic score tracking.
- **TanStack Query Integration**: Seamless communication with the backend leaderboard API.
- **Accessible Design**: Keyboard navigational and fully compliant with modern ARIA accessibility standards.

## Prerequisites

- Node.js (v20+ recommended)

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install --legacy-peer-deps
   ```

   *(Note: `--legacy-peer-deps` is required to gracefully handle the strict accessibility linter dependencies).*

2. **Run the development server**:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Type-checks and compiles the application for production.
- `npm run lint`: Runs ESLint to catch accessibility issues and ensure code quality.
- `npm run test`: Runs the Vitest test suite.

## Architecture & Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript (strict mode enabled)
- **State Management**: 
  - **Server State**: `@tanstack/react-query`
  - **Client State**: Zustand
- **Testing**: Vitest + React Testing Library
