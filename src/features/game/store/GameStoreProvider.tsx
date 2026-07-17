import { useState, type ReactNode } from 'react';
import { createGameStore, GameStoreContext, type GameStoreApi } from './gameStore';

export interface GameStoreProviderProps {
  children: ReactNode;
  store?: GameStoreApi;
}

export const GameStoreProvider = ({ children, store }: GameStoreProviderProps) => {
  const [storeInstance] = useState(() => store ?? createGameStore());
  
  return (
    <GameStoreContext.Provider value={storeInstance}>
      {children}
    </GameStoreContext.Provider>
  );
};
