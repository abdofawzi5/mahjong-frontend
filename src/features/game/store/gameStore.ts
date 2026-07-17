import { createContext } from 'react';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameService, type GameStateData } from '../services/GameService';

export interface GameStore extends GameStateData {
  startGame: () => void;
  bet: (guess: 'higher' | 'lower') => void;
  endGame: (reason: string) => void;
}

export const defaultState: GameStateData = {
  score: 0,
  drawPile: [],
  discardPile: [],
  currentHand: null,
  nextHand: null,
  history: [],
  exhaustionCount: 0,
  dynamicValues: GameService.getInitialDynamicValues(),
  isGameOver: false,
  gameOverReason: null,
};

export const createGameStore = (initialState?: Partial<GameStateData>) => {
  return createStore<GameStore>()(
    persist(
      (set, get) => ({
        ...defaultState,
        ...initialState,

        startGame: () => {
          const newState = GameService.initializeGame();
          set(newState);
        },

        bet: (guess: 'higher' | 'lower') => {
          const state = get();
          const newState = GameService.processBet(state, guess);
          set(newState);
        },

        endGame: (reason: string) => {
          set({ isGameOver: true, gameOverReason: reason });
        }
      }),
      {
        name: 'mahjong-game-storage',
      }
    )
  );
};

export type GameStoreApi = ReturnType<typeof createGameStore>;

export const GameStoreContext = createContext<GameStoreApi | undefined>(undefined);
