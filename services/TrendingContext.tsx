import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface TrendingContextType {
  refreshTrending: () => void;
  setRefreshTrending: (callback: () => void) => void;
}

const TrendingContext = createContext<TrendingContextType>({
  refreshTrending: () => {},
  setRefreshTrending: () => {},
});

export const TrendingProvider = ({ children }: { children: React.ReactNode }) => {
  const refreshCallbackRef = useRef<() => void>(() => {});

  const refreshTrending = useCallback(() => {
    refreshCallbackRef.current();
  }, []);

  const setRefreshTrending = useCallback((callback: () => void) => {
    refreshCallbackRef.current = callback;
  }, []);

  return (
    <TrendingContext.Provider value={{ refreshTrending, setRefreshTrending }}>
      {children}
    </TrendingContext.Provider>
  );
};

export const useTrending = () => useContext(TrendingContext); 