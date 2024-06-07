import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Favorites {
  tickers: string[];
  addTicker: (ticker: string) => void;
  removeTicker: (ticker: string) => void;
  clear: () => void;
}

export const useFavorites = create(
  persist<Favorites>(
    (set, get) => ({
      tickers: [],
      addTicker: (ticker: string) =>
        set((state) => ({
          tickers: [...state.tickers, ticker],
        })),
      removeTicker: (ticker: string) =>
        set((state) => ({
          tickers: state.tickers.filter((t) => t !== ticker),
        })),
      clear: () => set({ tickers: [] }),
    }),
    {
      name: 'stocked-favorites',
    }
  )
);
