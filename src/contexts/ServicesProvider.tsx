import React, { type ReactNode } from 'react';
import { ServicesContext, type IServicesContext } from './ServicesContext';

export interface ServicesProviderProps {
  children: ReactNode;
  services: IServicesContext;
}

export const ServicesProvider: React.FC<ServicesProviderProps> = ({ children, services }) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};
