import { createContext, useContext } from 'react';
import { LeaderboardService } from '../features/leaderboard/services/LeaderboardService';

export interface IServicesContext {
  leaderboardService: LeaderboardService;
}

export const ServicesContext = createContext<IServicesContext | null>(null);

export const useServices = (): IServicesContext => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
