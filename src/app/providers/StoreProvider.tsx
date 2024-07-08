"use client";

import { StoreContext } from 'storeon/react';
import { store } from './store/store';

export default function StoreProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

