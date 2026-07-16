import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameService, type GameStateData } from '../services/GameService';

interface GameStore extends GameStateData {
  startGame: () => void;
  bet: (guess: 'higher' | 'lower') => void;
  endGame: (reason: string) => void;
}

const defaultState: GameStateData = {
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

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...defaultState,

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

export const useGame = () => {
  return useGameStore();
};
