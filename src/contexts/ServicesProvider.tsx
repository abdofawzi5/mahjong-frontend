import { type ReactNode } from 'react';
import { ServicesContext, type IServicesContext } from './ServicesContext';

export interface ServicesProviderProps {
  children: ReactNode;
  services: IServicesContext;
}

export const ServicesProvider = ({ children, services }: ServicesProviderProps) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};
