import React, { useState, type ReactNode } from 'react';
import { createGameStore, GameStoreContext, type GameStoreApi } from './gameStore';

export interface GameStoreProviderProps {
  children: ReactNode;
  store?: GameStoreApi;
}

export const GameStoreProvider: React.FC<GameStoreProviderProps> = ({ children, store }) => {
  const [storeInstance] = useState(() => store ?? createGameStore());
  
  return (
    <GameStoreContext.Provider value={storeInstance}>
      {children}
    </GameStoreContext.Provider>
  );
};
