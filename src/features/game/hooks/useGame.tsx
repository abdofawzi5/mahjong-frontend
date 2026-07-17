import { useContext } from 'react';
import { useStore } from 'zustand';
import {
  GameStoreContext,
  type GameStore,
} from '../store/gameStore';


export const useGame = (): GameStore => {
  const store = useContext(GameStoreContext);
  if (!store) {
    throw new Error('useGame must be used within a GameStoreProvider');
  }
  return useStore(store);
};
